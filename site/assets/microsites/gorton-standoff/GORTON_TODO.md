# Gorton & Denton Showdown — TODO

## Evidence model / authoring

- [ ] Add `slot="..."` to every statement block (or rely on build inference):
  - `standoff` = drives the main interactive bubbles/counts
  - `further` = “Further claims & evidence” (doesn’t power the standoff)
  - `gallery` = used by the flyer-scan/gallery section (usually image-based, not statements)
  - `additional` = sources we acknowledge but didn’t attach to any statement
- [ ] Keep every statement assigned to exactly one of the 5 issue categories:
  - `culture-war`, `jobs-rights`, `homes-streets`, `health-care`, `transport-air`
  - (Use `issue="context"` only for housekeeping blocks that never enter the standoff.)
- [ ] Where `kind="said"` / `kind="quote"` is used:
  - [ ] First paragraph must start with `>` and must be the speaker’s exact words
  - [ ] Use `<span class="compress">…</span>` inside the quote if trimming non-essential filler
- [ ] Add `speaker="..."` / `speakerName="..."` when the speaker differs from the candidate.

## Page content

- [ ] Add “How to read this” block after the interactive:
  - parties aren’t neutral narrators of opponents
  - for‑profit media/analysis often optimises for attention/incentives rather than fair comparison
  - invite readers to check primary sources/receipts
- [ ] Add flyer scan gallery near the bottom (before Additional sources):
  - [ ] click thumbnail → modal viewer
  - [ ] pan/drag large images
  - [ ] zoom (wheel + buttons)
  - [ ] flip front/back when a pair exists
- [ ] Add “Additional sources” section (links we used but didn’t attach to a statement).
- [ ] Add a simple “activity by issue” table at the end:
  - columns: Stogia / Spencer / Goodwin
  - rows: the 5 issue categories
  - cells: counts of relevant published evidence blocks

## UI/UX polish

- [ ] Add a tiny always-visible source credit for each receipt (e.g. “— Guardian”, “— BBC”).
- [ ] Add a similar tiny source credit link in the speech bubble UI.
- [ ] Ensure no‑JS browsing still works:
  - receipts list readable
  - flyer scans open as plain links/images without the modal

## Assets

- [ ] Add placeholder flyer images in `site/assets/microsites/gorton-standoff/images/flyers/` (front/back pairs).
- [ ] Replace placeholders with real scanned flyers later (keep naming convention for pairing).

