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

    function render(items) {
      clear();
      const panelRect = panelEl.getBoundingClientRect();
      if (!panelRect.width || !panelRect.height) return;
      const placed = [];
      const cards = [];

      const sorted = (Array.isArray(items) ? items.slice() : []).sort((a, b) => {
        const ax = Number(a?.anchor?.x || 0);
        const bx = Number(b?.anchor?.x || 0);
        return bx - ax;
      });

      for (const item of sorted) {
        const card = document.createElement('div');
        card.className = 'speechBubbleCard';
        card.innerHTML = '<div class="speechBubbleText"></div><div class="speechBubbleMeta"></div>';
        const textEl = card.querySelector('.speechBubbleText');
        const metaEl = card.querySelector('.speechBubbleMeta');
        textEl.textContent = String(item?.text || '').slice(0, 180);
        metaEl.textContent = String(item?.label || '');
        hostEl.appendChild(card);
        cards.push({ item, card });
      }

      for (const entry of cards) {
        const item = entry.item;
        const card = entry.card;
        const anchor = item.anchor || { x: 0, y: 0 };
        const preferLeft = anchor.x > panelRect.width * 0.5;
        const bubbleW = card.offsetWidth || 240;
        const bubbleH = card.offsetHeight || 92;

        let x = preferLeft ? (anchor.x - bubbleW - 68) : (anchor.x + 68);
        x = clamp(x, 12, panelRect.width - bubbleW - 12);
        let y = clamp(anchor.y - bubbleH * 0.45, 12, panelRect.height - bubbleH - 12);

        let rect = { left: x, top: y, right: x + bubbleW, bottom: y + bubbleH };
        let loops = 0;
        while (placed.some((p) => rectsOverlap(rect, p, 10)) && loops < 40) {
          y += 20;
          if (y + bubbleH > panelRect.height - 12) y = 12;
          rect = { left: x, top: y, right: x + bubbleW, bottom: y + bubbleH };
          loops += 1;
        }
        placed.push(rect);

        card.style.left = String(rect.left) + 'px';
        card.style.top = String(rect.top) + 'px';

        const target = nearestPointOnRect(rect, anchor);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'speechConnectorPath');
        path.setAttribute('d', 'M ' + anchor.x.toFixed(1) + ' ' + anchor.y.toFixed(1) + ' L ' + target.x.toFixed(1) + ' ' + target.y.toFixed(1));
        connector.appendChild(path);
      }
    }

    return { clear, render };
  }

  window.GortonSpeechBubbles = { create };
}());
