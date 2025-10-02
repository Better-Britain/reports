# D) Over‑/under‑compliance & case studies

Real safety lives in the details. Some platforms take the hint—offer choices, delete data, keep the door open but sensible. Others reach for the bluntest tool and call it a day. These snapshots show what “good” feels like, what “lazy” looks like, and why users react the way they do.

<details>
<summary><strong>What does “good” look like in practice?</strong></summary>
Multiple routes, privacy‑by‑default, clear appeals, and minimal exclusion.

A strong flow offers a low‑friction method first (e.g., facial estimation) and fallbacks (ID+liveness, open banking, MNO, PASS). Images are deleted immediately after estimation, and only an “age OK” token is stored. The service explains methods and appeals in plain English. This aligns with Ofcom’s “highly effective” criteria around robustness, reliability and fairness (see Ofcom’s [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
</details>

<details>
<summary><strong>What does “bad/lazy” look like?</strong></summary>
One route for everyone, weak binding, data kept longer than needed, and no memory of a valid check.

A common anti‑pattern is “credit‑card only” gating. It’s easy to ship but weak against parent‑card misuse and exclusionary for users without credit cards. Ofcom treats card checks as acceptable only when they bind to the <em>user</em>, not just “a card exists” (children’s codes). Another anti‑pattern is claiming “no third party” while avoiding equivalent in‑house methods (e.g., ephemeral IDV) that achieve the same privacy outcome.

Coverage in 2025 highlighted these trade‑offs. For example, [“You now need a credit card to access mature content on Steam in the UK”](https://www.gamedeveloper.com/business/you-now-need-a-credit-card-to-access-mature-content-on-steam-in-the-uk) summarised friction and exclusion risks, while Ofcom’s bulletins emphasised offering alternatives and deleting data promptly (see Ofcom’s online safety hub and industry bulletins).
</details>

<details>
<summary><strong>Platform examples to learn from (not endorsements)</strong></summary>

- <strong>Reddit (UK)</strong>: verifier‑backed selfie age estimation with ID fallback; deletion claims; quick unlock of gated content. See coverage of the rollout: [TechCrunch](https://techcrunch.com/2025/07/15/reddit-rolls-out-age-verification-in-the-uk-to-comply-with-new-rules/).

- <strong>Steam (UK)</strong>: “valid credit card on file” = age‑verified; simple but weakly bound and exclusionary. Help page spells it out: [Steam Help](https://help.steampowered.com/en/faqs/view/292B-3DA3-CFC8-97F6). Community threads and press reflect the practical pain points (e.g., debit‑card users; shared devices).

- <strong>Bluesky (UK)</strong>: age‑assurance via an integrator (KWS/Epic) mixing face/ID/payment‑card options; used as a reference by some midsize services (see sourced notes in our research).

These patterns map back to Ofcom’s method menu and fairness expectations. Services that bind to the user, delete data, and offer choices tend to generate less backlash.
</details>

<details>
<summary><strong>Edge case: shared devices & family accounts</strong></summary>
“Card on file” doesn’t prove the person using the device is an adult.

On a shared PC or console, binding to the <em>instrument</em> (card on account) can misrepresent the user. Better designs bind the check to the account holder using estimation or IDV, then remember the result (token). Where family accounts are involved, services should default to teen‑safe settings until an account holder verifies. This aligns with Ofcom’s focus on outcomes rather than a single tool (children’s codes).
</details>

<details>
<summary><strong>Edge case: users without credit cards, strong cameras, or bank apps</strong></summary>
“Highly effective” is about outcomes, so offer more than one route.

Good implementations provide non‑card, non‑face options: open banking (bank confirms “over 18”), MNO checks (carrier adult flag), PASS (digital proof of age), or ID+liveness via webcam. If estimation fails due to camera/lighting, a quick retry or fallback should be available. See Ofcom’s accepted methods and fairness expectations (children’s codes).
</details>

<details>
<summary><strong>Follow‑question: how should services handle false negatives/positives?</strong></summary>
Offer retries, switch methods, and provide a fast appeal.

A mis‑ageing event shouldn’t strand an adult user. Provide a rapid retry path (e.g., better lighting) or a switch to IDV/open banking/MNO/PASS. Keep an appeal route with human review for edge cases. These steps satisfy Ofcom’s reliability/fairness lens without diluting the protection goal (children’s codes).
</details>

<details>
<summary><strong>Follow‑question: what evidence should services publish?</strong></summary>
Method choices, deletion/retention, fallback ladder, and appeal stats.

Plain‑English notices should explain which methods are offered, whether images are deleted, what fallbacks exist, and how appeals work. Transparency reports should include high‑level metrics on verification success/failure and complaint outcomes. The OSA’s transparency expectations and Ofcom’s audit powers support this (see the government’s [OSA explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer) and Ofcom’s [roadmap to regulation](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/roadmap-to-regulation)).
</details>

