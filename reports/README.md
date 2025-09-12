# Reports Directory

This folder contains independent report projects. Each report is a self‑contained mini‑builder that renders markdown into a standalone HTML page using the shared site template.

## Add a New Report

1) Create a report folder:

- Path: `reports/<report-id>/`
- Include at minimum:
  - `index.md` — your report markdown (can start as a placeholder)
  - `build.js` — the report builder (see template below)

2) Add to site config:

- Edit `site/site.config.json`
- Under `reports.national` or `reports.local`, add an entry:

```
{
  "id": "<report-id>",
  "title": "<Human Title>",
  "builder": "reports/<report-id>/build.js",
  "output": "docs/<report-id>.html",
  "disabled": true
}
```

- Set `disabled` to `false` when you want it to appear in the homepage menu and build automatically.

3) Build script template (`build.js`):

```js
import fs from 'fs/promises';
import path from 'path';

const TEMPLATE_FILE = path.resolve('site/template.html');
const INPUT_MD = path.resolve('reports/<report-id>/index.md');

async function ensurePlaceholder() {
  try { await fs.access(INPUT_MD); } catch {
    const md = `# <Human Title> (Placeholder)\n\nShort placeholder. Full report coming soon.`;
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

export async function buildReport(outFile = path.resolve('docs/<report-id>.html')) {
  await ensurePlaceholder();
  const src = await fs.readFile(INPUT_MD, 'utf8');
  const htmlBody = await renderMarkdown(src);
  const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
  const html = template.replace('{{content}}', `<section id="<report-id>">\n${htmlBody}\n</section>`);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html, 'utf8');
}
```

4) Build everything:

- Run: `node site/build-orchestrator.js`
- The homepage (`docs/index.html`) lists enabled reports automatically.

## Notes

- The shared site template is at `site/template.html` and shared assets under `site/assets/`.
- Keep report markdown concise; you can add sub‑sections and citations as needed.
- For large reports, consider adding a small table of contents at the top of `index.md`.
