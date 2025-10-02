# C) How age assurance/verification works

<details>
<summary><strong>What counts as “highly effective” (HEAA)?</strong></summary>
“Highly effective” means the method reliably keeps under‑18s out of adult content while being robust, fair, and proportionate. Ofcom lists a basket of acceptable approaches rather than a single tool: [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online).

- <strong>Photo‑ID + liveness</strong>: scan a government ID and prove you’re a real person, not a recording.
- <strong>Facial age estimation</strong>: a selfie is analysed to estimate age; it does <em>not</em> identify you.
- <strong>Mobile‑network (MNO) checks</strong>: your carrier confirms an adult account.
- <strong>Credit‑card checks</strong>: can help, but must bind to the <em>user</em>, not just “a card exists.”
- <strong>Digital ID wallets / PASS</strong>: reusable age credentials.
- <strong>Open banking</strong>: your bank confirms you’re over 18 without sharing full identity.
- <strong>Email‑based age estimation</strong>: signals from long‑lived addresses and other data; low friction but needs coverage.

Self‑declaration (“I’m over 18”) does <em>not</em> meet the standard. See also the [gov.uk OSA explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer) for a plain‑English overview.
</details>

<details>
<summary><strong>Is facial estimation “biometric ID”?</strong></summary>
No. Estimation infers an age band from an image and should delete the image immediately; it does not match you to a known identity.

Where confidence is low (e.g., near 18; poor lighting; atypical features), services should offer stronger fallbacks such as ID+liveness or bank‑sourced age. That’s how platforms meet Ofcom’s robustness and fairness aims without hoarding images (see Ofcom’s [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).

Accuracy varies by age band and conditions. Independent assessments and regulator materials indicate high accuracy for clear under‑/over‑18 distinctions, with lower confidence near thresholds—hence the need for buffers and fallbacks. (See Ofcom’s design expectations in the codes above.)
</details>

<details>
<summary><strong>How good is it, and for whom?</strong></summary>
Generally good enough for an 18+ gate when used with sensible buffers and fallbacks; performance varies by age band and conditions.

Good practice (reflected in Ofcom’s intent) is to publish error behaviour around threshold ages, be conservative near 18, test for and remediate bias, and <em>always</em> provide a non‑face alternative (ID, PASS, open banking) so people aren’t excluded if estimation struggles. See Ofcom’s design expectations in the [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online).
</details>

<details>
<summary><strong>Which methods are strong vs weak?</strong></summary>
There are various technologies and approaches used by different companies and platforms, usually for technical considerations, focusing on low-impact changes when done well. Strong methods generally bind to the user and resist easy workarounds; weak ones don’t.

- <strong>ID + liveness</strong>: strongest binding; higher friction; needs solid anti‑fraud.
- <strong>Open banking</strong>: strong and privacy‑preserving; binds to the person controlling the bank app.
- <strong>Facial estimation</strong>: fast, privacy‑preserving if images are deleted; probabilistic, so you need fallbacks.
- <strong>Email estimation</strong>: very low friction; depends on email history/coverage; needs fallbacks.
- <strong>MNO checks</strong>: quick adult flag from a carrier; coverage varies; typically one layer in a stack.
- <strong>Credit‑card checks</strong>: acceptable only when they meaningfully bind to the <em>user</em>; “card on file” alone is weak against parent‑card misuse. See Ofcom’s caveats in the [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online).
</details>

<details>
<summary><strong>How should a decent verification/response process work?</strong></summary>
Start light, escalate only when needed, and delete images.

A typical layered flow: begin with facial estimation or email‑based estimation; if confidence is low, offer ID+liveness, open banking, MNO or PASS. On success, issue a short‑lived “age OK” token and delete any images immediately. This meets Ofcom’s robustness/reliability/fairness objectives while keeping friction low (see [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online) and the [gov.uk explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer)).
</details>

<details>
<summary><strong>Mini‑FAQ</strong></summary>
- <strong>Do they keep my face?</strong> No—certified flows should explain that images are used transiently to compute an age and then deleted (check the provider’s notice).
- <strong>What if I’m mis‑aged?</strong> You should be able to retry (better lighting/camera) or switch to a fallback (ID, PASS, bank) without being locked out unfairly (Ofcom’s [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
- <strong>Can I avoid biometrics entirely?</strong> Yes—choose a non‑face method (open banking, ID+live, PASS, MNO). Services should present options (see Ofcom’s accepted methods in the [children’s codes](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-children-from-harms-online)).
- <strong>Is this fair for everyone?</strong> Ofcom expects services to test for bias and either remediate or provide alternatives where performance differs across demographics. That’s part of the “fairness” lens in the codes linked above.
</details>

<details>
<summary><strong>Who certifies these methods/providers?</strong></summary>
Independent certification helps validate deletion, security and accuracy claims.

- <strong>ACCS</strong>: The UK’s Age Check Certification Scheme audits age‑assurance providers and solutions against recognised standards (including privacy, security and performance). Look for an ACCS certificate for assurance over claims like “images are deleted immediately.” ([ACCS—Age Check Certification Scheme](https://accscheme.com/))
- <strong>DIATF</strong>: The UK Digital Identity and Attributes Trust Framework recognises certified identity/attribute providers and includes requirements relevant to age attributes. Providers operating under DIATF publish which schemes and roles they’re certified for. ([GOV.UK—Digital identity and attributes trust framework](https://www.gov.uk/government/collections/digital-identity-and-attributes-trust-framework))
- <strong>PASS</strong>: The Proof of Age Standards Scheme certifies physical and digital proofs of age accepted across the UK (e.g., Yoti PASS card; Post Office PASS). PASS‑certified credentials can be used as a non‑biometric route. ([PASS—Proof of Age Standards Scheme](https://www.pass-scheme.org.uk/))

Example: providers such as <strong>Yoti</strong> detail independent audits and certifications for their facial age estimation and ID verification flows, including deletion and accuracy statements; services should link to those attestations in‑product. (See your selected provider’s certification pages and audit summaries.)
</details>

