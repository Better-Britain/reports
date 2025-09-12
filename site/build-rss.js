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
  const channelLink = siteUrl || 'https://example.com';
  const items = [];
  // Reports with pubDate
  for (const rpt of [...(config.reports?.national || []), ...(config.reports?.local || [])]) {
    if (rpt.disabled) continue;
    if (!rpt.pubDate) continue;
    const pub = toRssDate(rpt.pubDate);
    if (!pub) continue;
    const page = '/' + path.basename(rpt.output || '');
    const link = siteUrl ? siteUrl + page : page;
    const image = rpt.image ? (siteUrl ? siteUrl + rpt.image : rpt.image) : null;
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
      const link = siteUrl ? siteUrl + page : page;
      const image = fm.data.image ? (siteUrl ? siteUrl + fm.data.image : fm.data.image) : null;
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
      const link = siteUrl ? siteUrl + page : page;
      const image = fm.data.image ? (siteUrl ? siteUrl + fm.data.image : fm.data.image) : null;
      items.push({ title, link, guid: link, pubDate: pub, image });
    }
  } catch {}

  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const atomSelf = (siteUrl ? siteUrl : '') + '/feed.xml';

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
${it.image ? `      <enclosure url=\"${it.image}\" type=\"image/jpeg\"/>` : ''}
    </item>`).join('\n')}
  </channel>
</rss>`;
  await fs.writeFile(path.join(OUTPUT_DIR, 'feed.xml'), rss, 'utf8');
}
