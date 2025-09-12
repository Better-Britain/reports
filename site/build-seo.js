import path from 'path';

export function absoluteUrl(siteUrl, pagePath) {
  const base = (siteUrl || '').replace(/\/$/, '');
  if (!base) return pagePath;
  if (!pagePath) return base;
  return pagePath.startsWith('http') ? pagePath : `${base}${pagePath.startsWith('/') ? '' : '/'}${pagePath}`;
}

export function buildMetaTags({ title, description, url, image, type = 'article' }) {
  const tags = [];
  if (url) tags.push(`<link rel="canonical" href="${escapeHtml(url)}">`);
  if (title) tags.push(`<meta property="og:title" content="${escapeHtml(title)}">`);
  if (description) tags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
  if (url) tags.push(`<meta property="og:url" content="${escapeHtml(url)}">`);
  tags.push(`<meta property="og:type" content="${escapeHtml(type)}">`);
  if (image) tags.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  if (title) tags.push(`<meta name="twitter:title" content="${escapeHtml(title)}">`);
  if (description) tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}">`);
  if (image) tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}">`);
  return tags.join('\n');
}

export function injectHeadMeta(html, metaHtml) {
  if (!metaHtml) return html;
  if (html.includes('</head>')) {
    return html.replace('</head>', `${metaHtml}\n</head>`);
  }
  // Fallback: insert before <body>
  return html.replace('<body>', `${metaHtml}\n<body>`);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
