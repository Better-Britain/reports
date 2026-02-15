const STORAGE_KEY = "bbb:wokeScore:v1";

const issuesRoot = document.getElementById("issues");
const issues = Array.from(document.querySelectorAll('details.issue[data-issue]'));

const scoreValue = document.getElementById("scoreValue");
const scoreBucket = document.getElementById("scoreBucket");
const breakdown = document.getElementById("breakdown");
const posList = document.getElementById("posList");
const negList = document.getElementById("negList");
const issueList = document.getElementById("issueList");
const resetAllBtn = document.getElementById("resetAllBtn");
const resultsPanel = document.querySelector(".resultsPanel");

/** @type {Map<string, Set<string>>} */
const selections = new Map();

let unlockedIndex = 0;
let saveTimer = /** @type {number | undefined} */ (undefined);

function getIssueKey(issueEl) {
  return issueEl.getAttribute("data-issue") || "";
}

function getIssueTitle(issueEl) {
  return issueEl.querySelector("summary .issueTitle")?.textContent?.trim() || getIssueKey(issueEl);
}

function setBtnSelected(btn, selected) {
  btn.classList.toggle("selected", selected);
  btn.setAttribute("aria-pressed", selected ? "true" : "false");
}

function getBtnText(btn) {
  return btn.querySelector(".optText")?.textContent?.trim() || btn.textContent?.trim() || "";
}

function getBtnEffect(btn) {
  return btn.querySelector(".optEffect")?.textContent?.trim() || "";
}

function getPickedCount(issueEl) {
  const key = getIssueKey(issueEl);
  return selections.get(key)?.size ?? 0;
}

function updateIssueMeta(issueEl) {
  const picked = getPickedCount(issueEl);
  const countEl = issueEl.querySelector('summary [data-role="pickedCount"]');
  if (countEl) countEl.textContent = String(picked);
}

function openUpTo(idx) {
  for (let i = 0; i < issues.length; i += 1) {
    issues[i].open = i <= idx;
  }
}

function isComplete() {
  return issues.every((issueEl) => getPickedCount(issueEl) > 0);
}

function computeResults() {
  /** @type {{issueKey:string, issueTitle:string, optId:string, woke:number, text:string, effect:string}[]} */
  const picks = [];
  let total = 0;

  for (const issueEl of issues) {
    const issueKey = getIssueKey(issueEl);
    if (!issueKey) continue;
    const issueTitle = getIssueTitle(issueEl);
    const set = selections.get(issueKey);
    if (!set || set.size === 0) continue;

    for (const optId of set) {
      const btn = issuesRoot?.querySelector(`button.optBtn[data-opt="${CSS.escape(optId)}"]`);
      if (!(btn instanceof HTMLButtonElement)) continue;
      const woke = Number.parseInt(btn.getAttribute("data-woke") || "0", 10) || 0;
      const text = getBtnText(btn);
      const effect = getBtnEffect(btn);
      picks.push({ issueKey, issueTitle, optId, woke, text, effect });
      total += woke;
    }
  }

  const pos = picks.filter((p) => p.woke > 0).sort((a, b) => b.woke - a.woke);
  const neg = picks.filter((p) => p.woke < 0).sort((a, b) => a.woke - b.woke);

  /** @type {Map<string, number>} */
  const byIssue = new Map();
  for (const p of picks) byIssue.set(p.issueKey, (byIssue.get(p.issueKey) ?? 0) + p.woke);

  return { total, picks, pos, neg, byIssue };
}

function bucketLabel(avg) {
  if (avg >= 2.2) return "Very woke";
  if (avg >= 0.8) return "Leans woke";
  if (avg <= -2.2) return "Very anti-woke";
  if (avg <= -0.8) return "Leans anti-woke";
  return "Mixed / it depends";
}

function renderPickList(targetOl, items) {
  if (!targetOl) return;
  targetOl.innerHTML = "";
  for (const it of items) {
    const li = document.createElement("li");
    li.className = "pickItem";

    const head = document.createElement("div");
    head.className = "pickHead";

    const txt = document.createElement("div");
    txt.className = "pickText";
    txt.textContent = it.text;

    const meta = document.createElement("div");
    meta.className = "pickMeta";
    meta.textContent = `${it.woke > 0 ? "+" : ""}${it.woke} • ${it.issueKey}`;

    head.appendChild(txt);
    head.appendChild(meta);
    li.appendChild(head);

    if (it.effect) {
      const eff = document.createElement("div");
      eff.className = "pickEffect";
      eff.textContent = it.effect;
      li.appendChild(eff);
    }

    targetOl.appendChild(li);
  }
}

function renderIssueScores(byIssue) {
  if (!issueList) return;
  issueList.innerHTML = "";

  for (const issueEl of issues) {
    const key = getIssueKey(issueEl);
    if (!key) continue;
    const score = byIssue.get(key) ?? 0;
    const row = document.createElement("div");
    row.className = "issueScoreRow";

    const left = document.createElement("div");
    left.className = "issueScoreTitle";
    left.textContent = getIssueTitle(issueEl);

    const right = document.createElement("div");
    right.className = "issueScoreValue";
    right.textContent = `${score > 0 ? "+" : ""}${score}`;

    const tag = document.createElement("span");
    tag.className = "issueScoreTag";
    if (score > 0) tag.textContent = "woke-ish";
    else if (score < 0) tag.textContent = "anti-woke-ish";
    else tag.textContent = "neutral/mixed";

    row.appendChild(left);
    row.appendChild(tag);
    row.appendChild(right);
    issueList.appendChild(row);
  }
}

function updateResultsUI() {
  const complete = isComplete();
  const { total, pos, neg, byIssue } = computeResults();

  if (resultsPanel) resultsPanel.classList.toggle("incomplete", !complete);
  if (!complete) {
    if (scoreValue) scoreValue.textContent = "Pick at least one position in every issue to see your score.";
    if (scoreBucket) scoreBucket.textContent = "";
    if (breakdown) breakdown.hidden = true;
    return;
  }

  const avg = issues.length ? total / issues.length : 0;
  const label = bucketLabel(avg);
  if (scoreValue) {
    const s = `${total > 0 ? "+" : ""}${total}`;
    scoreValue.textContent = `You are ${s} woke.`;
  }
  if (scoreBucket) scoreBucket.textContent = label;
  if (breakdown) breakdown.hidden = false;

  renderPickList(posList, pos);
  renderPickList(negList, neg);
  renderIssueScores(byIssue);
}

function scheduleSave() {
  if (saveTimer) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    /** @type {Record<string, string[]>} */
    const sel = {};
    for (const issueEl of issues) {
      const key = getIssueKey(issueEl);
      if (!key) continue;
      sel[key] = Array.from(selections.get(key) ?? []);
    }
    const payload = { unlockedIndex, selections: sel };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, 120);
}

function restore() {
  let data;
  try {
    data = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    data = null;
  }
  if (!data || typeof data !== "object") return;

  const u = /** @type {any} */ (data).unlockedIndex;
  if (Number.isInteger(u) && u >= 0) unlockedIndex = Math.max(0, Math.min(issues.length - 1, u));

  const sel = /** @type {any} */ (data).selections;
  if (!sel || typeof sel !== "object") return;

  for (const issueEl of issues) {
    const key = getIssueKey(issueEl);
    if (!key) continue;
    const arr = sel[key];
    if (!Array.isArray(arr)) continue;
    const set = selections.get(key);
    if (!set) continue;
    for (const optId of arr) {
      if (typeof optId !== "string") continue;
      set.add(optId);
    }
  }

  // Ensure unlocked covers any already-picked issues.
  for (let i = 0; i < issues.length; i += 1) {
    if (getPickedCount(issues[i]) > 0) unlockedIndex = Math.max(unlockedIndex, i);
  }
}

function applySelectionsToDOM() {
  for (const issueEl of issues) {
    const key = getIssueKey(issueEl);
    if (!key) continue;
    const set = selections.get(key) ?? new Set();
    const btns = Array.from(issueEl.querySelectorAll("button.optBtn[data-opt]"));
    for (const btn of btns) {
      const optId = btn.getAttribute("data-opt") || "";
      setBtnSelected(btn, set.has(optId));
    }
    updateIssueMeta(issueEl);
  }
}

function unlockNextIssue(issueIndex) {
  const nextIdx = issueIndex + 1;
  if (nextIdx >= issues.length) return;
  issues[nextIdx].open = true;
  unlockedIndex = Math.max(unlockedIndex, nextIdx);
}

function wire() {
  // init selections map
  for (const issueEl of issues) {
    const key = getIssueKey(issueEl);
    if (!key) continue;
    selections.set(key, new Set());
  }

  restore();
  openUpTo(unlockedIndex);
  applySelectionsToDOM();
  updateResultsUI();

  issues.forEach((issueEl, idx) => {
    const key = getIssueKey(issueEl);
    if (!key) return;
    const btns = Array.from(issueEl.querySelectorAll("button.optBtn[data-opt]"));

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const optId = btn.getAttribute("data-opt") || "";
        if (!optId) return;
        const set = selections.get(key);
        if (!set) return;

        const wasEmpty = set.size === 0;
        const had = set.has(optId);
        if (had) set.delete(optId);
        else set.add(optId);

        setBtnSelected(btn, !had);
        updateIssueMeta(issueEl);
        updateResultsUI();

        if (wasEmpty && set.size > 0) unlockNextIssue(idx);
        scheduleSave();
      });
    });
  });

  resetAllBtn?.addEventListener("click", () => {
    for (const issueEl of issues) {
      const key = getIssueKey(issueEl);
      if (!key) continue;
      selections.get(key)?.clear();
    }
    unlockedIndex = 0;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    openUpTo(unlockedIndex);
    applySelectionsToDOM();
    updateResultsUI();
  });
}

wire();

