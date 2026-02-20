function qsa(root, sel) {
  return Array.from((root || document).querySelectorAll(sel));
}

function cssEscape(s) {
  if (globalThis.CSS && typeof globalThis.CSS.escape === 'function') return globalThis.CSS.escape(String(s || ''));
  return String(s || '').replace(/["\\]/g, '\\$&');
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function issueLabel(issue) {
  switch (String(issue || '')) {
    case 'culture-war': return 'Culture war / cohesion';
    case 'jobs-rights': return 'Jobs / pay / rights';
    case 'homes-streets': return 'Homes / rents / streets';
    case 'health-care': return 'Health / care / harm';
    case 'transport-air': return 'Transport / air / infrastructure';
    default: return String(issue || 'Other');
  }
}

function layoutRing() {
  const ring = document.querySelector('[data-role="ring"]');
  if (!ring) return;
  const nodes = qsa(ring, '[data-role="candidate"]');
  if (!nodes.length) return;

  const step = 360 / nodes.length;
  const start = -90;
  nodes.forEach((el, i) => {
    const angle = start + i * step;
    el.style.setProperty('--a', `${angle}deg`);
  });
}

function groupReceiptsByIssueAndCandidate() {
  const receipts = qsa(document, '[data-role="receipt"]');
  const byIssue = new Map();
  for (const el of receipts) {
    const slot = String(el.dataset.slot || '').trim().toLowerCase();
    if (slot && slot !== 'standoff') continue;
    const issue = el.dataset.issue || '';
    const candidate = el.dataset.candidate || '';
    if (!issue || !candidate) continue;
    const listForIssue = byIssue.get(issue) || new Map();
    const list = listForIssue.get(candidate) || [];
    list.push(el);
    listForIssue.set(candidate, list);
    byIssue.set(issue, listForIssue);
  }
  return byIssue;
}

function updateReceiptCounts(byIssue) {
  const candidates = qsa(document, '[data-role="candidate"]');
  const totals = new Map();
  for (const [issue, perCandidate] of byIssue.entries()) {
    for (const [cand, list] of perCandidate.entries()) {
      totals.set(cand, (totals.get(cand) || 0) + (list.length || 0));
    }
  }
  for (const candEl of candidates) {
    const cand = candEl.dataset.candidate || '';
    const count = totals.get(cand) || 0;
    const target = candEl.querySelector('[data-role="receipt-count"]');
    if (target) target.textContent = String(count);
    candEl.toggleAttribute('data-has-receipts', count > 0);
  }
}

function clearBubbles() {
  const layer = document.querySelector('[data-role="bubbles"]');
  if (!layer) return;
  layer.innerHTML = '';
}

function makeBubbleForReceipt({ candidateEl, receiptEl }) {
  const layer = document.querySelector('[data-role="bubbles"]');
  if (!layer || !candidateEl || !receiptEl) return;

  const rect = candidateEl.getBoundingClientRect();
  const layerRect = layer.getBoundingClientRect();
  const x = rect.left + rect.width / 2 - layerRect.left;
  const y = rect.top - layerRect.top;

  const quoteEl = receiptEl.querySelector('.receiptQuote');
  const quoteHtml = quoteEl ? quoteEl.innerHTML : '';
  const quoteText = quoteEl?.textContent?.trim() || '';
  const captionEl = receiptEl.querySelector('.receiptCaption');
  const captionHtml = captionEl ? captionEl.innerHTML : '';
  const issue = receiptEl.dataset.issue || '';
  const id = receiptEl.dataset.id || '';
  const sources = Number(receiptEl.dataset.sources || '0') || 0;
  const speakerName = (receiptEl.dataset.speakerName || '').trim();
  const candidateName = (receiptEl.dataset.candidateName || '').trim();
  const primarySourceLabel = (receiptEl.dataset.primarySourceLabel || '').trim();
  const primarySourceUrl = (receiptEl.dataset.primarySourceUrl || '').trim();
  const seconds = clamp(0.26 + sources * 0.06, 0.28, 0.9);

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.transitionDuration = `${seconds}s`;
  bubble.innerHTML = `
    <div class="bubbleQuote"></div>
    ${captionHtml ? '<p class="bubbleCaption"></p>' : ''}
    <div class="bubbleMeta"></div>
  `;
  const quoteTarget = bubble.querySelector('.bubbleQuote');
  if (quoteTarget) {
    if (quoteHtml) quoteTarget.innerHTML = quoteHtml;
    else if (quoteText) quoteTarget.innerHTML = `<p>${escapeForTextFallback(quoteText)}</p>`;
    else quoteTarget.innerHTML = '<p>(No quote text)</p>';
  }
  const captionTarget = bubble.querySelector('.bubbleCaption');
  if (captionTarget) captionTarget.innerHTML = captionHtml;

  const meta = bubble.querySelector('.bubbleMeta');
  const issueText = issueLabel(issue);
  const receiptLink = document.querySelector('#receiptsTitle') ? '#receiptsTitle' : '';
  meta.innerHTML = '';

  const issueSpan = document.createElement('span');
  issueSpan.textContent = issueText;
  meta.appendChild(issueSpan);

  if (speakerName && speakerName !== candidateName) {
    const dot = document.createElement('span');
    dot.textContent = '·';
    meta.appendChild(dot);

    const speakerSpan = document.createElement('span');
    speakerSpan.textContent = `🗣️ ${speakerName}`;
    meta.appendChild(speakerSpan);
  }

  const dot2 = document.createElement('span');
  dot2.textContent = '·';
  meta.appendChild(dot2);

  if (primarySourceUrl) {
    const src = document.createElement('a');
    src.href = primarySourceUrl;
    src.target = '_blank';
    src.rel = 'noopener noreferrer';
    src.textContent = `— ${primarySourceLabel || 'source'}`;
    meta.appendChild(src);

    const dot3 = document.createElement('span');
    dot3.textContent = '·';
    meta.appendChild(dot3);
  }

  const a = document.createElement('a');
  a.href = receiptLink;
  a.setAttribute('data-jump', id);
  a.textContent = `open receipts (${sources})`;
  meta.appendChild(a);

  layer.appendChild(bubble);

  requestAnimationFrame(() => {
    bubble.dataset.open = '1';
  });
}

function escapeForTextFallback(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showIssueBubbles(byIssue, issue) {
  clearBubbles();
  const perCandidate = byIssue.get(issue);
  if (!perCandidate) return;

  for (const [candidate, list] of perCandidate.entries()) {
    const candEl = document.querySelector(`[data-role="candidate"][data-candidate="${cssEscape(candidate)}"]`);
    const receiptEl = list[0];
    if (!candEl || !receiptEl) continue;
    makeBubbleForReceipt({ candidateEl: candEl, receiptEl });
  }
}

function setActiveIssue(issue) {
  const btns = qsa(document, '[data-role="issue"]');
  for (const b of btns) {
    const on = (b.dataset.issue || '') === issue;
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
}

function hookIssuePicker(byIssue) {
  const btns = qsa(document, '[data-role="issue"]');
  if (!btns.length) return;

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const issue = btn.dataset.issue || '';
      setActiveIssue(issue);
      showIssueBubbles(byIssue, issue);
    });
  });

  // Default selection: first issue with any receipts, otherwise first button.
  const firstWithReceipts = btns.map(b => b.dataset.issue).find((i) => (byIssue.get(i) && byIssue.get(i).size));
  const initial = firstWithReceipts || btns[0].dataset.issue;
  if (initial) {
    setActiveIssue(initial);
    showIssueBubbles(byIssue, initial);
  }
}

function hookReceiptJump() {
  document.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[data-jump]');
    if (!a) return;
    const id = a.getAttribute('data-jump');
    if (!id) return;
    const target = document.querySelector(`[data-role="receipt"][data-id="${cssEscape(id)}"]`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.style.outline = '3px solid rgba(194,59,34,.35)';
    target.style.outlineOffset = '3px';
    window.setTimeout(() => {
      target.style.outline = '';
      target.style.outlineOffset = '';
    }, 1200);
  });
}

function initFlyerGallery() {
  const grid = document.querySelector('[data-role="flyer-gallery"]');
  const modal = document.querySelector('[data-role="flyer-modal"]');
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

function main() {
  document.body.classList.add('js');
  layoutRing();
  const byIssue = groupReceiptsByIssueAndCandidate();
  updateReceiptCounts(byIssue);
  hookIssuePicker(byIssue);
  hookReceiptJump();
  initFlyerGallery();

  // Keep bubbles vaguely anchored after resize.
  let raf = 0;
  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      layoutRing();
      const active = document.querySelector('[data-role="issue"][aria-pressed="true"]')?.dataset?.issue;
      if (active) showIssueBubbles(byIssue, active);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
