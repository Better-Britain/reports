import fs from 'fs/promises';
import path from 'path';

import { absoluteUrl } from './build-seo.js';

const OUTPUT_DIR = path.resolve('docs');

const EXCLUDE_PATH_RE = /(?:^|\/)(?:assets|icons)(?:\/|$)|spinner-examples|coming-soon/;
const CANONICAL_RE = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i;

function escapeXml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function ensureLeadingSlash(p) {
	const s = String(p || '');
	if (!s) return '/';
	return s.startsWith('/') ? s : '/' + s;
}

function ensureTrailingSlash(p) {
	const s = String(p || '');
	if (!s) return '/';
	return s.endsWith('/') ? s : s + '/';
}

function withBasePath(basePath, pagePath) {
	const base = ensureTrailingSlash(basePath || '/');
	const page = ensureLeadingSlash(pagePath || '/');
	if (base === '/') return page;
	return base.replace(/\/$/, '') + page;
}

function toSitePath(relPath) {
	const normalized = String(relPath || '').replace(/\\/g, '/');
	if (normalized === 'index.html') return '/index.html';
	if (normalized.endsWith('/index.html')) {
		const dir = normalized.slice(0, -'/index.html'.length);
		return ensureTrailingSlash(`/${dir}`);
	}
	return ensureLeadingSlash(normalized);
}

function toLastMod(mtimeMs) {
	const d = new Date(mtimeMs);
	if (Number.isNaN(d.getTime())) return null;
	return d.toISOString().slice(0, 10);
}

async function resolvePageUrl(absPath, sitePath, config) {
	const basePath = config.basePath || '/';
	try {
		const html = await fs.readFile(absPath, 'utf8');
		const m = html.match(CANONICAL_RE);
		if (m) {
			const href = m[1].trim();
			if (/^https?:\/\//i.test(href)) return href;
			return absoluteUrl(config.siteUrl, withBasePath(basePath, href));
		}
	} catch {}
	return absoluteUrl(config.siteUrl, withBasePath(basePath, sitePath));
}

async function collectBuiltPages(outputDir = OUTPUT_DIR) {
	const pages = [];

	async function walk(dir, rel = '') {
		let entries = [];
		try {
			entries = await fs.readdir(dir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const entry of entries) {
			const relPath = rel ? `${rel}/${entry.name}` : entry.name;
			if (EXCLUDE_PATH_RE.test(relPath)) continue;
			const absPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				await walk(absPath, relPath);
			} else if (entry.isFile() && entry.name.endsWith('.html')) {
				const stat = await fs.stat(absPath);
				pages.push({
					absPath,
					sitePath: toSitePath(relPath),
					lastmod: toLastMod(stat.mtimeMs)
				});
			}
		}
	}

	await walk(outputDir);
	pages.sort((a, b) => a.sitePath.localeCompare(b.sitePath));
	return pages;
}

export async function generateSitemap(config, outputDir = OUTPUT_DIR) {
	const pages = await collectBuiltPages(outputDir);
	const urls = [];
	for (const page of pages) {
		const loc = await resolvePageUrl(page.absPath, page.sitePath, config);
		const lastmod = page.lastmod ? `\n    <lastmod>${escapeXml(page.lastmod)}</lastmod>` : '';
		urls.push(`  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod}\n  </url>`);
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

	await fs.writeFile(path.join(outputDir, 'sitemap.xml'), xml, 'utf8');
}
