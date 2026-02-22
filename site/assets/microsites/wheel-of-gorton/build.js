import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';

const DEFAULT_STATEMENTS_FILE = 'Statements.md';
const DEFAULT_TEMPLATE_FILE = 'template.html';
const DEFAULT_CANDIDATE_PROFILES_FILE = 'Candidate_Profiles.md';

const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

const PRIMARY_ISSUES = [
  'culture-war',
  'jobs-rights',
  'homes-streets',
  'health-care',
  'transport-air'
];

const ALLOWED_ISSUES = new Set([...PRIMARY_ISSUES, 'context']);
const ALLOWED_SLOTS = new Set(['standoff', 'further', 'gallery', 'additional', 'context']);

const TOP_THREE_CANDIDATES = new Set([
  'angeliki-stogia',
  'hannah-spencer',
  'matt-goodwin'
]);

const CANDIDATE_IDS = [
  'angeliki-stogia',
  'hannah-spencer',
  'matt-goodwin',
  'sir-oink-a-lot',
  'nick-buckley',
  'charlotte-cadden',
  'dan-clarke',
  'sebastian-moore',
  'joseph-omeachair',
  'jackie-pearcey',
  'hugo-wils'
];

const CANDIDATE_HEADSHOT_ALIASES = {
  'charlotte-cadden': ['charlotte-anne-cadden'],
  'nick-buckley': ['nick-buckley-mbe']
};

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
  const sections = [
    extractH2Section(markdownText, 'Statements'),
    extractH2Section(markdownText, 'Supplemental Statements')
  ].filter(Boolean);
  if (sections.length) return sections.join('\n\n').trim();

  // Fallback: if the file contains meta blocks but is missing the heading,
  // treat everything from the first meta block as statements until the next H2.
  const lines = String(markdownText || '').split(/\r?\n/);
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (/<!--\s*meta\s+/i.test(lines[i])) {
      start = i;
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

function parseTitle(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);
  for (const l of lines) {
    const m = l.match(/^#\s+(.*)$/);
    if (m) return m[1].trim();
  }
  return 'Wheel of Gorton';
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

function normalizeKind(kind) {
  const k = String(kind || '').trim().toLowerCase();
  if (k === 'doc') return 'documented';
  if (k === 'vote') return 'voted';
  if (k === 'align') return 'aligned';
  return kind;
}

function inferSlot({ slot, issue, candidate, kind } = {}) {
  const s = String(slot || '').trim().toLowerCase();
  if (s) return s;
  const i = String(issue || '').trim().toLowerCase();
  const c = String(candidate || '').trim().toLowerCase();
  const k = String(kind || '').trim().toLowerCase();
  if (c && c !== 'context' && PRIMARY_ISSUES.includes(i) && isEvidenceKind(k)) return 'standoff';
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

function slugifyKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

function stripTrailingUtms(rawUrl) {
  try {
    const u = new URL(String(rawUrl || '').trim());
    const params = u.searchParams;
    const toDelete = [];
    for (const [k] of params) {
      if (/^utm_/i.test(k)) toDelete.push(k);
    }
    toDelete.forEach((k) => params.delete(k));
    u.search = params.toString() ? `?${params.toString()}` : '';
    return u.toString();
  } catch {
    return String(rawUrl || '').trim();
  }
}

function parseLinkLineToLink(line) {
  const raw = String(line || '').trim();
  if (!raw) return null;
  if (!raw.startsWith('-')) return null;

  // Support: "- Label: https://example.com" and "- Label: [Text](https://example.com)"
  const m = raw.replace(/^\-\s*/, '').match(/^(.+?)\s*:\s*(.+)$/);
  if (!m) return null;
  const rawLabel = String(m[1] || '').trim();
  const rhs = String(m[2] || '').trim();

  // Prefer markdown link, else first https:// URL, else email.
  const mdLink = rhs.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/i);
  let url = mdLink ? String(mdLink[2] || '').trim() : '';
  if (!url) {
    const bare = rhs.match(/https?:\/\/\S+/i);
    url = bare ? String(bare[0] || '').trim() : '';
  }
  url = stripTrailingUtms(url);

  let email = '';
  if (!url) {
    const em = rhs.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    email = em ? String(em[0] || '').trim() : '';
    if (email) url = `mailto:${email}`;
  }

  if (!url) return null;

  const label = rawLabel || (mdLink ? String(mdLink[1] || '').trim() : '') || url;
  return { label, url };
}

function compactLinkLabel(rawLabel, url) {
  const label = String(rawLabel || '').trim();
  const base = label.split('(')[0].trim();
  const lower = base.toLowerCase();

  if (lower.includes('instagram')) return 'Instagram';
  if (lower === 'x/twitter' || lower.includes('x/twitter') || lower === 'x' || lower.includes('twitter')) return 'X';
  if (lower.includes('bluesky')) return 'Bluesky';
  if (lower.includes('facebook')) return 'Facebook';
  if (lower.includes('linkedin')) return 'LinkedIn';
  if (lower.includes('youtube')) return 'YouTube';
  if (lower.includes('tiktok')) return 'TikTok';
  if (lower.includes('linktree')) return 'Linktree';
  if (lower.includes('whocanivotefor')) return 'WhoCanIVoteFor';
  if (lower.includes('campaign site')) return 'Campaign site';
  if (lower === 'website' || lower.includes('personal website') || lower.includes('substack')) return 'Website';
  if (lower.includes('wikipedia')) return 'Wikipedia';
  if (lower.includes('google scholar')) return 'Scholar';
  if (lower.includes('penguin')) return 'Penguin';
  if (lower.includes('university of kent') || lower.includes('kent.ac.uk')) return 'Uni of Kent';
  if (lower.includes('open council')) return 'Open Council';
  if (lower.includes('guardian')) return 'Guardian';
  if (lower.includes('independent')) return 'Independent';
  if (lower.includes('about manchester')) return 'About Manchester';
  if (lower.includes('uk parliament')) return 'UK Parliament';
  if (lower.includes('north west bylines')) return 'NW Bylines';
  if (lower.includes('itv')) return 'ITV';
  if (lower.includes('lse')) return 'LSE';
  if (lower.includes('tameside correspondent')) return 'Tameside Correspondent';
  if (lower.includes('roch valley')) return 'Roch Valley Radio';
  if (lower.includes('manchester greens')) return 'Manchester Greens';
  if (lower.includes('greens internal')) return 'Greens listing';
  if (lower.includes('altrincham today')) return 'Altrincham Today';
  if (lower.includes('yahoo')) return 'Yahoo';
  if (lower.includes('keystone')) return 'Keystone Law';
  if (lower.includes('apple podcasts') || lower.includes('podcast')) return 'Podcast';
  if (lower.includes('change.org')) return 'Petition';
  if (lower.includes('electoral commission')) return 'Electoral Commission';
  if (lower.includes('rodent')) return 'Rodent in Rochdale';
  if (lower.includes('plumbing directory') || lower.includes('directory entry')) return 'Directory';
  if (lower.includes('bbc')) return 'BBC';
  if (lower.includes('arup')) return 'Arup';
  if (lower.includes('council')) return 'Council profile';

  if (/^mailto:/i.test(String(url || ''))) return 'Email';

  return base || label || String(url || '').trim();
}

function stripMarkdownToText(markdown) {
  let s = String(markdown || '');
  // Links: [text](url) -> text
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  // Autolinks: <url> -> url
  s = s.replace(/<([^>\s]+)>/g, '$1');
  // Headings, emphasis, blockquotes, list markers
  s = s.replace(/^#{1,6}\s+/gm, '');
  s = s.replace(/^[>\-\*\+]\s+/gm, '');
  s = s.replace(/[*_`]/g, '');
  // Drop bare URLs (keep words around them)
  s = s.replace(/https?:\/\/\S+/g, '');
  // Collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function excerptWords(text, maxWords = 100) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return { excerpt: '', truncated: false };
  if (words.length <= maxWords) return { excerpt: words.join(' '), truncated: false };
  return { excerpt: words.slice(0, maxWords).join(' '), truncated: true };
}

function parseCandidateProfilesFromMarkdown(markdownText, headshotManifest) {
  const lines = String(markdownText || '').split(/\r?\n/);
  const aliasToId = new Map();
  for (const id of CANDIDATE_IDS) {
    aliasToId.set(id, id);
    for (const a of (CANDIDATE_HEADSHOT_ALIASES[id] || [])) aliasToId.set(a, id);
  }

  function resolveCandidateId(candidateName) {
    const slug = slugifyKey(candidateName);
    if (aliasToId.has(slug)) return aliasToId.get(slug);
    // common suffixes
    if (slug.endsWith('-mbe') && aliasToId.has(slug.slice(0, -4))) return aliasToId.get(slug.slice(0, -4));
    return slug;
  }

  const candidates = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^####\s+(.*)$/);
    if (!m) { i += 1; continue; }
    const heading = String(m[1] || '').trim();
    const pm = heading.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    const name = (pm ? pm[1] : heading).trim();
    const party = (pm ? pm[2] : '').trim();
    const id = resolveCandidateId(name);

    const section = { id, name, party, links: [], backgroundMarkdown: '' };
    i += 1;

    // collect blocks until next #### or end
    let mode = '';
    const socialsLines = [];
    const backgroundLines = [];
    for (; i < lines.length; i += 1) {
      const l = String(lines[i] || '');
      if (/^####\s+/.test(l)) break;
      const h = l.match(/^#####\s+(.*)$/);
      if (h) {
        const key = String(h[1] || '').trim().toLowerCase();
        if (key.startsWith('socials')) mode = 'socials';
        else if (key.startsWith('verified')) mode = 'background';
        else mode = '';
        continue;
      }
      if (mode === 'socials') socialsLines.push(l);
      if (mode === 'background') backgroundLines.push(l);
    }

    const links = [];
    for (const l of socialsLines) {
      const parsed = parseLinkLineToLink(l);
      if (!parsed) continue;
      links.push(parsed);
    }
    section.links = uniqLinks(links).map((l) => ({
      label: compactLinkLabel(l.label, l.url),
      rawLabel: l.label,
      url: l.url
    }));

    section.backgroundMarkdown = backgroundLines.join('\n').trim();

    // Provide a sensible avatar; headshot manifest is already validated/fallbacked.
    const partyKey = slugifyKey(party || '');
    section.partyKey = partyKey;
    section.avatar = headshotManifest?.resolved?.[id] || headshotManifest?.fallback || './images/candidate-labour.png';

    candidates.push(section);
  }

  return { candidates };
}

function partyUi(party) {
  const p = String(party || '').trim().toLowerCase();
  if (p.includes('labour')) return { key: 'labour', label: 'Labour', avatarSide: 'left' };
  if (p.includes('green')) return { key: 'green', label: 'Green', avatarSide: 'left' };
  if (p.includes('reform')) return { key: 'reform', label: 'Reform UK', avatarSide: 'right' };
  if (p.includes('conservative')) return { key: 'conservative', label: 'Conservative', avatarSide: 'right' };
  if (p.includes('liberal')) return { key: 'libdem', label: 'Liberal Democrats', avatarSide: 'left' };
  if (p.includes('social democratic')) return { key: 'sdp', label: 'SDP', avatarSide: 'left' };
  if (p.includes('rejoin')) return { key: 'rejoin', label: 'Rejoin EU', avatarSide: 'left' };
  if (p.includes('libertarian')) return { key: 'libertarian', label: 'Libertarian', avatarSide: 'right' };
  if (p.includes('advance')) return { key: 'advance', label: 'Advance UK', avatarSide: 'right' };
  if (p.includes('loony')) return { key: 'loony', label: 'Loony Party', avatarSide: 'right' };
  if (p.includes('communist')) return { key: 'communist', label: 'Communist League', avatarSide: 'left' };
  return { key: slugifyKey(p), label: party || 'Independent', avatarSide: 'right' };
}

function renderCandidateContactsPanel({ candidates } = {}) {
  const items = Array.isArray(candidates) ? candidates : [];
  if (!items.length) return '';

  const controlsId = 'contacts-expand';

  const cardsHtml = items.map((c) => {
    const ui = partyUi(c.party);
    const side = ui.avatarSide === 'left' ? 'left' : 'right';
    const safeId = escapeHtml(String(c.id || ''));

    const linksHtml = (c.links || []).map((l) => {
      const url = String(l.url || '').trim();
      const rawLabel = String(l.rawLabel || l.label || url).trim();
      const label = String(l.label || url).trim();

      let host = '';
      try {
        if (/^mailto:/i.test(url)) host = 'email';
        else host = new URL(url).hostname.replace(/^www\./i, '');
      } catch {
        host = '';
      }

      return `<a class="contactChip" href="${escapeHtml(url)}" target="${/^mailto:/i.test(url) ? '_self' : '_blank'}" rel="noopener noreferrer" title="${escapeHtml(rawLabel)}" data-host="${escapeHtml(host)}">${escapeHtml(label)}</a>`;
    }).join('');

    const partyLabel = ui.label || c.party || '';

    const bgText = stripMarkdownToText(c.backgroundMarkdown || '');
    const { excerpt, truncated } = excerptWords(bgText, 100);
    const bgHtml = c.backgroundMarkdown
      ? `
<div class="contactBackground">
  <div class="contactBackgroundTitle">Verified background</div>
  <div class="contactBackgroundLine">
    ${excerpt ? `<span class="contactBackgroundPreview">${escapeHtml(excerpt)}${truncated ? '…' : ''}</span>` : ''}
    <details class="contactMore">
      <summary>More…</summary>
      <div class="contactMoreBody">${md.render(c.backgroundMarkdown)}</div>
    </details>
  </div>
</div>
      `.trim()
      : '';

    return `
<article class="contactCard contactCard--${escapeHtml(ui.key)} contactCard--avatar-${escapeHtml(side)}" data-candidate="${safeId}">
  <div class="contactTop">
    <div class="contactAvatar">
      <img src="${escapeHtml(c.avatar)}" alt="${escapeHtml(c.name)}" loading="lazy" />
    </div>
    <div class="contactMain">
      <div class="contactTitleRow">
        <div class="contactNameWrap">
          <span class="contactNamePlate" aria-hidden="true"></span>
          <h4 class="contactName">${escapeHtml(c.name)}</h4>
        </div>
        ${partyLabel ? `<span class="contactParty">${escapeHtml(partyLabel)}</span>` : ''}
      </div>
      <div class="contactChips">
        ${linksHtml || '<span class="contactEmpty">No links found.</span>'}
      </div>
    </div>
  </div>
  ${bgHtml}
</article>
    `.trim();
  }).join('\n');

  return `
<section class="contactsSection" aria-labelledby="contactsTitle">
  <details class="contactsDetails" open>
    <summary class="contactsSummary">
      <span class="contactsSummaryTitle" id="contactsTitle">Candidate contacts</span>
      <span class="contactsSummaryMeta">${escapeHtml(String(items.length))} candidates</span>
    </summary>
    <div class="contactsBody">
      <input class="contactsExpand" type="checkbox" id="${escapeHtml(controlsId)}" />
      <div class="contactsControls" role="group" aria-label="Contacts display options">
        <label class="contactsExpandLabel" for="${escapeHtml(controlsId)}">Expand profiles</label>
      </div>
      <div class="contactsList">
        ${cardsHtml}
      </div>
    </div>
  </details>
</section>
  `.trim();
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
    const kind = String(normalizeKind(meta.kind || '') || '').trim();
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
    if (!draft) {
      const issueKey = String(issue || '').trim().toLowerCase();
      if (!ALLOWED_ISSUES.has(issueKey)) {
        throw new Error(`Invalid issue "${issue}" (allowed: ${Array.from(ALLOWED_ISSUES).join(', ')}): ${id || '(missing id)'}`);
      }
      if (!isEvidenceKind(kind)) {
        throw new Error(`Invalid kind "${kind}" (allowed: said/quote/documented/voted/aligned): ${id || '(missing id)'}`);
      }
      if (meta.slot || meta.use || meta.section) {
        const slotKey = String(slot || '').trim().toLowerCase();
        if (!ALLOWED_SLOTS.has(slotKey)) {
          throw new Error(`Invalid slot "${slot}" (allowed: ${Array.from(ALLOWED_SLOTS).join(', ')}): ${id || '(missing id)'}`);
        }
      }
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
    const speakerKey = speakerDisplay ? slugifyKey(speakerDisplay) : '';
    const metaBits = [
      s.party ? `<span class="pill pill--party">${escapeHtml(s.party)}</span>` : '',
      speakerDisplay && speakerDisplay !== (s.candidateName || s.candidate || '') ? `<span class="pill pill--speaker">🗣️ ${escapeHtml(speakerDisplay)}</span>` : '',
      s.issue ? `<span class="pill">${escapeHtml(issueLabel(s.issue))}</span>` : '',
      s.kind ? `<span class="pill pill--kind" title="Evidence type">${escapeHtml(kindIcon(s.kind))} ${escapeHtml(s.kind)}</span>` : '',
      s.date ? `<span class="pill pill--date"><time datetime="${escapeHtml(s.date)}">${escapeHtml(s.date)}</time></span>` : ''
    ].filter(Boolean).join(' ');

    const candidateDisplay = s.candidateName || s.candidate || 'Unknown';

    return `
<article id="receipt-${escapeHtml(s.id)}" class="receipt" data-role="receipt" data-id="${escapeHtml(s.id)}" data-candidate="${escapeHtml(s.candidate)}" data-candidate-name="${escapeHtml(candidateDisplay)}" data-party="${escapeHtml(s.party)}" data-speaker="${escapeHtml(s.speaker || '')}" data-speaker-name="${escapeHtml(s.speakerName || '')}" data-speaker-key="${escapeHtml(speakerKey)}" data-issue="${escapeHtml(s.issue)}" data-kind="${escapeHtml(s.kind)}" data-slot="${escapeHtml(s.slot || '')}" data-date="${escapeHtml(s.date)}" data-sources="${escapeHtml(String(s.sources.length))}" data-primary-source-label="${escapeHtml(primarySource?.label || '')}" data-primary-source-url="${escapeHtml(primarySource?.url || '')}">
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

function speakerDisplayForStatement(s) {
  const speakerDisplay = String(s?.speakerName || s?.speaker || '').trim();
  if (speakerDisplay) return speakerDisplay;
  return String(s?.candidateName || s?.candidate || 'Unknown').trim();
}

function renderSourceCard(s, { ownerCandidateId, ownerName, ownerPartyKey } = {}) {
  const candidateDisplay = String(s?.candidateName || s?.candidate || 'Unknown').trim();
  const owner = String(ownerName || '').trim();
  const isOwned = ownerCandidateId && String(s?.candidate || '').trim() === String(ownerCandidateId);
  const speakerDisplay = String(s?.speakerName || s?.speaker || '').trim();
  const speakerKey = speakerDisplay ? slugifyKey(speakerDisplay) : '';

  const showSpeaker = Boolean(speakerDisplay) && (!owner || speakerDisplay !== owner) && speakerDisplay !== candidateDisplay;

  const issueKey = String(s?.issue || '').trim().toLowerCase();
  const ISSUE_CORNER = {
    'culture-war': '#ff4e43',
    'jobs-rights': '#f4be2d',
    'homes-streets': '#45b26b',
    'health-care': '#2a7dd8',
    'transport-air': '#9c4ddc'
  };
  const issueColor = ISSUE_CORNER[issueKey] || '';

  const metaBits = [
    s.issue ? `<span class="pill">${escapeHtml(issueLabel(s.issue))}</span>` : '',
    s.kind ? `<span class="pill pill--kind" title="Evidence type">${escapeHtml(kindIcon(s.kind))} ${escapeHtml(s.kind)}</span>` : '',
    s.date ? `<span class="pill pill--date"><time datetime="${escapeHtml(s.date)}">${escapeHtml(s.date)}</time></span>` : ''
  ].filter(Boolean).join(' ');

  const sources = Array.isArray(s?.sources) ? s.sources : [];
  const sourcesHtml = sources.length
    ? `<div class="sourceLinks">${sources.slice(0, 2).map((src) => `<a href="${escapeHtml(src.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(shortSourceLabel(src))}</a>`).join('')}</div>`
    : '';

  const whoHtml = showSpeaker
    ? `<span class="sourceSpeaker">${escapeHtml(speakerDisplay)}</span>`
    : (!isOwned ? `<span class="sourceSpeaker">${escapeHtml(candidateDisplay)}</span>` : '');

  // Keep the same dataset contract as the spinner expects.
  const ownedKey = slugifyKey(ownerPartyKey || 'owned');

  return `
<article id="receipt-${escapeHtml(s.id)}" class="sourceCard receipt${isOwned ? ` sourceCard--owned sourceCard--${ownedKey}` : ''}" data-role="receipt" data-id="${escapeHtml(s.id)}" data-candidate="${escapeHtml(s.candidate)}" data-candidate-name="${escapeHtml(candidateDisplay)}" data-party="${escapeHtml(s.party)}" data-speaker="${escapeHtml(s.speaker || '')}" data-speaker-name="${escapeHtml(s.speakerName || '')}" data-speaker-key="${escapeHtml(speakerKey)}" data-issue="${escapeHtml(s.issue)}" data-kind="${escapeHtml(s.kind)}" data-slot="${escapeHtml(s.slot || '')}" data-date="${escapeHtml(s.date)}" data-sources="${escapeHtml(String(sources.length))}"${issueColor ? ` style="--issue:${escapeHtml(issueColor)};"` : ''}>
  <div class="sourceTop">
    ${whoHtml ? `<div class="sourceWho">${whoHtml}</div>` : ''}
    <div class="sourceMeta">${metaBits}</div>
  </div>
  <div class="receiptQuote sourceQuote">${s.quoteHtml}</div>
  ${s.captionHtml ? `<p class="sourceCaption">${s.captionHtml}</p>` : ''}
  ${sourcesHtml}
</article>
  `.trim();
}

function renderSourcesPanel({ title, id, cards, open = true } = {}) {
  const list = Array.isArray(cards) ? cards : [];
  const panelId = slugifyKey(id || title || 'panel');

  const ownerName = String(title || '').trim();
  const ownerCandidateId = String(id || '').trim();
  const ownerPartyKey = partyUi(String(list?.[0]?.party || '')).key;
  const cardsHtml = list.map((s) => renderSourceCard(s, { ownerCandidateId, ownerName, ownerPartyKey })).join('\n');
  const hasOverflow = list.length > 6;

  const issueCounts = {};
  for (const issue of PRIMARY_ISSUES) issueCounts[issue] = 0;
  for (const s of list) {
    const issueKey = String(s?.issue || '').trim().toLowerCase();
    if (PRIMARY_ISSUES.includes(issueKey)) issueCounts[issueKey] += 1;
  }
  const totalCount = list.length;
  const filterBtns = [
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--culture" data-role="sources-filter" data-issue="culture-war" data-label="Culture war" title="Culture war"><span class="sourcesFilterIcon" aria-hidden="true">😡</span>${escapeHtml(String(issueCounts['culture-war'] || 0))}</button>`,
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--jobs" data-role="sources-filter" data-issue="jobs-rights" data-label="Jobs" title="Jobs"><span class="sourcesFilterIcon" aria-hidden="true">💼</span>${escapeHtml(String(issueCounts['jobs-rights'] || 0))}</button>`,
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--homes" data-role="sources-filter" data-issue="homes-streets" data-label="Homes" title="Homes"><span class="sourcesFilterIcon" aria-hidden="true">🏠</span>${escapeHtml(String(issueCounts['homes-streets'] || 0))}</button>`,
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--health" data-role="sources-filter" data-issue="health-care" data-label="Health" title="Health"><span class="sourcesFilterIcon" aria-hidden="true">🏥</span>${escapeHtml(String(issueCounts['health-care'] || 0))}</button>`,
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--transit" data-role="sources-filter" data-issue="transport-air" data-label="Transit" title="Transit"><span class="sourcesFilterIcon" aria-hidden="true">🚌</span>${escapeHtml(String(issueCounts['transport-air'] || 0))}</button>`,
    `<button type="button" class="sourcesFilterBtn sourcesFilterBtn--all is-active" data-role="sources-filter" data-issue="" data-label="All" title="All"><span class="sourcesFilterIcon" aria-hidden="true">🗂️</span>${escapeHtml(String(totalCount))}</button>`
  ].join('');

  const inner = `
  <div class="sourcesGridWrap" data-role="sources-grid-wrap">
    <div class="sourcesGrid">
      ${cardsHtml}
    </div>
  </div>
  ${hasOverflow ? `<div class="sourcesExpandRow"><button type="button" class="sourcesExpandBtn" data-role="sources-expand" data-expanded="0" data-more-label="Show all" data-less-label="Show fewer">Show all</button></div>` : ''}
  `.trim();

  const openAttr = open ? ' open' : '';
  return `
<details class="sourcesPanel" data-role="sources-panel" data-owner="${escapeHtml(ownerCandidateId || panelId)}" data-owner-party="${escapeHtml(ownerPartyKey || '')}" data-has-overflow="${hasOverflow ? '1' : '0'}" data-expanded="0" data-default-open="${open ? '1' : '0'}"${openAttr} aria-labelledby="sources-${escapeHtml(panelId)}">
  <summary class="sourcesPanelSummary">
    <span class="sourcesPanelSummaryTitle" id="sources-${escapeHtml(panelId)}">${escapeHtml(title || 'Sources')}</span>
    <div class="sourcesPanelFilters" role="group" aria-label="Filter by topic">
      <span class="sourcesPanelFiltersHint" aria-hidden="true">Topics:</span>
      <span class="sourcesPanelFiltersValue" data-role="topics-value" aria-hidden="true">All</span>
      ${filterBtns}
    </div>
  </summary>
  <div class="sourcesPanelBody">
    ${inner}
  </div>
</details>
  `.trim();
}

function renderSourcesSection(statements) {
  const list = Array.isArray(statements) ? statements : [];
  if (!list.length) return '';

  const byCandidate = new Map();
  const other = [];

  for (const s of list) {
    const candidateId = String(s?.candidate || '').trim().toLowerCase();
    if (candidateId && CANDIDATE_IDS.includes(candidateId)) {
      const arr = byCandidate.get(candidateId) || [];
      arr.push(s);
      byCandidate.set(candidateId, arr);
    } else {
      other.push(s);
    }
  }

  const panels = [];
  for (const id of CANDIDATE_IDS) {
    const items = byCandidate.get(id) || [];
    if (!items.length) continue;
    const display = items[0]?.candidateName || id;
    // Most recent first
    items.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const isTop = TOP_THREE_CANDIDATES.has(String(id || '').trim().toLowerCase());
    panels.push(renderSourcesPanel({ title: display, id, cards: items, open: isTop }));
  }

  if (other.length) {
    other.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    panels.push(renderSourcesPanel({ title: 'Other speakers / election context', id: 'other', cards: other, open: false }));
  }

  const totalSourcesCount = list.length;
  const countsInlineHtml = renderCountsTableInline(list);

  const statementsPath = 'site/assets/microsites/wheel-of-gorton/Statements.md';
  const statementsViewUrl = `https://github.com/Better-Britain/reports/blob/main/${statementsPath}`;
  const statementsEditUrl = `https://github.com/Better-Britain/reports/edit/main/${statementsPath}`;

  return `
<section class="sourcesWrap" aria-labelledby="sourcesTitle">
  <input class="sourcesTagsToggle" type="checkbox" id="sources-tags" />
  <input class="sourcesAllToggle" type="checkbox" id="sources-all" />
  <div class="sourcesHead">
    <h2 id="sourcesTitle">Sources</h2>
    <p class="sourcesLead">Grouped, link-first cards so you can skim what’s been said, check the original material, and decide what’s fair.</p>
    ${countsInlineHtml ? `<div class="sourcesCounts" aria-label="Evidence activity summary">${countsInlineHtml}</div>` : ''}
    <p class="sourcesNote">Most of these sources are gathered by AI, reviewed, and open for editing. See <a href="${escapeHtml(statementsViewUrl)}" target="_blank" rel="noopener noreferrer"><code>Statements.md</code></a> or <a href="${escapeHtml(statementsEditUrl)}" target="_blank" rel="noopener noreferrer">edit it on GitHub</a>.</p>
    <div class="sourcesControls" role="group" aria-label="Sources display options">
      <label class="sourcesToggleLabel" for="sources-tags" data-off="Show tags" data-on="Hide tags"><span class="sourcesToggleIcon" aria-hidden="true">⚙️</span><span class="sourcesToggleText" data-role="sources-toggle-text">Show tags</span></label>
      <label class="sourcesToggleLabel" for="sources-all" data-off="Show ALL ${escapeHtml(String(totalSourcesCount))} Sources" data-on="Showing ALL ${escapeHtml(String(totalSourcesCount))} Sources"><span class="sourcesToggleIcon" aria-hidden="true">⚙️</span><span class="sourcesToggleText" data-role="sources-toggle-text">Show ALL ${escapeHtml(String(totalSourcesCount))} Sources</span></label>
    </div>
  </div>
  <div class="sourcesPanels">
    ${panels.join('\n')}
  </div>
</section>
  `.trim();
}

function renderCountsTableInline(statements) {
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
  if (!eligible.length) return '';

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
<div class="countsInline">
  <div class="countsInlineTitle">Evidence activity (counts)</div>
  <div class="countsTableWrap">
    <table class="countsTable countsTable--inline">
      <thead>
        <tr>
          <th scope="col">Issue</th>
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
</div>
  `.trim();
}

function renderMethodContext() {
  return `
<section class="methodWrap" aria-labelledby="methodTitle">
  <div class="methodCard">
    <h2 id="methodTitle">Signal vs Noise</h2>
    <p class="methodLead">
      Campaigns are designed to persuade. Parties are not neutral narrators of what their opponents said or did, and commercial media/analysis often optimises for attention and incentives rather than “fair comparison”.
    </p>
    <p class="methodLead">
      Media coverage can drift towards the easiest/clickiest story: the outrage, the horse‑race (“who’s going to win?”), sometimes framed like betting odds, plus a handful of mini scandals — instead of the slower work of explaining what problems constituents actually face, what candidates have done, and what interests they serve.
    </p>
    <p class="methodLead">
      For many people, the real question isn’t “who will win?”, but: <strong>why should I vote for any of them?</strong> When politics looks like drama and results are buried behind waffle and name-calling, disengagement and low turnout become predictable outcomes.
    </p>
  </div>
</section>
  `.trim();
}

function renderConclusion() {
  return `
<section class="conclusionWrap" aria-labelledby="conclusionTitle">
  <div class="conclusionCard">
    <h2 id="conclusionTitle">So… what kind of politics do you want?</h2>
    <p class="conclusionLead">
      Better Britain Bureau is for competence and evidence-led policymaking. This page is built to make chasing/checking claims easier. Hopefully, modern tech helps turn noise into signal for future elections, instead of just putting us all out of work, but who really knows? Not us. 
    </p>
    <p class="conclusionBody">
      The question for voters in Gorton, Denton, Levy and Burnage isn’t just “which party?”, but what kind of politics you want?
    </p>
    <p class="conclusionNote">
      Vote with your heart and your brain, not with your worst fears.
    </p>
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

function renderDemocracyNote() {
  return `
<section class="democracyWrap" aria-labelledby="democracyTitle">
  <div class="democracyCard">
    <h2 id="democracyTitle">A note on democracy (and tools)</h2>
    <p class="democracyBody">
      Real democracy should make finding this kind of information <strong>easy</strong>. Rules about who can (and can’t) send you flyers aren’t enough for voters to make real decisions — and most mainstream media organisations aren’t building these tools, because they cost time, money, effort and care, and they come with legal and exposure risks.
    </p>
    <p class="democracyBody">
      Government should be able to use modern technology to provide oversight and transparency in campaigning, well beyond the UK’s historically poor “balance” instincts that often fail everyone.
    </p>
    <p class="democracyBody">
      A truly progressive government has to own the technology around democracy. We can’t rely on a handful of private monopolies to mediate political reality, because their incentives can run against those of a healthy democracy — especially where the path to profit is attention, persuasion, and asymmetric power.
    </p>
    <p class="democracyNote">
      One of BBB’s longer-term goals is a governance platform built for real people: public-interest information systems, not rage factories and churnalism for clicks.
    </p>
  </div>
</section>
  `.trim();
}


function renderFlyerGallery(flyers) {
  const items = Array.isArray(flyers) ? flyers : [];
  if (!items.length) {
    return `<p class="flyerEmpty"><em>No flyer scans found yet.</em> Add image files to <code>site/assets/microsites/wheel-of-gorton/images/flyers/</code>. Optionally add matching thumbnails to <code>images/flyers/thumbnails/</code> (same filename).</p>`;
  }
  return items.map((f) => {
    const src = String(f.src || '').trim();
    const thumb = String(f.thumb || f.src || '').trim();
    const title = String(f.title || f.id || '').trim();
    const a11y = title ? `Flyer scan: ${title}` : 'Flyer scan';
    if (!src) return '';
    return `
<div class="flyerItem">
  <a class="flyerOpen" href="${escapeHtml(src)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(a11y)}">
    <img src="${escapeHtml(thumb)}" alt="${escapeHtml(a11y)}" loading="lazy" />
  </a>
  <a class="flyerDownload" href="${escapeHtml(src)}" download>
    <span aria-hidden="true">⬇</span> Download
  </a>
  <span class="flyerCap">${escapeHtml(title || 'Flyer')}</span>
</div>
    `.trim();
  }).filter(Boolean).join('\n');
}

function resolveCandidateHeadshots(headshotFiles) {
  const files = Array.isArray(headshotFiles) ? headshotFiles : [];
  const stemToFile = new Map();
  for (const file of files) {
    const ext = path.extname(String(file || '')).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;
    const stem = path.basename(file, ext).toLowerCase();
    if (!stemToFile.has(stem)) stemToFile.set(stem, String(file));
  }

  const fallback = stemToFile.get('angeliki-stogia')
    ? `./images/headshots/${stemToFile.get('angeliki-stogia')}`
    : './images/candidate-labour.png';

  // Include all headshots by stem so the interactive can use non-candidate avatars too.
  const resolved = {};
  for (const [stem, file] of stemToFile.entries()) {
    resolved[String(stem)] = `./images/headshots/${file}`;
  }
  const warnings = [];

  for (const id of CANDIDATE_IDS) {
    const aliases = CANDIDATE_HEADSHOT_ALIASES[id] || [];
    const candidates = [id, ...aliases];
    let picked = '';
    for (const c of candidates) {
      const f = stemToFile.get(String(c || '').toLowerCase());
      if (f) {
        picked = `./images/headshots/${f}`;
        break;
      }
    }
    if (!picked) {
      picked = fallback;
      warnings.push(`Missing headshot for "${id}" in images/headshots; using fallback "${fallback}".`);
    }
    resolved[id] = picked;
  }

  return { fallback, resolved, warnings };
}

function renderContent({ title, statements, additionalSourcesMarkdown, flyers, headshotManifest, candidateContacts }) {
  const standoff = (statements || []).filter((s) => String(s.slot || '').toLowerCase() === 'standoff');
  const further = (statements || []).filter((s) => String(s.slot || '').toLowerCase() !== 'standoff');
  // Keep these lists in the HTML for the interactive to scan, but render them via the new Sources UI.
  const sourcesHtml = renderSourcesSection([...(standoff || []), ...(further || [])]);
  // `script` tags are raw-text; HTML-escaping would break JSON.parse().
  // Escape "<" to avoid accidentally closing the script tag.
  const headshotsJson = JSON
    .stringify(headshotManifest || { fallback: '', resolved: {}, warnings: [] })
    .replace(/</g, '\\u003c');
  const contactsHtml = renderCandidateContactsPanel({ candidates: candidateContacts });
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
      A quick, link-first microsite for the Gorton &amp; Denton by‑election: explore by topic, then check the original sources.
    </p>
    <ul class="heroList">
      <li><strong>Interactive wheel</strong> — pick a topic, click a candidate, and jump to the relevant source cards.</li>
      <li><strong>Candidate profiles</strong> — links you can use, plus a short verified background.</li>
      <li><strong>Flyer scans</strong> — browse and download the campaign material.</li>
      <li><strong>Method &amp; Sources</strong> — grouped cards with topic filters, deep‑links, and optional tags.</li>
    </ul>
    <div class="heroDisclosure" role="note" aria-label="About this page">
      <div class="heroDisclosureRow">
        <span class="heroDisclosureLabel">Paid for by</span>
        <span class="heroDisclosureValue">Nobody — this is my own project, as part of learning to use AI tools properly and responsibly (I’ve been a professional programmer for ~30 years).</span>
      </div>
      <div class="heroDisclosureRow">
        <span class="heroDisclosureLabel">Local note</span>
        <span class="heroDisclosureValue">I live in Longsight (within Gorton &amp; Denton), and I’ve lived in Gorton, Levenshulme and Reddish for 20+ years.</span>
      </div>
    </div>
  </div>
</header>

<section class="sceneWrap" aria-label="Interactive standoff scene">
  <div class="spinnerPanel" data-role="spinner-panel">
    <img class="spinnerBg" src="./images/town-square-placeholder.png" alt="" aria-hidden="true" />
    <svg class="spinnerSvg" data-role="spinner-svg" viewBox="0 0 920 920" aria-label="${escapeHtml(title)} spinner interactive">
      <defs>
        <clipPath id="spinnerAvatarClip">
          <circle r="42"></circle>
        </clipPath>
      </defs>
      <circle cx="460" cy="460" r="410" fill="none" stroke="rgba(30,22,16,.58)" stroke-width="68"></circle>
      <circle cx="460" cy="460" r="410" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="8"></circle>
      <g data-role="wheel-ring"></g>
      <g data-role="pie-group"></g>
      <g data-role="avatars-group"></g>
    </svg>
    <script id="gorton-headshots" type="application/json">${headshotsJson}</script>
    <div class="speechHost" data-role="speech-host" aria-live="polite"></div>
    <p class="privacyLine">This page doesn’t send your choices anywhere. No tracking, no storage. It runs in your browser.</p>
    <noscript>
      <p class="noJsNote"><strong>JavaScript is off.</strong> The interactive bit won’t run, but the receipts below still load.</p>
    </noscript>
  </div>
</section>

${contactsHtml}

<section class="flyersWrap" aria-labelledby="flyersTitle">
  <div class="flyersHead">
    <h2 id="flyersTitle">Flyer scans</h2>
    <p>Click a thumbnail to open the full scan in a new tab. The Download button uses the HTML <code>download</code> attribute (GitHub Pages-friendly).</p>
  </div>
  <div class="flyerGrid" data-role="flyer-gallery">
    ${flyerGalleryHtml}
  </div>
</section>

${renderMethodContext()}

${sourcesHtml}

${renderConclusion()}

  `.trim();
}

export async function buildMicrosite({ sourceDir, outDir } = {}) {
  const src = sourceDir ? path.resolve(sourceDir) : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const out = outDir ? path.resolve(outDir) : path.resolve('docs/wheel-of-gorton');

  const statementsPath = path.join(src, DEFAULT_STATEMENTS_FILE);
  const templatePath = path.join(src, DEFAULT_TEMPLATE_FILE);
  const candidateProfilesPath = path.join(src, DEFAULT_CANDIDATE_PROFILES_FILE);

  const flyersDir = path.join(src, 'images', 'flyers');
  let flyerEntries = [];
  try {
    flyerEntries = await fs.readdir(flyersDir, { withFileTypes: true });
  } catch {
    flyerEntries = [];
  }
  const isImg = (name) => /\.(png|jpe?g|webp|gif)$/i.test(String(name || ''));
  const flyers = [];
  for (const ent of flyerEntries) {
    if (!ent?.isFile?.()) continue;
    const base = String(ent.name || '').trim();
    if (!base || !isImg(base)) continue;
    const ext = path.extname(base);
    const stem = base.slice(0, -ext.length);
    const pretty = stem.replace(/[-_]+/g, ' ').trim();

    const srcRel = `./images/flyers/${base}`;
    let thumbRel = '';
    try {
      await fs.access(path.join(flyersDir, 'thumbnails', base));
      thumbRel = `./images/flyers/thumbnails/${base}`;
    } catch {
      thumbRel = srcRel;
    }

    flyers.push({
      id: stem,
      title: pretty || stem,
      src: srcRel,
      thumb: thumbRel
    });
  }
  flyers.sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')));

  const headshotsDir = path.join(src, 'images', 'headshots');
  let headshotFiles = [];
  try {
    headshotFiles = await fs.readdir(headshotsDir);
  } catch {
    headshotFiles = [];
  }
  const headshotManifest = resolveCandidateHeadshots(headshotFiles);

  const statementsRaw = await fs.readFile(statementsPath, 'utf8');
  const title = parseTitle(statementsRaw);
  const { published } = parseStatementsFromMarkdown(statementsRaw);
  const additionalSourcesMarkdown = extractH2Section(statementsRaw, 'Additional sources');
  let candidateContacts = [];
  try {
    const candidateProfilesRaw = await fs.readFile(candidateProfilesPath, 'utf8');
    const parsed = parseCandidateProfilesFromMarkdown(candidateProfilesRaw, headshotManifest);
    candidateContacts = parsed.candidates || [];
  } catch {
    candidateContacts = [];
  }

  const content = renderContent({ title, statements: published, additionalSourcesMarkdown, flyers, headshotManifest, candidateContacts });

  const template = await fs.readFile(templatePath, 'utf8');
  const html = template
    .replace('{{title}}', escapeHtml(title))
    .replace('{{bodyClass}}', 'bbb-microsite wheel-of-gorton')
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
