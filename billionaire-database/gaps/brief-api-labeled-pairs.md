# Billionaire Database — research brief: Feed-labeled pairs lacking an independent source

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

The Forbes-derived /related feed asserts a relationship label for each pair below (Family, Cofounder, Business Partner, …) but we have no independent citation. Each is currently a 'feed-labeled' tie — your job is to promote or kill it with real sources.

## Task

For each pair, verify the asserted relationship against reputable reporting. If confirmed, return a row in the format below with source URLs. If the label is wrong or unverifiable, say so in evidence_summary and mark confidence low — a debunked feed claim is also valuable.

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

## Gaps (269)

| person_a | person_b | current signal |
|---|---|---|
| elon-musk (Elon Musk) | peter-thiel (Peter Thiel) | feed says: Explicit Relationship Label |
| larry-page (Larry Page) | sergey-brin (Sergey Brin) | feed says: Explicit Relationship Label |
| eric-schmidt (Eric Schmidt) | larry-page (Larry Page) | feed says: Explicit Relationship Label |
| dustin-moskovitz (Dustin Moskovitz) | mark-zuckerberg (Mark Zuckerberg) | feed says: Explicit Relationship Label |
| bill-gates (Bill Gates) | warren-buffett (Warren Buffett) | feed says: Explicit Relationship Label |
| drayton-mclane-jr (Drayton McLane Jr) | warren-buffett (Warren Buffett) | feed says: Explicit Relationship Label |
| bill-gates (Bill Gates) | steve-ballmer (Steve Ballmer) | feed says: Explicit Relationship Label |
| charles-simonyi (Charles Simonyi) | steve-ballmer (Steve Ballmer) | feed says: Explicit Relationship Label |
| larry-ellison (Larry Ellison) | safra-catz (Safra Catz) | feed says: Explicit Relationship Label |
| larry-ellison (Larry Ellison) | phillip-t-terry-ragon (Phillip T. (Terry) Ragon) | feed says: Explicit Relationship Label |
| amancio-ortega (Amancio Ortega) | sandra-ortega-mera (Sandra Ortega Mera) | feed says: Explicit Relationship Label |
| amancio-ortega (Amancio Ortega) | antonio-percassi (Antonio Percassi) | feed says: Explicit Relationship Label |
| jim-walton (Jim Walton & family) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| rob-walton (Rob Walton & family) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| lukas-walton (Lukas Walton) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| jim-walton (Jim Walton & family) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| jim-walton (Jim Walton & family) | lukas-walton (Lukas Walton) | feed says: Explicit Relationship Label |
| alice-walton (Alice Walton) | jim-walton (Jim Walton & family) | feed says: Explicit Relationship Label |
| alice-walton (Alice Walton) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| alice-walton (Alice Walton) | lukas-walton (Lukas Walton) | feed says: Explicit Relationship Label |
| alice-walton (Alice Walton) | christy-walton (Christy Walton) | feed says: Explicit Relationship Label |
| jensen-huang (Jensen Huang) | mark-stevens (Mark Stevens) | feed says: Explicit Relationship Label |
| bill-gates (Bill Gates) | charles-simonyi (Charles Simonyi) | feed says: Explicit Relationship Label |
| michael-bloomberg (Michael Bloomberg) | thomas-secunda (Thomas Secunda) | feed says: Explicit Relationship Label |
| charles-zegar (Charles Zegar) | michael-bloomberg (Michael Bloomberg) | feed says: Explicit Relationship Label |
| duncan-macmillan (Duncan MacMillan) | michael-bloomberg (Michael Bloomberg) | feed says: Explicit Relationship Label |
| charles-koch (Charles Koch & family) | julia-koch (Julia Koch & family) | feed says: Explicit Relationship Label |
| elaine-marshall (Elaine Marshall & family) | julia-koch (Julia Koch & family) | feed says: Explicit Relationship Label |
| julia-koch (Julia Koch & family) | william-koch (William Koch) | feed says: Explicit Relationship Label |
| arthur-dantchik (Arthur Dantchik) | jeff-yass (Jeff Yass) | feed says: Explicit Relationship Label |
| jeff-yass (Jeff Yass) | joel-greenberg (Joel Greenberg) | feed says: Explicit Relationship Label |
| charles-koch (Charles Koch & family) | elaine-marshall (Elaine Marshall & family) | feed says: Explicit Relationship Label |
| charles-koch (Charles Koch & family) | william-koch (William Koch) | feed says: Explicit Relationship Label |
| lukas-walton (Lukas Walton) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| jacqueline-mars (Jacqueline Mars) | john-mars (John Mars) | feed says: Explicit Relationship Label |
| jacqueline-mars (Jacqueline Mars) | marijke-mars (Marijke Mars) | feed says: Explicit Relationship Label |
| jacqueline-mars (Jacqueline Mars) | pamela-mars (Pamela Mars) | feed says: Explicit Relationship Label |
| jacqueline-mars (Jacqueline Mars) | valerie-mars (Valerie Mars) | feed says: Explicit Relationship Label |
| john-mars (John Mars) | marijke-mars (Marijke Mars) | feed says: Explicit Relationship Label |
| john-mars (John Mars) | pamela-mars (Pamela Mars) | feed says: Explicit Relationship Label |
| john-mars (John Mars) | valerie-mars (Valerie Mars) | feed says: Explicit Relationship Label |
| gianluigi-aponte (Gianluigi Aponte) | rafaela-aponte-diamant (Rafaela Aponte-Diamant) | feed says: Explicit Relationship Label |
| jonathan-gray (Jonathan Gray) | stephen-schwarzman (Stephen Schwarzman) | feed says: Explicit Relationship Label |
| hamilton-james (Hamilton James & family) | stephen-schwarzman (Stephen Schwarzman) | feed says: Explicit Relationship Label |
| j-tomilson-hill (J. Tomilson Hill) | stephen-schwarzman (Stephen Schwarzman) | feed says: Explicit Relationship Label |
| abigail-johnson (Abigail Johnson) | edward-johnson-iv (Edward Johnson IV) | feed says: Explicit Relationship Label |
| abigail-johnson (Abigail Johnson) | elizabeth-johnson (Elizabeth Johnson) | feed says: Explicit Relationship Label |
| andreas-von-bechtolsheim (Andreas von Bechtolsheim & family) | larry-page (Larry Page) | feed says: Explicit Relationship Label |
| andreas-von-bechtolsheim (Andreas von Bechtolsheim & family) | sergey-brin (Sergey Brin) | feed says: Explicit Relationship Label |
| andreas-von-bechtolsheim (Andreas von Bechtolsheim & family) | jayshree-ullal (Jayshree Ullal) | feed says: Explicit Relationship Label |
| andreas-von-bechtolsheim (Andreas von Bechtolsheim & family) | david-cheriton (David Cheriton) | feed says: Explicit Relationship Label |
| dustin-moskovitz (Dustin Moskovitz) | eduardo-saverin (Eduardo Saverin) | feed says: Explicit Relationship Label |
| eyal-ofer (Eyal Ofer) | idan-ofer (Idan Ofer) | feed says: Explicit Relationship Label |
| peter-thiel (Peter Thiel) | reid-hoffman (Reid Hoffman) | feed says: Explicit Relationship Label |
| paul-fireman (Paul Fireman) | phil-knight (Phil Knight & family) | feed says: Explicit Relationship Label |
| david-sun (David Sun) | john-tu (John Tu) | feed says: Explicit Relationship Label |
| christy-walton (Christy Walton) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| christy-walton (Christy Walton) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| christy-walton (Christy Walton) | lukas-walton (Lukas Walton) | feed says: Explicit Relationship Label |
| christy-walton (Christy Walton) | jim-walton (Jim Walton & family) | feed says: Explicit Relationship Label |
| jack-ma (Jack Ma) | jerry-yang (Jerry Yang) | feed says: Explicit Relationship Label |
| stefan-quandt (Stefan Quandt) | susanne-klatten (Susanne Klatten) | feed says: Explicit Relationship Label |
| ernest-garcia-ii (Ernest Garcia II) | ernest-garcia-iii (Ernest Garcia III) | feed says: Explicit Relationship Label |
| daniel-gilbert (Daniel Gilbert) | david-zalik (David Zalik) | feed says: Explicit Relationship Label |
| josh-harris (Josh Harris) | leon-black (Leon Black) | feed says: Apollo Early Leadership |
| john-mars (John Mars) | victoria-mars (Victoria Mars) | feed says: Uncle And Niece |
| valerie-mars (Valerie Mars) | victoria-mars (Victoria Mars) | feed says: Sisters |
| marijke-mars (Marijke Mars) | valerie-mars (Valerie Mars) | feed says: Sisters |
| larry-page (Larry Page) | nikesh-arora (Nikesh Arora) | feed says: Google Executive / Employee Overlap |
| marissa-mayer (Marissa Mayer) | sergey-brin (Sergey Brin) | feed says: Google Executive / Employee Overlap |
| marijke-mars (Marijke Mars) | pamela-mars (Pamela Mars) | feed says: Sisters |
| marijke-mars (Marijke Mars) | victoria-mars (Victoria Mars) | feed says: Sisters |
| leon-black (Leon Black) | marc-rowan (Marc Rowan) | feed says: Apollo Early Leadership |
| jacqueline-mars (Jacqueline Mars) | victoria-mars (Victoria Mars) | feed says: Aunt And Niece |
| nikesh-arora (Nikesh Arora) | sergey-brin (Sergey Brin) | feed says: Google Executive / Employee Overlap |
| drayton-mclane-jr (Drayton McLane Jr) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| nancy-walton-laurie (Nancy Walton Laurie) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| jim-walton (Jim Walton & family) | nancy-walton-laurie (Nancy Walton Laurie) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | james-cargill-ii (James Cargill II) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | lucy-stitzer (Lucy Stitzer) | feed says: Explicit Relationship Label |
| pauline-macmillan-keinath (Pauline MacMillan Keinath) | sarah-macmillan (Sarah MacMillan) | feed says: Explicit Relationship Label |
| christopher-macmillan (Christopher MacMillan) | donald-macmillan (Donald MacMillan) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| marianne-liebmann (Marianne Liebmann) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| james-cargill-ii (James Cargill II) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | martha-macmillan (Martha MacMillan) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | lucy-stitzer (Lucy Stitzer) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | sarah-macmillan (Sarah MacMillan) | feed says: Explicit Relationship Label |
| marianne-liebmann (Marianne Liebmann) | martha-macmillan (Martha MacMillan) | feed says: Explicit Relationship Label |
| christopher-macmillan (Christopher MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | feed says: Explicit Relationship Label |
| josh-harris (Josh Harris) | michael-rubin (Michael Rubin) | feed says: Explicit Relationship Label |
| christopher-macmillan (Christopher MacMillan) | sandra-macmillan (Sandra MacMillan) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| cargill-macmillan-iii (Cargill MacMillan III) | gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | feed says: Explicit Relationship Label |
| antony-ressler (Antony Ressler) | leon-black (Leon Black) | feed says: Explicit Relationship Label |
| ann-walton-kroenke (Ann Walton Kroenke) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| david-rubenstein (David Rubenstein) | william-conway-jr (William Conway Jr) | feed says: Explicit Relationship Label |
| henry-kravis (Henry Kravis) | lynn-schusterman (Lynn Schusterman & family) | feed says: Explicit Relationship Label |
| nancy-walton-laurie (Nancy Walton Laurie) | stanley-kroenke (Stanley Kroenke) | feed says: Explicit Relationship Label |
| james-cargill-ii (James Cargill II) | martha-macmillan (Martha MacMillan) | feed says: Explicit Relationship Label |
| andrew-macmillan (Andrew MacMillan) | christopher-macmillan (Christopher MacMillan) | feed says: Explicit Relationship Label |
| marianne-liebmann (Marianne Liebmann) | sarah-macmillan (Sarah MacMillan) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | cargill-macmillan-iii (Cargill MacMillan III) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| kavitark-ram-shriram (Kavitark Ram Shriram) | sergey-brin (Sergey Brin) | feed says: Explicit Relationship Label |
| bruce-karsh (Bruce Karsh) | howard-marks (Howard Marks) | feed says: Explicit Relationship Label |
| christopher-macmillan (Christopher MacMillan) | david-macmillan (David MacMillan) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | feed says: Explicit Relationship Label |
| james-cargill-ii (James Cargill II) | lucy-stitzer (Lucy Stitzer) | feed says: Explicit Relationship Label |
| ann-walton-kroenke (Ann Walton Kroenke) | lukas-walton (Lukas Walton) | feed says: Explicit Relationship Label |
| alexandra-daitch (Alexandra Daitch) | james-cargill-ii (James Cargill II) | feed says: Explicit Relationship Label |
| john-doerr (John Doerr) | kavitark-ram-shriram (Kavitark Ram Shriram) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| christopher-macmillan (Christopher MacMillan) | daniel-macmillan (Daniel MacMillan) | feed says: Explicit Relationship Label |
| lucy-stitzer (Lucy Stitzer) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| martha-macmillan (Martha MacMillan) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| james-cargill-ii (James Cargill II) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| george-roberts (George Roberts) | marc-rowan (Marc Rowan) | feed says: Explicit Relationship Label |
| daniel-daniello (Daniel D'Aniello) | william-conway-jr (William Conway Jr) | feed says: Explicit Relationship Label |
| cargill-macmillan-iii (Cargill MacMillan III) | james-cargill-ii (James Cargill II) | feed says: Explicit Relationship Label |
| alexandra-daitch (Alexandra Daitch) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| kavitark-ram-shriram (Kavitark Ram Shriram) | larry-page (Larry Page) | feed says: Explicit Relationship Label |
| daniel-daniello (Daniel D'Aniello) | david-rubenstein (David Rubenstein) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | martha-macmillan (Martha MacMillan) | feed says: Explicit Relationship Label |
| cargill-macmillan-iii (Cargill MacMillan III) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| alexandra-daitch (Alexandra Daitch) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| ann-walton-kroenke (Ann Walton Kroenke) | rob-walton (Rob Walton & family) | feed says: Explicit Relationship Label |
| austen-cargill-ii (Austen Cargill II) | sarah-macmillan (Sarah MacMillan) | feed says: Explicit Relationship Label |
| lukas-walton (Lukas Walton) | nancy-walton-laurie (Nancy Walton Laurie) | feed says: Explicit Relationship Label |
| cargill-macmillan-iii (Cargill MacMillan III) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Explicit Relationship Label |
| brian-armstrong (Brian Armstrong) | fred-ehrsam (Fred Ehrsam) | feed says: Explicit Relationship Label |
| alexandra-daitch (Alexandra Daitch) | gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | feed says: Explicit Relationship Label |
| james-cargill-ii (James Cargill II) | sarah-macmillan (Sarah MacMillan) | feed says: Explicit Relationship Label |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | james-cargill-ii (James Cargill II) | feed says: Explicit Relationship Label |
| alexandra-daitch (Alexandra Daitch) | austen-cargill-ii (Austen Cargill II) | feed says: Explicit Relationship Label |
| lucy-stitzer (Lucy Stitzer) | marianne-liebmann (Marianne Liebmann) | feed says: Explicit Relationship Label |
| pamela-mars (Pamela Mars) | valerie-mars (Valerie Mars) | feed says: Sisters |
| chris-larsen (Chris Larsen) | jed-mccaleb (Jed McCaleb) | feed says: Ripple Early Founders |
| josh-harris (Josh Harris) | marc-rowan (Marc Rowan) | feed says: Apollo Early Leadership |
| larry-page (Larry Page) | marissa-mayer (Marissa Mayer) | feed says: Google Executive / Employee Overlap |
| elon-musk (Elon Musk) | jb-straubel (JB Straubel) | feed says: Board Colleagues |
| pamela-mars (Pamela Mars) | victoria-mars (Victoria Mars) | feed says: Sisters |
| karen-pritzker (Karen Pritzker) | linda-pritzker (Linda Pritzker) | feed says: Profile Related Api Pair |
| alec-gores (Alec Gores) | tom-gores (Tom Gores) | feed says: Profile Related Api Pair |
| anthony-pritzker (Anthony Pritzker) | penny-pritzker (Penny Pritzker) | feed says: Profile Related Api Pair |
| john-macmillan-1 (John MacMillan) | pauline-macmillan-keinath (Pauline MacMillan Keinath) | feed says: Profile Related Api Pair |
| james-cargill-ii (James Cargill II) | john-macmillan-1 (John MacMillan) | feed says: Profile Related Api Pair |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | william-macmillan (William MacMillan) | feed says: Profile Related Api Pair |
| marianne-liebmann (Marianne Liebmann) | william-macmillan (William MacMillan) | feed says: Profile Related Api Pair |
| jennifer-pritzker (Jennifer Pritzker) | karen-pritzker (Karen Pritzker) | feed says: Profile Related Api Pair |
| jb-pritzker (J.B. Pritzker) | penny-pritzker (Penny Pritzker) | feed says: Profile Related Api Pair |
| bruce-flatt (Bruce Flatt) | jack-cockwell (Jack Cockwell) | feed says: Profile Related Api Pair |
| cyrus-madon (Cyrus Madon) | jack-cockwell (Jack Cockwell) | feed says: Profile Related Api Pair |
| daniel-pritzker (Daniel Pritzker) | jean-gigi-pritzker (Jean (Gigi) Pritzker) | feed says: Profile Related Api Pair |
| jack-cockwell (Jack Cockwell) | sam-pollock (Sam Pollock) | feed says: Profile Related Api Pair |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | john-macmillan-1 (John MacMillan) | feed says: Profile Related Api Pair |
| dietmar-hopp (Dietmar Hopp & family) | ryan-smith (Ryan Smith) | feed says: Profile Related Api Pair |
| christopher-macmillan (Christopher MacMillan) | kate-macmillan-reed (Kate MacMillan Reed) | feed says: Profile Related Api Pair |
| john-macmillan-1 (John MacMillan) | marianne-liebmann (Marianne Liebmann) | feed says: Profile Related Api Pair |
| austen-cargill-ii (Austen Cargill II) | john-macmillan-1 (John MacMillan) | feed says: Profile Related Api Pair |
| anthony-pritzker (Anthony Pritzker) | jb-pritzker (J.B. Pritzker) | feed says: Profile Related Api Pair |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | thomas-pritzker (Thomas Pritzker) | feed says: Profile Related Api Pair |
| james-cargill-ii (James Cargill II) | william-macmillan (William MacMillan) | feed says: Profile Related Api Pair |
| justin-ishbia (Justin Ishbia) | mat-ishbia (Mat Ishbia) | feed says: Profile Related Api Pair |
| pauline-macmillan-keinath (Pauline MacMillan Keinath) | william-macmillan (William MacMillan) | feed says: Profile Related Api Pair |
| dietmar-hopp (Dietmar Hopp & family) | jared-smith-1 (Jared Smith) | feed says: Profile Related Api Pair |
| austen-cargill-ii (Austen Cargill II) | william-macmillan (William MacMillan) | feed says: Profile Related Api Pair |
| dietmar-hopp (Dietmar Hopp & family) | scott-smith-1 (Scott Smith) | feed says: Profile Related Api Pair |
| anne-pedrero (Anne Pedrero) | christopher-macmillan (Christopher MacMillan) | feed says: Profile Related Api Pair |
| micky-arison (Micky Arison & family) | thomas-pritzker (Thomas Pritzker) | feed says: Profile Related Api Pair |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | john-pritzker (John Pritzker) | feed says: Profile Related Api Pair |
| brian-lawson (Brian Lawson) | jack-cockwell (Jack Cockwell) | feed says: Profile Related Api Pair |
| sd-shibulal (S.D. Shibulal) | senapathy-gopalakrishnan (Senapathy Gopalakrishnan) | feed says: Cofounders |
| stefan-persson (Stefan Persson) | tom-persson (Tom Persson) | feed says: Parent Child |
| behdad-eghbali (Behdad Eghbali) | jose-e-feliciano (José E. Feliciano) | feed says: Cofounders |
| nr-narayana-murthy (N.R. Narayana Murthy) | senapathy-gopalakrishnan (Senapathy Gopalakrishnan) | feed says: Cofounders |
| k-dinesh (K. Dinesh) | sd-shibulal (S.D. Shibulal) | feed says: Cofounders |
| k-dinesh (K. Dinesh) | nr-narayana-murthy (N.R. Narayana Murthy) | feed says: Cofounders |
| nandan-nilekani (Nandan Nilekani) | senapathy-gopalakrishnan (Senapathy Gopalakrishnan) | feed says: Cofounders |
| karl-johan-persson (Karl-Johan Persson) | tom-persson (Tom Persson) | feed says: Siblings |
| sami-mnaymneh (Sami Mnaymneh) | tony-tamer (Tony Tamer) | feed says: Cofounders |
| k-dinesh (K. Dinesh) | senapathy-gopalakrishnan (Senapathy Gopalakrishnan) | feed says: Cofounders |
| nandan-nilekani (Nandan Nilekani) | sd-shibulal (S.D. Shibulal) | feed says: Cofounders |
| karl-johan-persson (Karl-Johan Persson) | stefan-persson (Stefan Persson) | feed says: Parent Child |
| lottie-tham (Lottie Tham & family) | stefan-persson (Stefan Persson) | feed says: Siblings |
| charlotte-soderstrom (Charlotte Soderstrom) | tom-persson (Tom Persson) | feed says: Siblings |
| thomas-struengmann (Thomas Struengmann & family) | ugur-sahin (Ugur Sahin) | feed says: Early Investor |
| andreas-struengmann (Andreas Struengmann & family) | ugur-sahin (Ugur Sahin) | feed says: Early Investor |
| george-roberts (George Roberts) | henry-kravis (Henry Kravis) | feed says: First Cousins |
| charlotte-soderstrom (Charlotte Soderstrom) | karl-johan-persson (Karl-Johan Persson) | feed says: Siblings |
| andreas-struengmann (Andreas Struengmann & family) | thomas-struengmann (Thomas Struengmann & family) | feed says: Business Cofounders |
| nr-narayana-murthy (N.R. Narayana Murthy) | sd-shibulal (S.D. Shibulal) | feed says: Cofounders |
| nandan-nilekani (Nandan Nilekani) | nr-narayana-murthy (N.R. Narayana Murthy) | feed says: Cofounders |
| k-dinesh (K. Dinesh) | nandan-nilekani (Nandan Nilekani) | feed says: Cofounders |
| charlotte-soderstrom (Charlotte Soderstrom) | stefan-persson (Stefan Persson) | feed says: Parent Child |
| luciano-benetton (Luciano Benetton) | sabrina-benetton (Sabrina Benetton) | feed says: Profile Related Api Pair |
| alberto-prada (Alberto Prada) | patrizio-bertelli (Patrizio Bertelli) | feed says: Profile Related Api Pair |
| giuliana-benetton (Giuliana Benetton) | sabrina-benetton (Sabrina Benetton) | feed says: Profile Related Api Pair |
| alberto-prada (Alberto Prada) | miuccia-prada (Miuccia Prada) | feed says: Profile Related Api Pair |
| marina-prada (Marina Prada) | patrizio-bertelli (Patrizio Bertelli) | feed says: Profile Related Api Pair |
| david-duffield (David Duffield) | jerry-yang (Jerry Yang) | feed says: Profile Related Api Pair |
| niraj-shah (Niraj Shah) | steve-conine (Steve Conine) | feed says: Profile Related Api Pair |
| giuliana-benetton (Giuliana Benetton) | luciano-benetton (Luciano Benetton) | feed says: Profile Related Api Pair |
| marina-prada (Marina Prada) | miuccia-prada (Miuccia Prada) | feed says: Profile Related Api Pair |
| barbara-benetton (Barbara Benetton) | giuliana-benetton (Giuliana Benetton) | feed says: Profile Related Api Pair |
| barbara-benetton (Barbara Benetton) | sabrina-benetton (Sabrina Benetton) | feed says: Profile Related Api Pair |
| miuccia-prada (Miuccia Prada) | patrizio-bertelli (Patrizio Bertelli) | feed says: Profile Related Api Pair |
| rakesh-mittal (Rakesh Mittal) | sunil-mittal-1 (Sunil Mittal) | feed says: Profile Related Api Pair |
| keiko-erikawa (Keiko Erikawa) | yoichi-erikawa (Yoichi Erikawa) | feed says: Profile Related Api Pair |
| nicola-bulgari (Nicola Bulgari) | paolo-bulgari (Paolo Bulgari) | feed says: Profile Related Api Pair |
| leone-benetton (Leone Benetton) | luciano-benetton (Luciano Benetton) | feed says: Profile Related Api Pair |
| rajan-mittal (Rajan Mittal) | sunil-mittal-1 (Sunil Mittal) | feed says: Profile Related Api Pair |
| leone-benetton (Leone Benetton) | sabrina-benetton (Sabrina Benetton) | feed says: Profile Related Api Pair |
| barbara-benetton (Barbara Benetton) | luciano-benetton (Luciano Benetton) | feed says: Profile Related Api Pair |
| giuliana-benetton (Giuliana Benetton) | leone-benetton (Leone Benetton) | feed says: Profile Related Api Pair |
| rajan-mittal (Rajan Mittal) | rakesh-mittal (Rakesh Mittal) | feed says: Profile Related Api Pair |
| ken-xie (Ken Xie & family) | michael-xie (Michael Xie) | feed says: Profile Related Api Pair |
| bryan-glazer (Bryan Glazer) | edward-glazer (Edward Glazer) | feed says: Co Directors |
| joel-glazer (Joel Glazer) | kevin-glazer (Kevin Glazer) | feed says: Co Directors |
| pedro-moreira-salles (Pedro Moreira Salles) | walther-moreira-salles-junior (Walther Moreira Salles Junior) | feed says: Siblings |
| darcie-glazer-kassewitz (Darcie Glazer Kassewitz) | kevin-glazer (Kevin Glazer) | feed says: Co Directors |
| aneel-bhusri (Aneel Bhusri) | david-duffield (David Duffield) | feed says: Cofounders |
| fernando-roberto-moreira-salles (Fernando Roberto Moreira Salles) | joao-moreira-salles (Joao Moreira Salles) | feed says: Siblings |
| matthew-prince (Matthew Prince) | michelle-zatlyn (Michelle Zatlyn) | feed says: Cofounders |
| avram-glazer (Avram Glazer) | kevin-glazer (Kevin Glazer) | feed says: Co Directors |
| bryan-glazer (Bryan Glazer) | darcie-glazer-kassewitz (Darcie Glazer Kassewitz) | feed says: Co Directors |
| darcie-glazer-kassewitz (Darcie Glazer Kassewitz) | edward-glazer (Edward Glazer) | feed says: Co Directors |
| domenico-dolce (Domenico Dolce) | stefano-gabbana (Stefano Gabbana) | feed says: Cofounders |
| fernando-roberto-moreira-salles (Fernando Roberto Moreira Salles) | walther-moreira-salles-junior (Walther Moreira Salles Junior) | feed says: Siblings |
| fernando-roberto-moreira-salles (Fernando Roberto Moreira Salles) | pedro-moreira-salles (Pedro Moreira Salles) | feed says: Siblings |
| avram-glazer (Avram Glazer) | darcie-glazer-kassewitz (Darcie Glazer Kassewitz) | feed says: Co Directors |
| rodolphe-saade (Rodolphe Saadé) | tanya-saade-zeenny (Tanya Saadé Zeenny) | feed says: Siblings |
| bryan-glazer (Bryan Glazer) | joel-glazer (Joel Glazer) | feed says: Co Directors |
| edward-glazer (Edward Glazer) | kevin-glazer (Kevin Glazer) | feed says: Co Directors |
| avram-glazer (Avram Glazer) | bryan-glazer (Bryan Glazer) | feed says: Co Directors |
| darcie-glazer-kassewitz (Darcie Glazer Kassewitz) | joel-glazer (Joel Glazer) | feed says: Co Directors |
| jacques-saade-jr (Jacques Saadé Jr) | tanya-saade-zeenny (Tanya Saadé Zeenny) | feed says: Siblings |
| joao-moreira-salles (Joao Moreira Salles) | walther-moreira-salles-junior (Walther Moreira Salles Junior) | feed says: Siblings |
| joao-moreira-salles (Joao Moreira Salles) | pedro-moreira-salles (Pedro Moreira Salles) | feed says: Siblings |
| avram-glazer (Avram Glazer) | joel-glazer (Joel Glazer) | feed says: Co Directors |
| jacques-saade-jr (Jacques Saadé Jr) | rodolphe-saade (Rodolphe Saadé) | feed says: Siblings |
| avram-glazer (Avram Glazer) | edward-glazer (Edward Glazer) | feed says: Co Directors |
| edward-glazer (Edward Glazer) | joel-glazer (Joel Glazer) | feed says: Co Directors |
| lei-jun (Lei Jun) | lin-bin (Lin Bin) | feed says: Cofounders |
| bryan-glazer (Bryan Glazer) | kevin-glazer (Kevin Glazer) | feed says: Co Directors |
| mark-cuban (Mark Cuban) | todd-wagner (Todd Wagner) | feed says: Profile Related Api Pair |
| kwek-leng-kee (Kwek Leng Kee) | quek-leng-chan (Quek Leng Chan) | feed says: Profile Related Api Pair |
| ivan-glasenberg (Ivan Glasenberg) | tor-peterson (Tor Peterson) | feed says: Profile Related Api Pair |
| alexander-otto (Alexander Otto) | michael-otto (Michael Otto) | feed says: Profile Related Api Pair |
| benjamin-otto (Benjamin Otto) | maren-otto (Maren Otto) | feed says: Profile Related Api Pair |
| kwek-leng-keow (Kwek Leng Keow) | quek-leng-chan (Quek Leng Chan) | feed says: Profile Related Api Pair |
| jaime-gilinski-bacal (Jaime Gilinski Bacal) | john-paulson (John Paulson) | feed says: Profile Related Api Pair |
| alexander-otto (Alexander Otto) | maren-otto (Maren Otto) | feed says: Profile Related Api Pair |
| dan-wilks (Dan Wilks) | harold-hamm (Harold Hamm & family) | feed says: Profile Related Api Pair |
| rinat-akhmetov (Rinat Akhmetov) | vadim-novinsky (Vadim Novinsky) | feed says: Profile Related Api Pair |
| jason-chang (Jason Chang) | richard-chang (Richard Chang) | feed says: Profile Related Api Pair |
| beate-heister (Beate Heister) | karl-albrecht-jr (Karl Albrecht Jr. & family) | feed says: Profile Related Api Pair |
| gopikishan-damani (Gopikishan Damani) | radhakishan-damani-1 (Radhakishan Damani) | feed says: Profile Related Api Pair |
| david-thomson (David Thomson) | sherry-brydson (Sherry Brydson) | feed says: Profile Related Api Pair |
| barry-diller (Barry Diller) | john-malone (John Malone) | feed says: Profile Related Api Pair |
| harold-hamm (Harold Hamm & family) | terrence-pegula (Terrence Pegula) | feed says: Profile Related Api Pair |
| george-kaiser (George Kaiser) | lynn-schusterman (Lynn Schusterman & family) | feed says: Profile Related Api Pair |
| patrick-soon-shiong (Patrick Soon-Shiong) | randal-j-kirk (Randal J. Kirk) | feed says: Profile Related Api Pair |
| andrei-kosogov (Andrei Kosogov) | john-collison (John Collison) | feed says: Profile Related Api Pair |
| jaime-gilinski-bacal (Jaime Gilinski Bacal) | luis-carlos-sarmiento (Luis Carlos Sarmiento) | feed says: Profile Related Api Pair |
| farris-wilks (Farris Wilks) | harold-hamm (Harold Hamm & family) | feed says: Profile Related Api Pair |
| karl-albrecht-jr (Karl Albrecht Jr. & family) | theo-albrecht-jr (Theo Albrecht Jr & family) | feed says: Profile Related Api Pair |
| j-christopher-reyes (J. Christopher Reyes) | jude-reyes (Jude Reyes) | feed says: Siblings And Cofounders |
| benjamin-otto (Benjamin Otto) | michael-otto (Michael Otto) | feed says: Parent Child |
