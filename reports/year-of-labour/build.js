// Year of Labour report builder (standalone and importable)
// - Renders top-level markdowns in "A Year of Labour/" into a single HTML file
// - Excludes 2.0 template
// - Normalizes footnote definitions and renders citations with linkbacks/search

import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

import MarkdownIt from 'markdown-it';
import mdFootnote from 'markdown-it-footnote';
import mdAnchor from 'markdown-it-anchor';

const ROOT_DIR = path.resolve('A Year of Labour');
const TEMPLATE_FILE = path.resolve('site/template.html');

//TODO: May want to support filtering policies by tag, area of effect, time horizon, etc.
//TODO: May rename this report to "Labour Progress Report", as we're late for "1 year"

function slugify(input) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/[\s-]+/g, '-');
}

const md = new MarkdownIt({ html: true, linkify: true })
	.use(mdFootnote)
	.use(mdAnchor, { slugify });

function isTopLevelMarkdown(filePath) {
	if (path.dirname(filePath) !== ROOT_DIR) return false;
	return path.extname(filePath).toLowerCase() === '.md';
}

function normalizeFootnoteDefs(markdown) {
	return markdown.replace(/^\s*-\s+(\[\^[^\]]+\]:)/gm, '$1');
}

function transformTags(markdown) {
	// Protect fenced and inline code so we do not inject HTML inside backticks
	const codeBlocks = [];
	const inlineCodes = [];
	let tmp = markdown;

	// Fenced code blocks ```...```
	tmp = tmp.replace(/```[\s\S]*?```/g, (m) => {
		const i = codeBlocks.push(m) - 1;
		return `__CODE_BLOCK_${i}__`;
	});

	// Inline code spans `...`
	tmp = tmp.replace(/`[^`]*`/g, (m) => {
		const i = inlineCodes.push(m) - 1;
		return `__CODE_INLINE_${i}__`;
	});

	// Tag transforms on non-code content
	tmp = tmp
		.replace(/\[(impact-[^\]]+)\]/g, '<span class="tag" data-tag="$1">[$1]</span>')
		.replace(/\[(area:[^\]]+)\]/g, '<span class="tag" data-tag="$1">[$1]</span>')
		.replace(/\[(horizon:[^\]]+)\]/g, '<span class="tag" data-tag="$1">[$1]</span>')
		.replace(/\[(risk:[^\]]+)\]/g, '<span class="tag" data-tag="$1">[$1]</span>')
		.replace(/\[(dist:[^\]]+)\]/g, '<span class="tag" data-tag="$1">[$1]</span>')
		.replace(/\[(unknown|opinion)\]/g, '<span class="tag" data-tag="$1">[$1]</span>');

	// Restore inline code and code blocks
	tmp = tmp.replace(/__CODE_INLINE_(\d+)__/g, (_m, idx) => inlineCodes[Number(idx)]);
	tmp = tmp.replace(/__CODE_BLOCK_(\d+)__/g, (_m, idx) => codeBlocks[Number(idx)]);

	return tmp;
}

function escapeHtml(input) {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function stripInlineMarkdown(input) {
	return input.replace(/[\*_`]+/g, '').replace(/\s+/g, ' ').trim();
}

function parseCitationMap(src) {
	const map = new Map();
	const lines = src.split(/\r?\n/);
	for (const line of lines) {
		const m = line.match(/^\s*-\s+\[\^([^\]]+)\]:\s*(.*)$/);
		if (!m) continue;
		const id = m[1].trim();
		const rest = m[2];
		const urlMatch = rest.match(/(https?:\/\/\S+)\s*$/);
		const url = urlMatch ? urlMatch[1].trim() : '';
		const titleText = rest.replace(/(https?:\/\/\S+)\s*$/, '').replace(/[\|\s]+$/, '').trim();
		map.set(id, { id, url, title: stripInlineMarkdown(titleText) });
	}
	return map;
}

function transformCitationsInline(markdown, citationMap, docTitle) {
	// Protect fenced and inline code so we don't inject anchors into code examples
	const codeBlocks = [];
	const inlineCodes = [];
	let tmp = markdown;

	// Fenced code blocks ```...```
	tmp = tmp.replace(/```[\s\S]*?```/g, (m) => {
		const i = codeBlocks.push(m) - 1;
		return `__CITE_CODE_BLOCK_${i}__`;
	});

	// Inline code spans `...`
	tmp = tmp.replace(/`[^`]*`/g, (m) => {
		const i = inlineCodes.push(m) - 1;
		return `__CITE_CODE_INLINE_${i}__`;
	});

	const lines = tmp.split(/\r?\n/);
	let contextTitle = docTitle || '';
	for (let i = 0; i < lines.length; i += 1) {
		const header = lines[i].match(/^(#{1,6})\s+(.*)$/);
		if (header) contextTitle = header[2].trim();
		const line = lines[i];
		lines[i] = line.replace(/\[\^([^\]]+)\]/g, (_match, inner) => {
			const ids = inner.split(';').map((s) => s.trim()).filter(Boolean).map((s) => s.replace(/^\^/, '').trim());
			const anchors = ids.map((id) => {
				const entry = citationMap.get(id);
				if (entry && entry.url) {
					const titleText = escapeHtml(entry.title || id);
					return `<a class="citation" href="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer" title="${titleText}"><span class="citation-arrow" aria-hidden="true">↗</span><span class="citation-text" aria-hidden="true">${titleText}</span></a>`;
				}
				const query = encodeURIComponent(`${contextTitle} ${id} ${line.trim()}`.trim());
				return `<a class="citation citation-error" href="https://www.google.com/search?q=${query}" target="_blank" rel="noopener noreferrer" title="Search for [^${escapeHtml(id)}]">Missing 🔎</a>`;
			});
			return anchors.join(' ');
		});
	}
	let out = lines.join('\n');

	// Restore inline code and code blocks
	out = out.replace(/__CITE_CODE_INLINE_(\d+)__/g, (_m, idx) => inlineCodes[Number(idx)]);
	out = out.replace(/__CITE_CODE_BLOCK_(\d+)__/g, (_m, idx) => codeBlocks[Number(idx)]);
	return out;
}

function renderCitationsCollapsibleTables(markdown, citationMap) {
	const lines = markdown.split(/\r?\n/);
	const out = [];
	const stack = [];
	let currentRows = [];
	function flushTable() {
		if (!currentRows.length) return;
		out.push('<table class="citations-table">');
		out.push('<thead><tr><th>Citation ID</th><th>Text</th><th>URL</th></tr></thead>');
		out.push('<tbody>');
		for (const row of currentRows) {
			const idCell = `[^${escapeHtml(row.id)}]`;
			const textCell = escapeHtml(row.title || '');
			const urlCell = row.url ? `<a href="${escapeHtml(row.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(row.url)}</a>` : '';
			out.push(`<tr><td><code>${idCell}</code></td><td>${textCell}</td><td>${urlCell}</td></tr>`);
		}
		out.push('</tbody></table>');
		currentRows = [];
	}
	for (const line of lines) {
		const hm = line.match(/^(#{1,6})\s+(.*)$/);
		if (hm) {
			const level = hm[1].length;
			const title = hm[2].trim();
			while (stack.length && stack[stack.length - 1] >= level) {
				flushTable();
				out.push('</div></details>');
				stack.pop();
			}
			out.push(`<details class="citations-level-${level}"><summary>${escapeHtml(title)}</summary><div class="details-body">`);
			stack.push(level);
			continue;
		}
		const cm = line.match(/^\s*(?:-\s+)?\[\^([^\]]+)\]:\s*(.*)$/);
		if (cm) {
			const id = cm[1].trim();
			const entry = citationMap.get(id);
			const url = entry?.url || '';
			const title = entry?.title || cm[2].replace(/(https?:\/\/\S+)\s*$/, '').replace(/[\|\s]+$/, '').trim();
			currentRows.push({ id, title, url });
			continue;
		}
	}
	while (stack.length) {
		flushTable();
		out.push('</div></details>');
		stack.pop();
	}
	return out.join('\n');
}

function extractDocMetaFromSrc(src, filePath) {
	const sectionId = path.basename(filePath, '.md');
	const lines = src.split(/\r?\n/);
	let docTitle = sectionId;
	let seenDocTitle = false;
	const rawHeadings = [];
	for (let i = 0; i < lines.length; i += 1) {
		const m = lines[i].match(/^#\s+(.*)$/);
		if (!m) continue;
		const title = m[1].trim();
		if (!seenDocTitle) { seenDocTitle = true; docTitle = title; continue; }
		rawHeadings.push({ title, id: slugify(title), line: i });
	}

	function findOutcomeScore(sectionText) {
		let score = null;
		const sectionLines = sectionText.split(/\r?\n/);
		// Prefer a line that mentions "Outcome score"
		let line = sectionLines.find((l) => /Outcome\s*score/i.test(l));
		if (!line) {
			// Fallback: search within a short window around the phrase
			const m = sectionText.match(/Outcome\s*score[\s\S]{0,120}/i);
			if (m) line = m[0];
		}
		if (line) {
			const num = (line.match(/([+\-−–]?\s*[0-3])\b/) || [])[1];
			if (num) {
				const normalized = num.replace(/[−–]/g, '-').replace(/\s+/g, '');
				const parsed = parseInt(normalized, 10);
				if (!Number.isNaN(parsed)) score = parsed;
			}
		}
		return score;
	}

	const headings = rawHeadings.map((h, idx) => {
		const start = h.line + 1;
		const end = idx + 1 < rawHeadings.length ? rawHeadings[idx + 1].line : lines.length;
		const section = lines.slice(start, end).join('\n');
		const score = findOutcomeScore(section);
		return { title: h.title, id: h.id, score };
	});
	return { sectionId, docTitle, headings };
}

function buildSidebar(navMeta) {
	const scoreSummaryItem = `<li><a href="#score-summary">Scores Summary</a></li>`;
	const parts = [];
	let inserted = false;
	navMeta.forEach((doc) => {
		// If we haven't inserted yet and this is the Methodology doc, insert before it
		if (!inserted && /methodology/i.test(doc.docTitle)) {
			parts.push(scoreSummaryItem);
			inserted = true;
		}
		const groupAnchorId = slugify(doc.docTitle);
		const isPolicy = /^2\./.test(doc.sectionId);
		const policyItems = doc.headings.map((h) => {
			const hasScore = (h.score === 0 || typeof h.score === 'number');
			const scoreClass = hasScore ? ` score-${h.score}` : '';
			const scoreText = hasScore ? (h.score > 0 ? `+${h.score}` : `${h.score}`) : '';
			const chip = hasScore ? `<span class="score-chip" aria-hidden="true">${escapeHtml(scoreText)}</span>` : '';
			const targetId = `${h.id}-card`;
			return `<li class="policy${scoreClass}">${chip}<a href="#${escapeHtml(targetId)}">${escapeHtml(h.title)}</a></li>`;
		}).join('');
		const scopeItem = isPolicy ? `<li><a href="#${escapeHtml(groupAnchorId)}">Scope</a></li>` : '';
		const hasExpandable = Boolean(scopeItem || policyItems);
		if (hasExpandable) {
			parts.push(`<li><details open><summary>${escapeHtml(doc.docTitle)}</summary><ul>${scopeItem}${policyItems}</ul></details></li>`);
		} else {
			// No scope and no subheadings: render as a simple link to the group title
			parts.push(`<li><a href="#${escapeHtml(groupAnchorId)}">${escapeHtml(doc.docTitle)}</a></li>`);
		}
		// If we haven't inserted yet and this is the Introduction doc, insert after it
		if (!inserted && /introduction/i.test(doc.docTitle)) {
			parts.push(scoreSummaryItem);
			inserted = true;
		}
	});
	return [
		`<aside id="sidebar" class="report-sidebar">`,
		`  <div class="sidebar-header">`,
		`    <h3>Jump to section...</h3>`,
		`    <div class="sidebar-controls">`,
		`      <span id="sidebar-state" class="muted">Menu expanded</span>`,
		`      <button class="sidebar-toggle btn" type="button" aria-label="Toggle sidebar" aria-expanded="true"><span aria-hidden="true">☰</span> Menu</button>`,
		`    </div>`,
		`  </div>`,
		`  <div class="sidebar-global-controls">`,
		`    <button type="button" data-sidebar-toggle="expand-all">Expand all</button>`,
		`    <button type="button" data-sidebar-toggle="collapse-all">Collapse all</button>`,
		`  </div>`,
		`  <ul>`,
		parts.join('\n'),
		`  </ul>`,
		`</aside>`
	].join('\n');
}

async function listMarkdownFiles() {
	const entries = await fs.readdir(ROOT_DIR, { withFileTypes: true });
	const files = entries
		.filter((e) => e.isFile())
		.map((e) => path.join(ROOT_DIR, e.name))
		.filter(isTopLevelMarkdown)
		.filter((p) => path.basename(p) !== '2.0-Template-Policy-Card.md');
	return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

async function ensureTemplate() {
	try {
		await fs.access(TEMPLATE_FILE);
	} catch {
		await fs.mkdir(path.dirname(TEMPLATE_FILE), { recursive: true });
		const minimal = `<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Better Britain — Report</title>\n<link rel="stylesheet" href="assets/styles.css">\n<body>\n<header class="site-header">\n  <nav class="nav">\n    <a href="#" class="brand">Better Britain</a>\n  </nav>\n</header>\n<main id="content">\n{{content}}\n</main>\n<footer class="site-footer">\n  <p>Built from markdown.</p>\n</footer>\n<script src="assets/app.js" defer></script>\n</body>\n</html>`;
		await fs.writeFile(TEMPLATE_FILE, minimal, 'utf8');
	}
}

async function ensureAssets(OUTPUT_DIR) {
	const assetsDir = path.resolve('site/assets');
	await fs.mkdir(assetsDir, { recursive: true });
	const stylesFile = path.join(assetsDir, 'styles.css');
	const appJs = path.join(assetsDir, 'app.js');
	try { await fs.access(stylesFile); } catch { await fs.writeFile(stylesFile, `:root{--bg:#0b1020;--fg:#f7f7fb;--muted:#c7c9d1;--accent:#ffd24d;--error:#b91c1c}body{margin:0;background:#fff;color:#111;font:16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"}header.site-header{position:sticky;top:0;background:#111;color:#fff;padding:.5rem 1rem}header .nav{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}header .brand{font-weight:700;color:#fff{text-decoration:none}}main{max-width:900px;margin:2rem auto;padding:0 1rem}section{margin:2.5rem 0}section > h1, section > h2{scroll-margin-top:4rem}.tag{background:#f0f2f6;border-radius:.25rem;padding:.1rem .35rem;margin:0 .15rem;font-size:.85em;color:#374151}.footnotes{font-size:.9em;color:#374151;border-top:1px solid #e5e7eb;margin-top:2rem;padding-top:1rem}footer.site-footer{border-top:1px solid #e5e7eb;margin-top:3rem;padding:1rem;color:#374151;font-size:.9em;text-align:center}.citation{display:inline-block;text-decoration:none;margin:0 .1rem;color:#111;border:1px solid #d1d5db;border-radius:.25rem;padding:.05rem .25rem;font-size:.85em;line-height:1}.citation + .citation{margin-left:.25rem}.citation:hover{background:#f3f4f6}.citation-error{color:#fff;background:var(--error);border-color:var(--error)}details[class^="citations-level-"]{margin:1rem 0}details[class^="citations-level-"] > summary{cursor:pointer;font-weight:600}details .details-body{padding:.5rem 0 0 0}.citations-controls{display:flex;gap:.5rem;justify-content:flex-end;margin:.5rem 0}.citations-table{width:100%;border-collapse:collapse;margin:.5rem 0 1rem}.citations-table th,.citations-table td{border:1px solid #e5e7eb;padding:.4rem .5rem;text-align:left}.citations-table code{background:#f3f4f6;border-radius:.2rem;padding:.05rem .3rem}pre code, code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:.9em}pre{background:#0f172a0d;border:1px solid #e5e7eb;border-radius:.375rem;padding:1rem;overflow:auto}code{background:#f3f4f6;border:1px solid #e5e7eb;border-radius:.25rem;padding:.05rem .3rem}`, 'utf8'); }
	try { await fs.access(appJs); } catch { await fs.writeFile(appJs, `document.addEventListener('DOMContentLoaded',()=>{const links=document.querySelectorAll('a[href^="#"]');links.forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}}));document.body.addEventListener('click',e=>{const btn=e.target.closest('[data-citations-toggle]');if(!btn)return;const action=btn.getAttribute('data-citations-toggle');const container=btn.closest('section');if(!container)return;const details=container.querySelectorAll('details[class^="citations-level-"]');details.forEach(d=>{if(action==='expand'){d.setAttribute('open','');}else if(action==='collapse'){d.removeAttribute('open');}});});});`, 'utf8'); }
	await fs.mkdir(path.join(OUTPUT_DIR, 'assets'), { recursive: true });
	await fs.copyFile(path.resolve('site/assets/styles.css'), path.join(OUTPUT_DIR, 'assets/styles.css'));
	await fs.copyFile(path.resolve('site/assets/app.js'), path.join(OUTPUT_DIR, 'assets/app.js'));
}

async function readAndRender(filePath, citationMap) {
	let src = await fs.readFile(filePath, 'utf8');
	const base = path.basename(filePath);
	if (base === '5.0-Source-Citations.md') {
		let norm = normalizeFootnoteDefs(src);
		// Use the document H1 to derive a stable slug id that matches the sidebar
		const h1m = norm.match(/^#\s+(.+)$/m);
		const docTitle = h1m ? h1m[1].trim() : 'Source Citations';
		const sectionAnchor = slugify(docTitle);
		const tables = renderCitationsCollapsibleTables(norm, citationMap);
		const controls = `<div class="citations-controls"><button type="button" data-citations-toggle="expand">Expand all</button><button type="button" data-citations-toggle="collapse">Collapse all</button></div>`;
		return `<section id="${sectionAnchor}">\n<h1>${escapeHtml(docTitle)}</h1>\n${controls}\n${tables}\n</section>`;
	}
	src = transformTags(src);
	const h1m = src.match(/^#\s+(.+)$/m);
	const docTitle = h1m ? h1m[1].trim() : path.basename(filePath, '.md');
	src = transformCitationsInline(src, citationMap, docTitle);
	let html = md.render(src);
	// Group policies by splitting from the second H1 onward using <hr> separators
	const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>/g)).map((m) => m.index || 0);
	if (h1Matches.length >= 2) {
		const secondH1 = h1Matches[1];
		const head = html.slice(0, secondH1);
		const body = html.slice(secondH1);
		const parts = body.split(/<hr\b[^>]*>/i);
		const wrapped = parts.map((part) => {
			if (!/<h1\b[^>]*>/.test(part)) return part;
			// Extract the H1 id to build a stable container anchor
			const idMatch = part.match(/<h1[^>]*\bid\s*=\s*"([^"]+)"/i);
			const h1Id = idMatch ? idMatch[1] : '';
			const containerId = h1Id ? `${h1Id}-card` : '';
			const idAttr = containerId ? ` id="${containerId}"` : '';
			return `<div class="policy-card"${idAttr}>${part}</div>`;
		}).join('');
		html = head + wrapped;
	}
	const sectionId = path.basename(filePath, '.md');
	return `<section id="${sectionId}">\n${html}\n</section>`;
}

export async function buildReport(outFile = path.resolve('docs/year-of-labour.html')) {
	await ensureTemplate();
	const OUTPUT_DIR = path.resolve('docs');
	await ensureAssets(OUTPUT_DIR);
	const files = await listMarkdownFiles();
	let citationMap = new Map();
	const citationsPath = files.find((p) => path.basename(p) === '5.0-Source-Citations.md');
	if (citationsPath) {
		const raw = await fs.readFile(citationsPath, 'utf8');
		citationMap = parseCitationMap(raw);
	}
	// Build nav meta from source markdown (group title + policy headings)
	const sources = await Promise.all(files.map(async (file) => ({ file, src: await fs.readFile(file, 'utf8') })));
	const navMeta = sources
		.map(({ file, src }) => extractDocMetaFromSrc(src, file));

	// Helper to strip numeric prefix like "2.8 — " or "2.8 - "
	function prettyTitle(title) {
		return title.replace(/^\s*\d+\.\d+\s*[—-]\s*/u, '').trim();
	}
	function fmtSigned(value, digits = 2) {
		const num = Number(value) || 0;
		const abs = Math.abs(num).toFixed(digits);
		return (num >= 0 ? `+${abs}` : `-${abs}`);
	}
	function scaleClassFromAvg(avg) {
		const rounded = Math.max(-2, Math.min(2, Math.round(avg)));
		return `score-scale-${rounded >= 0 ? rounded : `-${Math.abs(rounded)}`}`;
	}

	// Build score summary (overall and per 2.# group only)
	const policyGroups = navMeta.filter((doc) => /^2\./.test(doc.sectionId));
	const groups = policyGroups.map((doc) => {
		const scored = doc.headings.filter((h) => (h.score === 0 || typeof h.score === 'number'));
		const count = scored.length;
		const sum = scored.reduce((acc, h) => acc + (h.score || 0), 0);
		const avg = count ? (sum / count) : 0;
		return { sectionId: doc.sectionId, title: prettyTitle(doc.docTitle), rawTitle: doc.docTitle, count, sum, avg };
	});
	const totalPolicies = groups.reduce((a, g) => a + g.count, 0);
	const totalScore = groups.reduce((a, g) => a + g.sum, 0);
	const overallAvg = totalPolicies ? (totalScore / totalPolicies) : 0;
	const overallScaleClass = scaleClassFromAvg(overallAvg);
	// Range bar for total score: min = -2 * totalPolicies, max = +2 * totalPolicies
	const minPossible = -2 * totalPolicies;
	const maxPossible =  2 * totalPolicies;
	const rangeDen = (maxPossible - minPossible) || 1;
	const posPct = Math.max(0, Math.min(100, ((totalScore - minPossible) / rangeDen) * 100));

	const summaryHtml = `
<div class="score-summary" id="score-summary" data-total-policies="${totalPolicies}" data-total-score="${totalScore}" data-overall-average="${overallAvg.toFixed(2)}">
	<h2 class="score-summary-title">Scores Summary</h2>
	<div class="score-grid">
		<div class="score-grid-left">
			<table class="score-groups" role="table">
				<thead><tr><th scope="col" class="group-col">Policy group</th><th scope="col" class="score-col">Score</th></tr></thead>
				<tbody>
					${groups.map((g) => {
						const badgeAvg = Number.isFinite(g.avg) ? g.avg : 0;
						const badgeScoreSigned = fmtSigned(badgeAvg, 2);
						const scaleClass = scaleClassFromAvg(badgeAvg);
						const groupAnchor = slugify(g.rawTitle);
						return `<tr class="group-score-row" data-group-id="${g.sectionId}" data-policies="${g.count}" data-score-sum="${g.sum}" data-score-avg="${badgeAvg.toFixed(2)}">` +
							`<td class="group-title"><a class="group-link" href="#${escapeHtml(groupAnchor)}" data-anchor="${escapeHtml(groupAnchor)}">${escapeHtml(g.title)}</a></td>` +
							`<td class="group-badge"><span class="score-badge ${scaleClass}" data-score="${badgeAvg.toFixed(2)}">${badgeScoreSigned} from ${g.count} policies</span></td>` +
						`</tr>`;
					}).join('')}
				</tbody>
			</table>
		</div>
		<div class="score-grid-right">
			<div class="overall-score" id="overall-score" data-policies="${totalPolicies}" data-score-sum="${totalScore}" data-score-avg="${overallAvg.toFixed(2)}">
				<div class="overall-label">Overall Score</div>
				<div class="overall-badge-wrapper">
					<div class="overall-badge score-badge score-badge--overall ${overallScaleClass}" data-score="${overallAvg.toFixed(2)}">${fmtSigned(overallAvg, 2)}</div>
					<div class="overall-meta">
						<span class="overall-policies">Policies: <strong>${totalPolicies}</strong></span>
						<span class="overall-total">Total score: <strong>${totalScore}</strong></span>
					</div>
				</div>
				<div class="score-range" role="img" aria-label="Total score range">
					<div class="score-range__bar"></div>
					<div class="score-range__marker" style="left:${posPct}%;" title="${totalScore} of [${minPossible}..${maxPossible}]"></div>
				</div>
				<div class="overall-explainer">
					Each policy is scored from −2 (harmful) to +2 (strong). The total score is the sum across all policies; the average is the total divided by the number of policies. The coloured bar shows where the total sits between the minimum (all −2) and maximum (all +2) possible scores.
				</div>
			</div>
		</div>
	</div>
</div>`;

	const sections = [];
	for (const file of files) {
		sections.push(await readAndRender(file, citationMap));
	}
	// Try to inject summary before the Methodology, Scoring & Taxonomy panel
	const methodologyPattern = /<h1[^>]*>[^<]*Methodology[^<]*Scoring[^<]*Taxonomy[^<]*<\/h1>/i;
	let injected = false;
	const assembled = sections.map((secHtml) => {
		if (!injected && methodologyPattern.test(secHtml)) {
			injected = true;
			return `${summaryHtml}\n${secHtml}`;
		}
		return secHtml;
	});
	// Fallback: if not found, place summary at the top as before
	const contentHtml = injected ? assembled.join('\n') : `${summaryHtml}${sections.join('\n')}`;
	const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
	const sidebar = buildSidebar(navMeta);
	const layout = [
		`<header class="report-header">`,
		`  <div class="report-heading">`,
		`    <h1 class="report-title">A Year of Labour</h1>`,
		`    <p class="report-subtitle">An evidence‑led look at what changed, what's working or what isn't, and what comes next.</p>`,
		`  </div>`,
		`  <div class="title-controls">`,
		`    <button id="font-switcher" class="btn font-switch" type="button" aria-label="Switch reading font"><span class="font-icon" aria-hidden="true">𝐅</span><span id="font-label">Font</span></button>`,
		`  </div>`,
		`</header>`,
		`<div class="report-layout">`,
		sidebar,
		`  <div class="report-content">`,
		contentHtml,
		`  </div>`,
		`</div>`,
		`<button id="back-to-top" class="back-to-top" type="button" aria-label="Back to top">↑ Top</button>`
	].join('\n');
	const html = template.replace('{{content}}', layout);
	await fs.mkdir(path.dirname(outFile), { recursive: true });
	await fs.writeFile(outFile, html, 'utf8');
}

// CLI support: node reports/year-of-labour/build.js --out path
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
	const outIdx = process.argv.indexOf('--out');
	const outPath = outIdx !== -1 ? path.resolve(process.argv[outIdx + 1]) : path.resolve('docs/year-of-labour.html');
	buildReport(outPath).catch((err) => { console.error(err); process.exit(1); });
}


