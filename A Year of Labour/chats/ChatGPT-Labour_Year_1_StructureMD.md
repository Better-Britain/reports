# Labour Year 1 Structure/MD


Below is a proposed **file tree + templates** for the Broken Britain Briefing within the Better Britain Bureau project. Each entry shows a **filename** (fixed order using decimals) and then **plain-text scaffolding** that guides the AI to populate content from our source research documents. I’ve included reusable templates and tag vocab so every policy can be rendered consistently, scored, and cited inline (with a separate footnotes aggregator).

---

## 1.0 — Core framing & method

### **1.0-Executive-Summary.md**

Plain-language summary of what changed under Starmer’s Labour (Jul 2024 → present), what matters, and how to read this report.

- 3-way lens: **Sensible & effective** / **Questionable or poorly executed** / **Unclear or too-early-to-judge**.
- One-paragraph meta-note on **press narratives vs outcomes**.
- Promise of **per-policy inline citations** and **footnotes mapping** to grouped sources.
- Linkouts: 1.1 (method), 2.x (catalogue), 3.x (comparative views), 4.x (deep-dives).

### **1.1-Methodology-Scoring-Taxonomy.md**

Purpose: define how we classify, tag, and score policy outcomes so the parser can build interactive views.\
Include:

- **Impact-quality classes** (attach to every claim):
  - `[impact-proven]` — observed, measured effect (e.g., official stats, regulator reports).
  - `[impact-likely]` — strong causal chain + early indicators.
  - `[impact-hypothetical]` — plausible but not yet evidenced.
  - `[unknown]` — data gap / unknowable.
  - `[opinion]` — analytical judgement; must be clearly signposted.
- **Outcome polarity scale** (attach to each *policy-level* summary outcome):
  - `score: +3, +2, +1, 0, -1, -2, -3` (very positive → very negative).
  - Require short justification line after score.
- **Areas-of-effect tags** (multi-select per claim):
  - `[area: energy] [area: water] [area: housing] [area: planning] [area: nhs] [area: social-care] [area: welfare] [area: education] [area: skills] [area: migration] [area: justice] [area: economy] [area: fiscal] [area: devolution] [area: digital] [area: ai] [area: environment] [area: business] [area: labour-market] [area: transport] [area: culture] [area: foreign] [area: defence]`
- **Time-horizon tags**: `[horizon: short(<1y)] [horizon: medium(1–3y)] [horizon: long(>3y)]`.
- **Distributional tags**: `[dist: low-income] [dist: pensioners] [dist: renters] [dist: homeowners] [dist: SMEs] [dist: large-firms] [dist: regions:<name>]`.
- **Risk/uncertainty tags**: `[risk: legal] [risk: delivery] [risk: finance] [risk: political] [risk: data-gap]`.
- **Inline citation syntax**:
  - After each *headline policy* and **every claim**: `[^id]` where `id` maps to Footnotes.
  - Encourage multiple refs per claim if needed: `[^ofwat-2025; ^hoclib-kspeech-2025]`.
  - Will need to validate claim IDs are shared and complete.
- **Template blocks** (canonical snippets to be reused across 2.x files):
  - **Policy header** (see 2.0 template).
  - **Claim line**: `- [impact-class] [area:…] [horizon:…] <concise claim>. [^source-id]`
  - **Outcome scores**: `**Outcome score:** +2 — <one-line justification>.` may be multiple lines for multiple outcomes, to encode nuance/competing-priorities/objectives

---

## 2.0 — Policy catalogue (by domain)

> Each 2.x file contains many **Policy Cards** following the same template. Every policy card must have: name; status; intent; mechanisms; measurable outcomes; costings; distributional impacts; risks; timeline; **inline citations on every claim**; and a one-line *Outcome score*.

### **2.0-Template-Policy-Card.md**

**Use this EXACT structure for every policy.**

```
# {{Policy Name}}
[status: enacted|bill-in-train|programme|administrative] [lead: Dept/Agency] [start: YYYY-MM] [horizon: short|medium|long]

**Intent (plain language):** {{What it tries to do, who for, and why.}}

**Mechanism(s):** {{Instruments: primary legislation, secondary rules, regulator directions, spending, contracts.}} [^source-id]

**Key claims & evidence:**
- [impact-proven] [area: …] [horizon: …] {{Claim 1 (with metric, date, unit).}} [^source-id]
- [impact-likely] [area: …] {{Claim 2…}} [^source-id]
- [unknown] {{Known unknowns/data gaps to watch.}} [^source-id]

**Costs & funding:** {{£, time profile, trade-offs/tax/spend.}} [^source-id]

**Distributional effects:** {{Winners/losers; regions/groups.}} [^source-id]

**Risks & constraints:** [risk: delivery|finance|legal|political] {{Short notes.}} [^source-id]

**Timeline & milestones:** {{What’s happened / what’s next with dates.}} [^source-id]

**Outcome score lines:** {{-3…+3}} — {{one-line justification per 'position'}}.

---
```



### **2.1-Energy-Climate-and-Nuclear.md**

**Scope:** GB Energy; renewables acceleration; grid reform; home decarbonisation; **integrated nuclear & SMRs**.

**Policy Cards to include:**

- Great British Energy (GBE) — corporate setup, capitalisation, mandate.
- Contracts for Difference (AR6/AR7) — award volumes, clearing prices.
- Onshore Wind & Solar Planning Reset — NPPF changes, repowering, rooftop.
- Grid Connections Reform — queue management, anticipatory investment.
- Warm Homes/Retrofit Schemes — grants, EPC uplift pathways.
- **Nuclear Programme (Fleet)** — overall programme governance & financing.
- **SMR Programme (Rolls-Royce etc.)** — technology selection, siting, GDA, supply chain.
- **Large Reactors** — Hinkley C progress, Sizewell C FID & RAB.

**Integrated supplemental focus (embed as claims/evidence inside relevant cards):**

- Nuclear/SMR **site selection timelines**, licencing/gating, **planning streamlining**.
- **Jobs & regional supply chain** commitments; UK content targets.
- Critical path risks: skills, financing, grid integration for both renewables & nuclear.
- Interactions: renewables intermittency + firm nuclear; capacity mix implications.

---

### **2.2-Water-and-Environmental-Regulation.md**

**Scope:** Post-legislation enforcement; investment plans; outcomes.

**Policy Cards to include:**

- Water (Special Measures) Act Implementation — regulator powers, bonus restrictions.
- Ofwat PR24 (2025–30) Settlements — capex schedules, bill impacts.
- Environment Agency Enforcement — civil/criminal actions toolkit.
- Storm Overflow Reduction Programme — monitoring & spill targets.

**Integrated supplemental focus:**

- **Measured outcomes**: spill counts, serious incident trends, **executive bonus bans**, penalties, and **bill pass-through** evidence.
- Transparency & data publication cadence (real-time monitors; one-hour reports).
- Trade-offs: accelerated capex vs consumer bills; compliance cost trajectories.

---

### **2.3-Housing-and-Planning-System.md**

**Scope:** Housing targets; planning reform; brownfield/“grey-belt”; developer market structure.

**Policy Cards to include:**

- National Planning Policy Framework (NPPF) Revisions — targets, presumption tests.
- Brownfield Accelerators / Urban Density Tools.
- Housing Delivery Fund(s) / Guarantee Schemes.
- Planning Performance & Resourcing (PINS/local authority capacity).
- Developer Market & Mergers (e.g., consolidation impacts).

**Integrated supplemental focus:**

- **Starts/completions/permissions** trend-lines; planning decision times.
- Interactions with retrofit/EPC and energy infrastructure siting.
- Regional distribution; affordability outcomes; build-out rates.

---

### **2.4-NHS-and-Social-Care-Delivery.md**

**Scope:** NHS 10-year change plan; workforce & pay; access; social care sustainability.

**Policy Cards to include:**

- NHS Productivity & Access Plan — elective waits, primary care access standards.
- Pay Deals & Workforce Expansion — training places, retention.
- Social Care Funding & Charging Reforms — market sustainability, workforce.
- Data & Digital in Health — federated data, EPR coverage, diagnostics pathways.

**Integrated supplemental focus:**

- Measured outcomes: RTT/ED metrics; GP access; domiciliary capacity.
- Distributional & regional variance; recruitment vs vacancy outturns.
- Interop & data quality dependencies.

---

### **2.5-Welfare-and-Inequality.md**

**Scope:** Family incomes; poverty drivers; in-kind supports.

**Policy Cards to include:**

- **Two-Child Limit (retained)** — rationale, scope, estimated impact.
- Universal Credit Administration Changes — deduction caps, sanctions, run-ons.
- **Free School Meals Expansion** — eligibility to UC households.
- **Primary Breakfast Clubs (universal offer)** — rollout & utilisation.
- Local Housing Allowance / cost-of-living supports (as applicable).

**Integrated supplemental focus:**

- **Child poverty indicators** (levels, depth, larger-family differentials).
- **In-kind benefit effects** (FSM/breakfast) vs cash transfers.
- Regional patterns, equality impacts; interactions with NLW & childcare reforms.

---

### **2.6-Education-and-Skills.md**

**Scope:** School system funding; VAT on private schools; workforce; post-16 skills.

**Policy Cards to include:**

- **VAT & Business Rates on Independent Schools** — implementation & revenue use.
- Teacher Workforce Plan — recruitment/retention targets.
- Capital & Capacity (places) — LA powers, free schools, condition.
- Skills England / Apprenticeship Reforms — funding & take-up.

**Integrated supplemental focus:**

- **Pupil movement** (independent → state), closures/mergers; **capacity strain** in hotspots.
- **Use of VAT revenue** (teachers, FSM, breakfast clubs) and outcome metrics.
- Class size trends; subject shortages; FE/apprenticeship completion data.

---

### **2.7-Migration-Borders-and-Asylum.md**

**Scope:** System throughput; irregular migration; legal routes; enforcement.

**Policy Cards to include:**

- Border Security Command / Illegal Migration framework updates.
- **Asylum Backlog Reduction Programme** — decision productivity & timelines.
- **UK–France Returns Pilot (“one-in, one-out”)** — design, volumes, safeguards.
- **Safe & Legal Routes** — family reunion, resettlement schemes.
- Removals & Returns — enforced/voluntary trends, readmission agreements.

**Integrated supplemental focus:**

- **Quarterly backlog metrics**, decision rates, hotel/population trends.
- **Crossings volume** trajectories and composition; deterrence evidence (if any).
- Pilot scheme legal/process constraints; scale-up paths; ECHR/UNHCR interfaces.

---

### **2.8-Digital-Data-and-AI.md**

**Scope:** Data portability; digital markets; AI safety/testing; (OSA context minimal).

**Policy Cards to include:**

- **Data (Use & Access) Act** — Smart Data enabling powers.
- **Smart Data Schemes** — energy, banking/finance, telecoms pilots → rollout.
- **AI Safety Institute** — capability evaluations, tooling (e.g., Inspect), pre-deployment tests.
- Public Sector Digital & Procurement — legacy modernisation, assurance.

**Integrated supplemental focus:**

- **Measured benefits** from pilots (fraud reduction, switching savings, SME finance).
- AISI **test findings**, red-team programme; international coordination.
- Competition impacts from mandated portability; privacy & security risks.

---

### **2.9-Devolution-Local-Growth-and-Transport.md**

**Scope:** Fiscal devolution; integrated settlements; local transport reform.

**Policy Cards to include:**

- English Devolution & Community Empowerment Bill — tiers, triggers, backstops.
- **Integrated Single-Pot Settlements** — city-region funding envelopes.
- **Transport Franchising & Integration** — e.g., **Bee Network** buses/trams; other CRSTS investments.
- Mayoral Growth/Investment Funds; local skills compacts.

**Integrated supplemental focus:**

- **Observed outcomes**: ridership, punctuality, fare structures; delivery timetables.
- **Rollout disparities** across regions; criteria to unlock deeper powers.
- Rail partnerships/GBR alignment; local planning synergy.

---

### **2.10-Business-Environment-and-Labour-Market.md**

**Scope:** SME liquidity; payment practices; regulatory/admin burden; labour standards.

**Policy Cards to include:**

- **Late Payments Reform (“Time to Pay Up”)** — SBC powers, statutory terms, interest.
- SME Finance & British Business Bank — Start Up Loans, guarantees.
- **Companies House / MTD / Filing Changes** — mandated software, **targeted pauses**/phasing.
- Employment Rights Bill — day-one rights, zero-hours, fire-and-rehire.
- Minimum Wage & Offsets — NLW path; Employment Allowance; small-employer reliefs.

**Integrated supplemental focus:**

- **Cash-flow outcomes** for SMEs; on-time payment rates; first enforcement cases.
- Balancing compliance costs with mitigations; formation/closure trends.
- Interaction with gig economy and contractor rules.

---

### **2.11-Justice-Policing-and-Prisons.md**

**Scope:** Capacity management; sentencing; victim support.

**Policy Cards to include:**

- Prison Capacity & Early Release Framework — thresholds, outcomes, safety.
- Community Sentencing & Rehabilitation — effectiveness metrics.
- Victims’ Code & Support Services — access & timelines.
- Police Workforce & Serious/Organised Crime — productivity & charge rates.

**Integrated supplemental focus:**

- Reoffending indicators; custody crowding impacts; community order completion.

---

### **2.12-Foreign-Defence-and-Security.md**

**Scope:** Defence spending trajectory; procurement reform; international commitments.

**Policy Cards to include:**

- Defence to 2.5% GDP Pathway — stages, affordability, trade-offs.
- Procurement & Industrial Base — drones, munitions, data backbones.
- Ukraine & Euro-Atlantic Security — training, aid, production scaling.
- Cyber & Counter-State Threats — NCF, NPSA programmes.

**Integrated supplemental focus:**

- Opportunity costs vs domestic budgets; delivery bottlenecks; alliance dependencies.

---

### **2.13-Culture-Sport-and-Other-Sectors.md**

**Scope:** Sectoral regulators and public-interest reforms.

**Policy Cards to include:**

- Football Governance Regulator — licensing, financial sustainability.
- Tobacco & Vapes Controls — age restrictions, product rules.
- Creative Industries & PSB — funding, IP/AI usage guidance.
- Misc. sectoral items (to capture long tail).

**Integrated supplemental focus:**

- Compliance/economic impacts; public health outcomes; international comparators.

---

### **2.14-Cross-Cutting-Systems-and-Trade-offs.md**

*(Optional aggregator file to host policies that are explicitly cross-domain; avoids duplication across 2.x)*

**Policy Cards to include:**

- Net Zero Delivery System — cross-vector dependencies (grid, planning, skills).
- Capital Allocation Rules — fiscal envelope constraints; OBR/NAO guardrails.
- Data & Evaluation Standards — how outcome measurement is institutionalised.

**Integrated supplemental focus:**

- How policies interact (e.g., water capex ↔ energy bills; VAT revenue ↔ education staffing).
- Shared risks (skills, planning, judicial review) and mitigation levers.

---

## 3.0 — Comparative views & lenses

### **3.0-Comparative-Outcome-Matrix.md**

A cross-cutting *matrix view* the parser will generate, but here we describe the logic:

- Rows = **Policies** (refs to 2.x IDs).
- Cols = **Outcome score**, **Impact class mix**, **Areas-of-effect**, **Distributional summary**, **Key metrics**, **Risks**.
- Instruction: “Build sortable table; expose filters by area, score, horizon, dist-group.”
- May be tricky to display a LOT of positions cleanly, do not prioritise, may remove on investigation.

### **3.1-Media-Narratives-vs-Reality.md**

Describe how to contrast press frames with measured outcomes.

- For each selected policy, include two bullet lanes:
  - **Narrative snippet** `[opinion]` (short).
  - **Observed data** `[impact-proven]` (with citation).
- Parser will present A/B view.

// N.B. section 4 removed.

## 5.0 — Appendices & registries

### **5.0-Source-Footnotes.md**

This is the **only file** that holds grouped references used across the report.

- Structure:
  - `[^ofwat-2025]: <full ref + link + accessed date>`
  - `[^hoclib-kspeech-2025]: …`
  - Group by **domain** (Energy, Water, Housing, etc.), then **type** (Gov/Regulator; Stat; Think Tank; Media).
- Rule: every inline `[^id]` in 1.x–4.x must resolve here.

### **5.1-Source-Registry-and-Provenance.md**

- Master list of **primary sources** (departments, regulators, official stats series), **secondary** (think tanks), **media** (as lower-priority corroboration).
- Provenance notes: dataset vintages, revisions, caveats.

### **5.2-Glossary-and-Abbreviations.md**

- Define programme names, bills, agencies, acronyms.

### **5.3-Data-Tables-and-Metrics-Inventory.md**

- Inventory of specific metrics the parser will pull out for charts (e.g., asylum backlog counts by quarter; sewage spills per company; completions; CfD MW; breakfast club coverage; SME payment days).

### **5.4-Change-Log-and-Versioning.md**

- Date-stamped edits; data refresh cycles; methodology tweaks.

---

## 6.0 — “Who’s who” (companion, optional include)

*(Publish separately/aside, but hooked for integration.)*

### **6.0-Decisions-Networks-Guide.md**

- Structure for the companion “Who’s who behind power” (SPADs, regulators, councils, external advisors), with links to policy cards they influence.
- Lightweight tags: `[influence: 1–5]`, `[role: policy|delivery|regulatory]`.

---

## 7.0 — Example stubs (keep for authors)

### **7.0-Example-Policy-Card-Stubs.md**

Provide 2–3 short, **content-free** examples showing formatting, tags, and citations:

```
# Great British Energy (GBE)
[status: enacted] [lead: DESNZ/GBE] [start: 2025-05] [horizon: long]

**Intent:** Publicly-owned vehicle to accelerate clean generation and crowd-in private capital. [^gbe-act-2025]

**Mechanism(s):** Primary legislation; capitalisation; partnership with Crown Estate; CfD participation. [^gbe-act-2025; ^desnz-cfe-2025]

**Key claims & evidence:**
- [impact-proven] [area: energy] [horizon: short] Initial capital allocated and board appointed. [^desnz-cfe-2025]
- [impact-likely] [area: energy] [horizon: medium] Pipeline indicates X–Y GW by 2030 pending FIDs. [^obr-foi-2025]
- [unknown] Grid connection timings remain a bottleneck. [^ofgem-queue-2025]

**Costs & funding:** £Xbn capex envelope; no near-term Treasury returns. [^budget-2025]

**Distributional effects:** Manufacturing/jobs in regions A/B; consumer bill impact neutral in near term. [^nwf-taskforce-2025]

**Risks & constraints:** [risk: delivery][risk: finance] Supply chain / interest-rate sensitivity. [^nao-2025]

**Timeline & milestones:** 2025-05 RA; 2025-09 leadership; 2026 procurement window. [^desnz-cfe-2025]

**Outcome score:** +2 — Structural enabler with early delivery progress.
```

---

### **Implementation notes (for authors & parser)**

- **Every claim → inline `[^id]`**; no uncited statements.
- Keep claims **atomic** (one metric per bullet).
- Use **dates and units** everywhere.
- Prefer **primary sources**; if using secondary, pair it with at least one primary or official statistic.
- Where data is contested, include **multiple bullets** (pro/con) with distinct citations and tags.
- Every **Policy Card** in 2.x uses the **2.0 template** and carries **inline `[^id]` citations** on every claim; all ids resolve in **5.0-Source-Footnotes.md**.
- Use **tags** consistently: `[impact-proven|impact-likely|impact-hypothetical|unknown|opinion]`, `[area:*]`, `[horizon:*]`, `[risk:*]`, `[dist:*]`.
- Keep claims **atomic** with dated metrics, citing sources, and units to enable filtering/sorting later.
