(function () {
  function qsa(root, sel) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function init() {
    const grid = document.querySelector('[data-role="flyer-gallery"]');
    const modal = document.querySelector('[data-role="flyer-modal"]');
    // New build (2026-02-22): thumbnails open the full scan in a new tab,
    // and downloads use the HTML download attribute. If there is no modal,
    // the viewer is intentionally disabled.
    if (!grid || !modal) return;

    const img = modal.querySelector('[data-role="flyer-img"]');
    const viewport = modal.querySelector('[data-role="flyer-viewport"]');
    const btnClose = qsa(modal, '[data-role="flyer-close"]');
    const btnFlip = modal.querySelector('[data-role="flyer-flip"]');
    const btnFit = modal.querySelector('[data-role="flyer-fit"]');
    const btnZoomIn = modal.querySelector('[data-role="flyer-zoom-in"]');
    const btnZoomOut = modal.querySelector('[data-role="flyer-zoom-out"]');

    if (!img || !viewport) return;

    const state = {
      open: false,
      front: '',
      back: '',
      side: 'front',
      scale: 1,
      tx: 0,
      ty: 0,
      drag: null
    };

    function clampScale(n) {
      return clamp(n, 0.6, 4);
    }

    function applyTransform() {
      img.style.setProperty('--tx', `${state.tx}px`);
      img.style.setProperty('--ty', `${state.ty}px`);
      img.style.setProperty('--scale', String(state.scale));
    }

    function setSide(side) {
      state.side = side === 'back' ? 'back' : 'front';
      const src = state.side === 'back' ? state.back : state.front;
      if (src) img.src = src;
      if (btnFlip) {
        const canFlip = Boolean(state.front && state.back);
        btnFlip.disabled = !canFlip;
        btnFlip.textContent = canFlip ? (state.side === 'front' ? 'Flip' : 'Flip back') : 'Flip';
      }
    }

    function openViewer({ front, back, title }) {
      state.front = String(front || '').trim();
      state.back = String(back || '').trim();
      state.scale = 1;
      state.tx = 0;
      state.ty = 0;
      img.alt = title ? `Flyer scan: ${title}` : 'Flyer scan';
      setSide('front');
      applyTransform();
      modal.hidden = false;
      state.open = true;
      document.body.classList.add('flyerOpen');
    }

    function closeViewer() {
      state.open = false;
      modal.hidden = true;
      document.body.classList.remove('flyerOpen');
      img.removeAttribute('src');
    }

    grid.addEventListener('click', (e) => {
      const a = e.target?.closest?.('[data-role="flyer-thumb"]');
      if (!a) return;
      const front = a.getAttribute('data-front') || a.getAttribute('href') || '';
      const back = a.getAttribute('data-back') || '';
      const title = a.getAttribute('data-title') || '';
      if (!front) return;
      e.preventDefault();
      openViewer({ front, back, title });
    });

    btnClose.forEach((b) => b.addEventListener('click', closeViewer));
    window.addEventListener('keydown', (e) => {
      if (!state.open) return;
      if (e.key === 'Escape') closeViewer();
    });

    if (btnFlip) {
      btnFlip.addEventListener('click', () => {
        if (!(state.front && state.back)) return;
        setSide(state.side === 'front' ? 'back' : 'front');
        state.scale = 1;
        state.tx = 0;
        state.ty = 0;
        applyTransform();
      });
    }
    if (btnFit) {
      btnFit.addEventListener('click', () => {
        state.scale = 1;
        state.tx = 0;
        state.ty = 0;
        applyTransform();
      });
    }
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        state.scale = clampScale(state.scale * 1.15);
        applyTransform();
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        state.scale = clampScale(state.scale / 1.15);
        applyTransform();
      });
    }

    viewport.addEventListener('wheel', (e) => {
      if (!state.open) return;
      e.preventDefault();
      const delta = e.deltaY || 0;
      const factor = delta > 0 ? 1 / 1.12 : 1.12;
      state.scale = clampScale(state.scale * factor);
      applyTransform();
    }, { passive: false });

    viewport.addEventListener('pointerdown', (e) => {
      if (!state.open) return;
      if (e.button != null && e.button !== 0) return;
      state.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, tx: state.tx, ty: state.ty };
      viewport.setPointerCapture?.(e.pointerId);
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!state.drag || state.drag.id !== e.pointerId) return;
      const dx = e.clientX - state.drag.x;
      const dy = e.clientY - state.drag.y;
      state.tx = state.drag.tx + dx;
      state.ty = state.drag.ty + dy;
      applyTransform();
    });
    viewport.addEventListener('pointerup', (e) => {
      if (state.drag && state.drag.id === e.pointerId) state.drag = null;
    });
    viewport.addEventListener('pointercancel', (e) => {
      if (state.drag && state.drag.id === e.pointerId) state.drag = null;
    });
  }

  window.GortonFlyers = { init };
}());

