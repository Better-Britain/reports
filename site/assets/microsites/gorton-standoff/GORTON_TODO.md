# Gorton & Denton Showdown — TODO

## Evidence model / authoring

- [x] Add `slot="..."` support (with build inference):
  - `standoff` = drives the main interactive bubbles/counts
  - `further` = “Further claims & evidence” (doesn’t power the standoff)
  - `gallery` = used by the flyer-scan/gallery section (usually image-based, not statements)
  - `additional` = sources we acknowledge but didn’t attach to any statement
- [ ] Add `slot="..."` explicitly to every statement block (optional cleanup).
- [x] Enforce allowed issue categories in build (`build.js` validates):
  - `culture-war`, `jobs-rights`, `homes-streets`, `health-care`, `transport-air`
  - (Use `issue="context"` only for housekeeping blocks that never enter the standoff.)
- [x] Enforce quote authoring rules in build:
  - [x] `kind="said"` / `kind="quote"` blocks must start with `>` (build validates)
  - [ ] Use `<span class="compress">…</span>` inside the quote if trimming non-essential filler
- [ ] Add `speaker="..."` / `speakerName="..."` when the speaker differs from the candidate.

## Page content

- [x] Add “How to read this” block after the interactive:
  - parties aren’t neutral narrators of opponents
  - for‑profit media/analysis often optimises for attention/incentives rather than fair comparison
  - invite readers to check primary sources/receipts
- [x] Add flyer scan gallery near the bottom (before Additional sources):
  - [x] click thumbnail → modal viewer
  - [x] pan/drag large images
  - [x] zoom (wheel + buttons)
  - [x] flip front/back when a pair exists
- [x] Add “Additional sources” section (links we used but didn’t attach to a statement).
- [x] Add a simple “activity by issue” table at the end:
  - columns: Stogia / Spencer / Goodwin
  - rows: the 5 issue categories
  - cells: counts of relevant published evidence blocks

## UI/UX polish

- [x] Add a tiny always-visible source credit for each receipt (e.g. “— Guardian”, “— BBC”).
- [x] Add a similar tiny source credit link in the speech bubble UI.
- [x] Implement a pie-style 5-choice picker + triangle + rings (basic):
  - SVG pie slices + buttons (clickable, keyboard focusable)
  - primary-candidate triangle always visible
  - “other speakers” ring exists and is shown per-issue
- [x] Basic issue selection progression:
  - selected slice is highlighted
  - center label updates + bounces
  - bubbles update per issue
- [x] Basic bubble placement system (anchors to speaker, offsets by index)
- [ ] (Optional polish) Animate “token” dropping to center before bubbles appear
- [ ] (Optional polish) Better bubble de-overlap / shrink-to-fit for crowded issues
- [ ] Ensure no‑JS browsing still works:
  - receipts list readable
  - flyer scans open as plain links/images without the modal

## Assets

- [x] Add placeholder flyer images in `site/assets/microsites/gorton-standoff/images/flyers/` (front/back pairs).
- [ ] Replace placeholders with real scanned flyers later (keep naming convention for pairing).
