// OSA Presenter: multi-panel reading overlay
(function(){
  if (!document.getElementById('osa-explainer')) return;

  const STORAGE_KEY = 'osa-presenter-progress-v1';
  const state = {
    index: 0,
    running: false,
    timer: null,
    panelCount: 3,
    stepMs: 4000,
    items: []
  };

  function qs(sel, ctx=document){ return ctx.querySelector(sel); }
  function qsa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

  function buildOverlay(){
    let overlay = document.getElementById('osa-presenter-overlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'osa-presenter-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML = `
      <div class="osa-presenter-chrome">
        <div class="osa-presenter-controls">
          <button class="osa-presenter-btn" id="osa-presenter-play">Play</button>
          <button class="osa-presenter-btn" id="osa-presenter-pause">Pause</button>
        </div>
        <button class="osa-presenter-close" id="osa-presenter-close" aria-label="Close">✕</button>
      </div>
      <div class="osa-presenter-shell" id="osa-presenter-shell"></div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  function collectItems(){
    const root = document.getElementById('osa-explainer');
    const entries = [];
    // Gather H1/H2 and paragraph blocks inside sections and details
    qsa('section > h1, section > h2', root).forEach(h => {
      const title = h.textContent.trim();
      if (title) entries.push({ type: 'heading', html: `<h2>${escapeHtml(title)}</h2>` });
      let sib = h.nextElementSibling;
      let taken = 0;
      while (sib && taken < 2) {
        if (sib.matches('p')) { entries.push({ type: 'para', html: `<p>${escapeHtml(sib.textContent)}</p>` }); taken++; }
        sib = sib.nextElementSibling;
      }
    });
    // Also include each details summary with the first paragraph
    qsa('details', root).forEach(d => {
      const sum = qs('summary', d);
      if (!sum) return;
      const title = sum.textContent.trim();
      if (title) entries.push({ type: 'qa', html: `<h3>${escapeHtml(title)}</h3>` });
      const firstP = qs('p', d);
      if (firstP) entries.push({ type: 'para', html: `<p>${escapeHtml(firstP.textContent)}</p>` });
    });
    // Build items with estimated weight for sizing
    state.items = entries.map(it => {
      const text = it.html.replace(/<[^>]+>/g,'');
      const len = text.length;
      const weight = len > 350 ? 'l' : (len > 200 ? 'm' : 's');
      return { ...it, weight };
    });
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }

  function restore(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (typeof data.index === 'number') state.index = Math.max(0, Math.min(data.index, state.items.length-1));
    } catch {}
  }

  function persist(){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index: state.index })); } catch {}
  }

  // Dynamic bin-packing style layout that preserves last N panels in place
  const RECENT_STICKY = 2;
  const PADDING = 10;
  function layoutPanels(){
    const shell = document.getElementById('osa-presenter-shell');
    const width = shell.clientWidth;
    const height = shell.clientHeight;
    const cols = width < 720 ? 1 : (width < 1200 ? 2 : 3);
    const colWidth = Math.floor((width - (PADDING*(cols-1))) / cols);

    // Determine order: stick last RECENT_STICKY, layout others around
    const panels = Array.from(shell.children);
    const sticky = panels.slice(-RECENT_STICKY);
    const rest = panels.slice(0, Math.max(0, panels.length-RECENT_STICKY));

    // Columns track current y offset
    const columns = Array.from({length: cols}, () => ({ y: 0 }));

    // Helper to place a panel in the column with smallest y
    function place(panel){
      panel.style.width = colWidth + 'px';
      panel.style.maxWidth = colWidth + 'px';
      panel.style.height = 'auto';
      panel.style.left = '0px'; panel.style.top = '0px';
      // Measure height
      panel.style.position = 'absolute';
      const h = Math.min(panel.scrollHeight, Math.max(160, Math.floor(height/2)));
      // Pick column
      let best = 0; for (let i=1;i<cols;i++){ if (columns[i].y < columns[best].y) best = i; }
      const x = best * (colWidth + PADDING);
      const y = columns[best].y;
      panel.style.transform = `translate(${x}px, ${y}px)`;
      panel.style.height = h + 'px';
      columns[best].y = y + h + PADDING;
    }

    // Place non-sticky first, then ensure sticky are on top of their last positions if present
    rest.forEach(place);
    sticky.forEach(place);
  }

  function renderPanels(){
    const shell = document.getElementById('osa-presenter-shell');
    const start = Math.max(0, state.index - state.panelCount + 1);
    for (let i=start; i<=state.index; i++){
      const it = state.items[i];
      if (!it || it._rendered) continue;
      const panel = document.createElement('article');
      panel.className = `osa-panel size-${it.weight}`;
      const body = it.type === 'para' ? it.html.replace('<p','<p class="clamp-para"') : it.html;
      panel.innerHTML = `${body}\n<div class="osa-progress"><div class="osa-progress-bar"><span style="width:${Math.round(((i+1)/state.items.length)*100)}%"></span></div><span>${i+1}/${state.items.length}</span></div>`;
      shell.appendChild(panel);
      requestAnimationFrame(()=>panel.classList.add('show'));
      it._rendered = true;
    }
    layoutPanels();
  }

  function step(){
    if (!state.running) return;
    state.index = Math.min(state.items.length-1, state.index + 1);
    persist();
    renderPanels();
    if (state.index >= state.items.length-1) { state.running = false; return; }
    state.timer = setTimeout(step, state.stepMs);
  }

  function play(){
    if (!state.items.length) collectItems();
    restore();
    renderPanels();
    state.running = true;
    clearTimeout(state.timer);
    state.timer = setTimeout(step, state.stepMs);
  }
  function pause(){ state.running = false; clearTimeout(state.timer); }
  function close(){ pause(); const ov = document.getElementById('osa-presenter-overlay'); if (ov) ov.setAttribute('aria-hidden','true'); }

  // Wire toolbar Play button (created in osa.js)
  function ensureToolbarPlay(){
    const toolbar = document.querySelector('#osa-explainer .osa-toolbar');
    if (!toolbar || document.getElementById('osa-presenter-launch')) return;
    const btn = document.createElement('button');
    btn.id = 'osa-presenter-launch';
    btn.className = 'osa-presenter-btn';
    btn.textContent = 'Play';
    // Insert before search input
    const search = document.getElementById('osa-search');
    if (search && search.parentElement === toolbar) toolbar.insertBefore(btn, search);
    else toolbar.appendChild(btn);
    btn.addEventListener('click', () => {
      const ov = buildOverlay();
      ov.setAttribute('aria-hidden','false');
      play();
    });
  }

  function wireOverlay(){
    const ov = buildOverlay();
    const playBtn = document.getElementById('osa-presenter-play');
    const pauseBtn = document.getElementById('osa-presenter-pause');
    const closeBtn = document.getElementById('osa-presenter-close');
    playBtn.addEventListener('click', () => { if (!state.running) { state.running = true; step(); }});
    pauseBtn.addEventListener('click', () => pause());
    closeBtn.addEventListener('click', () => close());
    window.addEventListener('resize', () => { if (ov.getAttribute('aria-hidden') === 'false') layoutPanels(); });
  }

  // Lazy wiring
  ensureToolbarPlay();
  wireOverlay();
})();


