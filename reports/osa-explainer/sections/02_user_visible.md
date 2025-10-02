# What changes you actually see

This is the part you can feel. Age checks at the door. Cleaner reporting routes. Safer defaults for teens without turning the internet into school detention. Some choices are clumsy, some are thoughtful—this chapter is a tour of what’s landing on your screen and why.

<details>
<summary><strong>Why am I hitting age walls now?</strong></summary>
You’re seeing more checks because children’s protections and enforcement timelines came into force through 2025, so services had to show “highly effective” age assurance around adult or harmful categories.

Under the OSA, services used by or likely to be accessed by children must assess risks and put systems in place that are proportionate and effective. Ofcom’s phased roadmap pushed illegal‑harms duties first, then children’s codes in mid‑2025, which is why many platforms shipped gated access at the same time. See the government explainer and Ofcom’s roadmap for dates and scope: [gov.uk OSA explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer), [Ofcom roadmap](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/roadmap-to-regulation).

Key dates to anchor what you’re seeing: <strong>17 March 2025</strong> (illegal‑content duties enforceable) and <strong>25 July 2025</strong> (children’s codes and age‑assurance expectations in force). See Ofcom’s children’s codes hub for what services had to implement: [Ofcom—Protecting children online](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/protecting-children-online).
</details>

<details>
<summary><strong>Do I need to upload my passport everywhere?</strong></summary>
No—there isn’t a single mandated method. Good implementations start with low‑friction, privacy‑preserving checks, then offer stronger fallbacks only if needed.

Ofcom lists several methods that can be “highly effective,” including facial <em>age estimation</em> (delete images immediately), open banking (bank confirms you’re over 18), mobile‑network checks, digital IDs/PASS, and credit‑card checks that bind to the user. Self‑declaration isn’t acceptable. See Ofcom’s children’s codes and guidance: [Ofcom—Protecting children online](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online).
</details>

<details>
<summary><strong>Why does Reddit ask for a selfie but Steam wants a card?</strong></summary>
Different choices and trade‑offs. Reddit uses a verifier offering selfie age estimation (fast; non‑identifying) with ID as a fallback. Steam marks you “verified” if a valid credit card is on file.

Reddit’s approach can be quick and privacy‑respecting when deletion is enforced by the verifier (see TechCrunch on the UK rollout: [Reddit rolls out age verification](https://techcrunch.com/2025/07/15/reddit-rolls-out-age-verification-in-the-uk-to-comply-with-new-rules/)). Steam’s UK policy is simple but weaker against misuse (e.g., parent cards) and exclusionary for people without credit cards (Steam Help: [“Your UK Steam account is considered age verified…”](https://help.steampowered.com/en/faqs/view/292B-3DA3-CFC8-97F6)). Media coverage and developer trade press noted the drawbacks (e.g., [You now need a credit card to access mature content on Steam in the UK](https://www.gamedeveloper.com/business/you-now-need-a-credit-card-to-access-mature-content-on-steam-in-the-uk)). Ofcom’s criteria treat card checks as acceptable only when they meaningfully bind to the <em>user</em> ([Ofcom—children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
</details>

<details>
<summary><strong>Can I avoid checks with a VPN? Is that safer?</strong></summary>
You can route around some gates, but a shady VPN may see far more of your traffic than a certified verifier sees of your face/ID (which should be deleted on the spot).

Think of it as a trade‑off: a one‑time, auditable “age OK” token versus ongoing exposure of all your browsing to an unknown network. If you use a VPN, pick a reputable provider and understand the risks; the law expects services to consider circumvention but doesn’t mandate universal ID or breaking encryption . See [gov.uk OSA explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer).

Reports in mid‑ to late‑2025 show some users discussing workarounds, but the safer path is usually to choose a privacy‑preserving on‑platform method and ensure deletion is real (see Ofcom’s children’s codes, linked above).
</details>

<details>
<summary><strong>What if I don’t have a smartphone or I fail a face check?</strong></summary>
You should be able to pick another route and try again without being locked out unfairly.

Reasonable alternatives include: ID+liveness via webcam, bank‑sourced age attribute (open banking), a mobile‑network check, PASS (digital proof of age), or email‑based estimation where appropriate. If a face estimation fails due to lighting or camera quality, a good flow offers a quick retry or switches to a stronger fallback (see [Ofcom—children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
</details>

<details>
<summary><strong>What about shared or parent devices?</strong></summary>
On shared devices, a “credit card on file” gate may reflect the parent’s card rather than the person actually using the account. That’s why simple card‑only gating is weak: it doesn’t bind the <em>user</em>.

Better flows bind the check to the account holder via estimation, ID+liveness, bank proof, or MNO checks, and remember the result as an “age OK” token (Ofcom’s “highly effective” criteria emphasise robustness and reliability). Steam’s help page confirms the card‑on‑file design: [Steam Help](https://help.steampowered.com/en/faqs/view/292B-3DA3-CFC8-97F6).
</details>

<details>
<summary><strong>Isn’t this exclusionary for people without credit cards or good cameras?</strong></summary>
It shouldn’t be. “Highly effective” is a standard for outcomes, not a single tool. Good services offer more than one route so you can choose a non‑card, non‑face option.

If you don’t have a credit card, use open banking, MNO, PASS, or ID+liveness. If your camera is poor, switch to a stronger fallback. If a platform offers only one route, that’s a design choice you can challenge (see [Ofcom—children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
</details>

<details>
<summary><strong>What else will I notice beyond age checks?</strong></summary>
You should see clearer reporting routes, safer defaults for young users, more consistent takedowns of clearly illegal content, and optional controls for adults.

Specifically: in‑app reporting and complaints, teen‑safe defaults (limited recommendations; tighter contact eligibility), faster removal of illegal content (e.g., child sexual abuse material, terrorism, fraud, revenge porn), and optional filters adults can turn on to reduce exposure to abuse or other legal‑but‑unwanted content. These reflect services’ duties to assess risk, design safer systems, and be transparent (see [Ofcom—online safety hub](https://www.ofcom.org.uk/online-safety) and [gov.uk OSA explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer)).
</details>

