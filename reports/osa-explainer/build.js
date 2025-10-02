import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

const TEMPLATE_FILE = path.resolve('site/template.html');
const ROOT_INDEX = path.resolve('reports/osa-explainer/index.md');
const SECTIONS_DIR = path.resolve('reports/osa-explainer/sections');

async function renderMarkdown(markdown) {
  const { default: MarkdownIt } = await import('markdown-it');
  const { default: mdAnchor } = await import('markdown-it-anchor');
  const { default: mdTocDoneRight } = await import('markdown-it-toc-done-right');
  const md = new MarkdownIt({ html: true, linkify: true })
    .use(mdAnchor, {
      slugify: (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-')
    })
    .use(mdTocDoneRight, { containerClass: 'toc', listType: 'ul' });
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
  :root {
    --bg: #ffffff;
    --fg: #111;
    --muted: #666;
    --border: #e5e7eb;
    --accent: #0a7;
  }
  body { background: var(--bg); color: var(--fg); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; }
  #osa-explainer { max-width: 980px; margin: 2rem auto; padding: 0 1rem; }
  .page-header { margin-bottom: 1rem; }
  .toolbar { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: .5rem; background: #fafafa; position: sticky; top: 0; z-index: 1; }
  .toolbar button { border: 1px solid var(--border); background: #fff; padding: .4rem .6rem; border-radius: 6px; cursor: pointer; }
  .toolbar input[type="search"] { flex: 1 1 260px; border: 1px solid var(--border); border-radius: 6px; padding: .4rem .6rem; }
  .toc { border-left: 3px solid var(--border); padding-left: .75rem; margin: 1rem 0; color: var(--muted); }
  details { border: 1px solid var(--border); border-radius: 6px; padding: .5rem .75rem; margin: .5rem 0; }
  details[open] { background: #fbfbfb; }
  details > summary { cursor: pointer; font-weight: 600; }
  details mark { background: #fff59d; }
  a { color: #0a66c2; }
  hr { border: 0; border-top: 1px solid var(--border); margin: 2rem 0; }
</style>`;
  const script = `
<script>
  (function() {
    const root = document.getElementById('osa-explainer');
    if (!root) return;

    function $(sel, ctx=document) { return ctx.querySelector(sel); }
    function $all(sel, ctx=document) { return Array.from(ctx.querySelectorAll(sel)); }

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    toolbar.innerHTML = ` + "`" + `
      <button id="expand-all" aria-label="Expand all">Expand all</button>
      <button id="collapse-all" aria-label="Collapse all">Collapse all</button>
      <input id="qa-filter" type="search" placeholder="Filter questions…" aria-label="Filter questions" />
      <span id="match-count" style="color: var(--muted);"></span>
    ` + "`" + `;
    root.prepend(toolbar);

    const expandBtn = $('#expand-all');
    const collapseBtn = $('#collapse-all');
    const filterInput = $('#qa-filter');
    const matchCount = $('#match-count');

    expandBtn.addEventListener('click', () => {
      $all('details').forEach(d => d.open = true);
    });
    collapseBtn.addEventListener('click', () => {
      $all('details').forEach(d => d.open = false);
    });

    function highlight(text, term) {
      if (!term) return text;
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp('(' + safe + ')', 'ig'), '<mark>$1</mark>');
    }

    function applyFilter(term) {
      let matches = 0;
      $all('details').forEach(d => {
        const sum = d.querySelector('summary');
        const bodyText = d.textContent || '';
        const hit = !term || bodyText.toLowerCase().includes(term.toLowerCase());
        d.style.display = hit ? '' : 'none';
        // summary highlight
        if (sum) {
          const raw = sum.getAttribute('data-raw') || sum.innerHTML;
          if (!sum.getAttribute('data-raw')) sum.setAttribute('data-raw', raw);
          sum.innerHTML = hit ? highlight(raw, term) : raw;
        }
        if (hit) matches++;
      });
      matchCount.textContent = term ? (matches + ' matches') : '';
    }

    filterInput.addEventListener('input', (e) => applyFilter(e.target.value.trim()));
  })();
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
