#!/usr/bin/env node
/*
  Remove stub footnote entries in 5.0-Source-Citations.md when a duplicate
  definition exists that includes a URL.

  Definition formats handled:
    - "- [^id]: content" (bulleted)
    - "[^id]: content" (non-bulleted)

  Stub = a definition for an id whose content does NOT contain http(s).
  If an id has ≥1 definition with a URL, delete the stub definitions for that id.

  Usage:
    node scripts/remove_stub_citation_dupes.js [path/to/5.0-Source-Citations.md]

  Defaults to A Year of Labour/5.0-Source-Citations.md at repo root.
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PATH = path.join(path.dirname(path.dirname(__filename)), 'A Year of Labour', '5.0-Source-Citations.md');

const FILE_PATH = process.argv[2] || DEFAULT_PATH;

const FOOTNOTE_RE = /^(?<prefix>\s*-\s*)?\[\^(?<id>[^\]]+)\]:\s*(?<content>.*)$/;

function hasUrl(s) {
  return s.includes('http://') || s.includes('https://');
}

function main() {
  if (!fs.existsSync(FILE_PATH)) {
    console.error(`File not found: ${FILE_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(FILE_PATH, 'utf8');
  const lines = raw.split(/\r?\n/);

  // id -> array of { idx, content }
  const byId = new Map();
  lines.forEach((line, idx) => {
    const m = line.match(FOOTNOTE_RE);
    if (!m) return;
    const id = m.groups.id.trim();
    const content = m.groups.content.trim();
    if (!byId.has(id)) byId.set(id, []);
    byId.get(id).push({ idx, content });
  });

  const removeIdx = new Set();
  for (const [id, entries] of byId.entries()) {
    if (entries.length < 2) continue;
    const anyWithUrl = entries.some(e => hasUrl(e.content));
    if (!anyWithUrl) continue; // keep all if no resolved URL yet
    for (const e of entries) {
      if (!hasUrl(e.content)) removeIdx.add(e.idx);
    }
  }

  if (removeIdx.size === 0) {
    console.log('No stub duplicate footnote definitions found.');
    return;
  }

  const out = lines.filter((_, idx) => !removeIdx.has(idx)).join('\n');
  fs.writeFileSync(FILE_PATH, out, 'utf8');
  console.log(`Removed ${removeIdx.size} stub duplicate footnote definition(s).`);
}

main();


