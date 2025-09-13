/* Lightweight policy browser: populates controls from assets/all-policies.json,
   renders selected policies inline, and optionally shows the full page in an iframe. */

// TODO: This kinda worked technically, but made it much harder to read the details
//          We probably just want a simple in-page filter rather than lots of complexity

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('policy-browser');
  if (!panel) return;

  const selGroup = panel.querySelector('#pb-group');
  const selTag = panel.querySelector('#pb-tag');
  const selValue = panel.querySelector('#pb-value');
  const btnShow = panel.querySelector('#pb-show');
  const viewAllLink = panel.querySelector('#pb-view-all-link');
  const status = panel.querySelector('#pb-status');
  const results = panel.querySelector('#pb-results');
  const iframeContainer = panel.querySelector('#pb-iframe-container');

  const JSON_URL = (document.currentScript && document.currentScript.src && document.currentScript.src.includes('/assets/'))
    ? document.currentScript.src.replace(/\/policy-browser\.js$/, '/all-policies.json')
    : '/assets/all-policies.json';

  let data = null;

  function clearResults() {
    results.innerHTML = '';
  }

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  function hideIframe() {
    iframeContainer.innerHTML = '';
    iframeContainer.setAttribute('aria-hidden', 'true');
  }

  function showIframe(src) {
    iframeContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.loading = 'lazy';
    iframe.style.width = '100%';
    iframe.style.minHeight = '60vh';
    iframe.style.border = '1px solid #e5e7eb';
    iframeContainer.appendChild(iframe);
    iframeContainer.setAttribute('aria-hidden', 'false');
  }

  function populateGroups() {
    if (!data) return;
    // Keep existing first two options
    const existing = Array.from(selGroup.options).slice(0, 2);
    selGroup.innerHTML = '';
    existing.forEach(o => selGroup.appendChild(o));
    data.groups.forEach(g => {
      const opt = document.createElement('option');
      opt.value = g.sectionId;
      opt.textContent = g.docTitle;
      selGroup.appendChild(opt);
    });
  }

  function populateTags() {
    if (!data) return;
    const first = document.createElement('option');
    first.value = '';
    first.textContent = '— Any tag —';
    selTag.innerHTML = '';
    selTag.appendChild(first);
    Object.keys(data.tags).sort().forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = k;
      selTag.appendChild(opt);
    });
  }

  function populateValues(tagKey) {
    const first = document.createElement('option');
    first.value = '';
    first.textContent = '— Any value —';
    selValue.innerHTML = '';
    selValue.appendChild(first);
    if (!tagKey || !data || !data.tags[tagKey]) return;
    data.tags[tagKey].forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      selValue.appendChild(opt);
    });
  }

  function findGroup(sectionId) {
    return data.groups.find(g => g.sectionId === sectionId);
  }

  function policyMatches(policy, tagKey, tagValue) {
    if (!tagKey) return true;
    return policy.tags.some(t => t.k === tagKey && (!tagValue || t.v === tagValue));
  }

  function renderPolicies(sectionId, tagKey, tagValue) {
    hideIframe();
    clearResults();
    if (!data) return;
    const groups = sectionId === '*' ? data.groups : [findGroup(sectionId)].filter(Boolean);
    let count = 0;
    groups.forEach(g => {
      const matches = g.policies.filter(p => policyMatches(p, tagKey, tagValue));
      matches.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = p.html;
        results.appendChild(div);
        count += 1;
      });
    });
    setStatus(count ? `${count} polic${count === 1 ? 'y' : 'ies'} displayed` : 'No policies match your filters');
  }

  // Wire controls
  selTag.addEventListener('change', () => populateValues(selTag.value));
  btnShow.addEventListener('click', () => {
    const group = selGroup.value;
    if (!group) {
      setStatus('Choose a policy group to start, or View All');
      clearResults();
      hideIframe();
      return;
    }
    renderPolicies(group, selTag.value, selValue.value);
  });
  if (viewAllLink) {
    viewAllLink.addEventListener('click', (e) => {
      // Prefer iframe if JS available
      e.preventDefault();
      showIframe(viewAllLink.getAttribute('href'));
      setStatus('Showing all policies (iframe)');
      clearResults();
    });
  }

  // Load JSON
  fetch(JSON_URL, { credentials: 'same-origin' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to load all-policies.json')))
    .then(j => {
      data = j;
      populateGroups();
      populateTags();
      populateValues('');
      setStatus('No policies displayed, choose a policy group to start or view all');
    })
    .catch(() => {
      // If JSON isn’t available, keep the link-only fallback
      setStatus('No policies displayed. JSON index unavailable; use View All.');
    });
});


