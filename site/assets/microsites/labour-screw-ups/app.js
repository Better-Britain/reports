(() => {
  const container = document.querySelector('[data-role="entries"]');
  if (!container) return;

  const tabTimeline = document.querySelector('[data-role="tab-timeline"]');
  const tabGrouped = document.querySelector('[data-role="tab-grouped"]');
  const showingCount = document.querySelector('[data-role="showing-count"]');
  const categorySearch = document.querySelector('[data-role="category-search"]');
  const categoryList = document.querySelector('[data-role="category-list"]');

  function getFilterButtons() {
    return Array.from(document.querySelectorAll('[data-role="filter"]'));
  }

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

  const filters = {
    uturn: false,
    actor: new Set(),
    category: new Set(),
    state: new Set(),
  };

  function anyFilterActive() {
    return filters.uturn
      || filters.actor.size
      || filters.category.size
      || filters.state.size;
  }

  function matchesFilters(entry) {
    if (filters.uturn && String(entry.dataset.uturn || '0') !== '1') return false;
    if (filters.actor.size && !filters.actor.has(String(entry.dataset.actor || entry.dataset.group || ''))) return false;
    if (filters.category.size && !filters.category.has(String(entry.dataset.category || ''))) return false;
    if (filters.state.size && !filters.state.has(String(entry.dataset.state || ''))) return false;
    return true;
  }

  function applyFilters() {
    let shown = 0;
    for (const entry of entries) {
      const ok = matchesFilters(entry);
      entry.hidden = !ok;
      if (ok) shown += 1;
    }
    if (showingCount) showingCount.textContent = String(shown);

    // Hide any group headings that have no visible entries under them.
    const headings = Array.from(container.querySelectorAll('[data-role="group-heading"]'));
    for (const heading of headings) {
      let cursor = heading.nextElementSibling;
      let anyVisible = false;
      while (cursor && cursor.dataset?.role !== 'group-heading') {
        if (cursor.dataset?.role === 'entry' && !cursor.hidden) { anyVisible = true; break; }
        cursor = cursor.nextElementSibling;
      }
      heading.hidden = !anyVisible;
    }
  }

  function setButtonPressed(btn, pressed) {
    btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  }

  function syncFilterButtons() {
    for (const btn of getFilterButtons()) {
      const raw = String(btn.dataset.filter || '');
      if (raw === 'all') {
        setButtonPressed(btn, !anyFilterActive());
        continue;
      }
      const idx = raw.indexOf(':');
      const key = idx >= 0 ? raw.slice(0, idx) : raw;
      const value = idx >= 0 ? raw.slice(idx + 1) : '';
      if (key === 'uturn') setButtonPressed(btn, filters.uturn);
      else if (key === 'actor') setButtonPressed(btn, filters.actor.has(value));
      else if (key === 'category') setButtonPressed(btn, filters.category.has(value));
      else if (key === 'state') setButtonPressed(btn, filters.state.has(value));
    }
  }

  function resetFilters() {
    filters.uturn = false;
    filters.actor.clear();
    filters.category.clear();
    filters.state.clear();
    syncFilterButtons();
    applyFilters();
  }

  function toggleFilter(raw) {
    if (raw === 'all') { resetFilters(); return; }
    const idx = raw.indexOf(':');
    const key = idx >= 0 ? raw.slice(0, idx) : raw;
    const value = idx >= 0 ? raw.slice(idx + 1) : '';
    if (key === 'uturn') {
      filters.uturn = !filters.uturn;
    } else if (key === 'actor') {
      if (filters.actor.has(value)) filters.actor.delete(value);
      else filters.actor.add(value);
    } else if (key === 'category') {
      if (filters.category.has(value)) filters.category.delete(value);
      else filters.category.add(value);
    } else if (key === 'state') {
      if (filters.state.has(value)) filters.state.delete(value);
      else filters.state.add(value);
    }
    syncFilterButtons();
    applyFilters();
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
      applyFilters();
      return;
    }

    // Grouped: per-group forward chronology, groups ordered by rank then name.
    const groups = new Map();
    for (const entry of entries) {
      const group = entry.dataset.group || entry.dataset.actor || 'Other';
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
    applyFilters();
  }

  // Wire up tabs.
  tabTimeline?.addEventListener('click', () => applyView('timeline'));
  tabGrouped?.addEventListener('click', () => applyView('grouped'));

  // Wire up filter chips (delegated so it works even if the DOM is rebuilt).
  document.addEventListener('click', (ev) => {
    const btn = ev.target?.closest?.('[data-role="filter"]');
    if (!btn) return;
    ev.preventDefault();
    toggleFilter(String(btn.dataset.filter || ''));
  });

  // Filter category chips list by search query.
  categorySearch?.addEventListener('input', () => {
    const q = String(categorySearch.value || '').trim().toLowerCase();
    if (!categoryList) return;
    const chips = Array.from(categoryList.querySelectorAll('[data-role="filter"]'));
    for (const chip of chips) {
      const text = String(chip.textContent || '').toLowerCase();
      chip.hidden = q ? !text.includes(q) : false;
    }
  });

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

  syncFilterButtons();
  applyView(initial, { persist: false });
})();
