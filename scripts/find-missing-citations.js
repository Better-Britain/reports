// Find missing citations across 2.1–2.15 markdown files and write MISSING_LINKS.md
// Usage: node scripts/find-missing-citations.js

import fs from 'fs/promises';
import path from 'path';

const ROOT_DIR = path.resolve('A Year of Labour');
const OUTPUT = path.resolve('MISSING_LINKS.md');

function parseDefinedCitations(sourceMarkdown) {
  const defined = new Set();
  const lines = sourceMarkdown.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*-\s*\[\^([^\]]+)\]:/);
    if (m) defined.add(m[1].trim());
  }
  return defined;
}

function extractInlineCitationIds(text) {
  const ids = [];
  text.replace(/\[\^([^\]]+)\]/g, (_m, inner) => {
    inner.split(';').map(s => s.trim()).filter(Boolean).forEach(part => {
      const id = part.replace(/^\^/, '').trim();
      if (id) ids.push(id);
    });
    return _m;
  });
  return ids;
}

async function main() {
  // Load defined citations from 5.0-Source-Citations.md if present
  let defined = new Set();
  try {
    const citationsPath = path.join(ROOT_DIR, '5.0-Source-Citations.md');
    const raw = await fs.readFile(citationsPath, 'utf8');
    defined = parseDefinedCitations(raw);
  } catch {}

  const dirents = await fs.readdir(ROOT_DIR, { withFileTypes: true });
  const targets = dirents
    .filter(d => d.isFile() && /^(2\.(?:1|2|3|4|5|6|7|8|9|10|11|12|13|14|15))\b.*\.md$/i.test(d.name))
    .map(d => path.join(ROOT_DIR, d.name))
    .sort();

  const missingMap = new Map(); // id -> { count, uses:[{file, policy, lineNo, text}] }

  for (const filePath of targets) {
    const raw = await fs.readFile(filePath, 'utf8');
    const lines = raw.split(/\r?\n/);
    // Track current policy title (H1) as we scan
    let currentPolicy = '';
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const h1 = line.match(/^#\s+(.*)$/);
      if (h1) {
        currentPolicy = h1[1].trim();
      }
      const ids = extractInlineCitationIds(line);
      for (const id of ids) {
        if (defined.has(id)) continue; // known citation
        let entry = missingMap.get(id);
        if (!entry) {
          entry = { count: 0, uses: [] };
          missingMap.set(id, entry);
        }
        entry.count += 1;
        const single = line.replace(/\s+/g, ' ').trim();
        entry.uses.push({ file: path.basename(filePath), policy: currentPolicy, lineNo: i + 1, text: single });
      }
    }
  }

  // Sort by frequency desc then id
  const sorted = Array.from(missingMap.entries()).sort((a, b) => {
    if (b[1].count !== a[1].count) return b[1].count - a[1].count;
    return a[0].localeCompare(b[0]);
  });

  const chunks = [];
  chunks.push('# Missing citations');
  chunks.push('');
  chunks.push('This file lists citation ids referenced in sections 2.1–2.15 that are not defined in `5.0-Source-Citations.md`, ordered by frequency.');
  chunks.push('');

  if (sorted.length === 0) {
    chunks.push('No missing citations found.');
  } else {
    for (const [id, info] of sorted) {
      chunks.push(`- [^${id}]: ${info.count} occurrence${info.count === 1 ? '' : 's'}`);
      for (const use of info.uses) {
        const where = `${use.file}${use.policy ? ` — ${use.policy}` : ''} — L${use.lineNo}`;
        chunks.push(`  - ${where}: ${use.text}`);
      }
      chunks.push('');
    }
  }

  await fs.writeFile(OUTPUT, chunks.join('\n'), 'utf8');
  console.log(`Wrote ${OUTPUT} (${sorted.length} missing ids)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


