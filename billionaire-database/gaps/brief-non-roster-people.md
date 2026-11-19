# Billionaire Database — research brief: People referenced by the feeds but absent from the roster

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

These 16 people appear in the /related feeds (i.e. some billionaire's feed names them) but are not in the 17 Nov 2026 snapshot roster — possibly sub-$1bn, recently dropped, or name-resolution artifacts.

## Task

For each person: identify who they are, their approximate net worth, and which billionaire(s) connect them to the dataset (the tie is hinted in 'linked via'). Return any sourced person-to-person ties in the standard format.

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

## Gaps (16)

| person_uri | name | linked via |
|---|---|---|
| andrea-camerana | Andrea Camerana |  |
| chalerm-harnphanich | Chalerm Harnphanich |  |
| colette-kress | Colette Kress |  |
| helmut-sohmen | Helmut Sohmen |  |
| klaus-michael-kuehne | Klaus-Michael Kuehne |  |
| koguan-leo | KoGuan Leo | Elon Musk, Larry Ellison |
| maky-zanganeh | Maky Zanganeh | Jensen Huang |
| pongsak-viddayakorn | Pongsak Viddayakorn |  |
| robert-philip-ng | Robert & Philip Ng |  |
| s-daniel-abraham | S. Daniel Abraham | Thomas Peterffy |
| samuel-yin | Samuel Yin |  |
| sara-liu | Sara Liu |  |
| silvana-armani | Silvana Armani |  |
| sunil-mittal | Sunil Mittal & family | Carlos Slim Helu & family, Sunil Mittal |
| wang-xinyang | Wang Xinyang |  |
| yoichi-keiko-erikawa | Yoichi & Keiko Erikawa | Masayoshi Son |
