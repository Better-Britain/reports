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
const setText = (node, text) => {
  if (!node) return;
  node.textContent = String(text);
};

const TRILLION_BN = 1000;
const YEAR_MS = 365.25 * 24 * 3600 * 1000;

// Fireworks: set this to false to only fire when the counter crosses £1tn.
const FIREWORKS_ALWAYS_ON = true;
const FIREWORKS_INTERVAL_MS = 3800;

// --- Chart data (from the "illustrative ramp" described in chats + the original PNG)
const YEARS = Array.from({ length: 15 }, (_, i) => 2016 + i); // 2016..2030

// £bn/year
const BASE_SERIES = {
  gdpShortfall: [0, 10.5, 21.7, 45.1, 74.4, 116.1, 142.0, 165.1, 187.5, 210.0, 217.0, 225.0, 232.0, 240.0, 248.0],
  investmentShortfall: [50.0, 53.0, 55.0, 57.0, 54.0, 59.0, 66.0, 71.0, 74.0, 76.0, 79.0, 81.0, 84.0, 87.0, 90.0],
  sterlingImportHit: [0.0, 12.0, 25.0, 15.0, 5.0, 2.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  borderAdmin: [0.0, 0.0, 0.0, 0.0, 3.0, 5.0, 8.0, 8.0, 7.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0],
  exceptionProcurementLeakage: [0.0, 0.0, 0.0, 1.0, 5.0, 10.0, 8.0, 3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
};

const SERIES_META = [
  { key: "gdpShortfall", label: "GDP shortfall", tone: "gdp", color: "#3aa1ff", axis: "left", dashed: false, defaultOn: true },
  { key: "investmentShortfall", label: "Investment shortfall", tone: "investment", color: "#ffb24a", axis: "left", dashed: false, defaultOn: true },
  { key: "sterlingImportHit", label: "Sterling/import-price hit", tone: "sterling", color: "#67bf8d", axis: "left", dashed: false, defaultOn: true },
  { key: "borderAdmin", label: "Border + customs admin", tone: "border", color: "#ff6b6b", axis: "left", dashed: false, defaultOn: true },
  { key: "exceptionProcurementLeakage", label: "Exception-politics procurement leakage", tone: "leakage", color: "#b08cff", axis: "left", dashed: false, defaultOn: true },
  { key: "cumulativeGdpShortfall", label: "Cumulative GDP shortfall (right axis)", tone: "cumulative", color: "#3aa1ff", axis: "right", dashed: true, defaultOn: true },
];

// --- “Here’s what you could have won” prize board
const UK_HOUSEHOLDS = 28_500_000;
const BUS_WEEK_GBP = 350_000_000;
const RECEIPTS_BN_DEFAULT = 75; // midpoint of the “£65–£90bn/year” range in the notes
const TAX_TO_GDP_DEFAULT = 0.35;
const NHS_SHARE_DEFAULT = 0.19;
const CYCLE_FACTOR_DEFAULT = 1.4;

const PRIZES = [
  {
    id: "hospitals",
    emoji: "🏥",
    label: "Major hospital projects (per year)",
    bucket: 1,
    unitCost: 1_500_000_000,
    baseline: 2,
    baselineLabel: "~2 major projects/year",
  },
  {
    id: "police",
    emoji: "👮",
    label: "Police officers (extra funded posts, per year)",
    bucket: 1_000,
    unitCost: 500_000,
    baseline: 140_000,
    baselineLabel: "~140k officers",
  },
  {
    id: "nurses",
    emoji: "🧑‍⚕️",
    label: "Nurses (extra funded posts, per year)",
    bucket: 1_000,
    unitCost: 375_000,
    baseline: 350_000,
    baselineLabel: "~350k nurses",
  },
  {
    id: "cancerStaff",
    emoji: "🎗️",
    label: "Cancer care staff (extra funded posts, per year)",
    bucket: 500,
    unitCost: 1_250_000,
    baseline: 60_000,
    baselineLabel: "~60k staff",
  },
  {
    id: "socialHomes",
    emoji: "🏠",
    label: "Social/affordable homes supported (per year)",
    bucket: 10_000,
    unitCost: 150_000,
    baseline: 60_000,
    baselineLabel: "~60k homes/year",
  },
  {
    id: "insulation",
    emoji: "🧱",
    label: "Homes insulated/retrofitted (per year)",
    bucket: 100_000,
    unitCost: 15_000,
    baseline: 500_000,
    baselineLabel: "~500k/year",
  },
  {
    id: "teachers",
    emoji: "🧑‍🏫",
    label: "Teachers (extra funded posts, per year)",
    bucket: 1_000,
    unitCost: 750_000,
    baseline: 470_000,
    baselineLabel: "~470k teachers",
  },
];

const ui = {
  // Header counter
  totalCounter: el("totalCounter"),
  totalRateReadout: el("totalRateReadout"),
  trillionCountdown: el("trillionCountdown"),
  fireworksCanvas: el("fireworksCanvas"),

  // Chart
  compareAxisReadout: el("compareAxisReadout"),
  lineChart: el("lineChart"),
  chartLegend: el("chartLegend"),

  // Controls
  receiptsReadout: el("receiptsReadout"),

  treasuryWeeklyReadout: el("treasuryWeeklyReadout"),
  busWeeksReadout: el("busWeeksReadout"),
  nhsWeeklyReadout: el("nhsWeeklyReadout"),

  taxToGdpReadout: el("taxToGdpReadout"),
  nhsShareReadout: el("nhsShareReadout"),
  cycleReadout: el("cycleReadout"),

  // Effects
  usableTaxReadout: el("usableTaxReadout"),
  usableTaxWeeklyReadout: el("usableTaxWeeklyReadout"),
  householdWeeklyReadout: el("householdWeeklyReadout"),

  // Prize board elements are optional and may be renamed/removed in HTML edits.
  // We resolve them dynamically in `ensurePrizeDom()` to play nicely with changes.

  // Bus easter egg
  busBtn: el("busBtn"),
  busEgg: el("busEgg"),
  busDialog: el("busDialog"),
};

function ensurePrizeDom() {
  const board =
    document.getElementById("prizeBoard") ||
    document.querySelector('[data-role="prizeBoard"]') ||
    document.querySelector(".prizeBoard");

  const count = document.getElementById("prizeCountReadout") || document.querySelector('[data-role="prizeCount"]');
  const share = document.getElementById("prizeShareReadout") || document.querySelector('[data-role="prizeShare"]');

  if (board) return { board, count, share };

  // If the author removed the container during copy tweaks, recreate the minimal mount point
  // inside the “Real-world effects” section so the panel still appears.
  const section = document.querySelector('section[aria-label="Real-world effects"]');
  const hostPanel = section?.querySelector(".panel.panelWide");
  if (!hostPanel) return { board: null, count, share };

  const kpiRow = hostPanel.querySelector(".kpiRow");
  const mount = document.createElement("div");
  mount.className = "prizeBoard";
  mount.id = "prizeBoard";
  mount.setAttribute("aria-label", "Prize board");

  if (kpiRow) {
    kpiRow.insertAdjacentElement("afterend", mount);
  } else {
    hostPanel.appendChild(mount);
  }

  return { board: mount, count, share };
}

function fmtBn1(vBn) {
  return "£" + (Math.round(vBn * 10) / 10).toFixed(1) + "Bn";
}

function fmtWeekFromPerYear(perYearGbp) {
  const perWeek = perYearGbp / 52;
  if (perWeek >= 1e9) return "~" + fmtBn1(perWeek / 1e9) + "/week";
  if (perWeek >= 1e6) return "~£" + Math.round(perWeek / 1e6) + "m/week";
  return "~" + GBP0.format(perWeek) + "/week";
}

function fmtWeekSignedFromPerYear(perYearGbp) {
  const sign = perYearGbp < 0 ? "−" : "";
  const perWeekAbs = Math.abs(perYearGbp) / 52;
  if (perWeekAbs >= 1e9) return "~" + sign + fmtBn1(perWeekAbs / 1e9) + "/week";
  if (perWeekAbs >= 1e6) return "~" + sign + "£" + Math.round(perWeekAbs / 1e6) + "m/week";
  return "~" + sign + GBP0.format(perWeekAbs) + "/week";
}

function getState() {
  return {
    receiptsBn: RECEIPTS_BN_DEFAULT,
    taxToGdp: TAX_TO_GDP_DEFAULT,
    nhsShare: NHS_SHARE_DEFAULT,
    cycleFactor: CYCLE_FACTOR_DEFAULT,
  };
}

function computeScaleFactor(state) {
  const base2026 = BASE_SERIES.gdpShortfall[YEARS.indexOf(2026)];
  const impliedGdpGap2026 = state.taxToGdp > 0 ? state.receiptsBn / state.taxToGdp : base2026;
  return base2026 > 0 ? impliedGdpGap2026 / base2026 : 1;
}

function scaledSeries(state) {
  const scale = computeScaleFactor(state);
  const out = {};
  for (const meta of SERIES_META) {
    if (meta.key === "cumulativeGdpShortfall") continue;
    out[meta.key] = BASE_SERIES[meta.key].map((v) => v * scale);
  }
  out.cumulativeGdpShortfall = out.gdpShortfall.reduce((acc, v) => {
    const prev = acc.length ? acc[acc.length - 1] : 0;
    acc.push(prev + v);
    return acc;
  }, []);
  return { scale, series: out };
}

function niceCeil(value, step) {
  if (value <= 0) return step;
  return Math.ceil(value / step) * step;
}

function svgEl(tag, attrs = {}) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
  return n;
}

function clearSvg(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function buildLegend(visible, onToggle) {
  ui.chartLegend.innerHTML = "";
  const hdr = document.createElement("div");
  hdr.className = "legendHdr";
  hdr.textContent = "Units";
  ui.chartLegend.appendChild(hdr);

  const sub = document.createElement("div");
  sub.className = "legendSub";
  sub.textContent = "Annual: £bn/yr · Cumulative: £bn (right axis)";
  ui.chartLegend.appendChild(sub);

  for (const meta of SERIES_META) {
    const row = document.createElement("label");
    row.className = "legendRow";
    row.htmlFor = `lg_${meta.key}`;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = `lg_${meta.key}`;
    cb.checked = Boolean(visible[meta.key]);
    cb.addEventListener("input", () => onToggle(meta.key, cb.checked));

    const swatch = document.createElement("span");
    swatch.className = "legendSwatch" + (meta.dashed ? " dashed" : "");
    swatch.style.setProperty("--swatch", meta.color);

    const text = document.createElement("span");
    text.className = "legendText";
    text.textContent = meta.label;

    row.appendChild(cb);
    row.appendChild(swatch);
    row.appendChild(text);
    ui.chartLegend.appendChild(row);
  }
}

function renderChart(state, scaled, visible) {
  const { series } = scaled;

  const leftSeriesKeys = SERIES_META.filter((m) => m.axis === "left" && m.key !== "cumulativeGdpShortfall")
    .map((m) => m.key)
    .filter((k) => visible[k]);

  const annualMax = Math.max(
    50,
    ...leftSeriesKeys.flatMap((k) => series[k] || []).map((v) => v || 0),
  );
  const leftAxisMax = niceCeil(annualMax, 25);

  const cumMax = visible.cumulativeGdpShortfall ? Math.max(...series.cumulativeGdpShortfall) : Math.max(...series.cumulativeGdpShortfall);
  const rightAxisMax = niceCeil(cumMax, 250);

  setText(ui.compareAxisReadout, `Left axis: 0 → £${leftAxisMax}Bn/yr · Right axis: 0 → £${rightAxisMax}Bn`);

  const svg = ui.lineChart;
  clearSvg(svg);

  const W = 960;
  const H = 520;
  const margin = { l: 72, r: 76, t: 20, b: 70 };
  const pw = W - margin.l - margin.r;
  const ph = H - margin.t - margin.b;

  const xForIndex = (i) => margin.l + (i / (YEARS.length - 1)) * pw;
  const yLeft = (v) => margin.t + (1 - clamp01(v / leftAxisMax)) * ph;
  const yRight = (v) => margin.t + (1 - clamp01(v / rightAxisMax)) * ph;

  // Background
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width: W, height: H, rx: 16, fill: "rgba(0,0,0,.0)" }));

  // Grid + axes
  const grid = svgEl("g", { class: "chartGrid" });
  svg.appendChild(grid);

  const yTicks = 5;
  for (let i = 0; i <= yTicks; i += 1) {
    const t = i / yTicks;
    const y = margin.t + t * ph;
    grid.appendChild(svgEl("line", { x1: margin.l, y1: y, x2: margin.l + pw, y2: y, class: i === yTicks ? "axisLine" : "gridLine" }));

    const v = leftAxisMax * (1 - t);
    const lbl = svgEl("text", { x: margin.l - 10, y: y + 4, class: "axisLbl", "text-anchor": "end" });
    lbl.textContent = "£" + Math.round(v) + "Bn";
    grid.appendChild(lbl);

    const vR = rightAxisMax * (1 - t);
    const lblR = svgEl("text", { x: margin.l + pw + 10, y: y + 4, class: "axisLbl", "text-anchor": "start" });
    lblR.textContent = "£" + Math.round(vR) + "Bn";
    grid.appendChild(lblR);
  }

  for (let i = 0; i < YEARS.length; i += 1) {
    const x = xForIndex(i);
    const isMajor = YEARS[i] % 2 === 0;
    grid.appendChild(svgEl("line", { x1: x, y1: margin.t, x2: x, y2: margin.t + ph, class: isMajor ? "gridVMajor" : "gridV" }));
    if (isMajor) {
      const tx = svgEl("text", { x, y: margin.t + ph + 32, class: "xLbl", "text-anchor": "middle" });
      tx.textContent = String(YEARS[i]);
      grid.appendChild(tx);
    }
  }

  // Series paths
  const paths = svgEl("g", { class: "chartPaths" });
  svg.appendChild(paths);

  const drawPath = ({ values, axis, color, dashed }) => {
    let d = "";
    values.forEach((v, i) => {
      const x = xForIndex(i);
      const y = axis === "right" ? yRight(v) : yLeft(v);
      d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
    });
    const p = svgEl("path", {
      d,
      fill: "none",
      stroke: color,
      "stroke-width": dashed ? "3.2" : "3.4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-dasharray": dashed ? "10 8" : "none",
      opacity: "0.95",
    });
    paths.appendChild(p);

    // markers
    values.forEach((v, i) => {
      if (i % 2 !== 0) return;
      const x = xForIndex(i);
      const y = axis === "right" ? yRight(v) : yLeft(v);
      paths.appendChild(svgEl("circle", { cx: x, cy: y, r: dashed ? 3.2 : 3.6, fill: color, opacity: "0.95" }));
    });
  };

  for (const meta of SERIES_META) {
    if (!visible[meta.key]) continue;
    const vals = meta.key === "cumulativeGdpShortfall" ? series.cumulativeGdpShortfall : series[meta.key];
    drawPath({ values: vals, axis: meta.axis, color: meta.color, dashed: meta.dashed });
  }

  // "£1tn crossed" marker (on right axis)
  const THRESH = 1000;
  if (visible.cumulativeGdpShortfall && rightAxisMax >= THRESH) {
    const y = yRight(THRESH);
    svg.appendChild(svgEl("line", { x1: margin.l, y1: y, x2: margin.l + pw, y2: y, class: "thresholdLine" }));

    // crossing year fraction
    const cum = series.cumulativeGdpShortfall;
    let crossIndex = -1;
    for (let i = 1; i < cum.length; i += 1) {
      if (cum[i - 1] < THRESH && cum[i] >= THRESH) {
        crossIndex = i;
        break;
      }
    }
    if (crossIndex !== -1) {
      const prev = cum[crossIndex - 1];
      const next = cum[crossIndex];
      const frac = next > prev ? (THRESH - prev) / (next - prev) : 0;
      const x = xForIndex(crossIndex - 1) + frac * (xForIndex(crossIndex) - xForIndex(crossIndex - 1));
      svg.appendChild(svgEl("line", { x1: x, y1: margin.t, x2: x, y2: margin.t + ph, class: "thresholdV" }));

      const label = svgEl("text", { x: x + 10, y: y - 10, class: "anno", "text-anchor": "start" });
      const approxYear = YEARS[crossIndex - 1] + frac;
      label.textContent = `£1tn crossed ~${approxYear.toFixed(1)}`;
      svg.appendChild(label);
    }
  }

  // Axis titles
  const leftTitle = svgEl("text", { x: margin.l - 56, y: margin.t + ph / 2, class: "axisTitle", transform: `rotate(-90 ${margin.l - 56} ${margin.t + ph / 2})` });
  leftTitle.textContent = "Annual impact";
  svg.appendChild(leftTitle);

  const rightTitle = svgEl("text", { x: margin.l + pw + 58, y: margin.t + ph / 2, class: "axisTitle", transform: `rotate(-90 ${margin.l + pw + 58} ${margin.t + ph / 2})` });
  rightTitle.textContent = "Cumulative GDP";
  svg.appendChild(rightTitle);

  const xTitle = svgEl("text", { x: margin.l + pw / 2, y: margin.t + ph + 58, class: "axisTitle", "text-anchor": "middle" });
  xTitle.textContent = "Year";
  svg.appendChild(xTitle);
}

function annualGdpShortfallForYear(year, scaledGdpSeries) {
  if (year < YEARS[0]) return 0;
  if (year > YEARS[YEARS.length - 1]) return scaledGdpSeries[scaledGdpSeries.length - 1];
  const idx = YEARS.indexOf(year);
  return idx === -1 ? 0 : scaledGdpSeries[idx];
}

function cumulativeToStartOfYear(year, scaledGdpSeries) {
  const first = YEARS[0];
  const last = YEARS[YEARS.length - 1];
  if (year <= first) return 0;
  const end = Math.min(year, last + 1);
  let sum = 0;
  for (let y = first; y < end; y += 1) {
    sum += annualGdpShortfallForYear(y, scaledGdpSeries);
  }
  if (year > last + 1) {
    const extraYears = year - (last + 1);
    sum += extraYears * annualGdpShortfallForYear(last, scaledGdpSeries);
  }
  return sum;
}

const fireworks = {
  ctx: null,
  w: 0,
  h: 0,
  particles: [],
  running: false,
  lastFrameMs: 0,
  lastAutoFireMs: 0,
  lastCumBn: null,
  crossedTrillion: false,
};

function resizeFireworksCanvas() {
  const canvas = ui.fireworksCanvas;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  canvas.width = Math.max(1, Math.floor(w * dpr));
  canvas.height = Math.max(1, Math.floor(h * dpr));
  fireworks.w = w;
  fireworks.h = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  fireworks.ctx = ctx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function formatDurationShort(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "0s";
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  if (days > 0) return `${days}d ${String(hours).padStart(2, "0")}h`;
  if (hours > 0) return `${hours}h ${String(mins).padStart(2, "0")}m`;
  return `${Math.max(1, mins)}m`;
}

function renderTrillionCountdown(nowMs, cumBn, annualBn) {
  if (!ui.trillionCountdown) return;
  if (!Number.isFinite(cumBn) || !Number.isFinite(annualBn) || annualBn <= 0) {
    setText(ui.trillionCountdown, "To £1tn: —");
    return;
  }
  if (cumBn >= TRILLION_BN) {
    setText(ui.trillionCountdown, "£1tn: reached");
    ui.trillionCountdown.title = "Estimated: already past £1tn of cumulative missing output since 2016.";
    return;
  }
  const remainingBn = TRILLION_BN - cumBn;
  const remainingMs = (remainingBn / annualBn) * YEAR_MS;
  const eta = new Date(nowMs + remainingMs);
  setText(ui.trillionCountdown, `To £1tn: ~${formatDurationShort(remainingMs)}`);
  ui.trillionCountdown.title = `Estimated crossing time: ${eta.toUTCString()}`;
}

function fireworksBurst() {
  if (prefersReducedMotion()) return;
  if (!ui.fireworksCanvas) return;
  if (!fireworks.ctx) resizeFireworksCanvas();
  if (!fireworks.ctx || fireworks.w <= 0 || fireworks.h <= 0) return;

  const palette = ["#ffcc66", "#3aa1ff", "#67bf8d", "#ff6b6b", "#b08cff", "#ffffff"];
  const bursts = 2;
  for (let b = 0; b < bursts; b += 1) {
    const cx = fireworks.w * (0.35 + Math.random() * 0.55);
    const cy = fireworks.h * (0.18 + Math.random() * 0.35);
    const count = 42 + Math.floor(Math.random() * 26);
    for (let i = 0; i < count; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const sp = 90 + Math.random() * 260;
      fireworks.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 1.4 + Math.random() * 1.8,
        life: 900 + Math.random() * 700,
        age: 0,
        color: palette[(Math.random() * palette.length) | 0],
      });
    }
  }

  if (!fireworks.running) {
    fireworks.running = true;
    fireworks.lastFrameMs = 0;
    requestAnimationFrame(fireworksLoop);
  }
}

function fireworksLoop(nowMs) {
  if (!fireworks.running) return;
  const ctx = fireworks.ctx;
  if (!ctx) {
    fireworks.running = false;
    return;
  }
  const t = typeof performance !== "undefined" && Number.isFinite(performance.timeOrigin)
    ? performance.timeOrigin + nowMs
    : Date.now();
  const dt = fireworks.lastFrameMs ? Math.min(0.05, (t - fireworks.lastFrameMs) / 1000) : 0.016;
  fireworks.lastFrameMs = t;

  ctx.clearRect(0, 0, fireworks.w, fireworks.h);

  const g = 240; // px/s^2
  const drag = 0.985;

  const next = [];
  for (const p of fireworks.particles) {
    const age = p.age + dt * 1000;
    if (age >= p.life) continue;
    const k = 1 - age / p.life;
    const alpha = Math.max(0, Math.min(1, k));

    const vx = p.vx * drag;
    const vy = (p.vy + g * dt) * drag;
    const x = p.x + vx * dt;
    const y = p.y + vy * dt;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(x, y, p.r, 0, Math.PI * 2);
    ctx.fill();

    next.push({ ...p, x, y, vx, vy, age });
  }
  ctx.globalAlpha = 1;

  fireworks.particles = next;
  if (fireworks.particles.length > 0) {
    requestAnimationFrame(fireworksLoop);
    return;
  }
  fireworks.running = false;
}

function maybeFireFireworks(nowMs, cumBn) {
  if (!Number.isFinite(cumBn)) return;
  if (prefersReducedMotion()) return;

  if (FIREWORKS_ALWAYS_ON) {
    if (!fireworks.lastAutoFireMs) {
      fireworks.lastAutoFireMs = nowMs;
      fireworksBurst();
      fireworks.lastCumBn = cumBn;
      return;
    }
    if (nowMs - fireworks.lastAutoFireMs >= FIREWORKS_INTERVAL_MS) {
      fireworks.lastAutoFireMs = nowMs;
      fireworksBurst();
    }
    fireworks.lastCumBn = cumBn;
    return;
  }

  if (fireworks.crossedTrillion) return;
  if (fireworks.lastCumBn != null && fireworks.lastCumBn < TRILLION_BN && cumBn >= TRILLION_BN) {
    fireworks.crossedTrillion = true;
    fireworksBurst();
  }
  fireworks.lastCumBn = cumBn;
}

function renderCounter(nowMs, state, scaled) {
  const now = new Date(nowMs);
  const year = now.getUTCFullYear();
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  const frac = clamp01((nowMs - start) / (end - start));

  const gdpSeries = scaled.series.gdpShortfall;
  const annualBn = annualGdpShortfallForYear(year, gdpSeries);
  const cumBn = cumulativeToStartOfYear(year, gdpSeries) + annualBn * frac;

  const totalGbp = cumBn * 1e9;
  // Satirical framing: “benefits” shown below zero.
  setText(ui.totalCounter, GBP.format(-totalGbp));
  setText(ui.totalRateReadout, fmtWeekSignedFromPerYear(-annualBn * 1e9));
  renderTrillionCountdown(nowMs, cumBn, annualBn);
  maybeFireFireworks(nowMs, cumBn);
}

function renderControls(state) {
  ui.receiptsReadout.textContent = "~" + fmtBn1(state.receiptsBn) + "/yr";

  ui.taxToGdpReadout.textContent = Math.round(state.taxToGdp * 100) + "%";
  ui.nhsShareReadout.textContent = Math.round(state.nhsShare * 100) + "%";
  ui.cycleReadout.textContent = state.cycleFactor.toFixed(2) + "×";

  const receiptsPerYear = state.receiptsBn * 1e9;
  const receiptsPerWeek = receiptsPerYear / 52;
  ui.treasuryWeeklyReadout.textContent = "−" + GBP0.format(receiptsPerWeek);
  ui.busWeeksReadout.textContent = (receiptsPerWeek / BUS_WEEK_GBP).toFixed(1) + "×";
  ui.nhsWeeklyReadout.textContent = "−" + GBP0.format(receiptsPerWeek * state.nhsShare);
}

function fmtGbpCompact(v) {
  const abs = Math.abs(v);
  if (abs >= 1e9) return fmtBn1(abs / 1e9);
  if (abs >= 1e6) return "£" + Math.round(abs / 1e6) + "m";
  return GBP0.format(abs);
}

function fmtSignedInt(n) {
  const sign = n > 0 ? "+" : "";
  return sign + Math.round(n).toLocaleString("en-GB");
}

function renderPrizes(nowMs, state, scaled) {
  const gdpBn = scaled.series.gdpShortfall;
  const receiptsBnByYear = gdpBn.map((v) => v * state.taxToGdp);

  const now = new Date(nowMs);
  const year = now.getUTCFullYear();
  const yearStart = Date.UTC(year, 0, 1);
  const yearEnd = Date.UTC(year + 1, 0, 1);
  const frac = clamp01((nowMs - yearStart) / (yearEnd - yearStart));

  const startMs = Date.UTC(2016, 0, 1);
  const elapsedWeeks = Math.max(1, (nowMs - startMs) / (7 * 24 * 3600 * 1000));
  const elapsedYears = Math.max(0.25, (nowMs - startMs) / (365.25 * 24 * 3600 * 1000));

  const receiptsCumToStartBn = cumulativeToStartOfYear(year, receiptsBnByYear);
  const receiptsAnnualBn = annualGdpShortfallForYear(year, receiptsBnByYear);
  const receiptsCumBn = receiptsCumToStartBn + receiptsAnnualBn * frac;

  const usableTotal = receiptsCumBn * 1e9 * state.cycleFactor;
  const avgWeekly = usableTotal / elapsedWeeks;
  const perHouseholdPerWeek = avgWeekly / UK_HOUSEHOLDS;

  setText(ui.usableTaxReadout, fmtBn1(usableTotal / 1e9));
  setText(ui.usableTaxWeeklyReadout, fmtBn1(avgWeekly / 1e9));
  setText(ui.householdWeeklyReadout, GBP0.format(perHouseholdPerWeek));

  const avgAnnual = usableTotal / elapsedYears;
  const count = PRIZES.length;
  const sharePerYear = count > 0 ? avgAnnual / count : 0;
  const dom = ensurePrizeDom();
  setText(dom.count, String(count));
  setText(dom.share, fmtGbpCompact(sharePerYear) + " / year (avg)");

  if (!dom.board) return;

  dom.board.innerHTML = "";
  const prizeCards = [];
  for (const prize of PRIZES) {
    const rawQty = prize.unitCost > 0 ? sharePerYear / prize.unitCost : 0;
    const bucketed = Math.floor(rawQty / prize.bucket) * prize.bucket;
    const locked = bucketed <= 0;

    const card = document.createElement("div");
    card.className = "prizeCard" + (locked ? " isLocked" : "");

    const h = document.createElement("div");
    h.className = "prizeTitle";
    const em = document.createElement("span");
    em.className = "prizeEmoji";
    em.textContent = prize.emoji || "🎁";
    const txt = document.createElement("span");
    txt.textContent = prize.label;
    h.appendChild(em);
    h.appendChild(txt);

    const v = document.createElement("div");
    v.className = "prizeValue";
    v.textContent = locked ? "Locked" : fmtSignedInt(bucketed);

    const sub = document.createElement("div");
    sub.className = "prizeSub";
    if (locked) {
      const need = prize.bucket * prize.unitCost;
      sub.textContent = `Needs ~${fmtGbpCompact(need)} from this prize share (per year).`;
    } else if (prize.baseline && prize.baseline > 0) {
      const pct = (bucketed / prize.baseline) * 100;
      sub.textContent = `~+${pct.toFixed(0)}% vs ${prize.baselineLabel}.`;
    } else {
      sub.textContent = `Bucket: ${prize.bucket.toLocaleString("en-GB")} · Share-based estimate.`;
    }

    card.appendChild(h);
    card.appendChild(v);
    card.appendChild(sub);
    dom.board.appendChild(card);
    prizeCards.push(card);
  }

  // Add + icons between prizes to signal “AND”.
  requestAnimationFrame(() => {
    const board = dom.board;
    if (!board) return;
    board.querySelectorAll(".prizePlus").forEach((n) => n.remove());

    const boardRect = board.getBoundingClientRect();
    const rects = prizeCards.map((n) => n.getBoundingClientRect());
    const rowThresh = 10;

    for (let i = 0; i < prizeCards.length - 1; i += 1) {
      const a = rects[i];
      const b = rects[i + 1];
      const sameRow = Math.abs(a.top - b.top) < rowThresh;

      const plus = document.createElement("div");
      plus.className = "prizePlus";
      plus.textContent = "+";

      let x;
      let y;
      if (sameRow) {
        x = (a.right + b.left) / 2;
        y = (a.top + a.bottom) / 2;
      } else {
        x = (b.left + b.right) / 2;
        y = (a.bottom + b.top) / 2;
      }

      plus.style.left = (x - boardRect.left) + "px";
      plus.style.top = (y - boardRect.top) + "px";

      board.appendChild(plus);
    }
  });
}

function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

let visibleSeries = Object.fromEntries(SERIES_META.map((m) => [m.key, Boolean(m.defaultOn)]));

function readFullState() {
  return getState();
}

let cachedState = null;
let cachedScaled = null;
let needsStaticRender = true;

function renderStatic(nowMs) {
  cachedState = readFullState();
  cachedScaled = scaledSeries(cachedState);
  renderControls(cachedState);
  renderChart(cachedState, cachedScaled, visibleSeries);
  renderPrizes(nowMs, cachedState, cachedScaled);
  renderCounter(nowMs, cachedState, cachedScaled);
  needsStaticRender = false;
}

function renderTick(nowMs) {
  if (needsStaticRender || !cachedState || !cachedScaled) {
    renderStatic(nowMs);
    return;
  }
  renderCounter(nowMs, cachedState, cachedScaled);
}

function tick(nowMs) {
  // requestAnimationFrame provides a monotonic timestamp (not epoch ms).
  // Convert to epoch so our Date math works.
  const epochMs = typeof performance !== "undefined" && Number.isFinite(performance.timeOrigin)
    ? performance.timeOrigin + nowMs
    : Date.now();
  renderTick(epochMs);
  if (prefersReducedMotion()) {
    setTimeout(() => requestAnimationFrame(tick), 250);
  } else {
    requestAnimationFrame(tick);
  }
}

function wireBusEgg() {
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

function wire() {
  buildLegend(visibleSeries, (key, on) => {
    visibleSeries = { ...visibleSeries, [key]: on };
    needsStaticRender = true;
    renderStatic(Date.now());
  });

  resizeFireworksCanvas();

  const inputs = [
  ].filter(Boolean);

  inputs.forEach((node) => node.addEventListener("input", () => {
    needsStaticRender = true;
    renderStatic(Date.now());
  }));

  window.addEventListener("resize", () => {
    resizeFireworksCanvas();
    needsStaticRender = true;
    renderStatic(Date.now());
  });
  wireBusEgg();
}

wire();
renderStatic(Date.now());
requestAnimationFrame(tick);
