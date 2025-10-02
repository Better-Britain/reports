# D) Over‑/under‑compliance & case studies

<details>
<summary><strong>What does “good” look like?</strong></summary>
- Offers more than one route (e.g., estimation first; ID/bank/MNO fallback).
- Deletes images after verification and stores only an “age OK” token.
- Explains choices in plain English and gives a clear appeal path.
- Minimises exclusion (no “credit‑card only”).
</details>

<details>
<summary><strong>What does “bad/lazy” look like?</strong></summary>
- Treats “credit card on file” as verification without binding to the user.
- Hides behind “no third party” while avoiding equivalent in‑house methods.
- Offers a single route that many can’t use, or keeps data longer than needed.
- Makes users repeat checks because systems aren’t designed to remember a valid result.
</details>

<details>
<summary><strong>Examples (patterns to copy or avoid)</strong></summary>
- <strong>Multi‑method flows</strong>: Estimation → fallback (ID/OPEN BANKING/PASS). Low friction for most; strong bind where needed.
- <strong>Card‑only gating</strong>: Fast to ship but weak against parent‑card misuse and needlessly exclusionary.
- <strong>“We delete by default”</strong>: Vendor or in‑house system deletes images immediately; keeps only anonymous age tokens.
- <strong>“Retry or switch” UX</strong>: If an estimation fails (lighting, camera), offer a quick retry or a different method without penalty.
</details>

<details>
<summary><strong>What happens when checks fail?</strong></summary>
The burden stays on the service: provide retries, alternative methods (PASS/open‑banking/IDV/MNO), and a simple appeal. Don’t block adults indefinitely because a single method struggled.
</details>

