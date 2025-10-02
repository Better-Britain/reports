# B) What changes you actually see (user‑visible)

<details>
<summary><strong>Why am I hitting age walls now?</strong></summary>
You’re seeing more checks because children’s protections and enforcement timelines came into force through 2025, so services had to show “highly effective” age assurance around adult or harmful categories.

Under the OSA, services used by or likely to be accessed by children must assess risks and put systems in place that are proportionate and effective. Ofcom’s phased roadmap pushed illegal‑harms duties first, then children’s codes in mid‑2025, which is why many platforms shipped gated access at the same time (see the government OSA explainer and Ofcom’s roadmap pages: gov.uk OSA explainer; Ofcom roadmap).
</details>

<details>
<summary><strong>Do I need to upload my passport everywhere?</strong></summary>
No—there isn’t a single mandated method. Good implementations start with low‑friction, privacy‑preserving checks, then offer stronger fallbacks only if needed.

Ofcom lists several methods that can be “highly effective,” including facial <em>age estimation</em> (delete images immediately), open banking (bank confirms you’re over 18), mobile‑network checks, digital IDs/PASS, and credit‑card checks that bind to the user. Self‑declaration isn’t acceptable (Ofcom children’s codes).
</details>

<details>
<summary><strong>Why does Reddit ask for a selfie but Steam wants a card?</strong></summary>
Different choices and trade‑offs. Reddit uses a verifier offering selfie age estimation (fast; non‑identifying) with ID as a fallback. Steam marks you “verified” if a valid credit card is on file.

Reddit’s approach can be quick and privacy‑respecting when deletion is enforced by the verifier (see TechCrunch coverage of Reddit’s UK rollout). Steam’s UK policy is simple but weaker against misuse (e.g., parent cards) and exclusionary for people without credit cards (see Steam Help: “Your UK Steam user account is considered age verified for as long as a valid credit card is stored on the account”). Ofcom’s criteria treat card checks as acceptable only when they meaningfully bind to the <em>user</em> (children’s codes).
</details>

<details>
<summary><strong>Can I avoid checks with a VPN? Is that safer?</strong></summary>
You can route around some gates, but a shady VPN may see far more of your traffic than a certified verifier sees of your face/ID (which should be deleted on the spot).

Think of it as a trade‑off: a one‑time, auditable “age OK” token versus ongoing exposure of all your browsing to an unknown network. If you use a VPN, pick a reputable provider and understand the risks; the law expects services to consider circumvention but doesn’t mandate universal ID or breaking encryption (gov.uk OSA explainer).
</details>

<details>
<summary><strong>What if I don’t have a smartphone or I fail a face check?</strong></summary>
You should be able to pick another route and try again without being locked out unfairly.

Reasonable alternatives include: ID+liveness via webcam, bank‑sourced age attribute (open banking), a mobile‑network check, PASS (digital proof of age), or email‑based estimation where appropriate. If a face estimation fails due to lighting or camera quality, a good flow offers a quick retry or switches to a stronger fallback (Ofcom children’s codes).
</details>

<details>
<summary><strong>What about shared or parent devices?</strong></summary>
On shared devices, a “credit card on file” gate may reflect the parent’s card rather than the person actually using the account. That’s why simple card‑only gating is weak: it doesn’t bind the <em>user</em>. Better flows bind the check to the account holder via estimation, ID+liveness, bank proof, or MNO checks, and remember the result as an “age OK” token (Ofcom children’s codes; Steam Help page confirms card‑on‑file policy).
</details>

<details>
<summary><strong>Isn’t this exclusionary for people without credit cards or good cameras?</strong></summary>
It shouldn’t be. “Highly effective” is a standard for outcomes, not a single tool. Good services offer more than one route so you can choose a non‑card, non‑face option. If you don’t have a credit card, use open banking, MNO, PASS, or ID+liveness. If your camera is poor, switch to a stronger fallback. If a platform offers only one route, that’s a design choice you can challenge (Ofcom children’s codes).
</details>

<details>
<summary><strong>What else will I notice beyond age checks?</strong></summary>
You should see clearer reporting routes, safer defaults for young users, more consistent takedowns of clearly illegal content, and optional controls for adults.

Specifically: in‑app reporting and complaints, teen‑safe defaults (limited recommendations; tighter contact eligibility), faster removal of illegal content (e.g., child sexual abuse material, terrorism, fraud, revenge porn), and optional filters adults can turn on to reduce exposure to abuse or other legal‑but‑unwanted content. These reflect services’ duties to assess risk, design safer systems, and be transparent (Ofcom online safety hub; gov.uk explainer).
</details>

