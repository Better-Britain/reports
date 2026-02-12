// Baseline values (£bn), derived from linked sources in the page copy.
const BASE = {
  immigration: {
    costs: {
      boatsSafetyRescue: 1.2,
      asylumAccommodationCasework: 2.8,
      regularMigrationServices: 3.1,
      widerServicePressure: 5.0,
    },
    benefits: {
      gdpLift: 43.4,
      feesAndCharges: 4.1,
    },
  },
  billionaire: {
    harms: {
      consumerCategories: {
        energyUtilities: 20.0,
        financeInsurance: 18.0,
        telecomsMedia: 12.0,
        retailPlatform: 21.2,
      },
      taxGapShare: 8.0,
    },
    gains: {
      // CAF figure is for the wealthiest 1%, not billionaires only.
      // Generous scenario assumption: 50% of £7.96bn attributed to billionaires.
      philanthropy: 4.0,
      // PwC 100 Group taxes borne (£31bn) with a conservative 5% attributable share.
      taxContributionScenario: 1.6,
      // ONS BERD 2024: £55.6bn. This model uses an optimistic 10.8% attribution share.
      innovationScenario: 6.0,
    },
  },
};

const CURRENT_NET_MIGRATION = 700000; // rough annual baseline for the slider narrative
const UK_BILLIONAIRES_COUNT = 55; // Forbes 2025 list count for UK

const el = (id) => document.getElementById(id);

const immScale = el("immScale");
const scaleReadout = el("scaleReadout");
const immPeopleReadout = el("immPeopleReadout");
const immBaselineReadout = el("immBaselineReadout");
const axisMaxReadout = el("axisMaxReadout");
const innovationNote = el("innovationNote");
const bRowTitle = el("bRowTitle");
const iRowTitle = el("iRowTitle");

const billionaireToggles = {
  harmConsumerEnergy: el("b_harm_consumer_energy"),
  harmConsumerFinance: el("b_harm_consumer_finance"),
  harmConsumerTelecoms: el("b_harm_consumer_telecoms"),
  harmConsumerRetail: el("b_harm_consumer_retail"),
  harmTax: el("b_harm_tax"),
  gainPhilanthropy: el("b_gain_philanthropy"),
  gainTaxContribution: el("b_gain_tax_contribution"),
  gainInnovation: el("b_gain_innovation"),
};

const immigrationToggles = {
  costBoatsRescue: el("i_cost_boats_rescue"),
  costAsylumHousing: el("i_cost_asylum_housing"),
  costRegularServices: el("i_cost_regular_services"),
  costPopulationPressure: el("i_cost_population_pressure"),
};

const bars = {
  bCost: el("b_cost_bar"),
  bBen: el("b_ben_bar"),
  iCost: el("i_cost_bar"),
  iBen: el("i_ben_bar"),
};

const halves = {
  bCost: el("b_cost_half"),
  bBen: el("b_ben_half"),
  iCost: el("i_cost_half"),
  iBen: el("i_ben_half"),
};

const labels = {
  bCost: el("b_cost_label"),
  bBen: el("b_ben_label"),
  iCost: el("i_cost_label"),
  iBen: el("i_ben_label"),
};

const descs = {
  bCost: el("b_cost_desc"),
  bBen: el("b_ben_desc"),
  iCost: el("i_cost_desc"),
  iBen: el("i_ben_desc"),
};

const amts = {
  bCost: el("b_cost_amt"),
  bBen: el("b_ben_amt"),
  iCost: el("i_cost_amt"),
  iBen: el("i_ben_amt"),
};

const kpis = {
  immNet: el("immNetKpi"),
  bilNet: el("bilNetKpi"),
};

const grid = el("grid");

function fmtBnWholeApprox(v) {
  return "~£" + Math.round(v) + "Bn";
}

function fmtBn1(v) {
  return "£" + (Math.round(v * 10) / 10).toFixed(1) + "Bn";
}

function fmtNet(v) {
  const sign = v < 0 ? "−" : "";
  const abs = Math.abs(v);
  if (abs >= 50) {
    return sign + "£" + Math.round(abs) + "Bn";
  }
  return sign + "£" + (Math.round(abs * 10) / 10).toFixed(1) + "Bn";
}

function fmtPeople(v) {
  return "~" + Math.round(v).toLocaleString("en-GB");
}

function setBarWidthPct(barEl, axisMax, value) {
  const pct = Math.max(0, Math.min(1, value / axisMax));
  barEl.style.width = pct * 100 + "%";
  return pct;
}

function updateRangeFill() {
  const min = parseFloat(immScale.min);
  const max = parseFloat(immScale.max);
  const val = parseFloat(immScale.value);
  const pct = ((val - min) / (max - min)) * 100;
  immScale.style.setProperty("--range-pct", pct.toFixed(2) + "%");
}

function selectedBillionaireValues() {
  const harms = [];
  const gains = [];
  let cost = 0;
  let benefit = 0;

  if (billionaireToggles.harmConsumerEnergy.checked) {
    cost += BASE.billionaire.harms.consumerCategories.energyUtilities;
    harms.push("energy/utilities");
  }
  if (billionaireToggles.harmConsumerFinance.checked) {
    cost += BASE.billionaire.harms.consumerCategories.financeInsurance;
    harms.push("finance/insurance");
  }
  if (billionaireToggles.harmConsumerTelecoms.checked) {
    cost += BASE.billionaire.harms.consumerCategories.telecomsMedia;
    harms.push("telecoms/media");
  }
  if (billionaireToggles.harmConsumerRetail.checked) {
    cost += BASE.billionaire.harms.consumerCategories.retailPlatform;
    harms.push("retail/platform");
  }
  if (billionaireToggles.harmTax.checked) {
    cost += BASE.billionaire.harms.taxGapShare;
    harms.push("tax gap share");
  }
  if (billionaireToggles.gainPhilanthropy.checked) {
    benefit += BASE.billionaire.gains.philanthropy;
    gains.push("philanthropy (billionaire-attributed)");
  }
  if (billionaireToggles.gainTaxContribution.checked) {
    benefit += BASE.billionaire.gains.taxContributionScenario;
    gains.push("tax contribution scenario");
  }
  if (billionaireToggles.gainInnovation.checked) {
    benefit += BASE.billionaire.gains.innovationScenario;
    gains.push("innovation scenario");
  }

  return { cost, benefit, harms, gains };
}

function summarizeParts(parts) {
  if (!parts.length) {
    return "none";
  }
  if (parts.length <= 2) {
    return parts.join(", ");
  }
  return parts.slice(0, 2).join(", ") + " +" + (parts.length - 2) + " more";
}

function selectedImmigrationValues() {
  const costs = [];
  let cost = 0;

  if (immigrationToggles.costBoatsRescue.checked) {
    cost += BASE.immigration.costs.boatsSafetyRescue;
    costs.push("small-boats safety/rescue");
  }
  if (immigrationToggles.costAsylumHousing.checked) {
    cost += BASE.immigration.costs.asylumAccommodationCasework;
    costs.push("asylum accommodation/casework");
  }
  if (immigrationToggles.costRegularServices.checked) {
    cost += BASE.immigration.costs.regularMigrationServices;
    costs.push("regular migration services");
  }
  if (immigrationToggles.costPopulationPressure.checked) {
    cost += BASE.immigration.costs.widerServicePressure;
    costs.push("public service pressure");
  }

  return { cost, costs };
}

function placeLabel({ halfEl, barEl, labelEl, side, isInside }) {
  const halfRect = halfEl.getBoundingClientRect();
  const barRect = barEl.getBoundingClientRect();
  const y = (barRect.top + barRect.bottom) / 2 - halfRect.top;

  labelEl.classList.remove("inside", "outside", "cost", "benefit");
  labelEl.classList.add(isInside ? "inside" : "outside");
  labelEl.classList.add(side === "cost" ? "cost" : "benefit");

  labelEl.style.transform = "translateY(-50%)";
  labelEl.style.left = "0px";
  labelEl.style.right = "auto";
  labelEl.style.maxWidth = "";
  labelEl.style.textAlign = "";

  const pad = 14;

  if (isInside) {
    const barWidth = Math.max(0, barRect.width);
    const insidePad = 16;
    const maxLabelWidth = Math.max(96, barWidth - insidePad * 2);
    const cx = (barRect.left + barRect.right) / 2 - halfRect.left;
    labelEl.style.left = Math.max(8, Math.min(halfRect.width - 8, cx)) + "px";
    labelEl.style.transform = "translate(-50%,-50%)";
    labelEl.style.maxWidth = maxLabelWidth + "px";
    labelEl.style.textAlign = "center";
  } else if (side === "cost") {
    const x = barRect.left - halfRect.left - pad;
    labelEl.style.left = Math.max(6, x) + "px";
    labelEl.style.transform = "translate(-100%,-50%)";
  } else {
    const x = barRect.right - halfRect.left + pad;
    labelEl.style.left = Math.min(halfRect.width - 6, x) + "px";
    labelEl.style.transform = "translate(0,-50%)";
  }

  labelEl.style.top = y + "px";
}

function buildGrid(axisMax) {
  grid.innerHTML = "";
  const steps = 8;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const xPct = t * 100;
    const v = document.createElement("div");
    v.className = "v" + (i === steps / 2 ? " strong" : "");
    v.style.left = xPct + "%";
    grid.appendChild(v);

    const tickPositions = new Set([0, steps / 4, steps / 2, (3 * steps) / 4, steps]);
    if (tickPositions.has(i)) {
      const lbl = document.createElement("div");
      lbl.className = "tickLabel";
      lbl.style.left = xPct + "%";
      const val = (t - 0.5) * 2 * axisMax;
      const s = val === 0 ? "0" : val < 0 ? "−" + Math.abs(val) : String(val);
      lbl.textContent = "£" + s + "Bn";
      grid.appendChild(lbl);
    }
  }
}

function render() {
  const scenarioPct = parseFloat(immScale.value);
  const factor = scenarioPct / 100;
  const scenarioPeople = CURRENT_NET_MIGRATION * factor;
  const billionaire = selectedBillionaireValues();
  const immigration = selectedImmigrationValues();

  scaleReadout.textContent = Math.round(scenarioPct) + "%";
  immPeopleReadout.textContent = fmtPeople(scenarioPeople) + " people / year";
  immBaselineReadout.textContent = "Current ~" + CURRENT_NET_MIGRATION.toLocaleString("en-GB");
  bRowTitle.textContent = "Billionaires (~" + UK_BILLIONAIRES_COUNT + " People)";
  iRowTitle.textContent = "Immigrant People (" + fmtPeople(scenarioPeople) + "/yr)";
  updateRangeFill();

  innovationNote.hidden = !billionaireToggles.gainInnovation.checked;

  descs.bCost.textContent = "Billionaires (" + summarizeParts(billionaire.harms) + ")";
  descs.bBen.textContent = "Billionaires (" + summarizeParts(billionaire.gains) + ")";

  const IMMIGRATION_COST_BASE_TOTAL =
    Object.values(BASE.immigration.costs).reduce((sum, part) => sum + part, 0);
  const IMMIGRATION_BENEFIT_BASE_TOTAL =
    BASE.immigration.benefits.gdpLift + BASE.immigration.benefits.feesAndCharges;
  const immigrationCostScaled = immigration.cost * factor;
  const immigrationBenefitRawScaled = IMMIGRATION_BENEFIT_BASE_TOTAL * factor;
  const costSelectionShare = IMMIGRATION_COST_BASE_TOTAL > 0
    ? immigration.cost / IMMIGRATION_COST_BASE_TOTAL
    : 0;
  const immigrationBenefitScaled = immigrationBenefitRawScaled * costSelectionShare;
  descs.iCost.textContent = "Immigration (" + summarizeParts(immigration.costs) + ")";
  descs.iBen.textContent = "+GDP, fees, real economy";

  const values = {
    billionaire: {
      cost: billionaire.cost,
      benefit: billionaire.benefit,
    },
    immigration: {
      cost: immigrationCostScaled,
      benefit: immigrationBenefitScaled,
    },
  };

  const maxVal = Math.max(
    values.billionaire.cost,
    values.billionaire.benefit,
    values.immigration.cost,
    values.immigration.benefit,
  );
  const axisMax = Math.max(40, Math.ceil(maxVal / 10) * 10);
  axisMaxReadout.textContent = "Axis: ±£" + axisMax + "Bn";
  buildGrid(axisMax);

  amts.bCost.textContent = fmtBnWholeApprox(values.billionaire.cost);
  amts.bBen.textContent = fmtBnWholeApprox(values.billionaire.benefit);
  amts.iCost.textContent = fmtBnWholeApprox(values.immigration.cost);
  amts.iBen.textContent = fmtBn1(values.immigration.benefit);

  kpis.immNet.textContent = fmtNet(values.immigration.benefit - values.immigration.cost);
  kpis.bilNet.textContent = fmtNet(values.billionaire.benefit - values.billionaire.cost);

  const pct = {
    bCost: setBarWidthPct(bars.bCost, axisMax, values.billionaire.cost),
    bBen: setBarWidthPct(bars.bBen, axisMax, values.billionaire.benefit),
    iCost: setBarWidthPct(bars.iCost, axisMax, values.immigration.cost),
    iBen: setBarWidthPct(bars.iBen, axisMax, values.immigration.benefit),
  };

  requestAnimationFrame(() => {
    const insideThresh = 0.24;
    placeLabel({ halfEl: halves.bCost, barEl: bars.bCost, labelEl: labels.bCost, side: "cost", isInside: pct.bCost >= insideThresh });
    placeLabel({ halfEl: halves.bBen, barEl: bars.bBen, labelEl: labels.bBen, side: "benefit", isInside: pct.bBen >= insideThresh });
    placeLabel({ halfEl: halves.iCost, barEl: bars.iCost, labelEl: labels.iCost, side: "cost", isInside: pct.iCost >= insideThresh });
    placeLabel({ halfEl: halves.iBen, barEl: bars.iBen, labelEl: labels.iBen, side: "benefit", isInside: pct.iBen >= insideThresh });
  });
}

immScale.addEventListener("input", render);
Object.values(billionaireToggles).forEach((toggle) => {
  toggle.addEventListener("input", render);
});
Object.values(immigrationToggles).forEach((toggle) => {
  toggle.addEventListener("input", render);
});

window.addEventListener("resize", render);
render();
