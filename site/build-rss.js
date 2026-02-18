import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = path.resolve('docs');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRssDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  // RFC 822 format with weekday
  return d.toUTCString();
}

function ensureLeadingSlash(p) {
  const s = String(p || '');
  if (!s) return '/';
  return s.startsWith('/') ? s : '/' + s;
}

function ensureTrailingSlash(p) {
  const s = String(p || '');
  if (!s) return '/';
  return s.endsWith('/') ? s : s + '/';
}

function withBasePath(basePath, pagePath) {
  const base = ensureTrailingSlash(basePath || '/');
  const page = ensureLeadingSlash(pagePath || '/');
  if (base === '/') return page;
  return base.replace(/\/$/, '') + page;
}

function guessMimeTypeFromUrl(url) {
  const s = String(url || '').toLowerCase();
  const ext = s.split('?')[0].split('#')[0].split('.').pop() || '';
  if (ext === 'png') return 'image/png';
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return 'application/octet-stream';
}

function isAbsoluteUrl(url) {
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(String(url || ''));
}

function parseFrontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const yaml = m[1];
  const content = m[2];
  const data = {};
  yaml.split(/\r?\n/).forEach((line) => {
    const mm = line.match(/^([^:]+):\s*(.*)$/);
    if (!mm) return;
    const key = mm[1].trim();
    let value = mm[2].trim();
    value = value.replace(/^['"]|['"]$/g, '');
    data[key] = value;
  });
  return { data, content };
}

export async function generateRss(config) {
  const siteTitle = config.brand?.siteTitle || 'Better Britain Bureau';
  const siteDesc = config.brand?.rootHeading || '';
  const siteUrl = (config.siteUrl || '').replace(/\/$/, '');
  const basePath = config.basePath || '/';
  const channelPath = withBasePath(basePath, '/');
  const channelLink = siteUrl ? siteUrl + channelPath : channelPath;
  const items = [];
  // Reports with pubDate
  for (const rpt of [...(config.reports?.national || []), ...(config.reports?.local || [])]) {
    if (rpt.disabled) continue;
    if (!rpt.pubDate) continue;
    const pub = toRssDate(rpt.pubDate);
    if (!pub) continue;
    const page = '/' + path.basename(rpt.output || '');
    const pageWithBase = withBasePath(basePath, page);
    const link = siteUrl ? siteUrl + pageWithBase : pageWithBase;
    const imagePath = rpt.image ? (isAbsoluteUrl(rpt.image) ? rpt.image : withBasePath(basePath, rpt.image)) : null;
    const image = imagePath ? (isAbsoluteUrl(imagePath) ? imagePath : (siteUrl ? siteUrl + imagePath : imagePath)) : null;
    items.push({
      title: rpt.title,
      link,
      guid: link,
      pubDate: pub,
      image,
    });
  }
  // Pages
  const pagesDir = path.resolve(config.pagesDir || 'pages');
  try {
    const entries = await fs.readdir(pagesDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      const raw = await fs.readFile(path.join(pagesDir, e.name), 'utf8');
      const fm = parseFrontMatter(raw);
      const pub = fm.data.date ? toRssDate(fm.data.date) : null;
      if (!pub) continue;
      const title = fm.data.title || e.name.replace(/\.md$/i, '');
      const page = '/' + e.name.replace(/\.md$/i, '.html');
      const pageWithBase = withBasePath(basePath, page);
      const link = siteUrl ? siteUrl + pageWithBase : pageWithBase;
      const imagePath = fm.data.image ? (isAbsoluteUrl(fm.data.image) ? fm.data.image : withBasePath(basePath, fm.data.image)) : null;
      const image = imagePath ? (isAbsoluteUrl(imagePath) ? imagePath : (siteUrl ? siteUrl + imagePath : imagePath)) : null;
      items.push({ title, link, guid: link, pubDate: pub, image });
    }
  } catch {}
  // Posts
  const postsDir = path.resolve(config.postsDir || 'posts');
  const postsOutBase = (config.postsOut || 'docs/posts').split('docs/').pop() || 'posts';
  try {
    const entries = await fs.readdir(postsDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile() || !e.name.endsWith('.md')) continue;
      const raw = await fs.readFile(path.join(postsDir, e.name), 'utf8');
      const fm = parseFrontMatter(raw);
      const pub = fm.data.date ? toRssDate(fm.data.date) : null;
      if (!pub) continue;
      const title = fm.data.title || e.name.replace(/\.md$/i, '');
      const page = `/${postsOutBase}/` + e.name.replace(/\.md$/i, '.html');
      const pageWithBase = withBasePath(basePath, page);
      const link = siteUrl ? siteUrl + pageWithBase : pageWithBase;
      const imagePath = fm.data.image ? (isAbsoluteUrl(fm.data.image) ? fm.data.image : withBasePath(basePath, fm.data.image)) : null;
      const image = imagePath ? (isAbsoluteUrl(imagePath) ? imagePath : (siteUrl ? siteUrl + imagePath : imagePath)) : null;
      items.push({ title, link, guid: link, pubDate: pub, image });
    }
  } catch {}

  // Microsites
  for (const ms of (config.microsites || [])) {
    if (ms.disabled) continue;
    const dateIso = ms.pubDate || ms.date || ms.published || '';
    if (!ms.slug || !dateIso) continue;
    const pub = toRssDate(dateIso);
    if (!pub) continue;
    const title = ms.title || ms.slug;
    const page = ms.publicPath || `/${ms.slug}/`;
    const pageWithBase = withBasePath(basePath, page);
    const link = siteUrl ? siteUrl + pageWithBase : pageWithBase;
    const imagePath = ms.image ? (isAbsoluteUrl(ms.image) ? ms.image : withBasePath(basePath, ms.image)) : null;
    const image = imagePath ? (isAbsoluteUrl(imagePath) ? imagePath : (siteUrl ? siteUrl + imagePath : imagePath)) : null;
    items.push({ title, link, guid: link, pubDate: pub, image });
  }

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const atomSelfPath = withBasePath(basePath, '/feed.xml');
  const atomSelf = (siteUrl ? siteUrl : '') + atomSelfPath;

  const rss = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${channelLink}</link>
    <atom:link href=\"${atomSelf}\" rel=\"self\" type=\"application/rss+xml\" />
    <description>${escapeXml(siteDesc)}</description>
${items.map(it => `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${it.link}</link>
      <guid isPermaLink=\"true\">${it.guid}</guid>
      <pubDate>${it.pubDate}</pubDate>
${it.image ? `      <enclosure url=\"${it.image}\" type=\"${guessMimeTypeFromUrl(it.image)}\"/>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;
  await fs.writeFile(path.join(OUTPUT_DIR, 'feed.xml'), rss, 'utf8');
}
