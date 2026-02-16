(() => {
  const container = document.querySelector('[data-role="entries"]');
  if (!container) return;

  const tabTimeline = document.querySelector('[data-role="tab-timeline"]');
  const tabGrouped = document.querySelector('[data-role="tab-grouped"]');

  const entries = Array.from(container.querySelectorAll('[data-role="entry"]'));
  const originalOrder = entries.slice();

  const groupRank = (group) => {
    const g = String(group || '').toLowerCase();
    if (g === 'government') return 0;
    if (g === 'opposition') return 1;
    if (g.includes('party')) return 2;
    return 9;
  };

  const byAscSort = (a, b) => String(a.dataset.sort || '').localeCompare(String(b.dataset.sort || ''));
  const byDescSort = (a, b) => String(b.dataset.sort || '').localeCompare(String(a.dataset.sort || ''));

  function clearGroupHeadings() {
    container.querySelectorAll('[data-role="group-heading"]').forEach((n) => n.remove());
  }

  function setTabs(view) {
    if (tabTimeline) tabTimeline.setAttribute('aria-selected', view === 'timeline' ? 'true' : 'false');
    if (tabGrouped) tabGrouped.setAttribute('aria-selected', view === 'grouped' ? 'true' : 'false');
  }

  function applyView(view, { persist = true } = {}) {
    const v = view === 'grouped' ? 'grouped' : 'timeline';
    document.documentElement.dataset.view = v;
    setTabs(v);

    clearGroupHeadings();
    if (v === 'timeline') {
      container.replaceChildren(...originalOrder);
      if (persist) localStorage.setItem('bbb_labour_screwups_view', v);
      return;
    }

    // Grouped: per-group forward chronology, groups ordered by rank then name.
    const groups = new Map();
    for (const entry of entries) {
      const group = entry.dataset.group || 'Other';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(entry);
    }
    for (const list of groups.values()) list.sort(byAscSort);

    const orderedGroups = Array.from(groups.keys()).sort((a, b) => {
      const ra = groupRank(a);
      const rb = groupRank(b);
      if (ra !== rb) return ra - rb;
      return String(a).localeCompare(String(b));
    });

    const frag = document.createDocumentFragment();
    for (const group of orderedGroups) {
      const heading = document.createElement('h2');
      heading.className = 'groupHeading';
      heading.dataset.role = 'group-heading';
      heading.textContent = group;
      frag.appendChild(heading);
      for (const entry of groups.get(group) || []) frag.appendChild(entry);
    }
    container.replaceChildren(frag);
    if (persist) localStorage.setItem('bbb_labour_screwups_view', v);
  }

  // Wire up tabs.
  tabTimeline?.addEventListener('click', () => applyView('timeline'));
  tabGrouped?.addEventListener('click', () => applyView('grouped'));

  // Initial view: query string overrides stored preference.
  const params = new URLSearchParams(location.search);
  const qsView = params.get('view');
  const stored = localStorage.getItem('bbb_labour_screwups_view');
  const initial = (qsView === 'grouped' || qsView === 'timeline') ? qsView : (stored || 'timeline');

  // Ensure default order is newest-first on first load.
  // If the build ever emits unsorted HTML, this keeps the default promise.
  if (initial === 'timeline') {
    originalOrder.sort(byDescSort);
  }

  applyView(initial, { persist: false });
})();

