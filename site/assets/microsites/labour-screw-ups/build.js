import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';

const DEFAULT_MD_FILE = 'Labour-Screw-Ups.md';
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
  const m = line.match(/<!--\s*meta\s+([\s\S]*?)\s*-->/i);
  if (!m) return { line, meta: {} };
  const metaRaw = m[1];
  const meta = {};
  for (const part of metaRaw.split(/\s+/g).filter(Boolean)) {
    const mm = part.match(/^([^=]+)=(.*)$/);
    if (!mm) continue;
    meta[mm[1].trim()] = mm[2].trim();
  }
  return { line: line.replace(m[0], '').trimEnd(), meta };
}

function extractLinks(markdown) {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    const label = m[1].trim();
    const url = m[2].trim();
    if (!/^https?:\/\//i.test(url)) continue;
    out.push({ label, url });
  }
  return out;
}

function uniqLinks(links) {
  const seen = new Set();
  const out = [];
  for (const l of links) {
    const key = l.url;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(l);
  }
  return out;
}

function parseTagPrefix(mainLine) {
  // Supports: `1. [Gov] ...` and `101. **[Gov | Topic]** ...`
  const m = mainLine.match(/^\s*\d+\.\s+(?:\*\*)?\[([^\]]+)\](?:\*\*)?\s*(.*)$/);
  if (!m) return { tagRaw: '', rest: mainLine.replace(/^\s*\d+\.\s+/, '') };
  return { tagRaw: m[1].trim(), rest: m[2].trim() };
}

function splitTag(tagRaw) {
  if (!tagRaw) return { actor: 'Other', category: '', categoryPath: [] };
  const parts = tagRaw.split('|').map((s) => s.trim()).filter(Boolean);
  const left = parts[0] || tagRaw;
  const categoryPath = parts.slice(1);
  const category = categoryPath[0] || '';

  // Normalize actor (property), keep category separate.
  const norm = left.toLowerCase();
  if (norm === 'gov' || norm === 'government') return { actor: 'Government', category, categoryPath };
  if (norm === 'opp' || norm === 'opposition') return { actor: 'Opposition', category, categoryPath };
  if (norm === 'opp/party' || norm === 'opp / party') return { actor: 'Opposition / Party', category, categoryPath };
  return { actor: left, category, categoryPath };
}

function stripMetaAndTrailingSources(markdownLine) {
  const { line } = parseMetaComment(markdownLine);
  // Remove parenthetical link groups that appear at the end: `(...)(...)`
  // Keep internal parentheses in the statement.
  let s = line;
  while (true) {
    const trimmed = s.trimEnd();
    const mm = trimmed.match(/\s*\(([^()]*(\[[^\]]+\]\([^)]+\)[^()]*)+)\)\s*$/);
    if (!mm) break;
    s = trimmed.slice(0, trimmed.length - mm[0].length);
  }
  return s.trim();
}

function detectUturn(text) {
  const t = String(text || '');
  return /\bu-?turn(ed|s)?\b/i.test(t)
    || /\bclimbdown\b/i.test(t)
    || /\breversed course\b/i.test(t)
    || /\bwalked (it|this) back\b/i.test(t)
    || /\bbacktrack(ed|ing)?\b/i.test(t);
}

function detectState(notesMarkdown) {
  const m = String(notesMarkdown || '').match(/\*State:\s*([^.*]+)\./i);
  if (!m) return '';
  const raw = m[1].trim();
  const first = raw.split(/\s+/)[0] || raw;
  return first.toLowerCase();
}

function parseSortIso(meta) {
  const raw = meta?.sort || meta?.date || '';
  if (!raw) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  if (/^\d{4}-\d{2}$/.test(raw)) return `${raw}-01`;
  if (/^\d{4}$/.test(raw)) return `${raw}-01-01`;
  return raw;
}

function formatDateDisplay(dateIso, precision) {
  if (!dateIso) return '';
  const p = String(precision || '').toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateIso)) {
    const d = new Date(dateIso + 'T00:00:00Z');
    if (Number.isNaN(d.getTime())) return dateIso;
    return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
  }
  if (/^\d{4}-\d{2}$/.test(dateIso) || p === 'month') {
    const d = new Date((dateIso.length === 7 ? dateIso : dateIso.slice(0, 7)) + '-01T00:00:00Z');
    if (Number.isNaN(d.getTime())) return dateIso;
    return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
  }
  if (/^\d{4}$/.test(dateIso) || p === 'year') return dateIso;
  return dateIso;
}

function stripIndent(lines) {
  return lines
    .map((l) => l.replace(/^\s{4}/, ''))
    .join('\n')
    .trim();
}

function parseEntriesFromMarkdown(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);

  let title = 'Labour screw-ups';
  for (const l of lines) {
    const m = l.match(/^#\s+(.*)$/);
    if (m) { title = m[1].trim(); break; }
  }

  const entries = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!/^\s*\d+\.\s+/.test(line)) continue;

    const block = [line];
    i += 1;
    for (; i < lines.length; i += 1) {
      const next = lines[i];
      if (/^\s*\d+\.\s+/.test(next)) { i -= 1; break; }
      block.push(next);
    }

    const firstLineRaw = block[0];
    const { meta } = parseMetaComment(firstLineRaw);
    const { tagRaw } = parseTagPrefix(parseMetaComment(firstLineRaw).line);
    const { actor, category, categoryPath } = splitTag(tagRaw);
    const categories = categoryPath.map((c) => c.trim()).filter(Boolean);

    const statementMarkdown = stripMetaAndTrailingSources(firstLineRaw)
      .replace(/^\s*\d+\.\s+/, '')
      .replace(/^(?:\*\*)?\[[^\]]+\](?:\*\*)?\s*/, '');

    const notesMarkdown = stripIndent(block.slice(1));

    const links = uniqLinks([
      ...extractLinks(firstLineRaw),
      ...extractLinks(notesMarkdown),
    ]);

    const sortIso = parseSortIso(meta);
    const dateIso = meta?.date || sortIso;
    const precision = meta?.precision || '';
    const state = detectState(notesMarkdown);
    const isUturn = detectUturn(statementMarkdown)
      || detectUturn(notesMarkdown)
      || (state && (state.startsWith('rectified') || state.startsWith('mitigated')));

    entries.push({
      id: (firstLineRaw.match(/^\s*(\d+)\./) || [])[1] || '',
      actor,
      tagRaw,
      category,
      categoryPath,
      categories,
      sortIso,
      dateIso,
      precision,
      isUturn,
      state,
      statementHtml: md.renderInline(statementMarkdown),
      notesHtml: notesMarkdown ? md.render(notesMarkdown) : '',
      sources: links,
    });
  }

  entries.sort((a, b) => String(b.sortIso || '').localeCompare(String(a.sortIso || '')));

  return { title, entries };
}

function renderEntries(entries) {
  return entries.map((e) => {
    const dateDisplay = formatDateDisplay(e.dateIso, e.precision);
    const groupPillClass = e.actor.toLowerCase().includes('gov') || e.actor.toLowerCase() === 'government'
      ? 'pill--gov'
      : (e.actor.toLowerCase().includes('opp') ? 'pill--opp' : '');

    const uturnPill = e.isUturn ? `<span class="pill pill--uturn" title="U-turn / reversal / climbdown flagged">U-turn</span>` : '';
    const statePill = e.state ? `<span class="pill pill--state" title="Outcome state from notes">${escapeHtml(e.state)}</span>` : '';
    const cats = Array.isArray(e.categories) ? e.categories : (e.category ? [e.category] : []);
    const categoryPills = cats.slice(0, 3).map((c) => `<span class="pill" title="Category">${escapeHtml(c)}</span>`).join(' ');
    const moreCats = cats.length > 3 ? ` <span class="pill" title="More categories">+${escapeHtml(cats.length - 3)}</span>` : '';

    const sourcesHtml = e.sources.length
      ? `<ul class="sources" aria-label="Sources">${e.sources.map((s) => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join('')}</ul>`
      : `<div class="noSources" aria-label="Sources"><span class="pill">No sources listed</span></div>`;

    const detailsHtml = e.notesHtml
      ? `<details class="details"><summary>Notes / context</summary><div class="detailsBody">${e.notesHtml}</div></details>`
      : '';

    return `
<article class="entry" data-role="entry" data-sort="${escapeHtml(e.sortIso)}" data-date="${escapeHtml(e.dateIso)}" data-precision="${escapeHtml(e.precision)}" data-group="${escapeHtml(e.actor)}" data-actor="${escapeHtml(e.actor)}"${cats.length ? ` data-categories="${escapeHtml(cats.join('|'))}"` : ''}${e.category ? ` data-category="${escapeHtml(e.category)}"` : ''} data-tag="${escapeHtml(e.tagRaw)}" data-uturn="${e.isUturn ? '1' : '0'}"${e.state ? ` data-state="${escapeHtml(e.state)}"` : ''}>
  <div class="entryTop">
    <span class="pill pill--id">#${escapeHtml(e.id)}</span>
    <span class="pill ${groupPillClass}" title="Actor">${escapeHtml(e.actor)}</span>
    ${categoryPills}${moreCats}
    ${uturnPill}
    ${statePill}
    ${dateDisplay ? `<span class="entryDate"><time datetime="${escapeHtml(e.dateIso)}">${escapeHtml(dateDisplay)}</time></span>` : ''}
  </div>
  <p class="entryMain">${e.statementHtml}</p>
  ${sourcesHtml}
  ${detailsHtml}
</article>`.trim();
  }).join('\n');
}

function buildContent({ title, entries }) {
  const lastSort = entries[0]?.sortIso || '';
  const updated = lastSort ? formatDateDisplay(lastSort, 'day') : '';
  const count = entries.length;
  const uturnCount = entries.filter((e) => e.isUturn).length;
  const byActor = new Map();
  const byCategory = new Map();
  const byState = new Map();
  for (const e of entries) {
    const actor = e.actor || 'Other';
    byActor.set(actor, (byActor.get(actor) || 0) + 1);
    const cats = Array.isArray(e.categories) ? e.categories : (e.category ? [e.category] : []);
    for (const c of cats) {
      const category = String(c || '').trim();
      if (!category) continue;
      byCategory.set(category, (byCategory.get(category) || 0) + 1);
    }
    const state = e.state || '';
    if (state) byState.set(state, (byState.get(state) || 0) + 1);
  }
  const actorList = Array.from(byActor.entries()).sort((a, b) => b[1] - a[1]).map(([actor, n]) => ({ actor, n }));
  const categoryList = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]).map(([category, n]) => ({ category, n }));
  const stateList = Array.from(byState.entries()).sort((a, b) => b[1] - a[1]).map(([state, n]) => ({ state, n }));

  return `
<div class="topPanels">
  <section class="brandPanel" aria-label="Better Britain Bureau">
    <a class="brandMark" href="/" aria-label="Better Britain homepage">
      <img src="/assets/bbb-logo.svg" alt="Better Britain logo" />
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

  <div class="microCrossLinks" aria-label="Other Better Britain micro-sites">
    <span class="microCrossLabel">See our other micro-sites:</span>
    <a href="../immigrants-vs-billionaires/">Immigrants vs Billionaires</a>
    <a href="../woke-vs-antiwoke/">Woke vs Anti-woke</a>
  </div>
</div>

<header class="pageHead">
  <h1>${escapeHtml(title)}</h1>
  <p>A running, source-linked list of notable reversals, broken pledges, and messy climbdowns. Default view is <strong>newest first</strong>.</p>
  <details class="about" open>
    <summary>About this dashboard</summary>
    <div class="aboutBody">
      <p>This is <strong>mostly AI-generated</strong>, <strong>barely reviewed</strong> with <strong>linked sources</strong>. It will be updated occasionally.</p>
      <p>We built it this way because manually digging through modern “bad news” and bullshit is slow, depressing, and usually not that informative — so we made a semi-automatic dashboard to catch Labour drama we might’ve missed.</p>
      <p>
        Spotted something missing or outright wrong?
        <br/>
        Suggest an update to
        <a href="https://github.com/Better-Britain/reports/blob/main/site/assets/microsites/labour-screw-ups/Labour-Screw-Ups.md" target="_blank" rel="noopener noreferrer"><strong>Labour-Screw-Ups.md</strong></a>
        (PRs/issues welcome).
        <a href="https://github.com/Better-Britain/reports/edit/main/site/assets/microsites/labour-screw-ups/Labour-Screw-Ups.md" target="_blank" rel="noopener noreferrer">Suggest an edit</a>.
      </p>
    </div>
  </details>
  <div class="metaRow">
    ${updated ? `<span>Updated: <time datetime="${escapeHtml(lastSort)}">${escapeHtml(updated)}</time></span>` : ''}
    <span data-role="showing">Showing: <strong data-role="showing-count">${escapeHtml(count)}</strong> / ${escapeHtml(count)}</span>
    <span class="noJs"><noscript>JavaScript is off: filters won’t work (the list still loads).</noscript></span>
  </div>
  <div class="filters" aria-label="Filters">
    <button class="chip chip--primary" type="button" data-role="filter" data-filter="all" aria-pressed="true">All <span class="chipCount">${escapeHtml(count)}</span></button>
    <button class="chip" type="button" data-role="filter" data-filter="uturn:1" aria-pressed="false">U-turn flagged <span class="chipCount">${escapeHtml(uturnCount)}</span></button>
    <span class="filtersLabel">Actor:</span>
    ${actorList.map(({ actor, n }) => `<button class="chip" type="button" data-role="filter" data-filter="actor:${escapeHtml(actor)}" aria-pressed="false">${escapeHtml(actor)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
	    ${stateList.length ? `<span class="filtersLabel">State:</span>` : ''}
	    ${stateList.map(({ state, n }) => `<button class="chip" type="button" data-role="filter" data-filter="state:${escapeHtml(state)}" aria-pressed="false">${escapeHtml(state)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
	    ${categoryList.length ? `
	    <span class="filtersLabel filtersLabel--block">Category:</span>
	    <div class="filtersGrid" data-role="category-list">
	      ${categoryList.map(({ category, n }) => `<button class="chip" type="button" data-role="filter" data-filter="category:${escapeHtml(category)}" aria-pressed="false">${escapeHtml(category)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
	    </div>` : ''}
	  </div>
</header>

<section class="panel" aria-label="Entries">
  <div class="entries" data-role="entries" role="list">
    ${renderEntries(entries)}
  </div>
</section>

<footer class="pageFoot" aria-label="Suggest updates">
  <p>
    Spotted something missing or wrong? Suggest an update to
    <a href="https://github.com/Better-Britain/reports/blob/main/site/assets/microsites/labour-screw-ups/Labour-Screw-Ups.md" target="_blank" rel="noopener noreferrer"><strong>Labour-Screw-Ups.md</strong></a>
    (PRs/issues welcome).
    <a href="https://github.com/Better-Britain/reports/edit/main/site/assets/microsites/labour-screw-ups/Labour-Screw-Ups.md" target="_blank" rel="noopener noreferrer">Suggest an edit</a>.
  </p>
</footer>
`.trim();
}

export async function buildMicrosite({ sourceDir, outDir } = {}) {
  const src = sourceDir ? path.resolve(sourceDir) : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const out = outDir ? path.resolve(outDir) : path.resolve('docs/labour-screw-ups');

  const mdPath = path.join(src, DEFAULT_MD_FILE);
  const templatePath = path.join(src, DEFAULT_TEMPLATE_FILE);

  const raw = await fs.readFile(mdPath, 'utf8');
  const { title, entries } = parseEntriesFromMarkdown(raw);
  const content = buildContent({ title, entries });

  const template = await fs.readFile(templatePath, 'utf8');
  const html = template
    .replace('{{title}}', escapeHtml(title))
    .replace('{{bodyClass}}', 'bbb-microsite labour-screw-ups')
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
