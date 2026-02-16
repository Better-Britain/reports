const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const el = (id) => document.getElementById(id);

// Approx anchor from the user-provided blog snippet:
// - “Posted 1 week ago”
// - “Start 05:09 PM”
// - February is GMT, so treat it as 17:09Z.
//
// If you want a different anchor, change ANCHOR_ISO (or set it to null to anchor at page load).
const ANCHOR_ISO = "2026-02-09T17:09:00Z";
const ECONOMY_MILESTONE_GBP = 1_000_000_000_000;

// Rough UK household count (for a “per household” sanity check).
const UK_HOUSEHOLDS = 28_500_000;

const BASE_COMPARISONS = [
  { id: "brexit", label: "Brexit receipts shortfall", valueBn: null, tone: "brexit" },
  { id: "debtInterest", label: "Interest on national debt", valueBn: 106, tone: "neutral" },
  { id: "pensionRelief", label: "Pension tax relief", valueBn: 60, tone: "neutral" },
  { id: "taxGap", label: "“Tax gap”", valueBn: 45, tone: "neutral" },
  { id: "housingSupport", label: "Housing support → private landlords", valueBn: 12, tone: "neutral" },
  { id: "immigration", label: "Immigration fiscal cost (generous cap)", valueBn: 10, tone: "contrast" },
];

const EFFECTS = [
  { id: "nurses", label: "Nurse-years funded", unitCost: 55_000, unitHint: "£55k per nurse-year" },
  { id: "teachers", label: "Teacher-years funded", unitCost: 55_000, unitHint: "£55k per teacher-year" },
  { id: "police", label: "Police officer-years funded", unitCost: 60_000, unitHint: "£60k per officer-year" },
  { id: "socialHomes", label: "Social/affordable homes supported", unitCost: 120_000, unitHint: "£120k per home (capital subsidy proxy)" },
  { id: "insulation", label: "Homes insulated/retrofitted", unitCost: 7_000, unitHint: "£7k per home (light retrofit proxy)" },
  { id: "childcare", label: "Childcare place-years funded", unitCost: 6_000, unitHint: "£6k per child-year" },
  { id: "buses", label: "Bus route-years saved", unitCost: 250_000, unitHint: "£250k per route-year subsidy proxy" },
  { id: "food", label: "Free school meal pupil-years", unitCost: 500, unitHint: "£500 per pupil-year" },
];

const ui = {
  showEconomy: el("showEconomy"),
  showTreasury: el("showTreasury"),
  showNhs: el("showNhs"),

  receiptsBn: el("receiptsBn"),
  receiptsReadout: el("receiptsReadout"),
  receiptsMinReadout: el("receiptsMinReadout"),
  receiptsMaxReadout: el("receiptsMaxReadout"),

  taxToGdp: el("taxToGdp"),
  taxToGdpReadout: el("taxToGdpReadout"),

  cycleFactor: el("cycleFactor"),
  cycleReadout: el("cycleReadout"),

  nhsShare: el("nhsShare"),
  nhsShareReadout: el("nhsShareReadout"),

  anchorReadout: el("anchorReadout"),
  weeklyGapReadout: el("weeklyGapReadout"),

  cardEconomy: el("cardEconomy"),
  cardTreasury: el("cardTreasury"),
  cardNhs: el("cardNhs"),

  economyCounter: el("economyCounter"),
  treasuryCounter: el("treasuryCounter"),
  nhsCounter: el("nhsCounter"),

  economyRateReadout: el("economyRateReadout"),
  treasuryRateReadout: el("treasuryRateReadout"),
  nhsRateReadout: el("nhsRateReadout"),

  cmp: {
    brexit: el("cmpBrexit"),
    debtInterest: el("cmpDebtInterest"),
    pensionRelief: el("cmpPensionRelief"),
    taxGap: el("cmpTaxGap"),
    housingSupport: el("cmpHousingSupport"),
    immigration: el("cmpImmigration"),
  },
  compareAxisReadout: el("compareAxisReadout"),
  comparePlot: el("comparePlot"),

  usableTaxReadout: el("usableTaxReadout"),
  usableTaxWeeklyReadout: el("usableTaxWeeklyReadout"),
  householdWeeklyReadout: el("householdWeeklyReadout"),

  fx: {
    nurses: el("fxNurses"),
    teachers: el("fxTeachers"),
    police: el("fxPolice"),
    socialHomes: el("fxSocialHomes"),
    insulation: el("fxInsulation"),
    childcare: el("fxChildcare"),
    buses: el("fxBuses"),
    food: el("fxFood"),
  },
  unitScale: el("unitScale"),
  unitScaleReadout: el("unitScaleReadout"),
  effectsOutput: el("effectsOutput"),

  busBtn: el("busBtn"),
  busEgg: el("busEgg"),
  busDialog: el("busDialog"),
};

function fmtBn1(vBn) {
  return "£" + (Math.round(vBn * 10) / 10).toFixed(1) + "Bn";
}

function fmtBn0(vBn) {
  return "£" + Math.round(vBn).toLocaleString("en-GB") + "Bn";
}

function fmtWeekFromPerYear(perYearGbp) {
  const perWeek = perYearGbp / 52;
  if (perWeek >= 1e9) return "~" + fmtBn1(perWeek / 1e9) + "/week";
  if (perWeek >= 1e6) return "~£" + Math.round(perWeek / 1e6) + "m/week";
  return "~" + GBP0.format(perWeek) + "/week";
}

function fmtPerSecond(perYearGbp) {
  return perYearGbp / (365.25 * 24 * 3600);
}

function setVisible(elm, yes) {
  if (!elm) return;
  elm.style.display = yes ? "" : "none";
}

function parseAnchorMs() {
  if (!ANCHOR_ISO) return Date.now();
  const t = Date.parse(ANCHOR_ISO);
  if (Number.isFinite(t)) return t;
  return Date.now();
}

const anchorMs = parseAnchorMs();
ui.anchorReadout.textContent = new Date(anchorMs).toLocaleString("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/London",
});

function getState() {
  const receiptsBn = parseFloat(ui.receiptsBn.value);
  const taxToGdp = parseFloat(ui.taxToGdp.value) / 100;
  const cycleFactor = parseFloat(ui.cycleFactor.value);
  const nhsShare = parseFloat(ui.nhsShare.value) / 100;
  const unitScale = parseFloat(ui.unitScale.value) / 100;
  return {
    show: {
      economy: ui.showEconomy.checked,
      treasury: ui.showTreasury.checked,
      nhs: ui.showNhs.checked,
    },
    receiptsBn,
    taxToGdp,
    cycleFactor,
    nhsShare,
    unitScale,
    comparisons: {
      brexit: ui.cmp.brexit.checked,
      debtInterest: ui.cmp.debtInterest.checked,
      pensionRelief: ui.cmp.pensionRelief.checked,
      taxGap: ui.cmp.taxGap.checked,
      housingSupport: ui.cmp.housingSupport.checked,
      immigration: ui.cmp.immigration.checked,
    },
    effects: {
      nurses: ui.fx.nurses.checked,
      teachers: ui.fx.teachers.checked,
      police: ui.fx.police.checked,
      socialHomes: ui.fx.socialHomes.checked,
      insulation: ui.fx.insulation.checked,
      childcare: ui.fx.childcare.checked,
      buses: ui.fx.buses.checked,
      food: ui.fx.food.checked,
    },
  };
}

function computeRates(state) {
  const receiptsPerYear = state.receiptsBn * 1e9;
  const economyPerYear = state.taxToGdp > 0 ? receiptsPerYear / state.taxToGdp : 0;
  const nhsPerYear = receiptsPerYear * state.nhsShare;
  return { receiptsPerYear, economyPerYear, nhsPerYear };
}

function renderStatic() {
  const state = getState();
  const { receiptsPerYear, economyPerYear, nhsPerYear } = computeRates(state);

  ui.receiptsMinReadout.textContent = "£65Bn";
  ui.receiptsMaxReadout.textContent = "£90Bn";
  ui.receiptsReadout.textContent = fmtBn1(state.receiptsBn) + " / year";

  ui.taxToGdpReadout.textContent = Math.round(state.taxToGdp * 100) + "%";
  ui.cycleReadout.textContent = state.cycleFactor.toFixed(2) + "×";
  ui.nhsShareReadout.textContent = Math.round(state.nhsShare * 100) + "%";
  ui.unitScaleReadout.textContent = Math.round(state.unitScale * 100) + "%";

  ui.weeklyGapReadout.textContent = fmtWeekFromPerYear(receiptsPerYear);

  ui.economyRateReadout.textContent = fmtWeekFromPerYear(economyPerYear);
  ui.treasuryRateReadout.textContent = fmtWeekFromPerYear(receiptsPerYear);
  ui.nhsRateReadout.textContent = fmtWeekFromPerYear(nhsPerYear);

  setVisible(ui.cardEconomy, state.show.economy);
  setVisible(ui.cardTreasury, state.show.treasury);
  setVisible(ui.cardNhs, state.show.nhs);

  renderComparisons(state);
  renderEffects(state, receiptsPerYear);
}

function renderComparisons(state) {
  const items = BASE_COMPARISONS.map((it) => {
    if (it.id === "brexit") return { ...it, valueBn: state.receiptsBn };
    return it;
  }).filter((it) => {
    if (it.id === "brexit") return state.comparisons.brexit;
    if (it.id === "debtInterest") return state.comparisons.debtInterest;
    if (it.id === "pensionRelief") return state.comparisons.pensionRelief;
    if (it.id === "taxGap") return state.comparisons.taxGap;
    if (it.id === "housingSupport") return state.comparisons.housingSupport;
    if (it.id === "immigration") return state.comparisons.immigration;
    return true;
  });

  const max = Math.max(10, ...items.map((it) => it.valueBn || 0));
  const axisMax = Math.ceil(max / 10) * 10;
  ui.compareAxisReadout.textContent = "Axis: 0 → £" + axisMax + "Bn";

  ui.comparePlot.innerHTML = "";
  for (const it of items) {
    const row = document.createElement("div");
    row.className = "cmpRow";

    const left = document.createElement("div");
    left.className = "cmpLabel";
    left.textContent = it.label;

    const barWrap = document.createElement("div");
    barWrap.className = "cmpBarWrap";

    const bar = document.createElement("div");
    bar.className = "cmpBar" + (it.tone === "brexit" ? " brexit" : it.tone === "contrast" ? " contrast" : "");
    const pct = clamp01((it.valueBn || 0) / axisMax);
    bar.style.width = (pct * 100).toFixed(2) + "%";

    const amt = document.createElement("div");
    amt.className = "cmpAmt";
    amt.textContent = fmtBn1(it.valueBn || 0);

    barWrap.appendChild(bar);
    row.appendChild(left);
    row.appendChild(barWrap);
    row.appendChild(amt);
    ui.comparePlot.appendChild(row);
  }
}

function renderEffects(state, receiptsPerYear) {
  const usablePerYear = receiptsPerYear * state.cycleFactor;
  const usablePerWeek = usablePerYear / 52;
  const perHouseholdPerWeek = usablePerWeek / UK_HOUSEHOLDS;

  ui.usableTaxReadout.textContent = fmtBn1(usablePerYear / 1e9);
  ui.usableTaxWeeklyReadout.textContent = fmtBn1((usablePerYear / 52) / 1e9);
  ui.householdWeeklyReadout.textContent = GBP0.format(perHouseholdPerWeek);

  const selected = EFFECTS.filter((fx) => state.effects[fx.id]);
  ui.effectsOutput.innerHTML = "";
  if (!selected.length) {
    const empty = document.createElement("div");
    empty.className = "effectsEmpty";
    empty.textContent = "Pick some effects above to see the estimates.";
    ui.effectsOutput.appendChild(empty);
    return;
  }

  for (const fx of selected) {
    const unitCost = fx.unitCost * state.unitScale;
    const count = unitCost > 0 ? usablePerYear / unitCost : 0;
    const card = document.createElement("div");
    card.className = "effectCard";

    const h = document.createElement("div");
    h.className = "effectTitle";
    h.textContent = fx.label;

    const v = document.createElement("div");
    v.className = "effectValue";
    v.textContent = Math.floor(count).toLocaleString("en-GB");

    const sub = document.createElement("div");
    sub.className = "effectSub";
    sub.textContent = `${fx.unitHint} × ${Math.round(state.unitScale * 100)}% realism`;

    card.appendChild(h);
    card.appendChild(v);
    card.appendChild(sub);
    ui.effectsOutput.appendChild(card);
  }
}

let lastMotionPref = null;
function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function renderCounters(nowMs) {
  const state = getState();
  const { receiptsPerYear, economyPerYear, nhsPerYear } = computeRates(state);
  const elapsedSeconds = Math.max(0, (nowMs - anchorMs) / 1000);

  if (state.show.economy) {
    const economy = ECONOMY_MILESTONE_GBP + fmtPerSecond(economyPerYear) * elapsedSeconds;
    ui.economyCounter.textContent = GBP.format(economy);
  }
  if (state.show.treasury) {
    const treasury = fmtPerSecond(receiptsPerYear) * elapsedSeconds;
    ui.treasuryCounter.textContent = GBP.format(treasury);
  }
  if (state.show.nhs) {
    const nhs = fmtPerSecond(nhsPerYear) * elapsedSeconds;
    ui.nhsCounter.textContent = GBP.format(nhs);
  }
}

function tick(now) {
  const reduce = prefersReducedMotion();
  if (lastMotionPref !== reduce) {
    lastMotionPref = reduce;
  }
  renderCounters(now);
  if (reduce) {
    // ~4Hz is still “live”, but less aggressive.
    setTimeout(() => requestAnimationFrame(tick), 250);
  } else {
    requestAnimationFrame(tick);
  }
}

function wire() {
  const inputs = [
    ui.showEconomy,
    ui.showTreasury,
    ui.showNhs,
    ui.receiptsBn,
    ui.taxToGdp,
    ui.cycleFactor,
    ui.nhsShare,
    ui.unitScale,
    ...Object.values(ui.cmp),
    ...Object.values(ui.fx),
  ];
  inputs.forEach((node) => node.addEventListener("input", renderStatic));

  const openBus = (e) => {
    e?.preventDefault?.();
    if (ui.busDialog && typeof ui.busDialog.showModal === "function") {
      ui.busDialog.showModal();
      return;
    }
    ui.busDialog?.setAttribute("open", "");
  };

  ui.busBtn?.addEventListener("click", openBus);
  ui.busEgg?.addEventListener("click", openBus);
  ui.busDialog?.addEventListener("click", (e) => {
    if (e.target === ui.busDialog) ui.busDialog.close?.();
  });
}

wire();
renderStatic();
requestAnimationFrame(tick);
