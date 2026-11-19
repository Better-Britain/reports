#!/usr/bin/env python3
"""Rebuild the normalized JSONL "tables" in ../data from the raw billionaire
research pile.

Sources:
  SRC_ROOT  = /home/bobbigmac/projects/toys/open-source-research/billionaires
    ├─ global_billionaires_snapshot_2026-11-17.csv      (roster, 3378)
    ├─ billionaire_relationship_*_2026-11-18.csv        (v1 curated graph)
    ├─ billionaire_relationship_network_v2_*            (full graph + raw feeds)
    ├─ billionaire_pair_links_append_only_v3.csv        (old cumulative ledger)
    ├─ billionaire_pair_mining_batch_001_*              (batch increment)
    └─ pair_mining_master_2026-11-18/                   (master pack, v8 ledger + batch_004/
                                                         + landed drops; see tasks/data-ingestion.task.json)

Output tables (one JSON object per line, sorted deterministically):
  people.jsonl          person records (roster + non-roster API persons)
  entities.jsonl        non-person graph nodes (labels, companies, orgs)
  memberships.jsonl     person -> entity edges (affiliations, asset holdings)
  relationships.jsonl   person <-> person records, all evidence tiers, deduped
  api_observations.jsonl raw directed /related feed rows
  asset_records.jsonl   raw /assets feed rows
  sources.jsonl         unified source registry (S##, SRC###, ASSET_SRC_*, API feed)
  evidence_links.jsonl  edge -> source join rows (non-generated notes only)
  caveats.jsonl         distinct caveat strings, referenced by caveat_id
  manifest.json         snapshot metadata + derivable feed URL templates

Generated strings (evidence summaries that restate the row's own fields,
templated notes, per-row feed URLs, roster snapshot columns repeated on
every record) are dropped or hoisted to the manifest — one copy, not 3,400.

Re-running is deterministic; tables are rebuilt wholesale from the sources.
"""

import csv
import json
import os
import sys
from pathlib import Path

SRC_ROOT = Path(os.environ.get(
    "BB_SRC",
    "/home/bobbigmac/projects/toys/open-source-research/billionaires"))
MASTER = SRC_ROOT / "pair_mining_master_2026-11-18"
BATCH004 = MASTER / "batch_004"
OUT = Path(__file__).resolve().parent.parent / "data"

# ----------------------------------------------------------------------------
# helpers


def read_csv(path):
    if not path.exists():
        print(f"  ! missing {path.name}", file=sys.stderr)
        return []
    with open(path, encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def write_jsonl(name, rows):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    with open(path, "w", encoding="utf-8") as fh:
        for row in rows:
            fh.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")
    print(f"  {name}: {len(rows)} rows")
    return path


def s(v):
    return str(v or "").strip()


def num(v):
    v = s(v)
    if not v:
        return None
    try:
        f = float(v)
        return int(f) if f.is_integer() else f
    except ValueError:
        return None


def truthy(v):
    return s(v).lower() in ("yes", "true", "1")


def split_semi(v):
    return [p.strip() for p in s(v).split(";") if p.strip()]


# ----------------------------------------------------------------------------
# caveats table — every distinct caveat/note string stored once; records carry
# caveat_id. boilerplate=True marks generated "not evidence of friendship"
# disclaimers so renderers can collapse them.

CAVEATS = {}


def caveat_id(text):
    text = s(text)
    if not text:
        return None
    if text not in CAVEATS:
        CAVEATS[text] = "c" + str(len(CAVEATS) + 1).zfill(4)
    return CAVEATS[text]


BOILERPLATE_PAT = (
    "not evidence", "not proof", "do not infer", "does not establish",
    "discovery signal", "similarity/classification", "not automatically",
    "discovery edge", "not a complete balance sheet", "does not imply",
    "not necessarily", "not independent", "retained verbatim",
    "inspect asset records", "see api assertions", "discovery/context",
)


def is_boilerplate(text):
    t = text.lower()
    return any(p in t for p in BOILERPLATE_PAT)


# generated one-line restatements of the row's own fields -> drop
GENERATED_SUMMARY_PREFIXES = (
    "rtb-api ", "derived from ", "one or more forbes-derived /related feeds",
    "profile feed connects both", "profile /assets endpoint returns",
    "the 2026-11-17 list snapshot classifies", "both appear in the",
    "both are classified", "api assertion", "positive share-count",
)


def generated_summary(text):
    t = s(text).lower()
    return not t or any(t.startswith(p) or ("feed assertion(s)" in t)
                        for p in GENERATED_SUMMARY_PREFIXES)


GENERATED_NOTE_PREFIXES = (
    "raw api relationship label:", "feed references common financial asset",
    "asset feed lists a positive share-count entry",
    "raw /assets endpoint lists",
)


def generated_note(text):
    t = s(text).lower()
    return not t or t.startswith(GENERATED_NOTE_PREFIXES)


RTB_API_BASE = "https://raw.githubusercontent.com/komed3/rtb-api/main/api/profile"


def is_feed_url(u):
    return s(u).startswith(RTB_API_BASE)


def pair_key(a, b):
    return "|".join(sorted((s(a), s(b))))


def is_person_ref(ref):
    ref = s(ref)
    return ref.startswith("person:") or (":" not in ref and bool(ref))


def person_slug(ref):
    ref = s(ref)
    return ref[len("person:"):] if ref.startswith("person:") else ref


# ----------------------------------------------------------------------------
# people


def build_people():
    people = {}
    for row in read_csv(SRC_ROOT / "global_billionaires_snapshot_2026-11-17.csv"):
        pid = s(row["Profile URI"])
        if not pid:
            continue
        people[pid] = {
            "id": pid,
            "name": s(row["Name"]),
            "rank": num(row["Rank"]),
            "gender": s(row["Gender"]) or None,
            "age": num(row["Age"]),
            "net_worth_usd_millions": num(row["Net Worth (USD millions)"]),
            "citizenship": s(row["Citizenship code (source)"]) or None,
            "industry": s(row["Industry"]) or None,
            "source_of_wealth": split_semi(row["Source of wealth"]),
            "at_least_1bn": truthy(row["At least USD 1bn"]),
            "in_roster": True,
        }

    # Non-roster persons the Forbes /related feeds referenced.
    for row in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_nodes.csv"):
        if s(row["node_type"]) != "person":
            continue
        pid = person_slug(row["node_id"]) or s(row["profile_uri"])
        if not pid or pid in people:
            continue
        people[pid] = {
            "id": pid,
            "name": s(row["name"]),
            "rank": num(row["snapshot_rank"]),
            "gender": None,
            "age": None,
            "net_worth_usd_millions": num(row["net_worth_usd_millions"]),
            "citizenship": None,
            "industry": None,
            "source_of_wealth": [],
            "at_least_1bn": None,
            "in_roster": False,
        }
    return people


# ----------------------------------------------------------------------------
# entities (non-person graph nodes)


def build_entities():
    entities = {}
    for row in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_nodes.csv"):
        if s(row["node_type"]) == "person":
            continue
        nid = s(row["node_id"])
        if not nid:
            continue
        entities[nid] = {
            "id": nid,
            "type": s(row["node_type"]),
            "name": s(row["name"]),
            "category": s(row["category"]) or None,
            "ticker": s(row["ticker"]) or None,
            "exchange": s(row["exchange"]) or None,
        }
    return entities


# ----------------------------------------------------------------------------
# memberships (person -> entity edges)


def build_memberships():
    rows = {}
    for e in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_edges.csv"):
        if s(e["target_node_id"]).startswith("person:"):
            continue  # person->person goes to relationships
        eid = s(e["edge_id"])
        rows[eid] = {
            "id": eid,
            "kind": s(e["edge_class"]),
            "type": s(e["relation_type"]) or None,
            "label": s(e["relation_label"]) or None,
            "scope": s(e["relationship_scope"]) or None,
            "source": person_slug(e["source_node_id"]) if s(e["source_node_id"]).startswith("person:") else s(e["source_node_id"]),
            "entity": s(e["target_node_id"]),
            "confidence": s(e["confidence"]) or None,
            "status": s(e["status"]) or None,
            "caveat_id": caveat_id(e["interpretation_caution"]),
            "source_ids": split_semi(e["source_ids"]),
        }
    # attach asset-holding row stats where the standalone file carries them
    for e in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_asset_holding_edges.csv"):
        eid = s(e["edge_id"])
        if eid in rows:
            rows[eid]["reported_row_count"] = num(e["reported_row_count"])
            rows[eid]["positive_share_rows"] = num(e["positive_share_rows"])
    return list(rows.values())


# ----------------------------------------------------------------------------
# relationships (person <-> person, all evidence tiers)


# Normalized origin buckets (single vocabulary for the whole table):
#   curated_research        externally sourced, hand-checked ties
#   api_related             Forbes /related feed person->person signals
#   derived_shared_asset    pair projected from a shared asset reference
#   derived_shared_holding  pair projected from positive share rows in one company
#   api_shared_entity       pair derived from a shared entity membership
#   prior_dataset           legacy projection carried forward verbatim
ORIGIN_MAP = {
    "curated_research": "curated_research",
    "curated_researched": "curated_research",
    "rtb_api_profile_related": "api_related",
    "api_profile_related": "api_related",
    "api_person_person_assertion": "api_related",
    "profile_related_api_pair": "api_related",
    "api_related": "api_related",
    "api_discovery": "api_related",
    "prior_dataset": "api_related",
    "prior_curated_or_projected": "api_related",
    "derived_from_rtb_api_asset_reference": "derived_shared_asset",
    "derived_shared_asset": "derived_shared_asset",
    "api_shared_asset_pair_projection": "derived_shared_asset",
    "derived_from_two_profile_asset_feeds": "derived_shared_holding",
    "derived_shared_holding": "derived_shared_holding",
    "api_company_asset_pair_projection": "derived_shared_holding",
    "api_shared_entity_membership_derived": "api_shared_entity",
    "api_shared_entity": "api_shared_entity",
}


def norm_origin(v):
    return ORIGIN_MAP.get(s(v), s(v) or "api_related")


# Intake decision per ledger batch_id — recorded by the operator at import
# time (see tasks/data-ingestion.task.json). Batches listed here are
# hand-sourced research edges with named external sources: they land as
# curated_research regardless of the row's free-text scope. Everything else
# keeps the ledger default (api_related discovery signal).
CURATED_LEDGER_BATCHES = {
    "OLD_REPORT_MINING_2026-11-18",
    "ISOLATION_AUDIT_MINING_2026-11-19",
    "VERIFIED_ROSTER_TIES_2026-11-19",
}


def label_class(label, interpreted=None):
    """Assertion class used for dedupe + UI semantics.

    curated rows keep their verbatim type; API rows reduce to the
    interpreted label class so the same pair signal from the ledger,
    the discovery view and the raw feed lands on one record.
    """
    ic = s(interpreted).lower()
    if ic:
        if "financial_asset" in ic or "shared_asset" in ic:
            return "shared_asset"
        if "education" in ic:
            return "shared_education"
        if "employment" in ic:
            return "shared_employment"
        if "wealth_origin" in ic:
            return "shared_wealth_origin"
        if "unspecified" in ic:
            return "unspecified"
        if "explicit" in ic:
            return "api_labeled"
    lbl = s(label).lower()
    if not lbl or lbl == "(blank)":
        return "unspecified"
    if "related by financial asset" in lbl:
        return "shared_asset"
    if "related by education" in lbl:
        return "shared_education"
    if "related by employment" in lbl:
        return "shared_employment"
    if "related by origin of wealth" in lbl or "related by wealth" in lbl:
        return "shared_wealth_origin"
    if lbl.startswith("related profile"):
        return "unspecified"
    return "api_labeled"


def norm_relationship(row, *, origin, batch, id_field="edge_id", cls=None):
    summary = s(row.get("evidence_summary"))
    return {
        "id": s(row.get(id_field)) or s(row.get("pair_id")),
        "a": s(row["person_a_uri"]),
        "b": s(row["person_b_uri"]),
        "type": s(row.get("relationship_type")) or None,
        "label": s(row.get("relationship_label")) or s(row.get("raw_labels")) or None,
        "origin": norm_origin(origin),
        "class": cls or label_class(
            row.get("relationship_label") or row.get("raw_labels"),
            row.get("interpreted_class")),
        "scope": s(row.get("scope")) or None,
        "confidence": s(row.get("confidence")) or None,
        "evidence_status": s(row.get("evidence_status")) or None,
        "status": s(row.get("status")) or None,
        "time_start": num(row.get("time_start")),
        "time_end": num(row.get("time_end")),
        "evidence_summary": None if generated_summary(summary) else summary,
        "caveat_id": caveat_id(row.get("interpretation_caveat") or row.get("caveat")),
        "source_ids": split_semi(row.get("source_ids")),
        "source_urls": [u for u in split_semi(row.get("source_urls")) if not is_feed_url(u)],
        "batch": batch,
    }


V2_PP_ORIGIN = {}  # pair_key|type -> edge_origin


def build_relationships():
    # Pre-index v2 person_person projection to recover edge_origin for ledger rows.
    for r in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_person_person_relationships.csv"):
        V2_PP_ORIGIN[f"{pair_key(r['person_a_uri'], r['person_b_uri'])}|{s(r['relationship_type'])}"] = \
            s(r["edge_origin"]) or "prior_dataset"

    rels = {}
    canon = {}

    def add(rec):
        rid = rec["id"]
        ck = f"{pair_key(rec['a'], rec['b'])}|{rec['origin']}|{rec['class']}"
        if rid and rid in rels:
            return
        if ck in canon:
            # merge provenance into the first record
            keep = rels[canon[ck]]
            keep["source_ids"] = sorted(set(keep["source_ids"]) | set(rec["source_ids"]))
            keep["source_urls"] = sorted(set(keep["source_urls"]) | set(rec["source_urls"]))
            if rec["id"] and rec["id"] != keep["id"]:
                keep.setdefault("aliases", [])
                if rec["id"] not in keep["aliases"]:
                    keep["aliases"].append(rec["id"])
            for field in ("evidence_summary", "caveat_id", "label", "type", "status",
                          "time_start", "time_end", "confidence", "evidence_status"):
                if not keep.get(field) and rec.get(field):
                    keep[field] = rec[field]
            return
        if not rid:
            rid = "rel_" + str(len(rels) + 1).zfill(5)
            rec["id"] = rid
        rels[rid] = rec
        canon[ck] = rid

    # 1. cumulative ledgers (v8 master, then landed drops + legacy v3 +
    #    batch-004 append file)
    for ledger in [MASTER / "billionaire_pair_links_append_only_v8.csv",
                   MASTER / "billionaire_verified_ties_2026-11-19_append_edges.csv",
                   SRC_ROOT / "billionaire_pair_links_append_only_v3.csv",
                   BATCH004 / "billionaire_pair_mining_batch_004_append_edges.csv"]:
        for r in read_csv(ledger):
            batch = s(r["batch_id"])
            key = f"{pair_key(r['person_a_uri'], r['person_b_uri'])}|{s(r['relationship_type'])}"
            if batch == "PREVIOUS_V2":
                origin = V2_PP_ORIGIN.get(key, "prior_dataset")
                cls = (f"curated:{s(r['relationship_type'])}" if origin == "curated_research"
                       else (norm_origin(origin) if norm_origin(origin) != "api_related"
                             else None))
            elif batch in CURATED_LEDGER_BATCHES or s(r["scope"]) == "direct":
                origin = "curated_research"
                cls = f"curated:{s(r['relationship_type'])}"
            else:
                origin = "api_related"
                cls = label_class(r.get("relationship_label"),
                                  r.get("interpreted_class"))
            add(norm_relationship(r, origin=origin, batch=batch, cls=cls))

    # 2. curated-ties append-only + batch files (mostly subsets; dedupe catches)
    for f in [MASTER / "billionaire_pair_curated_ties_append_only.csv",
              SRC_ROOT / "billionaire_pair_mining_batch_001_curated_ties.csv",
              BATCH004 / "billionaire_pair_mining_batch_004_curated_ties.csv"]:
        for r in read_csv(f):
            add(norm_relationship(r, origin="curated_research",
                                  batch=s(r["batch_id"]),
                                  cls=f"curated:{s(r['relationship_type'])}"))

    # 3. v2 person_person projection (fills any rows the ledger missed)
    for r in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_person_person_relationships.csv"):
        o = norm_origin(r["edge_origin"])
        cls = (f"curated:{s(r['relationship_type'])}" if o == "curated_research"
               else (o if o != "api_related" else None))
        rec = norm_relationship(r, origin=o, batch="V2", id_field="pair_id", cls=cls)
        add(rec)

    # 4. v2 edges.csv person->person rows not already covered
    for e in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_edges.csv"):
        if not s(e["target_node_id"]).startswith("person:"):
            continue
        o = norm_origin(e["edge_class"])
        cls = (f"curated:{s(e['relation_type'])}" if o == "curated_research"
               else (o if o != "api_related" else None))
        rec = {
            "id": s(e["edge_id"]),
            "a": person_slug(e["source_node_id"]),
            "b": person_slug(e["target_node_id"]),
            "type": s(e["relation_type"]) or None,
            "label": s(e["relation_label"]) or None,
            "origin": o,
            "class": cls or label_class(e["relation_label"]),
            "scope": s(e["relationship_scope"]) or None,
            "confidence": s(e["confidence"]) or None,
            "evidence_status": s(e["evidence_status"]) or None,
            "status": s(e["status"]) or None,
            "time_start": num(e["start_year"]),
            "time_end": num(e["end_year"]),
            "evidence_summary": None if generated_summary(e["evidence_summary"]) else s(e["evidence_summary"]) or None,
            "caveat_id": caveat_id(e["interpretation_caution"]),
            "source_ids": split_semi(e["source_ids"]),
            "source_urls": [],
            "batch": "V2",
        }
        # PP#### ids were renamed CUR_PP#### in the ledgers
        if rec["id"].startswith("PP"):
            rec["id"] = "CUR_" + rec["id"]
        add(rec)

    # 5. derived/shared-pair standalone tables (subsets; dedupe keeps provenance)
    for f, origin in [
        (SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_shared_asset_pairs.csv",
         "derived_shared_asset"),
        (SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_shared_company_holding_pairs.csv",
         "derived_shared_holding"),
    ]:
        for r in read_csv(f):
            rec = norm_relationship(r, origin=origin, batch="V2", id_field="pair_id",
                                    cls=origin)
            if not rec["type"]:
                rec["type"] = s(r.get("relationship_type")) or None
            if not rec["label"]:
                rec["label"] = s(r.get("shared_asset_reference")) or s(r.get("company_name")) or None
            add(rec)

    # 6. unique api discovery tables (mostly inside the ledgers already)
    for f in [MASTER / "billionaire_pair_unique_api_discoveries_append_only.csv",
              SRC_ROOT / "billionaire_pair_mining_batch_001_unique_api_pairs.csv",
              BATCH004 / "billionaire_pair_mining_batch_004_unique_api_pairs.csv"]:
        for r in read_csv(f):
            rec = norm_relationship(r, origin="api_related", batch="API",
                                    id_field="pair_id",
                                    cls=label_class(r.get("raw_labels"),
                                                    r.get("classes")))
            if not rec["type"]:
                rec["type"] = s(r.get("classes")) or None
            rec["source_urls"] = sorted(set(rec["source_urls"]) |
                                        set(u for u in split_semi(r.get("source_urls")) if not is_feed_url(u)))
            add(rec)

    return list(rels.values())


# ----------------------------------------------------------------------------
# raw api observations (directed /related feed rows)


def norm_observation(r, id_field):
    return {
        "id": s(r.get(id_field)),
        "batch": s(r.get("batch_id")) or "V2",
        "source_uri": s(r["source_profile_uri"]),
        "target_uri": s(r["target_profile_uri"]),
        "raw_label": s(r.get("raw_relationship_label")),
        "interpreted_class": s(r.get("interpreted_class")) or None,
        "interpreted_value": s(r.get("interpreted_value")) or None,
        "confidence": s(r.get("confidence")) or None,
        "evidence_status": s(r.get("evidence_status")) or None,
        "caveat_id": caveat_id(r.get("caveat") or r.get("note")),
    }


def build_api_observations():
    obs = {}
    canon = {}
    for f, idf in [
        (MASTER / "billionaire_pair_profile_observations_append_only.csv", "observation_id"),
        (SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_api_assertions.csv", "api_assertion_id"),
        (SRC_ROOT / "billionaire_pair_mining_batch_001_api_observations.csv", "observation_id"),
        (BATCH004 / "billionaire_pair_mining_batch_004_api_observations.csv", "observation_id"),
    ]:
        for r in read_csv(f):
            rec = norm_observation(r, idf)
            ck = f"{rec['source_uri']}|{rec['target_uri']}|{rec['raw_label']}"
            if rec["id"] and rec["id"] in obs:
                continue
            if ck in canon:
                continue
            if not rec["id"]:
                rec["id"] = "obs_" + str(len(obs) + 1).zfill(5)
            obs[rec["id"]] = rec
            canon[ck] = rec["id"]
    return list(obs.values())


# ----------------------------------------------------------------------------
# asset feed rows


def build_asset_records():
    seen = set()
    out = []
    for r in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_asset_records.csv"):
        key = (s(r["person_uri"]), s(r["company_name"]), s(r["number_of_shares"]))
        if key in seen:
            continue
        seen.add(key)
        out.append({
            "person": s(r["person_uri"]),
            "company": s(r["company_name"]),
            "ticker": s(r["ticker"]) or None,
            "exchange": s(r["exchange"]) or None,
            "number_of_shares": num(r["number_of_shares"]),
            "share_price": num(r["share_price"]),
            "currency": s(r["currency_code"]) or None,
            "current_price": num(r["current_price"]),
            "record_status": s(r["holding_record_status"]) or None,
            "as_of_date": s(r["as_of_date"]) or None,
        })
    return out


# ----------------------------------------------------------------------------
# sources + evidence links


def build_sources(referenced_ids):
    sources = {}

    def put(sid, title, url, stype=None, publisher=None, published=None, notes=None):
        if not sid:
            return
        if sid in sources:
            cur = sources[sid]
            for k, v in (("title", title), ("url", url), ("type", stype),
                         ("publisher", publisher), ("published_date", published),
                         ("notes", notes)):
                if v and not cur.get(k):
                    cur[k] = v
            return
        sources[sid] = {
            "id": sid, "title": title or None, "publisher": publisher or None,
            "published_date": published or None, "type": stype or None,
            "url": url or None, "notes": notes or None,
        }

    for r in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_sources.csv"):
        put(s(r["source_id"]), s(r["title"]), s(r["url"]), s(r["source_type"]),
            s(r["publisher"]), s(r["published_date"]), s(r["notes"]))
    for r in read_csv(SRC_ROOT / "billionaire_relationship_sources_2026-11-18.csv"):
        put(s(r["source_id"]), s(r["title"]), s(r["url"]), s(r["source_type"]),
            s(r["publisher"]), s(r["published_date"]), s(r["notes"]))
    for f in [MASTER / "billionaire_pair_source_registry_append_only.csv",
              MASTER / "billionaire_old_report_mining_sources_2026-11-18.csv",
              MASTER / "billionaire_isolation_audit_sources_2026-11-19.csv",
              SRC_ROOT / "billionaire_pair_mining_batch_001_sources.csv",
              BATCH004 / "billionaire_pair_mining_batch_004_sources.csv"]:
        for r in read_csv(f):
            put(s(r["source_id"]), s(r["title"]), s(r["url"]), s(r["source_type"]),
                None, None, s(r.get("coverage_note")))

    # pseudo-source ids referenced by edges/rows but without registry entries
    for sid in sorted(referenced_ids - set(sources)):
        if sid.startswith("ASSET_SRC_"):
            put(sid, f"Profile /assets feed ({sid[len('ASSET_SRC_'):]})",
                f"https://raw.githubusercontent.com/komed3/rtb-api/main/api/profile/{sid[len('ASSET_SRC_'):]}/assets",
                "forbes_derived_asset_feed")
        elif sid == "API_PROFILE_FEED":
            put(sid, "Forbes-derived profile /related feed",
                "https://raw.githubusercontent.com/komed3/rtb-api", "forbes_derived_api")
    return list(sources.values())


def build_evidence_links():
    seen = set()
    out = []
    for r in read_csv(SRC_ROOT / "billionaire_relationship_network_v2_2026-11-18_evidence_links.csv"):
        key = (s(r["edge_id"]), s(r["source_id"]))
        if key in seen:
            continue
        seen.add(key)
        note = s(r["supporting_note"])
        out.append({
            "edge_id": s(r["edge_id"]),
            "source_id": s(r["source_id"]),
            "note": None if generated_note(note) else note,
        })
    return out


# ----------------------------------------------------------------------------


def main():
    print(f"source: {SRC_ROOT}")
    print(f"out:    {OUT}")

    people = build_people()
    entities = build_entities()
    memberships = build_memberships()
    relationships = build_relationships()
    observations = build_api_observations()
    asset_records = build_asset_records()
    evidence = build_evidence_links()

    # referenced source ids (edges + relationships + asset feeds)
    referenced = set()
    for r in relationships + memberships:
        referenced.update(r["source_ids"])
    for r in asset_records:
        if r["person"]:
            referenced.add(f"ASSET_SRC_{r['person']}")
    for e in evidence:
        referenced.add(e["source_id"])
    for r in relationships:
        for u in r["source_urls"]:
            pass
    sources = build_sources(referenced)

    # per-person rollups (denormalized convenience for batch enrichment planning)
    tie_count = {}
    sourced_tie_count = {}
    for r in relationships:
        for p in (r["a"], r["b"]):
            if p in people:
                tie_count[p] = tie_count.get(p, 0) + 1
                if r["origin"] == "curated_research":
                    sourced_tie_count[p] = sourced_tie_count.get(p, 0) + 1
    for pid, p in people.items():
        p["tie_count"] = tie_count.get(pid, 0)
        p["sourced_tie_count"] = sourced_tie_count.get(pid, 0)

    write_jsonl("people.jsonl",
                sorted(people.values(), key=lambda p: (p["rank"] is None, p["rank"] or 0, p["id"])))
    write_jsonl("entities.jsonl", sorted(entities.values(), key=lambda e: e["id"]))
    write_jsonl("memberships.jsonl", sorted(memberships, key=lambda m: m["id"]))
    write_jsonl("relationships.jsonl", sorted(relationships, key=lambda r: r["id"]))
    write_jsonl("api_observations.jsonl", sorted(observations, key=lambda o: o["id"]))
    write_jsonl("asset_records.jsonl", sorted(asset_records, key=lambda r: (r["person"], r["company"] or "")))
    write_jsonl("sources.jsonl", sorted(sources, key=lambda s2: s2["id"]))
    write_jsonl("evidence_links.jsonl", sorted(evidence, key=lambda e: (e["edge_id"], e["source_id"])))

    caveats = [{"id": cid, "text": text, "boilerplate": is_boilerplate(text)}
               for text, cid in sorted(CAVEATS.items(), key=lambda kv: kv[1])]
    write_jsonl("caveats.jsonl", caveats)

    roster = read_csv(SRC_ROOT / "global_billionaires_snapshot_2026-11-17.csv")
    manifest = {
        "dataset": "global billionaires",
        "snapshot_date": s(roster[0]["Snapshot date"]) if roster else None,
        "snapshot_source": s(roster[0]["Snapshot source"]) if roster else None,
        "related_feed_url_template": RTB_API_BASE + "/{person}/related",
        "assets_feed_url_template": RTB_API_BASE + "/{person}/assets",
        "tables": {
            "people": len(people), "entities": len(entities),
            "memberships": len(memberships), "relationships": len(relationships),
            "api_observations": len(observations), "asset_records": len(asset_records),
            "sources": len(sources), "evidence_links": len(evidence),
            "caveats": len(caveats),
        },
    }
    with open(OUT / "manifest.json", "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2, sort_keys=True)
    print("  manifest.json")

    print("done.")


if __name__ == "__main__":
    main()
