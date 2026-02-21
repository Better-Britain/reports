(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CX = 460;
  const CY = 460;
  const POINTER_ANGLE = -90;
  const INNER_RING_RADIUS = 255;
  const OUTER_RING_RADIUS = 410;
  const WHEEL_DURATION_MS = 4200;
  const WHEEL_SPINS = 5;
  const GLOW_AFTER_MS = 2200;
  const MID_SPIN_MUTATION_AT = 0.62;
  const BADGE_ANGLES = [-54, 18, 90, 162, 234];

  const ISSUE_SLICES = [
    { id: 'culture-war', label: 'Culture', color: '#ff4e43' },
    { id: 'jobs-rights', label: 'Jobs', color: '#f4be2d' },
    { id: 'homes-streets', label: 'Homes', color: '#45b26b' },
    { id: 'health-care', label: 'Health', color: '#2a7dd8' },
    { id: 'transport-air', label: 'Transit', color: '#9c4ddc' }
  ];

  const ISSUE_INDEX = new Map(ISSUE_SLICES.map((s, i) => [s.id, i]));
  const ISSUE_META = new Map(ISSUE_SLICES.map((s) => [s.id, { label: s.label, color: s.color }]));
  const TOP_THREE = ['angeliki-stogia', 'hannah-spencer', 'matt-goodwin'];
  const PARTY_BORDER_BY_CANDIDATE = {
    'angeliki-stogia': '#E4003B', // Labour
    'hannah-spencer': '#008066', // Green Party
    'matt-goodwin': '#12B6CF' // Reform UK
  };
  const AFFILIATION_FALLBACK_BY_LANE = {
    labour: 'Labour',
    green: 'Green Party',
    reform: 'Reform UK',
    swing: 'Independent'
  };
  const EXPLICIT_NO_TOP_TAG = new Set([
    'labour-party-spokesperson'
  ]);

  // Political proximity lanes for supplemental speakers/candidates.
  const LANE_BY_CANDIDATE = {
    'angeliki-stogia': 'labour',
    'hannah-spencer': 'green',
    'matt-goodwin': 'reform',
    'jackie-pearcey': 'labour',
    'hugo-wils': 'labour',
    'joseph-omeachair': 'green',
    'sebastian-moore': 'green',
    'nick-buckley': 'reform',
    'charlotte-cadden': 'reform',
    'dan-clarke': 'reform',
    'sir-oink-a-lot': 'swing'
  };

  const CANDIDATE_META = new Map([
    ['angeliki-stogia', { name: 'Angeliki Stogia', image: './images/headshots/angeliki-stogia.jpg' }],
    ['hannah-spencer', { name: 'Hannah Spencer', image: './images/headshots/hannah-spencer.jpg' }],
    ['matt-goodwin', { name: 'Matt Goodwin', image: './images/headshots/matt-goodwin.jpg' }],
    ['sir-oink-a-lot', { name: 'Sir Oink A-Lot', image: './images/headshots/sir-oink-a-lot.jpg' }],
    ['nick-buckley', { name: 'Nick Buckley', image: './images/headshots/nick-buckley.jpg' }],
    ['charlotte-cadden', { name: 'Charlotte Cadden', image: './images/headshots/charlotte-anne-cadden.jpg' }],
    ['dan-clarke', { name: 'Dan Clarke', image: './images/headshots/dan-clarke.jpg' }],
    ['sebastian-moore', { name: 'Sebastian Moore', image: './images/headshots/sebastian-moore.jpg' }],
    ['joseph-omeachair', { name: 'Joseph O’Meachair', image: './images/headshots/joseph-omeachair.jpg' }],
    ['jackie-pearcey', { name: 'Jackie Pearcey', image: './images/headshots/jackie-pearcey.jpg' }],
    ['hugo-wils', { name: 'Hugo Wils', image: './images/headshots/hugo-wils.jpg' }]
  ]);

  function applyHeadshotManifest() {
    const el = document.getElementById('gorton-headshots');
    if (!el) return;
    let parsed = null;
    try {
      parsed = JSON.parse(String(el.textContent || '{}'));
    } catch (err) {
      console.warn('[gorton-standoff] Could not parse headshot manifest JSON.', err);
      return;
    }
    const resolved = parsed && typeof parsed.resolved === 'object' ? parsed.resolved : {};
    const warnings = Array.isArray(parsed?.warnings) ? parsed.warnings : [];
    const fallback = String(parsed?.fallback || '').trim();

    for (const [id, meta] of CANDIDATE_META.entries()) {
      const mapped = String(resolved[id] || '').trim();
      if (mapped) {
        meta.image = mapped;
      } else if (!meta.image && fallback) {
        meta.image = fallback;
        console.warn('[gorton-standoff] Missing headshot for', id, '- using fallback', fallback);
      }
    }
    warnings.forEach((w) => {
      console.warn('[gorton-standoff]', w);
    });
  }

  function qsa(root, sel) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function createSvg(tag) {
    return document.createElementNS(SVG_NS, tag);
  }

  function setAttrs(el, attrs) {
    Object.entries(attrs || {}).forEach(function ([k, v]) {
      el.setAttribute(k, String(v));
    });
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

  function easeInOutCubic(t) {
    const x = Math.max(0, Math.min(1, Number(t || 0)));
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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

  function buildCountsByCandidateIssue(byIssue) {
    const out = new Map();
    Array.from(byIssue.entries()).forEach(([issue, byCandidate]) => {
      Array.from(byCandidate.entries()).forEach(([candidate, list]) => {
        const row = out.get(candidate) || new Map();
        row.set(issue, list.length);
        out.set(candidate, row);
      });
    });
    return out;
  }

  function scoreForIssue(state, issue, candidateId) {
    const byCandidate = state.byIssue.get(issue) || new Map();
    return (byCandidate.get(candidateId) || []).length;
  }

  function collectAllCandidates(byIssue) {
    const set = new Set();
    Array.from(byIssue.values()).forEach((byCandidate) => {
      Array.from(byCandidate.keys()).forEach((id) => set.add(id));
    });
    return Array.from(set);
  }

  function collectAffiliationByCandidate(byIssue) {
    const counts = new Map();
    Array.from(byIssue.values()).forEach((byCandidate) => {
      Array.from(byCandidate.entries()).forEach(([candidateId, list]) => {
        const byAffiliation = counts.get(candidateId) || new Map();
        (Array.isArray(list) ? list : []).forEach((receipt) => {
          const party = String(receipt?.dataset?.party || '').trim();
          if (!party) return;
          byAffiliation.set(party, Number(byAffiliation.get(party) || 0) + 1);
        });
        counts.set(candidateId, byAffiliation);
      });
    });
    const out = new Map();
    counts.forEach((byAffiliation, candidateId) => {
      const sorted = Array.from(byAffiliation.entries()).sort((a, b) => b[1] - a[1]);
      if (sorted.length && sorted[0][0]) out.set(candidateId, sorted[0][0]);
    });
    return out;
  }

  function colorForAffiliation(label) {
    const party = String(label || '').toLowerCase();
    if (party.includes('labour')) return '#E4003B';
    if (party.includes('green') || party.includes('rejoin eu')) return '#00A95A';
    if (party.includes('reform')) return '#12B6CF';
    if (party.includes('liberal democrat')) return '#FAA61A';
    if (party.includes('conservative')) return '#0B5EA8';
    if (party.includes('libertarian')) return '#F4C542';
    if (party.includes('social democratic')) return '#C62828';
    if (party.includes('communist')) return '#C1121F';
    if (party.includes('loony')) return '#8E24AA';
    if (party.includes('independent')) return '#9EA7B3';
    return '#6E7681';
  }

  function contrastTextColor(hexColor) {
    const hex = String(hexColor || '').replace('#', '').trim();
    const normalized = hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex;
    if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return '#F7F4EB';
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 152 ? '#12202A' : '#F7F4EB';
  }

  function issueTotals(byIssue) {
    const totals = new Map();
    ISSUE_SLICES.forEach((s) => totals.set(s.id, 0));
    Array.from(byIssue.entries()).forEach(([issue, byCandidate]) => {
      let sum = 0;
      Array.from(byCandidate.values()).forEach((list) => {
        sum += Array.isArray(list) ? list.length : 0;
      });
      totals.set(issue, sum);
    });
    return totals;
  }

  function candidateIssues(state, candidateId) {
    const out = [];
    Array.from(state.byIssue.entries()).forEach(([issue, byCandidate]) => {
      if ((byCandidate.get(candidateId) || []).length) out.push(issue);
    });
    return out;
  }

  function pickRandomDifferent(receipts, lastReceiptId) {
    const list = Array.isArray(receipts) ? receipts : [];
    if (!list.length) return null;
    if (!lastReceiptId || list.length === 1) return list[Math.floor(Math.random() * list.length)];
    const filtered = list.filter((r) => String(r?.dataset?.id || '') !== String(lastReceiptId));
    const pickFrom = filtered.length ? filtered : list;
    return pickFrom[Math.floor(Math.random() * pickFrom.length)];
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

  function drawBadges(avatar, state, onBadgeClick) {
    if (!TOP_THREE.includes(avatar.candidateId)) return;
    const badgeGroup = createSvg('g');
    badgeGroup.classList.add('spinnerBadges');
    const counts = state.countsByCandidateIssue.get(avatar.candidateId) || new Map();
    const badgeRadius = avatar.radius + 6;

    ISSUE_SLICES.forEach((slice, idx) => {
      const count = Number(counts.get(slice.id) || 0);
      if (!count) return;
      const p = polar(0, 0, badgeRadius, BADGE_ANGLES[idx]);
      const item = createSvg('g');
      item.classList.add('spinnerBadge');
      item.dataset.issue = slice.id;
      item.dataset.candidate = avatar.candidateId;
      setAttrs(item, { transform: 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')' });

      const circle = createSvg('circle');
      setAttrs(circle, { cx: 0, cy: 0, r: 13.5, fill: slice.color, stroke: 'rgba(25,18,13,.82)', 'stroke-width': 2.2 });
      item.appendChild(circle);

      const text = createSvg('text');
      text.textContent = String(count);
      setAttrs(text, {
        x: 0, y: 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': 9.8, 'font-weight': 900, fill: 'rgba(20,16,12,.95)'
      });
      item.appendChild(text);

      const title = createSvg('title');
      title.textContent = String(count) + ' ' + slice.label + ' quotes';
      item.appendChild(title);

      item.addEventListener('click', (ev) => {
        ev.stopPropagation();
        onBadgeClick(avatar.candidateId, slice.id);
      });

      badgeGroup.appendChild(item);
    });

    avatar.inner.appendChild(badgeGroup);
  }

  function drawAvatar(groupEl, candidateId, radius, isMajor, state, onBadgeClick) {
    const meta = CANDIDATE_META.get(candidateId) || { name: candidateId };
    const affiliation = String(
      state?.affiliationByCandidate?.get?.(candidateId)
      || AFFILIATION_FALLBACK_BY_LANE[laneFor(candidateId)]
      || ''
    ).trim();
    const partyColor = PARTY_BORDER_BY_CANDIDATE[candidateId] || colorForAffiliation(affiliation);
    const labelTextColor = contrastTextColor(partyColor);
    const g = createSvg('g');
    g.classList.add('spinnerAvatar');
    if (isMajor) g.classList.add('spinnerAvatarMajor');
    g.dataset.candidate = candidateId;

    const inner = createSvg('g');
    inner.classList.add('spinnerAvatarInner');
    const photoRadius = radius + (isMajor ? 4 : 4);

    const frame = createSvg('circle');
    frame.classList.add('spinnerAvatarFrame');
    const partyBorder = partyColor || 'rgba(255,239,194,.72)';
    setAttrs(frame, {
      cx: 0, cy: 0, r: radius + 6,
      fill: 'rgba(38,27,20,.72)',
      stroke: partyBorder,
      'stroke-width': isMajor ? 4 : 3
    });
    inner.appendChild(frame);

    if (meta.image) {
      const defs = groupEl.ownerSVGElement?.querySelector?.('defs');
      const clipId = 'spinner-avatar-clip-' + String(candidateId).replace(/[^a-z0-9_-]/gi, '-');
      if (defs && !defs.querySelector('#' + clipId)) {
        const cp = createSvg('clipPath');
        cp.id = clipId;
        const c = createSvg('circle');
        setAttrs(c, { cx: 0, cy: 0, r: photoRadius });
        cp.appendChild(c);
        defs.appendChild(cp);
      }
      const zoom = isMajor ? 1.1 : 1.08;
      const imageRadius = photoRadius * zoom;
      const image = createSvg('image');
      setAttrs(image, {
        href: meta.image,
        x: -imageRadius, y: -imageRadius,
        width: imageRadius * 2, height: imageRadius * 2,
        preserveAspectRatio: 'xMidYMid slice',
        'clip-path': 'url(#' + clipId + ')'
      });
      inner.appendChild(image);
    } else {
      const fill = createSvg('circle');
      setAttrs(fill, { cx: 0, cy: 0, r: photoRadius, fill: 'rgba(31,22,16,.84)' });
      inner.appendChild(fill);

      const txt = createSvg('text');
      txt.textContent = initials(meta.name);
      setAttrs(txt, { x: 0, y: 5, 'text-anchor': 'middle', 'font-size': radius > 40 ? 24 : 16, 'font-weight': 900, fill: 'rgba(255,246,224,.9)' });
      inner.appendChild(txt);
    }

    const showTopTag = Boolean(affiliation)
      && !/spokesperson/i.test(affiliation)
      && !EXPLICIT_NO_TOP_TAG.has(candidateId);
    if (showTopTag) {
      const tagText = affiliation.replace(/^the\s+/i, '');
      const tagW = Math.max(76, Math.min(isMajor ? 196 : 168, tagText.length * 6.5 + 20));
      const tagY = -(radius + (isMajor ? 26 : 23));
      const tagPlate = createSvg('rect');
      setAttrs(tagPlate, {
        x: -(tagW / 2),
        y: tagY,
        width: tagW,
        height: 20,
        rx: 10,
        fill: partyBorder,
        stroke: 'rgba(18,11,7,.34)',
        'stroke-width': 1
      });
      inner.appendChild(tagPlate);

      const tag = createSvg('text');
      tag.textContent = tagText;
      setAttrs(tag, {
        x: 0,
        y: tagY + 14,
        'text-anchor': 'middle',
        'font-size': tagText.length > 24 ? 9.2 : (isMajor ? 10.5 : 10),
        'font-weight': 900,
        fill: labelTextColor
      });
      inner.appendChild(tag);
    }

    const plateW = isMajor ? 164 : 116;
    const plate = createSvg('rect');
    setAttrs(plate, {
      x: -plateW / 2, y: radius + 8, width: plateW, height: 24, rx: 12,
      fill: partyBorder, stroke: 'rgba(18,11,7,.34)', 'stroke-width': 1
    });
    inner.appendChild(plate);

    const name = createSvg('text');
    name.textContent = meta.name;
    setAttrs(name, {
      x: 0, y: radius + 25, 'text-anchor': 'middle',
      'font-size': isMajor ? 13 : 12, 'font-weight': 800, fill: labelTextColor
    });
    inner.appendChild(name);

    const avatar = {
      group: g,
      inner,
      radius,
      candidateId,
      isMajor,
      baseAngle: 0,
      angle: 0,
      center: { x: CX, y: CY },
      motion: null,
      hidden: false,
      pendingEnter: false
    };
    drawBadges(avatar, state, onBadgeClick);

    g.appendChild(inner);
    groupEl.appendChild(g);
    return avatar;
  }

  function readAvatarMotion(avatar, nowMs) {
    const m = avatar.motion;
    if (!m) return null;
    const elapsed = nowMs - Number(m.startedAt || 0);
    const p = Math.max(0, Math.min(1, elapsed / Math.max(1, Number(m.duration || 1))));
    const e = easeInOutCubic(p);
    const radial = Number(m.fromRadial || 0) + (Number(m.toRadial || 0) - Number(m.fromRadial || 0)) * e;
    const tangent = Number(m.fromTangent || 0) + (Number(m.toTangent || 0) - Number(m.fromTangent || 0)) * e;
    const opacity = Number(m.fromOpacity ?? 1) + (Number(m.toOpacity ?? 1) - Number(m.fromOpacity ?? 1)) * e;
    if (p >= 1) {
      if (m.onDone === 'hide') {
        avatar.hidden = true;
        avatar.group.style.display = 'none';
      }
      avatar.motion = null;
    }
    return { radial, tangent, opacity };
  }

  function applyAvatarTransform(state, avatar, animated) {
    if (avatar.hidden && !avatar.motion) return;
    if (!avatar.hidden) avatar.group.style.display = '';
    const nowMs = performance.now();
    const ringRadius = avatar.isMajor ? INNER_RING_RADIUS : OUTER_RING_RADIUS;
    const visualAngle = normalizeAngle(avatar.baseAngle + state.spinOffset);
    const motion = readAvatarMotion(avatar, nowMs);
    const radialOffset = motion ? motion.radial : 0;
    const tangentOffset = motion ? motion.tangent : 0;
    const center = polar(CX, CY, ringRadius + radialOffset, visualAngle);
    const rad = (visualAngle - 90) * Math.PI / 180;
    const tangentX = -Math.sin(rad);
    const tangentY = Math.cos(rad);
    center.x += tangentX * tangentOffset;
    center.y += tangentY * tangentOffset;
    avatar.center = center;
    avatar.angle = visualAngle;
    avatar.group.style.transition = animated
      ? 'transform 900ms cubic-bezier(.23,.84,.32,1), opacity 720ms ease'
      : 'none';
    avatar.group.setAttribute('transform', 'translate(' + center.x.toFixed(1) + ' ' + center.y.toFixed(1) + ')');
    if (motion) {
      avatar.group.style.opacity = String(motion.opacity);
    } else if (!avatar.hidden) {
      avatar.group.style.opacity = '1';
    }
  }

  function setAvatarPosition(state, avatar, angle, animated) {
    avatar.baseAngle = normalizeAngle(angle);
    applyAvatarTransform(state, avatar, animated);
  }

  function renderAllAvatars(state, animated) {
    state.avatars.forEach((avatar) => {
      applyAvatarTransform(state, avatar, animated);
    });
  }

  function setSliceState(pieGroup, issueId, opts) {
    const options = opts || {};
    const slices = qsa(pieGroup, '.spinnerSlice');
    const labels = qsa(pieGroup, '.spinnerSliceLabel');
    const counts = qsa(pieGroup, '.spinnerSliceCount');
    slices.forEach((slice) => {
      const on = slice.dataset.issue === issueId;
      slice.classList.toggle('is-selected', on);
      slice.classList.toggle('is-dim', Boolean(issueId) && !on);
      slice.classList.toggle('is-flashing', Boolean(options.flashing) && on);
      slice.classList.toggle('is-soft-glow', Boolean(options.softGlow) && on);
    });
    labels.forEach((label) => {
      const on = label.dataset.issue === issueId;
      label.classList.toggle('is-selected', on);
      label.classList.toggle('is-dim', Boolean(issueId) && !on);
    });
    counts.forEach((count) => {
      const on = count.dataset.issue === issueId;
      count.classList.toggle('is-selected', on);
      count.classList.toggle('is-dim', Boolean(issueId) && !on);
    });
  }

  function setSliceHoverState(pieGroup, issueId) {
    const slices = qsa(pieGroup, '.spinnerSlice');
    const labels = qsa(pieGroup, '.spinnerSliceLabel');
    const counts = qsa(pieGroup, '.spinnerSliceCount');
    slices.forEach((slice) => {
      slice.classList.toggle('is-hover', Boolean(issueId) && slice.dataset.issue === issueId);
    });
    labels.forEach((label) => {
      label.classList.toggle('is-hover', Boolean(issueId) && label.dataset.issue === issueId);
    });
    counts.forEach((count) => {
      count.classList.toggle('is-hover', Boolean(issueId) && count.dataset.issue === issueId);
    });
  }

  function buildPie(pieGroup, onPickIssue, totals) {
    const span = 360 / ISSUE_SLICES.length;
    ISSUE_SLICES.forEach((slice, idx) => {
      const start = -90 + idx * span;
      const end = start + span;
      const sliceWrap = createSvg('g');
      sliceWrap.classList.add('spinnerSliceWrap');
      sliceWrap.dataset.issue = slice.id;

      const wedge = createSvg('path');
      wedge.classList.add('spinnerSlice');
      wedge.dataset.issue = slice.id;
      setAttrs(wedge, { d: wedgePath(150, start, end), fill: slice.color, stroke: 'rgba(40,28,20,.76)', 'stroke-width': 10 });

      const bringFront = () => sliceWrap.parentNode && sliceWrap.parentNode.appendChild(sliceWrap);
      wedge.addEventListener('mouseenter', bringFront);
      wedge.addEventListener('focus', bringFront);
      wedge.addEventListener('pointerdown', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        onPickIssue(slice.id, 'slice');
      });
      wedge.addEventListener('click', () => onPickIssue(slice.id, 'slice'));
      sliceWrap.appendChild(wedge);

      const p = polar(CX, CY, 88, start + span / 2);
      const label = createSvg('text');
      label.classList.add('spinnerSliceLabel');
      label.dataset.issue = slice.id;
      label.textContent = slice.label;
      setAttrs(label, {
        x: p.x.toFixed(1), y: p.y.toFixed(1),
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        'font-size': 16, 'font-weight': 900, fill: 'rgba(30,22,16,.86)', 'pointer-events': 'none'
      });
      sliceWrap.appendChild(label);

      const badge = createSvg('g');
      badge.classList.add('spinnerSliceCount');
      badge.dataset.issue = slice.id;
      const mid = start + span / 2;
      const radial = polar(0, 0, 1, mid);
      const tangent = { x: -radial.y, y: radial.x };
      const badgeX = p.x + radial.x * 24 + tangent.x * 8;
      const badgeY = p.y + radial.y * 24 + tangent.y * 8;
      setAttrs(badge, {
        transform: 'translate(' + badgeX.toFixed(1) + ' ' + badgeY.toFixed(1) + ')',
        'pointer-events': 'none'
      });
      const badgePlate = createSvg('rect');
      setAttrs(badgePlate, {
        x: -12, y: -9, width: 24, height: 18, rx: 8,
        fill: 'rgba(255,250,236,.86)', stroke: 'rgba(42,27,20,.2)', 'stroke-width': 1
      });
      badge.appendChild(badgePlate);
      const badgeText = createSvg('text');
      badgeText.textContent = String(Number(totals?.get?.(slice.id) || 0));
      setAttrs(badgeText, {
        x: 0, y: 1,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': 11,
        'font-weight': 900,
        fill: 'rgba(42,27,20,.88)'
      });
      badge.appendChild(badgeText);
      sliceWrap.appendChild(badge);

      pieGroup.appendChild(sliceWrap);
    });

    const core = createSvg('circle');
    core.classList.add('spinnerPromptCore');
    setAttrs(core, {
      cx: CX, cy: CY, r: 66,
      fill: 'rgb(245,235,219)', stroke: 'rgba(42,27,20,.36)', 'stroke-width': 2, 'pointer-events': 'none'
    });
    pieGroup.appendChild(core);

    const text = createSvg('text');
    text.classList.add('spinnerPromptText');
    text.innerHTML = '<tspan x="' + CX + '" y="' + (CY - 3) + '">Pick</tspan><tspan x="' + CX + '" y="' + (CY + 17) + '">One</tspan>';
    setAttrs(text, {
      x: CX, y: CY + 5, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 900,
      fill: 'rgba(42,27,20,.88)', 'pointer-events': 'none'
    });
    pieGroup.appendChild(text);

    // Fallback hit area: allow clicks anywhere in picker radius.
    pieGroup.addEventListener('pointerdown', (ev) => {
      const svg = pieGroup.ownerSVGElement;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = ev.clientX;
      pt.y = ev.clientY;
      const local = pt.matrixTransform(svg.getScreenCTM().inverse());
      const dx = local.x - CX;
      const dy = local.y - CY;
      const dist = Math.hypot(dx, dy);
      if (dist > 150) return;
      ev.preventDefault();
      ev.stopPropagation();
      const angleTop = normalizeAngle((Math.atan2(dy, dx) * 180 / Math.PI) + 90);
      const idx = Math.floor(angleTop / span) % ISSUE_SLICES.length;
      const issue = ISSUE_SLICES[idx]?.id;
      if (issue) onPickIssue(issue, 'slice');
    });
  }

  function pickWinner(state, candidates) {
    const target = normalizeAngle(POINTER_ANGLE);
    let winner = null;
    let best = Infinity;
    candidates.forEach((id) => {
      const avatar = state.avatars.get(id);
      if (!avatar) return;
      const d = angleDistance(avatar.angle, target);
      if (d < best) {
        best = d;
        winner = id;
      }
    });
    return winner;
  }

  function laneFor(candidateId) {
    return LANE_BY_CANDIDATE[candidateId] || 'swing';
  }

  function isAvatarVisible(state, candidateId) {
    const av = state.avatars.get(candidateId);
    if (!av || av.hidden) return false;
    if (av.isMajor) return true;
    return state.outerActive.includes(candidateId);
  }

  function laneAnchorAngles(state) {
    const map = {};
    TOP_THREE.forEach((id) => {
      const lane = laneFor(id);
      const av = state.avatars.get(id);
      if (av) map[lane] = av.baseAngle;
    });
    map.swing = normalizeAngle(((map.labour ?? 210) + (map.green ?? 330) + (map.reform ?? 90)) / 3);
    return map;
  }

  function layoutOuterAvatars(state, issue, animated) {
    const anchors = laneAnchorAngles(state);
    const byLane = { labour: [], green: [], reform: [], swing: [] };
    state.outerActive.forEach((id) => byLane[laneFor(id)]?.push(id));

    Object.keys(byLane).forEach((lane) => {
      byLane[lane].sort((a, b) => scoreForIssue(state, issue, b) - scoreForIssue(state, issue, a));
    });

    const laneSlots = [-34, 0, 34, -68, 68];
    const placements = [];
    ['labour', 'green', 'reform', 'swing'].forEach((lane) => {
      const base = anchors[lane] ?? 0;
      byLane[lane].forEach((id, i) => {
        const offset = laneSlots[i] ?? (i * 24);
        placements.push({ id, angle: normalizeAngle(base + offset) });
      });
    });

    placements.forEach((p) => {
      const av = state.avatars.get(p.id);
      if (!av) return;
      setAvatarPosition(state, av, p.angle, animated);
      if (av.pendingEnter) {
        const tangentSign = Math.random() < 0.5 ? -1 : 1;
        av.motion = {
          startedAt: performance.now(),
          duration: 900,
          fromRadial: 135,
          toRadial: 0,
          fromTangent: -66 * tangentSign,
          toTangent: 0,
          fromOpacity: 0,
          toOpacity: 1,
          onDone: 'show'
        };
        av.pendingEnter = false;
      } else if (!av.motion) {
        av.group.style.opacity = '1';
      }
    });
  }

  function ensureAvatar(state, avatarsGroup, id, onBadgeClick, onAvatarClick) {
    if (state.avatars.has(id)) {
      const existing = state.avatars.get(id);
      existing.hidden = false;
      existing.group.style.display = '';
      return existing;
    }
    const av = drawAvatar(avatarsGroup, id, 38, false, state, onBadgeClick);
    av.group.style.opacity = '0';
    if (typeof onAvatarClick === 'function') {
      av.group.addEventListener('click', () => {
        if (state.spinning) return;
        onAvatarClick(id);
      });
    }
    state.avatars.set(id, av);
    return av;
  }

  function planMutation(state, issue) {
    const inactive = state.outerPool
      .filter((id) => !state.outerActive.includes(id))
      .sort((a, b) => scoreForIssue(state, issue, b) - scoreForIssue(state, issue, a));
    const active = state.outerActive
      .slice()
      .sort((a, b) => scoreForIssue(state, issue, a) - scoreForIssue(state, issue, b));
    const addable = inactive.filter((id) => scoreForIssue(state, issue, id) > 0);
    const removable = active.filter((id) => scoreForIssue(state, issue, id) <= 0);

    if (addable.length && removable.length) {
      return { action: 'replace', addId: addable[0], removeId: removable[0] };
    }
    return { action: 'none', addId: '', removeId: '' };
  }

  function applyMutation(state, issue, avatarsGroup, onBadgeClick, onAvatarClick, plan) {
    if (!plan || plan.action === 'none') return;
    const now = performance.now();
    if (plan.removeId) {
      const idx = state.outerActive.indexOf(plan.removeId);
      if (idx >= 0) state.outerActive.splice(idx, 1);
      const av = state.avatars.get(plan.removeId);
      if (av) {
        const tangentSign = Math.random() < 0.5 ? -1 : 1;
        av.motion = {
          startedAt: now,
          duration: 860,
          fromRadial: 0,
          toRadial: 145,
          fromTangent: 0,
          toTangent: 72 * tangentSign,
          fromOpacity: 1,
          toOpacity: 0,
          onDone: 'hide'
        };
      }
    }
    if (plan.addId) {
      const av = ensureAvatar(state, avatarsGroup, plan.addId, onBadgeClick, onAvatarClick);
      av.pendingEnter = true;
      av.hidden = false;
      av.group.style.display = '';
      if (!state.outerActive.includes(plan.addId)) state.outerActive.push(plan.addId);
    }
    layoutOuterAvatars(state, issue, true);
  }

  function showIssueSpeech(state, panel, svg, bubbles, issue, winnerId) {
    const byCandidate = state.byIssue.get(issue) || new Map();
    const panelRect = panel.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const scaleX = svgRect.width / 920;
    const scaleY = svgRect.height / 920;
    const offsetX = svgRect.left - panelRect.left;
    const offsetY = svgRect.top - panelRect.top;

    const ids = Array.from(byCandidate.keys())
      .filter((id) => isAvatarVisible(state, id))
      .sort((a, b) => {
        if (a === winnerId) return -1;
        if (b === winnerId) return 1;
        return scoreForIssue(state, issue, b) - scoreForIssue(state, issue, a);
      })
      .slice(0, 6);

    const items = ids.map((candidateId) => {
      const av = state.avatars.get(candidateId);
      const receipts = byCandidate.get(candidateId) || [];
      const pick = receipts[Math.floor(Math.random() * receipts.length)];
      const quote = pick?.querySelector('.receiptQuote')?.textContent?.trim() || 'No quote available yet.';
      const anchorRadius = (Number(av?.radius || 0) + 7) * Math.min(scaleX, scaleY);
      const meta = ISSUE_META.get(issue) || { label: issue || 'Issue', color: 'rgba(42,27,20,.18)' };
      state.lastShownByCandidate.set(candidateId, {
        receiptId: String(pick?.dataset?.id || ''),
        issue
      });
      return {
        label: CANDIDATE_META.get(candidateId)?.name || candidateId,
        text: quote,
        receiptId: String(pick?.dataset?.id || ''),
        anchor: {
          x: offsetX + av.center.x * scaleX,
          y: offsetY + av.center.y * scaleY
        },
        anchorRadius,
        priority: candidateId === winnerId ? 10 : scoreForIssue(state, issue, candidateId),
        issueLabel: meta.label,
        issueColor: meta.color
      };
    });

    const speakerAnchors = Array.from(state.avatars.entries())
      .filter(([id]) => isAvatarVisible(state, id))
      .map(([, av]) => ({
        x: offsetX + av.center.x * scaleX,
        y: offsetY + av.center.y * scaleY
      }));

    bubbles?.render?.(items, {
      speakerAnchors,
      noGoCircle: {
        x: offsetX + CX * scaleX,
        y: offsetY + CY * scaleY,
        r: 176 * Math.min(scaleX, scaleY)
      }
    });
  }

  function init() {
    applyHeadshotManifest();

    const panel = document.querySelector('[data-role="spinner-panel"]');
    const svg = document.querySelector('[data-role="spinner-svg"]');
    const speechHost = panel?.querySelector?.('[data-role="speech-host"]');
    if (!panel || !svg || !speechHost) return;

    const wheelRing = svg.querySelector('[data-role="wheel-ring"]');
    const pieGroup = svg.querySelector('[data-role="pie-group"]');
    const avatarsGroup = svg.querySelector('[data-role="avatars-group"]');
    if (!wheelRing || !pieGroup || !avatarsGroup) return;

    const byIssue = collectReceiptsByIssue();
    const affiliations = collectAffiliationByCandidate(byIssue);
    const totals = issueTotals(byIssue);
    const counts = buildCountsByCandidateIssue(byIssue);
    const allCandidates = collectAllCandidates(byIssue);
    const allOuter = allCandidates.filter((id) => !TOP_THREE.includes(id));
    const bubbles = window.GortonSpeechBubbles?.create?.(panel, speechHost);

    const state = {
      byIssue,
      affiliationByCandidate: affiliations,
      countsByCandidateIssue: counts,
      issue: '',
      spinning: false,
      rotation: 0,
      spinOffset: 0,
      spinCount: 0,
      glowTimer: 0,
      promptDismissed: false,
      userPickedIssue: false,
      lastShownByCandidate: new Map(),
      avatars: new Map(),
      outerPool: allOuter.slice(),
      outerActive: allOuter.slice(0, Math.min(6, allOuter.length))
    };

    function onBadgeClick(candidateId, issueId) {
      runIssue(issueId, { forcedWinner: candidateId, source: 'badge' });
    }

    function showSingleAvatarSpeech(candidateId) {
      const avatar = state.avatars.get(candidateId);
      if (!avatar) return;
      const panelRect = panel.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const scaleX = svgRect.width / 920;
      const scaleY = svgRect.height / 920;
      const offsetX = svgRect.left - panelRect.left;
      const offsetY = svgRect.top - panelRect.top;
      const anchorRadius = (Number(avatar.radius || 0) + 7) * Math.min(scaleX, scaleY);

      const last = state.lastShownByCandidate.get(candidateId) || { receiptId: '', issue: '' };
      let targetIssue = '';
      let receipt = null;

      if (state.userPickedIssue && state.issue) {
        const scoped = (state.byIssue.get(state.issue) || new Map()).get(candidateId) || [];
        receipt = pickRandomDifferent(scoped, last.receiptId);
        targetIssue = state.issue;
      }

      if (!receipt) {
        const issues = candidateIssues(state, candidateId);
        if (!issues.length) return;
        const firstIssue = issues.find((iss) => iss !== last.issue) || issues[0];
        const scope = (state.byIssue.get(firstIssue) || new Map()).get(candidateId) || [];
        receipt = pickRandomDifferent(scope, last.receiptId);
        targetIssue = firstIssue;
      }

      if (!receipt) return;
      const quote = receipt.querySelector('.receiptQuote')?.textContent?.trim() || 'No quote available yet.';
      const issueMeta = ISSUE_META.get(targetIssue) || { label: targetIssue || 'Issue', color: 'rgba(42,27,20,.18)' };
      state.lastShownByCandidate.set(candidateId, {
        receiptId: String(receipt.dataset.id || ''),
        issue: targetIssue
      });

      bubbles?.render?.([{
        label: CANDIDATE_META.get(candidateId)?.name || candidateId,
        text: quote,
        receiptId: String(receipt?.dataset?.id || ''),
        anchor: {
          x: offsetX + avatar.center.x * scaleX,
          y: offsetY + avatar.center.y * scaleY
        },
        anchorRadius,
        priority: 20,
        issueLabel: issueMeta.label,
        issueColor: issueMeta.color
      }], {
        speakerAnchors: Array.from(state.avatars.values()).map((av) => ({
          x: offsetX + av.center.x * scaleX,
          y: offsetY + av.center.y * scaleY
        })),
        noGoCircle: {
          x: offsetX + CX * scaleX,
          y: offsetY + CY * scaleY,
          r: 176 * Math.min(scaleX, scaleY)
        }
      });
    }

    drawWheelRing(wheelRing);
    TOP_THREE.forEach((id, idx) => {
      if (!allCandidates.includes(id)) return;
      const av = drawAvatar(avatarsGroup, id, 52, true, state, onBadgeClick);
      const angle = -90 + idx * 120;
      setAvatarPosition(state, av, angle, false);
      state.avatars.set(id, av);
      av.group.addEventListener('click', () => {
        if (state.spinning) return;
        showSingleAvatarSpeech(id);
      });
    });

    state.outerActive.forEach((id) => {
      const av = drawAvatar(avatarsGroup, id, 38, false, state, onBadgeClick);
      state.avatars.set(id, av);
      av.group.addEventListener('click', () => {
        if (state.spinning) return;
        showSingleAvatarSpeech(id);
      });
    });
    layoutOuterAvatars(state, ISSUE_SLICES[0].id, false);

    function setRotation(deg, animatedAvatars) {
      state.rotation = deg;
      state.spinOffset = deg;
      wheelRing.setAttribute('transform', 'rotate(' + deg.toFixed(3) + ' ' + CX + ' ' + CY + ')');
      renderAllAvatars(state, Boolean(animatedAvatars));
    }

    function issueFromPointer(clientX, clientY) {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const local = pt.matrixTransform(svg.getScreenCTM().inverse());
      const dx = local.x - CX;
      const dy = local.y - CY;
      const dist = Math.hypot(dx, dy);
      if (dist > 150) return '';
      const span = 360 / ISSUE_SLICES.length;
      const angleTop = normalizeAngle((Math.atan2(dy, dx) * 180 / Math.PI) + 90);
      const idx = Math.floor(angleTop / span) % ISSUE_SLICES.length;
      return ISSUE_SLICES[idx]?.id || '';
    }

    function clearWinner() {
      qsa(avatarsGroup, '.spinnerAvatar').forEach((node) => node.classList.remove('is-winner'));
    }

    function setRattle(on) {
      qsa(avatarsGroup, '.spinnerAvatarInner').forEach((node) => node.classList.toggle('rattling', on));
    }

    function runIssue(issue, options) {
      const opts = options || {};
      if (state.spinning) return;
      const byCandidate = state.byIssue.get(issue);
      if (!byCandidate || !byCandidate.size) return;

      state.issue = issue;
      if (!state.promptDismissed) {
        state.promptDismissed = true;
        pieGroup.classList.add('has-picked', 'prompt-removing');
        window.setTimeout(() => {
          pieGroup.querySelector('.spinnerPromptCore')?.remove?.();
          pieGroup.querySelector('.spinnerPromptText')?.remove?.();
          pieGroup.classList.remove('prompt-removing');
        }, 520);
      }
      state.userPickedIssue = true;
      bubbles?.clear?.();
      clearWinner();
      window.clearTimeout(state.glowTimer);
      setSliceState(pieGroup, issue, { flashing: true, softGlow: false });

      const candidates = Array.from(byCandidate.keys()).filter((id) => isAvatarVisible(state, id));
      if (!candidates.length) {
        setSliceState(pieGroup, issue, { flashing: false, softGlow: true });
        return;
      }

      // Meaningful target first, randomness only in full revolutions feel.
      const sortedByScore = candidates.slice().sort((a, b) => scoreForIssue(state, issue, b) - scoreForIssue(state, issue, a));
      const targetId = opts.forcedWinner && sortedByScore.includes(opts.forcedWinner)
        ? opts.forcedWinner
        : sortedByScore[Math.min(state.spinCount % Math.max(1, sortedByScore.length), sortedByScore.length - 1)];

      const mutationPlan = planMutation(state, issue);
      state.spinning = true;
      setRattle(true);

      const targetBaseAngle = state.avatars.get(targetId).baseAngle;
      const from = state.rotation;
      const desiredOffset = normalizeAngle(POINTER_ANGLE - targetBaseAngle);
      const fromOffset = normalizeAngle(state.spinOffset);
      const delta = normalizeAngle(desiredOffset - fromOffset);
      const to = from + WHEEL_SPINS * 360 + delta;
      const start = performance.now();
      let mutated = false;

      function frame(now) {
        const t = Math.min(1, (now - start) / WHEEL_DURATION_MS);
        const eased = easeOutQuint(t);
        setRotation(from + (to - from) * eased, false);

        if (!mutated && t > MID_SPIN_MUTATION_AT) {
          mutated = true;
          applyMutation(state, issue, avatarsGroup, onBadgeClick, showSingleAvatarSpeech, mutationPlan);
        }

        if (t < 1) {
          requestAnimationFrame(frame);
          return;
        }

        state.spinCount += 1;
        state.spinning = false;
        setRattle(false);
        setSliceState(pieGroup, issue, { flashing: false, softGlow: true });
        state.glowTimer = window.setTimeout(() => {
          setSliceState(pieGroup, issue, { flashing: false, softGlow: false });
        }, GLOW_AFTER_MS);

        const finalCandidates = Array.from((state.byIssue.get(issue) || new Map()).keys()).filter((id) => isAvatarVisible(state, id));
        const winner = pickWinner(state, finalCandidates) || targetId;
        const winAv = state.avatars.get(winner);
        if (winAv) winAv.group.classList.add('is-winner');
        showIssueSpeech(state, panel, svg, bubbles, issue, winner);
      }

      requestAnimationFrame(frame);
    }

    svg.addEventListener('pointermove', (ev) => {
      if (state.spinning) return;
      const issueId = issueFromPointer(ev.clientX, ev.clientY);
      setSliceHoverState(pieGroup, issueId);
    });

    svg.addEventListener('pointerleave', () => {
      setSliceHoverState(pieGroup, '');
    });

    buildPie(pieGroup, runIssue, totals);
    const initial = ISSUE_SLICES.find((slice) => {
      const byCandidate = state.byIssue.get(slice.id);
      return byCandidate && byCandidate.size;
    });
    if (initial) {
      state.issue = initial.id;
      setSliceState(pieGroup, initial.id, { flashing: false, softGlow: true });
      showIssueSpeech(state, panel, svg, bubbles, initial.id, '');
    }

    window.addEventListener('resize', () => {
      if (state.issue && !state.spinning) {
        showIssueSpeech(state, panel, svg, bubbles, state.issue, '');
      }
    });
  }

  window.GortonStandoffInteractible = { init };
}());
