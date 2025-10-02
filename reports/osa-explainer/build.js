import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const TEMPLATE_FILE = path.resolve('site/template.html');
const ROOT_INDEX = path.resolve('reports/osa-explainer/index.md');
const SECTIONS_DIR = path.resolve('reports/osa-explainer/sections');

async function renderMarkdown(markdown) {
  const { default: MarkdownIt } = await import('markdown-it');
  const { default: mdAnchor } = await import('markdown-it-anchor');
  const md = new MarkdownIt({ html: true, linkify: true }).use(mdAnchor, {
    slugify: (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-')
  });
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

function accordionEnhancements(html) {
  const style = `
<style>
  details { border: 1px solid #ddd; border-radius: 6px; padding: .5rem .75rem; margin: .5rem 0; }
  details[open] { background: #fafafa; }
  details > summary { cursor: pointer; font-weight: 600; }
</style>`;
  const script = `
<script>
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'SUMMARY') {
      // let native toggle happen; nothing else required for now
    }
  });
</script>`;
  return style + html + script;
}

export async function buildReport(outFile = path.resolve('docs/osa-explainer.html')) {
  const indexSrc = await fs.readFile(ROOT_INDEX, 'utf8');
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
  const outPath = outIdx !== -1 ? path.resolve(process.argv[outIdx + 1]) : path.resolve('docs/osa-explainer.html');
  buildReport(outPath).catch((err) => { console.error(err); process.exit(1); });
}
