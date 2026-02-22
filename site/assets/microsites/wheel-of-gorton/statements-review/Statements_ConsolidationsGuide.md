Diff summary (vs `Statements.md` )

* `Statements_redone_by_grok.md` rewrites **107/140** statement blocks (mostly language/voice + some metadata) 
* `Statements_redone_by_chatgpt.md` rewrites **59/140** blocks, adds a few extra sources, but also introduces a handful of broken/truncated lines; it also **drops `gd-999`** 
* `Statements_supplementals_by_grok.md` adds **30 brand-new blocks** (`gd-400`–`gd-490`) not present in the main file 

---

## What’s truly “new content” (not in `Statements.md`)

All of this comes from the supplemental file; nothing else introduces new IDs (except ChatGPT *removing* `gd-999`). 

**Angeliki Stogia (7 new blocks)**

* `gd-400` (2026-02-15) “Division is easy — bringing people together is hard.”
* `gd-401` (2026-02-21) pledges: GP provision, “fair share” investment, fly-tipping/alley gates, breakfast clubs
* `gd-402` (2026-02-17) minimum wage uplift + free breakfast clubs “up to £450 better off”
* `gd-403` (2026-02-12) “welcome to Manchester” line to Goodwin
* `gd-450` (2026-02-21) unity vs divisive politics quote
* `gd-451` (2026-02-21) Gaza/doorknocking divisiveness quote
* `gd-452` (2026-02-21) breakfast clubs + alley gates etc (overlaps `gd-401` but worded differently)

**Matt Goodwin (6 new blocks)**

* `gd-410` (2026-02-17) small business taxes/jobs quote
* `gd-411` (2026-02-17) “open borders”/housing/migrants quote
* `gd-412` (2026-02-22) deportation/terrorism quote
* `gd-413` (2026-02-22) “Ellis Island… pause migration…” quote
* `gd-460` (2026-02-21) “slash energy bills… more police…” (documented)
* `gd-461` (2026-02-21) “Reform UK are the unity campaign” quote

**Hannah Spencer (10 new blocks)**

* `gd-420` (2026-02-21) “system is designed to keep people like me out…”
* `gd-421` (2026-02-21) defending Muslim neighbours / criticising Goodwin
* `gd-422` (2026-02-21) litter/fly-tipping/local control quote
* `gd-423` (2026-02-21) free prescriptions/dentistry/eye care/hearing aids quote
* `gd-424` (2026-02-20) Omnisis poll: Green 33 / Reform 29 / Labour 26 (adjusted base)
* `gd-470` (2026-02-21) navigating politics system quote
* `gd-471` (2026-02-21) “tarring people with the same brush…” quote (close to `gd-421`)
* `gd-472` (2026-02-21) repeat of litter/fly-tipping quote
* `gd-473` (2026-02-21) repeat of free-healthcare quote
* `gd-474` (2026-02-21) privatisation/shareholders quote

**Charlotte Cadden (4 new blocks)**

* `gd-430` (2026-02-17) “Older people are frightened…” immigration quote
* `gd-431` (2026-02-01) priorities: grooming gangs inquiry / carbon tax / phones in schools quote
* `gd-480` (2026-02-21) campaign priorities (documented)
* `gd-481` (2026-02-19) “standing up when things are wrong…” quote

**Jackie Pearcey (3 new blocks)**

* `gd-440` (2026-02-21) substandard housing + NHS/cost of living quote
* `gd-441` (2026-02-17) buy-to-let / investors quote
* `gd-490` (2026-02-21) housing + energy bills etc (documented)

**Important:** the supplemental file has **4 broken meta lines** where an *issue slug got shoved into `party=` and `issue=` is missing*: `gd-472`, `gd-473`, `gd-474`, `gd-481`. 

---

## Metadata improvements in the rewrites (worth porting)

Both rewrite files add `speaker=` / `speakerName=` on “said” blocks where the speaker isn’t the candidate, which your build rules explicitly support.

Added speaker metadata (present in Grok; mostly also in ChatGPT):

* `gd-304` speaker Andy Burnham 
* `gd-306` speaker Lucy Powell
* `gd-307` speaker Lucy Powell
* `gd-309` speaker Keir Starmer
* `gd-310` speaker Nadia Whittome
* `gd-320` speaker Zack Polanski
* `gd-330` speaker Nigel Farage
* `gd-331` speaker Nigel Farage

Speaker metadata only in ChatGPT (missing from Grok):

* `gd-301` speaker Andy Burnham 

Candidate attribution fixes:

* `gd-163` in main is mis-filed under Goodwin/Reform; both rewrites move it to **Hannah Spencer / Green**.
* `gd-051` (“10 of 11 candidates attended…”) becomes `candidate="context"` in Grok (main ties it to Goodwin).

---

## Extra sources that exist only in the ChatGPT rewrite

These are pure additions (new URLs not in `Statements.md`).

* `gd-301` adds 2 more links (Guardian + V2 Radio) alongside the existing coverage 
* `gd-306` adds an ITV Granada link 
* `gd-309` adds LabourList + ITV 
* `gd-352` adds Not Really Here Media link 
* `gd-356` adds Not Really Here Media (Tameside Reporter section) link 
* `gd-307` adds a Guardian liveblog link (worth sanity-checking relevance before keeping) 

---

## Headline quote / language changes where the *actual quoted words* differ

These are the places where you’re not just getting a cleaner attribution sentence; the “headline” quote itself changes.

### Changes in Grok (9 blocks)

* `gd-160` main: “they’re scared to leave their house…” → Grok expands to the full “Matthew… security guys… interfaith women…” quote
* `gd-161` main: “running a policy of open borders…” → Grok swaps to a different long quote (“I’m not going to be lectured…”)
* `gd-140` main: “false information” → Grok: “false information spread by the media”
* `gd-091` main: single sentence → Grok: full multi-sentence quote about humiliation + rejoin bloc
* `gd-060` main has ellipses → Grok removes ellipses and gives a continuous sentence
* `gd-307` main is basically keywords (“Andy Burnham” / “Keir Starmer”) → Grok uses a full Powell quote
* `gd-260` main: “start lowering taxes” → Grok uses a longer Libertarian quote about lowering taxes + opposing government growth
* `gd-251` main quote starts mid-thought → Grok adds the lead-in (“I’m standing… positive vision…”)
* `gd-215` Grok compresses the two-paragraph quote into one long blockquote paragraph

### Changes in ChatGPT (8 blocks) that *diverge from Grok/main*

* `gd-121` headline quote is completely swapped (different excerpt)
* `gd-120` expands the quote with a new opening sentence (“There’s a terrific housing crisis…”)
* `gd-260` adds *three* quoted paragraphs; Grok only expands the original
* `gd-306` changes “one team” → “one team” with “one objective”
* `gd-307` uses a *different* long Powell quote than Grok (and it shifts topic toward vote-splitting)
* `gd-309` expands “divert our resources” into a full sentence quote
* `gd-091` splits the long quote into two separate blockquote paragraphs 
* `gd-160` matches Grok’s expanded quote

---

## The big “everywhere” rewrite differences (mostly Grok)

Grok’s changes are overwhelmingly this pattern: remove “BBC/Guardian/… reported” from the claim sentence and write in direct voice (“X said…”, “Labour warned…”) while leaving the sourcing to the `Sources:` list. That accounts for the majority of the 107 modified blocks.

---

## Known bad edits (don’t port as-is)

These are **broken/truncated** in `Statements_redone_by_chatgpt.md` and need manual repair if you take anything from that block. 

* `gd-071` (“danger zone”) attribution sentence is cut off (“…were frequently in the.”)
* `gd-082` (“not anti-car”) attribution sentence is cut off (“…said she was.”)
* `gd-100` attribution sentence is cut off (“…cautioned against.”)
* `gd-140` attribution sentence is cut off (“…Goodwin called it.”)
* `gd-150` attribution sentence is cut off (“…and said she would.”)
* `gd-060`, `gd-062`, `gd-342` have duplicated “Nick Buckley MBE Buckley …”

---

## Complete ID lists (so you can target reviews fast)

**Supplementals (new blocks to merge):**

```text
gd-400, gd-401, gd-402, gd-403, gd-410, gd-411, gd-412, gd-413, gd-420, gd-421, gd-422, gd-423, gd-424,
gd-430, gd-431, gd-440, gd-441, gd-450, gd-451, gd-452, gd-460, gd-461, gd-470, gd-471, gd-472, gd-473,
gd-474, gd-480, gd-481, gd-490
```



**Blocks changed in Grok rewrite (107):**

```text
gd-010, gd-020, gd-021, gd-030, gd-031, gd-032, gd-033, gd-034, gd-040, gd-041, gd-042, gd-050, gd-051,
gd-060, gd-061, gd-062, gd-070, gd-071, gd-080, gd-081, gd-082, gd-083, gd-084, gd-090, gd-091, gd-100,
gd-110, gd-120, gd-121, gd-130, gd-140, gd-150, gd-160, gd-161, gd-162, gd-163, gd-170, gd-171, gd-172,
gd-173, gd-175, gd-176, gd-177, gd-180, gd-181, gd-183, gd-184, gd-186, gd-190, gd-191, gd-192, gd-195,
gd-209, gd-210, gd-215, gd-216, gd-217, gd-218, gd-230, gd-231, gd-240, gd-241, gd-250, gd-251, gd-252,
gd-260, gd-261, gd-262, gd-270, gd-271, gd-275, gd-280, gd-281, gd-290, gd-300, gd-301, gd-302, gd-303,
gd-304, gd-305, gd-306, gd-307, gd-308, gd-309, gd-310, gd-311, gd-312, gd-320, gd-321, gd-330, gd-331,
gd-340, gd-341, gd-342, gd-343, gd-348, gd-349, gd-350, gd-351, gd-352, gd-353, gd-355, gd-356, gd-360,
gd-361, gd-364, gd-366
```



**Blocks changed in ChatGPT rewrite (59) + one deletion:**

```text
gd-030, gd-042, gd-060, gd-062, gd-070, gd-071, gd-082, gd-091, gd-100, gd-110, gd-120, gd-121, gd-130,
gd-140, gd-150, gd-160, gd-161, gd-162, gd-163, gd-172, gd-175, gd-181, gd-183, gd-184, gd-190, gd-191,
gd-192, gd-195, gd-215, gd-217, gd-218, gd-240, gd-251, gd-260, gd-271, gd-301, gd-304, gd-305, gd-306,
gd-307, gd-308, gd-309, gd-310, gd-311, gd-312, gd-320, gd-321, gd-330, gd-331, gd-340, gd-341, gd-342,
gd-343, gd-348, gd-349, gd-350, gd-351, gd-352, gd-353, gd-355, gd-356, gd-360, gd-361, gd-364, gd-366,
gd-999 (removed)
```



---

## I also generated a “merged draft” file you can start from

Base = Grok rewrite, plus:

* adds ChatGPT’s extra source links (where they’re genuinely new),
* adds the missing `speaker=` metadata for `gd-301`,
* inserts all supplemental blocks,
* fixes the 4 broken supplemental meta lines (`gd-472/473/474/481`).

[Download Statements_merged_draft.md](sandbox:/mnt/data/Statements_merged_draft.md)
