# C) How age assurance works (no waffle)

<details>
<summary><strong>What counts as “highly effective” (HEAA)?</strong></summary>
Ofcom’s basket includes several methods that can meet the bar if implemented well:
- <strong>Photo‑ID + liveness</strong> (you scan a government ID and prove you’re a real person, not a recording).
- <strong>Facial age estimation</strong> (a selfie is analysed to estimate age; it does <em>not</em> identify you).
- <strong>Mobile‑network (MNO) checks</strong> (carrier confirms an adult account).
- <strong>Credit‑card checks</strong> (can help, but must bind to the <em>user</em>, not just “a card exists”).
- <strong>Digital ID wallets / PASS</strong> (re‑usable age credentials).
- <strong>Open banking</strong> (bank confirms you’re over 18 without sharing your full identity).
- <strong>Email‑based age estimation</strong> (signals from long‑lived addresses and other data; low friction but needs coverage).
Self‑declaration (“I’m over 18”) is <em>not</em> acceptable.
</details>

<details>
<summary><strong>Is facial estimation “biometric ID”?</strong></summary>
No—estimation infers an age band from an image and should delete the image immediately. It does not match you to a known identity. When confidence is low (e.g., near 18; poor lighting; atypical features), the service should offer a stronger fallback like ID+live or bank‑sourced age.
</details>

<details>
<summary><strong>How good is it, and for whom?</strong></summary>
Vendors publish accuracy near threshold ages (e.g., how reliably 18‑year‑olds are identified as 18+). Good practice is to:
- quantify error rates by age band and demographic,
- build a buffer near 18 (be conservative when confidence is low),
- <strong>always</strong> provide non‑face fallbacks (ID, PASS, open banking) to avoid bias or exclusion.
</details>

<details>
<summary><strong>Which methods are strong vs weak?</strong></summary>
- <strong>ID + liveness</strong>: strong binding; higher friction; needs good anti‑fraud.
- <strong>Open banking</strong>: strong and privacy‑preserving; binds to the person controlling the bank app.
- <strong>Facial estimation</strong>: fast and privacy‑preserving if images are deleted; probabilistic; needs fallback.
- <strong>Email estimation</strong>: very low friction; depends on email history/coverage; needs fallback.
- <strong>MNO checks</strong>: quick binary adult flag; varies by carrier coverage; usually one layer of assurance.
- <strong>Credit‑card checks</strong>: helpful only when you prove the <em>user</em> controls an adult card; “card on file” alone is weak.
</details>

<details>
<summary><strong>How should a decent flow work?</strong></summary>
Start with a low‑friction method (e.g., facial estimation or email estimation). If confidence is low, offer alternatives: ID+live, open banking, MNO, PASS. On success, issue a short‑lived “age OK” token and delete images immediately.
</details>

<details>
<summary><strong>Mini‑FAQ</strong></summary>
- <strong>Do they keep my face?</strong> Certified flows should not—images are used to compute an age and then deleted.
- <strong>What if I’m mis‑aged?</strong> You must be able to retry in better lighting or switch to a fallback (ID, PASS, bank) without being locked out unfairly.
- <strong>Can I avoid biometrics entirely?</strong> Yes—choose a non‑face method (open banking, ID+live, PASS, MNO). Services should present options.
</details>

