#!/usr/bin/env node
/**
 * Summarise all policy cards from "A Year of Labour/2.#-*.md" files (excluding 2.0* template)
 * into a single grouped markdown file containing:
 *  - Group heading (chapter first heading) as '# <group name>'
 *  - For each policy card in that group:
 *    - Policy title as '## <policy name>' (demoted from '#')
 *    - Status line (line starting with "[status")
 *    - Outcome score line (any line containing "Outcome score")
 * Groups and cards are separated by blank lines. Source files are not modified.
 *
 * This script does not modify source files. Output is written to policy-summary.md in repo root.
 */

import { promises as fsp } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const YEAR_DIR = path.join(ROOT, '/../A Year of Labour');
const OUTPUT_FILE = path.join(ROOT, 'policy-summary.md');

/**
 * Determine whether a filename is a 2.# chapter but not 2.0 template.
 */
function isEligibleChapter(filename) {
  if (!filename.endsWith('.md')) return false;
  // Expect pattern like 2.X-*.md, but exclude 2.0*
  // Starts with '2.' followed by a non-zero digit, then anything, then .md
  return /^2\.(?!0)\d.*\.md$/i.test(filename);
}

async function readEligibleFiles() {
  const entries = await fsp.readdir(YEAR_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && isEligibleChapter(e.name))
    .map((e) => path.join(YEAR_DIR, e.name))
    // Sort for stable ordering by filename
    .sort((a, b) => a.localeCompare(b, 'en'));
  return files;
}

function splitIntoPolicyBlocks(lines) {
  const blocks = [];
  let current = null;
  const headerRe = /^#([\t ])\S/; // single '#', then space or tab, then non-space

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (headerRe.test(line)) {
      // start a new block
      if (current) blocks.push(current);
      current = { lines: [line] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) blocks.push(current);
  return blocks;
}

function normalizeHeading(headingLine, level) {
  const text = headingLine.replace(/^#+[\t ]*/, '').trim();
  const hashes = '#'.repeat(level);
  return `${hashes} ${text}`;
}

function extractSummaryFromBlock(block, options = {}) {
  const { demoteToLevel } = options;
  const titleLine = block.lines.find((l) => /^#([\t ])\S/.test(l));
  const statusLine = block.lines.find((l) => /^\[status\b/i.test(l));
  const outcomeLine = block.lines.find((l) => /Outcome score/i.test(l));

  // Only output cards that look like policies (must have status or outcome)
  if (!titleLine || (!statusLine && !outcomeLine)) return null;
  const normalizedTitle = demoteToLevel ? normalizeHeading(titleLine, demoteToLevel) : titleLine;
  const parts = [normalizedTitle];
  if (statusLine) parts.push(statusLine);
  if (outcomeLine) parts.push(outcomeLine);
  return parts.join('\n');
}

async function buildSummary() {
  const files = await readEligibleFiles();
  const groupedOutputs = [];
  let policyCount = 0;

  for (const file of files) {
    const content = await fsp.readFile(file, 'utf8');
    // Normalise line endings and split
    const lines = content.replace(/\r\n?/g, '\n').split('\n');
    const blocks = splitIntoPolicyBlocks(lines);
    if (blocks.length === 0) continue;

    // Group title: take the first heading in the file (first block's first line)
    const groupHeadingLine = blocks[0].lines[0];
    const groupHeading = normalizeHeading(groupHeadingLine, 1);

    const policySummaries = [];
    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];
      const summary = extractSummaryFromBlock(block, { demoteToLevel: 2 });
      if (summary) {
        policySummaries.push(summary);
        policyCount += 1;
      }
    }

    if (policySummaries.length > 0) {
      groupedOutputs.push([groupHeading, ...policySummaries].join('\n\n'));
    }
  }

  const finalOutput = groupedOutputs.join('\n\n');
  await fsp.writeFile(OUTPUT_FILE, finalOutput, 'utf8');
  return { outputPath: OUTPUT_FILE, count: policyCount };
}

buildSummary()
  .then(({ outputPath, count }) => {
    console.log(`Wrote ${count} policy summaries to ${path.relative(ROOT, outputPath)}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


