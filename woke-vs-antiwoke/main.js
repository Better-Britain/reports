const SIDES = /** @type {const} */ (["left", "center", "right"]);

const el = (id) => document.getElementById(id);
const rowsRoot = el("rows");
const verdictBig = el("verdictBig");
const extremesCount = el("extremesCount");
const issuesTotal = el("issuesTotal");
const leanReadout = el("leanReadout");
const resetBtn = el("resetBtn");

/** @type {Map<string, "left"|"center"|"right">} */
const state = new Map();

function sideLabel(side) {
  if (side === "left") return "Progressive failure mode";
  if (side === "right") return "Reactionary failure mode";
  return "Normal outcome";
}

function getCards() {
  if (!rowsRoot) return [];
  return Array.from(rowsRoot.querySelectorAll(".issueCard[data-issue]"));
}

function getKey(card) {
  return card.getAttribute("data-issue") || "";
}

function getSelectedSide(card) {
  const selected =
    card.querySelector('button.optBtn.selected[data-side="left"]') ||
    card.querySelector('button.optBtn.selected[data-side="center"]') ||
    card.querySelector('button.optBtn.selected[data-side="right"]');
  const aria =
    card.querySelector('button.optBtn[aria-checked="true"][data-side="left"]') ||
    card.querySelector('button.optBtn[aria-checked="true"][data-side="center"]') ||
    card.querySelector('button.optBtn[aria-checked="true"][data-side="right"]');

  const elSide = (selected || aria)?.getAttribute("data-side");
  if (elSide === "left" || elSide === "right" || elSide === "center") return elSide;
  return "center";
}

function computeVerdict() {
  const cards = getCards();
  const total = cards.length;
  let extremes = 0;
  let lean = 0;

  for (const card of cards) {
    const key = getKey(card);
    if (!key) continue;
    const side = state.get(key) ?? "center";
    if (side !== "center") extremes += 1;
    if (side === "left") lean -= 1;
    if (side === "right") lean += 1;
  }

  const extremeRate = total ? extremes / total : 0;
  const leanAbs = Math.abs(lean);
  let verdict = "You’re mostly normal.";
  if (extremeRate > 0.40) verdict = "You’re very extreme.";
  else if (extremeRate > 0.15) verdict = "You’re fairly extreme.";

  let leanText = "Balanced";
  if (leanAbs >= Math.ceil(total * 0.12)) {
    leanText = lean < 0 ? "Leans woke" : "Leans anti-woke";
  } else if (extremes > 0) {
    leanText = "Mixed extremes";
  }

  return { verdict, extremes, total, leanText };
}

function updateSummary() {
  const { verdict, extremes, total, leanText } = computeVerdict();
  verdictBig.textContent = verdict;
  if (extremesCount) extremesCount.textContent = String(extremes);
  if (issuesTotal) issuesTotal.textContent = String(total);
  leanReadout.textContent = leanText;
}

function updateRowUI(key) {
  const side = state.get(key) ?? "center";
  const card = rowsRoot?.querySelector(`.issueCard[data-issue="${CSS.escape(key)}"]`);
  if (!card) return;

  const btns = card.querySelectorAll("button.optBtn");
  btns.forEach((b) => {
    const bSide = b.getAttribute("data-side");
    const selected = bSide === side;
    b.classList.toggle("selected", selected);
    b.setAttribute("aria-checked", selected ? "true" : "false");
    b.tabIndex = selected ? 0 : -1;
  });

  const pill = card.querySelector(".failurePill");
  const modes = Array.from(card.querySelectorAll(".failureMode[data-side]"));
  if (!pill || !modes.length) return;

  pill.textContent = sideLabel(side);
  pill.classList.remove("left", "center", "right");
  pill.classList.add(side);

  modes.forEach((m) => {
    const mSide = m.getAttribute("data-side");
    m.classList.toggle("active", mSide === side);
  });
}

function setSelection(key, side) {
  state.set(key, side);
  updateRowUI(key);
  updateSummary();
}

function wireRow(card) {
  const key = getKey(card);
  if (!key) return;

  const initial = getSelectedSide(card);
  state.set(key, initial);

  const btns = Array.from(card.querySelectorAll("button.optBtn[data-side]"));
  btns.forEach((btn) => {
    const side = btn.getAttribute("data-side");
    if (side !== "left" && side !== "center" && side !== "right") return;

    btn.addEventListener("click", () => setSelection(key, side));
    btn.addEventListener("keydown", (e) => {
      const k = e.key;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(k)) return;
      e.preventDefault();
      const current = state.get(key) ?? "center";
      const idx = SIDES.indexOf(current);
      const dir = k === "ArrowLeft" || k === "ArrowUp" ? -1 : 1;
      const next = SIDES[Math.max(0, Math.min(2, idx + dir))];
      setSelection(key, next);
      const nextBtn = card.querySelector(`button.optBtn[data-side="${next}"]`);
      if (nextBtn instanceof HTMLElement) nextBtn.focus();
    });
  });

  updateRowUI(key);
}

function init() {
  const cards = getCards();
  cards.forEach(wireRow);
  updateSummary();
}

resetBtn.addEventListener("click", () => {
  const cards = getCards();
  for (const card of cards) {
    const key = getKey(card);
    if (!key) continue;
    state.set(key, "center");
    updateRowUI(key);
  }
  updateSummary();
});

init();

