# Billionaire database — normalized data tables

JSONL tables (one JSON object per line), rebuilt from the raw research pile in
`/home/bobbigmac/projects/toys/open-source-research/billionaires/` by
`scripts/ingest.py`. Think of each file as a table; join keys are stable ids.

Rebuild: `python3 scripts/ingest.py` (stdlib only)
Query:   `python3 scripts/query.py "select ..."` (DuckDB over JSONL)

New-drop intake (Downloads → pile → tables) is an operator job, not a script:
see `tasks/data-ingestion.task.json`.

## Tables

| File | Rows | Grain |
|---|---|---|
| `people.jsonl` | 3,394 | one row per person: 3,378 roster + 16 API-only persons (`in_roster=false`) |
| `entities.jsonl` | 1,279 | non-person graph nodes (wealth-source labels, industry labels, company assets, orgs) |
| `memberships.jsonl` | 7,952 | person → entity edges (asset holdings, feed-reported entity links, curated org roles) — now ALSO includes roster `snapshot_contextual_affiliation` cohort edges (industry / source-of-wealth groupings); those are derivable from `people.industry`/`people.source_of_wealth` + `entities`, treat as discovery context, never "knows" |
| `relationships.jsonl` | 1,203 | person ↔ person records, all evidence tiers, deduped by (pair, origin, class) |
| `api_observations.jsonl` | 1,321 | raw directed `/related` feed observations |
| `asset_records.jsonl` | 252 | raw `/assets` feed rows |
| `sources.jsonl` | 305 | unified source registry (`S##`, `SRC###`, `WEB-##`, `ISO###`, `ASSET_SRC_*`, `API_PROFILE_FEED`) |
| `evidence_links.jsonl` | 8,345 | edge → source join (unfiltered — includes links for derivable/dropped edges; join on `edge_id` against the kept tables) |
| `caveats.jsonl` | 135 | distinct caveat strings, referenced via `caveat_id`; `boilerplate=true` marks generated disclaimers |
| `manifest.json` | 1 | snapshot date/source + feed URL templates |
| `known_companies.txt` | ~2,400 | real company names (Fortune Global 500, Forbes Global 2000, S&P 500) — recognition vocabulary for company-name labels |
| `company_lineage.jsonl` | 21 | curated name histories: `from`, `to`, `kind` (renamed/acquired/merged/restructured), `year`, `note` — era-distinct identities stay separate nodes |

## Key fields

`people`: `id` (profile-uri slug, join key), `name`, `rank`, `gender`, `age`,
`net_worth_usd_millions`, `citizenship`, `industry`, `source_of_wealth[]`,
`at_least_1bn`, `in_roster`,
`tie_count`, `sourced_tie_count` (denormalized rollup over relationships).
Snapshot date/source live once in `manifest.json`.

`relationships`: `id`, `a`/`b` (person ids — join `people` for names), `type`,
`label`, `origin` (`curated_research` | `api_related` | `derived_shared_asset` |
`derived_shared_holding` | `api_shared_entity`),
`class` (assertion class: `curated:<type>` or `api_labeled` / `unspecified` /
`shared_asset` / `shared_education` / `shared_employment` / `shared_wealth_origin`),
`confidence`, `evidence_status`, `status`, `time_start/end`,
`evidence_summary` (only real researched summaries kept; generated restatements
dropped), `caveat_id` → `caveats`, `source_ids[]` → `sources`,
`source_urls[]` (article URLs only; derivable feed URLs stripped), `batch`.

`memberships`: `id` (edge id), `kind` (edge_class verbatim — including
`snapshot_contextual_affiliation` and `*_derived` variants), `source` (person
slug or org/entity node id), `entity` (target node id), `label`, `confidence`,
`caveat_id`, `source_ids[]`.

`api_observations`: `id`, `source_uri`/`target_uri` (person ids), `raw_label`,
`interpreted_class`, `interpreted_value`, `confidence`, `evidence_status`,
`caveat_id`, `batch`. Feed URL = `manifest.related_feed_url_template` +
`source_uri`.

`evidence_links`: `edge_id`, `source_id` (→ `sources` for title/url/publisher),
`note` (only hand-written notes kept; generated "raw label"/"asset feed lists"
notes dropped).

`asset_records`: `person`, `company`, `ticker`, `exchange`, `number_of_shares`,
`share_price`, `currency`, `current_price`, `record_status`, `as_of_date`.
Feed URL = `manifest.assets_feed_url_template` + `person`.

## Evidence tiers (display discipline)

- `curated_research` — hand-sourced ties; safe to present as relationships (143 people have one).
- `api_related` — Forbes `/related` feed; explicit labels kept verbatim, still needs verification.
- `derived_shared_asset` / `derived_shared_holding` — exposure overlap only, not contact.
- `memberships` affiliations — cohorts for discovery; never render as "knows".
- `caveats.boilerplate=true` — generated "not evidence of contact" disclaimers; collapse or omit in display. `boilerplate=false` rows carry record-specific info — show them.

## Enrichment workflow

Roster-only people get depth in batches. Convention: a batch lands as CSV/JSON
somewhere reviewable, then a merge pass upserts `people` rows by `id` (add
`profile`, `description`, `vibes`, `bucket`, `tags` fields) or appends rows to
`relationships`/`sources`. Keep `id` = `Profile URI` slug so joins never break.

## Publish boundary

`build-orchestrator.js` excludes `data/` and `scripts/` from the published
`docs/` output — these files are build-time reference, not shipped assets.
