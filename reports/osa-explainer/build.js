import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const TEMPLATE_FILE = path.resolve('site/template.html');
const ROOT_INDEX = path.resolve('reports/osa-explainer/index.md');
const SECTIONS_DIR = path.resolve('reports/osa-explainer/sections');

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-');
}

async function renderMarkdown(markdown) {
  const { default: MarkdownIt } = await import('markdown-it');
  const { default: mdAnchor } = await import('markdown-it-anchor');
  const md = new MarkdownIt({ html: true, linkify: true })
    .use(mdAnchor, { slugify })
    ;
  return md.render(markdown);
}

async function readSections() {
  try {
    const entries = await fs.readdir(SECTIONS_DIR, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && /\.(md|markdown)$/i.test(e.name))
      .map((e) => e.name)
      .sort();
    const parts = [];
    for (const name of files) {
      const src = await fs.readFile(path.join(SECTIONS_DIR, name), 'utf8');
      parts.push(`\n\n<!-- ${name} -->\n\n` + src);
    }
    return parts.join('\n');
  } catch {
    return '';
  }
}

function rewriteIndexTocLinks(markdown, sectionTitleMap) {
  // Replace bullets of the form "- <text> → `sections/x.md`" with "- [<Section H1>](#<slug>)"
  return markdown.replace(/^(\s*-\s*)(?:.+?)\s*→\s*`sections\/([^`]+?)`.*$/gm, (_full, lead, file) => {
    const base = String(file).replace(/\.(md|markdown)$/i, '');
    const title = sectionTitleMap.get(base) || base;
    const anchor = slugify(title);
    return `${lead}[${title}](#${anchor})`;
  });
}

function extractFirstH1(markdown) {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

function accordionEnhancements(html) {
  // Externalize CSS/JS for OSA explainer
  const links = `\n<link rel="stylesheet" href="/assets/osa/osa.css">\n`;
  const scripts = `\n<script src="/assets/osa/osa.js" defer></script>\n`;
  return links + html + scripts;
}

export async function buildReport(outFile = path.resolve('docs/uk-online-safety-act-osa-explainer.html')) {
  const indexSrcRaw = await fs.readFile(ROOT_INDEX, 'utf8');
  // Build map of section filename (without extension) → first H1 title
  let sectionTitleMap = new Map();
  try {
    const entries = await fs.readdir(SECTIONS_DIR, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile() || !/\.(md|markdown)$/i.test(e.name)) continue;
      const src = await fs.readFile(path.join(SECTIONS_DIR, e.name), 'utf8');
      const title = extractFirstH1(src);
      sectionTitleMap.set(e.name.replace(/\.(md|markdown)$/i, ''), title || e.name);
    }
  } catch {}

  const indexSrc = rewriteIndexTocLinks(indexSrcRaw, sectionTitleMap);
  const sectionsSrc = await readSections();
  const combined = indexSrc + (sectionsSrc ? `\n\n---\n\n` + sectionsSrc : '');
  const htmlBody = await renderMarkdown(combined);
  const enhanced = accordionEnhancements(htmlBody);
  const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
  const html = template.replace('{{content}}', `<section id="osa-explainer">\n${enhanced}\n</section>`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html, 'utf8');
}

// CLI usage: node reports/osa-explainer/build.js --out docs/osa-explainer.html
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const outIdx = process.argv.indexOf('--out');
  const outPath = outIdx !== -1 ? path.resolve(process.argv[outIdx + 1]) : path.resolve('docs/uk-online-safety-act-osa-explainer.html');
  buildReport(outPath).catch((err) => { console.error(err); process.exit(1); });
}
