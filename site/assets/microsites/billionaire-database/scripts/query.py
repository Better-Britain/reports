#!/usr/bin/env python3
"""SQL over the JSONL tables in ../data via DuckDB.

Usage:
    scripts/.venv/bin/python scripts/query.py "select * from people limit 5"
    scripts/.venv/bin/python scripts/query.py           # reads SQL from stdin
    scripts/.venv/bin/python scripts/query.py --tables  # list tables + counts

Tables: people, entities, memberships, relationships, api_observations,
        asset_records, sources, evidence_links, caveats
"""

import sys
from pathlib import Path

import duckdb

DATA = Path(__file__).resolve().parent.parent / "data"
TABLES = ["people", "entities", "memberships", "relationships",
          "api_observations", "asset_records", "sources", "evidence_links",
          "caveats"]


def connect():
    con = duckdb.connect()
    for name in TABLES:
        f = DATA / f"{name}.jsonl"
        if not f.exists():
            continue
        con.execute(
            f"create view {name} as "
            f"select * from read_json('{f}', format='newline_delimited', "
            f"auto_detect=true, union_by_name=true)")
    return con


def main():
    con = connect()
    args = sys.argv[1:]
    if args and args[0] == "--tables":
        for name in TABLES:
            f = DATA / f"{name}.jsonl"
            if f.exists():
                n = con.execute(f"select count(*) from {name}").fetchone()[0]
                cols = [c[1] for c in con.execute(
                    f"pragma table_info('{name}')").fetchall()]
                print(f"{name}: {n} rows")
                print(f"    {', '.join(cols)}")
        return
    sql = " ".join(args).strip() or sys.stdin.read()
    con.sql(sql).show(max_rows=60)


if __name__ == "__main__":
    main()
