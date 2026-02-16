#!/usr/bin/env python3
from __future__ import annotations

import argparse
import difflib
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


DEFAULT_MD = Path("site/assets/microsites/labour-screw-ups/Labour-Screw-Ups.md")


CANON = [
    "Leadership",
    "Standards",
    "Justice",
    "Protest rights",
    "Immigration",
    "Welfare",
    "NHS",
    "Economy",
    "Climate",
    "Housing",
    "Education",
    "Foreign policy",
    "Digital rights",
    "Elections",
    "Media",
    "Equalities",
    "Local government",
    "Starmer",
]


CATEGORY_MAP = {
    # existing -> canonical
    "comms": "Media",
    "mixed messaging": "Media",
    "optics": "Media",
    "hypocrisy optics": "Media",
    "conference own-goal": "Media",
    "press freedom optics": "Media",
    "dirty tricks": "Media",
    "candidate vetting": "Elections",
    "vetting": "Elections",
    "cabinet churn": "Leadership",
    "cabinet discipline": "Leadership",
    "judgment": "Leadership",
    "competence vibe": "Leadership",
    "admin competence": "Leadership",
    "delivery": "Leadership",
    "integrity": "Standards",
    "ethics": "Standards",
    "standards": "Standards",
    "standards process": "Standards",
    "standards watchdog": "Standards",
    "conduct": "Standards",
    "controls": "Standards",
    "equalities": "Equalities",
    "local govt": "Local government",
    "industrial strategy politics": "Economy",
    "foreign policy optics": "Foreign policy",
    "foreign policy tradeoffs": "Foreign policy",
    "nhs promise gap": "NHS",
    "nhs realism": "NHS",
    "protest policing / legal risk": "Justice",
}


KEYWORDS: list[tuple[str, re.Pattern[str]]] = [
    ("Justice", re.compile(r"\b(jury|court|sentenc|prison|polic|justice|law|legal|trial)\b", re.I)),
    ("Protest rights", re.compile(r"\b(protest|demonstrat|public order|polic(e|ing) bill)\b", re.I)),
    ("Immigration", re.compile(r"\b(asylum|migrant|immigration|border|returns?|deport|open borders)\b", re.I)),
    ("Digital rights", re.compile(r"\b(digital id|id card|right-to-work checks|surveillance|privacy)\b", re.I)),
    ("Welfare", re.compile(r"\b(welfare|benefit|two-child|pension|winter fuel|disabil|cap)\b", re.I)),
    ("NHS", re.compile(r"\b(nhs|waiting[- ]?time|18-week|acute trust)\b", re.I)),
    ("Economy", re.compile(r"\b(treasury|budget|tax|rates|business|growth|inflation|pubs?)\b", re.I)),
    ("Climate", re.compile(r"\b(green|climate|net zero|energy|carbon)\b", re.I)),
    ("Housing", re.compile(r"\b(housing|homes?|rent|tenant|landlord)\b", re.I)),
    ("Education", re.compile(r"\b(tuition|university|school)\b", re.I)),
    ("Foreign policy", re.compile(r"\b(china|gaza|israel|foreign|u\.s\.|nato|defence)\b", re.I)),
    ("Elections", re.compile(r"\b(candidate|selection|election|campaign|by[- ]?election)\b", re.I)),
    ("Media", re.compile(r"\b(press|headline|messaging|comms|confusion|backlash)\b", re.I)),
    ("Equalities", re.compile(r"\b(racis|equalit|gender|trans|antisemit)\b", re.I)),
    ("Leadership", re.compile(r"\b(cabinet|shadow|rebell|whip|party unity|u-?turn government)\b", re.I)),
    ("Starmer", re.compile(r"\b(starmer|keir)\b", re.I)),
]


ACTOR_MAP = {
    "gov": "Gov",
    "government": "Gov",
    "opp": "Opp",
    "opposition": "Opp",
    "party": "Party",
    "gov/party": "Gov",
    "gov / party": "Gov",
    "opp/party": "Opp",
    "opp / party": "Opp",
    "opposition / party": "Opp",
    "opposition/party": "Opp",
}


@dataclass(frozen=True)
class Tag:
    prefix: str
    actor_raw: str
    cats_raw: list[str]
    suffix: str
    span: tuple[int, int]


TAG_RE = re.compile(r"(?P<prefix>\*\*)?\[(?P<body>[^\]]+)\](?P<suffix>\*\*)?")
ENTRY_RE = re.compile(r"^\s*(\d+)\.\s+")


def canonical_actor(actor_raw: str) -> str:
    key = actor_raw.strip().lower()
    return ACTOR_MAP.get(key, actor_raw.strip() or "Other")


def normalize_existing_categories(raw: Iterable[str]) -> list[str]:
    out: list[str] = []
    for c in raw:
        cc = c.strip()
        if not cc:
            continue
        mapped = CATEGORY_MAP.get(cc.lower())
        if mapped and mapped not in out:
            out.append(mapped)
        elif cc in CANON and cc not in out:
            out.append(cc)
    return out


def infer_categories(text: str) -> list[str]:
    picks: list[str] = []
    for name, rx in KEYWORDS:
        if rx.search(text):
            if name not in picks:
                picks.append(name)
    # Prefer a small set; keep Starmer as an optional extra if present.
    if "Starmer" in picks and "Leadership" not in picks:
        picks.insert(0, "Leadership")
    # De-duplicate while preserving order
    dedup: list[str] = []
    for p in picks:
        if p not in dedup:
            dedup.append(p)
    # Keep at most 3, but allow Starmer as 4th if present.
    if len(dedup) <= 3:
        return dedup
    if "Starmer" in dedup[:6]:
        core = [c for c in dedup if c != "Starmer"][:3]
        return core + ["Starmer"]
    return dedup[:3]


def parse_tag(line: str) -> Tag | None:
    m_entry = ENTRY_RE.match(line)
    if not m_entry:
        return None
    pos = m_entry.end()
    m = TAG_RE.search(line, pos)
    if not m:
        return None
    if line[pos:m.start()].strip():
        return None  # must be the first token after the `N. ` prefix
    body = m.group("body")
    parts = [p.strip() for p in body.split("|")]
    actor = parts[0] if parts else body.strip()
    cats = [p for p in parts[1:] if p]
    return Tag(
        prefix=m.group("prefix") or "",
        actor_raw=actor,
        cats_raw=cats,
        suffix=m.group("suffix") or "",
        span=(m.start(), m.end()),
    )


def replace_tag_in_line(line: str, new_body: str) -> str:
    tag = parse_tag(line)
    if not tag:
        return line
    start, end = tag.span
    return line[:start] + f"{tag.prefix}[{new_body}]{tag.suffix}" + line[end:]


def entry_blocks(lines: list[str]) -> list[tuple[int, int]]:
    blocks: list[tuple[int, int]] = []
    i = 0
    while i < len(lines):
        if ENTRY_RE.match(lines[i]):
            start = i
            i += 1
            while i < len(lines) and not ENTRY_RE.match(lines[i]):
                i += 1
            blocks.append((start, i))
        else:
            i += 1
    return blocks


def retag(md_text: str) -> tuple[str, dict[str, int]]:
    lines = md_text.splitlines(keepends=True)
    blocks = entry_blocks(lines)
    stats = {"changed": 0, "total": len(blocks)}

    for start, end in blocks:
        first = lines[start]
        tag = parse_tag(first)
        if not tag:
            continue

        actor = canonical_actor(tag.actor_raw)

        # Build text context for heuristics: first line (minus meta comment) + sub bullets.
        context = re.sub(r"<!--\s*meta\s+[\s\S]*?-->", "", "".join(lines[start:end]))
        existing = normalize_existing_categories(tag.cats_raw)
        inferred = infer_categories(context)

        cats: list[str] = []
        for c in existing + inferred:
            if c not in cats:
                cats.append(c)

        # If nothing is inferred and nothing exists, keep as-is.
        new_body = actor if not cats else (actor + " | " + " | ".join(cats))

        new_first = replace_tag_in_line(first, new_body)
        if new_first != first:
            lines[start] = new_first
            stats["changed"] += 1

    return "".join(lines), stats


def main() -> None:
    ap = argparse.ArgumentParser(description="Retag Labour-Screw-Ups.md with more user-meaningful categories.")
    ap.add_argument("--file", type=Path, default=DEFAULT_MD, help=f"Markdown file (default: {DEFAULT_MD})")
    ap.add_argument("--write", action="store_true", help="Write changes back to the file (otherwise prints a diff).")
    ap.add_argument("--summary", action="store_true", help="Print only a summary (implies dry-run).")
    args = ap.parse_args()

    path: Path = args.file
    old = path.read_text("utf-8")
    new, stats = retag(old)

    if old == new:
        print(f"No changes. Entries: {stats['total']}")
        return

    if args.write:
        path.write_text(new, "utf-8")
        print(f"Wrote {path}. Changed entries: {stats['changed']} / {stats['total']}")
        return

    if args.summary:
        print(f"Changed entries: {stats['changed']} / {stats['total']} (dry-run)")
        return

    diff = difflib.unified_diff(
        old.splitlines(),
        new.splitlines(),
        fromfile=str(path),
        tofile=str(path),
        lineterm="",
    )
    try:
        print("\n".join(diff))
        print(f"\nChanged entries: {stats['changed']} / {stats['total']} (dry-run)")
    except BrokenPipeError:
        # Allow piping to tools like `head` without a noisy traceback.
        return


if __name__ == "__main__":
    main()
