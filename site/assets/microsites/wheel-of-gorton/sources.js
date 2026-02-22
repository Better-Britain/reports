(function () {
  function closestDetails(el) {
    return el ? el.closest('details') : null;
  }

  function openParentDetails(el) {
    let cur = el;
    while (cur) {
      const d = closestDetails(cur);
      if (!d) break;
      d.open = true;
      cur = d.parentElement;
    }
  }

  function revealByHash() {
    const hash = String(window.location.hash || '').trim();
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    openParentDetails(target);
    // If the receipt sits behind a "Show x more", open it.
    const panel = target.closest('.sourcesPanelBody') || target.closest('.sourcesPanel');
    if (panel) {
      const more = panel.querySelector('details.sourcesMore[data-role="sources-more"]');
      const extraWrap = panel.querySelector('.sourcesExtra');
      if (more && extraWrap && extraWrap.contains(target)) more.open = true;
    }
  }

  function main() {
    revealByHash();
    window.addEventListener('hashchange', revealByHash);

    const allToggle = document.getElementById('sources-all');
    if (allToggle && allToggle instanceof HTMLInputElement) {
      const apply = () => {
        const on = Boolean(allToggle.checked);
        const details = Array.from(document.querySelectorAll('details.sourcesMore[data-role="sources-more"]'));
        for (const d of details) d.open = on;
      };
      allToggle.addEventListener('change', apply);
      apply();
    }

    document.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-role="sources-filter"]');
      if (!btn) return;
      if (!(btn instanceof HTMLButtonElement)) return;
      if (btn.disabled) return;
      e.preventDefault();
      e.stopPropagation();

      const issue = String(btn.getAttribute('data-issue') || '').trim();
      const panel = btn.closest('[data-role="sources-panel"]');
      if (!panel) return;
      if (panel instanceof HTMLDetailsElement) panel.open = true;

      const more = panel.querySelector('details.sourcesMore[data-role="sources-more"]');
      const cards = Array.from(panel.querySelectorAll('article[data-role="receipt"]'));

      // Track previous open-state so clearing the filter restores "Show more" as it was.
      if (issue && more) {
        if (!more.dataset.prevOpen) more.dataset.prevOpen = more.open ? '1' : '0';
        more.open = true;
      }
      if (!issue && more && more.dataset.prevOpen) {
        more.open = more.dataset.prevOpen === '1';
        delete more.dataset.prevOpen;
      }

      // Apply filter to cards by issue.
      for (const c of cards) {
        const cIssue = String(c?.dataset?.issue || '').trim();
        const hide = issue ? cIssue !== issue : false;
        c.classList.toggle('isFilteredOut', hide);
      }

      // Active button state
      const allBtns = Array.from(panel.querySelectorAll('button.sourcesFilterBtn[data-role="sources-filter"]'));
      for (const b of allBtns) b.classList.toggle('is-active', b === btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}());

