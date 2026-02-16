(() => {
  const container = document.querySelector('[data-role="entries"]');
  if (!container) return;

  const showingCount = document.querySelector('[data-role="showing-count"]');
  const aboutDetails = document.querySelector('details.about');

  if (aboutDetails) {
    const key = 'bbb_labour_screwups_about_open';
    try {
      const stored = localStorage.getItem(key);
      // Default is open (HTML), but allow persisted close.
      if (stored === '0') aboutDetails.open = false;
      else if (stored === '1') aboutDetails.open = true;
      else aboutDetails.open = true;
      aboutDetails.addEventListener('toggle', () => {
        try { localStorage.setItem(key, aboutDetails.open ? '1' : '0'); } catch {}
      });
    } catch {
      // If storage is blocked, keep the default open state.
      aboutDetails.open = true;
    }
  }

  function getFilterButtons() {
    return Array.from(document.querySelectorAll('[data-role="filter"]'));
  }

  const entries = Array.from(container.querySelectorAll('[data-role="entry"]'));
  const byDescSort = (a, b) => String(b.dataset.sort || '').localeCompare(String(a.dataset.sort || ''));

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
    if (filters.category.size) {
      const raw = String(entry.dataset.categories || entry.dataset.category || '');
      const cats = raw ? raw.split('|').map((s) => s.trim()).filter(Boolean) : [];
      let ok = false;
      for (const c of cats) {
        if (filters.category.has(c)) { ok = true; break; }
      }
      if (!ok) return false;
    }
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

  // Wire up filter chips (delegated so it works even if the DOM is rebuilt).
  document.addEventListener('click', (ev) => {
    const btn = ev.target?.closest?.('[data-role="filter"]');
    if (!btn) return;
    ev.preventDefault();
    toggleFilter(String(btn.dataset.filter || ''));
  });

  // Ensure default order is newest-first on first load.
  // If the build ever emits unsorted HTML, this keeps the default promise.
  entries.sort(byDescSort);
  container.replaceChildren(...entries);

  syncFilterButtons();
  applyFilters();
})();
