import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const TEMPLATE_FILE = path.resolve('site/template.html');
const INPUT_MD = path.resolve('reports/gaming-and-radicalisation/index.md');

async function renderMarkdown(markdown) {
  const { default: MarkdownIt } = await import('markdown-it');
  const { default: mdAnchor } = await import('markdown-it-anchor');
  const md = new MarkdownIt({ html: true, linkify: true }).use(mdAnchor, {
    slugify: (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-')
  });
  return md.render(markdown);
}

export async function buildReport(outFile = path.resolve('docs/gaming-and-radicalisation.html')) {
  const src = await fs.readFile(INPUT_MD, 'utf8');
  const htmlBody = await renderMarkdown(src);
  const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
  const html = template.replace('{{content}}', `<section id="gaming-and-radicalisation">\n${htmlBody}\n</section>`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html, 'utf8');
}

// CLI usage: node reports/gaming-and-radicalisation/build.js --out docs/gaming-and-radicalisation.html
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const outIdx = process.argv.indexOf('--out');
  const outPath = outIdx !== -1 ? path.resolve(process.argv[outIdx + 1]) : path.resolve('docs/gaming-and-radicalisation.html');
  buildReport(outPath).catch((err) => { console.error(err); process.exit(1); });
}


