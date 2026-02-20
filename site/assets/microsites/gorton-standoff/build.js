import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';

const DEFAULT_STATEMENTS_FILE = 'Statements.md';
const DEFAULT_TEMPLATE_FILE = 'template.html';

const md = new MarkdownIt({ html: false, linkify: true, breaks: false });

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

function extractStatementsSection(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^##\s+statements\s*$/i.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return '';

  let end = lines.length;
  for (let i = start; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i]) && !/^##\s+statements\s*$/i.test(lines[i].trim())) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

function parseTitle(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);
  for (const l of lines) {
    const m = l.match(/^#\s+(.*)$/);
    if (m) return m[1].trim();
  }
  return 'Gorton & Denton Showdown';
}

function splitFirstParagraph(markdownBlock) {
  const s = String(markdownBlock || '').trim();
  if (!s) return { bubble: '', details: '' };
  const parts = s.split(/\n\s*\n/);
  const bubble = (parts[0] || '').trim();
  const details = parts.slice(1).join('\n\n').trim();
  return { bubble, details };
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

    const links = uniqLinks(extractLinks(b.content));
    if (!draft && !links.length) {
      throw new Error(`Unsourced statement (add at least one https:// link, or mark draft=1): ${id || '(missing id)'}`);
    }
    const { bubble, details } = splitFirstParagraph(b.content);
    if (!draft && (!id || !candidate || !issue || !kind || !bubble)) {
      throw new Error(`Statement missing required meta/content (need id,candidate,issue,kind + first paragraph): ${id || '(missing id)'}`);
    }

    statements.push({
      id,
      draft,
      candidate,
      candidateName,
      party,
      issue,
      kind,
      date,
      bubbleHtml: bubble ? md.renderInline(bubble) : '',
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
    const sourcesHtml = s.sources.length
      ? `<ul class="receiptSources">${s.sources.map((src) => `<li><a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(src.label)}</a></li>`).join('')}</ul>`
      : '';

    const metaBits = [
      s.party ? `<span class="pill pill--party">${escapeHtml(s.party)}</span>` : '',
      s.issue ? `<span class="pill">${escapeHtml(issueLabel(s.issue))}</span>` : '',
      s.kind ? `<span class="pill pill--kind" title="Evidence type">${escapeHtml(kindIcon(s.kind))} ${escapeHtml(s.kind)}</span>` : '',
      s.date ? `<span class="pill pill--date"><time datetime="${escapeHtml(s.date)}">${escapeHtml(s.date)}</time></span>` : ''
    ].filter(Boolean).join(' ');

    const candidateDisplay = s.candidateName || s.candidate || 'Unknown';

    return `
<article class="receipt" data-role="receipt" data-id="${escapeHtml(s.id)}" data-candidate="${escapeHtml(s.candidate)}" data-candidate-name="${escapeHtml(candidateDisplay)}" data-party="${escapeHtml(s.party)}" data-issue="${escapeHtml(s.issue)}" data-kind="${escapeHtml(s.kind)}" data-date="${escapeHtml(s.date)}" data-sources="${escapeHtml(String(s.sources.length))}">
  <div class="receiptTop">
    <div class="receiptWho">
      <span class="pill pill--id">#${escapeHtml(s.id)}</span>
      <span class="receiptName">${escapeHtml(candidateDisplay)}</span>
    </div>
    <div class="receiptMeta">${metaBits}</div>
  </div>
  <p class="receiptLine">${s.bubbleHtml}</p>
  ${s.detailsHtml || sourcesHtml ? `<details class="receiptDetails"><summary>Receipts / context</summary><div class="receiptDetailsBody">${s.detailsHtml || ''}${sourcesHtml}</div></details>` : ''}
</article>
    `.trim();
  }).join('\n');
}

function renderContent({ title, statements }) {
  const receiptsHtml = renderReceipts(statements);

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

<section class="receiptsWrap" aria-labelledby="receiptsTitle">
  <div class="receiptsHead">
    <h2 id="receiptsTitle">Receipts (boring version)</h2>
    <p>Everything the “game” shows is built from the blocks in <code>Statements.md</code>. If JS is off, just read this list.</p>
  </div>
  <div class="receiptsList" data-role="receipts-list">
    ${receiptsHtml}
  </div>
</section>
  `.trim();
}

export async function buildMicrosite({ sourceDir, outDir } = {}) {
  const src = sourceDir ? path.resolve(sourceDir) : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const out = outDir ? path.resolve(outDir) : path.resolve('docs/gorton-standoff');

  const statementsPath = path.join(src, DEFAULT_STATEMENTS_FILE);
  const templatePath = path.join(src, DEFAULT_TEMPLATE_FILE);

  const statementsRaw = await fs.readFile(statementsPath, 'utf8');
  const title = parseTitle(statementsRaw);
  const { published } = parseStatementsFromMarkdown(statementsRaw);
  const content = renderContent({ title, statements: published });

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

