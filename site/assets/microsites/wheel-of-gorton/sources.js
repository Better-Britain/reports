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
    const panel = target.closest('[data-role="sources-panel"]');
    if (panel) panel.dataset.expanded = '1';
  }

  function main() {
    revealByHash();
    window.addEventListener('hashchange', revealByHash);

    const tagsToggle = document.getElementById('sources-tags');
    if (tagsToggle && tagsToggle instanceof HTMLInputElement) {
      const label = document.querySelector('label.sourcesToggleLabel[for="sources-tags"]');
      const textEl = label?.querySelector?.('[data-role="sources-toggle-text"]') || null;
      const apply = () => {
        const on = Boolean(tagsToggle.checked);
        const next = (label?.getAttribute(on ? 'data-on' : 'data-off') || '').trim();
        if (!next) return;
        if (textEl) textEl.textContent = next;
        else if (label) label.textContent = next;
      };
      tagsToggle.addEventListener('change', apply);
      apply();
    }

    const allToggle = document.getElementById('sources-all');
    if (allToggle && allToggle instanceof HTMLInputElement) {
      const label = document.querySelector('label.sourcesToggleLabel[for="sources-all"]');
      const textEl = label?.querySelector?.('[data-role="sources-toggle-text"]') || null;
      const apply = () => {
        const on = Boolean(allToggle.checked);
        const next = (label?.getAttribute(on ? 'data-on' : 'data-off') || '').trim();
        if (next) {
          if (textEl) textEl.textContent = next;
          else if (label) label.textContent = next;
        }
        const panels = Array.from(document.querySelectorAll('[data-role="sources-panel"]'));
        for (const p of panels) {
          if (p instanceof HTMLDetailsElement) {
            p.open = on ? true : (p.dataset.defaultOpen === '1');
          }
          if (p.getAttribute('data-has-overflow') === '1') {
            p.dataset.expanded = on ? '1' : '0';
          } else {
            p.dataset.expanded = '0';
          }
        }
        const btns = Array.from(document.querySelectorAll('button.sourcesExpandBtn[data-role="sources-expand"]'));
        for (const b of btns) {
          const panel = b.closest('[data-role="sources-panel"]');
          const expanded = on ? '1' : (panel?.dataset?.expanded === '1' ? '1' : '0');
          b.setAttribute('data-expanded', expanded);
          const more = b.getAttribute('data-more-label') || 'Show more';
          const less = b.getAttribute('data-less-label') || 'Show less';
          b.textContent = expanded === '1' ? less : more;
        }
      };
      allToggle.addEventListener('change', apply);
      apply();
    }

    document.addEventListener('click', (e) => {
      const exp = e.target?.closest?.('[data-role="sources-expand"]');
      if (exp && exp instanceof HTMLButtonElement) {
        const panel = exp.closest('[data-role="sources-panel"]');
        if (!panel) return;

        // Show more/fewer always resets topic filter to All.
        panel.dataset.filtered = '0';
        delete panel.dataset.prevExpanded;
        const valueEl = panel.querySelector('[data-role="topics-value"]');
        if (valueEl) valueEl.textContent = 'All';
        const allBtn = panel.querySelector('button.sourcesFilterBtn[data-role="sources-filter"][data-issue=""]');
        const allBtns = Array.from(panel.querySelectorAll('button.sourcesFilterBtn[data-role="sources-filter"]'));
        for (const b of allBtns) b.classList.toggle('is-active', b === allBtn);
        const cards = Array.from(panel.querySelectorAll('article[data-role="receipt"]'));
        for (const c of cards) c.classList.remove('isFilteredOut');

        const isOn = panel.dataset.expanded === '1';
        panel.dataset.expanded = isOn ? '0' : '1';
        exp.setAttribute('data-expanded', isOn ? '0' : '1');
        const more = exp.getAttribute('data-more-label') || 'Show more';
        const less = exp.getAttribute('data-less-label') || 'Show less';
        exp.textContent = isOn ? more : less;
        return;
      }

      const btn = e.target?.closest?.('[data-role="sources-filter"]');
      if (!btn) return;
      if (!(btn instanceof HTMLButtonElement)) return;
      if (btn.disabled) return;
      e.preventDefault();
      e.stopPropagation();

      const issue = String(btn.getAttribute('data-issue') || '').trim();
      const label = String(btn.getAttribute('data-label') || btn.getAttribute('title') || '').trim() || (issue ? issue : 'All');
      const panel = btn.closest('[data-role="sources-panel"]');
      if (!panel) return;
      if (panel instanceof HTMLDetailsElement) panel.open = true;
      panel.dataset.filtered = issue ? '1' : '0';
      if (issue) {
        if (panel.dataset.prevExpanded == null) panel.dataset.prevExpanded = panel.dataset.expanded === '1' ? '1' : '0';
        panel.dataset.expanded = '1';
      } else if (panel.dataset.prevExpanded != null) {
        panel.dataset.expanded = panel.dataset.prevExpanded;
        delete panel.dataset.prevExpanded;
      }

      const valueEl = panel.querySelector('[data-role="topics-value"]');
      if (valueEl) valueEl.textContent = label || (issue ? issue : 'All');

      const cards = Array.from(panel.querySelectorAll('article[data-role="receipt"]'));

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

