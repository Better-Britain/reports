(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CX = 460;
  const CY = 460;
  const POINTER_ANGLE = -90;
  const INNER_RING_RADIUS = 196;
  const OUTER_RING_RADIUS = 316;
  const WHEEL_DURATION_MS = 4200;
  const WHEEL_SPINS = 10;
  const GLOW_AFTER_MS = 2200;

  const ISSUE_SLICES = [
    { id: 'culture-war', label: 'Culture', color: '#ff4e43' },
    { id: 'jobs-rights', label: 'Jobs', color: '#f4be2d' },
    { id: 'homes-streets', label: 'Homes', color: '#45b26b' },
    { id: 'health-care', label: 'Health', color: '#2a7dd8' },
    { id: 'transport-air', label: 'Transit', color: '#9c4ddc' }
  ];

  const TOP_THREE = ['angeliki-stogia', 'hannah-spencer', 'matt-goodwin'];

  const CANDIDATE_META = new Map([
    ['angeliki-stogia', { name: 'Angeliki Stogia', image: './images/candidate-labour.png' }],
    ['hannah-spencer', { name: 'Hannah Spencer', image: './images/candidate-green.png' }],
    ['matt-goodwin', { name: 'Matt Goodwin', image: './images/candidate-reform.png' }],
    ['sir-oink-a-lot', { name: 'Sir Oink A-Lot' }],
    ['nick-buckley', { name: 'Nick Buckley' }],
    ['charlotte-cadden', { name: 'Charlotte Cadden' }],
    ['dan-clarke', { name: 'Dan Clarke' }],
    ['sebastian-moore', { name: 'Sebastian Moore' }],
    ['joseph-omeachair', { name: 'Joseph O’Meachair' }],
    ['jackie-pearcey', { name: 'Jackie Pearcey' }],
    ['hugo-wils', { name: 'Hugo Wils' }]
  ]);

  function qsa(root, sel) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function createSvg(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function setAttrs(el, attrs) {
    Object.entries(attrs || {}).forEach(function ([k, v]) { el.setAttribute(k, String(v)); });
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

  function polar(cx, cy, radius, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function wedgePath(radius, startDeg, endDeg) {
    const s = polar(CX, CY, radius, startDeg);
    const e = polar(CX, CY, radius, endDeg);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return 'M ' + CX + ' ' + CY
      + ' L ' + s.x.toFixed(1) + ' ' + s.y.toFixed(1)
      + ' A ' + radius + ' ' + radius + ' 0 ' + large + ' 1 ' + e.x.toFixed(1) + ' ' + e.y.toFixed(1)
      + ' Z';
  }

  function ringWedgePath(rOuter, rInner, startDeg, endDeg) {
    const p1 = polar(CX, CY, rOuter, startDeg);
    const p2 = polar(CX, CY, rOuter, endDeg);
    const p3 = polar(CX, CY, rInner, endDeg);
    const p4 = polar(CX, CY, rInner, startDeg);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return 'M ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1)
      + ' A ' + rOuter + ' ' + rOuter + ' 0 ' + large + ' 1 ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1)
      + ' L ' + p3.x.toFixed(1) + ' ' + p3.y.toFixed(1)
      + ' A ' + rInner + ' ' + rInner + ' 0 ' + large + ' 0 ' + p4.x.toFixed(1) + ' ' + p4.y.toFixed(1)
      + ' Z';
  }

  function initials(name) {
    return String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0] ? p[0].toUpperCase() : '')
      .join('') || '?';
  }

  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }

  function collectReceiptsByIssue() {
    const byIssue = new Map();
    qsa(document, '[data-role="receipt"]').forEach(function (el) {
      if (String(el.dataset.slot || '').toLowerCase() !== 'standoff') return;
      const issue = String(el.dataset.issue || '').trim();
      const candidate = String(el.dataset.candidate || '').trim();
      if (!issue || !candidate) return;
      const byCandidate = byIssue.get(issue) || new Map();
      const list = byCandidate.get(candidate) || [];
      list.push(el);
      byCandidate.set(candidate, list);
      byIssue.set(issue, byCandidate);
    });
    return byIssue;
  }

  function collectAllCandidates(byIssue) {
    const set = new Set();
    Array.from(byIssue.values()).forEach((byCandidate) => {
      Array.from(byCandidate.keys()).forEach((id) => set.add(id));
    });
    return Array.from(set);
  }

  function drawWheelRing(groupEl) {
    const wedgeCount = 24;
    const span = 360 / wedgeCount;
    const colors = ['#ff6d2b', '#f4be2d', '#44b86a', '#2a7dd8', '#a25be4'];
    for (let i = 0; i < wedgeCount; i += 1) {
      const path = createSvg('path');
      setAttrs(path, {
        d: ringWedgePath(300, 214, i * span, (i + 1) * span),
        fill: colors[i % colors.length],
        opacity: i % 2 ? 0.23 : 0.34,
        stroke: 'rgba(35,24,16,.32)',
        'stroke-width': 1.2
      });
      groupEl.appendChild(path);
    }
    const rim = createSvg('circle');
    setAttrs(rim, { cx: CX, cy: CY, r: 304, fill: 'none', stroke: 'rgba(255,255,255,.2)', 'stroke-width': 8 });
    groupEl.appendChild(rim);
  }

  function drawAvatar(groupEl, candidateId, radius, isMajor) {
    const meta = CANDIDATE_META.get(candidateId) || { name: candidateId };
    const g = createSvg('g');
    g.classList.add('spinnerAvatar');
    if (isMajor) g.classList.add('spinnerAvatarMajor');
    g.dataset.candidate = candidateId;

    const inner = createSvg('g');
    inner.classList.add('spinnerAvatarInner');

    const frame = createSvg('circle');
    frame.classList.add('spinnerAvatarFrame');
    setAttrs(frame, {
      cx: 0, cy: 0, r: radius + 6,
      fill: 'rgba(38,27,20,.72)',
      stroke: 'rgba(255,239,194,.72)',
      'stroke-width': isMajor ? 4 : 3
    });
    inner.appendChild(frame);

    if (meta.image) {
      const image = createSvg('image');
      setAttrs(image, {
        href: meta.image,
        x: -radius, y: -radius,
        width: radius * 2, height: radius * 2,
        'clip-path': 'url(#spinnerAvatarClip)'
      });
      inner.appendChild(image);
    } else {
      const fill = createSvg('circle');
      setAttrs(fill, { cx: 0, cy: 0, r: radius, fill: 'rgba(31,22,16,.84)' });
      inner.appendChild(fill);
      const txt = createSvg('text');
      txt.textContent = initials(meta.name);
      setAttrs(txt, { x: 0, y: 5, 'text-anchor': 'middle', 'font-size': radius > 40 ? 24 : 16, 'font-weight': 900, fill: 'rgba(255,246,224,.9)' });
      inner.appendChild(txt);
    }

    const plateW = isMajor ? 164 : 116;
    const plate = createSvg('rect');
    setAttrs(plate, {
      x: -plateW / 2, y: radius + 12, width: plateW, height: 24, rx: 12,
      fill: 'rgba(18,11,7,.72)', stroke: 'rgba(255,255,255,.22)', 'stroke-width': 1
    });
    inner.appendChild(plate);

    const name = createSvg('text');
    name.textContent = meta.name;
    setAttrs(name, { x: 0, y: radius + 29, 'text-anchor': 'middle', 'font-size': isMajor ? 12 : 11, 'font-weight': 800, fill: 'rgba(255,247,226,.92)' });
    inner.appendChild(name);

    g.appendChild(inner);
    groupEl.appendChild(g);

    return { group: g, inner: inner, radius, candidateId, angle: 0, center: { x: CX, y: CY } };
  }

  function setAvatarPosition(avatar, center, angle, animated) {
    avatar.center = center;
    avatar.angle = angle;
    if (animated) {
      avatar.group.style.transition = 'transform 900ms cubic-bezier(.23,.84,.32,1), opacity 720ms ease';
    } else {
      avatar.group.style.transition = 'none';
    }
    avatar.group.setAttribute('transform', 'translate(' + center.x.toFixed(1) + ' ' + center.y.toFixed(1) + ')');
  }

  function setSliceState(pieGroup, issueId, opts) {
    const options = opts || {};
    const slices = qsa(pieGroup, '.spinnerSlice');
    slices.forEach((slice) => {
      const on = slice.dataset.issue === issueId;
      slice.classList.toggle('is-selected', on);
      slice.classList.toggle('is-dim', Boolean(issueId) && !on);
      slice.classList.toggle('is-flashing', Boolean(options.flashing) && on);
      slice.classList.toggle('is-soft-glow', Boolean(options.softGlow) && on);
    });
  }

  function buildPie(pieGroup, onPickIssue) {
    const span = 360 / ISSUE_SLICES.length;
    ISSUE_SLICES.forEach((slice, idx) => {
      const start = -90 + idx * span;
      const end = start + span;

      const wedge = createSvg('path');
      wedge.classList.add('spinnerSlice');
      wedge.dataset.issue = slice.id;
      setAttrs(wedge, { d: wedgePath(150, start, end), fill: slice.color, stroke: 'rgba(40,28,20,.76)', 'stroke-width': 10 });

      const bringFront = () => {
        if (wedge.parentNode) wedge.parentNode.appendChild(wedge);
      };
      wedge.addEventListener('mouseenter', bringFront);
      wedge.addEventListener('focus', bringFront);
      wedge.addEventListener('click', () => onPickIssue(slice.id));
      pieGroup.appendChild(wedge);

      const p = polar(CX, CY, 88, start + span / 2);
      const label = createSvg('text');
      label.textContent = slice.label;
      setAttrs(label, {
        x: p.x.toFixed(1), y: p.y.toFixed(1),
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': 16, 'font-weight': 900, fill: 'rgba(30,22,16,.86)', 'pointer-events': 'none'
      });
      pieGroup.appendChild(label);
    });

    const core = createSvg('circle');
    setAttrs(core, {
      cx: CX, cy: CY, r: 66,
      fill: 'rgba(245,235,219,.88)', stroke: 'rgba(42,27,20,.36)', 'stroke-width': 2, 'pointer-events': 'none'
    });
    pieGroup.appendChild(core);

    const text = createSvg('text');
    text.textContent = 'Pick issue';
    setAttrs(text, {
      x: CX, y: CY + 5, 'text-anchor': 'middle', 'font-size': 18, 'font-weight': 900,
      fill: 'rgba(42,27,20,.88)', 'pointer-events': 'none'
    });
    pieGroup.appendChild(text);
  }

  function pickWinner(state, candidates, rotationDeg) {
    const target = normalizeAngle(-rotationDeg + POINTER_ANGLE + 90);
    let winner = null;
    let best = Infinity;
    candidates.forEach((id) => {
      const avatar = state.avatars.get(id);
      if (!avatar) return;
      const d = angleDistance(avatar.angle, target);
      if (d < best) { best = d; winner = id; }
    });
    return winner;
  }

  function layoutOuterAvatars(state, animated) {
    const ids = state.outerActive.slice();
    const step = ids.length ? 360 / ids.length : 360;
    ids.forEach((id, idx) => {
      const avatar = state.avatars.get(id);
      if (!avatar) return;
      const angle = -90 + idx * step;
      const center = polar(CX, CY, OUTER_RING_RADIUS, angle);
      setAvatarPosition(avatar, center, angle, animated);
      avatar.group.style.opacity = '1';
    });
  }

  function maybeMutateOuterSet(state, issue) {
    const issueCandidates = state.byIssue.get(issue) || new Map();
    const issueOuter = Array.from(issueCandidates.keys()).filter((id) => !TOP_THREE.includes(id));
    const pool = Array.from(new Set(state.outerPool.concat(issueOuter)));
    const active = state.outerActive.slice();
    const inactive = pool.filter((id) => !active.includes(id));

    let action = 'replace';
    if (!active.length) action = 'add';
    else if (!inactive.length) action = 'remove';
    else {
      const roll = Math.random();
      if (roll < 0.34) action = 'add';
      else if (roll < 0.67) action = 'remove';
      else action = 'replace';
    }

    if (action === 'add' && inactive.length) {
      active.push(inactive[Math.floor(Math.random() * inactive.length)]);
    } else if (action === 'remove' && active.length > 1) {
      active.splice(Math.floor(Math.random() * active.length), 1);
    } else if (action === 'replace' && active.length && inactive.length) {
      active.splice(Math.floor(Math.random() * active.length), 1);
      active.push(inactive[Math.floor(Math.random() * inactive.length)]);
    }

    state.outerActive = Array.from(new Set(active));
    layoutOuterAvatars(state, true);
  }

  function init() {
    const panel = document.querySelector('[data-role="spinner-panel"]');
    const svg = document.querySelector('[data-role="spinner-svg"]');
    const speechHost = panel?.querySelector?.('[data-role="speech-host"]');
    if (!panel || !svg || !speechHost) return;

    const wheelRing = svg.querySelector('[data-role="wheel-ring"]');
    const pieGroup = svg.querySelector('[data-role="pie-group"]');
    const avatarsGroup = svg.querySelector('[data-role="avatars-group"]');
    if (!wheelRing || !pieGroup || !avatarsGroup) return;

    const byIssue = collectReceiptsByIssue();
    const allCandidates = collectAllCandidates(byIssue);
    const allOuter = allCandidates.filter((id) => !TOP_THREE.includes(id));

    drawWheelRing(wheelRing);

    const state = {
      byIssue,
      issue: '',
      spinning: false,
      rotation: 0,
      glowTimer: 0,
      avatars: new Map(),
      outerPool: allOuter.slice(),
      outerActive: allOuter.slice(0, Math.min(6, allOuter.length))
    };

    TOP_THREE.forEach((id, idx) => {
      if (!allCandidates.includes(id)) return;
      const avatar = drawAvatar(avatarsGroup, id, 52, true);
      const angle = -90 + idx * 120;
      const center = polar(CX, CY, INNER_RING_RADIUS, angle);
      setAvatarPosition(avatar, center, angle, false);
      state.avatars.set(id, avatar);
    });

    state.outerActive.forEach((id) => {
      const avatar = drawAvatar(avatarsGroup, id, 38, false);
      state.avatars.set(id, avatar);
    });
    layoutOuterAvatars(state, false);

    const bubbles = window.GortonSpeechBubbles?.create?.(panel, speechHost);

    function clearWinner() {
      qsa(avatarsGroup, '.spinnerAvatar').forEach((node) => node.classList.remove('is-winner'));
    }

    function setRattle(on) {
      qsa(avatarsGroup, '.spinnerAvatarInner').forEach((node) => node.classList.toggle('rattling', on));
    }

    function setRotation(deg) {
      state.rotation = deg;
      wheelRing.setAttribute('transform', 'rotate(' + deg.toFixed(3) + ' ' + CX + ' ' + CY + ')');
    }

    function showIssueSpeech(issue, winnerId) {
      const byCandidate = state.byIssue.get(issue) || new Map();
      const panelRect = panel.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const scaleX = panelRect.width / svgRect.width;
      const scaleY = panelRect.height / svgRect.height;

      const items = [];
      const ordered = Array.from(byCandidate.keys())
        .filter((id) => state.avatars.has(id))
        .sort((a, b) => (a === winnerId ? -1 : b === winnerId ? 1 : 0))
        .slice(0, 5);

      ordered.forEach((candidateId) => {
        const avatar = state.avatars.get(candidateId);
        const receipts = byCandidate.get(candidateId) || [];
        if (!avatar || !receipts.length) return;
        const pick = receipts[Math.floor(Math.random() * receipts.length)];
        const quote = pick.querySelector('.receiptQuote')?.textContent?.trim() || 'No quote available yet.';
        const label = CANDIDATE_META.get(candidateId)?.name || candidateId;
        items.push({
          label,
          text: quote,
          anchor: {
            x: avatar.center.x * scaleX,
            y: avatar.center.y * scaleY
          }
        });
      });

      bubbles?.render?.(items);
    }

    function runIssue(issue) {
      if (state.spinning) return;
      const byCandidate = state.byIssue.get(issue);
      if (!byCandidate || !byCandidate.size) return;
      state.issue = issue;
      bubbles?.clear?.();
      clearWinner();
      window.clearTimeout(state.glowTimer);
      setSliceState(pieGroup, issue, { flashing: true, softGlow: false });

      const candidates = Array.from(byCandidate.keys()).filter((id) => state.avatars.has(id));
      if (!candidates.length) {
        setSliceState(pieGroup, issue, { flashing: false, softGlow: true });
        return;
      }

      state.spinning = true;
      setRattle(true);
      const from = state.rotation;
      const targetId = candidates[Math.floor(Math.random() * candidates.length)];
      const targetAngle = state.avatars.get(targetId).angle;
      const delta = normalizeAngle(POINTER_ANGLE - targetAngle);
      const to = from + WHEEL_SPINS * 360 + delta;
      const start = performance.now();
      let mutated = false;

      function frame(now) {
        const t = Math.min(1, (now - start) / WHEEL_DURATION_MS);
        const eased = easeOutQuint(t);
        setRotation(from + (to - from) * eased);

        // Grok-style dynamic outer ring mutation mid-spin.
        if (!mutated && t > 0.62) {
          mutated = true;
          maybeMutateOuterSet(state, issue);
        }

        if (t < 1) {
          requestAnimationFrame(frame);
          return;
        }
        state.spinning = false;
        setRattle(false);
        setSliceState(pieGroup, issue, { flashing: false, softGlow: true });
        state.glowTimer = window.setTimeout(() => {
          setSliceState(pieGroup, issue, { flashing: false, softGlow: false });
        }, GLOW_AFTER_MS);

        const currentCandidates = Array.from((state.byIssue.get(issue) || new Map()).keys()).filter((id) => state.avatars.has(id));
        const winner = pickWinner(state, currentCandidates, state.rotation) || targetId;
        const winnerAvatar = state.avatars.get(winner);
        if (winnerAvatar) winnerAvatar.group.classList.add('is-winner');
        showIssueSpeech(issue, winner);
      }

      requestAnimationFrame(frame);
    }

    buildPie(pieGroup, runIssue);
    const initial = ISSUE_SLICES.find((slice) => {
      const byCandidate = state.byIssue.get(slice.id);
      return byCandidate && byCandidate.size;
    });
    if (initial) {
      state.issue = initial.id;
      setSliceState(pieGroup, initial.id, { flashing: false, softGlow: true });
      showIssueSpeech(initial.id, '');
    }

    window.addEventListener('resize', () => {
      if (state.issue && !state.spinning) showIssueSpeech(state.issue, '');
    });
  }

  window.GortonStandoffInteractible = { init };
}());
