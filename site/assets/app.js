document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Citations controls (expand/collapse)
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-citations-toggle]');
    if (!button) return;

    const action = button.getAttribute('data-citations-toggle');
    const section = button.closest('section');
    if (!section) return;

    const detailsElements = section.querySelectorAll('details[class^="citations-level-"]');
    detailsElements.forEach((el) => {
      if (action === 'expand') {
        el.setAttribute('open', '');
      } else if (action === 'collapse') {
        el.removeAttribute('open');
      }
    });
  });

  // Sidebar toggle for small screens
  const sidebar = document.getElementById('sidebar');
  const toggle = sidebar ? sidebar.querySelector('.sidebar-toggle') : null;

  if (sidebar) {
    const mq = window.matchMedia('(max-width: 900px)');

    const applyResponsiveState = () => {
      // Expanded by default at all widths
      sidebar.setAttribute('aria-hidden', 'false');
    };

    applyResponsiveState();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', applyResponsiveState);
    } else if (typeof mq.addListener === 'function') {
      // Fallback for older browsers
      mq.addListener(applyResponsiveState);
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        const hidden = sidebar.getAttribute('aria-hidden') === 'true';
        sidebar.setAttribute('aria-hidden', hidden ? 'false' : 'true');
      });
    }

    // Sidebar group summary toggles
    sidebar.addEventListener('click', (event) => {
      const summary = event.target.closest('summary');
      if (!summary) return;
      // Ignore clicks on links within summary (if any)
      if (event.target.tagName === 'A') return;
      event.preventDefault();
      const details = summary.parentElement;
      if (!details) return;
      const isOpen = details.hasAttribute('open');
      if (isOpen) {
        details.removeAttribute('open');
      } else {
        details.setAttribute('open', '');
      }
    });

    // Global expand/collapse all controls
    sidebar.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-sidebar-toggle]');
      if (!btn) return;
      const action = btn.getAttribute('data-sidebar-toggle');

      if (action === 'expand-all' || action === 'collapse-all') {
        const detailsList = sidebar.querySelectorAll('details');
        detailsList.forEach((d) => {
          if (action === 'expand-all') d.setAttribute('open', '');
          else d.removeAttribute('open');
        });
        return;
      }
    });
  }

  // Back to top button logic
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const mq = window.matchMedia('(max-width: 900px)');

    const updateBackToTop = () => {
      // Determine if the sidebar is scrolled out of view (its bottom is above viewport top)
      const sbRect = sidebar ? sidebar.getBoundingClientRect() : null;
      const scrolledPastSidebar = sidebar ? (sbRect.bottom <= 0) : (window.scrollY > 300);

      // Position: Desktop — align to sidebar column (same left and width). Mobile — arrow at page padding.
      if (mq.matches || (sidebar && sidebar.getAttribute('aria-hidden') === 'true')) {
        // Mobile / sidebar hidden
        backToTop.style.left = '16px';
        backToTop.style.width = 'auto';
        backToTop.textContent = '↑';
      } else if (sidebar && sbRect) {
        const left = sbRect.left + window.scrollX;
        const width = sbRect.width;
        backToTop.style.left = `${left}px`;
        backToTop.style.width = `${Math.max(160, Math.floor(width))}px`;
        backToTop.textContent = '↑ Back to top';
      }

      if (scrolledPastSidebar) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    };

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    window.addEventListener('resize', updateBackToTop);
    updateBackToTop();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});