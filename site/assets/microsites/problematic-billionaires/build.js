import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';

const DEFAULT_MD_FILE = 'Billionaire-Database.md';
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

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

function parseMetaComment(line) {
  const m = line.match(/<!--\s*meta\s+([\s\S]*?)\s*-->/i);
  if (!m) return { line, meta: {} };
  const raw = m[1] || '';
  const meta = {};
  const re = /([a-zA-Z0-9_-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let mm;
  while ((mm = re.exec(raw)) !== null) {
    const key = mm[1];
    const value = (mm[2] ?? mm[3] ?? mm[4] ?? '').trim();
    if (key in meta) {
      const prev = meta[key];
      meta[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
    } else {
      meta[key] = value;
    }
  }
  return { line: line.replace(m[0], '').trimEnd(), meta };
}

function parseFirstNumber(s) {
  const m = String(s || '').match(/-?\d+(?:\.\d+)?/);
  if (!m) return NaN;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : NaN;
}

function parseMoneyToUsdNumber(raw) {
  const s = String(raw || '').trim();
  if (!s) return NaN;
  if (s === '?' || s.toLowerCase() === 'unknown' || s === '—' || s === '-') return NaN;

  // Accept inputs like "$41B", "14B+", "450M", "1.2T", "~$5.4B"
  const cleaned = s
    .replace(/[≈~]/g, '')
    .replace(/[, ]/g, '')
    .replace(/[+]/g, '')
    .replace(/USD/i, '')
    .replace(/US\$/i, '$')
    .trim();

  const m = cleaned.match(/([$£€])?\s*(-?\d+(?:\.\d+)?)\s*([kKmMbBtT])?/);
  if (!m) return NaN;
  const num = Number(m[2]);
  if (!Number.isFinite(num)) return NaN;
  const unit = (m[3] || '').toLowerCase();
  const mult = unit === 't' ? 1e12
    : (unit === 'b' ? 1e9
      : (unit === 'm' ? 1e6
        : (unit === 'k' ? 1e3 : 1)));
  return num * mult;
}

function normalizeWorthDisplay(raw) {
  const s = String(raw || '').trim();
  if (!s) return '';
  if (s === '?' || s === '—' || s === '-' || s.toLowerCase() === 'unknown') return '?';
  if (s.startsWith('~') || s.startsWith('≈')) return s;
  return `~${s}`;
}

function pickWorthFromStats(stats) {
  for (const st of (stats || [])) {
    const label = String(st?.label || '').trim().toLowerCase();
    if (!label) continue;
    if (label === 'worth' || label === 'net worth' || label === 'networth') return String(st.value || '').trim();
  }
  return '';
}

function pickAgeFromStats(stats) {
  for (const st of (stats || [])) {
    const label = String(st?.label || '').trim().toLowerCase();
    if (label === 'age') return parseFirstNumber(st.value);
  }
  return NaN;
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

function parseTags(meta) {
  const raw = meta?.tags ?? meta?.tag ?? '';
  if (!raw) return [];
  return String(raw)
    .split(/[|,]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeTags(tags, country) {
  const cKey = String(country || '').trim().toLowerCase();
  const seen = new Set();
  const out = [];
  for (const t of (Array.isArray(tags) ? tags : [])) {
    const raw = String(t || '').trim();
    if (!raw) continue;
    const key = raw.toLowerCase();
    if (cKey && key === cKey) continue; // country already has its own filter/pill
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

function parseStats(meta) {
  const raw = meta?.stats ?? '';
  if (!raw) return [];
  return String(raw)
    .split('|')
    .map((part) => {
      const s = String(part || '').trim();
      if (!s) return null;
      const idx = s.indexOf(':');
      if (idx < 0) return null;
      const label = s.slice(0, idx).trim();
      const value = s.slice(idx + 1).trim();
      if (!label || !value) return null;
      return { label, value };
    })
    .filter(Boolean);
}

function stripWorthStats(stats) {
  const kept = [];
  let removedWorth = false;
  for (const st of (stats || [])) {
    const labelNorm = String(st?.label || '').trim().toLowerCase();
    if (labelNorm === 'worth' || labelNorm === 'net worth' || labelNorm === 'networth') {
      removedWorth = true;
      continue;
    }
    kept.push(st);
  }
  return { kept, removedWorth };
}

function stripIndent(lines) {
  return lines
    .map((l) => l.replace(/^\s{2}/, ''))
    .join('\n')
    .trim();
}

function parseEntriesFromMarkdown(markdownText) {
  const lines = String(markdownText || '').split(/\r?\n/);

  let title = 'Billionaire Database';
  let titleIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^#\s+(.*)$/);
    if (m) { title = m[1].trim(); titleIdx = i; break; }
  }

  const entries = [];

  // Intro is everything after the first H1 until the first H2 entry.
  let introStart = titleIdx >= 0 ? titleIdx + 1 : 0;
  while (introStart < lines.length && !lines[introStart].trim()) introStart += 1;
  let introEnd = introStart;
  while (introEnd < lines.length && !/^##\s+/.test(lines[introEnd])) introEnd += 1;
  const introMarkdown = stripIndent(lines.slice(introStart, introEnd));

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!/^##\s+/.test(line)) continue;

    const { line: clean, meta } = parseMetaComment(line);
    const name = clean.replace(/^##\s+/, '').trim() || `Unknown ${entries.length + 1}`;
    const block = [];
    i += 1;
    for (; i < lines.length; i += 1) {
      const next = lines[i];
      if (/^##\s+/.test(next)) { i -= 1; break; }
      block.push(next);
    }

    const bodyMarkdown = stripIndent(block);
    const sources = uniqLinks([
      ...extractLinks(clean),
      ...extractLinks(bodyMarkdown),
    ]);

    const tagsRaw = parseTags(meta);
    const stats = parseStats(meta);

    const worthRaw = String(meta?.worth || meta?.networth || '').trim() || pickWorthFromStats(stats);
    const worthDisplay = normalizeWorthDisplay(worthRaw) || '?';
    const worthUsd = parseMoneyToUsdNumber(worthRaw);

    const ageRaw = String(meta?.age || '').trim();
    const metaAge = parseFirstNumber(ageRaw);
    const age = Number.isFinite(metaAge) ? metaAge : pickAgeFromStats(stats);

    const country = String(meta?.country || '').trim();
    const bucket = String(meta?.bucket || '').trim();
    const id = String(meta?.id || slugify(name)).trim();
    const description = String(meta?.description || '').trim();
    const tags = normalizeTags(tagsRaw, country);

    entries.push({
      id,
      name,
      country,
      bucket,
      tags,
      stats,
      worthDisplay,
      worthUsd,
      age,
      description,
      bodyHtml: bodyMarkdown ? md.render(bodyMarkdown) : '',
      sources,
      sourcesCount: sources.length,
    });
  }

  entries.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));

  return { title, introHtml: introMarkdown ? md.render(introMarkdown) : '', entries };
}

function pill(text, cls = '') {
  return `<span class="pill${cls ? ` ${cls}` : ''}">${escapeHtml(text)}</span>`;
}

function renderCard(entry) {
  const bucketPill = entry.bucket
    ? pill(entry.bucket === 'quiet' ? 'Quiet extraction' : (entry.bucket === 'sanctioned' ? 'Sanctions / convictions' : entry.bucket), entry.bucket === 'sanctioned' ? 'pill--red' : 'pill--quiet')
    : '';

  const countryPill = entry.country ? pill(entry.country) : '';

  const tagPills = entry.tags.slice(0, 6).map((t) => pill(t)).join(' ');
  const moreTag = entry.tags.length > 6 ? ` ${pill(`+${entry.tags.length - 6}`)}` : '';

  const sourcesHtml = entry.sources.length
    ? `<ul class="sources" aria-label="Sources">${entry.sources.map((s) => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join('')}</ul>`
    : `<div class="pill">No sources listed</div>`;

  const rawStats = Array.isArray(entry.stats) ? entry.stats : [];
  const { kept } = stripWorthStats(rawStats);
  const stats = kept;
  const statsHtml = stats.length
    ? `<div class="cardStats" aria-label="Stats">${stats.slice(0, 4).map((st) => `
  <div class="stat">
    <div class="statLabel">${escapeHtml(st.label)}</div>
    <div class="statValue">${escapeHtml(st.value)}</div>
  </div>`).join('')}
</div>`
    : '';

  const worthBox = `
<div class="cardWorth" aria-label="Worth">
  <div class="cardWorthLabel">Worth</div>
  <div class="cardWorthValue">${escapeHtml(entry.worthDisplay || '')}</div>
</div>`.trim();

  const desc = entry.description ? `<p class="cardDesc">${escapeHtml(entry.description)}</p>` : '';

  const details = entry.bodyHtml || entry.sources.length
    ? `<details class="cardDetails"><summary><span>Receipts</span><span class="receiptCount"># Sources ${escapeHtml(entry.sourcesCount || 0)}</span></summary><div class="cardDetailsBody">${entry.bodyHtml}${sourcesHtml}</div></details>`
    : '';

  const tagMeta = entry.tags.length ? `<div class="cardMeta" aria-label="Tags">${bucketPill} ${countryPill} ${tagPills}${moreTag}</div>` : `<div class="cardMeta" aria-label="Tags">${bucketPill} ${countryPill}</div>`;

  const dataTags = entry.tags.length ? ` data-tags="${escapeHtml(entry.tags.join('|'))}"` : '';
  const dataCountry = entry.country ? ` data-country="${escapeHtml(entry.country)}"` : '';
  const dataBucket = entry.bucket ? ` data-bucket="${escapeHtml(entry.bucket)}"` : '';
  const dataWorth = Number.isFinite(entry.worthUsd) ? ` data-worth="${escapeHtml(entry.worthUsd)}"` : ` data-worth=""`;
  const dataAge = Number.isFinite(entry.age) ? ` data-age="${escapeHtml(entry.age)}"` : ` data-age=""`;
  const dataSources = ` data-sources="${escapeHtml(entry.sourcesCount || 0)}"`;
  const dataName = ` data-name="${escapeHtml(entry.name)}"`;

  return `
<article class="card" data-role="card" data-id="${escapeHtml(entry.id)}"${dataTags}${dataCountry}${dataBucket}${dataWorth}${dataAge}${dataSources}${dataName}>
  <div class="cardInner">
    <div class="cardTop">
      <div class="cardName">${escapeHtml(entry.name)}</div>
      ${worthBox}
    </div>
    ${tagMeta}
    ${desc}
    ${details}
  </div>
  ${statsHtml}
</article>`.trim();
}

function computeOverflow(items, { minCount = 2, pivotIndex = 8, minVisibleOnAllRare = 9 } = {}) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return { visible: [], overflow: [], cutoff: 0 };
  const pivotCount = Number(list[pivotIndex]?.n || 0);
  const cutoff = Math.max(minCount, pivotCount || 0);
  let visible = list.filter((it) => Number(it.n || 0) >= cutoff);
  if (!visible.length) visible = list.slice(0, Math.min(minVisibleOnAllRare, list.length));
  const visibleSet = new Set(visible.map((it) => it?.key));
  const overflow = list.filter((it) => !visibleSet.has(it?.key));
  return { visible, overflow, cutoff };
}

function renderOverflowToggle({ kind, hiddenCount }) {
  if (!hiddenCount) return '';
  const moreLabel = kind === 'country' ? 'More countries…' : 'More tags…';
  const lessLabel = kind === 'country' ? 'Fewer countries…' : 'Fewer tags…';
  return `<button class="chip chip--more" type="button" data-role="overflow-toggle" data-overflow="${escapeHtml(kind)}" data-label-more="${escapeHtml(moreLabel)}" data-label-less="${escapeHtml(lessLabel)}" aria-expanded="false"><span data-role="overflow-label">${escapeHtml(moreLabel)}</span> <span class="chipCount">+${escapeHtml(hiddenCount)}</span></button>`;
}

function buildContent({ title, introHtml, entries }) {
  const count = entries.length;

  const byBucket = new Map();
  const byCountry = new Map();
  const byTag = new Map();

  for (const e of entries) {
    if (e.bucket) byBucket.set(e.bucket, (byBucket.get(e.bucket) || 0) + 1);
    if (e.country) byCountry.set(e.country, (byCountry.get(e.country) || 0) + 1);
    for (const t of (e.tags || [])) {
      byTag.set(t, (byTag.get(t) || 0) + 1);
    }
  }

  const bucketList = Array.from(byBucket.entries()).sort((a, b) => b[1] - a[1]).map(([bucket, n]) => ({ bucket, n }));
  const countryList = Array.from(byCountry.entries()).sort((a, b) => b[1] - a[1]).map(([country, n]) => ({ key: country, country, n }));
  const tagList = Array.from(byTag.entries()).sort((a, b) => b[1] - a[1]).map(([tag, n]) => ({ key: tag, tag, n }));

  const countryOverflow = computeOverflow(countryList, { minCount: 2, pivotIndex: 8, minVisibleOnAllRare: 9 });
  const tagOverflow = computeOverflow(tagList, { minCount: 2, pivotIndex: 8, minVisibleOnAllRare: 9 });

  const cardsHtml = entries.map(renderCard).join('\n');

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

  <div class="microCrossLinks" aria-label="Other Better Britain side-quests">
    <span class="microCrossLabel">See our other side-quests:</span>
    <a href="../what-brexit-costs/">What Brexit Costs</a>
    <a href="../immigrants-vs-billionaires/">Immigrants vs Billionaires</a>
    <a href="../labour-screw-ups/">Labour screw-ups</a>
  </div>
</div>

<header class="pageHead">
  <h1>${escapeHtml(title)}</h1>
  <p class="subtitle">- Not literally, there's probably one doing _something_ good _somewhere_, but we didn't look very hard.</p>
  <p>Who are they, and How they got rich, how they keep control, and what we can actually say about them with sources.</p>
  ${introHtml ? `<div class="intro">${introHtml}</div>` : ''}
  <details class="about">
    <summary>About this database</summary>
    <div class="aboutBody">
      <p>This is <strong>mostly AI-generated</strong>, <strong>lightly reviewed</strong>, and intended to be updated over time. Claims are phrased as “reported / described by” with linked sources.</p>
      <p>Spotted something missing or wrong? Suggest an update to
        <a href="https://github.com/Better-Britain/reports/blob/main/site/assets/microsites/problematic-billionaires/${DEFAULT_MD_FILE}" target="_blank" rel="noopener noreferrer"><strong>${DEFAULT_MD_FILE}</strong></a>
        (PRs/issues welcome).
        <a href="https://github.com/Better-Britain/reports/edit/main/site/assets/microsites/problematic-billionaires/${DEFAULT_MD_FILE}" target="_blank" rel="noopener noreferrer">Suggest an edit</a>.
      </p>
    </div>
  </details>
  <div class="metaRow">
    <span data-role="showing">Showing: <strong data-role="showing-count">${escapeHtml(count)}</strong> / ${escapeHtml(count)}</span>
    <span class="noJs"><noscript>JavaScript is off: filters won’t work (the cards still load).</noscript></span>
    <label class="sortControl">Sort:
      <select class="sortSelect" data-role="sort" aria-label="Sort cards">
        <option value="worth_desc" selected>Worth (high → low)</option>
        <option value="worth_asc">Worth (low → high)</option>
        <option value="name_asc">Name (A–Z)</option>
        <option value="age_desc">Age (old → young)</option>
        <option value="age_asc">Age (young → old)</option>
        <option value="sources_desc">Sources (many → few)</option>
        <option value="sources_asc">Sources (few → many)</option>
      </select>
    </label>
  </div>

  <div class="filters" aria-label="Filters">
    <button class="chip chip--primary" type="button" data-role="filter" data-filter="all" aria-pressed="true">All <span class="chipCount">${escapeHtml(count)}</span></button>
    ${bucketList.length ? `<span class="filtersLabel">Type:</span>` : ''}
    ${bucketList.map(({ bucket, n }) => {
      const label = bucket === 'quiet' ? 'Quiet extraction' : (bucket === 'sanctioned' ? 'Sanctions / convictions' : bucket);
      return `<button class="chip" type="button" data-role="filter" data-filter="bucket:${escapeHtml(bucket)}" aria-pressed="false">${escapeHtml(label)} <span class="chipCount">${escapeHtml(n)}</span></button>`;
    }).join('\n')}
    ${countryList.length ? `<span class="filtersLabel">Country:</span>` : ''}
    ${countryList.length ? `
    <div class="filtersGrid" data-role="country-visible">
      ${countryOverflow.visible.map(({ country, n }) => `<button class="chip" type="button" data-role="filter" data-filter="country:${escapeHtml(country)}" aria-pressed="false">${escapeHtml(country)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
      ${renderOverflowToggle({ kind: 'country', hiddenCount: countryOverflow.overflow.length })}
    </div>
    ${countryOverflow.overflow.length ? `<div class="filtersGrid filtersGrid--overflow" data-role="overflow-panel" data-overflow="country" hidden>
      ${countryOverflow.overflow.map(({ country, n }) => `<button class="chip" type="button" data-role="filter" data-filter="country:${escapeHtml(country)}" aria-pressed="false">${escapeHtml(country)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
    </div>` : ''}` : ''}

    ${tagList.length ? `
    <span class="filtersLabel filtersLabel--block">Tags:</span>
    <div class="filtersGrid" data-role="tag-visible">
      ${tagOverflow.visible.map(({ tag, n }) => `<button class="chip" type="button" data-role="filter" data-filter="tag:${escapeHtml(tag)}" aria-pressed="false">${escapeHtml(tag)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
      ${renderOverflowToggle({ kind: 'tags', hiddenCount: tagOverflow.overflow.length })}
    </div>
    ${tagOverflow.overflow.length ? `<div class="filtersGrid filtersGrid--overflow" data-role="overflow-panel" data-overflow="tags" hidden>
      ${tagOverflow.overflow.map(({ tag, n }) => `<button class="chip" type="button" data-role="filter" data-filter="tag:${escapeHtml(tag)}" aria-pressed="false">${escapeHtml(tag)} <span class="chipCount">${escapeHtml(n)}</span></button>`).join('\n')}
    </div>` : ''}` : ''}
  </div>
</header>

<section class="panel" aria-label="Billionaires">
  <div class="cards" data-role="cards">
    ${cardsHtml}
  </div>
</section>

<footer class="pageFoot" aria-label="Suggest updates">
  <p>
    Suggest updates to
    <a href="https://github.com/Better-Britain/reports/blob/main/site/assets/microsites/problematic-billionaires/${DEFAULT_MD_FILE}" target="_blank" rel="noopener noreferrer"><strong>${DEFAULT_MD_FILE}</strong></a>.
  </p>
</footer>
`.trim();
}

export async function buildMicrosite({ sourceDir, outDir } = {}) {
  const src = sourceDir ? path.resolve(sourceDir) : path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const out = outDir ? path.resolve(outDir) : path.resolve('docs/problematic-billionaires');

  const mdPath = path.join(src, DEFAULT_MD_FILE);
  const templatePath = path.join(src, DEFAULT_TEMPLATE_FILE);

  const raw = await fs.readFile(mdPath, 'utf8');
  const { title, introHtml, entries } = parseEntriesFromMarkdown(raw);
  const content = buildContent({ title, introHtml, entries });

  const template = await fs.readFile(templatePath, 'utf8');
  const html = template
    .replace('{{title}}', escapeHtml(title))
    .replace('{{bodyClass}}', 'bbb-microsite problematic-billionaires')
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
