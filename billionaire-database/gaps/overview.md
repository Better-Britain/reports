# Billionaire Database — research brief: How to use these briefs

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

Each file in this directory is a self-contained research brief: context, task, return schema, and the gap rows. Upload a file to a research-capable model, let it work, and hand the returned CSV back — it merges straight into the dataset as new curated/verified edges.

## Task

Pick a brief by priority (higher-listed = higher value), run it, return CSV rows matching the schema inside that file.

## Return format

One CSV row per verified tie — this file's findings get merged into the
dataset, so the columns are the merge contract:

```
person_a_uri,person_b_uri,relationship_type,relationship_label,confidence,evidence_summary,source_urls
- person_a_uri / person_b_uri: use the slug exactly as given below.
- relationship_type: snake_case (siblings, cofounders, spouse, board_colleagues, early_investor, …).
- relationship_label: human wording as found in the source.
- confidence: high | medium | low (high = two+ independent reputable sources).
- evidence_summary: one sentence, factual, naming the source claim.
- source_urls: ';'-separated absolute URLs to the evidence.
- Only include a row if you found a citable source. Silence is an answer.
```

## Gaps (9)

| file | what it covers | rows |
|---|---|---|
| brief-top-roster-ties.md | Top roster people with no sourced ties | 3235 |
| brief-api-labeled-pairs.md | Feed-labeled pairs lacking an independent source | 269 |
| brief-derived-pairs.md | Pairs sharing assets or holdings — unverified | 152 |
| brief-family-surname-candidates.md | Same-surname, same-country pairs (possible undetected family) | 1174 |
| brief-company-ties.md | Company memberships — verify and complete | 337 |
| brief-company-lineage.md | Company name histories — renames, takeovers, absorptions | 337 |
| brief-missing-fields.md | Roster rows missing basic fields | 2569 |
| brief-non-roster-people.md | People referenced by the feeds but absent from the roster | 16 |
| brief-political-and-donor-webs.md | Political funding and donor webs — the dark part of the map | 112 |
