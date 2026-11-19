# DONE

## Billionaire Database microsite (`site/assets/microsites/billionaire-database`)

- Linked every emitted entity name to its page: sub-group labels ("the Winklevosses") link to the people they name, company names inside prose/evidence link to company pages (single-pass `coLinkify`, incl. aliases like Facebook→Meta), group directory rows and parent-group mentions link to group pages.
- Citizenship note shortened and moved directly below each flag-bearing table (people index + roster shards).
- Gaps page repo link fixed → `https://github.com/Better-Britain/reports/tree/main/site/assets/microsites/billionaire-database`.
- Removed all gap-brief truncation (200/150/40 caps): every brief now lists its full candidate set with matching counts.
- Added `data/known_companies.txt` — real company vocabulary merged from Fortune Global 500, Forbes Global 2000, S&P 500 (~2,400 names) so wealth-source labels resolve against known companies, not a hand list.
- Added `data/company_lineage.jsonl` — researched renames/acquisitions/mergers (Twitter→X, Square→Block, WhatsApp→Meta, Marvel→Disney, Netscape→AOL, LinkedIn→Microsoft, EMC→Dell…). Distinct eras keep distinct company nodes; company pages show the history line; `brief-company-lineage.md` exposes the un-researched remainder as a gap.
