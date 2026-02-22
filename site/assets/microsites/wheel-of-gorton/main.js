(function () {
  function main() {
    document.body.classList.add('js');
    window.GortonStandoffInteractible?.init?.();
    window.GortonFlyers?.init?.();

    const expandToggle = document.getElementById('contacts-expand');
    if (expandToggle && expandToggle instanceof HTMLInputElement) {
      const allDetails = Array.from(document.querySelectorAll('details.contactMore'));
      const apply = () => {
        const on = Boolean(expandToggle.checked);
        for (const d of allDetails) d.open = on;
      };
      expandToggle.addEventListener('change', apply);
      apply();
    }

    for (const d of Array.from(document.querySelectorAll('details.contactMore'))) {
      const details = d;
      const line = details.closest('.contactBackgroundLine');
      if (!line) continue;
      const sync = () => {
        line.classList.toggle('is-open', details.open === true);
      };
      details.addEventListener('toggle', sync);
      sync();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}());

