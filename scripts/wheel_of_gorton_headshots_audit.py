#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
STATEMENTS = REPO_ROOT / "site" / "assets" / "microsites" / "wheel-of-gorton" / "Statements.md"
HEADSHOTS_DIR = REPO_ROOT / "site" / "assets" / "microsites" / "wheel-of-gorton" / "images" / "headshots"


def parse_meta(raw: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(r"([a-zA-Z0-9_-]+)\s*=\s*(?:\"([^\"]*)\"|'([^']*)'|(\S+))", raw):
        key = m.group(1)
        val = (m.group(2) or m.group(3) or m.group(4) or "").strip()
        out[key] = val
    return out


def main() -> int:
    text = STATEMENTS.read_text("utf-8")
    meta_blocks = re.findall(r"<!--\s*meta\s+([\s\S]*?)-->", text, flags=re.I)

    candidates: set[str] = set()
    speakers: set[str] = set()
    cand_names: dict[str, str] = {}
    speaker_names: dict[str, str] = {}

    for raw in meta_blocks:
        meta = parse_meta(raw)
        c = (meta.get("candidate") or "").strip()
        s = (meta.get("speaker") or "").strip()
        if c:
            candidates.add(c)
            if meta.get("candidateName"):
                cand_names.setdefault(c, (meta.get("candidateName") or "").strip())
        if s:
            speakers.add(s)
            if meta.get("speakerName"):
                speaker_names.setdefault(s, (meta.get("speakerName") or "").strip())

    stems = {
        p.stem.lower()
        for p in HEADSHOTS_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")
    }

    missing_candidates = sorted([c for c in candidates if c.lower() not in stems])
    missing_speakers = sorted([s for s in speakers if s.lower() not in stems])

    print(f"Headshot stems: {len(stems)} ({HEADSHOTS_DIR})")
    print(f"Candidate ids in Statements: {len(candidates)} missing: {len(missing_candidates)}")
    for c in missing_candidates:
        nm = cand_names.get(c, "")
        print(f"  - {c}" + (f" ({nm})" if nm else ""))
    print(f"Speaker ids in Statements: {len(speakers)} missing: {len(missing_speakers)}")
    for s in missing_speakers:
        nm = speaker_names.get(s, "")
        print(f"  - {s}" + (f" ({nm})" if nm else ""))

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

