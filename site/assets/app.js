document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      // Ensure any ancestor collapsible section is expanded before scrolling
      const details = target.closest('details.section-collapsible');
      if (details && !details.hasAttribute('open')) {
        details.setAttribute('open', '');
      }
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
    // Default is expanded; collapse by adding a class
    if (!visible) root.classList.add('citations-collapsed');
    else root.classList.remove('citations-collapsed');
    const btn = document.getElementById('toggle-citations');
    if (btn) btn.textContent = visible ? 'Hide citation titles' : 'Show citation titles';
    const state = document.getElementById('citations-state');
    if (state) state.textContent = visible ? 'Citations are expanded inline' : 'Citations are collapsed';
  };
  const storedPref = localStorage.getItem('citations-visible');
  // Default to visible (expanded) when no preference
  applyCitationVisibility(storedPref !== '0');
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('#toggle-citations');
    if (!btn) return;
    const nowVisible = document.documentElement.classList.contains('citations-collapsed');
    applyCitationVisibility(nowVisible);
    try { localStorage.setItem('citations-visible', nowVisible ? '1' : '0'); } catch {}
  });

  // Font switcher (cycles through themes)
  const fontOrder = ['font-theme-default', 'font-theme-serif', 'font-theme-accessible', 'font-theme-sans'];
  const fontLabel = document.getElementById('font-label');
  const fontBtn = document.getElementById('font-switcher');
  const prettyFontName = (cls) => {
    switch (cls) {
      case 'font-theme-serif': return 'Serif';
      case 'font-theme-accessible': return 'Assist';
      case 'font-theme-sans': return 'Sans';
      default: return 'Default';
    }
  };
  const applyFontTheme = (cls) => {
    const body = document.body;
    fontOrder.forEach(c => body.classList.remove(c));
    body.classList.add(cls);
    if (fontLabel) {
      fontLabel.style.fontFamily = window.getComputedStyle(body).fontFamily;
      fontLabel.textContent = `Font: ${prettyFontName(cls)}`;
    }
    try { localStorage.setItem('font-theme', cls); } catch {}
  };
  const storedTheme = localStorage.getItem('font-theme') || 'font-theme-default';
  applyFontTheme(storedTheme);
  if (fontBtn) {
    fontBtn.addEventListener('click', () => {
      const current = localStorage.getItem('font-theme') || 'font-theme-default';
      const idx = fontOrder.indexOf(current);
      const next = fontOrder[(idx + 1) % fontOrder.length];
      applyFontTheme(next);
    });
  }

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
      const stateEl = document.getElementById('sidebar-state');
      const refreshStateText = () => {
        const hidden = sidebar.getAttribute('aria-hidden') === 'true';
        if (stateEl) stateEl.textContent = hidden ? 'Menu collapsed' : 'Menu expanded';
        toggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
      };
      refreshStateText();
      toggle.addEventListener('click', () => {
        const hidden = sidebar.getAttribute('aria-hidden') === 'true';
        const next = hidden ? 'false' : 'true';
        sidebar.setAttribute('aria-hidden', next);
        refreshStateText();
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

  // Lazy mode: collapse sections by default except (a) the Introduction (now contains Scores Summary) and (b) Conclusions
  const params = new URLSearchParams(location.search);
  const isLazyMode = params.has('lazymode') || params.has('shortmode');
  const keepOpenSectionIds = new Set(['1.0-Introduction', '2.0-Conclusions']);
  if (isLazyMode) {
    const allSections = document.querySelectorAll('details.section-collapsible');
    allSections.forEach((d) => {
      const sectionId = d.getAttribute('data-section-id') || '';
      if (!keepOpenSectionIds.has(sectionId)) {
        d.removeAttribute('open');
      }
    });
    // Also collapse the sidebar menu on mobile widths by default
    const sb = document.getElementById('sidebar');
    if (sb) {
      const mq = window.matchMedia('(max-width: 900px)');
      if (mq.matches) {
        sb.setAttribute('aria-hidden', 'true');
        const stateEl = document.getElementById('sidebar-state');
        if (stateEl) stateEl.textContent = 'Menu collapsed';
        const tgl = sb.querySelector('.sidebar-toggle');
        if (tgl) tgl.setAttribute('aria-expanded', 'false');
      }
    }
  }

  // Expand target section if hash points inside a collapsed one
  const expandHashTarget = () => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    const details = target.closest('details.section-collapsible');
    if (details && !details.hasAttribute('open')) {
      details.setAttribute('open', '');
      // After opening, ensure the target is in view
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // On initial load
  expandHashTarget();
  // On manual hash changes (e.g., back/forward)
  window.addEventListener('hashchange', expandHashTarget);

  // Tag popover (mobile-friendly replacement for hover tooltips)
  const humaniseTag = (type, value, fallback) => {
    const t = (type || '').toLowerCase();
    const v = (value || '').toLowerCase();

    const titleCase = (s) => (s || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim();

    if (t === 'impact') {
      if (v === 'proven') return 'Proven';
      if (v === 'likely') return 'Likely';
      if (v === 'hypothetical') return 'Possible';
      if (v === 'unknown') return 'Unknown';
    }
    if (t === 'horizon') {
      if (v === 'short') return 'Soon';
      if (v === 'medium') return 'Mid-term';
      if (v === 'long') return 'Long-term';
    }
    if (t === 'risk') {
      if (v === 'delivery') return 'Delivery risk';
      if (v === 'finance') return 'Cost risk';
      if (v === 'legal') return 'Legal risk';
      if (v === 'political') return 'Political risk';
      if (v === 'rights') return 'Rights risk';
      if (v === 'equity') return 'Fairness risk';
      if (v === 'reputational') return 'Reputation risk';
      if (v === 'morale') return 'Morale risk';
      if (v === 'climate') return 'Climate risk';
      if (v === 'data-gap') return 'Data gap';
    }
    if (t === 'status') {
      if (v === 'enacted') return 'Law';
      if (v === 'programme') return 'Programme';
      if (v === 'policy-statement') return 'Statement';
      if (v === 'consideration') return 'In progress';
      if (v === 'draft') return 'Draft';
      if (v === 'consultation') return 'Consultation';
    }
    if (t === 'area') {
      const areaMap = {
        energy: 'Energy',
        economy: 'Economy',
        housing: 'Housing',
        planning: 'Planning',
        nhs: 'NHS',
        'social-care': 'Social care',
        welfare: 'Welfare',
        education: 'Education',
        skills: 'Skills',
        migration: 'Migration',
        justice: 'Justice',
        fiscal: 'Public finances',
        devolution: 'Devolution',
        transport: 'Transport',
        business: 'Business',
        'labour-market': 'Work',
        digital: 'Digital',
        ai: 'AI',
        environment: 'Environment',
        water: 'Water',
        foreign: 'Foreign policy',
        defence: 'Defence',
        culture: 'Culture',
      };
      if (areaMap[v]) return areaMap[v];
      return titleCase(value);
    }
    if (t === 'lead') {
      return value ? `${value}` : (fallback || 'Lead');
    }
    if (t === 'start') {
      // Try to turn YYYY-MM into a month+year label
      const m = (value || '').match(/^(\d{4})-(\d{2})$/);
      if (m) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = Number(m[2]);
        if (month >= 1 && month <= 12) return `${monthNames[month - 1]} ${m[1]}`;
      }
      return value ? `${value}` : (fallback || 'Start');
    }
    if (t === 'dist') return value ? titleCase(value) : (fallback || 'Distribution');
    if (t === 'flag') return titleCase(value || fallback || 'Note');

    return fallback || `${type}${value ? `: ${value}` : ''}`;
  };

  const escapeHtml = (input) => String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const hideTagPopover = () => {
    const existing = document.getElementById('tag-popover');
    if (existing) existing.remove();
  };

  const showTagPopover = (tagEl) => {
    if (!tagEl) return;
    const existing = document.getElementById('tag-popover');
    if (existing && existing.__forEl === tagEl) {
      existing.remove();
      return;
    }
    hideTagPopover();

    const type = tagEl.getAttribute('data-tag-type') || '';
    const value = tagEl.getAttribute('data-tag-value') || '';
    const fallback = tagEl.getAttribute('aria-label') || tagEl.getAttribute('title') || `${type}${value ? `: ${value}` : ''}`;
    const shortTitle = humaniseTag(type, value, fallback);

    const pop = document.createElement('div');
    pop.id = 'tag-popover';
    pop.className = 'tag-popover';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-modal', 'false');
    pop.__forEl = tagEl;

    const subtitle = (shortTitle && fallback && shortTitle !== fallback) ? `<div class="tag-popover__subtitle">${escapeHtml(fallback)}</div>` : '';
    pop.innerHTML = `<div class="tag-popover__title">${escapeHtml(shortTitle || fallback)}</div>${subtitle}`;
    document.body.appendChild(pop);

    // Position near the tag (fixed, viewport coords)
    const rect = tagEl.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    const margin = 10;

    let top = rect.top - popRect.height - 10;
    let left = rect.left + (rect.width / 2) - (popRect.width / 2);

    // Flip below if not enough space above
    if (top < margin) top = rect.bottom + 10;
    // Clamp within viewport
    left = Math.max(margin, Math.min(left, window.innerWidth - popRect.width - margin));
    top = Math.max(margin, Math.min(top, window.innerHeight - popRect.height - margin));

    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
  };

  document.body.addEventListener('click', (event) => {
    const inPopover = event.target.closest('#tag-popover');
    if (inPopover) return;
    const tag = event.target.closest('.tag');
    if (!tag) {
      hideTagPopover();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    showTagPopover(tag);
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideTagPopover();
      return;
    }
    const tag = event.target && event.target.closest ? event.target.closest('.tag') : null;
    if (!tag) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showTagPopover(tag);
    }
  });

  window.addEventListener('scroll', hideTagPopover, { passive: true });
  window.addEventListener('resize', hideTagPopover);

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
