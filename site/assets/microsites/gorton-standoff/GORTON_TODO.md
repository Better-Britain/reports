# Gorton & Denton Showdown — TODO

## Evidence model / authoring

- [x] Add `slot="..."` support (with build inference):
  - `standoff` = drives the main interactive bubbles/counts
  - `further` = “Further claims & evidence” (doesn’t power the standoff)
  - `gallery` = used by the flyer-scan/gallery section (usually image-based, not statements)
  - `additional` = sources we acknowledge but didn’t attach to any statement
- [ ] Add `slot="..."` explicitly to every statement block (optional cleanup).
- [ ] Keep every statement assigned to exactly one of the 5 issue categories:
  - `culture-war`, `jobs-rights`, `homes-streets`, `health-care`, `transport-air`
  - (Use `issue="context"` only for housekeeping blocks that never enter the standoff.)
- [ ] Where `kind="said"` / `kind="quote"` is used:
  - [ ] First paragraph must start with `>` and must be the speaker’s exact words
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
- [ ] Implement 5choice-picker, triangle of primary candidates and circle of other candidates and other speakers
- [ ] Identify progression through 'choose an issue genre' pie-slice from the picker (illuminated)
  - it should when selected, animate back down the centre, 
  - then show quotes from people pertinent
    - animating into our out of the scene any supporting figures, 
    - the 3 main candidates are always visible
- The speech bubbles will need to be dynamically placed/drawn at runtime, but always AROUND the speaker, just so as to not cramp or overlap. If there are too many speech bubbles, they can shrink to fit, but we probably need a basic placement-system that positions them absolutely within the container (relative) with an appropriate z-index.
  - The structure/markup for info should basically be genre->said, so all the js is really doing is selecting all the statements that apply to the selected genre (which makes our UI/diagram basically a genre-selector that affects visibility), so our no-js version is basically group panels, and when the user expands via summary/details we get to see what is in that genre for the speakers on the grid. Animations are a monkey patch over that. 
- [ ] Ensure no‑JS browsing still works:
  - receipts list readable
  - flyer scans open as plain links/images without the modal

## Assets

- [x] Add placeholder flyer images in `site/assets/microsites/gorton-standoff/images/flyers/` (front/back pairs).
- [ ] Replace placeholders with real scanned flyers later (keep naming convention for pairing).
