import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';

const DEFAULT_STATEMENTS_FILE = 'Statements.md';
const DEFAULT_TEMPLATE_FILE = 'template.html';

const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

const PRIMARY_ISSUES = [
  'culture-war',
  'jobs-rights',
  'homes-streets',
  'health-care',
  'transport-air'
];

const TOP_THREE_CANDIDATES = new Set([
  'angeliki-stogia',
  'hannah-spencer',
  'matt-goodwin'
]);

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseMetaComment(line) {
  const m = String(line || '').match(/<!--\s*meta\s+([\s\S]*?)\s*-->/i);
  if (!m) return { line: String(line || ''), meta: {} };
  const raw = m[1] || '';
  const meta = {};
  const re = /([a-zA-Z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let mm;
  while ((mm = re.exec(raw)) !== null) {
    const key = mm[1];
    const value = (mm[2] ?? mm[3] ?? mm[4] ?? '').trim();
    meta[key] = value;
  }
  return { line: String(line || '').replace(m[0], '').trimEnd(), meta };
}

function extractLinks(markdown) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(String(markdown || ''))) !== null) {
    const label = (m[1] || '').trim();
    const url = (m[2] || '').trim();
    if (!/^https?:\/\//i.test(url)) continue;
    out.push({ label: label || url, url });
  }
  return out;
}

function uniqLinks(links) {
  const seen = new Set();
  const out = [];
  for (const l of (links || [])) {
    const key = String(l?.url || '').trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ label: String(l?.label || key).trim() || key, url: key });
  }
  return out;
}

function extractH2Section(markdownText, heading) {
  const want = String(heading || '').trim().toLowerCase();
  if (!want) return '';
  const lines = String(markdownText || '').split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].trim().match(/^##\s+(.*)$/);
    if (!m) continue;
    if (String(m[1] || '').trim().toLowerCase() === want) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return '';

  let end = lines.length;
  for (let i = start; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n').trim();
}

function extractStatementsSection(markdownText) {
  return extractH2Section(markdownText, 'Statements');
}

function parseTitle(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);
  for (const l of lines) {
    const m = l.match(/^#\s+(.*)$/);
    if (m) return m[1].trim();
  }
  return 'Gorton & Denton Showdown';
}

function splitQuoteCaptionDetails(markdownBlock) {
  const s = String(markdownBlock || '').trim();
  if (!s) return { quote: '', caption: '', details: '' };
  const parts = s.split(/\n\s*\n/);
  let quote = (parts[0] || '').trim();
  let caption = (parts[1] || '').trim();
  let details = parts.slice(2).join('\n\n').trim();

  function splitOffSources(paragraph) {
    const p = String(paragraph || '');
    const m = p.match(/\n\s*Sources\s*:\s*\n/i);
    if (!m || m.index == null) return { main: p.trim(), sources: '' };
    const idx = m.index;
    return {
      main: p.slice(0, idx).trim(),
      sources: p.slice(idx).trim()
    };
  }

  // Sometimes people put the Sources section immediately after the first line/paragraph.
  // Always push Sources into details so it stays out of the speech-bubble and caption.
  const qSplit = splitOffSources(quote);
  quote = qSplit.main;
  if (qSplit.sources) details = [qSplit.sources, details].filter(Boolean).join('\n\n').trim();

  // Common authoring pattern: caption paragraph immediately followed by a Sources section (no blank line).
  // Split sources out so they live in details (collapsed in the receipts list) rather than always-visible caption.
  if (/^Sources\s*:/i.test(caption)) {
    details = [caption, details].filter(Boolean).join('\n\n').trim();
    caption = '';
  } else {
    const cSplit = splitOffSources(caption);
    if (cSplit.sources) {
      caption = cSplit.main;
      details = [cSplit.sources, details].filter(Boolean).join('\n\n').trim();
    }
  }

  return { quote, caption, details };
}

function isQuoteKind(kind) {
  const k = String(kind || '').trim().toLowerCase();
  return k === 'said' || k === 'quote';
}

function isEvidenceKind(kind) {
  const k = String(kind || '').trim().toLowerCase();
  return k === 'said' || k === 'quote' || k === 'documented' || k === 'doc' || k === 'voted' || k === 'vote' || k === 'aligned' || k === 'align';
}

function inferSlot({ slot, issue, candidate, kind } = {}) {
  const s = String(slot || '').trim().toLowerCase();
  if (s) return s;
  const i = String(issue || '').trim().toLowerCase();
  const c = String(candidate || '').trim().toLowerCase();
  const k = String(kind || '').trim().toLowerCase();
  if (TOP_THREE_CANDIDATES.has(c) && PRIMARY_ISSUES.includes(i) && isEvidenceKind(k)) return 'standoff';
  return 'further';
}

function shortSourceLabel({ label, url }) {
  try {
    const u = new URL(String(url || '').trim());
    const host = u.hostname.replace(/^www\./i, '').toLowerCase();
    if (host === 'theguardian.com') return 'Guardian';
    if (host === 'bbc.co.uk' || host.endsWith('.bbc.co.uk')) return 'BBC';
    if (host === 'ft.com') return 'Financial Times';
    if (host === 'manchester.gov.uk') return 'Manchester City Council';
    if (host === 'notreallyheremedia.com') return 'Not Really Here';
    if (host === 'levenshulmecommunity.org.uk') return 'Levenshulme CA';
    if (host === 'uk.news.yahoo.com') return 'Yahoo News';
    if (host === 'whocanivotefor.co.uk') return 'WhoCanIVoteFor?';
    if (host === 'sex-matters.org') return 'Sex Matters';
    return host;
  } catch {
    const l = String(label || '').trim();
    if (!l) return 'Source';
    if (l.length <= 18) return l;
    return 'Source';
  }
}

function parseStatementsFromMarkdown(markdownText) {
  const section = extractStatementsSection(markdownText);
  const lines = String(section || '').split(/\r?\n/);

  const blocks = [];
  let current = null;

  function pushCurrent() {
    if (!current) return;
    const content = String(current.lines.join('\n')).trim();
    blocks.push({ meta: current.meta, content });
    current = null;
  }

  for (const rawLine of lines) {
    const line = String(rawLine || '');
    if (/<!--\s*meta\s+/i.test(line)) {
      pushCurrent();
      const { meta, line: rest } = parseMetaComment(line);
      current = { meta, lines: [] };
      if (rest.trim()) current.lines.push(rest);
      continue;
    }
    if (!current) continue;
    current.lines.push(line);
  }
  pushCurrent();

  const statements = [];
  for (const b of blocks) {
    const meta = b.meta || {};
    const draft = String(meta.draft || meta.status || '').toLowerCase() === '1'
      || String(meta.draft || meta.status || '').toLowerCase() === 'draft';
    const skip = String(meta.skip || '').toLowerCase() === '1' || String(meta.skip || '').toLowerCase() === 'true';
    if (skip) continue;

    const id = String(meta.id || '').trim();
    const candidate = String(meta.candidate || '').trim();
    const issue = String(meta.issue || '').trim();
    const kind = String(meta.kind || '').trim();
    const date = String(meta.date || '').trim();
    const candidateName = String(meta.candidateName || '').trim();
    const party = String(meta.party || '').trim();
    const speaker = String(meta.speaker || '').trim();
    const speakerName = String(meta.speakerName || '').trim();
    const slot = inferSlot({ slot: meta.slot || meta.use || meta.section, issue, candidate, kind });

    const links = uniqLinks(extractLinks(b.content));
    if (!draft && !links.length) {
      throw new Error(`Unsourced statement (add at least one https:// link, or mark draft=1): ${id || '(missing id)'}`);
    }
    const { quote, caption, details } = splitQuoteCaptionDetails(b.content);
    if (!draft && (!id || !candidate || !issue || !kind || !quote)) {
      throw new Error(`Statement missing required meta/content (need id,candidate,issue,kind + first paragraph): ${id || '(missing id)'}`);
    }
    if (!draft && isQuoteKind(kind) && !quote.trimStart().startsWith('>')) {
      throw new Error(`Quoted statement must start with a markdown blockquote (>): ${id || '(missing id)'}`);
    }

    statements.push({
      id,
      draft,
      candidate,
      candidateName,
      party,
      speaker,
      speakerName,
      issue,
      kind,
      slot,
      date,
      quoteHtml: quote ? md.render(quote) : '',
      captionHtml: caption ? md.renderInline(caption) : '',
      detailsMarkdown: details || '',
      detailsHtml: details ? md.render(details) : '',
      sources: links
    });
  }

  const published = statements.filter((s) => !s.draft);
  published.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  return { published, all: statements };
}

function kindIcon(kind) {
  const k = String(kind || '').toLowerCase();
  if (k === 'said' || k === 'quote') return '🎤';
  if (k === 'documented' || k === 'doc') return '🧾';
  if (k === 'voted' || k === 'vote') return '🗳️';
  if (k === 'aligned' || k === 'align') return '🧩';
  return '•';
}

function issueLabel(issue) {
  const i = String(issue || '').trim().toLowerCase();
  if (i === 'culture-war') return 'Culture war / cohesion';
  if (i === 'jobs-rights') return 'Jobs / pay / rights';
  if (i === 'homes-streets') return 'Homes / rents / streets';
  if (i === 'health-care') return 'Health / care / harm';
  if (i === 'transport-air') return 'Transport / air / infrastructure';
  return issue || 'Other';
}

function renderReceipts(statements) {
  if (!statements.length) {
    return `
      <div class="emptyReceipts">
        <p><strong>No published receipts yet.</strong></p>
        <p>Add blocks under <code>## Statements</code> in <code>Statements.md</code> (and include at least one source link per statement).</p>
      </div>
    `.trim();
  }

  return statements.map((s) => {
    const shouldRenderSourceList = !/\bSources\s*:/i.test(String(s.detailsMarkdown || ''));
    const sourcesHtml = shouldRenderSourceList && s.sources.length
      ? `<ul class="receiptSources">${s.sources.map((src) => `<li><a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.label)}</a></li>`).join('')}</ul>`
      : '';

    const primarySource = s.sources?.[0]
      ? { label: shortSourceLabel(s.sources[0]), url: s.sources[0].url, rawLabel: s.sources[0].label }
      : null;

    const speakerDisplay = s.speakerName || s.speaker || '';
    const metaBits = [
      s.party ? `<span class="pill pill--party">${escapeHtml(s.party)}</span>` : '',
      speakerDisplay && speakerDisplay !== (s.candidateName || s.candidate || '') ? `<span class="pill pill--speaker">🗣️ ${escapeHtml(speakerDisplay)}</span>` : '',
      s.issue ? `<span class="pill">${escapeHtml(issueLabel(s.issue))}</span>` : '',
      s.kind ? `<span class="pill pill--kind" title="Evidence type">${escapeHtml(kindIcon(s.kind))} ${escapeHtml(s.kind)}</span>` : '',
      s.date ? `<span class="pill pill--date"><time datetime="${escapeHtml(s.date)}">${escapeHtml(s.date)}</time></span>` : ''
    ].filter(Boolean).join(' ');

    const candidateDisplay = s.candidateName || s.candidate || 'Unknown';

    return `
<article class="receipt" data-role="receipt" data-id="${escapeHtml(s.id)}" data-candidate="${escapeHtml(s.candidate)}" data-candidate-name="${escapeHtml(candidateDisplay)}" data-party="${escapeHtml(s.party)}" data-speaker="${escapeHtml(s.speaker || '')}" data-speaker-name="${escapeHtml(s.speakerName || '')}" data-issue="${escapeHtml(s.issue)}" data-kind="${escapeHtml(s.kind)}" data-slot="${escapeHtml(s.slot || '')}" data-date="${escapeHtml(s.date)}" data-sources="${escapeHtml(String(s.sources.length))}" data-primary-source-label="${escapeHtml(primarySource?.label || '')}" data-primary-source-url="${escapeHtml(primarySource?.url || '')}">
  <div class="receiptTop">
    <div class="receiptWho">
      <span class="pill pill--id">#${escapeHtml(s.id)}</span>
      <span class="receiptName">${escapeHtml(candidateDisplay)}</span>
    </div>
    <div class="receiptMeta">${metaBits}</div>
  </div>
  <div class="receiptQuote">${s.quoteHtml}</div>
  ${s.captionHtml ? `<p class="receiptCaption">${s.captionHtml}</p>` : ''}
  ${primarySource ? `<p class="receiptCredit"><a href="${escapeHtml(primarySource.url)}" target="_blank" rel="noopener noreferrer">— ${escapeHtml(primarySource.label)}</a></p>` : ''}
  ${s.detailsHtml || sourcesHtml ? `<details class="receiptDetails"><summary>Receipts / context</summary><div class="receiptDetailsBody">${s.detailsHtml || ''}${sourcesHtml}</div></details>` : ''}
</article>
    `.trim();
  }).join('\n');
}

function renderMethodContext() {
  return `
<section class="methodWrap" aria-labelledby="methodTitle">
  <div class="methodCard">
    <h2 id="methodTitle">How to read this</h2>
    <p class="methodLead">
      Campaigns are designed to persuade. Parties are not neutral narrators of what their opponents said or did, and commercial media/analysis often optimises for attention and incentives rather than “fair comparison”.
    </p>
    <ul class="methodList">
      <li><strong>We link primary sources</strong> wherever possible, so you can check the original words and context.</li>
      <li><strong>We separate “said” from “documented”.</strong> If we can’t find the exact quote, it shouldn’t be in a speech bubble.</li>
      <li><strong>No-JS still works.</strong> Scroll the receipts: everything the interactive shows is already on the page.</li>
    </ul>
  </div>
</section>
  `.trim();
}

function renderCountsTable(statements) {
  const candidates = [
    { id: 'angeliki-stogia', name: 'Angeliki Stogia' },
    { id: 'hannah-spencer', name: 'Hannah Spencer' },
    { id: 'matt-goodwin', name: 'Matt Goodwin' }
  ];
  const eligible = (statements || []).filter((s) =>
    candidates.some((c) => c.id === s.candidate)
    && PRIMARY_ISSUES.includes(String(s.issue || '').trim().toLowerCase())
    && isEvidenceKind(s.kind)
  );

  const counts = new Map(); // key: `${issue}:${candidate}`
  for (const s of eligible) {
    const issue = String(s.issue || '').trim().toLowerCase();
    const candidate = String(s.candidate || '').trim().toLowerCase();
    const key = `${issue}:${candidate}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  const totals = new Map();
  for (const c of candidates) totals.set(c.id, 0);
  for (const issue of PRIMARY_ISSUES) {
    for (const c of candidates) {
      totals.set(c.id, (totals.get(c.id) || 0) + (counts.get(`${issue}:${c.id}`) || 0));
    }
  }

  const rowsHtml = PRIMARY_ISSUES.map((issue) => {
    const cells = candidates.map((c) => `<td data-candidate="${escapeHtml(c.id)}">${escapeHtml(String(counts.get(`${issue}:${c.id}`) || 0))}</td>`).join('');
    return `<tr><th scope="row">${escapeHtml(issueLabel(issue))}</th>${cells}</tr>`;
  }).join('\n');

  const totalCells = candidates.map((c) => `<td data-candidate="${escapeHtml(c.id)}">${escapeHtml(String(totals.get(c.id) || 0))}</td>`).join('');

  return `
<section class="countsWrap" aria-labelledby="countsTitle">
  <h2 id="countsTitle">Evidence activity (simple counts)</h2>
  <p class="countsNote">Counts are the number of published evidence blocks we’ve tagged to each candidate and issue. They are not a “score”.</p>
  <div class="countsTableWrap">
    <table class="countsTable">
      <thead>
        <tr>
          <th scope="col">Issue group</th>
          ${candidates.map((c) => `<th scope="col">${escapeHtml(c.name)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          ${totalCells}
        </tr>
      </tfoot>
    </table>
  </div>
</section>
  `.trim();
}

function renderAdditionalSources(additionalSourcesMarkdown) {
  const mdText = String(additionalSourcesMarkdown || '').trim();
  if (!mdText) {
    return `
<section class="additionalWrap" aria-labelledby="additionalTitle">
  <h2 id="additionalTitle">Additional sources (not yet tagged to a claim)</h2>
  <p class="additionalNote">Add a <code>## Additional sources</code> section to <code>Statements.md</code> to populate this list.</p>
</section>
    `.trim();
  }
  return `
<section class="additionalWrap" aria-labelledby="additionalTitle">
  <h2 id="additionalTitle">Additional sources (not yet tagged to a claim)</h2>
  <div class="additionalBody">${md.render(mdText)}</div>
</section>
  `.trim();
}

function renderFlyerGallery(flyers) {
  const items = Array.isArray(flyers) ? flyers : [];
  if (!items.length) {
    return `<p class="flyerEmpty"><em>No flyer scans found yet.</em> Add files to <code>site/assets/microsites/gorton-standoff/images/flyers/</code> (e.g. <code>flyer-001-front.png</code> + <code>flyer-001-back.png</code>).</p>`;
  }
  return items.map((f) => {
    const front = String(f.front || '').trim();
    const back = String(f.back || '').trim();
    const title = String(f.title || f.id || '').trim();
    const hasBack = Boolean(back);
    const a11y = title ? `Flyer scan: ${title}` : 'Flyer scan';
    return `
<a class="flyerThumb" href="${escapeHtml(front)}" data-role="flyer-thumb" data-front="${escapeHtml(front)}" data-back="${escapeHtml(back)}" data-title="${escapeHtml(title)}" aria-label="${escapeHtml(a11y)}">
  <img src="${escapeHtml(front)}" alt="${escapeHtml(a11y)}" loading="lazy" />
  <span class="flyerCap">${escapeHtml(title || 'Flyer')}</span>
  ${hasBack ? `<span class="flyerBackTag" aria-hidden="true">front/back</span>` : ''}
</a>
    `.trim();
  }).join('\n');
}

function renderContent({ title, statements, additionalSourcesMarkdown, flyers }) {
  const standoff = (statements || []).filter((s) => String(s.slot || '').toLowerCase() === 'standoff');
  const further = (statements || []).filter((s) => String(s.slot || '').toLowerCase() !== 'standoff');
  const standoffHtml = renderReceipts(standoff);
  const furtherHtml = renderReceipts(further);
  const flyerGalleryHtml = renderFlyerGallery(flyers);

  return `
<div class="topPanels">
  <section class="brandPanel" aria-label="Better Britain Bureau">
    <a class="brandMark" href="/" aria-label="Better Britain homepage">
      <img src="../../assets/bbb-logo.svg" alt="Better Britain logo" />
      <span class="brandWordmark">Better Britain Bureau</span>
    </a>
    <p class="brandTagline">Independent, Manchester-rooted, evidence-led reporting and explainers.</p>
    <nav class="brandLinks" aria-label="Better Britain links">
      <a href="/">Homepage</a>
      <a href="/year-of-labour.html">Flagship Report</a>
      <a href="/posts/index.html">Posts</a>
      <a href="/about.html">About BBB</a>
    </nav>
  </section>

  <!--bbb:micro-cross-links-->
</div>

<header class="hero">
  <div class="heroCopy">
    <h1>${escapeHtml(title)}</h1>
    <p class="heroLead">
      A Mexican standoff, but it’s Gorton &amp; Denton: pick an issue, see what candidates actually said/did, then check the receipts.
    </p>
    <p class="heroFine">
      Evidence icons: <span class="pill pill--kind">🎤 said</span> <span class="pill pill--kind">🧾 documented</span> <span class="pill pill--kind">🗳️ voted</span> <span class="pill pill--kind">🧩 aligned</span>
    </p>
  </div>
</header>

<section class="sceneWrap" aria-label="Interactive standoff scene">
  <div class="scene" id="scene">
    <img class="sceneBg" src="./images/town-square-placeholder.png" alt="" aria-hidden="true" />
    <div class="sceneUi" data-role="scene-ui">
      <div class="picker" aria-label="Issue picker">
        <button class="pickBtn" type="button" data-role="issue" data-issue="culture-war" aria-pressed="false">Culture</button>
        <button class="pickBtn" type="button" data-role="issue" data-issue="jobs-rights" aria-pressed="false">Jobs</button>
        <button class="pickBtn" type="button" data-role="issue" data-issue="homes-streets" aria-pressed="false">Homes</button>
        <button class="pickBtn" type="button" data-role="issue" data-issue="health-care" aria-pressed="false">Health</button>
        <button class="pickBtn" type="button" data-role="issue" data-issue="transport-air" aria-pressed="false">Transport</button>
      </div>

      <div class="candidates" aria-label="Candidates">
        <div class="triangle" aria-hidden="true"></div>

        <button class="cand cand--main cand--labour" type="button" data-role="candidate" data-candidate="angeliki-stogia" data-candidate-name="Angeliki Stogia" data-party="Labour" style="--x:22%; --y:68%;">
          <span class="candImg"><img src="./images/candidate-labour.png" alt="" aria-hidden="true" /></span>
          <span class="candLabel"><span class="candName">Angeliki Stogia</span><span class="candParty">Labour</span></span>
          <span class="candReceipts" data-role="receipt-count">0</span>
        </button>

        <button class="cand cand--main cand--green" type="button" data-role="candidate" data-candidate="hannah-spencer" data-candidate-name="Hannah Spencer" data-party="Green" style="--x:50%; --y:16%;">
          <span class="candImg"><img src="./images/candidate-green.png" alt="" aria-hidden="true" /></span>
          <span class="candLabel"><span class="candName">Hannah Spencer</span><span class="candParty">Green</span></span>
          <span class="candReceipts" data-role="receipt-count">0</span>
        </button>

        <button class="cand cand--main cand--reform" type="button" data-role="candidate" data-candidate="matt-goodwin" data-candidate-name="Matt Goodwin" data-party="Reform" style="--x:78%; --y:68%;">
          <span class="candImg"><img src="./images/candidate-reform.png" alt="" aria-hidden="true" /></span>
          <span class="candLabel"><span class="candName">Matt Goodwin</span><span class="candParty">Reform</span></span>
          <span class="candReceipts" data-role="receipt-count">0</span>
        </button>

        <div class="ring" data-role="ring" aria-label="Other candidates">
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="sir-oink-a-lot" data-candidate-name="Sir Oink A-Lot" data-party="Loony"><span class="candDot"></span><span class="candMini">Sir Oink</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="nick-buckley" data-candidate-name="Nick Buckley" data-party="Advance UK"><span class="candDot"></span><span class="candMini">Buckley</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="charlotte-cadden" data-candidate-name="Charlotte Anne Cadden" data-party="Conservative"><span class="candDot"></span><span class="candMini">Cadden</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="dan-clarke" data-candidate-name="Dan Clarke" data-party="Libertarian"><span class="candDot"></span><span class="candMini">Clarke</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="sebastian-moore" data-candidate-name="Sebastian Moore" data-party="SDP"><span class="candDot"></span><span class="candMini">Moore</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="joseph-omeachair" data-candidate-name="Joseph O’Meachair" data-party="Rejoin"><span class="candDot"></span><span class="candMini">O’Meachair</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="jackie-pearcey" data-candidate-name="Jackie Pearcey" data-party="Lib Dem"><span class="candDot"></span><span class="candMini">Pearcey</span></button>
          <button class="cand cand--minor" type="button" data-role="candidate" data-candidate="hugo-wils" data-candidate-name="Hugo Wils" data-party="Communist"><span class="candDot"></span><span class="candMini">Wils</span></button>
        </div>

        <div class="bubbleLayer" data-role="bubbles" aria-hidden="true"></div>
      </div>

      <p class="privacyLine">This page doesn’t send your choices anywhere. No tracking, no storage. It runs in your browser.</p>

      <noscript>
        <p class="noJsNote"><strong>JavaScript is off.</strong> The interactive bit won’t run, but the receipts below still load.</p>
      </noscript>
    </div>
  </div>
</section>

${renderMethodContext()}

<section class="receiptsWrap" aria-labelledby="receiptsTitle">
  <div class="receiptsHead">
    <h2 id="receiptsTitle">Receipts (boring version)</h2>
    <p>Everything the “game” shows is built from the blocks in <code>Statements.md</code>. If JS is off, just read this list.</p>
  </div>
  <section class="receiptsGroup" aria-labelledby="standoffReceiptsTitle">
    <h3 id="standoffReceiptsTitle">Standoff receipts (power the interactive)</h3>
    <div class="receiptsList" data-role="receipts-list" data-slot="standoff">
      ${standoffHtml}
    </div>
  </section>
  <section class="receiptsGroup" aria-labelledby="furtherReceiptsTitle">
    <h3 id="furtherReceiptsTitle">Further claims &amp; evidence</h3>
    <div class="receiptsList" data-slot="further">
      ${furtherHtml}
    </div>
  </section>
</section>

<section class="flyersWrap" aria-labelledby="flyersTitle">
  <div class="flyersHead">
    <h2 id="flyersTitle">Flyer scans</h2>
    <p>We’ll add a browseable set of scanned leaflets here (pan/zoom + flip front/back). For now: drop images in <code>images/flyers/</code>.</p>
  </div>
  <div class="flyerGrid" data-role="flyer-gallery">
    ${flyerGalleryHtml}
  </div>

  <div class="flyerModal" data-role="flyer-modal" hidden>
    <div class="flyerModalBackdrop" data-role="flyer-close" aria-hidden="true"></div>
    <div class="flyerModalPanel" role="dialog" aria-modal="true" aria-label="Flyer viewer">
      <div class="flyerModalBar">
        <button type="button" class="flyerBtn" data-role="flyer-close">Close</button>
        <div class="flyerModalControls">
          <button type="button" class="flyerBtn" data-role="flyer-zoom-out">−</button>
          <button type="button" class="flyerBtn" data-role="flyer-fit">Fit</button>
          <button type="button" class="flyerBtn" data-role="flyer-zoom-in">+</button>
          <button type="button" class="flyerBtn" data-role="flyer-flip" disabled>Flip</button>
        </div>
      </div>
      <div class="flyerViewport" data-role="flyer-viewport">
        <img class="flyerImg" data-role="flyer-img" alt="Flyer scan" />
      </div>
      <p class="flyerHint">Drag to pan. Use mouse wheel or +/- to zoom. Flip shows reverse side if present.</p>
    </div>
  </div>
</section>

${renderAdditionalSources(additionalSourcesMarkdown)}

${renderCountsTable(statements)}
  `.trim();
}

export async function buildMicrosite({ sourceDir, outDir } = {}) {
  const src = sourceDir ? path.resolve(sourceDir) : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const out = outDir ? path.resolve(outDir) : path.resolve('docs/gorton-standoff');

  const statementsPath = path.join(src, DEFAULT_STATEMENTS_FILE);
  const templatePath = path.join(src, DEFAULT_TEMPLATE_FILE);

  const flyersDir = path.join(src, 'images', 'flyers');
  let flyerFiles = [];
  try {
    flyerFiles = await fs.readdir(flyersDir);
  } catch {
    flyerFiles = [];
  }
  const isImg = (f) => /\.(png|jpe?g|webp|gif)$/i.test(String(f || ''));
  const flyersById = new Map();
  for (const file of flyerFiles.filter(isImg)) {
    const base = path.basename(file);
    const ext = path.extname(base);
    const stem = base.slice(0, -ext.length);
    const m = stem.match(/^(.*?)(?:[-_](front|back))?$/i);
    const id = String(m?.[1] || stem).trim();
    const side = String(m?.[2] || 'front').toLowerCase();
    const entry = flyersById.get(id) || { id, title: id, front: '', back: '' };
    const rel = `./images/flyers/${base}`;
    if (side === 'back') entry.back = rel;
    else entry.front = rel;
    flyersById.set(id, entry);
  }
  const flyers = Array.from(flyersById.values())
    .filter((f) => f.front)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const statementsRaw = await fs.readFile(statementsPath, 'utf8');
  const title = parseTitle(statementsRaw);
  const { published } = parseStatementsFromMarkdown(statementsRaw);
  const additionalSourcesMarkdown = extractH2Section(statementsRaw, 'Additional sources');
  const content = renderContent({ title, statements: published, additionalSourcesMarkdown, flyers });

  const template = await fs.readFile(templatePath, 'utf8');
  const html = template
    .replace('{{title}}', escapeHtml(title))
    .replace('{{bodyClass}}', 'bbb-microsite gorton-standoff')
    .replace('{{content}}', content);

  await fs.mkdir(out, { recursive: true });
  await fs.writeFile(path.join(out, 'index.html'), html, 'utf8');
}

async function cli() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf('--out');
  const outDir = outIdx >= 0 ? args[outIdx + 1] : '';
  const sourceIdx = args.indexOf('--src');
  const sourceDir = sourceIdx >= 0 ? args[sourceIdx + 1] : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  await buildMicrosite({ sourceDir, outDir: outDir || undefined });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  cli().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
