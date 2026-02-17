(() => {
  const container = document.querySelector('[data-role="cards"]');
  if (!container) return;

  const showingCount = document.querySelector('[data-role="showing-count"]');
  const aboutDetails = document.querySelector('details.about');
  const sortSelect = document.querySelector('[data-role="sort"]');
  const toggleReceiptsBtn = document.querySelector('[data-role="toggle-receipts"]');

  if (aboutDetails) {
    const key = 'bbb_problematic_billionaires_about_open';
    try {
      const stored = localStorage.getItem(key);
      if (stored === '0') aboutDetails.open = false;
      else if (stored === '1') aboutDetails.open = true;
      else aboutDetails.open = false;
      aboutDetails.addEventListener('toggle', () => {
        try { localStorage.setItem(key, aboutDetails.open ? '1' : '0'); } catch {}
      });
    } catch {
      aboutDetails.open = false;
    }
  }

  function getFilterButtons() {
    return Array.from(document.querySelectorAll('[data-role="filter"]'));
  }

  const cards = Array.from(container.querySelectorAll('[data-role="card"]'));
  const receiptDetails = Array.from(document.querySelectorAll('details.cardDetails'));

  const filters = {
    bucket: new Set(),
    country: new Set(),
    tag: new Set(),
  };

  function anyFilterActive() {
    return filters.bucket.size || filters.country.size || filters.tag.size;
  }

  function matchesFilters(card) {
    if (filters.bucket.size && !filters.bucket.has(String(card.dataset.bucket || ''))) return false;
    if (filters.country.size && !filters.country.has(String(card.dataset.country || ''))) return false;
    if (filters.tag.size) {
      const raw = String(card.dataset.tags || '');
      const tags = raw ? raw.split('|').map((s) => s.trim()).filter(Boolean) : [];
      let ok = false;
      for (const t of tags) {
        if (filters.tag.has(t)) { ok = true; break; }
      }
      if (!ok) return false;
    }
    return true;
  }

  function parseMaybeNumber(v) {
    const s = String(v ?? '').trim();
    if (!s) return NaN;
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  }

  function compareMaybeNumber(a, b, dir = 'desc') {
    const aOk = Number.isFinite(a);
    const bOk = Number.isFinite(b);
    if (aOk && bOk) return dir === 'asc' ? (a - b) : (b - a);
    if (aOk && !bOk) return -1;
    if (!aOk && bOk) return 1;
    return 0;
  }

  function compareText(a, b, dir = 'asc') {
    const aa = String(a ?? '').toLowerCase();
    const bb = String(b ?? '').toLowerCase();
    return dir === 'asc' ? aa.localeCompare(bb) : bb.localeCompare(aa);
  }

  function applySort() {
    const mode = sortSelect ? String(sortSelect.value || 'name_asc') : 'name_asc';
    const sorted = [...cards];
    sorted.sort((ca, cb) => {
      if (mode === 'worth_desc' || mode === 'worth_asc') {
        const dir = mode.endsWith('_asc') ? 'asc' : 'desc';
        const a = parseMaybeNumber(ca.dataset.worth);
        const b = parseMaybeNumber(cb.dataset.worth);
        const cmp = compareMaybeNumber(a, b, dir);
        if (cmp) return cmp;
        return compareText(ca.dataset.name, cb.dataset.name, 'asc');
      }
      if (mode === 'age_desc' || mode === 'age_asc') {
        const dir = mode.endsWith('_asc') ? 'asc' : 'desc';
        const a = parseMaybeNumber(ca.dataset.age);
        const b = parseMaybeNumber(cb.dataset.age);
        const cmp = compareMaybeNumber(a, b, dir);
        if (cmp) return cmp;
        return compareText(ca.dataset.name, cb.dataset.name, 'asc');
      }
      if (mode === 'sources_desc' || mode === 'sources_asc') {
        const dir = mode.endsWith('_asc') ? 'asc' : 'desc';
        const a = parseMaybeNumber(ca.dataset.sources);
        const b = parseMaybeNumber(cb.dataset.sources);
        const cmp = compareMaybeNumber(a, b, dir);
        if (cmp) return cmp;
        return compareText(ca.dataset.name, cb.dataset.name, 'asc');
      }
      return compareText(ca.dataset.name, cb.dataset.name, 'asc');
    });
    container.replaceChildren(...sorted);
  }

  function applyFilters() {
    let shown = 0;
    for (const card of cards) {
      const ok = matchesFilters(card);
      card.hidden = !ok;
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
      if (key === 'bucket') setButtonPressed(btn, filters.bucket.has(value));
      else if (key === 'country') setButtonPressed(btn, filters.country.has(value));
      else if (key === 'tag') setButtonPressed(btn, filters.tag.has(value));
    }
  }

  function resetFilters() {
    filters.bucket.clear();
    filters.country.clear();
    filters.tag.clear();
    syncFilterButtons();
    applyFilters();
  }

  function toggleFilter(raw) {
    if (raw === 'all') { resetFilters(); return; }
    const idx = raw.indexOf(':');
    const key = idx >= 0 ? raw.slice(0, idx) : raw;
    const value = idx >= 0 ? raw.slice(idx + 1) : '';
    const set = (key === 'bucket') ? filters.bucket : (key === 'country' ? filters.country : filters.tag);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    syncFilterButtons();
    applyFilters();
  }

  if (sortSelect) {
    const key = 'bbb_problematic_billionaires_sort';
    try {
      const stored = localStorage.getItem(key);
      if (stored) sortSelect.value = stored;
    } catch {}
    sortSelect.addEventListener('change', () => {
      try { localStorage.setItem(key, String(sortSelect.value || '')); } catch {}
      applySort();
      applyFilters();
    });
  }

  function setAllReceiptsOpen(open) {
    for (const d of receiptDetails) d.open = Boolean(open);
  }

  function anyReceiptClosed() {
    for (const d of receiptDetails) {
      if (!d.open) return true;
    }
    return false;
  }

  function syncReceiptsButton() {
    if (!toggleReceiptsBtn) return;
    const shouldOpen = anyReceiptClosed();
    toggleReceiptsBtn.textContent = shouldOpen ? 'Open receipts' : 'Close receipts';
    toggleReceiptsBtn.setAttribute('aria-pressed', shouldOpen ? 'false' : 'true');
  }

  if (toggleReceiptsBtn) {
    const key = 'bbb_problematic_billionaires_receipts_open';
    try {
      const stored = localStorage.getItem(key);
      if (stored === '1') setAllReceiptsOpen(true);
      else if (stored === '0') setAllReceiptsOpen(false);
    } catch {}

    toggleReceiptsBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const open = anyReceiptClosed();
      setAllReceiptsOpen(open);
      try { localStorage.setItem(key, open ? '1' : '0'); } catch {}
      syncReceiptsButton();
    });
  }

  document.addEventListener('click', (ev) => {
    const btn = ev.target?.closest?.('[data-role="filter"]');
    if (!btn) return;
    ev.preventDefault();
    toggleFilter(String(btn.dataset.filter || ''));
  });

  document.addEventListener('click', (ev) => {
    const btn = ev.target?.closest?.('[data-role="overflow-toggle"]');
    if (!btn) return;
    ev.preventDefault();
    const key = String(btn.dataset.overflow || '').trim();
    if (!key) return;
    const panel = document.querySelector(`[data-role="overflow-panel"][data-overflow="${CSS.escape(key)}"]`);
    if (!panel) return;
    const nextHidden = !panel.hidden ? true : false;
    panel.hidden = nextHidden;
    btn.setAttribute('aria-expanded', nextHidden ? 'false' : 'true');
    const label = btn.querySelector('[data-role="overflow-label"]');
    if (label) {
      const more = String(btn.dataset.labelMore || 'More…');
      const less = String(btn.dataset.labelLess || 'Fewer…');
      label.textContent = nextHidden ? more : less;
    }
  });

  syncReceiptsButton();
  applySort();
  syncFilterButtons();
  applyFilters();
})();
