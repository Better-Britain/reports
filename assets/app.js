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

  // Global citation title visibility toggle (with localStorage)
  const applyCitationVisibility = (visible) => {
    const root = document.documentElement;
    if (visible) {
      root.classList.add('citations-visible');
    } else {
      root.classList.remove('citations-visible');
    }
    const btn = document.getElementById('toggle-citations');
    if (btn) btn.textContent = visible ? 'Hide citation titles' : 'Show citation titles';
    const state = document.getElementById('citations-state');
    if (state) state.textContent = visible ? 'Citations are expanded inline' : 'Citations are collapsed';
  };
  const storedPref = localStorage.getItem('citations-visible');
  applyCitationVisibility(storedPref === '1');
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('#toggle-citations');
    if (!btn) return;
    const nowVisible = !document.documentElement.classList.contains('citations-visible');
    applyCitationVisibility(nowVisible);
    try { localStorage.setItem('citations-visible', nowVisible ? '1' : '0'); } catch {}
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

  // Optional: RSS helper popover
  document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a.rss-link');
    if (!link) return;
    // Build a small popover with subscription options
    event.preventDefault();
    const existing = document.getElementById('rss-popover');
    if (existing) existing.remove();
    const pop = document.createElement('div');
    pop.id = 'rss-popover';
    pop.style.position = 'absolute';
    pop.style.zIndex = '1000';
    pop.style.background = '#fff';
    pop.style.border = '1px solid #e5e7eb';
    pop.style.boxShadow = '0 4px 12px rgba(0,0,0,.12)';
    pop.style.borderRadius = '8px';
    pop.style.padding = '8px 10px';
    pop.style.fontSize = '14px';
    pop.innerHTML = `
      <strong style="display:block;margin-bottom:6px">Subscribe to RSS</strong>
      <ul style="list-style:none;margin:0;padding:0;min-width:240px">
        <li style="margin:.25rem 0"><a href="/feed.xml">Open /feed.xml</a></li>
        <li style="margin:.25rem 0"><a href="https://feedly.com/i/discover/sources/search/feed/https%3A%2F%2Fbetterbritain.org.uk%2Ffeed.xml" target="_blank" rel="noopener">Add in Feedly</a></li>
        <li style="margin:.25rem 0"><a href="https://www.inoreader.com/?add_feed=https%3A%2F%2Fbetterbritain.org.uk%2Ffeed.xml" target="_blank" rel="noopener">Add in Inoreader</a></li>
        <li style="margin:.25rem 0"><a href="netnewswire://subscribe?url=https%3A%2F%2Fbetterbritain.org.uk%2Ffeed.xml">Add in NetNewsWire (macOS/iOS)</a></li>
        <li style="margin:.25rem 0"><a href="#" data-copy-feed="https://betterbritain.org.uk/feed.xml">Copy feed URL</a></li>
        <li style="margin:.25rem 0"><a href="mailto:?subject=Better%20Britain%20RSS&body=https%3A%2F%2Fbetterbritain.org.uk%2Ffeed.xml">Email me the link</a></li>
      </ul>
    `;
    document.body.appendChild(pop);
    const rect = link.getBoundingClientRect();
    pop.style.left = `${Math.round(rect.left + window.scrollX)}px`;
    pop.style.top = `${Math.round(rect.bottom + window.scrollY + 6)}px`;
    const dismiss = (e) => {
      if (!pop.contains(e.target) && !link.contains(e.target)) {
        pop.remove();
        document.removeEventListener('click', dismiss, true);
      }
    };
    document.addEventListener('click', dismiss, true);

    // Copy handler inside the popover
    pop.addEventListener('click', async (e) => {
      const copyEl = e.target.closest('[data-copy-feed]');
      if (!copyEl) return;
      e.preventDefault();
      const url = copyEl.getAttribute('data-copy-feed');
      try {
        await navigator.clipboard.writeText(url);
        copyEl.textContent = 'Copied ✓';
        setTimeout(() => { copyEl.textContent = 'Copy feed URL'; }, 1500);
      } catch {
        // Fallback: open the feed so user can copy manually
        window.open(url, '_blank');
      }
    });
  });

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