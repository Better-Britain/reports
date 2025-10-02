// OSA Explainer client behaviors: toolbar, search, highlighting
(function() {
  const root = document.getElementById('osa-explainer');
  if (!root) return;

  const bySel = (s, ctx=document) => ctx.querySelector(s);
  const bySelAll = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

  // Build toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'osa-toolbar';
  toolbar.innerHTML = `
    <button id="osa-expand-all" aria-label="Expand all">Expand all</button>
    <button id="osa-collapse-all" aria-label="Collapse all">Collapse all</button>
    <input id="osa-search" type="search" placeholder="Search questions and answers…" aria-label="Search" />
    <span class="osa-count" id="osa-count"></span>
  `;
  root.prepend(toolbar);

  const expandBtn = bySel('#osa-expand-all');
  const collapseBtn = bySel('#osa-collapse-all');
  const searchInput = bySel('#osa-search');
  const countEl = bySel('#osa-count');

  expandBtn.addEventListener('click', () => {
    bySelAll('details', root).forEach(d => d.open = true);
  });
  collapseBtn.addEventListener('click', () => {
    bySelAll('details', root).forEach(d => d.open = false);
  });

  // Highlight helper
  function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function clearMarks(container) {
    bySelAll('mark[data-osa]', container).forEach(m => {
      const parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }
  function highlightText(container, term) {
    if (!term) return;
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const rx = new RegExp('(' + escapeReg(term) + ')', 'ig');
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(textNode => {
      const frag = document.createElement('span');
      frag.innerHTML = textNode.nodeValue.replace(rx, '<mark data-osa>$1</mark>');
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function setSearchMode(active) {
    root.classList.toggle('osa-search-active', active);
  }

  function applySearch(term) {
    const trimmed = (term || '').trim();
    const detailsList = bySelAll('details', root);
    let matches = 0;

    // Clear previous highlighting and flags
    detailsList.forEach(d => {
      d.removeAttribute('data-search-match');
      clearMarks(d);
    });

    if (!trimmed) {
      setSearchMode(false);
      countEl.textContent = '';
      return;
    }

    const lower = trimmed.toLowerCase();
    detailsList.forEach(d => {
      // Match against summary text and body text
      const summary = bySel('summary', d);
      const text = (d.textContent || '').toLowerCase();
      const hit = text.includes(lower);
      if (hit) {
        d.setAttribute('data-search-match', '1');
        d.open = true;
        matches++;
        // Highlight within this details only
        highlightText(d, trimmed);
      } else {
        d.open = false;
        d.removeAttribute('data-search-match');
      }
    });

    // Hide non-structured blocks while searching (don’t attempt to match them)
    bySelAll('#osa-explainer > *:not(.osa-toolbar):not(details)', root).forEach(el => {
      el.removeAttribute('data-search-match');
    });

    setSearchMode(true);
    countEl.textContent = matches ? `${matches} match${matches === 1 ? '' : 'es'}` : 'No matches';
  }

  searchInput.addEventListener('input', (e) => applySearch(e.target.value));
})();


