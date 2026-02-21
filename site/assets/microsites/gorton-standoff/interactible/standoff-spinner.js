(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CX = 460;
  const CY = 460;
  const POINTER_ANGLE = -90;
  const INNER_RING_RADIUS = 220;
  const OUTER_RING_RADIUS = 316;
  const WHEEL_DURATION_MS = 4200;
  const WHEEL_SPINS = 10;

  const ISSUE_SLICES = [
    { id: 'culture-war', label: 'Culture', color: '#ff4e43' },
    { id: 'jobs-rights', label: 'Jobs', color: '#f4be2d' },
    { id: 'homes-streets', label: 'Homes', color: '#45b26b' },
    { id: 'health-care', label: 'Health', color: '#2a7dd8' },
    { id: 'transport-air', label: 'Transit', color: '#9c4ddc' }
  ];

  const TOP_THREE = new Set(['angeliki-stogia', 'hannah-spencer', 'matt-goodwin']);

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
    for (const entry of Object.entries(attrs || {})) {
      el.setAttribute(entry[0], String(entry[1]));
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

  function polar(cx, cy, radius, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function wedgePath(radius, startDeg, endDeg) {
    const start = polar(CX, CY, radius, startDeg);
    const end = polar(CX, CY, radius, endDeg);
    const largeArc = (endDeg - startDeg) > 180 ? 1 : 0;
    return 'M ' + CX + ' ' + CY
      + ' L ' + start.x.toFixed(1) + ' ' + start.y.toFixed(1)
      + ' A ' + radius + ' ' + radius + ' 0 ' + largeArc + ' 1 ' + end.x.toFixed(1) + ' ' + end.y.toFixed(1)
      + ' Z';
  }

  function ringWedgePath(rOuter, rInner, startDeg, endDeg) {
    const p1 = polar(CX, CY, rOuter, startDeg);
    const p2 = polar(CX, CY, rOuter, endDeg);
    const p3 = polar(CX, CY, rInner, endDeg);
    const p4 = polar(CX, CY, rInner, startDeg);
    const largeArc = (endDeg - startDeg) > 180 ? 1 : 0;
    return 'M ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1)
      + ' A ' + rOuter + ' ' + rOuter + ' 0 ' + largeArc + ' 1 ' + p2.x.toFixed(1) + ' ' + p2.y.toFixed(1)
      + ' L ' + p3.x.toFixed(1) + ' ' + p3.y.toFixed(1)
      + ' A ' + rInner + ' ' + rInner + ' 0 ' + largeArc + ' 0 ' + p4.x.toFixed(1) + ' ' + p4.y.toFixed(1)
      + ' Z';
  }

  function initials(name) {
    return String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0] ? part[0].toUpperCase() : '')
      .join('') || '?';
  }

  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }

  function collectReceipts() {
    const receipts = qsa(document, '[data-role="receipt"]');
    const byIssueCandidate = new Map();
    for (const el of receipts) {
      if (String(el.dataset.slot || '').toLowerCase() !== 'standoff') continue;
      const issue = String(el.dataset.issue || '').trim();
      const candidate = String(el.dataset.candidate || '').trim();
      if (!issue || !candidate) continue;
      const byCandidate = byIssueCandidate.get(issue) || new Map();
      const list = byCandidate.get(candidate) || [];
      list.push(el);
      byCandidate.set(candidate, list);
      byIssueCandidate.set(issue, byCandidate);
    }
    return byIssueCandidate;
  }

  function buildWheelRing(groupEl) {
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

  function buildPie(groupEl, onPickIssue) {
    const sliceRadius = 150;
    const span = 360 / ISSUE_SLICES.length;
    ISSUE_SLICES.forEach(function (slice, idx) {
      const start = -90 + idx * span;
      const end = start + span;

      const wedge = createSvg('path');
      wedge.classList.add('spinnerSlice');
      wedge.dataset.issue = slice.id;
      setAttrs(wedge, {
        d: wedgePath(sliceRadius, start, end),
        fill: slice.color,
        stroke: 'rgba(40,28,20,.76)',
        'stroke-width': 10
      });
      wedge.addEventListener('click', function () {
        onPickIssue(slice.id);
      });
      groupEl.appendChild(wedge);

      const labelPoint = polar(CX, CY, 88, start + span / 2);
      const label = createSvg('text');
      label.textContent = slice.label;
      setAttrs(label, {
        x: labelPoint.x.toFixed(1),
        y: labelPoint.y.toFixed(1),
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': 16,
        'font-weight': 900,
        fill: 'rgba(30,22,16,.86)',
        'pointer-events': 'none'
      });
      groupEl.appendChild(label);
    });

    const innerCore = createSvg('circle');
    setAttrs(innerCore, {
      cx: CX,
      cy: CY,
      r: 66,
      fill: 'rgba(245,235,219,.88)',
      stroke: 'rgba(42,27,20,.36)',
      'stroke-width': 2
    });
    groupEl.appendChild(innerCore);

    const innerLabel = createSvg('text');
    innerLabel.textContent = 'Pick issue';
    setAttrs(innerLabel, {
      x: CX,
      y: CY + 5,
      'text-anchor': 'middle',
      'font-size': 18,
      'font-weight': 900,
      fill: 'rgba(42,27,20,.88)',
      'pointer-events': 'none'
    });
    groupEl.appendChild(innerLabel);
  }

  function buildAvatars(groupEl, byIssueCandidate) {
    const allCandidates = new Set();
    for (const issueMap of byIssueCandidate.values()) {
      for (const candidate of issueMap.keys()) allCandidates.add(candidate);
    }

    const topThree = Array.from(allCandidates).filter((id) => TOP_THREE.has(id));
    const others = Array.from(allCandidates).filter((id) => !TOP_THREE.has(id)).sort();

    const avatarMap = new Map();
    topThree.forEach(function (candidateId, idx) {
      const angle = -90 + idx * 120;
      const center = polar(CX, CY, INNER_RING_RADIUS, angle);
      const avatar = drawAvatar(groupEl, candidateId, center, 52, true);
      avatar.angle = angle;
      avatar.candidateId = candidateId;
      avatarMap.set(candidateId, avatar);
    });

    const step = others.length ? 360 / others.length : 360;
    others.forEach(function (candidateId, idx) {
      const angle = -90 + idx * step;
      const center = polar(CX, CY, OUTER_RING_RADIUS, angle);
      const avatar = drawAvatar(groupEl, candidateId, center, 38, false);
      avatar.angle = angle;
      avatar.candidateId = candidateId;
      avatarMap.set(candidateId, avatar);
    });

    return avatarMap;
  }

  function drawAvatar(groupEl, candidateId, center, radius, isMajor) {
    const meta = CANDIDATE_META.get(candidateId) || { name: candidateId };
    const g = createSvg('g');
    g.classList.add('spinnerAvatar');
    if (isMajor) g.classList.add('spinnerAvatarMajor');
    setAttrs(g, { transform: 'translate(' + center.x.toFixed(1) + ' ' + center.y.toFixed(1) + ')' });

    const frame = createSvg('circle');
    frame.classList.add('spinnerAvatarFrame');
    setAttrs(frame, {
      cx: 0, cy: 0, r: radius + 6,
      fill: 'rgba(38,27,20,.72)',
      stroke: 'rgba(255,239,194,.72)',
      'stroke-width': isMajor ? 4 : 3
    });
    g.appendChild(frame);

    if (meta.image) {
      const image = createSvg('image');
      setAttrs(image, {
        href: meta.image,
        x: -radius,
        y: -radius,
        width: radius * 2,
        height: radius * 2,
        'clip-path': 'url(#spinnerAvatarClip)'
      });
      g.appendChild(image);
    } else {
      const fill = createSvg('circle');
      setAttrs(fill, { cx: 0, cy: 0, r: radius, fill: 'rgba(31,22,16,.84)' });
      g.appendChild(fill);
      const text = createSvg('text');
      text.textContent = initials(meta.name);
      setAttrs(text, {
        x: 0, y: 5,
        'text-anchor': 'middle',
        'font-size': radius > 40 ? 24 : 16,
        'font-weight': 900,
        fill: 'rgba(255,246,224,.9)'
      });
      g.appendChild(text);
    }

    const namePlate = createSvg('rect');
    const plateWidth = isMajor ? 164 : 116;
    setAttrs(namePlate, {
      x: -plateWidth / 2,
      y: radius + 12,
      width: plateWidth,
      height: 24,
      rx: 12,
      fill: 'rgba(18,11,7,.72)',
      stroke: 'rgba(255,255,255,.22)',
      'stroke-width': 1
    });
    g.appendChild(namePlate);

    const nameText = createSvg('text');
    nameText.textContent = meta.name;
    setAttrs(nameText, {
      x: 0, y: radius + 29,
      'text-anchor': 'middle',
      'font-size': isMajor ? 12 : 11,
      'font-weight': 800,
      fill: 'rgba(255,247,226,.92)'
    });
    g.appendChild(nameText);

    groupEl.appendChild(g);
    return { group: g, center: center, radius: radius };
  }

  function setSliceState(pieGroup, selectedIssue, flashing) {
    const slices = qsa(pieGroup, '.spinnerSlice');
    slices.forEach(function (slice) {
      const on = slice.dataset.issue === selectedIssue;
      slice.classList.toggle('is-selected', on);
      slice.classList.toggle('is-dim', Boolean(selectedIssue) && !on);
      slice.classList.toggle('is-flashing', Boolean(flashing) && on);
    });
  }

  function pickWinner(avatarMap, candidateList, rotationDeg) {
    const target = normalizeAngle(-rotationDeg);
    let winner = null;
    let best = Infinity;
    candidateList.forEach(function (candidateId) {
      const avatar = avatarMap.get(candidateId);
      if (!avatar) return;
      const d = angleDistance(avatar.angle, target);
      if (d < best) {
        best = d;
        winner = candidateId;
      }
    });
    return winner;
  }

  function hideBubble(bubbleGroup) {
    bubbleGroup.setAttribute('opacity', '0');
    bubbleGroup.setAttribute('transform', 'translate(0 0)');
  }

  function showBubble(bubbleGroup, quote, center) {
    const box = bubbleGroup.querySelector('[data-role="speech-box"]');
    const text = bubbleGroup.querySelector('[data-role="speech-text"]');
    const tail = bubbleGroup.querySelector('[data-role="speech-tail"]');
    const width = 260;
    const height = 112;
    const onRight = center.x > CX;
    const x = onRight ? center.x + 68 : center.x - width - 68;
    const y = center.y - 52;
    setAttrs(box, { x: x, y: y, width: width, height: height });
    setAttrs(text, { x: x + width / 2, y: y + 56 });
    text.textContent = String(quote || '').slice(0, 130);
    if (onRight) {
      tail.setAttribute('points', (x - 8) + ',' + (y + 38) + ' ' + (x - 8) + ',' + (y + 72) + ' ' + (center.x + 38) + ',' + (center.y + 8));
    } else {
      tail.setAttribute('points', (x + width + 8) + ',' + (y + 38) + ' ' + (x + width + 8) + ',' + (y + 72) + ' ' + (center.x - 38) + ',' + (center.y + 8));
    }
    bubbleGroup.setAttribute('opacity', '1');
    bubbleGroup.setAttribute('transform', 'translate(0 0)');
  }

  function init() {
    const panel = document.querySelector('[data-role="spinner-panel"]');
    const svg = document.querySelector('[data-role="spinner-svg"]');
    if (!panel || !svg) return;

    const wheelRing = svg.querySelector('[data-role="wheel-ring"]');
    const pieGroup = svg.querySelector('[data-role="pie-group"]');
    const avatarsGroup = svg.querySelector('[data-role="avatars-group"]');
    const bubbleGroup = svg.querySelector('[data-role="speech-bubble"]');
    if (!wheelRing || !pieGroup || !avatarsGroup || !bubbleGroup) return;

    const byIssueCandidate = collectReceipts();
    buildWheelRing(wheelRing);
    const avatarMap = buildAvatars(avatarsGroup, byIssueCandidate);

    const state = {
      issue: '',
      spinning: false,
      rotation: 0
    };

    function setRotation(deg) {
      state.rotation = deg;
      wheelRing.setAttribute('transform', 'rotate(' + deg.toFixed(3) + ' ' + CX + ' ' + CY + ')');
    }

    function clearWinnerClasses() {
      qsa(avatarsGroup, '.spinnerAvatar').forEach(function (node) {
        node.classList.remove('is-winner');
      });
    }

    function setRattle(on) {
      qsa(avatarsGroup, '.spinnerAvatar').forEach(function (node) {
        node.classList.toggle('rattling', on);
      });
    }

    function runIssue(issue) {
      if (state.spinning) return;
      const byCandidate = byIssueCandidate.get(issue);
      if (!byCandidate || !byCandidate.size) return;
      state.issue = issue;
      hideBubble(bubbleGroup);
      clearWinnerClasses();
      setSliceState(pieGroup, issue, true);

      const candidates = Array.from(byCandidate.keys()).filter(function (candidateId) {
        return avatarMap.has(candidateId);
      });
      if (!candidates.length) {
        setSliceState(pieGroup, issue, false);
        return;
      }

      state.spinning = true;
      setRattle(true);
      const from = state.rotation;
      const randomTargetCandidate = candidates[Math.floor(Math.random() * candidates.length)];
      const targetAngle = avatarMap.get(randomTargetCandidate).angle;
      const deltaToPointer = normalizeAngle(POINTER_ANGLE - targetAngle);
      const to = from + (WHEEL_SPINS * 360) + deltaToPointer;
      const started = performance.now();

      function frame(now) {
        const t = Math.min(1, (now - started) / WHEEL_DURATION_MS);
        const eased = easeOutQuint(t);
        setRotation(from + (to - from) * eased);
        if (t < 1) {
          requestAnimationFrame(frame);
          return;
        }
        state.spinning = false;
        setRattle(false);
        setSliceState(pieGroup, issue, false);

        const winner = pickWinner(avatarMap, candidates, state.rotation) || randomTargetCandidate;
        const winnerAvatar = avatarMap.get(winner);
        const winnerReceipts = byCandidate.get(winner) || [];
        const pickedReceipt = winnerReceipts[Math.floor(Math.random() * winnerReceipts.length)];
        const quoteEl = pickedReceipt ? pickedReceipt.querySelector('.receiptQuote') : null;
        const quote = quoteEl && quoteEl.textContent ? quoteEl.textContent.trim() : 'No quote available yet.';
        if (winnerAvatar) {
          winnerAvatar.group.classList.add('is-winner');
          showBubble(bubbleGroup, quote, winnerAvatar.center);
        }
      }

      requestAnimationFrame(frame);
    }

    buildPie(pieGroup, runIssue);
    const initialIssue = ISSUE_SLICES.find(function (slice) {
      const byCandidate = byIssueCandidate.get(slice.id);
      return byCandidate && byCandidate.size;
    });
    if (initialIssue) {
      setSliceState(pieGroup, initialIssue.id, false);
      state.issue = initialIssue.id;
    }
  }

  window.GortonStandoffInteractible = { init: init };
}());
