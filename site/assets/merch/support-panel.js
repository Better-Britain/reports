/* global window, document */
(function () {
  function safeJsonParse(text) {
    try { return JSON.parse(String(text || '')); } catch { return null; }
  }

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function sameItem(a, b) {
    if (!a || !b) return false;
    return String(a.href || '') === String(b.href || '') || String(a.imageSrc || '') === String(b.imageSrc || '');
  }

  function applyCard(el, item) {
    if (!el || !item) return;
    const titleEl = el.querySelector('[data-role="merch-title"]');
    const img = el.querySelector('img[data-role="merch-img"]');
    el.href = String(item.href || '#');
    el.setAttribute('aria-label', String(item.title || 'Merch'));
    if (img) {
      img.src = String(item.imageSrc || '');
      img.alt = String(item.title || 'Merch') + ' preview';
    }
    if (titleEl) titleEl.textContent = String(item.title || '');
    el.classList.remove('is-swapping');
    // Trigger a tiny fade to make swaps less jarring.
    requestAnimationFrame(() => el.classList.add('is-swapping'));
    window.setTimeout(() => el.classList.remove('is-swapping'), 420);
  }

  function main() {
    const jsonEl = document.getElementById('bbb-merch-items');
    const parsed = safeJsonParse(jsonEl?.textContent || '');
    const all = Array.isArray(parsed) ? parsed.filter((x) => x && x.href && x.title && x.imageSrc) : [];
    if (all.length <= 4) return;

    const slots = Array.from(document.querySelectorAll('a.bbbSupportMerchCard[data-role="merch-slot"]'));
    if (slots.length < 4) return;

    const order = shuffleInPlace(all.slice());
    let cursor = 0;

    function nextItem() {
      const item = order[cursor % order.length];
      cursor += 1;
      return item;
    }

    // Initial fill (randomised).
    const visible = [];
    for (let i = 0; i < slots.length; i += 1) {
      const item = nextItem();
      visible[i] = item;
      applyCard(slots[i], item);
    }

    // Cycle: replace one slot every ~14s, avoiding immediate duplicates.
    window.setInterval(() => {
      const slotIdx = Math.floor(Math.random() * slots.length);
      const current = visible[slotIdx];

      let pick = nextItem();
      let guard = 0;
      while ((sameItem(pick, current) || visible.some((v) => sameItem(v, pick))) && guard < 24) {
        pick = nextItem();
        guard += 1;
      }

      visible[slotIdx] = pick;
      applyCard(slots[slotIdx], pick);
    }, 14000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}());

