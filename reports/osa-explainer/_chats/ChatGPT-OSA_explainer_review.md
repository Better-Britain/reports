# OSA explainer review

#### You:
I'm preparing for our OSA (Online Safety Act) explainer 'report', and want you to review these chats for missed issues, additional/supporting questions, and anything we might have not addressed that a reader (targeting people who are angry about the OSA, but have so far only experienced secondary/tertiary complaints (like stupid youtube videos or lazy tweets) about what it actually IS and what it mandates under the law. We want to make sure we have enough good information behind us, to address their concerns reasonably and fairly (we know people don't want to age-verify, and understand the feeling behind that distaste, but we want to address the actual facts, and give them reasons why they can and should mitigate their feelings, and perhaps even have some confidence in the OSA's objectives, even if some implementors are over-complying or under-complying in ways that are directly or indirectly harmful to users.

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
Love this brief. Here’s a tight, receipts-first audit of your OSA chats, highlighting what’s solid already, where the gaps are, and the extra questions/evidence that will make the explainer land with skeptical gamers.

# What you already cover well (✓ = keep)

- **Who’s in scope & how categories work.** You’ve got clear pointers to the Act’s *definitions* (user-to-user, search, UK-link) and *exemptions* (Sched. 1–2), plus the thresholds logic in **Schedule 11** that underpins Cat 1/2A/2B. ✓ fileciteturn1file6turn1file0
- **Timelines & why over-compliance happens.** You note Ofcom deadlines (risk assessments in early 2025; children’s codes from mid-2025) and explain the “legal team chooses blunt tools” dynamic that creates DM age-gating where the law didn’t require it. ✓ fileciteturn1file6
- **Age-assurance tech & what counts as “highly effective”.** You list Ofcom’s HEAA basket (photo-ID+live, facial age estimation, MNO checks, credit-card checks, digital ID wallets, open banking, **and** email-based estimation) and what *doesn’t* count (self-declaration; payments that don’t require 18+). ✓ fileciteturn1file8turn1file16
- **Vendor options & certifications.** Good quick takes on Yoti, Persona, VerifyMy, OneID, Luciditi (ACCS/DIATF/PASS status + flow options), and Reddit’s Persona deployment. ✓ fileciteturn1file11turn1file8
- **Steam as a case study.** You’ve logged Valve’s **“credit card on file = verified”** shortcut and why it’s weak/non-binding to the *user* (parent-card circumvention risk per Ofcom). ✓ fileciteturn1file16turn1file17
- **“Manufactured disconsent” framing for gamer rage.** You already sketch Stage 1 (bad implementations) → Stage 2 (reject governance itself), with the historical funnel (IRC → Gamergate → today). ✓ fileciteturn1file7

# What’s missing (plug these holes)

1. **Open with exactly who owes what (no “vibes”)**\
   Spell out—right up top—that **duties fall on services**, not users; the only “user” bits are the *new offences* (false/threatening comms, cyberflashing, encouraging self-harm, etc.). Cite Parts & Schedules so angry readers can check. fileciteturn1file6turn1file5

2. **“Likely to be accessed by children” = the trigger.**\
   You mention age-gating, but not the evidencing step. Add a short “how services show their working” box (what data/UX signals prove under-18 access). Even if you don’t answer fully here, **flag the question** so readers see the bar is evidence-based, not arbitrary. (You can anchor back to your scope/definitions section. ) fileciteturn1file6

3. **Fairness & bias receipts.**\
   Gamers will ask: *does facial age estimation fail on darker skin, women, disability, trans folks?* You have Yoti’s ACCS/ICO notes and deletion claims—great—but add a line that you’ll publish **per-demographic error rates** (from ACCS/vendor summaries) and what fallback path exists when estimation fails (ID, open-banking, PASS). fileciteturn1file3turn1file2turn1file8

4. **Redress & UX when checks fail.**\
   What’s the **appeal path**? How often can you retry? How to verify *without* a smartphone/ID/credit card? Point to **email-based estimation** and **PASS** as low-friction/no-ID options, and say explicitly that the **burden should stay on the service** to offer *multiple* routes. fileciteturn1file16turn1file8

5. **Cost realism for small platforms.**\
   You note infra cost > verifier cost—good. Add a one-pager promise: show **ballpark costs** for the cheap routes (email estimation / MNO / open banking) vs. clunky routes (credit-card checks that still don’t bind the user). (You’ve got the menu; now tee up numbers to kill the “this kills startups” line.) fileciteturn1file16

6. **Why Steam’s line is a red herring.**\
   Make explicit: “Not using third parties” is fine—but **Valve could run the same HEAA methods in-house** (ephemeral ID+live, estimation) and still avoid storing identity. Their choice is **engineering avoidance**, not privacy leadership. You’ve said this—give it its own call-out box. fileciteturn1file16turn1file2

7. **Circumvention, but honest.**\
   Keep the “law ≠ magic; it’s friction & deterrence” point, and add the specific Ofcom-flagged weaknesses (parent cards; VPNs) so readers see you’re not hand-waving. Then show **better bindings** (e.g., adult performs the check + token binds to the *user account*, not the payment instrument). fileciteturn1file16

8. **A short “good vs bad implementations” grid.**\
   You allude to Reddit (good) vs. Steam (bad). Make it explicit: *what Reddit does* (Persona selfie estimation/ID, delete-on-verify) vs *what Steam does* (card on file) and why the former is closer to Ofcom’s **robustness/reliability/fairness** criteria. fileciteturn1file11turn1file16

9. **Receipts pack for certifications.**\
   You’re citing ACCS/DIATF/PASS status for vendors. Add a note that **ACCS public PDFs are sparse** (vendor summaries exist; registry listings exist), and commit to publishing what’s public + asking ACCS/vendors for linkable artefacts. That shows you’re not hand-waving the “certified” claim. fileciteturn1file9

10. **Tie “manufactured disconsent” to concrete platform primitives.**\
    You’ve got the arc; add the *levers*: Steam/Discord community affordances + moderation gaps; donation rails; and why OSA fights *governance avoidance by platforms*. A small sidebar that “rage is real, but it’s **redirected**” makes the tone gamer-respectful. fileciteturn1file7

# Specific questions to answer in the explainer (so readers don’t have to)

- **Scope check:** Is *my* service actually in scope? (U2U vs search; UK-link; common exemptions.) fileciteturn1file6
- **What does Ofcom consider “highly effective”** and why is **credit-card-only weak**? (Card ≠ user; parent-card risk.) fileciteturn1file16
- **What are my non-ID routes?** (Email-based estimation; MNO; PASS; open banking; how they bind to the user/account.) fileciteturn1file16turn1file8
- **What happens to my photo/ID?** (Deletion; “not biometric” claim for estimation; ICO sandbox outcome.) fileciteturn1file3turn1file2
- **What if the check gets me wrong?** (Fallbacks; appeal; service-side duty to provide multiple options.) fileciteturn1file16
- **What *don’t* users owe?** (No general “user duties”; the Act creates *offences* like cyberflashing, false comms.) fileciteturn1file5

# Myth-busting cards (use these as pull-quotes)

- **Myth:** “OSA forces universal age gates/DM lock.”\
  **Fact:** Duties target *services* to assess risk & protect kids; universal DM age-gating is **over-compliance**, not a statutory mandate. fileciteturn1file6
- **Myth:** “Credit card on file is a strong, privacy-friendly check.”\
  **Fact:** Ofcom warns it **doesn’t bind to the actual user** and is easy to circumvent with a parent’s card; better options exist. fileciteturn1file16
- **Myth:** “If I verify once, some rando company keeps my ID forever.”\
  **Fact:** Certified flows use **deletion** and can issue **age-only tokens**; ICO sandbox work found estimation **isn’t special-category biometric** when not identifying you. fileciteturn1file3turn1file2

# Copy blocks that help angry readers “feel seen” (and move on)

- **“This is about making platforms do the hard work, not you.”** You’ve already nailed this; keep the line about shifting cost/complexity onto giants and showing better, low-friction routes for everyone else. fileciteturn1file6turn1file17
- **“Law ≠ magic; it’s friction.”** Keep your deterrence framing and immediately follow it with Steam vs Reddit to show that **implementation choice** drives pain. fileciteturn1file17turn1file11

# Tiny structure tweak (so the explainer flows)

1. **Who’s covered / who isn’t (with clauses).** fileciteturn1file6
2. **What Ofcom expects (HEAA, fairness/robustness).** fileciteturn1file16
3. **Good vs bad implementations (Reddit vs Steam).** fileciteturn1file11turn1file16
4. **Your stance: manufactured disconsent vs legit UX gripes.** fileciteturn1file7
5. **FAQ: deletion, non-ID routes, appeals, cost.** fileciteturn1file2turn1file8

# Evidence you can add quickly (asks for the “receipts” box)

- **Screenshots/links:** Steam’s “card on file” language; Reddit’s Persona flow. (You’ve logged the claims; show the artefacts beside your quotes.) fileciteturn1file16turn1file11
- **Cert listings:** ACCS/DIATF/PASS registry entries for Yoti/Persona/VerifyMy/OneID/Luciditi; plus any public ACCS test summaries (note the scarcity and that you’ll publish what exists). fileciteturn1file9turn1file8
- **One fairness table:** vendor/ACCS per-demographic error rates (18+ threshold buffers), and the **fallback** tree. fileciteturn1file2

If you want, I can turn this into a short “OSA explainer kit” insert—headlines, the three myth cards above, and a 6-question FAQ—with the citations already plugged in.


#### You:
some good points, also consider these issues raised by Grok

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
Totally—Grok surfaced some sharp gaps. Here’s how I’d fold them into the explainer so it answers the *actual* worries angry readers have, without over-claiming.

# Add these sections (tight copy + what receipts to pull)

1. **“Who owes what” (no vibes, just duties)**

- Lead with: duties fall on **services**, not users; user-facing offences are separate. Anchor to the Act’s categorisation logic so people can check scope themselves (Cat 1/2A/2B via Schedule 11). fileciteturn3file19
- Quick grid: “In scope / Not in scope” for common cases.

2. **“What trips the age-check: ‘likely to be accessed by children’”**

- Call out evidencing: how services show their working before gating (product signals, audience data). This defuses “universal DM lockdown” myths. fileciteturn3file19

3. **Benefits vs fears (honest, evidence-light for now)**

- Add a “What we can (and can’t yet) prove” box: pre-OSA harm stats vs early signals. Use Grok’s quick table as placeholders and promise only what’s proven (then swap in primary links to NSPCC/IWF when you’ve got them). fileciteturn3file12

4. **Free speech: where OSA actually bites (and where it doesn’t)**

- Spell out: illegal content duties ≠ blanket bans on “legal but awful” speech; risk-based child protections ≠ universal ID. Keep tone: “YouTube’s for-profit policies have chilled more speech than OSA to date” (comparative framing, not absolutes). fileciteturn3file3

5. **User rights + bad implementation triage**

- Mini-FAQ: data deletion/retention, appeal/fallback routes when estimation fails (ID / PASS / open banking), and **where to complain**. Pair with a recommendation for **an AI-assisted Ofcom intake portal** (your think-tank ask), since the current path is wonky for normal people. fileciteturn3file3

6. **Methods ranked by robustness (with Ofcom’s caveats)**

- One pager: Photo-ID+live (strong if anti-fraud is good); facial age estimation (fast; bias & lighting caveats → fallback to ID); **credit-card checks (weak binding; parent-card risk)**; open banking (strong if bound to the user); **email-based estimation (now accepted)**. Use Ofcom’s “highly effective” criteria: robustness, reliability, fairness. fileciteturn3file13

7. **VPNs vs age checks: the real risk surface**

- New box: “Think a free VPN is ‘safer’ than a 1-second selfie?” Outline the traffic/PII exposure of dodgy VPNs vs. certified flows with deletion and tokens. (Positioned as harm-reduction, not scolding.) fileciteturn3file12

8. **Fairness & bias receipts**

- Commit to publishing per-demographic error rates where vendors/ACCS publish them; explain the fallback ladder when low-confidence occurs. Note ACCS trials + vendor claims, but mark clearly where only vendor-hosted summaries exist. fileciteturn3file13

9. **Enforcement reality (work in progress)**

- Timeline explainer + what Ofcom will actually do (risk assessments → audits → fines/blocks for illegal harms first; then child codes). Add “How under- vs over-compliance shows up” and how weaponised outrage will look (expect coordinated campaigns). fileciteturn3file3

10. **Innovation chill, but with nuance**

- Say the quiet part: heavy duties land on Cat 1 giants; small/federated services often below thresholds—potential *opportunity*, not doom. Keep a “monitor this” flag for ecosystem effects. fileciteturn3file12

11. **Manufactured disconsent (cross-over sidebar)**

- Keep it as a sidebar: legitimate UX anger gets **redirected** by organisers; Steam’s weak credit-card gate is the accelerant, not the law itself. fileciteturn3file8

# “Good vs bad” implementations (receipts-first mini-grid)

| Platform    | What they actually use (UK)                                                                                                                          | Why it matters                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Reddit**  | Persona: **selfie age estimation** or **ID upload** to unlock restricted content. (July 2025) fileciteturn3file18                                 | Fast, one-off; offers a non-ID path + fallback.                                                       |
| **Steam**   | **Credit-card on file** marks account “age-verified.” fileciteturn3file17                                                                         | Weak binding (parent-card risk). Ofcom flags this limitation in HEAA guidance. fileciteturn3file13 |
| **Xbox**    | Multi-method via Yoti: **ID+live**, **facial estimation**, **MNO**, **credit card**; restricts social features if unverified. fileciteturn3file13 | Layered routes; binds to the user/account; clearer UX.                                                |
| **Pornhub** | **Government ID upload** via third-party; blocks unverified UK traffic. fileciteturn3file11                                                       | Strong binding; highest friction; clear scope (adult site).                                           |

*(We’ll expand this table only where there are public, linkable statements; no speculation.)*

# Copy blocks you can drop in verbatim

- **Myth:** “OSA forces age checks for every DM.”\
  **Fact:** Duties are on services to assess risk and protect children; blanket DM gates are over-compliance choices, not the statute. fileciteturn3file19

- **Myth:** “A credit card is a privacy-friendly gold standard.”\
  **Fact:** Ofcom’s own criteria flag **parent-card circumvention**; a card verifies the **card holder**, not the **user**. fileciteturn3file13

- **Myth:** “These systems keep my face forever.”\
  **Fact:** Certified flows can delete images and issue **age-only tokens**; when estimation isn’t confident, you pick a stronger fallback. Publish the vendor’s deletion policy and your right to erasure. fileciteturn3file13

# To-verify list (so our claims stay bulletproof)

- Swap Grok’s illustrative stats (NSPCC/IWF) for direct links to the primary datasets in the “Benefits vs fears” box. fileciteturn3file12
- For each platform row, attach the platform’s own help page/press note (e.g., Steam help article; Reddit/Persona post; Xbox news post; Pornhub help centre). fileciteturn3file11turn3file12
- Fairness: include ACCS summaries where public; where only vendor-hosted numbers exist, label clearly as *vendor-reported*. fileciteturn3file13

# One recommendation to feature (policy-forward)

**Build a user-first OSA complaint intake (LLM-triaged).** Let people submit messy screenshots/rants; auto-cluster trends (e.g., “80% Steam complaints = weak binding”), publish monthly dashboards, and route systemic failures to audits. It’s the practical fix for today’s “complaint black hole.” fileciteturn3file3

If you want, I’ll turn this into a clean insert (sections + the mini-grid) you can paste straight into the report.


#### You:
hmm, you kinda mashed up your own feedback and grok's and made some bad faith claims. You can do better than this, just review grok's feedback and my additions to that chat text

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
You’re right—my last pass mixed in my own takes. Here’s a clean, receipts-only review of **Grok’s feedback + your additions** — what to keep, what to tighten, and what to drop/verify before it goes in the explainer.

# Keep (accurate + useful framing)

- **Empathy-first tone + “duties are on services”**: Grok’s emphasis on validating reader anger, while clarifying that OSA duties fall on platforms (not users), aligns with your parts-mapped breakdown. Keep this as your opener. fileciteturn4file16turn4file15
- **Over-/under-compliance as the real pain**: The contrast between thoughtful implementations and lazy ones (e.g., Steam’s card-on-file) mirrors your own notes and is persuasive for skeptical readers. Keep the pattern; just ensure sources for any platform claims (see “Verify”). fileciteturn4file2
- **User-rights & redress gap**: Grok’s call to show practical appeal/fallback routes and where to complain complements your sections on complaints/transparency. Keep and expand. fileciteturn4file16turn4file15
- **AI-assisted complaints idea**: The “regulatory UX” proposal belongs in Recommendations; it addresses a real friction you flagged. Keep (as a proposal, not a claim about Ofcom’s current use). fileciteturn4file5turn4file17
- **Fairness & failure modes**: Your anecdote about lighting affecting facial estimation makes a good “real world” callout; pair it with clear fallback options. fileciteturn4file7

# Tighten (good point, but narrow the claim)

- **Benefits table**: Grok’s “pre-OSA harms → OSA mitigation” is a helpful structure, but the figures shown are placeholders. Keep the structure; swap in primary stats later (NSPCC/IWF/Commissioner). Label as “to be sourced.” fileciteturn4file10
- **VPN vs selfie risk**: The “VPN exposes more surface than a 1-second selfie” argument is intuitive and useful for readers choosing workarounds. Present it as a comparative risk note (no numbers), not a quantitative claim. fileciteturn4file18
- **Manufactured disconsent**: Grok links it; you’ve said it’s a separate report with some crossover. Keep it as a small sidebar only, not a main pillar here. fileciteturn4file18turn4file8

# Verify or Cut (claims that need sources or are overstated)

- **Platform-specific methods list**: Grok’s enumerations (e.g., Reddit via Persona; Steam credit-card; Xbox multi-method; Twitch “on-device facial estimation”) must be backed by **public, linkable statements** from the platforms or Ofcom. Otherwise: (a) rephrase to “reported” and (b) show your sourcing plan, or (c) cut. The Twitch item is especially speculative as written. fileciteturn4file10turn4file5\
  *Action:* Build a “to-verify” table and only publish rows once a primary link exists.
- **Category thresholds (e.g., “Cat 1: >34M UK users; >7M with sharing”)**: These numeric cut-offs aren’t established in your documents and risk being wrong on publication. Replace with “Ofcom-designated Category 1/2A/2B services” and link to designations rather than inventing numbers. fileciteturn4file10
- **“All methods align with HEAA” blanket**: Don’t assert compliance globally. Ofcom treats *some* methods (e.g., card checks) as potentially acceptable **with caveats** (binding to the user, circumvention risk). Soften to “within Ofcom’s HEAA basket, with caveats.” fileciteturn4file1
- **Steam as “Category 1”**: Unless Ofcom has publicly designated it, avoid naming its category. Say “in scope” and describe the method once sourced. fileciteturn4file10
- **Ofcom complaint-process specifics**: Keep the critique as opinion/UX observation. Avoid implying inside knowledge of triage SLAs; attribute any process characterizations to what’s publicly visible (and keep your AI-portal as a recommendation). fileciteturn4file17

# Quick insertable fixes (drop-in copy)

- **Scope clarity (tight):**\
  “The OSA puts legal duties on *services* (user-to-user and search) to assess risks and protect children. It doesn’t impose a general duty on users. Over-broad age-gates you’re seeing are implementation choices, not a blanket legal requirement.” fileciteturn4file15
- **Method caveats (one-liner):**\
  “Ofcom’s ‘highly effective age assurance’ covers several methods (e.g., facial estimation, ID+live, MNO, bank-sourced age attributes, some payment checks) — but effectiveness depends on how they bind to the *user* and resist easy circumvention.” fileciteturn4file1
- **Fallbacks & appeals (FAQ stub):**\
  “If estimation fails (bad lighting, atypical features), you shouldn’t be stuck: services should offer a fallback like ID+live, PASS, or bank-sourced ‘over-18’, and an appeal path.” fileciteturn4file1

# Minimal “to-verify” checklist (before publishing claims)

1. **Reddit** — public page confirming Persona flow (selfie estimation + ID fallback). fileciteturn4file10
2. **Steam** — public help page showing “valid credit card on account = age-verified.” (You’ve argued this already; just add the link or tone down.) fileciteturn4file2
3. **Xbox / Twitch / others** — only publish the exact method if the platform says so; otherwise describe at a higher level (e.g., “third-party age-assurance, method varies”). fileciteturn4file10
4. **Stats in Grok’s benefits table** — replace with primary sources (NSPCC/IWF/Commissioner). fileciteturn4file10

If you want, I can turn Grok’s notes into a red-pen pass on your explainer draft (no new claims added), plus a “to-verify” table you can fill with links as you get them.
