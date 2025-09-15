// Site orchestrator: builds multiple reports, top-level pages, and posts
// - Uses site/site.config.json to discover reports and content dirs
// - Each report has its own builder (e.g., reports/year-of-labour/build.js)
// - Generates docs/index.html with menu for National and Local reports
// - Generates docs/feed.xml (RSS) from dated reports, pages and posts

import fs from 'fs/promises';
import path from 'path';

import MarkdownIt from 'markdown-it';
import mdAnchor from 'markdown-it-anchor';
import { generateRss } from './build-rss.js';
import { absoluteUrl, buildMetaTags, injectHeadMeta } from './build-seo.js';

const OUTPUT_DIR = path.resolve('docs');
const TEMPLATE_FILE = path.resolve('site/template.html');
const SITE_CONFIG = path.resolve('site/site.config.json');

async function copyDirRecursive(srcDir, destDir) {
	await fs.mkdir(destDir, { recursive: true });
	let entries = [];
	try {
		entries = await fs.readdir(srcDir, { withFileTypes: true });
	} catch {
		return; // nothing to copy
	}
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name);
		const destPath = path.join(destDir, entry.name);
		if (entry.isDirectory()) {
			await copyDirRecursive(srcPath, destPath);
		} else if (entry.isFile()) {
			await fs.mkdir(path.dirname(destPath), { recursive: true });
			await fs.copyFile(srcPath, destPath);
		}
	}
}

function slugify(input) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/[\s-]+/g, '-');
}

const md = new MarkdownIt({ html: true, linkify: true })
	.use(mdAnchor, { slugify });

async function loadConfig() {
	const raw = await fs.readFile(SITE_CONFIG, 'utf8');
	return JSON.parse(raw);
}

async function ensureTemplate() {
	try {
		await fs.access(TEMPLATE_FILE);
	} catch {
		await fs.mkdir(path.dirname(TEMPLATE_FILE), { recursive: true });
		const minimal = `<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Better Britain — Site</title>\n<link rel="stylesheet" href="assets/styles.css">\n<body>\n<header class="site-header">\n  <nav class="nav">\n    <a href="#" class="brand">Better Britain</a>\n  </nav>\n</header>\n<main id="content">\n{{content}}\n</main>\n<footer class="site-footer">\n  <p>Built from markdown.</p>\n</footer>\n<script src="assets/app.js" defer></script>\n</body>\n</html>`;
		await fs.writeFile(TEMPLATE_FILE, minimal, 'utf8');
	}
}

async function ensureAssets() {
	const assetsDir = path.resolve('site/assets');
	await fs.mkdir(assetsDir, { recursive: true });
	const stylesFile = path.join(assetsDir, 'styles.css');
	const printCss = path.join(assetsDir, 'print.css');
	const appJs = path.join(assetsDir, 'app.js');
	try { await fs.access(stylesFile); } catch { await fs.writeFile(stylesFile, `:root{--bg:#0b1020;--fg:#f7f7fb;--muted:#c7c9d1;--accent:#ffd24d}body{margin:0;background:#fff;color:#111;font:16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"}header.site-header{position:sticky;top:0;background:#111;color:#fff;padding:.5rem 1rem}header .nav{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}header .brand{font-weight:700;color:#fff;text-decoration:none}main{max-width:900px;margin:2rem auto;padding:0 1rem}section{margin:2.5rem 0}section > h1, section > h2{scroll-margin-top:4rem}.footnotes{font-size:.9em;color:#374151;border-top:1px solid #e5e7eb;margin-top:2rem;padding-top:1rem}footer.site-footer{border-top:1px solid #e5e7eb;margin-top:3rem;padding:1rem;color:#374151;font-size:.9em;text-align:center}`, 'utf8'); }
	try { await fs.access(appJs); } catch { await fs.writeFile(appJs, `document.addEventListener('DOMContentLoaded',()=>{const links=document.querySelectorAll('a[href^="#"]');links.forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);const el=document.getElementById(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}}));});`, 'utf8'); }
	// Copy entire assets directory (including images, SVGs, subfolders) to docs/assets
	await copyDirRecursive(assetsDir, path.join(OUTPUT_DIR, 'assets'));
}

function renderMarkdownString(markdown) {
	return md.render(markdown);
}

// Rewrite markdown links that point to relative .md files → .html outputs
function convertMdLinkToHtml(url) {
	// leave absolute schemes and fragments untouched
	if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)) return url;
	if (url.startsWith('#')) return url;
	// split base, query, and hash
	const m = url.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
	if (!m) return url;
	const base = m[1];
	const query = m[2] || '';
	const hash = m[3] || '';
	if (!/\.md$/i.test(base)) return url;
	const replaced = base.replace(/\.md$/i, '.html');
	return replaced + query + hash;
}

function rewriteMarkdownMdLinksToHtml(markdown) {
	let out = markdown;
	// inline links: [text](url)
	out = out.replace(/\]\(([^)]+)\)/g, (full, url) => `](${convertMdLinkToHtml(url)})`);
	// reference definitions: [id]: url
	out = out.replace(/^\[([^\]]+)\]:\s+(\S+)/gm, (full, label, url) => `[${label}]: ${convertMdLinkToHtml(url)}`);
	// autolinks: <url>
	out = out.replace(/<([^>\s]+)>/g, (full, url) => `<${convertMdLinkToHtml(url)}>`);
	return out;
}

function ensureTrailingSlash(s) {
	if (!s) return '/';
	return s.endsWith('/') ? s : s + '/';
}

// Rewrite root-relative URLs (e.g. /assets/...) to include a configurable basePath (e.g. /reports/)
function applyBasePath(html, basePath) {
	const base = ensureTrailingSlash(basePath || '/');
	// Only rewrite URLs that start with a single slash, not // (protocol-relative) or http(s)
	return html
		.replace(/(href|src)="\/(?!\/)/g, `$1="${base}`)
		.replace(/content="\/(?!\/)/g, `content="${base}`);
}

function parseFrontMatter(raw) {
	// Minimal front-matter parser for ---\nkey: value\n--- blocks
	const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!m) return { data: {}, content: raw };
	const yaml = m[1];
	const content = m[2];
	const data = {};
	yaml.split(/\r?\n/).forEach((line) => {
		const mm = line.match(/^([^:]+):\s*(.*)$/);
		if (!mm) return;
		const key = mm[1].trim();
		let value = mm[2].trim();
		// strip quotes
		value = value.replace(/^['"]|['"]$/g, '');
		data[key] = value;
	});
	return { data, content };
}

async function compilePages(dir, outDir, config) {
	try { await fs.access(dir); } catch { return; }
	const entries = await fs.readdir(dir, { withFileTypes: true });
	for (const e of entries) {
		if (!e.isFile() || !e.name.endsWith('.md')) continue;
		const srcPath = path.join(dir, e.name);
		const raw = await fs.readFile(srcPath, 'utf8');
		const fm = parseFrontMatter(raw);
		const htmlBody = renderMarkdownString(rewriteMarkdownMdLinksToHtml(fm.content));
		const basename = e.name.replace(/\.md$/i, '.html');
		const outPath = path.join(outDir, basename);
		await fs.mkdir(outDir, { recursive: true });
		const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
		const pagePath = '/' + path.relative(OUTPUT_DIR, outPath).replace(/\\/g, '/');
		const meta = buildMetaTags({
			title: fm.data.title,
			description: fm.data.description,
			url: absoluteUrl(config.siteUrl, pagePath),
			image: fm.data.image,
			type: 'article'
		});
		let html = injectHeadMeta(template.replace('{{content}}', htmlBody), meta);
		html = applyBasePath(html, config.basePath);
		await fs.writeFile(outPath, html, 'utf8');
	}
}

async function writePostsIndex(config, outDir) {
	await fs.mkdir(outDir, { recursive: true });
	const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
	const postsDir = path.resolve(config.postsDir || 'posts');
	let items = [];
	try {
		const entries = await fs.readdir(postsDir, { withFileTypes: true });
		for (const e of entries) {
			if (!e.isFile() || !e.name.endsWith('.md')) continue;
			const raw = await fs.readFile(path.join(postsDir, e.name), 'utf8');
			const fm = parseFrontMatter(raw);
			const title = fm.data.title || e.name.replace(/\.md$/i, '');
			const dateIso = fm.data.date || '';
			const dateObj = dateIso ? new Date(dateIso) : null;
			const dateStr = dateObj && !isNaN(dateObj) ? dateObj.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
			const link = e.name.replace(/\.md$/i, '.html');
			items.push({ title, date: dateObj ? dateObj.getTime() : 0, dateStr, link });
		}
	} catch {}
	items.sort((a, b) => b.date - a.date);
	const listHtml = items.map(it => `<li><a href="${it.link}">${it.title}</a>${it.dateStr ? ` <span class="post-date">(${it.dateStr})</span>` : ''}</li>`).join('\n');
	const htmlBody = `<h1>Posts</h1><ul>${listHtml || '<li>No posts yet.</li>'}</ul>`;
	const pagePath = '/' + path.relative(OUTPUT_DIR, path.join(outDir, 'index.html')).replace(/\\/g, '/');
	const meta = buildMetaTags({
		title: 'Posts',
		description: 'Latest posts from Better Britain',
		url: absoluteUrl(config.siteUrl, pagePath),
		type: 'website'
	});
	let html = injectHeadMeta(template.replace('{{content}}', htmlBody), meta);
	html = applyBasePath(html, config.basePath);
	await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
}


async function buildHomepage(config) {
	const isCi = Boolean(process.env.GITHUB_ACTIONS);
	const forceComingSoon = String(process.env.BBB_COMING_SOON || '').toLowerCase() === 'true' || String(process.env.BBB_COMING_SOON || '') === '1';
	const isLive = config.live === true; // only go live when explicitly true
	const useComingSoon = (!isLive && isCi) || forceComingSoon;
	if (config.comingSoonPath && useComingSoon) {
		await fs.mkdir(OUTPUT_DIR, { recursive: true });
		const comingSoonSrc = path.resolve(config.comingSoonPath);
		await fs.copyFile(comingSoonSrc, path.join(OUTPUT_DIR, 'index.html'));
		// Copy referenced image to docs root to match <img src="better-britain-flag.png">
		try {
			const assetDir = path.dirname(comingSoonSrc);
			await fs.copyFile(path.join(assetDir, 'better-britain-flag.png'), path.join(OUTPUT_DIR, 'better-britain-flag.png'));
		} catch {}
		return;
	}
	const national = config.reports?.national || [];
	const local = config.reports?.local || [];
	const brand = config.brand || { siteTitle: 'Better Britain Bureau', rootHeading: 'Broken Britain Briefing' };

	// Detect optional large logo asset
	const logoRel = '/assets/better-britain-bee.png';
	const logoAbs = path.resolve('site' + logoRel);
	let logoExists = false;
	try { await fs.access(logoAbs); logoExists = true; } catch {}

	// Simple HTML escaper for dynamic text
	const escapeHtml = (s) => String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

	const list = (arr) => arr
		.filter(r => !r.disabled)
		.map(r => `<li><a href="${path.basename(r.output)}">${escapeHtml(r.title)}${r.placeholder ? ' (placeholder)' : ''}</a></li>`)
		.join('\n');

	const intro = brand.intro || `After decades of neglect, many people feel Britain is broken. We often slip into cycles of outrage and reaction, and some fear we have moved from Broken Britain to an unfixable Britain. We want to test that claim against evidence and scrutiny. The Broken Britain Briefing is a collection of papers examining the real state of the country and what is being done to fix it, aiming to reduce radical responses with cool, calm, structured and clear reports on the problems facing Britain today.`;

	const content = `
<section class="home-hero" style="text-align:center;margin:1rem 0 2rem 0">
${logoExists ? `\t<img src="${logoRel}" alt="Better Britain bee logo" width="320" height="320" style="max-width:min(60vw,360px);width:320px;height:auto;filter:drop-shadow(0 6px 16px rgba(0,0,0,.15));margin:0 auto .5rem auto;display:block" />\n` : ''}
	<h1 style="margin:.5rem 0 0 0">${escapeHtml(brand.siteTitle)}</h1>
	<p class="subtitle" style="margin:.15rem 0 0 0;color:#6b7280;font-weight:600">${escapeHtml(brand.rootHeading)}</p>
</section>

<section class="home-intro" style="max-width:80ch;margin:0 auto 1.5rem auto">
	<p>${escapeHtml(intro)}</p>
</section>

<section aria-labelledby="national-reports">
	<h3 id="national-reports">National Reports</h3>
	<ul>
		${list(national) || '<li>Coming soon.</li>'}
	</ul>
</section>

<section aria-labelledby="local-reports">
	<h3 id="local-reports">Local Reports</h3>
	<ul>
		${list(local) || '<li>Coming soon.</li>'}
	</ul>
</section>
`;

	const template = await fs.readFile(TEMPLATE_FILE, 'utf8');
	const pagePath = '/index.html';
	const meta = buildMetaTags({
		title: brand.siteTitle,
		description: brand.rootHeading,
		url: absoluteUrl(config.siteUrl, pagePath),
		image: brand.image || (logoExists ? logoRel : undefined),
		type: 'website'
	});
	let html = injectHeadMeta(template.replace('{{content}}', content), meta);
	html = applyBasePath(html, config.basePath);
	await fs.mkdir(OUTPUT_DIR, { recursive: true });
	await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), html, 'utf8');
}

async function build() {
	await ensureTemplate();
	await ensureAssets();
	const config = await loadConfig();
	const allReports = [...(config.reports?.national || []), ...(config.reports?.local || [])].filter(r => !r.disabled);
	for (const rpt of allReports) {
		const mod = await import(path.resolve(rpt.builder));
		if (typeof mod.buildReport === 'function') {
			await mod.buildReport(path.resolve(rpt.output));
			// Inject SEO tags into the built report page
			const outPath = path.resolve(rpt.output);
			try {
				let pageHtml = await fs.readFile(outPath, 'utf8');
				const pagePath = '/' + path.basename(outPath);
				const meta = buildMetaTags({
					title: rpt.title,
					description: rpt.description || config.brand?.rootHeading,
					url: absoluteUrl(config.siteUrl, pagePath),
					image: rpt.image || config.brand?.image,
					type: 'article'
				});
				pageHtml = injectHeadMeta(pageHtml, meta);
				await fs.writeFile(outPath, pageHtml, 'utf8');
			} catch {}
		}
	}
	await compilePages(config.pagesDir || 'pages', OUTPUT_DIR, config);
	const postsOut = path.resolve(config.postsOut || 'docs/posts');
	await compilePages(config.postsDir || 'posts', postsOut, config);
	await writePostsIndex(config, postsOut);
	await buildHomepage(config);
	await generateRss(config);
}

build().catch((err) => {
	console.error(err);
	process.exit(1);
});


