(function () {
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

  function slugifyKey(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 64);
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

  function layoutCircle(containerSel, nodeSel) {
    const container = document.querySelector(containerSel);
    if (!container) return;
    const nodes = qsa(container, nodeSel);
    if (!nodes.length) return;
    const step = 360 / nodes.length;
    const start = -90;
    nodes.forEach((el, i) => {
      const angle = start + i * step;
      el.style.setProperty('--a', `${angle}deg`);
    });
  }

  function layoutRings() {
    layoutCircle('[data-role="ring"]', '[data-role="candidate"]');
    layoutCircle('[data-role="speaker-ring"]', '[data-role="speaker"]');
  }

  function collectEvidence() {
    const receipts = qsa(document, '[data-role="receipt"]');
    const byIssueCandidate = new Map(); // issue -> Map(candidate -> [receiptEl])
    const byIssueSpeaker = new Map(); // issue -> Map(speakerKey -> [receiptEl])

    for (const el of receipts) {
      const slot = String(el.dataset.slot || '').trim().toLowerCase();
      if (slot && slot !== 'standoff') continue;

      const issue = String(el.dataset.issue || '').trim();
      const candidate = String(el.dataset.candidate || '').trim();
      if (!issue || !candidate) continue;

      const perCand = byIssueCandidate.get(issue) || new Map();
      const list = perCand.get(candidate) || [];
      list.push(el);
      perCand.set(candidate, list);
      byIssueCandidate.set(issue, perCand);

      const speakerKey = String(el.dataset.speakerKey || '').trim() || slugifyKey(String(el.dataset.speakerName || '').trim());
      const speakerName = String(el.dataset.speakerName || '').trim();
      const candidateName = String(el.dataset.candidateName || '').trim();
      if (speakerKey && speakerName && speakerName !== candidateName) {
        const perSp = byIssueSpeaker.get(issue) || new Map();
        const spList = perSp.get(speakerKey) || [];
        spList.push(el);
        perSp.set(speakerKey, spList);
        byIssueSpeaker.set(issue, perSp);
      }
    }

    return { byIssueCandidate, byIssueSpeaker };
  }

  function updateCandidateTotals(byIssueCandidate) {
    const candidates = qsa(document, '[data-role="candidate"]');
    const totals = new Map();
    for (const perCandidate of byIssueCandidate.values()) {
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

  function escapeForTextFallback(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function placeBubble({ layer, anchorEl, bubbleEl, index }) {
    const rect = anchorEl.getBoundingClientRect();
    const layerRect = layer.getBoundingClientRect();
    let x = rect.left + rect.width / 2 - layerRect.left;
    let y = rect.top - layerRect.top;

    const centerX = layerRect.width / 2;
    const leftSide = x < centerX;
    const dxBase = leftSide ? -24 : 24;
    const dx = dxBase + (index % 2) * (leftSide ? -10 : 10);
    const dy = -18 - Math.floor(index / 2) * 18;

    x += dx;
    y += dy;

    bubbleEl.style.left = `${x}px`;
    bubbleEl.style.top = `${y}px`;

    requestAnimationFrame(() => {
      bubbleEl.dataset.open = '1';
    });
  }

  function makeBubbleForReceipt({ anchorEl, receiptEl, index }) {
    const layer = document.querySelector('[data-role="bubbles"]');
    if (!layer || !anchorEl || !receiptEl) return;

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

    if (primarySourceUrl) {
      const dot = document.createElement('span');
      dot.textContent = '·';
      meta.appendChild(dot);

      const src = document.createElement('a');
      src.href = primarySourceUrl;
      src.target = '_blank';
      src.rel = 'noopener noreferrer';
      src.textContent = `— ${primarySourceLabel || 'source'}`;
      meta.appendChild(src);
    }

    const dot2 = document.createElement('span');
    dot2.textContent = '·';
    meta.appendChild(dot2);

    const a = document.createElement('a');
    a.href = '#receiptsTitle';
    a.setAttribute('data-jump', id);
    a.textContent = `open receipts (${sources})`;
    meta.appendChild(a);

    layer.appendChild(bubble);
    placeBubble({ layer, anchorEl, bubbleEl: bubble, index });
  }

  function setActiveIssueUI(issue) {
    const btns = qsa(document, '[data-role="issue"]');
    for (const b of btns) {
      const on = (b.dataset.issue || '') === issue;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    const pie = document.querySelector('[data-role="pie"]');
    if (pie) {
      pie.dataset.activeIssue = issue || '';
      pie.dataset.hasActive = issue ? '1' : '0';
    }

    const core = document.querySelector('[data-role="pie-core"]');
    if (core) {
      const label = core.querySelector('.pieCoreLabel');
      if (label) label.textContent = issue ? issueLabel(issue) : 'Pick an issue';
      core.dataset.bounce = '1';
      window.setTimeout(() => { core.dataset.bounce = '0'; }, 360);
    }
  }

  function setSpeakerVisibility(byIssueSpeaker, issue) {
    const perSp = byIssueSpeaker.get(issue) || new Map();
    const nodes = qsa(document, '[data-role="speaker"]');
    const active = new Set(perSp.keys());
    for (const el of nodes) {
      const key = String(el.dataset.speakerKey || '').trim();
      el.dataset.visible = active.has(key) ? '1' : '0';
    }
  }

  function setMinorCandidateVisibility(visibleCandidates) {
    const nodes = qsa(document, '[data-role="candidate"].cand--minor');
    const visible = visibleCandidates instanceof Set ? visibleCandidates : new Set();
    for (const el of nodes) {
      const cand = String(el.dataset.candidate || '').trim();
      el.dataset.visible = visible.has(cand) ? '1' : '0';
    }
  }

  function showIssueBubbles({ byIssueCandidate, byIssueSpeaker }, issue) {
    clearBubbles();

    const perCandidate = byIssueCandidate.get(issue);
    if (!perCandidate) {
      setMinorCandidateVisibility(new Set());
      setSpeakerVisibility(byIssueSpeaker, issue);
      return;
    }

    // Speakers: show up to 3, by number of receipts in this issue.
    const perSp = byIssueSpeaker.get(issue) || new Map();
    setSpeakerVisibility(byIssueSpeaker, issue);

    const speakerTop = Array.from(perSp.entries())
      .map(([key, list]) => ({ key, list, n: list.length }))
      .sort((a, b) => (b.n - a.n) || String(a.key).localeCompare(String(b.key)))
      .slice(0, 3);

    const candidateEntries = Array.from(perCandidate.entries())
      .map(([candidate, list]) => {
        const anchor = document.querySelector(`[data-role="candidate"][data-candidate="${cssEscape(candidate)}"]`);
        const isMain = Boolean(anchor?.classList?.contains('cand--main'));
        return { candidate, list, n: list?.length || 0, anchor, isMain };
      })
      .filter((e) => e.anchor && e.list && e.list.length);

    const mains = candidateEntries.filter((e) => e.isMain);
    const supporting = candidateEntries
      .filter((e) => !e.isMain)
      .sort((a, b) => (b.n - a.n) || String(a.candidate).localeCompare(String(b.candidate)))
      .slice(0, 3);

    setMinorCandidateVisibility(new Set(supporting.map((s) => s.candidate)));

    let bubbleIndex = 0;
    for (const e of [...mains, ...supporting]) {
      makeBubbleForReceipt({ anchorEl: e.anchor, receiptEl: e.list[0], index: bubbleIndex });
      bubbleIndex += 1;
    }

    for (const sp of speakerTop) {
      const anchor = document.querySelector(`[data-role="speaker"][data-speaker-key="${cssEscape(sp.key)}"]`);
      const receiptEl = sp.list?.[0];
      if (!anchor || !receiptEl) continue;
      makeBubbleForReceipt({ anchorEl: anchor, receiptEl, index: bubbleIndex });
      bubbleIndex += 1;
    }
  }

  function hookIssuePicker(evidence) {
    const btns = qsa(document, '[data-role="issue"]');
    const pie = document.querySelector('[data-role="pie"]');

    function activate(issue) {
      setActiveIssueUI(issue);
      showIssueBubbles(evidence, issue);
    }

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const issue = btn.dataset.issue || '';
        activate(issue);
      });
    });

    if (pie) {
      pie.addEventListener('click', (e) => {
        const slice = e.target?.closest?.('[data-role="issue-slice"]');
        if (!slice) return;
        const issue = slice.getAttribute('data-issue') || '';
        if (issue) activate(issue);
      });
      pie.addEventListener('keydown', (e) => {
        const onSlice = e.target?.closest?.('[data-role="issue-slice"]');
        if (!onSlice) return;
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        const issue = onSlice.getAttribute('data-issue') || '';
        if (issue) activate(issue);
      });
    }

    // Default selection: first issue with any receipts, otherwise the first button.
    const firstWithReceipts = btns.map(b => b.dataset.issue).find((i) => {
      const per = evidence.byIssueCandidate.get(i);
      return per && per.size;
    });
    const initial = firstWithReceipts || btns[0]?.dataset?.issue || '';
    if (initial) activate(initial);
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

  function init() {
    layoutRings();
    const evidence = collectEvidence();
    updateCandidateTotals(evidence.byIssueCandidate);
    hookIssuePicker(evidence);
    hookReceiptJump();

    let raf = 0;
    window.addEventListener('resize', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layoutRings();
        const active = document.querySelector('[data-role="issue"][aria-pressed="true"]')?.dataset?.issue;
        if (active) showIssueBubbles(evidence, active);
      });
    });
  }

  window.GortonStandoff = { init };
}());
