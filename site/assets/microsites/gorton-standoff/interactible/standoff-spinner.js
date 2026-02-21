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

  function normalizeAngle(deg) {
    let x = Number(deg || 0) % 360;
    if (x < 0) x += 360;
    return x;
  }

  function angleDistance(a, b) {
    const d = Math.abs(normalizeAngle(a) - normalizeAngle(b));
    return Math.min(d, 360 - d);
  }

  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
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
      el.style.setProperty('--a', String(angle) + 'deg');
    });
  }

  function layoutRings() {
    layoutCircle('[data-role="ring"]', '[data-role="candidate"]');
    layoutCircle('[data-role="speaker-ring"]', '[data-role="speaker"]');
  }

  function collectEvidence() {
    const receipts = qsa(document, '[data-role="receipt"]');
    const byIssueCandidate = new Map();
    const byIssueSpeaker = new Map();

    for (const el of receipts) {
      const slot = String(el.dataset.slot || '').trim().toLowerCase();
      if (slot && slot !== 'standoff') continue;

      const issue = String(el.dataset.issue || '').trim();
      const candidate = String(el.dataset.candidate || '').trim();
      if (!issue || !candidate) continue;

      const perCandidate = byIssueCandidate.get(issue) || new Map();
      const candidateList = perCandidate.get(candidate) || [];
      candidateList.push(el);
      perCandidate.set(candidate, candidateList);
      byIssueCandidate.set(issue, perCandidate);

      const speakerKey = String(el.dataset.speakerKey || '').trim() || slugifyKey(String(el.dataset.speakerName || '').trim());
      const speakerName = String(el.dataset.speakerName || '').trim();
      const candidateName = String(el.dataset.candidateName || '').trim();
      if (speakerKey && speakerName && speakerName !== candidateName) {
        const perSpeaker = byIssueSpeaker.get(issue) || new Map();
        const speakerList = perSpeaker.get(speakerKey) || [];
        speakerList.push(el);
        perSpeaker.set(speakerKey, speakerList);
        byIssueSpeaker.set(issue, perSpeaker);
      }
    }

    return { byIssueCandidate, byIssueSpeaker };
  }

  function updateCandidateTotals(byIssueCandidate) {
    const candidates = qsa(document, '[data-role="candidate"]');
    const totals = new Map();
    for (const perCandidate of byIssueCandidate.values()) {
      for (const entry of perCandidate.entries()) {
        const candidate = entry[0];
        const list = entry[1] || [];
        totals.set(candidate, (totals.get(candidate) || 0) + list.length);
      }
    }

    for (const candEl of candidates) {
      const candidate = candEl.dataset.candidate || '';
      const count = totals.get(candidate) || 0;
      const target = candEl.querySelector('[data-role="receipt-count"]');
      if (target) target.textContent = String(count);
      candEl.toggleAttribute('data-has-receipts', count > 0);
    }
  }

  function setActiveIssueUI(issue) {
    const btns = qsa(document, '[data-role="issue"]');
    for (const b of btns) {
      const on = (b.dataset.issue || '') === issue;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    const pie = document.querySelector('[data-role="pie"]');
    const slices = qsa(pie, '[data-role="issue-slice"]');
    for (const slice of slices) {
      const on = (slice.getAttribute('data-issue') || '') === issue;
      slice.classList.toggle('is-selected', on);
      slice.classList.toggle('is-dim', Boolean(issue) && !on);
    }
    if (pie) {
      pie.dataset.activeIssue = issue || '';
      pie.dataset.hasActive = issue ? '1' : '0';
    }

    const core = document.querySelector('[data-role="pie-core"]');
    if (core) {
      const label = core.querySelector('.pieCoreLabel');
      if (label) label.textContent = issue ? issueLabel(issue) : 'Pick an issue';
      core.dataset.bounce = '1';
      window.setTimeout(function () { core.dataset.bounce = '0'; }, 300);
    }
  }

  function setSpeakerVisibility(byIssueSpeaker, issue) {
    const perSpeaker = byIssueSpeaker.get(issue) || new Map();
    const nodes = qsa(document, '[data-role="speaker"]');
    const active = new Set(Array.from(perSpeaker.keys()));
    for (const el of nodes) {
      const key = String(el.dataset.speakerKey || '').trim();
      el.dataset.visible = active.has(key) ? '1' : '0';
    }
  }

  function setMinorCandidateVisibility(visibleCandidates) {
    const nodes = qsa(document, '[data-role="candidate"].cand--minor');
    const visible = visibleCandidates instanceof Set ? visibleCandidates : new Set();
    for (const el of nodes) {
      const candidate = String(el.dataset.candidate || '').trim();
      el.dataset.visible = visible.has(candidate) ? '1' : '0';
    }
  }

  function clearWinners() {
    for (const el of qsa(document, '[data-winner="1"]')) {
      el.dataset.winner = '0';
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

  function placeBubble(args) {
    const layer = args.layer;
    const anchorEl = args.anchorEl;
    const bubbleEl = args.bubbleEl;
    const index = args.index;
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

    bubbleEl.style.left = String(x) + 'px';
    bubbleEl.style.top = String(y) + 'px';

    requestAnimationFrame(function () {
      bubbleEl.dataset.open = '1';
    });
  }

  function makeBubbleForReceipt(args) {
    const anchorEl = args.anchorEl;
    const receiptEl = args.receiptEl;
    const index = args.index || 0;
    const layer = document.querySelector('[data-role="bubbles"]');
    if (!layer || !anchorEl || !receiptEl) return;

    const quoteEl = receiptEl.querySelector('.receiptQuote');
    const quoteHtml = quoteEl ? quoteEl.innerHTML : '';
    const quoteText = quoteEl && quoteEl.textContent ? quoteEl.textContent.trim() : '';
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
    bubble.style.transitionDuration = String(seconds) + 's';
    bubble.innerHTML = [
      '<div class="bubbleQuote"></div>',
      captionHtml ? '<p class="bubbleCaption"></p>' : '',
      '<div class="bubbleMeta"></div>'
    ].join('');

    const quoteTarget = bubble.querySelector('.bubbleQuote');
    if (quoteTarget) {
      if (quoteHtml) quoteTarget.innerHTML = quoteHtml;
      else if (quoteText) quoteTarget.innerHTML = '<p>' + escapeForTextFallback(quoteText) + '</p>';
      else quoteTarget.innerHTML = '<p>(No quote text)</p>';
    }
    const captionTarget = bubble.querySelector('.bubbleCaption');
    if (captionTarget) captionTarget.innerHTML = captionHtml;

    const meta = bubble.querySelector('.bubbleMeta');
    if (meta) {
      const issueSpan = document.createElement('span');
      issueSpan.textContent = issueLabel(issue);
      meta.appendChild(issueSpan);

      if (speakerName && speakerName !== candidateName) {
        const dot = document.createElement('span');
        dot.textContent = '·';
        meta.appendChild(dot);

        const speakerSpan = document.createElement('span');
        speakerSpan.textContent = '🗣️ ' + speakerName;
        meta.appendChild(speakerSpan);
      }

      if (primarySourceUrl) {
        const dot2 = document.createElement('span');
        dot2.textContent = '·';
        meta.appendChild(dot2);

        const src = document.createElement('a');
        src.href = primarySourceUrl;
        src.target = '_blank';
        src.rel = 'noopener noreferrer';
        src.textContent = '— ' + (primarySourceLabel || 'source');
        meta.appendChild(src);
      }

      const dot3 = document.createElement('span');
      dot3.textContent = '·';
      meta.appendChild(dot3);

      const jump = document.createElement('a');
      jump.href = '#receiptsTitle';
      jump.setAttribute('data-jump', id);
      jump.textContent = 'open receipts (' + String(sources) + ')';
      meta.appendChild(jump);
    }

    layer.appendChild(bubble);
    placeBubble({ layer: layer, anchorEl: anchorEl, bubbleEl: bubble, index: index });
  }

  function buildVisibleEntries(evidence, issue) {
    const perCandidate = evidence.byIssueCandidate.get(issue) || new Map();
    const perSpeaker = evidence.byIssueSpeaker.get(issue) || new Map();

    const candidateEntries = Array.from(perCandidate.entries())
      .map(function (entry) {
        const candidate = entry[0];
        const list = entry[1] || [];
        const anchor = document.querySelector('[data-role="candidate"][data-candidate="' + cssEscape(candidate) + '"]');
        const isMain = Boolean(anchor && anchor.classList.contains('cand--main'));
        return { type: 'candidate', key: candidate, list: list, anchor: anchor, isMain: isMain, n: list.length };
      })
      .filter(function (e) { return e.anchor && e.list && e.list.length; });

    const mains = candidateEntries.filter(function (e) { return e.isMain; });
    const supporting = candidateEntries
      .filter(function (e) { return !e.isMain; })
      .sort(function (a, b) {
        return (b.n - a.n) || String(a.key).localeCompare(String(b.key));
      })
      .slice(0, 3);

    setMinorCandidateVisibility(new Set(supporting.map(function (s) { return s.key; })));
    setSpeakerVisibility(evidence.byIssueSpeaker, issue);

    const speakerEntries = Array.from(perSpeaker.entries())
      .map(function (entry) {
        const key = entry[0];
        const list = entry[1] || [];
        const anchor = document.querySelector('[data-role="speaker"][data-speaker-key="' + cssEscape(key) + '"]');
        return { type: 'speaker', key: key, list: list, anchor: anchor, n: list.length };
      })
      .filter(function (e) { return e.anchor && e.list && e.list.length; })
      .sort(function (a, b) {
        return (b.n - a.n) || String(a.key).localeCompare(String(b.key));
      })
      .slice(0, 3);

    return mains.concat(supporting).concat(speakerEntries);
  }

  function entryAngleFromTop(sceneEl, anchorEl) {
    const sceneRect = sceneEl.getBoundingClientRect();
    const rect = anchorEl.getBoundingClientRect();
    const cx = sceneRect.left + sceneRect.width / 2;
    const cy = sceneRect.top + sceneRect.height / 2;
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(y - cy, x - cx);
    return normalizeAngle((rad * 180 / Math.PI) + 90);
  }

  function pickWinnerByRotation(sceneEl, entries, rotationDeg) {
    const target = normalizeAngle(-rotationDeg);
    let winner = null;
    let best = Infinity;
    for (const entry of entries) {
      const a = entryAngleFromTop(sceneEl, entry.anchor);
      const d = angleDistance(a, target);
      if (d < best) {
        best = d;
        winner = entry;
      }
    }
    return winner;
  }

  function hookReceiptJump() {
    document.addEventListener('click', function (e) {
      const a = e.target && e.target.closest ? e.target.closest('a[data-jump]') : null;
      if (!a) return;
      const id = a.getAttribute('data-jump');
      if (!id) return;
      const target = document.querySelector('[data-role="receipt"][data-id="' + cssEscape(id) + '"]');
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.style.outline = '3px solid rgba(194,59,34,.35)';
      target.style.outlineOffset = '3px';
      window.setTimeout(function () {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }, 1200);
    });
  }

  function init() {
    const scene = document.getElementById('scene');
    const wheelTrack = document.querySelector('[data-role="wheel-track"]');
    const pie = document.querySelector('[data-role="pie"]');
    if (!scene || !wheelTrack || !pie) return;

    layoutRings();
    const evidence = collectEvidence();
    updateCandidateTotals(evidence.byIssueCandidate);
    hookReceiptJump();

    const state = {
      activeIssue: '',
      spinning: false,
      rotation: 0
    };

    function setRotation(deg) {
      state.rotation = deg;
      scene.style.setProperty('--wheel-rotation', String(deg) + 'deg');
    }

    function revealIssue(issue, options) {
      const opts = options || {};
      state.activeIssue = issue;
      setActiveIssueUI(issue);
      clearBubbles();
      clearWinners();

      const entries = buildVisibleEntries(evidence, issue);
      if (!entries.length) return;

      if (!opts.spin) {
        makeBubbleForReceipt({ anchorEl: entries[0].anchor, receiptEl: entries[0].list[0], index: 0 });
        return;
      }
      if (state.spinning) return;
      state.spinning = true;
      scene.dataset.spinning = '1';

      const from = state.rotation;
      const to = from + 360 * 8 + Math.floor(Math.random() * 360);
      const startedAt = performance.now();
      const duration = 3200;

      function tick(now) {
        const t = Math.min(1, (now - startedAt) / duration);
        const eased = easeOutQuint(t);
        setRotation(from + (to - from) * eased);
        if (t < 1) {
          requestAnimationFrame(tick);
          return;
        }
        state.spinning = false;
        scene.dataset.spinning = '0';
        const winner = pickWinnerByRotation(scene, entries, state.rotation);
        if (!winner) return;
        winner.anchor.dataset.winner = '1';
        makeBubbleForReceipt({ anchorEl: winner.anchor, receiptEl: winner.list[0], index: 0 });
      }

      requestAnimationFrame(tick);
    }

    const btns = qsa(document, '[data-role="issue"]');
    for (const btn of btns) {
      btn.addEventListener('click', function () {
        const issue = btn.dataset.issue || '';
        if (!issue) return;
        revealIssue(issue, { spin: true });
      });
    }

    pie.addEventListener('click', function (e) {
      const slice = e.target && e.target.closest ? e.target.closest('[data-role="issue-slice"]') : null;
      if (!slice) return;
      const issue = slice.getAttribute('data-issue') || '';
      if (!issue) return;
      revealIssue(issue, { spin: true });
    });

    pie.addEventListener('keydown', function (e) {
      const slice = e.target && e.target.closest ? e.target.closest('[data-role="issue-slice"]') : null;
      if (!slice) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      const issue = slice.getAttribute('data-issue') || '';
      if (!issue) return;
      revealIssue(issue, { spin: true });
    });

    const firstWithReceipts = btns
      .map(function (b) { return b.dataset.issue; })
      .find(function (issue) {
        const per = evidence.byIssueCandidate.get(issue);
        return per && per.size;
      });
    const initial = firstWithReceipts || (btns[0] && btns[0].dataset ? btns[0].dataset.issue : '');
    if (initial) revealIssue(initial, { spin: false });

    let raf = 0;
    window.addEventListener('resize', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        layoutRings();
        if (state.activeIssue && !state.spinning) {
          revealIssue(state.activeIssue, { spin: false });
        }
      });
    });
  }

  window.GortonStandoffInteractible = { init: init };
}());
