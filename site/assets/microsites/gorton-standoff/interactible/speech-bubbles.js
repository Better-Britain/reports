(function () {
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function rectsOverlap(a, b, gap) {
    const g = Number(gap || 0);
    return !(
      a.right + g < b.left ||
      a.left > b.right + g ||
      a.bottom + g < b.top ||
      a.top > b.bottom + g
    );
  }

  function nearestPointOnRect(rect, point) {
    const x = clamp(point.x, rect.left, rect.right);
    const y = clamp(point.y, rect.top, rect.bottom);
    return { x, y };
  }

  function rectIntersectsCircle(rect, circle) {
    if (!circle) return false;
    const nearestX = clamp(circle.x, rect.left, rect.right);
    const nearestY = clamp(circle.y, rect.top, rect.bottom);
    const dx = nearestX - circle.x;
    const dy = nearestY - circle.y;
    return (dx * dx + dy * dy) <= (circle.r * circle.r);
  }

  function pointOnCircleToward(center, radius, target) {
    const dx = target.x - center.x;
    const dy = target.y - center.y;
    const len = Math.hypot(dx, dy) || 1;
    const r = Number(radius || 0);
    return {
      x: center.x + (dx / len) * r,
      y: center.y + (dy / len) * r
    };
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

  function angleFrom(center, point) {
    const dx = Number(point?.x || 0) - Number(center?.x || 0);
    const dy = Number(point?.y || 0) - Number(center?.y || 0);
    return normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI);
  }

  function pointAt(center, radius, angleDeg) {
    const rad = (Number(angleDeg || 0) * Math.PI) / 180;
    return {
      x: Number(center?.x || 0) + Number(radius || 0) * Math.cos(rad),
      y: Number(center?.y || 0) + Number(radius || 0) * Math.sin(rad)
    };
  }

  function create(panelEl, hostEl) {
    if (!panelEl || !hostEl) return null;

    const connector = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connector.setAttribute('class', 'speechConnectors');
    connector.setAttribute('viewBox', '0 0 100 100');
    connector.setAttribute('preserveAspectRatio', 'none');
    hostEl.appendChild(connector);

    function clear() {
      hostEl.querySelectorAll('.speechBubbleCard').forEach((node) => node.remove());
      connector.innerHTML = '';
    }

    function render(items, options) {
      clear();
      const opts = options || {};
      const panelRect = panelEl.getBoundingClientRect();
      if (!panelRect.width || !panelRect.height) return;
      connector.setAttribute('viewBox', '0 0 ' + panelRect.width.toFixed(2) + ' ' + panelRect.height.toFixed(2));
      const placed = [];
      const cards = [];
      const noGoCircle = opts.noGoCircle || null;
      const center = { x: panelRect.width / 2, y: panelRect.height / 2 };
      const bubbleMinR = Math.min(panelRect.width, panelRect.height) * 0.32;
      const bubbleMaxR = Math.min(panelRect.width, panelRect.height) * 0.47;
      const spokeStep = 15;
      const spokes = [];
      for (let a = 0; a < 360; a += spokeStep) spokes.push(a);
      const usedSpokes = new Set();

      const speakerAnchors = Array.isArray(opts.speakerAnchors) ? opts.speakerAnchors : [];
      const blockedSpokes = new Set();
      for (const sp of speakerAnchors) {
        const aa = angleFrom(center, sp);
        for (const s of spokes) {
          if (angleDistance(s, aa) <= 12) blockedSpokes.add(s);
        }
      }

      const sorted = (Array.isArray(items) ? items.slice() : []).sort((a, b) => {
        const aw = Number(a?.priority || 0);
        const bw = Number(b?.priority || 0);
        if (bw !== aw) return bw - aw;
        const ax = angleFrom(center, a?.anchor);
        const bx = angleFrom(center, b?.anchor);
        return ax - bx;
      });

      for (const item of sorted) {
        const card = document.createElement('div');
        card.className = 'speechBubbleCard';
        card.innerHTML = '<div class="speechBubbleIssueTag" aria-hidden="true"></div><div class="speechBubbleText"></div><div class="speechBubbleMeta"></div><div class="speechBubbleTail" aria-hidden="true"></div>';
        const textEl = card.querySelector('.speechBubbleText');
        const metaEl = card.querySelector('.speechBubbleMeta');
        const issueTag = card.querySelector('.speechBubbleIssueTag');
        textEl.textContent = String(item?.text || '').slice(0, 180);
        const issueLabel = String(item?.issueLabel || '').trim();
        metaEl.textContent = issueLabel
          ? (String(item?.label || '') + ' \u00b7 ' + issueLabel)
          : String(item?.label || '');
        if (issueTag) {
          issueTag.style.background = String(item?.issueColor || 'rgba(42,27,20,.18)');
        }
        hostEl.appendChild(card);
        cards.push({ item, card });
      }

      for (const entry of cards) {
        const item = entry.item;
        const card = entry.card;
        const anchor = item.anchor || { x: 0, y: 0 };
        const bubbleW = card.offsetWidth || 240;
        const bubbleH = card.offsetHeight || 92;

        const preferredAngle = angleFrom(center, anchor);
        const candidateSpokes = spokes
          .filter((s) => !blockedSpokes.has(s) && !usedSpokes.has(s))
          .sort((a, b) => angleDistance(a, preferredAngle) - angleDistance(b, preferredAngle));

        let rect = null;
        let chosen = null;
        let spokeIdx = 0;
        while (!rect && spokeIdx < candidateSpokes.length) {
          const spoke = candidateSpokes[spokeIdx];
          const distanceToCenter = Math.hypot(anchor.x - center.x, anchor.y - center.y);
          const r = clamp(distanceToCenter + 105, bubbleMinR, bubbleMaxR);
          const bubbleCenter = pointAt(center, r, spoke);
          const left = clamp(bubbleCenter.x - bubbleW / 2, 12, panelRect.width - bubbleW - 12);
          const top = clamp(bubbleCenter.y - bubbleH / 2, 12, panelRect.height - bubbleH - 12);
          const candidateRect = { left, top, right: left + bubbleW, bottom: top + bubbleH };
          const overlapsBubble = placed.some((p) => rectsOverlap(candidateRect, p, 10));
          const overlapsNoGo = rectIntersectsCircle(candidateRect, noGoCircle);
          if (!overlapsBubble && !overlapsNoGo) {
            rect = candidateRect;
            chosen = spoke;
            break;
          }
          spokeIdx += 1;
        }

        if (!rect) {
          // Fallback: keep it near anchor but still outside central picker.
          let x = clamp(anchor.x + 68, 12, panelRect.width - bubbleW - 12);
          let y = clamp(anchor.y - bubbleH * 0.45, 12, panelRect.height - bubbleH - 12);
          rect = { left: x, top: y, right: x + bubbleW, bottom: y + bubbleH };
          if (rectIntersectsCircle(rect, noGoCircle)) {
            y = clamp(anchor.y + 68, 12, panelRect.height - bubbleH - 12);
            rect = { left: x, top: y, right: x + bubbleW, bottom: y + bubbleH };
          }
        }

        placed.push(rect);
        if (chosen != null) usedSpokes.add(chosen);

        card.style.left = String(rect.left) + 'px';
        card.style.top = String(rect.top) + 'px';

        const target = nearestPointOnRect(rect, anchor);
        const anchorRadius = Number(item?.anchorRadius || 0);
        const speaker = pointOnCircleToward(anchor, anchorRadius, target);

        const tail = card.querySelector('.speechBubbleTail');
        if (tail) {
          const tailX = target.x - rect.left;
          const tailY = target.y - rect.top;
          const deg = Math.atan2(speaker.y - target.y, speaker.x - target.x) * 180 / Math.PI;
          tail.style.left = String(tailX) + 'px';
          tail.style.top = String(tailY) + 'px';
          tail.style.transform = 'translate(-50%, -50%) rotate(' + deg.toFixed(2) + 'deg)';
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'speechConnectorPath');
        path.setAttribute('d', 'M ' + speaker.x.toFixed(1) + ' ' + speaker.y.toFixed(1) + ' L ' + target.x.toFixed(1) + ' ' + target.y.toFixed(1));
        connector.appendChild(path);
      }
    }

    return { clear, render };
  }

  window.GortonSpeechBubbles = { create };
}());
