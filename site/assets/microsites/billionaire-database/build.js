#!/usr/bin/env node
/**
 * Billionaire web — the explorer.
 *
 * Reads the normalized JSONL tables in ./data and writes static HTML:
 *
 *   index.html            the essay — what the web is and why it matters
 *   people/index.html     everyone in the web, ranked, filterable
 *   people/<slug>.html    a page per person: who they run with, and how
 *   webs/index.html       the atlas — the map, the hinges, the web directory
 *   webs/<slug>.html      a chapter per real web (>=4 members)
 *   roster/<n>.html       rank-sharded reference tables (~250 rows/page)
 *   roster/<n>.html       rank-sharded anchor targets for untied people
 *   gaps/                 research briefs (markdown) for external model runs
 *   data/                 published copies of the tables
 *
 * The product is people and webs, not records. Provenance, tiers and
 * caveats live in footnotes and collapsed receipts, never in the lead.
 */

import { promises as fs } from "fs";
import path from "path";

const PAGE_SIZE = 250;
const STRONG_ORIGINS = new Set(["curated_research", "api_related"]);
const FAMILY_TOKENS = /sibling|sister|brother|cousin|parent|child|daughter|son|spouse|married|aunt|uncle|family|niece|nephew|twin/i;

// ---------------------------------------------------------------------------
// io + text helpers

async function readJsonl(dir, name) {
  const file = path.join(dir, "data", name);
  const text = await fs.readFile(file, "utf8");
  return text.split("\n").filter(Boolean).map((line) => JSON.parse(line));
}

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function money(millions) {
  if (millions == null) return "—";
  if (millions >= 1e6) return `$${(millions / 1e6).toFixed(2)}T`;
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  return `$${Math.round(millions)}M`;
}

function slugify(v) {
  return String(v || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function titleCase(v) {
  return String(v || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function surnameOf(name) {
  const n = String(name || "").replace(/&\s*family$/i, "").replace(/\(.*?\)/g, "").trim();
  const parts = n.split(/[\s-]+/).filter((w) =>
    w.length > 1 && !/^(de|del|van|von|der|la|le|bin|al|di|jr|sr|ii|iii|iv|v)\.?$/i.test(w));
  return parts.length ? parts[parts.length - 1].toLowerCase() : "";
}

function firstName(name) {
  return String(name || "").split(/\s+/)[0] || name;
}

// ---------------------------------------------------------------------------
// tiers

function tierOf(rel) {
  if (rel.origin === "curated_research") return "sourced";
  if (rel.origin === "api_related" && rel.class === "api_labeled") return "feed";
  return "context";
}

function relTypeLabel(rel) {
  const t = rel.type || rel.label || rel.class;
  return titleCase(t && t !== "(blank)" ? t : "related");
}

// what the tie actually is, in reader terms — a shared holding names the
// holding, not the feed's field name for it
function tieText(rel) {
  if (tierOf(rel) === "context") {
    const what = (rel.label || "").replace(/^related by [^:]*:\s*/i, "");
    return what && what !== "(blank)" ? `Both linked to ${what}` : "Shared interests";
  }
  const label = rel.label && rel.label !== "(blank)" && rel.class === "api_labeled" ? rel.label : null;
  return label || relTypeLabel(rel);
}

// feed boilerplate → what it actually says about the people
function humanSummary(s) {
  return (s || "")
    .replace(/both profiles have positive share-count asset entries for ([^.]+)\.?/gi, "Both hold shares in $1.")
    .replace(/positive share-count asset entries for ([^.]+)\.?/gi, "Holds shares in $1.");
}

function cleanSummary(r) {
  if (r.evidence_summary && !/endpoint observation|source profiles:/i.test(r.evidence_summary)) {
    // drop clauses that cite the feed itself as evidence — the API is not a source
    const clauses = r.evidence_summary.split(/;\s*/).filter((c) => !/\bAPI\b|also labels/i.test(c));
    if (clauses.length) return humanSummary(clauses.join("; "));
  }
  return r.label && r.label !== "(blank)" ? humanSummary(r.label) : relTypeLabel(r);
}

// what kind of human connection a tie is — this is how a reader thinks about
// "their people", not how the feed files it
function relGroup(r) {
  const s = `${r.type || ""} ${r.label || ""} ${r.class || ""} ${r.evidence_summary || ""}`.toLowerCase();
  if (/\b(famil\w*|siblings?|brothers?|sisters?|spouses?|husbands?|wives?|parents?|children?|sons?|daughters?|cousins?|relatives?|marri\w*|heirs?|widows?|nieces?|nephews?)\b/.test(s)) return "Family";
  if (/cofound|co-found|co -found|founding partner|co-ceo|founded|co-own/.test(s)) return "Founded together";
  if (/invest|backer|stake|fund|financ|cheque|acqui/.test(s)) return "Money in";
  if (/board|director|executive|chair|colleague/.test(s)) return "Boards & offices";
  return "People";
}
const REL_GROUPS = ["Family", "Founded together", "Money in", "Boards & offices", "People"];
const REL_KIND = {
  "Family": "family", "Founded together": "founded", "Money in": "money",
  "Boards & offices": "board", "People": "people",
};
const relKind = (r) => REL_KIND[relGroup(r)] || "people";
// graph link records — tier sets the cord's tension (solid/dashed/faint),
// kind sets its hue (what the tie IS)
const linkOf = (r) => ({ a: r.a, b: r.b, tier: tierOf(r), kind: relKind(r) });

// a collapsed table's summary is the compressed contents — what kinds of
// ties are inside, not a name for our bookkeeping
function kindsSummary(edges) {
  const counts = new Map();
  for (const r of edges) {
    const k = tierOf(r) === "context" ? "Shared interests" : relGroup(r);
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return [...counts.entries()].map(([k, n]) => `${n} ${k.toLowerCase()}`).join(" · ");
}

// ---- display helpers -------------------------------------------------------
// the feed's country codes are lowercase alpha-2 (mostly ISO, a few legacy
// variants); names map to what a reader expects to see
const COUNTRY_NAMES = {
  us: "United States", cn: "China", in: "India", de: "Germany", ru: "Russia",
  it: "Italy", ca: "Canada", hk: "Hong Kong", br: "Brazil", tw: "Taiwan",
  gb: "United Kingdom", fr: "France", au: "Australia", se: "Sweden",
  sg: "Singapore", kr: "South Korea", es: "Spain", jp: "Japan",
  ch: "Switzerland", il: "Israel", id: "Indonesia", tr: "Turkey",
  mx: "Mexico", my: "Malaysia", gr: "Greece", th: "Thailand", no: "Norway",
  be: "Belgium", nl: "Netherlands", ie: "Ireland", ph: "Philippines",
  cz: "Czechia", pl: "Poland", sa: "Saudi Arabia", at: "Austria",
  cy: "Cyprus", vn: "Vietnam", dk: "Denmark", za: "South Africa",
  ae: "United Arab Emirates", kz: "Kazakhstan", fi: "Finland", cl: "Chile",
  eg: "Egypt", ua: "Ukraine", ar: "Argentina", hu: "Hungary", lb: "Lebanon",
  ng: "Nigeria", co: "Colombia", nz: "New Zealand", ro: "Romania",
  mo: "Macau", st: "São Tomé & Príncipe", pt: "Portugal", mc: "Monaco",
  ge: "Georgia", qa: "Qatar", al: "Albania", bu: "Bulgaria", ur: "Uruguay",
  zi: "Zimbabwe", gu: "Guatemala", ic: "Iceland", li: "Liechtenstein",
  ba: "Bosnia & Herzegovina", lu: "Luxembourg", ve: "Venezuela", pe: "Peru",
  om: "Oman", pa: "Panama", np: "Nepal", af: "Afghanistan", cr: "Costa Rica",
};
const countryName = (cc) => COUNTRY_NAMES[String(cc || "").toLowerCase()]
  || String(cc || "").toUpperCase() || null;
// flag emoji from an ISO-3166 alpha-2 code; "" for anything else
const flagEmoji = (cc) => {
  const code = String(cc || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code)
    ? String.fromCodePoint(...[...code].map((ch) => 0x1F1E6 + ch.charCodeAt(0) - 65))
    : "";
};
// flag + label, with a tap-friendly tooltip (tabindex focus works where
// there's no cursor to hover). visible = short label in tables, full name in
// prose lines; the bubble always carries the full name.
const flag = (cc, name, { short = false } = {}) => {
  const f = flagEmoji(cc);
  const full = name || countryName(cc) || "—";
  if (!f) return esc(full);
  const code = String(cc).toUpperCase();
  const visible = short ? code : full;
  return `<span class="tt" tabindex="0"><span class="flag">${f}</span> ${esc(visible)}<span class="tt-bubble">${esc(full)}</span></span>`;
};

// ============================================================================
// VIEW LAYER — templates never touch raw relationship records.
// The dataset stores edges; readers want facts, people and claims. Everything
// below maps records -> presentation objects:
//   uniqEdges   pair-dedupe: the same pair across tiers keeps the best evidence
//   factsOf     edge-dedupe: identical summaries are ONE fact, with everyone
//               it names in a single set — a family is a fact, not ten rows
//   personView  "who are their people" grouped by connection kind
//   webView     a web's story: cast, facts, the claim count, where it touches
// ============================================================================

const TIER_RANK = { sourced: 0, feed: 1, context: 2 };

function uniqEdges(edges) {
  const m = new Map();
  for (const r of edges) {
    const k = [r.a, r.b].sort().join("|");
    if (!m.has(k) || TIER_RANK[tierOf(r)] < TIER_RANK[tierOf(m.get(k))]) m.set(k, r);
  }
  return [...m.values()];
}

function factsOf(edges) {
  const byFact = new Map();
  for (const r of edges.filter((e) => tierOf(e) === "sourced")) {
    const key = cleanSummary(r);
    if (!byFact.has(key)) {
      byFact.set(key, {
        summary: key,
        year: r.time_start ? String(r.time_start).slice(0, 4) : null,
        kind: relGroup(r),
        people: [],
      });
    }
    const f = byFact.get(key);
    for (const id of [r.a, r.b]) if (!f.people.includes(id)) f.people.push(id);
  }
  return [...byFact.values()];
}

// "who are their people" — grouped by what the connection is, sourced detail
// where it exists, an unverified flag where the feed is the only witness
function personView(p, ties, peopleById) {
  const shared = ties.filter((r) => tierOf(r) === "context");
  const byKind = new Map();
  let anyUnverified = false;
  for (const r of uniqEdges(ties)) {
    if (tierOf(r) === "context") continue;
    const otherId = r.a === p.id ? r.b : r.a;
    const other = peopleById.get(otherId) || { id: otherId, name: otherId };
    const kind = relGroup(r);
    const unverified = tierOf(r) !== "sourced";
    if (unverified) anyUnverified = true;
    if (!byKind.has(kind)) byKind.set(kind, new Map());
    const m = byKind.get(kind);
    if (!m.has(otherId) || !unverified) {
      m.set(otherId, {
        person: other, unverified,
        summary: unverified ? null : cleanSummary(r),
        year: r.time_start ? String(r.time_start).slice(0, 4) : null,
      });
    }
  }
  return {
    groups: REL_GROUPS.filter((g) => byKind.has(g))
      .map((kind) => ({ kind, members: [...byKind.get(kind).values()] })),
    shared, anyUnverified,
  };
}

function webView(c, peopleById, tendrils, clusterOf) {
  const edges = uniqEdges(c.edges);
  return {
    edges,
    facts: factsOf(edges),
    claimedCount: edges.filter((r) => tierOf(r) !== "sourced").length,
    cast: c.members.map((m) => peopleById.get(m) || { id: m, name: m }),
    touches: tendrils.filter((r) => clusterOf.get(r.a) === c || clusterOf.get(r.b) === c).slice(0, 6),
  };
}

// ---------------------------------------------------------------------------
// cluster analysis

function buildClusters(people, relationships) {
  const strong = relationships.filter((r) => tierOf(r) !== "context");
  const parent = new Map();
  const find = (x) => {
    let r = x;
    while (parent.get(r) !== r) r = parent.get(r);
    while (parent.get(x) !== r) { const n = parent.get(x); parent.set(x, r); x = n; }
    return r;
  };
  const union = (a, b) => { parent.set(find(a), find(b)); };
  for (const r of strong) {
    if (!parent.has(r.a)) parent.set(r.a, r.a);
    if (!parent.has(r.b)) parent.set(r.b, r.b);
    union(r.a, r.b);
  }
  const groups = new Map();
  for (const r of strong) {
    const root = find(r.a);
    if (!groups.has(root)) groups.set(root, { members: new Set(), edges: [] });
    const g = groups.get(root);
    g.members.add(r.a); g.members.add(r.b); g.edges.push(r);
  }
  const byRank = (a, b) => ((people.get(a)?.rank ?? 9e9) - (people.get(b)?.rank ?? 9e9));
  const clusters = [...groups.values()].map((g) => {
    const members = [...g.members].sort(byRank);
    const familyEdges = g.edges.filter((e) => FAMILY_TOKENS.test(`${e.type} ${e.label} ${e.class}`));
    const surnames = new Map();
    for (const m of members) {
      const sn = surnameOf(people.get(m)?.name);
      if (sn) surnames.set(sn, (surnames.get(sn) || 0) + 1);
    }
    const top = [...surnames.entries()].sort((a, b) => b[1] - a[1])[0];
    const isFamily = familyEdges.length >= g.edges.length * 0.5
      && top && top[1] >= Math.max(2, members.length * 0.4);
    const name = isFamily
      ? `${top[0][0].toUpperCase()}${top[0].slice(1)} family`
      : members.slice(0, 3).map((m) => {
          const p = people.get(m);
          const sn = surnameOf(p?.name);
          return sn ? sn[0].toUpperCase() + sn.slice(1) : (p?.name || m);
        }).join(" · ");
    const edges = [...g.edges].sort((a, b) => {
      const t = { sourced: 0, feed: 1 }[tierOf(a)] - { sourced: 0, feed: 1 }[tierOf(b)];
      return t || String(a.id).localeCompare(String(b.id));
    });
    const worth = members.reduce((s, m) => s + (people.get(m)?.net_worth_usd_millions || 0), 0);
    const surnameList = [...surnames.entries()].sort((a, b) => b[1] - a[1]);
    return { name, members, edges, isFamily, worth, surnameList };
  });
  // two different families can share a top surname (two Macmillan clans) —
  // disambiguate with the next most common surname in the web
  const usedNames = new Set();
  for (const c of clusters) {
    if (usedNames.has(c.name) && c.surnameList[1]) {
      const up = (s) => s[0].toUpperCase() + s.slice(1);
      c.name = `${up(c.surnameList[0][0])}–${up(c.surnameList[1][0])} family`;
    }
    usedNames.add(c.name);
  }
  clusters.sort((a, b) => b.worth - a.worth || a.name.localeCompare(b.name));
  return { clusters, strong };
}

function subwebName(memberIds, peopleById) {
  const counts = new Map();
  for (const m of memberIds) {
    const sn = surnameOf(peopleById.get(m)?.name);
    if (sn) counts.set(sn, (counts.get(sn) || 0) + 1);
  }
  const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (top && top[1] >= 2) {
    const base = cap(top[0]);
    return `the ${/(?:[sxz]|ch|sh|ss)$/.test(top[0]) ? `${base}es` : `${base}s`}`;
  }
  const names = memberIds.slice(0, 2).map((m) => cap(surnameOf(peopleById.get(m)?.name))
    || (peopleById.get(m)?.name || m).replace(/&\s*family$/i, ""));
  return names.join("–");
}

function hingeInfo(clusters, peopleById) {
  const hinges = [];
  for (const c of clusters) {
    if (c.members.length < 5) continue;
    const adj = new Map(c.members.map((m) => [m, []]));
    for (const e of c.edges) { adj.get(e.a).push(e.b); adj.get(e.b).push(e.a); }
    const disc = new Map(), low = new Map(), cuts = new Set();
    let timer = 0;
    const dfs = (u, p) => {
      disc.set(u, ++timer); low.set(u, timer);
      let ch = 0;
      for (const v of adj.get(u)) {
        if (v === p) continue;
        if (disc.has(v)) { low.set(u, Math.min(low.get(u), disc.get(v))); continue; }
        ch++;
        dfs(v, u);
        low.set(u, Math.min(low.get(u), low.get(v)));
        if (p !== null && low.get(v) >= disc.get(u)) cuts.add(u);
      }
      if (p === null && ch > 1) cuts.add(u);
    };
    for (const u of c.members) if (!disc.has(u)) dfs(u, null);
    for (const v of cuts) {
      const rest = c.members.filter((m) => m !== v);
      const seen = new Set();
      const parts = [];
      for (const s of rest) {
        if (seen.has(s)) continue;
        const comp = [];
        const stack = [s];
        seen.add(s);
        while (stack.length) {
          const u = stack.pop();
          comp.push(u);
          for (const w of adj.get(u)) if (w !== v && !seen.has(w)) { seen.add(w); stack.push(w); }
        }
        if (comp.length >= 2) parts.push(comp);
      }
      if (parts.length >= 2) {
        parts.sort((a, b) => b.length - a.length);
        hinges.push({ id: v, cluster: c, parts });
      }
    }
  }
  hinges.sort((a, b) => (peopleById.get(a.id)?.rank ?? 9e9) - (peopleById.get(b.id)?.rank ?? 9e9));
  return hinges;
}

// ---------------------------------------------------------------------------
// companies — the layer between people and webs
//
// A company groups the billionaires attached to it — founders, heirs, big
// holders, board members — and where those people sit in different webs, the
// company is the thing actually bridging the groups. Attachment isn't one
// relationship: owning a fortune's source, holding shares, sitting on a board
// and showing up in feed links are all "membership" of different kinds, so
// every member keeps the kind of attachment we have for them.
//
// wealth_source labels are mostly sectors ("concrete", "real estate") — the
// subset below is the ones that name a real company, brand or franchise,
// reviewed against the full label vocabulary. Extend it as new labels arrive.
const WS_COMPANY_LABELS = `
abinbev|airbnb|aldi|alo yoga|alphabet|amazon|aol|apple|arca continental
baltimore ravens|berkshire hathaway|best buy|black entertainment television|bloomberg lp|bmw
campbell soup|campbell's soup|cargill|carnival cruises|chanel|charlotte hornets|chick-fil-a
cincinnati bengals|cirque du soleil|coca cola israel|coca-cola israel|columbia sportswear|comcast
dallas cowboys|dallas mavericks|dell technologies|dick's sporting goods|directv|disney|dolby laboratories
easyjet|ebay|estee lauder|estée lauder|facebook|fiat|fidelity|flipkart|formula one|franklin templeton
gap|genentech|general electric|getty oil|golden state warriors|google|gopro|groupon
h&m|heineken|hello kitty|home depot|houston rockets|houston texans|hyundai
ikea|in-n-out burger|indianapolis colts|instagram|jack link's meat snacks|jersey mike's subs
jet.com|johnson & johnson|kansas city chiefs|koch|korea investment holdings|l'oréal|las vegas raiders
law & order|le creuset|lego|lg|linkedin|little caesars pizza|loews|los angeles angels|lululemon|lvmh
manchester united|marvel comics|microsoft|motorola|nascar|netflix|netscape|new balance
new england patriots|new orleans saints|new york giants|new york jets|nike|nutella|nvidia
openai|oracle|palantir|paypal|philadelphia eagles|pinterest|polymarket|red bull|reebok|rocket mortgage|roku
samsung|san francisco 49ers|sap|sears|shein|snapchat|softbank|spacex|spanx|spotify|square
star wars|starbucks|subway|sun microsystems|tampa bay buccaneers|td ameritrade|tennessee titans
tesla|thomson reuters|tiktok|timberland|trader joe's|twitter|u-haul|uber|urban outfitters|virgin
waffle house|walmart|walmart mexico|washington commanders|wework|whatsapp|yahoo|yandex|zara
zoom video communications
`.split(/[|\n]/).map((s) => s.trim()).filter(Boolean);

const CO_ALIAS = {
  alphabet: "google",
  facebook: "meta", "meta platforms": "meta",
  "space exploration technologies": "spacex",
  snapchat: "snap",
  tiktok: "bytedance",
  koch: "koch industries",
  virgin: "virgin group",
  "walmart mexico": "walmart",
  softbank: "softbank group",
  disney: "walt disney",
  "black entertainment television": "bet",
};
const CO_DISPLAY = {
  meta: "Meta", bytedance: "ByteDance / TikTok", bet: "BET",
  "koch industries": "Koch Industries", "virgin group": "Virgin Group",
  ebay: "eBay", "marvel comics": "Marvel Comics", aol: "AOL", ikea: "IKEA",
};

const normCo = (s) => (s || "")
  .normalize("NFD").replace(/\p{M}/gu, "")
  .toLowerCase().replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, " ").trim();
const CORP_TAIL = /\s+(?:incorporated|inc|corp|corporation|co|ltd|llc|lp|plc|s\.?a\.?b?\.?\s+de\s+c\.?v\.?|s\.?a\.?|a\.?g\.?|se|nv|bv|gmbh|pty|pcl|sponsored|adr|ads|class\s+[abc](?:\s+common\s+stock)?|common\s+stock)\.?\s*$/i;
const cleanCoName = (s) => {
  let n = (s || "").replace(/\s*\((?:cl|class)\s*[abc]?\)\s*$/i, "");
  let prev;
  do { prev = n; n = n.replace(CORP_TAIL, "").trim(); } while (n !== prev);
  return n;
};
const coKey = (s) => {
  const k = normCo(cleanCoName(s));
  return CO_ALIAS[k] || k;
};

// how each member is attached — ordered strongest to weakest claim
const VIA_ORDER = ["fortune", "curated", "holding", "profile", "tie", "derived"];
const VIA_TEXT = {
  fortune: "fortune source", curated: "researched tie", holding: "reported holding",
  profile: "feed profile link", tie: "named in ties", derived: "inferred feed link",
};

const WEB_OVERRIDES = {
  "elon-musk": "PayPal, Tesla, Google, Facebook and Amazon money cross-linked — founders and backers across the biggest tech fortunes.",
  "jacqueline-mars": "The Mars candy-and-pet-food fortune, split between siblings and heirs.",
  "rob-walton": "Sam Walton's children share one Walmart fortune.",
  "giancarlo-devasini": "The Tether circle — Devasini, van der Velde and Ardoino around the biggest stablecoin on earth.",
  "gianluigi-aponte": "The Aponte shipping fortune — MSC, split between Gianluigi and Rafaela.",
  "mukesh-ambani": "Reliance — India's biggest industrial fortune and the family around it.",
  "julia-koch": "Koch Industries money across the family — the dynasty behind America's biggest private company.",
};

function clusterMeaning(c, peopleById) {
  const members = c.members.map((m) => peopleById.get(m)).filter(Boolean);
  if (c.isFamily) {
    return `One fortune shared by ${c.members.length} members of the same family.`;
  }
  const hasCof = c.edges.some((e) => /cofound|co-found|founding/i.test(`${e.type} ${e.label} ${e.class}`));
  const hasInvest = c.edges.some((e) => /invest|backer|stake|board|director/i.test(`${e.type} ${e.label} ${e.class}`));
  const industries = [...new Set(members.map((p) => p.industry).filter(Boolean))];
  const indStr = industries.length > 1
    ? `${industries.slice(0, 3).join(", ")}${industries.length > 3 ? ` +${industries.length - 3}` : ""}`
    : industries[0] || "—";
  const kinds = [hasCof && "co-founders", hasInvest && "investors & board seats"].filter(Boolean);
  if (!kinds.length) return `${c.members.length} fortunes in ${indStr}.`;
  const s = kinds.join(" and ");
  return `${s[0].toUpperCase()}${s.slice(1)} spanning ${indStr}.`;
}

// ---------------------------------------------------------------------------
// baked graph layout + static svg

function layoutGraph(nodes, links) {
  const byId = new Map(nodes.map((n, i) => [n.id, i]));
  const pts = nodes.map((n, i) => ({
    id: n.id,
    x: Math.cos(i * 2.399963) * (10 + i * 0.55),
    y: Math.sin(i * 2.399963) * (10 + i * 0.55),
    vx: 0, vy: 0,
  }));
  const edges = links.map((l) => ({ s: pts[byId.get(l.a)], t: pts[byId.get(l.b)] }))
    .filter((e) => e.s && e.t);
  const linkDist = 90, repulse = 2600, center = 0.02;
  let alpha = 1;
  for (let it = 0; it < 700 && alpha > 0.02; it++) {
    alpha *= 0.985;
    for (const l of edges) {
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
      const d = Math.hypot(dx, dy) || 1;
      const f = (d - linkDist) * 0.015 * alpha;
      l.s.vx += dx / d * f; l.s.vy += dy / d * f;
      l.t.vx -= dx / d * f; l.t.vy -= dy / d * f;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > 40000 || d2 === 0) continue;
        const d = Math.sqrt(d2);
        const f = repulse / d2 * alpha * 0.4;
        a.vx -= dx / d * f; a.vy -= dy / d * f;
        b.vx += dx / d * f; b.vy += dy / d * f;
      }
      a.vx += -a.x * center * alpha;
      a.vy += -a.y * center * alpha;
      a.x += a.vx *= 0.86;
      a.y += a.vy *= 0.86;
    }
  }
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const p of pts) {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  }
  const sx = (maxX - minX) || 1, sy = (maxY - minY) || 1;
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  return new Map(pts.map((p) => [p.id, {
    x: +((p.x - cx) / sx * 1.84).toFixed(4),
    y: +((p.y - cy) / sy * 1.84).toFixed(4),
  }]));
}

function svgGraph({ nodes, links, width = 640, height = 380, labelTop = 8,
  hrefOf, ariaLabel }) {
  const pos = layoutGraph(nodes, links);
  const labeled = new Set(
    [...nodes].sort((a, b) => (a.rank ?? 9e9) - (b.rank ?? 9e9)).slice(0, labelTop).map((n) => n.id),
  );
  const pad = 30;
  const sx = width / 2 - pad, sy = height / 2 - pad;
  const cx = width / 2, cy = height / 2;
  const P = (id) => {
    const p = pos.get(id) || { x: 0, y: 0 };
    return { x: cx + p.x * sx, y: cy + p.y * sy };
  };
  const r = (n) => 3.5 + Math.min(13, Math.sqrt(Math.max(0, n.worth || 0) / 9000));
  const lines = links.map((l) => {
    const a = P(l.a), b = P(l.b);
    return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" class="e-${esc(l.tier)}${l.kind ? ` k-${esc(l.kind)}` : ""}"/>`;
  }).join("");
  const dots = nodes.map((n) => {
    const p = P(n.id);
    const rr = r(n);
    const label = esc(n.name);
    const flip = p.x + rr + 8 + n.name.length * 6.4 > width;
    const tx = flip ? p.x - rr - 5 : p.x + rr + 5;
    const anchor = flip ? ` text-anchor="end"` : "";
    const isLabeled = labeled.has(n.id);
    const meta = [n.worth ? money(n.worth) : null, n.rank ? `#${n.rank}` : null]
      .filter(Boolean).join(" · ");
    const text = `<text${isLabeled ? "" : ' class="n-pop"'} x="${tx.toFixed(1)}" y="${(p.y + 3.5).toFixed(1)}"${anchor}>${label}</text>`;
    return `<a href="${esc(hrefOf(n))}" data-name="${label}" data-meta="${esc(meta)}"><circle class="hitArea" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${(rr + 7).toFixed(1)}"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${rr.toFixed(1)}"/><title>${label}</title>${text}</a>`;
  }).join("");
  return `<svg class="webGraph" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(ariaLabel)}">${lines}${dots}</svg>`;
}

// ---------------------------------------------------------------------------
// chrome

function brandHeader() {
  return `
<header class="brandBar">
  <a class="brandMark" href="/"><img src="/assets/better-britain-bee.png" alt="" width="34" height="34" /><span>Better Britain <strong>Bureau</strong></span></a>
  <nav class="brandLinks" aria-label="Better Britain links">
    <a href="/">Homepage</a>
    <a href="/year-of-labour.html">Flagship report</a>
    <a href="/posts/index.html">Posts</a>
    <a href="/about.html">About BBB</a>
  </nav>
</header>`;
}

function navBar(prefix, active) {
  const items = [
    ["index.html", "Overview"],
    ["people/index.html", "People"],
    ["webs/index.html", "Groups"],
    ["companies/index.html", "Companies"],
    ["gaps/index.html", "Gaps"],
  ];
  const links = items.map(([href, label]) =>
    `<a href="${prefix}${href}"${label === active ? ' class="is-active" aria-current="location"' : ""}>${label}</a>`).join("");
  return `<nav class="cd-nav" aria-label="Section"><div class="cd-nav__inner cd-wrap">${links}</div></nav>`;
}

const ASSET_V = Date.now().toString(36);

function pageShell({ title, description, prefix, active, bodyClass, content }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} — Billionaire Database — Better Britain Bureau</title>
  <meta name="description" content="${esc(description)}" />
  <style>
    :focus-visible { outline: 2px solid #d62828; outline-offset: 2px; }
    @media (max-width: 760px) { .cd-nav__inner { flex-wrap: nowrap; overflow-x: auto; } }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  </style>
  <link rel="stylesheet" href="${prefix}style.css?v=${ASSET_V}" />
  <link rel="preload" href="${prefix}fonts/oswald-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="${prefix}fonts/inconsolata-latin.woff2" as="font" type="font/woff2" crossorigin />
</head>
<body class="${esc(bodyClass || "")}" data-root="${prefix}">
${brandHeader()}
${navBar(prefix, active)}
<main class="cd-wrap">
${content}
</main>
<footer class="cd-wrap siteFoot">
  <p>The rich list, 17 Nov 2026 · <a href="https://github.com/Better-Britain/reports/tree/main/site/assets/microsites/billionaire-database">Source</a></p>
</footer>
<script src="${prefix}app.js?v=${ASSET_V}" defer></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// footnotes

function makeFootnotes(prefix) {
  const items = [];
  const seen = new Map();
  return {
    ref(html) {
      if (seen.has(html)) {
        const n = seen.get(html);
        return `<sup class="fn"><a href="#fn-${prefix}-${n}">${n}</a></sup>`;
      }
      items.push(html);
      const n = items.length;
      seen.set(html, n);
      return `<sup class="fn"><a href="#fn-${prefix}-${n}" id="fr-${prefix}-${n}">${n}</a></sup>`;
    },
    render() {
      if (!items.length) return "";
      return `<ol class="footnotes">${items.map((h, i) =>
        `<li id="fn-${prefix}-${i + 1}">${h} <a class="fnBack" href="#fr-${prefix}-${i + 1}" aria-label="Back to text">↩</a></li>`).join("")}</ol>`;
    },
  };
}

// ---------------------------------------------------------------------------
// gaps — every brief is a self-contained research prompt + the gap rows

const RETURN_FORMAT = `person_a_uri,person_b_uri,relationship_type,relationship_label,confidence,evidence_summary,source_urls
- person_a_uri / person_b_uri: use the slug exactly as given below.
- relationship_type: snake_case (siblings, cofounders, spouse, board_colleagues, early_investor, …).
- relationship_label: human wording as found in the source.
- confidence: high | medium | low (high = two+ independent reputable sources).
- evidence_summary: one sentence, factual, naming the source claim.
- source_urls: ';'-separated absolute URLs to the evidence.
- Only include a row if you found a citable source. Silence is an answer.`;

function gapMd({ title, generated, intro, task, columns, rows }) {
  const table = [
    `| ${columns.join(" | ")} |`,
    `|${columns.map(() => "---").join("|")}|`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
  return `# Billionaire Database — research brief: ${title}

_Generated ${generated} from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

${intro}

## Task

${task}

## Return format

One CSV row per verified tie — this file's findings get merged into the
dataset, so the columns are the merge contract:

\`\`\`
${RETURN_FORMAT}
\`\`\`

## Gaps (${rows.length})

${table}
`;
}

function evidenceCell(rel, sourcesById, caveatsById, fn, linkify = esc) {
  const summary = rel.evidence_summary && !/endpoint observation|source profiles:/i.test(rel.evidence_summary)
    ? rel.evidence_summary : null;
  const text = summary
    ? `<span class="evText">${linkify(humanSummary(summary))}</span>`
    : `<span class="evNone">—</span>`;
  const sups = [];
  const linkBits = [];
  const seenUrls = new Set();
  for (const sid of rel.source_ids || []) {
    const src = sourcesById.get(sid);
    if (src?.url && !seenUrls.has(src.url)) {
      seenUrls.add(src.url);
      linkBits.push(`<a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title || sid)}</a>`);
    }
  }
  for (const u of rel.source_urls || []) {
    if (seenUrls.has(u)) continue;
    seenUrls.add(u);
    linkBits.push(`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u.replace(/^https?:\/\//, "").split("/")[0])}</a>`);
  }
  if (linkBits.length) sups.push(fn.ref(`Source: ${linkBits.join(" · ")}`));
  const cav = rel.caveat_id && caveatsById.get(rel.caveat_id);
  if (cav && !cav.boilerplate) sups.push(fn.ref(esc(cav.text)));
  return text + sups.join("");
}

// ---------------------------------------------------------------------------

export async function buildMicrosite({ sourceDir, outDir }) {
  const dataDir = path.join(sourceDir, "data");
  const [people, entities, memberships, relationships, , , sources, caveats] = await Promise.all([
    readJsonl(sourceDir, "people.jsonl"),
    readJsonl(sourceDir, "entities.jsonl"),
    readJsonl(sourceDir, "memberships.jsonl"),
    readJsonl(sourceDir, "relationships.jsonl"),
    readJsonl(sourceDir, "api_observations.jsonl"),
    readJsonl(sourceDir, "asset_records.jsonl"),
    readJsonl(sourceDir, "sources.jsonl"),
    readJsonl(sourceDir, "caveats.jsonl"),
  ]);
  const manifest = JSON.parse(await fs.readFile(path.join(dataDir, "manifest.json"), "utf8"));
  // real-world company vocabulary (Fortune 500, Forbes 2000, S&P 500) — used
  // to recognise which wealth_source labels name a company rather than a sector
  const knownCos = (await fs.readFile(path.join(dataDir, "known_companies.txt"), "utf8"))
    .split("\n").map((s) => s.trim()).filter(Boolean);
  const coLineage = await readJsonl(sourceDir, "company_lineage.jsonl").catch(() => []);

  const peopleById = new Map(people.map((p) => [p.id, p]));
  const sourcesById = new Map(sources.map((s) => [s.id, s]));
  const caveatsById = new Map(caveats.map((c) => [c.id, c]));

  const roster = people.filter((p) => p.in_roster).sort((a, b) => (a.rank ?? 9e9) - (b.rank ?? 9e9));
  const nonRoster = people.filter((p) => !p.in_roster);
  const shards = [];
  for (let i = 0; i < roster.length; i += PAGE_SIZE) shards.push(roster.slice(i, i + PAGE_SIZE));

  const { clusters, strong } = buildClusters(peopleById, relationships);
  const clusterOf = new Map();
  for (const c of clusters) for (const m of c.members) clusterOf.set(m, c);
  {
    const used = new Set();
    for (const c of clusters) {
      c.hasPage = c.members.length >= 4;
      let slug = slugify(c.name.replace(/\s+(web|family)$/i, "")) || "web";
      while (used.has(slug)) slug = `${slug}-x`;
      used.add(slug);
      c.slug = slug;
    }
  }

  const tiesByPerson = new Map();
  for (const r of relationships) {
    for (const pid of [r.a, r.b]) {
      if (!tiesByPerson.has(pid)) tiesByPerson.set(pid, []);
      tiesByPerson.get(pid).push(r);
    }
  }
  for (const ties of tiesByPerson.values()) {
    ties.sort((a, b) => {
      const t = { sourced: 0, feed: 1, context: 2 }[tierOf(a)] - { sourced: 0, feed: 1, context: 2 }[tierOf(b)];
      return t || String(a.id).localeCompare(String(b.id));
    });
  }

  // canonical destinations — a person page for everyone with a tie, else a
  // roster row anchor (non-roster people live on the last shard)
  const rosterPageOf = new Map();
  shards.forEach((shard, i) => {
    for (const p of shard) rosterPageOf.set(p.id, `roster/${i + 1}.html#p-${p.id}`);
  });
  for (const p of nonRoster) rosterPageOf.set(p.id, `roster/${shards.length + 1}.html#p-${p.id}`);

  const hasPersonPage = (id) => tiesByPerson.has(id);
  const personHref = (id, prefix) => hasPersonPage(id)
    ? `${prefix}people/${id}.html`
    : `${prefix}${rosterPageOf.get(id) || "people/index.html"}`;
  const personLink = (p, prefix) => {
    const id = p.id || p;
    const name = esc((p.name || id).replace(/&\s*family$/i, ""));
    return `<a class="personLink" href="${personHref(id, prefix)}">${name}</a>`;
  };
  const webHref = (c, prefix) => c.hasPage ? `${prefix}webs/${c.slug}.html` : personHref(c.members[0], prefix);

  await fs.mkdir(outDir, { recursive: true });

  // publish data tables
  const outData = path.join(outDir, "data");
  await fs.mkdir(outData, { recursive: true });
  for (const f of await fs.readdir(dataDir)) {
    if (f.endsWith(".jsonl") || f === "manifest.json") {
      await fs.copyFile(path.join(dataDir, f), path.join(outData, f));
    }
  }

  // shared computations
  const rosterWorth = roster.reduce((s, p) => s + (p.net_worth_usd_millions || 0), 0);
  const tendrils = relationships
    .filter((r) => tierOf(r) === "context"
      && clusterOf.has(r.a) && clusterOf.has(r.b)
      && clusterOf.get(r.a) !== clusterOf.get(r.b))
    .sort((x, y) => Math.min(peopleById.get(x.a)?.rank ?? 9e9, peopleById.get(x.b)?.rank ?? 9e9)
      - Math.min(peopleById.get(y.a)?.rank ?? 9e9, peopleById.get(y.b)?.rank ?? 9e9));
  const hinges = [];
  {
    const byCluster = new Map();
    for (const h of hingeInfo(clusters, peopleById)) {
      if (!byCluster.has(h.cluster)) byCluster.set(h.cluster, []);
      byCluster.get(h.cluster).push(h);
    }
    for (const [, list] of byCluster) hinges.push(list[0]);
  }
  const webPages = clusters.filter((c) => c.hasPage);
  const smallGroups = clusters.filter((c) => !c.hasPage);
  const meaningOf = (c) => WEB_OVERRIDES[c.members[0]] || clusterMeaning(c, peopleById);
  const webNodes = [...new Set(strong.flatMap((r) => [r.a, r.b]))];
  const graphNodes = webNodes.map((id) => {
    const p = peopleById.get(id) || {};
    return { id, name: p.name || id, worth: p.net_worth_usd_millions ?? null, rank: p.rank ?? null };
  });
  const graphLinks = strong.map((r) => ({ a: r.a, b: r.b, tier: tierOf(r) }));

  // ---- companies — one node per real company -------------------------------
  // companies merge every entity source into one node per real company:
  // curated orgs, listed-company assets (tickers), feed financial-asset
  // references, and wealth-source labels that name a company rather than a
  // sector. Each member keeps the strongest kind of attachment we hold.

  const nonContext = relationships.filter((r) =>
    tierOf(r) !== "context" && peopleById.has(r.a) && peopleById.has(r.b));
  const wsCompanySet = new Set([...WS_COMPANY_LABELS, ...knownCos].map(normCo));
  const companies = [];
  {
    const byKey = new Map(); // co key -> {names by priority, ticker, entityIds, memberVia}
    const entToKey = new Map();
    for (const e of entities) {
      const isOrg = /^(org|group):/.test(e.id);
      const isAsset = e.id.startsWith("company_asset:");
      const isFinRef = e.id.startsWith("entity:") && e.category === "financial_asset_reference";
      const isWsCo = e.id.startsWith("wealth_source:") && wsCompanySet.has(normCo(e.name));
      if (!isOrg && !isAsset && !isFinRef && !isWsCo) continue;
      const key = coKey(e.name.split("/")[0]);
      if (!key) continue;
      entToKey.set(e.id, key);
      if (!byKey.has(key)) byKey.set(key, { key, name: null, ticker: null, names: [null, null, null, null], memberVia: new Map(), entityIds: new Set() });
      const c = byKey.get(key);
      c.entityIds.add(e.id);
      if (e.ticker && !c.ticker) c.ticker = e.ticker;
      const pri = isOrg ? 0 : isAsset ? 1 : isFinRef ? 2 : 3;
      if (!c.names[pri]) c.names[pri] = isOrg ? e.name.split("/")[0].replace(/,?\s*incorporated$/i, "").trim()
        : isAsset ? cleanCoName(e.name) : e.name.trim();
    }
    const setVia = (c, pid, via) => {
      const cur = c.memberVia.get(pid);
      if (!cur || VIA_ORDER.indexOf(via) < VIA_ORDER.indexOf(cur)) c.memberVia.set(pid, via);
    };
    for (const m of memberships) {
      const key = entToKey.get(m.entity);
      if (!key || !peopleById.has(m.source)) continue;
      const k = m.kind || "";
      const via = k === "curated_researched" ? "curated"
        : k === "api_reported_asset_holding" ? "holding"
        : k === "api_shared_entity_membership" ? "profile"
        : k === "api_shared_entity_membership_derived" ? "derived"
        : k === "snapshot_contextual_affiliation" ? "fortune" : null;
      if (via) setVia(byKey.get(key), m.source, via);
    }
    // members come from structured membership records only — no free-text
    // matching of evidence prose. Company links we don't have records for
    // are documented in the company-ties gaps brief, not guessed.
    const usedSlugs = new Set();
    for (const c of byKey.values()) {
      const members = [...c.memberVia.keys()]
        .sort((a, b) => (peopleById.get(a)?.rank ?? 9e9) - (peopleById.get(b)?.rank ?? 9e9));
      if (!members.length) continue;
      const name = CO_DISPLAY[c.key] || c.names.find(Boolean) || c.key;
      let slug = slugify(name) || "company";
      while (usedSlugs.has(slug)) slug += "-co";
      usedSlugs.add(slug);
      const memberSet = new Set(members);
      const worth = members.reduce((s, m) => s + (peopleById.get(m)?.net_worth_usd_millions || 0), 0);
      const indVotes = new Map();
      for (const m of members) {
        const ind = peopleById.get(m)?.industry;
        if (ind) indVotes.set(ind, (indVotes.get(ind) || 0) + 1);
      }
      const industry = [...indVotes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;
      companies.push({
        key: c.key, slug, name,
        ticker: c.ticker,
        members,
        memberVia: c.memberVia,
        edges: uniqEdges(nonContext.filter((r) => memberSet.has(r.a) && memberSet.has(r.b))),
        worth, industry,
        parentWebs: [...new Set(members.map((m) => clusterOf.get(m)).filter((w) => w && w.hasPage))],
      });
    }
    companies.sort((a, b) => b.worth - a.worth || a.name.localeCompare(b.name));
  }
  // companies whose billionaires sit in more than one web — the things
  // actually bridging the groups
  const bridgeCos = companies.filter((c) => c.parentWebs.length >= 2);

  // source-of-wealth labels and industries become links where they resolve to
  // a real company node — exact key match only, no fuzzy lookup
  const coByKey = new Map(companies.map((c) => [c.key, c]));
  // name history — renames, takeovers, absorptions. A rename that changes
  // owner or direction (Twitter→X) keeps both identities in the data; the
  // lineage row is what links them.
  for (const c of companies) c.lineage = [];
  for (const l of coLineage) {
    const fCo = coByKey.get(coKey(l.from)), tCo = coByKey.get(coKey(l.to));
    if (fCo && fCo === tCo) {
      const side = l.kind === "renamed"
        ? { dir: "to", other: null, otherName: l.from_name || titleCase(l.from) }
        : { dir: "from", other: null, otherName: l.to_name || titleCase(l.to) };
      fCo.lineage.push({ ...l, ...side });
      continue;
    }
    if (fCo) fCo.lineage.push({ ...l, dir: "from", other: tCo || null, otherName: l.to_name || titleCase(l.to) });
    if (tCo) tCo.lineage.push({ ...l, dir: "to", other: fCo || null, otherName: l.from_name || titleCase(l.from) });
  }
  const coLinkForSource = (label, prefix) => {
    const c = coByKey.get(coKey(label));
    return c ? `<a href="${prefix}companies/${c.slug}.html">${esc(label)}</a>` : null;
  };
  const sourceLinks = (p, prefix) => (p.source_of_wealth || []).slice(0, 3)
    .map((s) => coLinkForSource(s, prefix) || esc(s)).join(", ");
  const indHref = (ind, prefix) => `${prefix}companies/index.html#ind-${slugify(ind)}`;

  // prose linkifier — any company name (or alias, like "Facebook" → Meta)
  // inside generated copy links to its company page. One alternation pass
  // so inserted anchors never re-match.
  const coTerms = new Map(); // norm -> {co, term}
  for (const c of companies) coTerms.set(normCo(c.name), { co: c, term: c.name });
  for (const [alias, key] of Object.entries(CO_ALIAS)) {
    const co = coByKey.get(key);
    if (co && !coTerms.has(normCo(alias))) coTerms.set(normCo(alias), { co, term: alias });
  }
  const coRx = coTerms.size ? new RegExp(
    `\\b(${[...coTerms.values()].sort((a, b) => b.term.length - a.term.length)
      .map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi") : null;
  const coLinkify = (text, prefix) => {
    if (!coRx) return esc(text);
    return esc(text).replace(coRx, (m) => {
      const hit = coTerms.get(normCo(m));
      return hit ? `<a href="${prefix}companies/${hit.co.slug}.html">${esc(m)}</a>` : m;
    });
  };

  // a sub-part's label ("the Winklevosses", "Ellison–Ragon") isn't a node of
  // its own — link it to the people it names
  const subwebLink = (part, prefix) => {
    const ranked = [...part].sort((a, b) => (peopleById.get(a)?.rank ?? 9e9) - (peopleById.get(b)?.rank ?? 9e9));
    const counts = new Map();
    for (const m of ranked) {
      const sn = surnameOf(peopleById.get(m)?.name);
      if (sn) counts.set(sn, (counts.get(sn) || 0) + 1);
    }
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (top && top[1] >= 2) {
      const named = ranked.find((m) => surnameOf(peopleById.get(m)?.name) === top[0]) || ranked[0];
      return `<a href="${personHref(named, prefix)}">${esc(subwebName(ranked, peopleById))}</a>`;
    }
    return ranked.slice(0, 2).map((m) => {
      const p = peopleById.get(m) || { id: m, name: m };
      const nm = surnameOf(p.name) || (p.name || m).replace(/&\s*family$/i, "");
      return `<a href="${personHref(m, prefix)}">${esc(nm[0].toUpperCase() + nm.slice(1))}</a>`;
    }).join("–");
  };

  // every company a person sits in, ordered by how central they are to it —
  // degree = ties they hold inside that company, worth breaks the tie
  const groupsOf = new Map();
  for (const g of companies) {
    for (const m of g.members) {
      const degree = g.edges.filter((r) => r.a === m || r.b === m).length;
      if (!groupsOf.has(m)) groupsOf.set(m, []);
      groupsOf.get(m).push({ g, degree });
    }
  }
  for (const list of groupsOf.values()) {
    list.sort((a, b) => b.degree - a.degree || b.g.worth - a.g.worth);
  }

  // ---- people — one page per person in the web -----------------------------
  const peopleDir = path.join(outDir, "people");
  await fs.mkdir(peopleDir, { recursive: true });

  // unverified gets a dagger, not a status badge — the footnote explains once
  const dagger = '<sup class="unver tt" tabindex="0">†<span class="tt-bubble">a claim — no independent source</span></sup>';
  const tierMark = (r) => tierOf(r) === "feed" ? dagger : "";
  const tieSentence = (r, self, prefix) => {
    const otherId = r.a === self ? r.b : r.a;
    const other = peopleById.get(otherId) || { id: otherId, name: otherId };
    const when = r.time_start ? ` · ${String(r.time_start).slice(0, 4)}` : "";
    return `<li>${personLink(other, prefix)} <span class="muted">— ${coLinkify(cleanSummary(r), prefix)}${esc(when)}</span>${tierMark(r)}</li>`;
  };

  for (const p of people) {
    if (!hasPersonPage(p.id)) continue;
    const fn = makeFootnotes(`p-${p.id}`);
    const ties = tiesByPerson.get(p.id) || [];
    const view = personView(p, ties, peopleById);
    const contextTies = view.shared;
    const runGroups = view.groups.map((g) => {
      const entries = g.members.map((m) => {
        const detail = !m.unverified && g.kind !== "Family" && m.summary
          ? ` <span class="muted">— ${coLinkify(m.summary, "../")}${m.year ? ` · ${esc(m.year)}` : ""}</span>` : "";
        return `${personLink(m.person, "../")}${detail}${m.unverified ? dagger : ""}`;
      }).join(" · ");
      return `<p class="runGroup"><span class="runKind">${esc(g.kind)}</span> ${entries}</p>`;
    }).join("\n");
    const c = clusterOf.get(p.id);
    const first = firstName(p.name);
    const facts = [
      p.rank ? `#${p.rank} on the list` : null,
      money(p.net_worth_usd_millions),
      p.citizenship ? flag(p.citizenship, p.country_name) : null,
      p.industry ? `<a href="${indHref(p.industry, "../")}">${esc(titleCase(p.industry))}</a>` : null,
      p.source_of_wealth?.length ? `money from ${sourceLinks(p, "../")}` : null,
    ].filter(Boolean).join(" · ");
    const pGroups = [...new Map((groupsOf.get(p.id) || []).map((x) => [x.g.slug, x.g])).values()];
    const pGroupLinks = pGroups.slice(0, 4)
      .map((g) => `<a href="../companies/${g.slug}.html">${esc(g.name)}</a>`);
    const andList = (xs) => xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : xs[0];
    const moreCo = pGroups.length > 4 ? ` and ${pGroups.length - 4} more` : "";
    const groupsBit = pGroupLinks.length ? ` — and in ${andList(pGroupLinks)}${moreCo}` : "";
    const lead = c?.hasPage
      ? `Inside the <a href="../webs/${c.slug}.html">${esc(c.name)}</a> — ${c.members.length} people, ${money(c.worth)} combined${groupsBit}.`
      : c ? `In a small group with ${c.members.filter((m) => m !== p.id).map((m) => personLink(peopleById.get(m) || { id: m, name: m }, "../")).join(" and ")}${groupsBit}.`
      : pGroupLinks.length ? `In ${andList(pGroupLinks)}${moreCo}.` : null;
    const egoSvg = ties.length ? svgGraph({
      nodes: [...new Map([
        { id: p.id, name: p.name, worth: p.net_worth_usd_millions ?? 0, rank: p.rank ?? 9e9 },
        ...ties.map((r) => {
          const o = peopleById.get(r.a === p.id ? r.b : r.a) || {};
          return { id: o.id, name: o.name || o.id, worth: o.net_worth_usd_millions ?? 0, rank: o.rank ?? 9e9 };
        }),
      ].map((n) => [n.id, n])).values()],
      links: ties.map(linkOf),
      width: 700, height: Math.min(360, 160 + ties.length * 22),
      labelTop: ties.length + 1,
      hrefOf: (n) => (n.id === p.id ? `#p-${p.id}` : personHref(n.id, "../")),
      ariaLabel: `${p.name}'s circle: ${ties.length} ties`,
    }) : "";
    const receipts = ties.length ? `<details class="moreTies"><summary>${ties.length} ties — ${kindsSummary(ties)}</summary>
      <div class="cd-scroll-x"><table class="ties"><colgroup><col style="width:24%"><col style="width:24%"><col style="width:52%"></colgroup><thead><tr><th>Who</th><th>Relationship</th><th>Evidence</th></tr></thead><tbody>${ties.map((r) => {
        const otherId = r.a === p.id ? r.b : r.a;
        const other = peopleById.get(otherId) || { id: otherId, name: otherId };
        return `<tr><td>${personLink(other, "../")}</td><td>${coLinkify(tieText(r), "../")}${tierMark(r)}</td><td class="evidence">${evidenceCell(r, sourcesById, caveatsById, fn, (s) => coLinkify(s, "../"))}</td></tr>`;
      }).join("\n")}</tbody></table></div>
      ${fn.render()}</details>` : "";
    await fs.writeFile(path.join(peopleDir, `${p.id}.html`), pageShell({
      title: p.name.replace(/&\s*family$/i, ""),
      description: `${p.name} — ${facts}. Who they run with.`,
      prefix: "../", active: "People", bodyClass: "page-person",
      content: `
<header class="hero">
  <h1>${esc(p.name.replace(/&\s*family$/i, ""))}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ""}
  <p class="spec" id="p-${esc(p.id)}">${facts}</p>
</header>
${egoSvg ? `<div class="webFig">${egoSvg}</div>
<p class="graphHint">click a name</p>` : ""}
${runGroups ? `<section class="cd-section">
  <h2>Who ${esc(first)} runs with</h2>
  ${runGroups}
  ${view.anyUnverified ? `<p class="note">† no independent source.</p>` : ""}
</section>` : ""}
${contextTies.length ? `<details class="moreTies"><summary>Shared interests — ${contextTies.length} overlapping holdings</summary>
  <ul class="tieProse">${contextTies.map((r) => tieSentence(r, p.id, "../")).join("\n")}</ul>
</details>` : ""}
${receipts}
<nav class="pager" aria-label="Person pages">
  <a href="index.html">← Everyone</a>
  ${c?.hasPage ? `<a href="../webs/${c.slug}.html">${esc(c.name)} →</a>` : ""}
</nav>`,
    }));
  }

  // people index — everyone, ranked and filterable; tied people link to their
  // page, the rest to their roster record. One destination for "look anyone up".
  const tiedCount = people.filter((p) => hasPersonPage(p.id)).length;
  const ranked = [...roster, ...nonRoster];
  const peopleRows = ranked.map((p) => {
    const c = clusterOf.get(p.id);
    const nTies = (tiesByPerson.get(p.id) || []).length;
    return `<tr data-name="${esc(p.name.toLowerCase())}" data-industry="${esc((p.industry || "").toLowerCase())}"${nTies ? ' data-tied="1"' : ""}>
  <td class="rank">${p.rank ?? "—"}</td>
  <td class="name">${personLink(p, "../")}</td>
  <td>${money(p.net_worth_usd_millions)}</td>
  <td>${flag(p.citizenship, p.country_name, { short: true })}</td>
  <td class="ties">${nTies || "—"}</td>
  <td class="muted">${c ? `<a href="${webHref(c, "../")}">${esc(c.name)}</a>` : "—"}</td>
</tr>`;
  }).join("\n");
  await fs.writeFile(path.join(peopleDir, "index.html"), pageShell({
    title: "People",
    description: `All ${people.length.toLocaleString()} billionaires, ranked by fortune.`,
    prefix: "../", active: "People", bodyClass: "page-people",
    content: `
<header class="hero">
  <h1>Everyone</h1>
  <p class="lead">${people.length.toLocaleString()} people, ranked by fortune — ${money(people.reduce((s, p) => s + (p.net_worth_usd_millions || 0), 0))} between them.</p>
  <p class="spec">${people.filter((p) => hasPersonPage(p.id)).length.toLocaleString()} have ties to others on the list</p>
</header>
<section class="cd-section">
<div class="listTools"><input type="search" id="nameSearch" placeholder="Search all ${people.length.toLocaleString()} names…" aria-label="Search names" autocomplete="off" /><span id="filterNote" class="filterNote" hidden></span></div>
<div class="cd-scroll-x"><table class="rosterTable" id="peopleTable">
<thead><tr><th>Rank</th><th>Name</th><th>Worth</th><th>Country</th><th>Ties</th><th>Group</th></tr></thead>
<tbody>${peopleRows}</tbody>
</table></div>
<p class="note">One flag per person — the citizenship on record; many hold more than one.</p>
</section>`,
  }));

  // ---- webs atlas -----------------------------------------------------------
  const websDir = path.join(outDir, "webs");
  await fs.mkdir(websDir, { recursive: true });
  const TIES_HEAD = `<colgroup><col style="width:22%"><col style="width:3%"><col style="width:22%"><col style="width:17%"><col style="width:36%"></colgroup><thead><tr><th colspan="3">Pair</th><th>Relationship</th><th>Evidence</th></tr></thead>`;
  const edgeRow = (r, fn) => {
    const a = peopleById.get(r.a) || { id: r.a, name: r.a };
    const b = peopleById.get(r.b) || { id: r.b, name: r.b };
    return `<tr id="t-${esc(r.id)}" data-tier="${tierOf(r)}">
  <td>${personLink(a, "../")}</td>
  <td class="relArrow">↔</td>
  <td>${personLink(b, "../")}</td>
  <td>${coLinkify(tieText(r), "../")}${tierMark(r)}</td>
  <td class="evidence">${evidenceCell(r, sourcesById, caveatsById, fn, (s) => coLinkify(s, "../"))}</td>
</tr>`;
  };

  const tendrilLine = (r, prefix, selfCluster) => {
    const ca = clusterOf.get(r.a), cb = clusterOf.get(r.b);
    const other = selfCluster ? (ca === selfCluster ? cb : ca) : null;
    const why = (r.label && r.label !== "(blank)")
      ? r.label.replace(/^related by [^:]*:\s*/i, "")
      : (r.class && r.class !== "unspecified" ? titleCase(r.class) : "");
    const toward = other
      ? `shared across this circle and <a href="${webHref(other, prefix)}">${esc(other.name)}</a>`
      : `shared across <a href="${webHref(ca, prefix)}">${esc(ca.name)}</a> and <a href="${webHref(cb, prefix)}">${esc(cb.name)}</a>`;
    return `<span class="factWho">${personLink(peopleById.get(r.a) || { id: r.a, name: r.a }, prefix)} ↔ ${personLink(peopleById.get(r.b) || { id: r.b, name: r.b }, prefix)}</span><span class="factWhat">${coLinkify(why, prefix)}${why ? " — " : ""}${toward}</span>`;
  };

  for (const [ci, c] of webPages.entries()) {
    const fn = makeFootnotes(c.slug);
    const cNodes = c.members.map((m) => {
      const p = peopleById.get(m) || {};
      return { id: m, name: p.name || m, worth: p.net_worth_usd_millions ?? 0, rank: p.rank ?? 9e9 };
    });
    const cLinks = c.edges.map(linkOf);
    const svg = svgGraph({
      nodes: cNodes, links: cLinks,
      width: 900, height: Math.min(480, 200 + c.members.length * 18),
      labelTop: Math.min(c.members.length, 14),
      hrefOf: (n) => personHref(n.id, "../"),
      ariaLabel: `Map of the ${c.name} group, ${c.members.length} people, ${c.edges.length} ties`,
    });
    const wv = webView(c, peopleById, tendrils, clusterOf);
    const cast = wv.cast.map((p) =>
      `${personLink(p, "../")}<span class="muted">${p.rank ? ` #${p.rank} · ${money(p.net_worth_usd_millions)}` : ""}</span>`
    ).join(" · ");
    const shownFacts = wv.facts.slice(0, 12);
    const tieLines = shownFacts.map((f) => {
      const names = f.people.map((id) => personLink(peopleById.get(id) || { id, name: id }, "../")).join(" · ");
      return `<li><span class="factWho">${names}</span><span class="factWhat">${coLinkify(f.summary, "../")}${f.year ? ` · ${esc(f.year)}` : ""}</span></li>`;
    }).join("\n");
    const reaches = wv.touches.map((r) => `<li>${tendrilLine(r, "../", c)}</li>`).join("\n");
    const prev = webPages[ci - 1], next = webPages[ci + 1];
    await fs.writeFile(path.join(websDir, `${c.slug}.html`), pageShell({
      title: c.name,
      description: `${c.name}: ${c.members.length} people, ${money(c.worth)} combined — who they're tied to.`,
      prefix: "../", active: "Groups", bodyClass: "page-web",
      content: `
<header class="hero">
  <h1>${esc(c.name)}${c.isFamily ? ' <span class="tag tag-family">dynasty</span>' : ""}</h1>
  <p class="lead">${coLinkify(meaningOf(c), "../")}</p>
  <p class="spec"><a href="index.html">All groups</a> · ${c.members.length} people · ${money(c.worth)} combined</p>
</header>
<div class="webFig webFig--full">${svg}</div>
<section class="cd-section">
  <h2>Who's in it</h2>
  <p class="castLine">${cast}</p>
</section>
<section class="cd-section">
  <h2>The ties</h2>
  <ul class="tieProse">${tieLines}</ul>
  ${wv.facts.length > shownFacts.length || wv.claimedCount ? `<p class="note">${[
    wv.facts.length > shownFacts.length ? `${wv.facts.length - shownFacts.length} more ties` : null,
    wv.claimedCount ? `${wv.claimedCount} claimed but not confirmed` : null,
  ].filter(Boolean).join(" · ")}.</p>` : ""}
  <details class="moreTies"><summary>${c.edges.length} ties — ${kindsSummary(c.edges)}</summary>
    <div class="cd-scroll-x"><table class="ties">${TIES_HEAD}<tbody>${c.edges.map((r) => edgeRow(r, fn)).join("\n")}</tbody></table></div>
    ${fn.render()}
  </details>
</section>
${reaches ? `<section class="cd-section"><h2>Where it touches</h2><ul class="tendrilList">${reaches}</ul></section>` : ""}
<nav class="pager" aria-label="Web pages">
  ${prev ? `<a href="${prev.slug}.html">← ${esc(prev.name)}</a>` : ""}
  <span class="pagerNums"><a href="index.html">All groups</a></span>
  ${next ? `<a href="${next.slug}.html">${esc(next.name)} →</a>` : ""}
</nav>`,
    }));
  }

  const companiesDir = path.join(outDir, "companies");
  await fs.rm(companiesDir, { recursive: true, force: true });
  await fs.mkdir(companiesDir, { recursive: true });
  for (const [gi, g] of companies.entries()) {
    const fn = makeFootnotes(`company-${g.slug}`);
    const gNodes = g.members.map((m) => {
      const p = peopleById.get(m) || {};
      return { id: m, name: p.name || m, worth: p.net_worth_usd_millions ?? 0, rank: p.rank ?? 9e9 };
    });
    const svg = g.members.length >= 2 ? svgGraph({
      nodes: gNodes,
      links: g.edges.map(linkOf),
      width: 900, height: Math.min(480, 200 + g.members.length * 18),
      labelTop: Math.min(g.members.length, 14),
      hrefOf: (n) => personHref(n.id, "../"),
      ariaLabel: `${g.name}: ${g.members.length} people, ${g.edges.length} ties`,
    }) : "";
    const cast = g.members.map((m) => {
      const p = peopleById.get(m) || { id: m, name: m };
      const via = VIA_TEXT[g.memberVia.get(m)] || "";
      const bits = [p.rank ? ` #${p.rank}` : null, p.net_worth_usd_millions ? money(p.net_worth_usd_millions) : null, via].filter(Boolean).join(" · ");
      return `${personLink(p, "../")}<span class="muted">${bits}</span>`;
    }).join(" · ");
    const facts = factsOf(g.edges);
    const tieLines = facts.map((f) => {
      const names = f.people.map((id) => personLink(peopleById.get(id) || { id, name: id }, "../")).join(" · ");
      return `<li><span class="factWho">${names}</span><span class="factWhat">${coLinkify(f.summary, "../")}${f.year ? ` · ${esc(f.year)}` : ""}</span></li>`;
    });
    for (const r of g.edges.filter((e) => tierOf(e) === "feed")) {
      const a = peopleById.get(r.a) || { id: r.a, name: r.a };
      const b = peopleById.get(r.b) || { id: r.b, name: r.b };
      const what = r.label && r.label !== "(blank)" ? r.label : cleanSummary(r);
      tieLines.push(`<li class="is-claimed"><span class="factWho">${personLink(a, "../")} ↔ ${personLink(b, "../")}</span><span class="factWhat">${coLinkify(what, "../")}${tierMark(r)}</span></li>`);
    }
    const claimed = g.edges.filter((r) => tierOf(r) === "feed").length;
    const parents = g.parentWebs.map((c) => `<a href="../webs/${c.slug}.html">${esc(c.name)}</a>`).join(" · ");
    const historyBits = [...(g.lineage || [])].sort((a, b) => (a.year ?? 9e9) - (b.year ?? 9e9)).map((l) => {
      const other = l.other ? `<a href="${l.other.slug}.html">${esc(l.other.name)}</a>` : esc(l.otherName || "");
      const verb = l.dir === "from"
        ? ({ acquired: "acquired by", renamed: "became", merged: "merged into", spun_off: "spun out of", restructured: "restructured under" })[l.kind] || l.kind
        : ({ acquired: "absorbed", renamed: "formerly", merged: "merged with", spun_off: "spun off", restructured: "restructured over" })[l.kind] || l.kind;
      return `${verb} ${other}${l.year ? ` (${l.year})` : ""}${l.note ? ` — ${esc(l.note)}` : ""}`;
    });
    const ticker = g.ticker ? ` <span class="tag">${esc(g.ticker.split("-")[0])}</span>` : "";
    const prev = companies[gi - 1], next = companies[gi + 1];
    await fs.writeFile(path.join(companiesDir, `${g.slug}.html`), pageShell({
      title: g.name,
      description: `${g.name}: ${g.members.length} billionaires — owners, founders, investors, board members.`,
      prefix: "../", active: "Companies", bodyClass: "page-web",
      content: `
<header class="hero">
  <h1>${esc(g.name)}${ticker}</h1>
  <p class="spec"><a href="index.html">All companies</a> · ${g.members.length} people · ${money(g.worth)} combined${parents ? ` · in ${parents}` : ""}</p>
  ${historyBits.length ? `<p class="spec">${historyBits.join(" · ")}</p>` : ""}
</header>
${svg ? `<div class="webFig webFig--full">${svg}</div>` : ""}
<section class="cd-section">
  <h2>Who's in it</h2>
  <p class="castLine">${cast}</p>
</section>
${tieLines.length ? `<section class="cd-section">
  <h2>${facts.length ? "The ties" : "Claimed ties"}</h2>
  <ul class="tieProse">${tieLines.join("\n")}</ul>
  ${claimed && facts.length ? `<p class="note">† no independent source.</p>` : ""}
  <details class="moreTies"><summary>${g.edges.length} ties — ${kindsSummary(g.edges)}</summary>
    <div class="cd-scroll-x"><table class="ties">${TIES_HEAD}<tbody>${g.edges.map((r) => edgeRow(r, fn)).join("\n")}</tbody></table></div>
    ${fn.render()}
  </details>
</section>` : ""}
${g.parentWebs.length >= 2 ? `<section class="cd-section"><h2>Spans ${g.parentWebs.length} groups</h2><p class="castLine">Its people sit in different groups — ${parents} — and <a href="${g.slug}.html">${esc(g.name)}</a> is the link between them.</p></section>` : ""}
<nav class="pager" aria-label="Company pages">
  ${prev ? `<a href="${prev.slug}.html">← ${esc(prev.name)}</a>` : ""}
  <span class="pagerNums"><a href="index.html">All companies</a></span>
  ${next ? `<a href="${next.slug}.html">${esc(next.name)} →</a>` : ""}
</nav>`,
    }));
  }

  // companies/index.html — the directory; bridging companies first
  {
    const coRow = (c) => {
      const tops = c.members.slice(0, 4)
        .map((m) => personLink(peopleById.get(m) || { id: m, name: m }, "../")).join(" · ");
      const span = c.parentWebs.length >= 2
        ? ` — in ${c.parentWebs.map((w) => `<a href="../webs/${w.slug}.html">${esc(w.name)}</a>`).join(" and ")}`
        : c.parentWebs.length === 1 ? ` — in the <a href="../webs/${c.parentWebs[0].slug}.html">${esc(c.parentWebs[0].name)}</a>` : "";
      return `<div class="webDirRow">
    <strong><a href="${c.slug}.html">${esc(c.name)}</a>${c.ticker ? ` <span class="tag">${esc(c.ticker.split("-")[0])}</span>` : ""}</strong>
    <span class="webDirWhat">${tops}${c.members.length > 4 ? ` +${c.members.length - 4}` : ""}${span}</span>
    <span class="webDirMeta">${c.members.length} people · ${money(c.worth)}</span>
  </div>`;
    };
    const indGroups = new Map();
    for (const c of companies) {
      const ind = c.industry || "other";
      if (!indGroups.has(ind)) indGroups.set(ind, []);
      indGroups.get(ind).push(c);
    }
    const indSections = [...indGroups.entries()]
      .map(([ind, cs]) => ({ ind, cs, worth: cs.reduce((s, c) => s + c.worth, 0) }))
      .sort((a, b) => b.worth - a.worth || a.ind.localeCompare(b.ind))
      .map((g) => `<section class="cd-section" id="ind-${slugify(g.ind)}">
  <h2>${esc(titleCase(g.ind))}</h2>
  <div class="webDir">${g.cs.map(coRow).join("\n")}</div>
</section>`).join("\n");
    await fs.writeFile(path.join(companiesDir, "index.html"), pageShell({
      title: "Companies",
      description: "The companies behind the fortunes — who owns them, who founded them, which groups they join up.",
      prefix: "../", active: "Companies", bodyClass: "page-webs",
      content: `
<header class="hero">
  <h1>Companies</h1>
  <p class="lead">The companies the fortunes are tied to — owned outright, founded, held, or run from a board seat.</p>
</header>
${bridgeCos.length ? `<section class="cd-section">
  <h2>The bridges</h2>
  <p class="lead">Companies whose billionaires sit in more than one group — these are the links between the groups.</p>
  <div class="webDir">${bridgeCos.map(coRow).join("\n")}</div>
</section>` : ""}
${indSections}
`,
    }));
  }

  // the territory map — webs as landmasses sized by combined fortune, joined
  // by the claimed tendrils between them. Person-level detail lives on the
  // web pages; at atlas scale the reader needs structure, not 600 nodes.
  const webBySlug = new Map(clusters.map((c) => [c.slug, c]));
  const mapNodes = new Map();
  for (const c of clusters) if (c.hasPage) mapNodes.set(c.slug, c);
  const webLinks = [];
  {
    const seenPairs = new Set();
    for (const r of tendrils) {
      const ca = clusterOf.get(r.a), cb = clusterOf.get(r.b);
      if (!ca || !cb) continue;
      mapNodes.set(ca.slug, ca); mapNodes.set(cb.slug, cb);
      const k = [ca.slug, cb.slug].sort().join("|");
      if (seenPairs.has(k)) continue;
      seenPairs.add(k);
      webLinks.push({ a: ca.slug, b: cb.slug, tier: "context" });
    }
  }
  const fullSvg = svgGraph({
    nodes: [...mapNodes.values()].map((c) => ({
      id: c.slug, name: c.name.replace(/ web$/, ""), worth: c.worth,
      rank: Math.min(...c.members.map((m) => peopleById.get(m)?.rank ?? 9e9)),
    })),
    links: webLinks,
    width: 1040, height: 540, labelTop: 22,
    hrefOf: (n) => webHref(webBySlug.get(n.id), "../"),
    ariaLabel: `Map of ${mapNodes.size} groups and ${webLinks.length} shared-interest links between them`,
  });

  const hingeLead = hinges.slice(0, 3).map((h) => {
    const parts = h.parts.slice(0, 3).map((part) => subwebLink(part, "../"));
    const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
    return `${personLink(peopleById.get(h.id) || { id: h.id, name: h.id }, "../")} connects ${list}`;
  }).join(" · ");

  const hingeCards = hinges.slice(0, 8).map((h) => {
    const p = peopleById.get(h.id) || { id: h.id, name: h.id };
    const partNames = h.parts.slice(0, 3).map((part) => subwebLink(part, "../"));
    const bridgeLines = h.parts.slice(0, 3).map((part) => {
      const members = new Set(part);
      const e = (tiesByPerson.get(h.id) || [])
        .find((r) => members.has(r.a === h.id ? r.b : r.a) && tierOf(r) !== "context");
      if (!e) return "";
      const other = peopleById.get(e.a === h.id ? e.b : e.a) || { id: e.a === h.id ? e.b : e.a, name: e.a === h.id ? e.b : e.a };
      const s = cleanSummary(e);
      return `<li>↔ ${personLink(other, "../")} <span class="muted">— ${coLinkify(s.length > 90 ? `${s.slice(0, 87).trimEnd()}…` : s, "../")}</span></li>`;
    }).filter(Boolean).join("\n");
    const splitList = partNames.length > 1
      ? `${partNames.slice(0, -1).join(", ")} and ${partNames[partNames.length - 1]}` : partNames[0];
    return `<div class="hinge">
      <h3>${personLink(p, "../")}</h3>
      <p class="muted">${p.rank ? `#${p.rank}` : "unranked"} · ${money(p.net_worth_usd_millions)}</p>
      <p>Connects ${splitList} — inside the <a href="${webHref(h.cluster, "../")}">${esc(h.cluster.name)}</a>.</p>
      ${bridgeLines ? `<ul class="hingeTies">${bridgeLines}</ul>` : ""}
    </div>`;
  }).join("\n");

  const webDir = webPages.map((c) => `<div class="webDirRow">
    <strong><a href="${c.slug}.html">${esc(c.name)}</a>${c.isFamily ? ' <span class="tag tag-family">dynasty</span>' : ""}</strong>
    <span class="webDirWhat">${coLinkify(meaningOf(c), "../")}</span>
    <span class="webDirMeta">${c.members.length} people · ${money(c.worth)}</span>
  </div>`).join("\n");

  const bridgeCoNames = companies.filter((c) => c.parentWebs.length >= 2).slice(0, 4)
    .map((c) => `<a href="../companies/${c.slug}.html">${esc(c.name)}</a>`).join(" · ");

  const pairRows = smallGroups.map((c) => {
    const names = c.members.map((m) => personLink(peopleById.get(m) || { id: m, name: m }, "../"));
    const edge = c.edges[0];
    const kind = edge ? cleanSummary(edge) : "";
    return `<li>${names.join(c.members.length === 2 ? " ↔ " : " · ")} <span class="muted">— ${coLinkify(kind, "../")} · ${money(c.worth)}</span></li>`;
  }).join("\n");

  const tendrilList = tendrils.slice(0, 15).map((r) => `<li>${tendrilLine(r, "../")}</li>`).join("\n");

  await fs.writeFile(path.join(websDir, "index.html"), pageShell({
    title: "Groups",
    description: "The families, founding teams, early investors and connectors between the world's richest people.",
    prefix: "../", active: "Groups", bodyClass: "page-webs",
    content: `
<header class="hero">
  <h1>Who's connected to whom</h1>
  <p class="lead">Families sharing one fortune, teams that built companies together, early investors who backed the same founders.</p>
  <p class="spec">Families · founders · early backers · boardrooms</p>
</header>

<div class="webFig webFig--full">${fullSvg}</div>
<p class="graphHint">Each shape is a group — size is combined fortune · click to open it</p>

${hingeCards ? `<section id="hinges" class="cd-section">
  <h2>Between the groups</h2>
  <p class="lead">People with ties into more than one group: ${hingeLead}.${bridgeCoNames ? ` The companies doing the same job: ${bridgeCoNames}.` : ""}</p>
  <div class="hingeGrid">${hingeCards}</div>
</section>` : ""}

<section id="webs" class="cd-section">
  <h2>The groups</h2>
  <div class="webDir">${webDir}</div>
</section>

<section class="cd-section">
  <p class="moreLink"><a href="../companies/index.html">The companies behind the fortunes →</a></p>
</section>

${pairRows ? `<section id="pairs" class="cd-section">
  <h2>Pairs &amp; triads</h2>
  <ul class="pairList">${pairRows}</ul>
</section>` : ""}

${tendrilList ? `<section id="tendrils" class="cd-section">
  <h2>Where the groups overlap</h2>
  <p class="lead">Holdings and interests shared across groups.</p>
  <ul class="tendrilList">${tendrilList}</ul>
</section>` : ""}
`,
  }));

  // ---- roster shards — the reference layer ----------------------------------
  const rosterDir = path.join(outDir, "roster");
  await fs.mkdir(rosterDir, { recursive: true });
  const rosterRow = (p, prefix) => `
<tr id="p-${esc(p.id)}" itemscope itemtype="https://schema.org/Person" itemid="${esc(p.id)}"
    data-id="${esc(p.id)}" data-rank="${p.rank ?? ""}" data-worth="${p.net_worth_usd_millions ?? ""}"
    data-country="${esc(p.citizenship || "")}" data-industry="${esc(p.industry || "")}">
  <td class="rank">${p.rank ?? "—"}</td>
  <td class="name"><a itemprop="name" href="${personHref(p.id, prefix)}">${esc(p.name)}</a>${p.at_least_1bn === false ? ' <span class="tag tag-sub tt" tabindex="0">sub-$1B<span class="tt-bubble">on the list but under the $1bn line</span></span>' : ""}</td>
  <td class="num">${money(p.net_worth_usd_millions)}</td>
  <td>${flag(p.citizenship, p.country_name, { short: true })}</td>
  <td>${p.industry ? `<a href="${indHref(p.industry, prefix)}">${esc(titleCase(p.industry))}</a>` : "—"}</td>
  <td>${sourceLinks(p, prefix) || "—"}</td>
  <td class="ties">${(tiesByPerson.get(p.id) || []).length || "—"}</td>
</tr>`;
  const ROSTER_HEAD = `<thead><tr><th>#</th><th>Name</th><th>Worth</th><th>Country</th><th>Industry</th><th>Source</th><th>Ties</th></tr></thead>`;
  const allShards = [...shards, nonRoster];
  for (const [i, shard] of allShards.entries()) {
    const isLast = i === allShards.length - 1;
    const title = isLast ? "Roster — off-list people" : `Roster — ranks ${shard[0]?.rank}–${shard[shard.length - 1]?.rank}`;
    const pager = `<nav class="pager" aria-label="Roster pages">
  ${i > 0 ? `<a href="${i}.html">← ${i === 1 ? "Ranks 1–250" : `Page ${i}`}</a>` : ""}
  <span class="pagerNums">${allShards.map((_, j) => j === i ? `<strong>${j + 1}</strong>` : `<a href="${j + 1}.html">${j + 1}</a>`).join(" · ")}</span>
  ${i < allShards.length - 1 ? `<a href="${i + 2}.html">Page ${i + 2} →</a>` : ""}
</nav>`;
    await fs.writeFile(path.join(rosterDir, `${i + 1}.html`), pageShell({
      title,
      description: `${title} — the billionaire roster, reference layer.`,
      prefix: "../", active: "Roster", bodyClass: "page-roster",
      content: `
<header class="hero"><h1>${esc(title)}</h1><p class="spec">The full list</p></header>
<section class="cd-section">
${pager}
<div class="cd-scroll-x"><table class="rosterTable">
${ROSTER_HEAD}
<tbody>${shard.map((p) => rosterRow(p, "../")).join("")}</tbody>
</table></div>
<p class="note">One flag per person — the citizenship on record; many hold more than one.</p>
${pager}
</section>`,
    }));
  }

  await fs.rm(path.join(outDir, "names"), { recursive: true, force: true });
  await fs.rm(path.join(outDir, "groups"), { recursive: true, force: true });

  // ---- index — the essay ----------------------------------------------------


  const topWeb = webPages[0];
  const topSvg = topWeb ? svgGraph({
    nodes: topWeb.members.map((m) => {
      const p = peopleById.get(m) || {};
      return { id: m, name: p.name || m, worth: p.net_worth_usd_millions ?? 0, rank: p.rank ?? 9e9 };
    }),
    links: topWeb.edges.map(linkOf),
    width: 900, height: 420, labelTop: Math.min(topWeb.members.length, 14),
    hrefOf: (n) => personHref(n.id, ""),
    ariaLabel: `The largest group: ${topWeb.name}, ${topWeb.members.length} people, ${topWeb.edges.length} ties`,
  }) : "";

  // ---- overview lenses — ways of looking at the same people -----------------
  // every panel below is computed from the data, not written around it
  const webShort = (c) => c.name.replace(/\s+web$/i, "");
  const familyWebs = webPages.filter((c) => c.isFamily).sort((a, b) => b.worth - a.worth);
  const famRoster = familyWebs.map((c) =>
    `<a class="famRow" href="webs/${c.slug}.html"><strong>${esc(webShort(c).replace(/\s+family$/i, ""))}</strong><span class="muted">${c.members.length} people</span><span class="famWorth">${money(c.worth)}</span></a>`
  ).join("\n");

  // homepage lenses are curated — the point is what the money DID, not the
  // evidence fields behind it. Each item: linked names + what it means.
  const pl = (id, label) => {
    const p = peopleById.get(id) || { id, name: id };
    return personLink(label ? { id: p.id, name: label } : p, "");
  };
  const moneyLines = [
    `<li>${pl("andreas-von-bechtolsheim", "Bechtolsheim")} → ${pl("larry-page", "Page")} · ${pl("sergey-brin", "Brin")} <span class="muted">— wrote Google its first cheque: $100,000 in 1998, before the company existed. It made him a billionaire.</span></li>`,
    `<li>${pl("peter-thiel", "Thiel")} → ${pl("mark-zuckerberg", "Zuckerberg")} <span class="muted">— $500,000 for 10% of Facebook in 2004, the first outside money Zuckerberg took — and a board seat he kept for 18 years.</span></li>`,
    `<li>${pl("masayoshi-son", "Son")} → ${pl("jack-ma", "Ma")} <span class="muted">— $20 million into Alibaba in 2000, decided after one meeting. It returned tens of billions.</span></li>`,
    `<li>${pl("warren-buffett", "Buffett")} → ${pl("wang-chuanfu", "Wang Chuanfu")} <span class="muted">— $230 million for 10% of BYD in 2008. Munger called Wang "a combination of Edison and Jack Welch".</span></li>`,
  ].join("\n");
  const boardLines = [
    `<li>${pl("larry-ellison", "Ellison")} → ${pl("elon-musk", "Musk")} <span class="muted">— joined Tesla's board in 2018, calling himself Musk's close friend — then put about $1 billion into the Twitter takeover.</span></li>`,
    `<li>${pl("john-doerr", "Doerr")} · ${pl("michael-moritz", "Moritz")} → ${pl("larry-page", "Page")} · ${pl("sergey-brin", "Brin")} <span class="muted">— Kleiner Perkins and Sequoia paid roughly $12.5m each for Google in 1999; the board seats came with the money.</span></li>`,
    `<li>${pl("kimbal-musk", "Kimbal Musk")} <span class="muted">— on Tesla's board since 2004: the family keeps a second vote inside the company.</span></li>`,
  ].join("\n");

  const bridgeLead = bridgeCos.slice(0, 3)
    .map((c) => `<a href="companies/${c.slug}.html">${esc(c.name)}</a>`).join(" · ");

  const industries = new Map();
  for (const p of roster) {
    if (!p.industry) continue;
    const cur = industries.get(p.industry) || { n: 0, worth: 0 };
    cur.n += 1; cur.worth += p.net_worth_usd_millions || 0;
    industries.set(p.industry, cur);
  }
  const marketRows = [...industries.entries()]
    .sort((a, b) => b[1].worth - a[1].worth).slice(0, 6)
    .map(([ind, v]) => `<a class="marketRow" href="people/index.html?industry=${encodeURIComponent(ind)}"><strong>${esc(titleCase(ind))}</strong><span class="muted">${v.n.toLocaleString()} people</span><span class="marketWorth">${money(v.worth)}</span></a>`)
    .join("\n");

  const territoryRows = webPages.slice(0, 6).map((c) => `<div class="webDirRow">
    <strong><a href="webs/${c.slug}.html">${esc(c.name)}</a>${c.isFamily ? ' <span class="tag tag-family">dynasty</span>' : ""}</strong>
    <span class="webDirWhat">${coLinkify(meaningOf(c), "")}</span>
    <span class="webDirMeta">${c.members.length} people · ${money(c.worth)}</span>
  </div>`).join("\n");

  await fs.writeFile(path.join(outDir, "index.html"), pageShell({
    title: "Overview",
    description: "How billionaires connect — families, co-founders, early investors and board overlaps across the world's richest people.",
    prefix: "", active: "Overview", bodyClass: "page-index",
    content: `
<!--bbb:micro-cross-links-->
<header class="hero">
  <h1>The Billionaire Database</h1>
  <p class="lead">${roster.length.toLocaleString()} people control ${money(rosterWorth)} between them — and almost none of it was made alone. These fortunes were co-founded, inherited together, backed early or governed from shared boardrooms.</p>
</header>

${topWeb ? `<div class="webFig webFig--full">${topSvg}</div>
<p class="graphHint"><a href="webs/${esc(topWeb.slug)}.html">${esc(topWeb.name)}</a> — the biggest group · click a name</p>` : ""}

<section class="cd-section">
  <div class="lensGrid">
    <article class="lens lens--lead">
      <div class="lensSide"><p class="lensKind">Families</p>
      <h2>One fortune, several billionaires</h2></div>
      <div><p>${familyWebs.length} of the ${webPages.length} groups on the rich list are single families:</p>
      <div class="famGrid">${famRoster}</div></div>
    </article>
    <article class="lens">
      <p class="lensKind">Co-founders</p>
      <h2>They built it together</h2>
      <p>${personLink(peopleById.get("elon-musk") || { id: "elon-musk", name: "Elon Musk" }, "")} built Zip2 with his brother and PayPal alongside ${personLink(peopleById.get("peter-thiel") || { id: "peter-thiel", name: "Peter Thiel" }, "")}. ${personLink(peopleById.get("larry-page") || { id: "larry-page", name: "Larry Page" }, "")} and ${personLink(peopleById.get("sergey-brin") || { id: "sergey-brin", name: "Sergey Brin" }, "")} built Google together; ${personLink(peopleById.get("thomas-secunda") || { id: "thomas-secunda", name: "Thomas Secunda" }, "")} and ${personLink(peopleById.get("charles-zegar") || { id: "charles-zegar", name: "Charles Zegar" }, "")} built Bloomberg with ${personLink(peopleById.get("michael-bloomberg") || { id: "michael-bloomberg", name: "Michael Bloomberg" }, "")}. Most of the top fifty got there in pairs or teams — the <a href="companies/paypal-alumni.html">PayPal</a> and <a href="companies/google.html">Google</a> founding groups alone account for a dozen of them.</p>
    </article>
    <article class="lens">
      <p class="lensKind">Bridges</p>
      <h2>Companies connect the groups</h2>
      <p>${bridgeCos.length} companies have billionaires in more than one group — ${bridgeLead}.${bridgeCos[0] ? ` A person can look like the link between two groups when the real link is a shared company: <a href="companies/${bridgeCos[0].slug}.html">${esc(bridgeCos[0].name)}</a> alone has people in ${bridgeCos[0].parentWebs.length} different groups.` : ""} <a href="companies/index.html">All companies →</a></p>
    </article>
    <article class="lens">
      <p class="lensKind">Early investors</p>
      <h2>The first money in</h2>
      <p>Stakes bought when the companies were worth almost nothing — what was paid, and what it became:</p>
      <ul class="miniFacts">${moneyLines}</ul>
    </article>
    <article class="lens">
      <p class="lensKind">Board seats</p>
      <h2>Still on the board</h2>
      <p>Board seats held by people on this list — the seat usually came with an investment or a family stake:</p>
      <ul class="miniFacts">${boardLines}</ul>
    </article>
  </div>
</section>

<section class="cd-section">
  <h2>What they sell</h2>
  <p class="lead">Combined fortune by industry — tech is a fifth of the list, finance and retail most of the rest.</p>
  <div class="marketRows">${marketRows}</div>
</section>

<section class="cd-section">
  <h2>The biggest groups</h2>
  <p class="lead">The largest groups of connected fortunes on the list:</p>
  <div class="webDir">${territoryRows}</div>
  <p class="moreLink"><a href="webs/index.html">Every group →</a> · <a href="people/index.html">everyone ranked →</a></p>
</section>

`,
  }));

  // ---- gaps — self-contained research briefs, one markdown file per gap class
  const gapsDir = path.join(outDir, "gaps");
  await fs.mkdir(gapsDir, { recursive: true });
  const generated = new Date().toISOString().slice(0, 10);
  const pairCols = ["person_a", "person_b", "current signal"];
  const briefs = [];

  const untiedTop = roster.filter((p) => !p.sourced_tie_count);
  briefs.push({
    file: "brief-top-roster-ties.md",
    title: "Top roster people with no sourced ties",
    count: untiedTop.length,
    intro: "The highest-ranked billionaires with no independently sourced person-to-person tie — the most valuable research targets: famous, central, and currently undocumented.",
    task: "For each person, find person-to-person relationships with OTHER billionaires (or near-billionaires on this list) that can be cited to a reputable outlet: co-founders, co-investors, board overlaps, family ties, major disputes, succession relationships. Family ties (siblings, cousins, spouses, parent–child) are especially welcome — dynasties are where billionaire power hides.",
    columns: ["rank", "name", "person_uri", "worth_usd_millions", "country", "industry", "existing weak ties"],
    rows: untiedTop.map((p) => [p.rank, p.name, p.id, Math.round(p.net_worth_usd_millions || 0), (p.citizenship || "").toUpperCase(), p.industry || "", p.tie_count || 0]),
  });

  const apiLabeled = relationships.filter((r) => r.origin === "api_related" && r.class === "api_labeled");
  briefs.push({
    file: "brief-api-labeled-pairs.md",
    title: "Feed-labeled pairs lacking an independent source",
    count: apiLabeled.length,
    intro: "The Forbes-derived /related feed asserts a relationship label for each pair below (Family, Cofounder, Business Partner, …) but we have no independent citation. Each is currently a 'feed-labeled' tie — your job is to promote or kill it with real sources.",
    task: "For each pair, verify the asserted relationship against reputable reporting. If confirmed, return a row in the format below with source URLs. If the label is wrong or unverifiable, say so in evidence_summary and mark confidence low — a debunked feed claim is also valuable.",
    columns: pairCols,
    rows: apiLabeled.map((r) => {
      const a = peopleById.get(r.a), b = peopleById.get(r.b);
      return [`${r.a} (${a?.name || "?"})`, `${r.b} (${b?.name || "?"})`, `feed says: ${relTypeLabel(r)}`];
    }),
  });

  const derivedOnly = relationships.filter((r) => r.origin.startsWith("derived_"));
  briefs.push({
    file: "brief-derived-pairs.md",
    title: "Pairs sharing assets or holdings — unverified",
    count: derivedOnly.length,
    intro: "These pairs appear together only because the feeds associate them with the same company or asset (e.g. both hold shares, both linked to the same financial asset). That is NOT evidence of a relationship — but it is where undiscovered family ties and co-investment structures tend to hide.",
    task: "Research each pair: is there a real relationship (family, co-investment, shared vehicle, joint venture, board overlap) behind the shared exposure, or is it coincidental? Return sourced ties only; mark coincidental overlaps out by simply not returning them.",
    columns: pairCols,
    rows: derivedOnly.map((r) => {
      const a = peopleById.get(r.a), b = peopleById.get(r.b);
      return [`${r.a} (${a?.name || "?"})`, `${r.b} (${b?.name || "?"})`, `${r.origin === "derived_shared_holding" ? "shared holding" : "shared asset"}: ${r.label || r.type || "—"}`];
    }),
  });

  const surnameGroups = new Map();
  for (const p of roster) {
    const sn = surnameOf(p.name);
    if (!sn) continue;
    const key = `${sn}|${p.citizenship || ""}`;
    if (!surnameGroups.has(key)) surnameGroups.set(key, []);
    surnameGroups.get(key).push(p);
  }
  const existingPair = new Set(relationships.map((r) => [r.a, r.b].sort().join("|")));
  const surnameCandidates = [];
  for (const [, group] of surnameGroups) {
    if (group.length < 2) continue;
    for (let i = 0; i < group.length; i++)
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i], b = group[j];
        if (existingPair.has([a.id, b.id].sort().join("|"))) continue;
        surnameCandidates.push([Math.min(a.rank, b.rank), a, b]);
      }
  }
  surnameCandidates.sort((x, y) => (x[0] ?? 9e9) - (y[0] ?? 9e9));
  briefs.push({
    file: "brief-family-surname-candidates.md",
    title: "Same-surname, same-country pairs (possible undetected family)",
    count: surnameCandidates.length,
    intro: "Computed gap: pairs of roster people who share a surname and citizenship but have no recorded relationship of any tier. Billionaire wealth is heavily dynastic — many of these will be spouses, siblings or cousins the feeds never connected.",
    task: "For each pair, determine whether they are actually related (spouse, sibling, parent–child, cousin, unrelated same-name coincidence). Return sourced rows for real ties only.",
    columns: pairCols,
    rows: surnameCandidates.map(([, a, b]) => [`${a.id} (${a.name})`, `${b.id} (${b.name})`, "same surname + citizenship — unresearched"]),
  });

  const briefCos = companies;
  briefs.push({
    file: "brief-company-ties.md",
    title: "Company memberships — verify and complete",
    count: briefCos.length,
    intro: "Companies group billionaires the way ties group people — but 'membership' covers very different attachments: owning the fortune's source, founding it, holding shares, sitting on the board, or softer structures (strategic partners, shared vehicles, ecosystems) that never show up in wealth feeds. Most memberships below come from feed labels and wealth-source tags, not verified records — and most companies are missing members we haven't captured at all.",
    task: "For each company, list every billionaire (on or near this list) with a real connection, naming the kind: founder/co-founder, heir/inherited stake, major shareholder, board member, executive, early investor — or a soft structure that doesn't fit a clean category (strategic arrangement, shared vehicle, ecosystem partner). Include source URLs. Also flag anyone listed under 'members we have' who doesn't actually belong.",
    columns: ["company", "company_uri", "members we have", "combined worth usd_millions"],
    rows: briefCos.map((c) => [c.name, c.slug,
      c.members.slice(0, 6).map((m) => `${peopleById.get(m)?.name || m} (${VIA_TEXT[c.memberVia.get(m)] || "?"})`).join("; "),
      Math.round(c.worth)]),
  });

  briefs.push({
    file: "brief-company-lineage.md",
    title: "Company name histories — renames, takeovers, absorptions",
    count: companies.length,
    intro: "Company names are not stable: takeovers and renames change who the money belongs to and what the name stands for (Twitter→X under Musk, Square→Block under Dorsey). 'Known history' shows what the lineage table holds — empty means unresearched.",
    task: "For each company, list predecessor names, acquirers and renames with years. Flag any rename that marked a change of owner or direction, and any acquisition that moved billionaire wealth between companies.",
    columns: ["company", "company_uri", "known history"],
    rows: companies.map((c) => [c.name, c.slug,
      (c.lineage || []).map((l) => `${l.dir === "from" ? "→" : "←"} ${l.other?.name || l.otherName || "?"} (${l.kind}${l.year ? ` ${l.year}` : ""})`).join("; ")]),
  });

  const missingFields = roster.filter((p) => p.age == null || p.gender == null);
  briefs.push({
    file: "brief-missing-fields.md",
    title: "Roster rows missing basic fields",
    count: missingFields.length,
    intro: `Roster completeness: ${people.filter((p) => p.in_roster && p.age == null).length.toLocaleString()} people have no age recorded, mostly because the source feed omits it for lower-ranked entries.`,
    task: "For each person, fill what you can verify: age (or birth year), gender. Also flag anyone whose citizenship or industry looks wrong.",
    columns: ["rank", "name", "person_uri", "missing"],
    rows: missingFields.map((p) => [p.rank, p.name, p.id, ["age", "gender"].filter((f) => p[f] == null).join(", ")]),
    scalar: true,
  });

  briefs.push({
    file: "brief-non-roster-people.md",
    title: "People referenced by the feeds but absent from the roster",
    count: nonRoster.length,
    intro: `These ${nonRoster.length} people appear in the /related feeds (i.e. some billionaire's feed names them) but are not in the 17 Nov 2026 snapshot roster — possibly sub-$1bn, recently dropped, or name-resolution artifacts.`,
    task: "For each person: identify who they are, their approximate net worth, and which billionaire(s) connect them to the dataset (the tie is hinted in 'linked via'). Return any sourced person-to-person ties in the standard format.",
    columns: ["person_uri", "name", "linked via"],
    rows: nonRoster.map((p) => {
      const links = (tiesByPerson.get(p.id) || []).slice(0, 3)
        .map((r) => peopleById.get(r.a === p.id ? r.b : r.a)?.name || "?").join(", ");
      return [p.id, p.name, links];
    }),
  });

  const donorCandidates = roster
    .filter((p) => (p.rank ?? 9e9) <= 100 || /murdoch|thiel|musk|adelson|koch|soros|mercer|moskovitz|singer|griffin/i.test(p.name));
  briefs.push({
    file: "brief-political-and-donor-webs.md",
    title: "Political funding and donor webs — the dark part of the map",
    count: donorCandidates.length,
    intro: "Party donations, political appointments, lobby channels, media patronage — the ties that matter most for power barely appear in wealth data. This brief targets the highest-profile names for politically relevant ties.",
    task: "For each person, research: significant political donations (party + amount + year), formal or informal roles in campaigns or administrations, PACs or dark-money vehicles they fund, and person-to-person ties with other billionaires formed around politics. Cite FEC records, OpenSecrets, national electoral registers or reputable reporting.",
    columns: ["rank", "name", "person_uri", "country", "known political profile"],
    rows: donorCandidates
      .map((p) => [p.rank ?? "—", p.name, p.id, (p.citizenship || "").toUpperCase(), ""]),
  });

  const overview = {
    file: "overview.md",
    title: "How to use these briefs",
    intro: `Each file in this directory is a self-contained research brief: context, task, return schema, and the gap rows. Upload a file to a research-capable model, let it work, and hand the returned CSV back — it merges straight into the dataset as new curated/verified edges.`,
    task: "Pick a brief by priority (higher-listed = higher value), run it, return CSV rows matching the schema inside that file.",
    columns: ["file", "what it covers", "rows"],
    rows: briefs.map((b) => [`${b.file}`, b.title, b.rows.length]),
  };

  for (const b of [overview, ...briefs]) {
    await fs.writeFile(path.join(gapsDir, b.file), gapMd({ ...b, generated }));
  }

  await fs.writeFile(path.join(gapsDir, "index.html"), pageShell({
    title: "Research gaps",
    description: "The questions this snapshot can't answer, packaged as downloadable researchable sheet.",
    prefix: "../", active: "Gaps", bodyClass: "page-gaps",
    content: `
<header class="hero">
  <h1>Things <em>we</em> don't know — yet</h1>
  <p class="lead">Donor webs, unverified claims, missing family ties, undocumented company roles — each gap below is a downloadable research brief about the people.</p>
  <p class="spec">Our billionaire database lists ${roster.length.toLocaleString()} billionaires, but we only have detailed links between ${tiedCount.toLocaleString()} of them and need more data about the other ${(roster.length - tiedCount).toLocaleString()} billionaires.</p>
</header>
<section class="cd-section">
  <div class="briefList">
    ${briefs.map((b) => `<section class="brief">
      <h3>${esc(b.title)} <a class="dl" href="${b.file}" download>↓ .md</a></h3>
      <p>${esc(b.intro)}</p>
      <p class="muted">${b.rows.length.toLocaleString()} rows · <a href="${b.file}">${b.file}</a></p>
    </section>`).join("\n")}
  </div>
</section>
<section class="cd-section">
  <h2>Help fill the gaps</h2>
  <p class="lead">Corrections, missing people, answers to a brief — PRs welcome at the <a href="https://github.com/Better-Britain/reports/tree/main/site/assets/microsites/billionaire-database">billionaire-database source</a>.</p>
</section>`,
  }));

  // ---- static assets ---------------------------------------------------------
  for (const f of ["style.css", "app.js"]) {
    try { await fs.copyFile(path.join(sourceDir, f), path.join(outDir, f)); } catch {}
  }
  const fontsSrc = path.join(sourceDir, "fonts"), fontsDst = path.join(outDir, "fonts");
  try {
    await fs.mkdir(fontsDst, { recursive: true });
    for (const f of await fs.readdir(fontsSrc)) {
      await fs.copyFile(path.join(fontsSrc, f), path.join(fontsDst, f));
    }
  } catch {}
}

// CLI
const outIdx = process.argv.indexOf("--out");
if (outIdx > -1) {
  const outDir = path.resolve(process.argv[outIdx + 1]);
  const sourceDir = path.dirname(new URL(import.meta.url).pathname);
  buildMicrosite({ sourceDir, outDir })
    .then(() => console.log(`billionaire-database → ${outDir}`))
    .catch((e) => { console.error(e); process.exit(1); });
}
