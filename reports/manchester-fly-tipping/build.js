import fs from 'fs/promises';
import path from 'path';

const TEMPLATE_FILE = path.resolve('site/template.html');
const INPUT_MD = path.resolve('reports/manchester-fly-tipping/index.md');

async function ensurePlaceholder() {
  try {
    await fs.access(INPUT_MD);
  } catch {
    const md = `# Manchester Fly Tipping — Causes and Fixes (Placeholder)\n\nThis is a placeholder outline. A full report is coming soon.`;
    await fs.mkdir(path.dirname(INPUT_MD), { recursive: true });
    await fs.writeFile(INPUT_MD, md, 'utf8');
  }
}

async function renderMarkdown(markdown) {
  const { default: MarkdownIt } = await import('markdown-it');
  const { default: mdAnchor } = await import('markdown-it-anchor');
  const md = new MarkdownIt({ html: true, linkify: true }).use(mdAnchor, {
    slugify: (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-')
  });
  return md.render(markdown);
}

export async function buildReport(outFile = path.resolve('docs/manchester-fly-tipping.html')) {
  await ensurePlaceholder();
  const src = await fs.readFile(INPUT_MD, 'utf8');
  const htmlBody = await renderMarkdown(src);
  const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
  const html = template.replace('{{content}}', `<section id="manchester-fly-tipping">\n${htmlBody}\n</section>`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html, 'utf8');
}
