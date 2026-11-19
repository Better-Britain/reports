# Billionaire Database — research brief: Same-surname, same-country pairs (possible undetected family)

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

Computed gap: pairs of roster people who share a surname and citizenship but have no recorded relationship of any tier. Billionaire wealth is heavily dynastic — many of these will be spouses, siblings or cousins the feeds never connected.

## Task

For each pair, determine whether they are actually related (spouse, sibling, parent–child, cousin, unrelated same-name coincidence). Return sourced rows for real ties only.

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

## Gaps (1174)

| person_a | person_b | current signal |
|---|---|---|
| carlos-slim-helu (Carlos Slim Helu & family) | alfredo-harp-helu (Alfredo Harp Helu & family) | same surname + citizenship — unresearched |
| bill-gates (Bill Gates) | melinda-french-gates (Melinda French Gates) | same surname + citizenship — unresearched |
| changpeng-zhao (Changpeng Zhao) | ivan-zhao (Ivan Zhao) | same surname + citizenship — unresearched |
| julia-koch (Julia Koch & family) | jim-koch (Jim Koch) | same surname + citizenship — unresearched |
| zhang-yiming (Zhang Yiming) | zhu-yiming (Zhu Yiming) | same surname + citizenship — unresearched |
| charles-koch (Charles Koch & family) | jim-koch (Jim Koch) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | charles-b-johnson (Charles B. Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | rupert-johnson-jr (Rupert Johnson Jr) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | h-fisk-johnson (H. Fisk Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| abigail-johnson (Abigail Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| william-ding (William Ding) | zhao-ding (Zhao Ding) | same surname + citizenship — unresearched |
| idan-ofer (Idan Ofer) | liora-ofer (Liora Ofer) | same surname + citizenship — unresearched |
| eyal-ofer (Eyal Ofer) | liora-ofer (Liora Ofer) | same surname + citizenship — unresearched |
| lakshmi-mittal (Lakshmi Mittal) | sunil-mittal-1 (Sunil Mittal) | same surname + citizenship — unresearched |
| lakshmi-mittal (Lakshmi Mittal) | rajan-mittal (Rajan Mittal) | same surname + citizenship — unresearched |
| lakshmi-mittal (Lakshmi Mittal) | rakesh-mittal (Rakesh Mittal) | same surname + citizenship — unresearched |
| lakshmi-mittal (Lakshmi Mittal) | lachhman-das-mittal (Lachhman Das Mittal) | same surname + citizenship — unresearched |
| colin-huang (Colin Huang) | wei-huang (Wei Huang) | same surname + citizenship — unresearched |
| colin-huang (Colin Huang) | howard-huang (Howard Huang) | same surname + citizenship — unresearched |
| steve-cohen (Steve Cohen) | rick-cohen (Rick Cohen & family) | same surname + citizenship — unresearched |
| steve-cohen (Steve Cohen) | stephen-cohen (Stephen Cohen) | same surname + citizenship — unresearched |
| jack-ma (Jack Ma) | ma-bin (Ma Bin & family) | same surname + citizenship — unresearched |
| jack-ma (Jack Ma) | melissa-ma-1 (Melissa Ma) | same surname + citizenship — unresearched |
| gina-rinehart (Gina Rinehart) | ginia-rinehart (Ginia Rinehart) | same surname + citizenship — unresearched |
| gina-rinehart (Gina Rinehart) | bianca-rinehart (Bianca Rinehart) | same surname + citizenship — unresearched |
| lei-jun (Lei Jun) | jian-jun (Jian Jun) | same surname + citizenship — unresearched |
| lei-jun (Lei Jun) | dai-jun (Dai Jun) | same surname + citizenship — unresearched |
| chen-jianhua (Chen Jianhua) | lin-jianhua (Lin Jianhua) | same surname + citizenship — unresearched |
| chen-jianhua (Chen Jianhua) | ren-jianhua (Ren Jianhua) | same surname + citizenship — unresearched |
| jerry-jones (Jerry Jones & family) | paul-tudor-jones-ii (Paul Tudor Jones II) | same surname + citizenship — unresearched |
| jerry-jones (Jerry Jones & family) | trevor-rees-jones (Trevor Rees-Jones) | same surname + citizenship — unresearched |
| jerry-jones (Jerry Jones & family) | harvey-jones (Harvey Jones) | same surname + citizenship — unresearched |
| stefan-persson (Stefan Persson) | markus-persson (Markus Persson) | same surname + citizenship — unresearched |
| todd-graves (Todd Graves) | ryan-graves (Ryan Graves) | same surname + citizenship — unresearched |
| rick-cohen (Rick Cohen & family) | stephen-cohen (Stephen Cohen) | same surname + citizenship — unresearched |
| josh-kushner (Josh Kushner) | jared-kushner (Jared Kushner) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | liu-wei-2 (Liu Wei) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | fang-wei (Fang Wei) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | dong-wei-2 (Dong Wei) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | gu-wei (Gu Wei) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | zheng-wei (Zheng Wei) | same surname + citizenship — unresearched |
| wang-wei (Wang Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | elizabeth-johnson (Elizabeth Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | charles-b-johnson (Charles B. Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | rupert-johnson-jr (Rupert Johnson Jr) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | h-fisk-johnson (H. Fisk Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| edward-johnson-iv (Edward Johnson IV) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| kushal-pal-singh (Kushal Pal Singh) | basudeo-singh (Basudeo Singh) | same surname + citizenship — unresearched |
| kushal-pal-singh (Kushal Pal Singh) | analjit-singh (Analjit Singh) | same surname + citizenship — unresearched |
| sunil-mittal-1 (Sunil Mittal) | lachhman-das-mittal (Lachhman Das Mittal) | same surname + citizenship — unresearched |
| hussain-sajwani (Hussain Sajwani) | abbas-sajwani (Abbas Sajwani) | same surname + citizenship — unresearched |
| ken-fisher (Ken Fisher) | john-fisher (John Fisher) | same surname + citizenship — unresearched |
| ken-fisher (Ken Fisher) | robert-fisher (Robert Fisher) | same surname + citizenship — unresearched |
| ken-fisher (Ken Fisher) | william-fisher (William Fisher) | same surname + citizenship — unresearched |
| jeffery-hildebrand (Jeffery Hildebrand) | brett-hildebrand (Brett Hildebrand) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | charles-b-johnson (Charles B. Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | rupert-johnson-jr (Rupert Johnson Jr) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | h-fisk-johnson (H. Fisk Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| elizabeth-johnson (Elizabeth Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| tom-brown (Tom Brown) | mike-brown-1 (Mike Brown & family) | same surname + citizenship — unresearched |
| tom-brown (Tom Brown) | john-brown (John Brown) | same surname + citizenship — unresearched |
| tom-brown (Tom Brown) | j-hyatt-brown (J. Hyatt Brown) | same surname + citizenship — unresearched |
| tom-brown (Tom Brown) | greg-brown (Greg Brown) | same surname + citizenship — unresearched |
| j-christopher-reyes (J. Christopher Reyes) | duke-reyes (Duke Reyes) | same surname + citizenship — unresearched |
| j-christopher-reyes (J. Christopher Reyes) | james-reyes (James Reyes) | same surname + citizenship — unresearched |
| j-christopher-reyes (J. Christopher Reyes) | thomas-reyes (Thomas Reyes) | same surname + citizenship — unresearched |
| jude-reyes (Jude Reyes) | duke-reyes (Duke Reyes) | same surname + citizenship — unresearched |
| jude-reyes (Jude Reyes) | james-reyes (James Reyes) | same surname + citizenship — unresearched |
| jude-reyes (Jude Reyes) | thomas-reyes (Thomas Reyes) | same surname + citizenship — unresearched |
| jack-clark (Jack Clark) | james-clark (James Clark) | same surname + citizenship — unresearched |
| jack-clark (Jack Clark) | robert-clark (Robert Clark) | same surname + citizenship — unresearched |
| jared-kaplan (Jared Kaplan) | david-kaplan (David Kaplan) | same surname + citizenship — unresearched |
| joseph-lau (Joseph Lau) | martin-lau (Martin Lau) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | lin-li (Lin Li) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | robin-li (Robin Li) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | huang-li-1 (Huang Li) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | zhang-li (Zhang Li) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | david-xueling-li (David Xueling Li) | same surname + citizenship — unresearched |
| eric-li (Eric Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| george-roberts (George Roberts) | brian-roberts (Brian Roberts) | same surname + citizenship — unresearched |
| sandra-ortega-mera (Sandra Ortega Mera) | francisco-jose-riberas-mera (Francisco Jose Riberas Mera) | same surname + citizenship — unresearched |
| sandra-ortega-mera (Sandra Ortega Mera) | juan-maria-riberas-mera (Juan Maria Riberas Mera) | same surname + citizenship — unresearched |
| r-budi-hartono (R. Budi Hartono) | roberto-hartono (Roberto Hartono) | same surname + citizenship — unresearched |
| r-budi-hartono (R. Budi Hartono) | stefanus-hartono (Stefanus Hartono) | same surname + citizenship — unresearched |
| r-budi-hartono (R. Budi Hartono) | tessa-natalia-hartono (Tessa Natalia Hartono) | same surname + citizenship — unresearched |
| r-budi-hartono (R. Budi Hartono) | vanessa-hartono (Vanessa Hartono) | same surname + citizenship — unresearched |
| brad-jacobs (Brad Jacobs) | jeremy-jacobs-sr (Jeremy Jacobs Sr & family) | same surname + citizenship — unresearched |
| george-kurtz (George Kurtz) | richard-kurtz (Richard Kurtz) | same surname + citizenship — unresearched |
| tilman-fertitta (Tilman Fertitta) | frank-fertitta-iii (Frank Fertitta III) | same surname + citizenship — unresearched |
| tilman-fertitta (Tilman Fertitta) | lorenzo-fertitta (Lorenzo Fertitta) | same surname + citizenship — unresearched |
| jimmy-haslam (Jimmy Haslam) | bill-haslam (Bill Haslam) | same surname + citizenship — unresearched |
| andrew-beal (Andrew Beal) | bruce-beal-jr (Bruce Beal Jr) | same surname + citizenship — unresearched |
| pei-zhenhua-1 (Pei Zhenhua) | wang-zhenhua (Wang Zhenhua) | same surname + citizenship — unresearched |
| pei-zhenhua-1 (Pei Zhenhua) | xu-zhenhua (Xu Zhenhua) | same surname + citizenship — unresearched |
| bubba-cathy (Bubba Cathy) | dan-cathy (Dan Cathy) | same surname + citizenship — unresearched |
| josh-harris (Josh Harris) | danny-harris (Danny Harris) | same surname + citizenship — unresearched |
| vikram-lal (Vikram Lal & family) | arvind-lal (Arvind Lal) | same surname + citizenship — unresearched |
| pierre-chen (Pierre Chen) | tony-chen (Tony Chen) | same surname + citizenship — unresearched |
| pierre-chen (Pierre Chen) | samuel-chen (Samuel Chen) | same surname + citizenship — unresearched |
| pierre-chen (Pierre Chen) | warren-chen (Warren Chen) | same surname + citizenship — unresearched |
| john-malone (John Malone) | mary-alice-malone-jr (Mary Alice Malone Jr) | same surname + citizenship — unresearched |
| john-malone (John Malone) | catherine-malone (Catherine Malone) | same surname + citizenship — unresearched |
| ernesto-bertarelli (Ernesto Bertarelli) | dona-bertarelli (Dona Bertarelli) | same surname + citizenship — unresearched |
| randa-duncan-williams (Randa Duncan Williams) | evan-williams (Evan Williams) | same surname + citizenship — unresearched |
| anthony-pratt (Anthony Pratt) | heloise-pratt (Heloise Pratt) | same surname + citizenship — unresearched |
| finn-rausing (Finn Rausing) | jorn-rausing (Jorn Rausing) | same surname + citizenship — unresearched |
| finn-rausing (Finn Rausing) | kirsten-rausing (Kirsten Rausing) | same surname + citizenship — unresearched |
| jorn-rausing (Jorn Rausing) | kirsten-rausing (Kirsten Rausing) | same surname + citizenship — unresearched |
| juan-roig (Juan Roig) | fernando-roig (Fernando Roig) | same surname + citizenship — unresearched |
| charlie-mills (Charlie Mills) | andy-mills (Andy Mills) | same surname + citizenship — unresearched |
| magdalena-martullo-blocher (Magdalena Martullo-Blocher) | rahel-blocher (Rahel Blocher) | same surname + citizenship — unresearched |
| magdalena-martullo-blocher (Magdalena Martullo-Blocher) | markus-blocher (Markus Blocher) | same surname + citizenship — unresearched |
| magdalena-martullo-blocher (Magdalena Martullo-Blocher) | miriam-baumann-blocher (Miriam Baumann-Blocher) | same surname + citizenship — unresearched |
| daniel-tsai (Daniel Tsai) | richard-tsai (Richard Tsai) | same surname + citizenship — unresearched |
| daniel-tsai (Daniel Tsai) | ty-tsai (T.Y. Tsai) | same surname + citizenship — unresearched |
| robert-f-smith (Robert F. Smith) | ryan-smith (Ryan Smith) | same surname + citizenship — unresearched |
| robert-f-smith (Robert F. Smith) | michael-s-smith (Michael S. Smith) | same surname + citizenship — unresearched |
| robert-f-smith (Robert F. Smith) | jared-smith-1 (Jared Smith) | same surname + citizenship — unresearched |
| robert-f-smith (Robert F. Smith) | scott-smith-1 (Scott Smith) | same surname + citizenship — unresearched |
| robert-f-smith (Robert F. Smith) | rick-smith (Rick Smith) | same surname + citizenship — unresearched |
| richard-tsai (Richard Tsai) | ty-tsai (T.Y. Tsai) | same surname + citizenship — unresearched |
| zhu-yi (Zhu Yi) | gao-yi (Gao Yi & family) | same surname + citizenship — unresearched |
| zhu-yi (Zhu Yi) | xie-yi (Xie Yi) | same surname + citizenship — unresearched |
| zhu-yi (Zhu Yi) | yao-yi-1 (Yao Yi) | same surname + citizenship — unresearched |
| pankaj-patel (Pankaj Patel) | karsanbhai-patel (Karsanbhai Patel) | same surname + citizenship — unresearched |
| rafael-del-pino-1 (Rafael Del Pino) | maria-del-pino (Maria Del Pino) | same surname + citizenship — unresearched |
| rafael-del-pino-1 (Rafael Del Pino) | d-leopoldo-del-pino (D. Leopoldo Del Pino) | same surname + citizenship — unresearched |
| rajan-mittal (Rajan Mittal) | lachhman-das-mittal (Lachhman Das Mittal) | same surname + citizenship — unresearched |
| rakesh-mittal (Rakesh Mittal) | lachhman-das-mittal (Lachhman Das Mittal) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | lee-boo-jin (Lee Boo-jin) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | chung-yong-jin (Chung Yong-jin) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | lee-hae-jin (Lee Hae-jin) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | lee-ho-jin (Lee Ho-jin) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | kim-taek-jin (Kim Taek-jin) | same surname + citizenship — unresearched |
| seo-jung-jin (Seo Jung-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| thomas-schmidheiny (Thomas Schmidheiny) | stephan-schmidheiny (Stephan Schmidheiny) | same surname + citizenship — unresearched |
| theo-mueller (Theo Mueller) | erwin-franz-mueller (Erwin Franz Mueller) | same surname + citizenship — unresearched |
| nassef-sawiris (Nassef Sawiris) | naguib-sawiris (Naguib Sawiris) | same surname + citizenship — unresearched |
| nassef-sawiris (Nassef Sawiris) | samih-sawiris (Samih Sawiris) | same surname + citizenship — unresearched |
| carl-cook (Carl Cook) | scott-cook (Scott Cook) | same surname + citizenship — unresearched |
| carl-cook (Carl Cook) | tim-cook (Tim Cook) | same surname + citizenship — unresearched |
| lee-boo-jin (Lee Boo-jin) | chung-yong-jin (Chung Yong-jin) | same surname + citizenship — unresearched |
| lee-boo-jin (Lee Boo-jin) | lee-hae-jin (Lee Hae-jin) | same surname + citizenship — unresearched |
| lee-boo-jin (Lee Boo-jin) | lee-ho-jin (Lee Ho-jin) | same surname + citizenship — unresearched |
| lee-boo-jin (Lee Boo-jin) | kim-taek-jin (Kim Taek-jin) | same surname + citizenship — unresearched |
| lee-boo-jin (Lee Boo-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| steven-rales (Steven Rales) | mitchell-rales (Mitchell Rales) | same surname + citizenship — unresearched |
| mark-stevens (Mark Stevens) | derek-stevens (Derek Stevens) | same surname + citizenship — unresearched |
| cho-jung-ho (Cho Jung-ho) | lee-joon-ho (Lee Joon-ho) | same surname + citizenship — unresearched |
| pang-kang (Pang Kang) | an-kang (An Kang) | same surname + citizenship — unresearched |
| leonard-stern (Leonard Stern) | zachary-stern (Zachary Stern) | same surname + citizenship — unresearched |
| laurent-dassault (Laurent Dassault) | marie-helene-habert-dassault (Marie-Hélène Habert-Dassault) | same surname + citizenship — unresearched |
| laurent-dassault (Laurent Dassault) | thierry-dassault (Thierry Dassault) | same surname + citizenship — unresearched |
| laurent-dassault (Laurent Dassault) | helena-dassault (Helena Dassault) | same surname + citizenship — unresearched |
| laurent-dassault (Laurent Dassault) | remi-dassault (Remi Dassault) | same surname + citizenship — unresearched |
| marie-helene-habert-dassault (Marie-Hélène Habert-Dassault) | thierry-dassault (Thierry Dassault) | same surname + citizenship — unresearched |
| marie-helene-habert-dassault (Marie-Hélène Habert-Dassault) | helena-dassault (Helena Dassault) | same surname + citizenship — unresearched |
| marie-helene-habert-dassault (Marie-Hélène Habert-Dassault) | remi-dassault (Remi Dassault) | same surname + citizenship — unresearched |
| thierry-dassault (Thierry Dassault) | helena-dassault (Helena Dassault) | same surname + citizenship — unresearched |
| thierry-dassault (Thierry Dassault) | remi-dassault (Remi Dassault) | same surname + citizenship — unresearched |
| lee-seo-hyun (Lee Seo-hyun) | yoo-jung-hyun (Yoo Jung-hyun) | same surname + citizenship — unresearched |
| lee-seo-hyun (Lee Seo-hyun) | lee-jay-hyun (Lee Jay-hyun) | same surname + citizenship — unresearched |
| rahel-blocher (Rahel Blocher) | markus-blocher (Markus Blocher) | same surname + citizenship — unresearched |
| rahel-blocher (Rahel Blocher) | miriam-baumann-blocher (Miriam Baumann-Blocher) | same surname + citizenship — unresearched |
| tsai-cheng-ta (Tsai Cheng-ta) | hsieh-wen-ta (Hsieh Wen-Ta) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | thomas-pritzker (Thomas Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | penny-pritzker (Penny Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | jb-pritzker (J.B. Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | john-pritzker (John Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| karen-pritzker (Karen Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| andrew-cherng-1 (Andrew Cherng) | peggy-cherng (Peggy Cherng) | same surname + citizenship — unresearched |
| james-clark (James Clark) | robert-clark (Robert Clark) | same surname + citizenship — unresearched |
| piero-ferrari (Piero Ferrari & family) | luca-ferrari (Luca Ferrari) | same surname + citizenship — unresearched |
| ray-lee-hunt (Ray Lee Hunt) | johnelle-hunt (Johnelle Hunt) | same surname + citizenship — unresearched |
| ray-lee-hunt (Ray Lee Hunt) | clark-hunt (Clark Hunt & family) | same surname + citizenship — unresearched |
| ray-lee-hunt (Ray Lee Hunt) | daniel-hunt (Daniel Hunt & family) | same surname + citizenship — unresearched |
| ray-lee-hunt (Ray Lee Hunt) | lamar-hunt-jr (Lamar Hunt Jr & family) | same surname + citizenship — unresearched |
| ray-lee-hunt (Ray Lee Hunt) | sharron-hunt (Sharron Hunt & family) | same surname + citizenship — unresearched |
| daniel-ziff (Daniel Ziff) | dirk-ziff (Dirk Ziff) | same surname + citizenship — unresearched |
| daniel-ziff (Daniel Ziff) | robert-ziff (Robert Ziff) | same surname + citizenship — unresearched |
| dirk-ziff (Dirk Ziff) | robert-ziff (Robert Ziff) | same surname + citizenship — unresearched |
| lin-li (Lin Li) | robin-li (Robin Li) | same surname + citizenship — unresearched |
| lin-li (Lin Li) | huang-li-1 (Huang Li) | same surname + citizenship — unresearched |
| lin-li (Lin Li) | zhang-li (Zhang Li) | same surname + citizenship — unresearched |
| lin-li (Lin Li) | david-xueling-li (David Xueling Li) | same surname + citizenship — unresearched |
| lin-li (Lin Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | penny-pritzker (Penny Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | jb-pritzker (J.B. Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | john-pritzker (John Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| thomas-pritzker (Thomas Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| paul-tudor-jones-ii (Paul Tudor Jones II) | trevor-rees-jones (Trevor Rees-Jones) | same surname + citizenship — unresearched |
| paul-tudor-jones-ii (Paul Tudor Jones II) | harvey-jones (Harvey Jones) | same surname + citizenship — unresearched |
| rahul-bhatia-1 (Rahul Bhatia) | kapil-bhatia (Kapil Bhatia) | same surname + citizenship — unresearched |
| denise-coates (Denise Coates) | john-coates (John Coates) | same surname + citizenship — unresearched |
| satyanarayan-nuwal (Satyanarayan Nuwal) | kailashchandra-nuwal (Kailashchandra Nuwal) | same surname + citizenship — unresearched |
| vyacheslav-kim (Vyacheslav Kim) | vladimir-kim (Vladimir Kim) | same surname + citizenship — unresearched |
| paolo-rocca (Paolo Rocca) | gianfelice-rocca-1 (Gianfelice Rocca) | same surname + citizenship — unresearched |
| sofie-kirk-kristiansen (Sofie Kirk Kristiansen) | thomas-kirk-kristiansen (Thomas Kirk Kristiansen) | same surname + citizenship — unresearched |
| sofie-kirk-kristiansen (Sofie Kirk Kristiansen) | kjeld-kirk-kristiansen (Kjeld Kirk Kristiansen) | same surname + citizenship — unresearched |
| thomas-kirk-kristiansen (Thomas Kirk Kristiansen) | kjeld-kirk-kristiansen (Kjeld Kirk Kristiansen) | same surname + citizenship — unresearched |
| sudhir-mehta (Sudhir Mehta) | samir-mehta (Samir Mehta) | same surname + citizenship — unresearched |
| sudhir-mehta (Sudhir Mehta) | satish-mehta (Satish Mehta) | same surname + citizenship — unresearched |
| sudhir-mehta (Sudhir Mehta) | deepak-mehta (Deepak Mehta) | same surname + citizenship — unresearched |
| sudhir-mehta (Sudhir Mehta) | kirtikumar-mehta (Kirtikumar Mehta) | same surname + citizenship — unresearched |
| samir-mehta (Samir Mehta) | satish-mehta (Satish Mehta) | same surname + citizenship — unresearched |
| samir-mehta (Samir Mehta) | deepak-mehta (Deepak Mehta) | same surname + citizenship — unresearched |
| samir-mehta (Samir Mehta) | kirtikumar-mehta (Kirtikumar Mehta) | same surname + citizenship — unresearched |
| max-van-hoegaerden-herrmann-telles (Max Van Hoegaerden Herrmann Telles) | marcel-herrmann-telles (Marcel Herrmann Telles & family) | same surname + citizenship — unresearched |
| mikhail-gutseriev (Mikhail Gutseriev) | said-gutseriev (Said Gutseriev) | same surname + citizenship — unresearched |
| michael-kim (Michael Kim) | bom-kim (Bom Kim) | same surname + citizenship — unresearched |
| mike-brown-1 (Mike Brown & family) | john-brown (John Brown) | same surname + citizenship — unresearched |
| mike-brown-1 (Mike Brown & family) | j-hyatt-brown (J. Hyatt Brown) | same surname + citizenship — unresearched |
| mike-brown-1 (Mike Brown & family) | greg-brown (Greg Brown) | same surname + citizenship — unresearched |
| jeffrey-koo-jr (Jeffrey Koo Jr) | andre-koo (Andre Koo) | same surname + citizenship — unresearched |
| jeffrey-koo-jr (Jeffrey Koo Jr) | angelo-koo (Angelo Koo) | same surname + citizenship — unresearched |
| maria-angelicoussis (Maria Angelicoussis) | anna-angelicoussis (Anna Angelicoussis & family) | same surname + citizenship — unresearched |
| elizabeth-uihlein (Elizabeth Uihlein) | richard-uihlein (Richard Uihlein) | same surname + citizenship — unresearched |
| h-ross-perot-jr (H. Ross Perot Jr) | margot-birmingham-perot (Margot Birmingham Perot) | same surname + citizenship — unresearched |
| thai-lee (Thai Lee) | gene-lee (Gene Lee) | same surname + citizenship — unresearched |
| thai-lee (Thai Lee) | paul-lee-1 (Paul Lee) | same surname + citizenship — unresearched |
| you-xiaoping (You Xiaoping & family) | zhou-xiaoping-1 (Zhou Xiaoping) | same surname + citizenship — unresearched |
| you-xiaoping (You Xiaoping & family) | ye-xiaoping (Ye Xiaoping) | same surname + citizenship — unresearched |
| maximilian-viessmann (Maximilian Viessmann) | anna-katharina-viessmann (Anna Katharina Viessmann) | same surname + citizenship — unresearched |
| maximilian-viessmann (Maximilian Viessmann) | martin-viessmann (Martin Viessmann) | same surname + citizenship — unresearched |
| lynsi-snyder (Lynsi Snyder) | dan-snyder (Dan Snyder) | same surname + citizenship — unresearched |
| ronda-stryker (Ronda Stryker) | jon-stryker (Jon Stryker) | same surname + citizenship — unresearched |
| ronda-stryker (Ronda Stryker) | pat-stryker (Pat Stryker) | same surname + citizenship — unresearched |
| bruce-cheng (Bruce Cheng) | tseng-cheng (Tseng Cheng) | same surname + citizenship — unresearched |
| bruce-cheng (Bruce Cheng) | chang-kuo-cheng (Chang Kuo-Cheng) | same surname + citizenship — unresearched |
| sky-xu (Sky Xu) | huang-xu (Huang Xu) | same surname + citizenship — unresearched |
| john-brown (John Brown) | j-hyatt-brown (J. Hyatt Brown) | same surname + citizenship — unresearched |
| john-brown (John Brown) | greg-brown (Greg Brown) | same surname + citizenship — unresearched |
| joe-lewis (Joe Lewis) | bernard-lewis (Bernard Lewis & family) | same surname + citizenship — unresearched |
| robert-bass (Robert Bass) | sid-bass (Sid Bass) | same surname + citizenship — unresearched |
| robert-bass (Robert Bass) | edward-bass (Edward Bass) | same surname + citizenship — unresearched |
| robert-bass (Robert Bass) | lee-bass (Lee Bass) | same surname + citizenship — unresearched |
| philip-ng (Philip Ng) | robert-ng (Robert Ng) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | rupert-johnson-jr (Rupert Johnson Jr) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | h-fisk-johnson (H. Fisk Johnson) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| charles-b-johnson (Charles B. Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| ronald-wanek (Ronald Wanek) | todd-wanek (Todd Wanek) | same surname + citizenship — unresearched |
| jim-davis (Jim Davis & family) | ray-davis (Ray Davis) | same surname + citizenship — unresearched |
| jim-davis (Jim Davis & family) | jim-davis-1 (Jim Davis) | same surname + citizenship — unresearched |
| jim-davis (Jim Davis & family) | mark-davis-1 (Mark Davis) | same surname + citizenship — unresearched |
| jim-davis (Jim Davis & family) | henry-davis (Henry Davis) | same surname + citizenship — unresearched |
| mitchell-morgan (Mitchell Morgan & family) | john-morgan (John Morgan) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | penny-pritzker (Penny Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | anthony-pritzker (Anthony Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | jb-pritzker (J.B. Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| jean-gigi-pritzker (Jean (Gigi) Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| jaran-chiaravanont (Jaran Chiaravanont) | phongthep-chiaravanont (Phongthep Chiaravanont) | same surname + citizenship — unresearched |
| richard-li (Richard Li) | wong-man-li (Wong Man Li) | same surname + citizenship — unresearched |
| matthias-reimann-andersen (Matthias Reimann-Andersen) | stefan-reimann-andersen (Stefan Reimann-Andersen) | same surname + citizenship — unresearched |
| renate-reimann-haas (Renate Reimann-Haas) | stephanie-haas (Stephanie Haas) | same surname + citizenship — unresearched |
| hank-meijer (Hank Meijer & family) | mark-meijer (Mark Meijer & family) | same surname + citizenship — unresearched |
| michael-herz (Michael Herz) | wolfgang-herz (Wolfgang Herz) | same surname + citizenship — unresearched |
| michael-herz (Michael Herz) | christian-herz (Christian Herz) | same surname + citizenship — unresearched |
| michael-herz (Michael Herz) | michaela-herz (Michaela Herz) | same surname + citizenship — unresearched |
| wolfgang-herz (Wolfgang Herz) | christian-herz (Christian Herz) | same surname + citizenship — unresearched |
| wolfgang-herz (Wolfgang Herz) | michaela-herz (Michaela Herz) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | barbara-boehringer (Barbara Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | christian-boehringer (Christian Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | christoph-boehringer (Christoph Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | isabel-boehringer (Isabel Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | mathias-boehringer (Mathias Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| albert-boehringer (Albert Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | christian-boehringer (Christian Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | christoph-boehringer (Christoph Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | isabel-boehringer (Isabel Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | mathias-boehringer (Mathias Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| barbara-boehringer (Barbara Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| christian-boehringer (Christian Boehringer) | christoph-boehringer (Christoph Boehringer) | same surname + citizenship — unresearched |
| christian-boehringer (Christian Boehringer) | isabel-boehringer (Isabel Boehringer) | same surname + citizenship — unresearched |
| christian-boehringer (Christian Boehringer) | mathias-boehringer (Mathias Boehringer) | same surname + citizenship — unresearched |
| christian-boehringer (Christian Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| christian-boehringer (Christian Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| christoph-boehringer (Christoph Boehringer) | isabel-boehringer (Isabel Boehringer) | same surname + citizenship — unresearched |
| christoph-boehringer (Christoph Boehringer) | mathias-boehringer (Mathias Boehringer) | same surname + citizenship — unresearched |
| christoph-boehringer (Christoph Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| christoph-boehringer (Christoph Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | franz-von-baumbach (Franz von Baumbach) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | hubertus-von-baumbach (Hubertus von Baumbach) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | johannes-von-baumbach (Johannes von Baumbach) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | katharina-von-baumbach (Katharina von Baumbach) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | maximilian-von-baumbach (Maximilian von Baumbach) | same surname + citizenship — unresearched |
| erich-von-baumbach (Erich von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| franz-von-baumbach (Franz von Baumbach) | hubertus-von-baumbach (Hubertus von Baumbach) | same surname + citizenship — unresearched |
| franz-von-baumbach (Franz von Baumbach) | johannes-von-baumbach (Johannes von Baumbach) | same surname + citizenship — unresearched |
| franz-von-baumbach (Franz von Baumbach) | katharina-von-baumbach (Katharina von Baumbach) | same surname + citizenship — unresearched |
| franz-von-baumbach (Franz von Baumbach) | maximilian-von-baumbach (Maximilian von Baumbach) | same surname + citizenship — unresearched |
| franz-von-baumbach (Franz von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| hubertus-von-baumbach (Hubertus von Baumbach) | johannes-von-baumbach (Johannes von Baumbach) | same surname + citizenship — unresearched |
| hubertus-von-baumbach (Hubertus von Baumbach) | katharina-von-baumbach (Katharina von Baumbach) | same surname + citizenship — unresearched |
| hubertus-von-baumbach (Hubertus von Baumbach) | maximilian-von-baumbach (Maximilian von Baumbach) | same surname + citizenship — unresearched |
| hubertus-von-baumbach (Hubertus von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| isabel-boehringer (Isabel Boehringer) | mathias-boehringer (Mathias Boehringer) | same surname + citizenship — unresearched |
| isabel-boehringer (Isabel Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| isabel-boehringer (Isabel Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| johannes-von-baumbach (Johannes von Baumbach) | katharina-von-baumbach (Katharina von Baumbach) | same surname + citizenship — unresearched |
| johannes-von-baumbach (Johannes von Baumbach) | maximilian-von-baumbach (Maximilian von Baumbach) | same surname + citizenship — unresearched |
| johannes-von-baumbach (Johannes von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| katharina-von-baumbach (Katharina von Baumbach) | maximilian-von-baumbach (Maximilian von Baumbach) | same surname + citizenship — unresearched |
| katharina-von-baumbach (Katharina von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| mathias-boehringer (Mathias Boehringer) | otto-boehringer (Otto Boehringer) | same surname + citizenship — unresearched |
| mathias-boehringer (Mathias Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| maximilian-von-baumbach (Maximilian von Baumbach) | ulrike-von-baumbach (Ulrike von Baumbach) | same surname + citizenship — unresearched |
| otto-boehringer (Otto Boehringer) | philipp-boehringer (Philipp Boehringer) | same surname + citizenship — unresearched |
| erich-wesjohann (Erich Wesjohann & family) | paul-heinz-wesjohann (Paul-Heinz Wesjohann & family) | same surname + citizenship — unresearched |
| benu-gopal-bangur (Benu Gopal Bangur) | krishna-kumar-bangur (Krishna Kumar Bangur) | same surname + citizenship — unresearched |
| trevor-rees-jones (Trevor Rees-Jones) | harvey-jones (Harvey Jones) | same surname + citizenship — unresearched |
| eren-ozmen (Eren Ozmen) | fatih-ozmen (Fatih Ozmen) | same surname + citizenship — unresearched |
| leonardo-maria-del-vecchio (Leonardo Maria Del Vecchio) | claudio-del-vecchio (Claudio Del Vecchio) | same surname + citizenship — unresearched |
| leonardo-maria-del-vecchio (Leonardo Maria Del Vecchio) | clemente-del-vecchio (Clemente Del Vecchio) | same surname + citizenship — unresearched |
| leonardo-maria-del-vecchio (Leonardo Maria Del Vecchio) | luca-del-vecchio (Luca Del Vecchio) | same surname + citizenship — unresearched |
| leonardo-maria-del-vecchio (Leonardo Maria Del Vecchio) | marisa-del-vecchio (Marisa Del Vecchio) | same surname + citizenship — unresearched |
| leonardo-maria-del-vecchio (Leonardo Maria Del Vecchio) | paola-del-vecchio (Paola Del Vecchio) | same surname + citizenship — unresearched |
| carl-douglas (Carl Douglas) | eric-douglas (Eric Douglas) | same surname + citizenship — unresearched |
| carl-douglas (Carl Douglas) | elisabeth-douglas (Elisabeth Douglas) | same surname + citizenship — unresearched |
| alexander-otto (Alexander Otto) | benjamin-otto (Benjamin Otto) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | h-fisk-johnson (H. Fisk Johnson) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| rupert-johnson-jr (Rupert Johnson Jr) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | john-pritzker (John Pritzker) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| penny-pritzker (Penny Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| franz-viegener (Franz Viegener) | anna-viegener (Anna Viegener) | same surname + citizenship — unresearched |
| claudio-del-vecchio (Claudio Del Vecchio) | clemente-del-vecchio (Clemente Del Vecchio) | same surname + citizenship — unresearched |
| claudio-del-vecchio (Claudio Del Vecchio) | luca-del-vecchio (Luca Del Vecchio) | same surname + citizenship — unresearched |
| claudio-del-vecchio (Claudio Del Vecchio) | marisa-del-vecchio (Marisa Del Vecchio) | same surname + citizenship — unresearched |
| claudio-del-vecchio (Claudio Del Vecchio) | paola-del-vecchio (Paola Del Vecchio) | same surname + citizenship — unresearched |
| clemente-del-vecchio (Clemente Del Vecchio) | luca-del-vecchio (Luca Del Vecchio) | same surname + citizenship — unresearched |
| clemente-del-vecchio (Clemente Del Vecchio) | marisa-del-vecchio (Marisa Del Vecchio) | same surname + citizenship — unresearched |
| clemente-del-vecchio (Clemente Del Vecchio) | paola-del-vecchio (Paola Del Vecchio) | same surname + citizenship — unresearched |
| luca-del-vecchio (Luca Del Vecchio) | marisa-del-vecchio (Marisa Del Vecchio) | same surname + citizenship — unresearched |
| luca-del-vecchio (Luca Del Vecchio) | paola-del-vecchio (Paola Del Vecchio) | same surname + citizenship — unresearched |
| marisa-del-vecchio (Marisa Del Vecchio) | paola-del-vecchio (Paola Del Vecchio) | same surname + citizenship — unresearched |
| johnelle-hunt (Johnelle Hunt) | clark-hunt (Clark Hunt & family) | same surname + citizenship — unresearched |
| johnelle-hunt (Johnelle Hunt) | daniel-hunt (Daniel Hunt & family) | same surname + citizenship — unresearched |
| johnelle-hunt (Johnelle Hunt) | lamar-hunt-jr (Lamar Hunt Jr & family) | same surname + citizenship — unresearched |
| johnelle-hunt (Johnelle Hunt) | sharron-hunt (Sharron Hunt & family) | same surname + citizenship — unresearched |
| jorge-moll-filho (Jorge Moll Filho & family) | jose-joao-abdalla-filho (Jose Joao Abdalla Filho) | same surname + citizenship — unresearched |
| jorge-moll-filho (Jorge Moll Filho & family) | alfredo-egydio-arruda-villela-filho (Alfredo Egydio Arruda Villela Filho) | same surname + citizenship — unresearched |
| eric-douglas (Eric Douglas) | elisabeth-douglas (Elisabeth Douglas) | same surname + citizenship — unresearched |
| annette-lerner (Annette Lerner & family) | nancy-lerner (Nancy Lerner) | same surname + citizenship — unresearched |
| annette-lerner (Annette Lerner & family) | randolph-lerner (Randolph Lerner) | same surname + citizenship — unresearched |
| annette-lerner (Annette Lerner & family) | norma-lerner (Norma Lerner) | same surname + citizenship — unresearched |
| balkrishan-goenka (Balkrishan Goenka) | sanjiv-goenka (Sanjiv Goenka) | same surname + citizenship — unresearched |
| balkrishan-goenka (Balkrishan Goenka) | harsh-goenka (Harsh Goenka) | same surname + citizenship — unresearched |
| mong-koo-chung (Mong-Koo Chung) | euisun-chung (Euisun Chung) | same surname + citizenship — unresearched |
| zhu-yan (Zhu Yan & family) | zhao-yan (Zhao Yan) | same surname + citizenship — unresearched |
| shapoor-mistry-1 (Shapoor Mistry) | firoz-mistry (Firoz Mistry) | same surname + citizenship — unresearched |
| shapoor-mistry-1 (Shapoor Mistry) | zahan-mistry (Zahan Mistry) | same surname + citizenship — unresearched |
| rajiv-bajaj (Rajiv Bajaj) | sanjiv-bajaj (Sanjiv Bajaj) | same surname + citizenship — unresearched |
| rajiv-bajaj (Rajiv Bajaj) | shekhar-bajaj (Shekhar Bajaj) | same surname + citizenship — unresearched |
| rajiv-bajaj (Rajiv Bajaj) | kumud-bajaj (Kumud Bajaj) | same surname + citizenship — unresearched |
| rajiv-bajaj (Rajiv Bajaj) | niraj-bajaj-1 (Niraj Bajaj) | same surname + citizenship — unresearched |
| sanjiv-bajaj (Sanjiv Bajaj) | shekhar-bajaj (Shekhar Bajaj) | same surname + citizenship — unresearched |
| sanjiv-bajaj (Sanjiv Bajaj) | kumud-bajaj (Kumud Bajaj) | same surname + citizenship — unresearched |
| sanjiv-bajaj (Sanjiv Bajaj) | niraj-bajaj-1 (Niraj Bajaj) | same surname + citizenship — unresearched |
| chandru-raheja (Chandru Raheja) | rajan-raheja (Rajan Raheja & family) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | s-curtis-johnson (S. Curtis Johnson) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| h-fisk-johnson (H. Fisk Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| s-curtis-johnson (S. Curtis Johnson) | robert-johnson-3 (Robert Johnson & family) | same surname + citizenship — unresearched |
| s-curtis-johnson (S. Curtis Johnson) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| s-curtis-johnson (S. Curtis Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| s-curtis-johnson (S. Curtis Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| s-curtis-johnson (S. Curtis Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| naguib-sawiris (Naguib Sawiris) | samih-sawiris (Samih Sawiris) | same surname + citizenship — unresearched |
| steven-hao (Steven Hao) | kenneth-hao (Kenneth Hao) | same surname + citizenship — unresearched |
| li-min (Li Min) | xue-min (Xue Min) | same surname + citizenship — unresearched |
| ronald-lauder (Ronald Lauder) | jane-lauder (Jane Lauder) | same surname + citizenship — unresearched |
| ronald-lauder (Ronald Lauder) | william-lauder (William Lauder) | same surname + citizenship — unresearched |
| ronald-lauder (Ronald Lauder) | aerin-lauder (Aerin Lauder) | same surname + citizenship — unresearched |
| lynda-resnick (Lynda Resnick) | stewart-resnick (Stewart Resnick) | same surname + citizenship — unresearched |
| cho-tak-wong (Cho Tak Wong) | allan-wong (Allan Wong) | same surname + citizenship — unresearched |
| gwendolyn-sontheim-meyer (Gwendolyn Sontheim Meyer) | jenny-love-meyer (Jenny Love Meyer) | same surname + citizenship — unresearched |
| andre-koo (Andre Koo) | angelo-koo (Angelo Koo) | same surname + citizenship — unresearched |
| maria-del-pino (Maria Del Pino) | d-leopoldo-del-pino (D. Leopoldo Del Pino) | same surname + citizenship — unresearched |
| scott-cook (Scott Cook) | tim-cook (Tim Cook) | same surname + citizenship — unresearched |
| ian-livingstone (Ian Livingstone) | richard-livingstone (Richard Livingstone) | same surname + citizenship — unresearched |
| gail-miller (Gail Miller & family) | alan-miller-1 (Alan Miller & family) | same surname + citizenship — unresearched |
| jon-stryker (Jon Stryker) | pat-stryker (Pat Stryker) | same surname + citizenship — unresearched |
| anil-agarwal (Anil Agarwal & family) | manohar-lal-agarwal (Manohar Lal Agarwal) | same surname + citizenship — unresearched |
| anil-agarwal (Anil Agarwal & family) | anju-agarwal (Anju Agarwal) | same surname + citizenship — unresearched |
| anil-agarwal (Anil Agarwal & family) | madhusudan-agarwal (Madhusudan Agarwal) | same surname + citizenship — unresearched |
| anil-agarwal (Anil Agarwal & family) | sanjay-agarwal (Sanjay Agarwal) | same surname + citizenship — unresearched |
| anil-agarwal (Anil Agarwal & family) | sachin-agarwal (Sachin Agarwal) | same surname + citizenship — unresearched |
| hamad-bin-jassim-bin-jaber-al-thani (Hamad bin Jassim bin Jaber Al Thani) | faisal-bin-qassim-al-thani (Faisal Bin Qassim Al Thani) | same surname + citizenship — unresearched |
| jamshyd-godrej (Jamshyd Godrej) | smita-crishna-godrej (Smita Crishna Godrej) | same surname + citizenship — unresearched |
| jamshyd-godrej (Jamshyd Godrej) | nadir-godrej (Nadir Godrej) | same surname + citizenship — unresearched |
| jamshyd-godrej (Jamshyd Godrej) | adi-godrej (Adi Godrej) | same surname + citizenship — unresearched |
| smita-crishna-godrej (Smita Crishna Godrej) | nadir-godrej (Nadir Godrej) | same surname + citizenship — unresearched |
| smita-crishna-godrej (Smita Crishna Godrej) | adi-godrej (Adi Godrej) | same surname + citizenship — unresearched |
| wang-xin (Wang Xin) | zhang-xin (Zhang Xin) | same surname + citizenship — unresearched |
| wang-xin (Wang Xin) | jin-xin (Jin Xin) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | pv-ramprasad-reddy (P.V. Ramprasad Reddy) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | prathap-reddy (Prathap Reddy) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | msatyanarayana-reddy (M.Satyanarayana Reddy) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | pv-krishna-reddy (P.V. Krishna Reddy) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | pp-reddy (P.P. Reddy) | same surname + citizenship — unresearched |
| b-partha-saradhi-reddy (B. Partha Saradhi Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| robert-johnson-3 (Robert Johnson & family) | willis-johnson (Willis Johnson) | same surname + citizenship — unresearched |
| robert-johnson-3 (Robert Johnson & family) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| robert-johnson-3 (Robert Johnson & family) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| robert-johnson-3 (Robert Johnson & family) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| james-chambers (James Chambers) | herb-chambers (Herb Chambers) | same surname + citizenship — unresearched |
| margaretta-taylor (Margaretta Taylor) | glen-taylor (Glen Taylor) | same surname + citizenship — unresearched |
| margaretta-taylor (Margaretta Taylor) | bret-taylor (Bret Taylor) | same surname + citizenship — unresearched |
| margaretta-taylor (Margaretta Taylor) | terry-taylor (Terry Taylor) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | john-pritzker (John Pritzker) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| anthony-pritzker (Anthony Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| nicolas-dieteren (Nicolas D'Ieteren) | catheline-perier-dieteren (Catheline Perier D'Ieteren) | same surname + citizenship — unresearched |
| li-hua (Li Hua) | xue-hua (Xue Hua) | same surname + citizenship — unresearched |
| li-hua (Li Hua) | chen-hua-1 (Chen Hua & family) | same surname + citizenship — unresearched |
| li-hua (Li Hua) | su-hua (Su Hua) | same surname + citizenship — unresearched |
| april-goh (April Goh) | charlotte-goh (Charlotte Goh) | same surname + citizenship — unresearched |
| april-goh (April Goh) | henrietta-goh (Henrietta Goh) | same surname + citizenship — unresearched |
| april-goh (April Goh) | victoria-goh (Victoria Goh) | same surname + citizenship — unresearched |
| nithin-kamath (Nithin Kamath) | nikhil-kamath (Nikhil Kamath) | same surname + citizenship — unresearched |
| martin-haefner (Martin Haefner) | eva-maria-bucher-haefner (Eva Maria Bucher-Haefner) | same surname + citizenship — unresearched |
| mark-shoen (Mark Shoen) | e-joe-shoen (E. Joe Shoen) | same surname + citizenship — unresearched |
| hamilton-james (Hamilton James & family) | thomas-james (Thomas James) | same surname + citizenship — unresearched |
| hamilton-james (Hamilton James & family) | lebron-james (LeBron James) | same surname + citizenship — unresearched |
| sid-bass (Sid Bass) | edward-bass (Edward Bass) | same surname + citizenship — unresearched |
| sid-bass (Sid Bass) | lee-bass (Lee Bass) | same surname + citizenship — unresearched |
| robin-li (Robin Li) | huang-li-1 (Huang Li) | same surname + citizenship — unresearched |
| robin-li (Robin Li) | zhang-li (Zhang Li) | same surname + citizenship — unresearched |
| robin-li (Robin Li) | david-xueling-li (David Xueling Li) | same surname + citizenship — unresearched |
| robin-li (Robin Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| qiu-jianping (Qiu Jianping & family) | zhou-jianping (Zhou Jianping) | same surname + citizenship — unresearched |
| qiu-jianping (Qiu Jianping & family) | lai-jianping (Lai Jianping) | same surname + citizenship — unresearched |
| james-duff (James Duff) | thomas-duff (Thomas Duff) | same surname + citizenship — unresearched |
| andreas-martinos (Andreas Martinos & family) | constantinos-martinos (Constantinos Martinos & family) | same surname + citizenship — unresearched |
| andreas-martinos (Andreas Martinos & family) | athanasios-martinos (Athanasios Martinos & family) | same surname + citizenship — unresearched |
| gilles-martin (Gilles Martin) | yves-loic-martin (Yves-Loic Martin) | same surname + citizenship — unresearched |
| ray-davis (Ray Davis) | jim-davis-1 (Jim Davis) | same surname + citizenship — unresearched |
| ray-davis (Ray Davis) | mark-davis-1 (Mark Davis) | same surname + citizenship — unresearched |
| ray-davis (Ray Davis) | henry-davis (Henry Davis) | same surname + citizenship — unresearched |
| jim-davis-1 (Jim Davis) | mark-davis-1 (Mark Davis) | same surname + citizenship — unresearched |
| jim-davis-1 (Jim Davis) | henry-davis (Henry Davis) | same surname + citizenship — unresearched |
| chey-tae-won (Chey Tae-won) | chey-ki-won (Chey Ki-won) | same surname + citizenship — unresearched |
| pv-ramprasad-reddy (P.V. Ramprasad Reddy) | prathap-reddy (Prathap Reddy) | same surname + citizenship — unresearched |
| pv-ramprasad-reddy (P.V. Ramprasad Reddy) | msatyanarayana-reddy (M.Satyanarayana Reddy) | same surname + citizenship — unresearched |
| pv-ramprasad-reddy (P.V. Ramprasad Reddy) | pv-krishna-reddy (P.V. Krishna Reddy) | same surname + citizenship — unresearched |
| pv-ramprasad-reddy (P.V. Ramprasad Reddy) | pp-reddy (P.P. Reddy) | same surname + citizenship — unresearched |
| pv-ramprasad-reddy (P.V. Ramprasad Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| huang-li-1 (Huang Li) | zhang-li (Zhang Li) | same surname + citizenship — unresearched |
| huang-li-1 (Huang Li) | david-xueling-li (David Xueling Li) | same surname + citizenship — unresearched |
| huang-li-1 (Huang Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| thomas-wu (Thomas Wu) | eugene-wu (Eugene Wu) | same surname + citizenship — unresearched |
| antti-herlin (Antti Herlin) | heikki-herlin (Heikki Herlin) | same surname + citizenship — unresearched |
| antti-herlin (Antti Herlin) | ilkka-herlin (Ilkka Herlin) | same surname + citizenship — unresearched |
| antti-herlin (Antti Herlin) | ilona-herlin (Ilona Herlin) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | john-pritzker (John Pritzker) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| jb-pritzker (J.B. Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| lam-wai-ying (Lam Wai-ying) | michael-ying (Michael Ying) | same surname + citizenship — unresearched |
| samuel-tak-lee (Samuel Tak Lee) | patrick-lee (Patrick Lee) | same surname + citizenship — unresearched |
| chen-tao (Chen Tao & family) | han-tao (Han Tao) | same surname + citizenship — unresearched |
| chen-tao (Chen Tao & family) | zhang-tao (Zhang Tao) | same surname + citizenship — unresearched |
| shekhar-bajaj (Shekhar Bajaj) | kumud-bajaj (Kumud Bajaj) | same surname + citizenship — unresearched |
| shekhar-bajaj (Shekhar Bajaj) | niraj-bajaj-1 (Niraj Bajaj) | same surname + citizenship — unresearched |
| kumud-bajaj (Kumud Bajaj) | niraj-bajaj-1 (Niraj Bajaj) | same surname + citizenship — unresearched |
| joesley-batista (Joesley Batista) | wesley-batista (Wesley Batista) | same surname + citizenship — unresearched |
| dan-olsson (Dan Olsson) | stefan-olsson (Stefan Olsson) | same surname + citizenship — unresearched |
| anna-katharina-viessmann (Anna Katharina Viessmann) | martin-viessmann (Martin Viessmann) | same surname + citizenship — unresearched |
| mohamed-mansour (Mohamed Mansour) | youssef-mansour (Youssef Mansour) | same surname + citizenship — unresearched |
| mohamed-mansour (Mohamed Mansour) | yasseen-mansour (Yasseen Mansour) | same surname + citizenship — unresearched |
| prathap-reddy (Prathap Reddy) | msatyanarayana-reddy (M.Satyanarayana Reddy) | same surname + citizenship — unresearched |
| prathap-reddy (Prathap Reddy) | pv-krishna-reddy (P.V. Krishna Reddy) | same surname + citizenship — unresearched |
| prathap-reddy (Prathap Reddy) | pp-reddy (P.P. Reddy) | same surname + citizenship — unresearched |
| prathap-reddy (Prathap Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| vivek-jain (Vivek Jain) | pavan-jain (Pavan Jain) | same surname + citizenship — unresearched |
| vivek-jain (Vivek Jain) | anurang-jain-1 (Anurang Jain) | same surname + citizenship — unresearched |
| vivek-jain (Vivek Jain) | kishore-jain (Kishore Jain) | same surname + citizenship — unresearched |
| vivek-jain (Vivek Jain) | kiran-kumar-jain (Kiran Kumar Jain) | same surname + citizenship — unresearched |
| vivek-jain (Vivek Jain) | naresh-jain (Naresh Jain) | same surname + citizenship — unresearched |
| markus-blocher (Markus Blocher) | miriam-baumann-blocher (Miriam Baumann-Blocher) | same surname + citizenship — unresearched |
| susan-alfond (Susan Alfond) | ted-alfond (Ted Alfond) | same surname + citizenship — unresearched |
| susan-alfond (Susan Alfond) | bill-alfond (Bill Alfond) | same surname + citizenship — unresearched |
| ted-alfond (Ted Alfond) | bill-alfond (Bill Alfond) | same surname + citizenship — unresearched |
| jose-joao-abdalla-filho (Jose Joao Abdalla Filho) | alfredo-egydio-arruda-villela-filho (Alfredo Egydio Arruda Villela Filho) | same surname + citizenship — unresearched |
| jozef-tkac (Jozef Tkac) | patrik-tkac (Patrik Tkac) | same surname + citizenship — unresearched |
| margaret-baker (Margaret Baker) | felix-baker (Felix Baker) | same surname + citizenship — unresearched |
| margaret-baker (Margaret Baker) | julian-baker (Julian Baker) | same surname + citizenship — unresearched |
| g-m-rao (G. M. Rao) | jupally-rameshwar-rao (Jupally Rameshwar Rao) | same surname + citizenship — unresearched |
| nadir-godrej (Nadir Godrej) | adi-godrej (Adi Godrej) | same surname + citizenship — unresearched |
| najib-mikati (Najib Mikati) | taha-mikati (Taha Mikati) | same surname + citizenship — unresearched |
| spiro-latsis (Spiro Latsis & family) | marianna-latsis (Marianna Latsis & family) | same surname + citizenship — unresearched |
| otto-philipp-braun (Otto Philipp Braun) | anna-maria-braun (Anna Maria Braun) | same surname + citizenship — unresearched |
| otto-philipp-braun (Otto Philipp Braun) | johanna-braun (Johanna Braun) | same surname + citizenship — unresearched |
| otto-philipp-braun (Otto Philipp Braun) | karl-friedrich-braun (Karl Friedrich Braun) | same surname + citizenship — unresearched |
| otto-philipp-braun (Otto Philipp Braun) | ludwig-theodor-braun (Ludwig Theodor Braun) | same surname + citizenship — unresearched |
| sanjiv-goenka (Sanjiv Goenka) | harsh-goenka (Harsh Goenka) | same surname + citizenship — unresearched |
| thomas-james (Thomas James) | lebron-james (LeBron James) | same surname + citizenship — unresearched |
| liu-wei-2 (Liu Wei) | fang-wei (Fang Wei) | same surname + citizenship — unresearched |
| liu-wei-2 (Liu Wei) | dong-wei-2 (Dong Wei) | same surname + citizenship — unresearched |
| liu-wei-2 (Liu Wei) | gu-wei (Gu Wei) | same surname + citizenship — unresearched |
| liu-wei-2 (Liu Wei) | zheng-wei (Zheng Wei) | same surname + citizenship — unresearched |
| liu-wei-2 (Liu Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| han-tao (Han Tao) | zhang-tao (Zhang Tao) | same surname + citizenship — unresearched |
| duke-reyes (Duke Reyes) | james-reyes (James Reyes) | same surname + citizenship — unresearched |
| duke-reyes (Duke Reyes) | thomas-reyes (Thomas Reyes) | same surname + citizenship — unresearched |
| alejandro-santo-domingo (Alejandro Santo Domingo) | andres-santo-domingo (Andres Santo Domingo) | same surname + citizenship — unresearched |
| barry-zekelman (Barry Zekelman) | clayton-zekelman (Clayton Zekelman) | same surname + citizenship — unresearched |
| barry-zekelman (Barry Zekelman) | alan-zekelman (Alan Zekelman) | same surname + citizenship — unresearched |
| zhou-jianping (Zhou Jianping) | lai-jianping (Lai Jianping) | same surname + citizenship — unresearched |
| carlos-march-delgado (Carlos March Delgado) | juan-march-delgado (Juan March Delgado) | same surname + citizenship — unresearched |
| william-stone (William Stone) | matt-stone (Matt Stone) | same surname + citizenship — unresearched |
| yu-hao-1 (Yu Hao) | peng-hao (Peng Hao) | same surname + citizenship — unresearched |
| martin-bouygues-1 (Martin Bouygues) | olivier-bouygues (Olivier Bouygues) | same surname + citizenship — unresearched |
| frank-fertitta-iii (Frank Fertitta III) | lorenzo-fertitta (Lorenzo Fertitta) | same surname + citizenship — unresearched |
| james-packer (James Packer) | gretel-packer (Gretel Packer) | same surname + citizenship — unresearched |
| vinod-rai-gupta (Vinod Rai Gupta) | saroj-rani-gupta (Saroj Rani Gupta) | same surname + citizenship — unresearched |
| vinod-rai-gupta (Vinod Rai Gupta) | surjit-kumar-gupta (Surjit Kumar Gupta) | same surname + citizenship — unresearched |
| vinod-rai-gupta (Vinod Rai Gupta) | anil-gupta (Anil Gupta) | same surname + citizenship — unresearched |
| vinod-rai-gupta (Vinod Rai Gupta) | nanu-gupta (Nanu Gupta) | same surname + citizenship — unresearched |
| john-fisher (John Fisher) | robert-fisher (Robert Fisher) | same surname + citizenship — unresearched |
| john-fisher (John Fisher) | william-fisher (William Fisher) | same surname + citizenship — unresearched |
| giorgio-perfetti (Giorgio Perfetti) | augusto-perfetti (Augusto Perfetti) | same surname + citizenship — unresearched |
| jose-roberto-marinho (Jose Roberto Marinho) | joao-roberto-marinho (Joao Roberto Marinho) | same surname + citizenship — unresearched |
| jose-roberto-marinho (Jose Roberto Marinho) | roberto-irineu-marinho (Roberto Irineu Marinho) | same surname + citizenship — unresearched |
| jack-gance (Jack Gance) | sam-gance (Sam Gance) | same surname + citizenship — unresearched |
| joao-roberto-marinho (Joao Roberto Marinho) | roberto-irineu-marinho (Roberto Irineu Marinho) | same surname + citizenship — unresearched |
| ankur-jain (Ankur Jain) | rajiv-jain (Rajiv Jain) | same surname + citizenship — unresearched |
| ankur-jain (Ankur Jain) | arvind-jain (Arvind Jain) | same surname + citizenship — unresearched |
| david-wertheim (David Wertheim) | drorit-wertheim (Drorit Wertheim) | same surname + citizenship — unresearched |
| qiu-wensheng (Qiu Wensheng) | cai-wensheng (Cai Wensheng) | same surname + citizenship — unresearched |
| felix-baker (Felix Baker) | julian-baker (Julian Baker) | same surname + citizenship — unresearched |
| warren-stephens (Warren Stephens) | trae-stephens (Trae Stephens) | same surname + citizenship — unresearched |
| sean-parker (Sean Parker) | trey-parker (Trey Parker) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | jonathan-kwok (Jonathan Kwok) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | adam-kwok (Adam Kwok) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | thomas-kwok (Thomas Kwok) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | christopher-kwok (Christopher Kwok) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | edward-kwok (Edward Kwok) | same surname + citizenship — unresearched |
| geoffrey-kwok (Geoffrey Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| jonathan-kwok (Jonathan Kwok) | adam-kwok (Adam Kwok) | same surname + citizenship — unresearched |
| jonathan-kwok (Jonathan Kwok) | thomas-kwok (Thomas Kwok) | same surname + citizenship — unresearched |
| jonathan-kwok (Jonathan Kwok) | christopher-kwok (Christopher Kwok) | same surname + citizenship — unresearched |
| jonathan-kwok (Jonathan Kwok) | edward-kwok (Edward Kwok) | same surname + citizenship — unresearched |
| jonathan-kwok (Jonathan Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| madhukar-parekh-1 (Madhukar Parekh) | ajay-parekh (Ajay Parekh) | same surname + citizenship — unresearched |
| madhukar-parekh-1 (Madhukar Parekh) | narendrakumar-parekh (Narendrakumar Parekh) | same surname + citizenship — unresearched |
| madhukar-parekh-1 (Madhukar Parekh) | mrudula-parekh (Mrudula Parekh) | same surname + citizenship — unresearched |
| madhukar-parekh-1 (Madhukar Parekh) | kalpana-parekh (Kalpana Parekh) | same surname + citizenship — unresearched |
| howard-butt-iii (Howard Butt III & family) | stephen-butt (Stephen Butt & family) | same surname + citizenship — unresearched |
| mark-davis-1 (Mark Davis) | henry-davis (Henry Davis) | same surname + citizenship — unresearched |
| eduard-schleicher (Eduard Schleicher) | ursula-hutter-schleicher (Ursula Hutter-Schleicher) | same surname + citizenship — unresearched |
| roberto-hartono (Roberto Hartono) | stefanus-hartono (Stefanus Hartono) | same surname + citizenship — unresearched |
| roberto-hartono (Roberto Hartono) | tessa-natalia-hartono (Tessa Natalia Hartono) | same surname + citizenship — unresearched |
| roberto-hartono (Roberto Hartono) | vanessa-hartono (Vanessa Hartono) | same surname + citizenship — unresearched |
| stefanus-hartono (Stefanus Hartono) | tessa-natalia-hartono (Tessa Natalia Hartono) | same surname + citizenship — unresearched |
| stefanus-hartono (Stefanus Hartono) | vanessa-hartono (Vanessa Hartono) | same surname + citizenship — unresearched |
| tessa-natalia-hartono (Tessa Natalia Hartono) | vanessa-hartono (Vanessa Hartono) | same surname + citizenship — unresearched |
| marc-fielmann (Marc Fielmann) | sophie-luise-fielmann (Sophie Luise Fielmann) | same surname + citizenship — unresearched |
| shiv-kishan-agrawal (Shiv Kishan Agrawal) | raamdeo-agrawal (Raamdeo Agrawal) | same surname + citizenship — unresearched |
| marina-berlusconi (Marina Berlusconi) | pier-silvio-berlusconi (Pier Silvio Berlusconi) | same surname + citizenship — unresearched |
| marina-berlusconi (Marina Berlusconi) | barbara-berlusconi (Barbara Berlusconi) | same surname + citizenship — unresearched |
| marina-berlusconi (Marina Berlusconi) | eleonora-berlusconi (Eleonora Berlusconi) | same surname + citizenship — unresearched |
| marina-berlusconi (Marina Berlusconi) | luigi-berlusconi (Luigi Berlusconi) | same surname + citizenship — unresearched |
| pier-silvio-berlusconi (Pier Silvio Berlusconi) | barbara-berlusconi (Barbara Berlusconi) | same surname + citizenship — unresearched |
| pier-silvio-berlusconi (Pier Silvio Berlusconi) | eleonora-berlusconi (Eleonora Berlusconi) | same surname + citizenship — unresearched |
| pier-silvio-berlusconi (Pier Silvio Berlusconi) | luigi-berlusconi (Luigi Berlusconi) | same surname + citizenship — unresearched |
| jay-paul (Jay Paul) | david-paul (David Paul) | same surname + citizenship — unresearched |
| ryan-smith (Ryan Smith) | michael-s-smith (Michael S. Smith) | same surname + citizenship — unresearched |
| ryan-smith (Ryan Smith) | jared-smith-1 (Jared Smith) | same surname + citizenship — unresearched |
| ryan-smith (Ryan Smith) | scott-smith-1 (Scott Smith) | same surname + citizenship — unresearched |
| ryan-smith (Ryan Smith) | rick-smith (Rick Smith) | same surname + citizenship — unresearched |
| lawrence-golub (Lawrence Golub) | david-golub (David Golub) | same surname + citizenship — unresearched |
| christian-haub (Christian Haub) | georg-haub (Georg Haub) | same surname + citizenship — unresearched |
| cui-lixin (Cui Lixin) | zhao-lixin (Zhao Lixin) | same surname + citizenship — unresearched |
| lucio-tan (Lucio Tan) | andrew-tan (Andrew Tan) | same surname + citizenship — unresearched |
| ramesh-juneja (Ramesh Juneja) | rajeev-juneja (Rajeev Juneja) | same surname + citizenship — unresearched |
| alexandr-wang (Alexandr Wang) | roger-wang (Roger Wang) | same surname + citizenship — unresearched |
| alexandr-wang (Alexandr Wang) | walter-wang-1 (Walter Wang) | same surname + citizenship — unresearched |
| alexandr-wang (Alexandr Wang) | shuo-wang (Shuo Wang) | same surname + citizenship — unresearched |
| alexandr-wang (Alexandr Wang) | gary-wang-1 (Gary Wang) | same surname + citizenship — unresearched |
| john-pritzker (John Pritzker) | daniel-pritzker (Daniel Pritzker) | same surname + citizenship — unresearched |
| john-pritzker (John Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| john-pritzker (John Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| john-pritzker (John Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| john-pritzker (John Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| annalisa-doris (Annalisa Doris) | massimo-doris (Massimo Doris) | same surname + citizenship — unresearched |
| daniel-pritzker (Daniel Pritzker) | jennifer-pritzker (Jennifer Pritzker) | same surname + citizenship — unresearched |
| daniel-pritzker (Daniel Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| daniel-pritzker (Daniel Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| daniel-pritzker (Daniel Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| john-tyson (John Tyson & family) | barbara-tyson (Barbara Tyson) | same surname + citizenship — unresearched |
| frank-love (Frank Love) | greg-love (Greg Love) | same surname + citizenship — unresearched |
| frank-love (Frank Love) | laura-love (Laura Love) | same surname + citizenship — unresearched |
| greg-love (Greg Love) | laura-love (Laura Love) | same surname + citizenship — unresearched |
| adam-kwok (Adam Kwok) | thomas-kwok (Thomas Kwok) | same surname + citizenship — unresearched |
| adam-kwok (Adam Kwok) | christopher-kwok (Christopher Kwok) | same surname + citizenship — unresearched |
| adam-kwok (Adam Kwok) | edward-kwok (Edward Kwok) | same surname + citizenship — unresearched |
| adam-kwok (Adam Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| gerald-ford (Gerald Ford) | tom-ford-1 (Tom Ford) | same surname + citizenship — unresearched |
| fabian-hedin (Fabian Hedin) | karl-hedin (Karl Hedin) | same surname + citizenship — unresearched |
| lin-jianhua (Lin Jianhua) | ren-jianhua (Ren Jianhua) | same surname + citizenship — unresearched |
| jiang-weiping (Jiang Weiping & family) | liu-weiping (Liu Weiping) | same surname + citizenship — unresearched |
| maja-oeri (Maja Oeri) | melchior-oeri (Melchior Oeri) | same surname + citizenship — unresearched |
| edward-bass (Edward Bass) | lee-bass (Lee Bass) | same surname + citizenship — unresearched |
| park-hyeon-joo (Park Hyeon-joo) | hwang-chul-joo (Hwang Chul-joo) | same surname + citizenship — unresearched |
| park-hyeon-joo (Park Hyeon-joo) | shin-dong-joo (Shin Dong-joo) | same surname + citizenship — unresearched |
| fang-wei (Fang Wei) | dong-wei-2 (Dong Wei) | same surname + citizenship — unresearched |
| fang-wei (Fang Wei) | gu-wei (Gu Wei) | same surname + citizenship — unresearched |
| fang-wei (Fang Wei) | zheng-wei (Zheng Wei) | same surname + citizenship — unresearched |
| fang-wei (Fang Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| michael-s-smith (Michael S. Smith) | jared-smith-1 (Jared Smith) | same surname + citizenship — unresearched |
| michael-s-smith (Michael S. Smith) | scott-smith-1 (Scott Smith) | same surname + citizenship — unresearched |
| michael-s-smith (Michael S. Smith) | rick-smith (Rick Smith) | same surname + citizenship — unresearched |
| lin-ming-hsiung (Lin Ming-hsiung) | chao-teng-hsiung (Chao Teng-hsiung) | same surname + citizenship — unresearched |
| robert-sands (Robert Sands) | richard-sands (Richard Sands) | same surname + citizenship — unresearched |
| jurgen-wirtgen (Jurgen Wirtgen) | stefan-wirtgen (Stefan Wirtgen) | same surname + citizenship — unresearched |
| scott-lin (Scott Lin) | chris-lin (Chris Lin) | same surname + citizenship — unresearched |
| j-hyatt-brown (J. Hyatt Brown) | greg-brown (Greg Brown) | same surname + citizenship — unresearched |
| cristiano-crippa (Cristiano Crippa) | roberto-crippa (Roberto Crippa) | same surname + citizenship — unresearched |
| cristiano-crippa (Cristiano Crippa) | monica-crippa-1 (Monica Crippa) | same surname + citizenship — unresearched |
| roberto-crippa (Roberto Crippa) | monica-crippa-1 (Monica Crippa) | same surname + citizenship — unresearched |
| firoz-mistry (Firoz Mistry) | zahan-mistry (Zahan Mistry) | same surname + citizenship — unresearched |
| jonathan-tisch (Jonathan Tisch) | laurie-tisch (Laurie Tisch) | same surname + citizenship — unresearched |
| jonathan-tisch (Jonathan Tisch) | steven-tisch (Steven Tisch) | same surname + citizenship — unresearched |
| jonathan-tisch (Jonathan Tisch) | james-tisch (James Tisch) | same surname + citizenship — unresearched |
| jonathan-tisch (Jonathan Tisch) | andrew-tisch (Andrew Tisch) | same surname + citizenship — unresearched |
| wu-guangming (Wu Guangming) | fu-guangming (Fu Guangming & family) | same surname + citizenship — unresearched |
| wu-guangming (Wu Guangming) | xiang-guangming (Xiang Guangming & family) | same surname + citizenship — unresearched |
| glen-taylor (Glen Taylor) | bret-taylor (Bret Taylor) | same surname + citizenship — unresearched |
| glen-taylor (Glen Taylor) | terry-taylor (Terry Taylor) | same surname + citizenship — unresearched |
| rajiv-jain (Rajiv Jain) | arvind-jain (Arvind Jain) | same surname + citizenship — unresearched |
| luca-garavoglia (Luca Garavoglia) | alessandra-garavoglia (Alessandra Garavoglia) | same surname + citizenship — unresearched |
| mario-germano-giuliani (Mario Germano Giuliani) | giammaria-giuliani (Giammaria Giuliani) | same surname + citizenship — unresearched |
| jennifer-pritzker (Jennifer Pritzker) | matthew-pritzker (Matthew Pritzker) | same surname + citizenship — unresearched |
| jennifer-pritzker (Jennifer Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| jennifer-pritzker (Jennifer Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| msatyanarayana-reddy (M.Satyanarayana Reddy) | pv-krishna-reddy (P.V. Krishna Reddy) | same surname + citizenship — unresearched |
| msatyanarayana-reddy (M.Satyanarayana Reddy) | pp-reddy (P.P. Reddy) | same surname + citizenship — unresearched |
| msatyanarayana-reddy (M.Satyanarayana Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| manohar-lal-agarwal (Manohar Lal Agarwal) | anju-agarwal (Anju Agarwal) | same surname + citizenship — unresearched |
| manohar-lal-agarwal (Manohar Lal Agarwal) | madhusudan-agarwal (Madhusudan Agarwal) | same surname + citizenship — unresearched |
| manohar-lal-agarwal (Manohar Lal Agarwal) | sanjay-agarwal (Sanjay Agarwal) | same surname + citizenship — unresearched |
| manohar-lal-agarwal (Manohar Lal Agarwal) | sachin-agarwal (Sachin Agarwal) | same surname + citizenship — unresearched |
| ferit-faik-sahenk (Ferit Faik Sahenk) | filiz-sahenk (Filiz Sahenk) | same surname + citizenship — unresearched |
| ferit-faik-sahenk (Ferit Faik Sahenk) | deniz-sahenk (Deniz Sahenk) | same surname + citizenship — unresearched |
| georgi-domuschiev (Georgi Domuschiev) | kiril-domuschiev (Kiril Domuschiev) | same surname + citizenship — unresearched |
| wu-xiangdong (Wu Xiangdong) | xue-xiangdong (Xue Xiangdong & family) | same surname + citizenship — unresearched |
| xue-hua (Xue Hua) | chen-hua-1 (Chen Hua & family) | same surname + citizenship — unresearched |
| xue-hua (Xue Hua) | su-hua (Su Hua) | same surname + citizenship — unresearched |
| selcuk-bayraktar (Selçuk Bayraktar) | haluk-bayraktar (Haluk Bayraktar) | same surname + citizenship — unresearched |
| arne-alexander-wilhelmsen (Arne Alexander Wilhelmsen) | bent-wilhelmsen (Bent Wilhelmsen) | same surname + citizenship — unresearched |
| arne-alexander-wilhelmsen (Arne Alexander Wilhelmsen) | peter-preben-wilhelmsen (Peter Preben Wilhelmsen) | same surname + citizenship — unresearched |
| bent-wilhelmsen (Bent Wilhelmsen) | peter-preben-wilhelmsen (Peter Preben Wilhelmsen) | same surname + citizenship — unresearched |
| chen-hua-1 (Chen Hua & family) | su-hua (Su Hua) | same surname + citizenship — unresearched |
| yoo-jung-hyun (Yoo Jung-hyun) | lee-jay-hyun (Lee Jay-hyun) | same surname + citizenship — unresearched |
| satish-mehta (Satish Mehta) | deepak-mehta (Deepak Mehta) | same surname + citizenship — unresearched |
| satish-mehta (Satish Mehta) | kirtikumar-mehta (Kirtikumar Mehta) | same surname + citizenship — unresearched |
| albert-chao (Albert Chao & family) | james-chao (James Chao & family) | same surname + citizenship — unresearched |
| albert-chao (Albert Chao & family) | yu-de-chao (Yu De-Chao) | same surname + citizenship — unresearched |
| james-chao (James Chao & family) | yu-de-chao (Yu De-Chao) | same surname + citizenship — unresearched |
| tang-yiu (Tang Yiu) | chu-lam-yiu (Chu Lam Yiu) | same surname + citizenship — unresearched |
| jane-lauder (Jane Lauder) | william-lauder (William Lauder) | same surname + citizenship — unresearched |
| jane-lauder (Jane Lauder) | aerin-lauder (Aerin Lauder) | same surname + citizenship — unresearched |
| scott-wu (Scott Wu) | ingrid-wu (Ingrid Wu) | same surname + citizenship — unresearched |
| gurbachan-singh-dhingra (Gurbachan Singh Dhingra) | kuldip-singh-dhingra (Kuldip Singh Dhingra) | same surname + citizenship — unresearched |
| roger-wang (Roger Wang) | walter-wang-1 (Walter Wang) | same surname + citizenship — unresearched |
| roger-wang (Roger Wang) | shuo-wang (Shuo Wang) | same surname + citizenship — unresearched |
| roger-wang (Roger Wang) | gary-wang-1 (Gary Wang) | same surname + citizenship — unresearched |
| filiz-sahenk (Filiz Sahenk) | deniz-sahenk (Deniz Sahenk) | same surname + citizenship — unresearched |
| timm-oberwelland (Timm Oberwelland) | axel-oberwelland (Axel Oberwelland & family) | same surname + citizenship — unresearched |
| hong-feng (Hong Feng) | liang-feng (Liang Feng) | same surname + citizenship — unresearched |
| madeleine-grogg (Madeleine Grogg) | daniela-grogg (Daniela Grogg) | same surname + citizenship — unresearched |
| luo-liguo (Luo Liguo & family) | zhang-liguo (Zhang Liguo) | same surname + citizenship — unresearched |
| thomas-kwok (Thomas Kwok) | christopher-kwok (Christopher Kwok) | same surname + citizenship — unresearched |
| thomas-kwok (Thomas Kwok) | edward-kwok (Edward Kwok) | same surname + citizenship — unresearched |
| thomas-kwok (Thomas Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| yusuf-hamied (Yusuf Hamied) | mustafa-hamied (Mustafa Hamied) | same surname + citizenship — unresearched |
| bret-taylor (Bret Taylor) | terry-taylor (Terry Taylor) | same surname + citizenship — unresearched |
| katharina-andresen (Katharina Andresen) | alexandra-andresen (Alexandra Andresen) | same surname + citizenship — unresearched |
| zhang-li (Zhang Li) | david-xueling-li (David Xueling Li) | same surname + citizenship — unresearched |
| zhang-li (Zhang Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| martin-knauf (Martin Knauf) | christiane-knauf (Christiane Knauf) | same surname + citizenship — unresearched |
| martin-knauf (Martin Knauf) | christine-knauf (Christine Knauf) | same surname + citizenship — unresearched |
| martin-knauf (Martin Knauf) | karl-knauf (Karl Knauf) | same surname + citizenship — unresearched |
| martin-knauf (Martin Knauf) | alexander-knauf (Alexander Knauf) | same surname + citizenship — unresearched |
| martin-knauf (Martin Knauf) | robert-knauf (Robert Knauf & family) | same surname + citizenship — unresearched |
| daniel-rocher (Daniel Rocher) | bris-rocher (Bris Rocher) | same surname + citizenship — unresearched |
| keith-bentley (Keith Bentley & family) | barry-bentley (Barry Bentley & family) | same surname + citizenship — unresearched |
| keith-bentley (Keith Bentley & family) | gregory-bentley (Gregory Bentley & family) | same surname + citizenship — unresearched |
| keith-bentley (Keith Bentley & family) | raymond-bentley (Raymond Bentley & family) | same surname + citizenship — unresearched |
| huijiao-yu (Huijiao Yu) | michael-minhong-yu (Michael Minhong Yu) | same surname + citizenship — unresearched |
| andreas-pohl (Andreas Pohl) | reinfried-pohl-jr (Reinfried Pohl Jr) | same surname + citizenship — unresearched |
| emad-al-muhaidib-1 (Emad Al Muhaidib) | essam-al-muhaidib-1 (Essam Al Muhaidib) | same surname + citizenship — unresearched |
| emad-al-muhaidib-1 (Emad Al Muhaidib) | sulaiman-al-muhaidib-1 (Sulaiman Al Muhaidib) | same surname + citizenship — unresearched |
| emad-al-muhaidib-1 (Emad Al Muhaidib) | ibrahim-al-muhaidib (Ibrahim Al Muhaidib) | same surname + citizenship — unresearched |
| zhang-jian (Zhang Jian) | huang-jian (Huang Jian) | same surname + citizenship — unresearched |
| zhang-jian (Zhang Jian) | chu-jian-1 (Chu Jian) | same surname + citizenship — unresearched |
| zhang-jian (Zhang Jian) | zhou-jian-1 (Zhou Jian) | same surname + citizenship — unresearched |
| zhang-jian (Zhang Jian) | zhou-jian-3 (Zhou Jian) | same surname + citizenship — unresearched |
| pavan-jain (Pavan Jain) | anurang-jain-1 (Anurang Jain) | same surname + citizenship — unresearched |
| pavan-jain (Pavan Jain) | kishore-jain (Kishore Jain) | same surname + citizenship — unresearched |
| pavan-jain (Pavan Jain) | kiran-kumar-jain (Kiran Kumar Jain) | same surname + citizenship — unresearched |
| pavan-jain (Pavan Jain) | naresh-jain (Naresh Jain) | same surname + citizenship — unresearched |
| wei-yin-chun (Wei Yin-Chun) | lin-por-chun (Lin Por-Chun) | same surname + citizenship — unresearched |
| peter-leibinger (Peter Leibinger) | regine-leibinger (Regine Leibinger) | same surname + citizenship — unresearched |
| helena-dassault (Helena Dassault) | remi-dassault (Remi Dassault) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | duncan-macmillan (Duncan MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | cargill-macmillan-iii (Cargill MacMillan III) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | john-macmillan-1 (John MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | martha-macmillan (Martha MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | william-macmillan (William MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| sarah-macmillan (Sarah MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| george-alexander-muthoot (George Alexander Muthoot) | george-jacob-muthoot (George Jacob Muthoot) | same surname + citizenship — unresearched |
| george-alexander-muthoot (George Alexander Muthoot) | george-thomas-muthoot (George Thomas Muthoot) | same surname + citizenship — unresearched |
| george-alexander-muthoot (George Alexander Muthoot) | sara-george-muthoot (Sara George Muthoot) | same surname + citizenship — unresearched |
| george-jacob-muthoot (George Jacob Muthoot) | george-thomas-muthoot (George Thomas Muthoot) | same surname + citizenship — unresearched |
| george-jacob-muthoot (George Jacob Muthoot) | sara-george-muthoot (Sara George Muthoot) | same surname + citizenship — unresearched |
| george-thomas-muthoot (George Thomas Muthoot) | sara-george-muthoot (Sara George Muthoot) | same surname + citizenship — unresearched |
| cho-hyun-joon (Cho Hyun-joon) | chung-mong-joon (Chung Mong-joon) | same surname + citizenship — unresearched |
| ajay-parekh (Ajay Parekh) | narendrakumar-parekh (Narendrakumar Parekh) | same surname + citizenship — unresearched |
| ajay-parekh (Ajay Parekh) | mrudula-parekh (Mrudula Parekh) | same surname + citizenship — unresearched |
| ajay-parekh (Ajay Parekh) | kalpana-parekh (Kalpana Parekh) | same surname + citizenship — unresearched |
| matthew-pritzker (Matthew Pritzker) | linda-pritzker (Linda Pritzker) | same surname + citizenship — unresearched |
| matthew-pritzker (Matthew Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| ryan-horton (Ryan Horton) | reagan-horton (Reagan Horton) | same surname + citizenship — unresearched |
| ryan-horton (Ryan Horton) | marty-horton (Marty Horton) | same surname + citizenship — unresearched |
| edwin-leong (Edwin Leong) | angela-leong (Angela Leong) | same surname + citizenship — unresearched |
| bahaa-hariri (Bahaa Hariri) | ayman-hariri (Ayman Hariri) | same surname + citizenship — unresearched |
| bahaa-hariri (Bahaa Hariri) | fahed-hariri (Fahed Hariri) | same surname + citizenship — unresearched |
| reagan-horton (Reagan Horton) | marty-horton (Marty Horton) | same surname + citizenship — unresearched |
| narendrakumar-parekh (Narendrakumar Parekh) | mrudula-parekh (Mrudula Parekh) | same surname + citizenship — unresearched |
| narendrakumar-parekh (Narendrakumar Parekh) | kalpana-parekh (Kalpana Parekh) | same surname + citizenship — unresearched |
| essam-al-muhaidib-1 (Essam Al Muhaidib) | sulaiman-al-muhaidib-1 (Sulaiman Al Muhaidib) | same surname + citizenship — unresearched |
| essam-al-muhaidib-1 (Essam Al Muhaidib) | ibrahim-al-muhaidib (Ibrahim Al Muhaidib) | same surname + citizenship — unresearched |
| sulaiman-al-muhaidib-1 (Sulaiman Al Muhaidib) | ibrahim-al-muhaidib (Ibrahim Al Muhaidib) | same surname + citizenship — unresearched |
| constantinos-martinos (Constantinos Martinos & family) | athanasios-martinos (Athanasios Martinos & family) | same surname + citizenship — unresearched |
| inder-jaisinghani-1 (Inder Jaisinghani) | ramesh-jaisinghani (Ramesh Jaisinghani) | same surname + citizenship — unresearched |
| inder-jaisinghani-1 (Inder Jaisinghani) | ajay-jaisinghani (Ajay Jaisinghani) | same surname + citizenship — unresearched |
| inder-jaisinghani-1 (Inder Jaisinghani) | girdhari-jaisinghani (Girdhari Jaisinghani) | same surname + citizenship — unresearched |
| clayton-zekelman (Clayton Zekelman) | alan-zekelman (Alan Zekelman) | same surname + citizenship — unresearched |
| catherine-phillips (Catherine Phillips) | john-phillips (John Phillips) | same surname + citizenship — unresearched |
| alfred-west-jr (Alfred West Jr) | kanye-west (Kanye West) | same surname + citizenship — unresearched |
| wee-ee-lim (Wee Ee Lim) | peter-lim (Peter Lim) | same surname + citizenship — unresearched |
| wee-ee-lim (Wee Ee Lim) | john-lim (John Lim) | same surname + citizenship — unresearched |
| chung-yong-jin (Chung Yong-jin) | lee-hae-jin (Lee Hae-jin) | same surname + citizenship — unresearched |
| chung-yong-jin (Chung Yong-jin) | lee-ho-jin (Lee Ho-jin) | same surname + citizenship — unresearched |
| chung-yong-jin (Chung Yong-jin) | kim-taek-jin (Kim Taek-jin) | same surname + citizenship — unresearched |
| chung-yong-jin (Chung Yong-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| christiane-knauf (Christiane Knauf) | christine-knauf (Christine Knauf) | same surname + citizenship — unresearched |
| christiane-knauf (Christiane Knauf) | karl-knauf (Karl Knauf) | same surname + citizenship — unresearched |
| christiane-knauf (Christiane Knauf) | alexander-knauf (Alexander Knauf) | same surname + citizenship — unresearched |
| christiane-knauf (Christiane Knauf) | robert-knauf (Robert Knauf & family) | same surname + citizenship — unresearched |
| christine-knauf (Christine Knauf) | karl-knauf (Karl Knauf) | same surname + citizenship — unresearched |
| christine-knauf (Christine Knauf) | alexander-knauf (Alexander Knauf) | same surname + citizenship — unresearched |
| christine-knauf (Christine Knauf) | robert-knauf (Robert Knauf & family) | same surname + citizenship — unresearched |
| karl-knauf (Karl Knauf) | alexander-knauf (Alexander Knauf) | same surname + citizenship — unresearched |
| karl-knauf (Karl Knauf) | robert-knauf (Robert Knauf & family) | same surname + citizenship — unresearched |
| anurang-jain-1 (Anurang Jain) | kishore-jain (Kishore Jain) | same surname + citizenship — unresearched |
| anurang-jain-1 (Anurang Jain) | kiran-kumar-jain (Kiran Kumar Jain) | same surname + citizenship — unresearched |
| anurang-jain-1 (Anurang Jain) | naresh-jain (Naresh Jain) | same surname + citizenship — unresearched |
| enrique-coppel-luken (Enrique Coppel Luken) | ruben-coppel-luken (Rubén Coppel Luken) | same surname + citizenship — unresearched |
| enrique-coppel-luken (Enrique Coppel Luken) | alberto-coppel-luken (Alberto Coppel Luken) | same surname + citizenship — unresearched |
| enrique-coppel-luken (Enrique Coppel Luken) | jose-coppel-luken (José Coppel Luken) | same surname + citizenship — unresearched |
| enrique-coppel-luken (Enrique Coppel Luken) | agustin-coppel-luken (Agustín Coppel Luken) | same surname + citizenship — unresearched |
| linda-pritzker (Linda Pritzker) | nicholas-pritzker (Nicholas Pritzker) | same surname + citizenship — unresearched |
| ramesh-jaisinghani (Ramesh Jaisinghani) | ajay-jaisinghani (Ajay Jaisinghani) | same surname + citizenship — unresearched |
| ramesh-jaisinghani (Ramesh Jaisinghani) | girdhari-jaisinghani (Girdhari Jaisinghani) | same surname + citizenship — unresearched |
| masaaki-arai (Masaaki Arai) | ryuji-arai (Ryuji Arai) | same surname + citizenship — unresearched |
| ajay-jaisinghani (Ajay Jaisinghani) | girdhari-jaisinghani (Girdhari Jaisinghani) | same surname + citizenship — unresearched |
| naomi-azrieli (Naomi Azrieli) | sharon-azrieli (Sharon Azrieli) | same surname + citizenship — unresearched |
| john-de-mol (John de Mol) | adriaan-mol (Adriaan Mol) | same surname + citizenship — unresearched |
| kishore-jain (Kishore Jain) | kiran-kumar-jain (Kiran Kumar Jain) | same surname + citizenship — unresearched |
| kishore-jain (Kishore Jain) | naresh-jain (Naresh Jain) | same surname + citizenship — unresearched |
| basudeo-singh (Basudeo Singh) | analjit-singh (Analjit Singh) | same surname + citizenship — unresearched |
| dong-wei-2 (Dong Wei) | gu-wei (Gu Wei) | same surname + citizenship — unresearched |
| dong-wei-2 (Dong Wei) | zheng-wei (Zheng Wei) | same surname + citizenship — unresearched |
| dong-wei-2 (Dong Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| walter-wang-1 (Walter Wang) | shuo-wang (Shuo Wang) | same surname + citizenship — unresearched |
| walter-wang-1 (Walter Wang) | gary-wang-1 (Gary Wang) | same surname + citizenship — unresearched |
| christian-birkenstock (Christian Birkenstock) | alex-birkenstock (Alex Birkenstock) | same surname + citizenship — unresearched |
| laurie-tisch (Laurie Tisch) | steven-tisch (Steven Tisch) | same surname + citizenship — unresearched |
| laurie-tisch (Laurie Tisch) | james-tisch (James Tisch) | same surname + citizenship — unresearched |
| laurie-tisch (Laurie Tisch) | andrew-tisch (Andrew Tisch) | same surname + citizenship — unresearched |
| steven-tisch (Steven Tisch) | james-tisch (James Tisch) | same surname + citizenship — unresearched |
| steven-tisch (Steven Tisch) | andrew-tisch (Andrew Tisch) | same surname + citizenship — unresearched |
| heikki-herlin (Heikki Herlin) | ilkka-herlin (Ilkka Herlin) | same surname + citizenship — unresearched |
| heikki-herlin (Heikki Herlin) | ilona-herlin (Ilona Herlin) | same surname + citizenship — unresearched |
| gerda-tschira (Gerda Tschira) | harald-tschira (Harald Tschira) | same surname + citizenship — unresearched |
| gerda-tschira (Gerda Tschira) | udo-tschira (Udo Tschira) | same surname + citizenship — unresearched |
| harald-tschira (Harald Tschira) | udo-tschira (Udo Tschira) | same surname + citizenship — unresearched |
| zhang-fan (Zhang Fan) | dong-fan (Dong Fan) | same surname + citizenship — unresearched |
| henry-sy-jr (Henry Sy Jr) | hans-sy (Hans Sy) | same surname + citizenship — unresearched |
| henry-sy-jr (Henry Sy Jr) | herbert-sy (Herbert Sy) | same surname + citizenship — unresearched |
| henry-sy-jr (Henry Sy Jr) | harley-sy (Harley Sy) | same surname + citizenship — unresearched |
| henry-sy-jr (Henry Sy Jr) | elizabeth-sy (Elizabeth Sy) | same surname + citizenship — unresearched |
| karl-johan-persson (Karl-Johan Persson) | markus-persson (Markus Persson) | same surname + citizenship — unresearched |
| dragos-paval (Dragos Paval) | adrian-paval (Adrian Paval) | same surname + citizenship — unresearched |
| ilkka-herlin (Ilkka Herlin) | ilona-herlin (Ilona Herlin) | same surname + citizenship — unresearched |
| shuo-wang (Shuo Wang) | gary-wang-1 (Gary Wang) | same surname + citizenship — unresearched |
| barry-bentley (Barry Bentley & family) | gregory-bentley (Gregory Bentley & family) | same surname + citizenship — unresearched |
| barry-bentley (Barry Bentley & family) | raymond-bentley (Raymond Bentley & family) | same surname + citizenship — unresearched |
| dan-wilks (Dan Wilks) | farris-wilks (Farris Wilks) | same surname + citizenship — unresearched |
| bhadresh-shah (Bhadresh Shah) | sanjeev-shah (Sanjeev Shah) | same surname + citizenship — unresearched |
| tony-chen (Tony Chen) | samuel-chen (Samuel Chen) | same surname + citizenship — unresearched |
| tony-chen (Tony Chen) | warren-chen (Warren Chen) | same surname + citizenship — unresearched |
| alan-wilson (Alan Wilson) | bruce-wilson (Bruce Wilson) | same surname + citizenship — unresearched |
| alan-wilson (Alan Wilson) | john-wilson (John Wilson) | same surname + citizenship — unresearched |
| bruce-wilson (Bruce Wilson) | john-wilson (John Wilson) | same surname + citizenship — unresearched |
| bill-gross (Bill Gross) | sue-gross (Sue Gross) | same surname + citizenship — unresearched |
| clark-hunt (Clark Hunt & family) | daniel-hunt (Daniel Hunt & family) | same surname + citizenship — unresearched |
| clark-hunt (Clark Hunt & family) | lamar-hunt-jr (Lamar Hunt Jr & family) | same surname + citizenship — unresearched |
| clark-hunt (Clark Hunt & family) | sharron-hunt (Sharron Hunt & family) | same surname + citizenship — unresearched |
| daniel-hunt (Daniel Hunt & family) | lamar-hunt-jr (Lamar Hunt Jr & family) | same surname + citizenship — unresearched |
| daniel-hunt (Daniel Hunt & family) | sharron-hunt (Sharron Hunt & family) | same surname + citizenship — unresearched |
| lamar-hunt-jr (Lamar Hunt Jr & family) | sharron-hunt (Sharron Hunt & family) | same surname + citizenship — unresearched |
| christopher-kwok (Christopher Kwok) | edward-kwok (Edward Kwok) | same surname + citizenship — unresearched |
| christopher-kwok (Christopher Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| edward-kwok (Edward Kwok) | raymond-kwok (Raymond Kwok) | same surname + citizenship — unresearched |
| joe-rogers-jr (Joe Rogers Jr) | hartley-rogers (Hartley Rogers) | same surname + citizenship — unresearched |
| vivek-chand-burman (Vivek Chand Burman) | anand-burman-1 (Anand Burman) | same surname + citizenship — unresearched |
| mrudula-parekh (Mrudula Parekh) | kalpana-parekh (Kalpana Parekh) | same surname + citizenship — unresearched |
| pv-krishna-reddy (P.V. Krishna Reddy) | pp-reddy (P.P. Reddy) | same surname + citizenship — unresearched |
| pv-krishna-reddy (P.V. Krishna Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| anju-agarwal (Anju Agarwal) | madhusudan-agarwal (Madhusudan Agarwal) | same surname + citizenship — unresearched |
| anju-agarwal (Anju Agarwal) | sanjay-agarwal (Sanjay Agarwal) | same surname + citizenship — unresearched |
| anju-agarwal (Anju Agarwal) | sachin-agarwal (Sachin Agarwal) | same surname + citizenship — unresearched |
| ruslan-rahimkulov (Ruslan Rahimkulov) | timur-rahimkulov (Timur Rahimkulov) | same surname + citizenship — unresearched |
| willis-johnson (Willis Johnson) | magic-johnson (Magic Johnson) | same surname + citizenship — unresearched |
| willis-johnson (Willis Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| willis-johnson (Willis Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| william-koch (William Koch) | jim-koch (Jim Koch) | same surname + citizenship — unresearched |
| tom-persson (Tom Persson) | markus-persson (Markus Persson) | same surname + citizenship — unresearched |
| david-xueling-li (David Xueling Li) | jet-jie-li (Jet Jie Li) | same surname + citizenship — unresearched |
| bernhard-braun-luedicke (Bernhard Braun-Luedicke) | eva-maria-braun-luedicke (Eva Maria Braun-Luedicke) | same surname + citizenship — unresearched |
| bernhard-braun-luedicke (Bernhard Braun-Luedicke) | friederike-braun-luedicke (Friederike Braun-Luedicke) | same surname + citizenship — unresearched |
| eva-maria-braun-luedicke (Eva Maria Braun-Luedicke) | friederike-braun-luedicke (Friederike Braun-Luedicke) | same surname + citizenship — unresearched |
| airat-shaimiev (Airat Shaimiev) | radik-shaimiev (Radik Shaimiev) | same surname + citizenship — unresearched |
| hong-jie (Hong Jie) | tang-jie (Tang Jie) | same surname + citizenship — unresearched |
| gideon-hamburger (Gideon Hamburger) | yair-hamburger (Yair Hamburger) | same surname + citizenship — unresearched |
| james-tisch (James Tisch) | andrew-tisch (Andrew Tisch) | same surname + citizenship — unresearched |
| barbara-berlusconi (Barbara Berlusconi) | eleonora-berlusconi (Eleonora Berlusconi) | same surname + citizenship — unresearched |
| barbara-berlusconi (Barbara Berlusconi) | luigi-berlusconi (Luigi Berlusconi) | same surname + citizenship — unresearched |
| eleonora-berlusconi (Eleonora Berlusconi) | luigi-berlusconi (Luigi Berlusconi) | same surname + citizenship — unresearched |
| pp-reddy (P.P. Reddy) | satish-reddy (Satish Reddy) | same surname + citizenship — unresearched |
| alberto-prada (Alberto Prada) | marina-prada (Marina Prada) | same surname + citizenship — unresearched |
| gene-lee (Gene Lee) | paul-lee-1 (Paul Lee) | same surname + citizenship — unresearched |
| masateru-uno (Masateru Uno & family) | yasuhide-uno (Yasuhide Uno) | same surname + citizenship — unresearched |
| pawan-munjal-1 (Pawan Munjal) | suman-munjal (Suman Munjal) | same surname + citizenship — unresearched |
| pawan-munjal-1 (Pawan Munjal) | renu-munjal (Renu Munjal) | same surname + citizenship — unresearched |
| saroj-rani-gupta (Saroj Rani Gupta) | surjit-kumar-gupta (Surjit Kumar Gupta) | same surname + citizenship — unresearched |
| saroj-rani-gupta (Saroj Rani Gupta) | anil-gupta (Anil Gupta) | same surname + citizenship — unresearched |
| saroj-rani-gupta (Saroj Rani Gupta) | nanu-gupta (Nanu Gupta) | same surname + citizenship — unresearched |
| dominika-kulczyk (Dominika Kulczyk) | sebastian-kulczyk (Sebastian Kulczyk) | same surname + citizenship — unresearched |
| vijay-shekhar-sharma (Vijay Shekhar Sharma) | rajesh-sharma (Rajesh Sharma) | same surname + citizenship — unresearched |
| ginia-rinehart (Ginia Rinehart) | bianca-rinehart (Bianca Rinehart) | same surname + citizenship — unresearched |
| alfred-oetker (Alfred Oetker) | carl-ferdinand-oetker (Carl Ferdinand Oetker) | same surname + citizenship — unresearched |
| alfred-oetker (Alfred Oetker) | julia-oetker (Julia Oetker) | same surname + citizenship — unresearched |
| carl-ferdinand-oetker (Carl Ferdinand Oetker) | julia-oetker (Julia Oetker) | same surname + citizenship — unresearched |
| carlie-irsay-gordon (Carlie Irsay-Gordon) | mike-gordon-1 (Mike Gordon) | same surname + citizenship — unresearched |
| kalen-jackson (Kalen Jackson) | rick-jackson (Rick Jackson) | same surname + citizenship — unresearched |
| girdhari-lal-bawri (Girdhari Lal Bawri) | banwari-lal-bawri (Banwari Lal Bawri) | same surname + citizenship — unresearched |
| barbara-benetton (Barbara Benetton) | leone-benetton (Leone Benetton) | same surname + citizenship — unresearched |
| olivia-holding-1 (Olivia Holding) | frank-holding-jr (Frank Holding Jr) | same surname + citizenship — unresearched |
| ashwin-desai (Ashwin Desai) | chaitanya-desai (Chaitanya Desai) | same surname + citizenship — unresearched |
| ashwin-desai (Ashwin Desai) | kushal-desai (Kushal Desai) | same surname + citizenship — unresearched |
| annika-bootsman-kleberg (Annika Bootsman Kleberg) | jonas-kleberg (Jonas Kleberg) | same surname + citizenship — unresearched |
| zhou-xiaoping-1 (Zhou Xiaoping) | ye-xiaoping (Ye Xiaoping) | same surname + citizenship — unresearched |
| lillian-teh-li-ming (Lillian Teh Li Ming) | koon-poh-ming (Koon Poh Ming) | same surname + citizenship — unresearched |
| youssef-mansour (Youssef Mansour) | yasseen-mansour (Yasseen Mansour) | same surname + citizenship — unresearched |
| suman-munjal (Suman Munjal) | renu-munjal (Renu Munjal) | same surname + citizenship — unresearched |
| james-reyes (James Reyes) | thomas-reyes (Thomas Reyes) | same surname + citizenship — unresearched |
| robert-fisher (Robert Fisher) | william-fisher (William Fisher) | same surname + citizenship — unresearched |
| william-lauder (William Lauder) | aerin-lauder (Aerin Lauder) | same surname + citizenship — unresearched |
| wei-huang (Wei Huang) | howard-huang (Howard Huang) | same surname + citizenship — unresearched |
| roberto-angelini-rossi (Roberto Angelini Rossi) | patricia-angelini-rossi (Patricia Angelini Rossi) | same surname + citizenship — unresearched |
| chaitanya-desai (Chaitanya Desai) | kushal-desai (Kushal Desai) | same surname + citizenship — unresearched |
| gu-wei (Gu Wei) | zheng-wei (Zheng Wei) | same surname + citizenship — unresearched |
| gu-wei (Gu Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| gregory-bentley (Gregory Bentley & family) | raymond-bentley (Raymond Bentley & family) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | cargill-macmillan-iii (Cargill MacMillan III) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | john-macmillan-1 (John MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | martha-macmillan (Martha MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | william-macmillan (William MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| duncan-macmillan (Duncan MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| ruben-coppel-luken (Rubén Coppel Luken) | alberto-coppel-luken (Alberto Coppel Luken) | same surname + citizenship — unresearched |
| ruben-coppel-luken (Rubén Coppel Luken) | jose-coppel-luken (José Coppel Luken) | same surname + citizenship — unresearched |
| ruben-coppel-luken (Rubén Coppel Luken) | agustin-coppel-luken (Agustín Coppel Luken) | same surname + citizenship — unresearched |
| tseng-cheng (Tseng Cheng) | chang-kuo-cheng (Chang Kuo-Cheng) | same surname + citizenship — unresearched |
| park-soon-jae (Park Soon-jae) | shin-chang-jae (Shin Chang-jae) | same surname + citizenship — unresearched |
| hal-steinbrenner (Hal Steinbrenner) | jessica-steinbrenner (Jessica Steinbrenner) | same surname + citizenship — unresearched |
| madhusudan-agarwal (Madhusudan Agarwal) | sanjay-agarwal (Sanjay Agarwal) | same surname + citizenship — unresearched |
| madhusudan-agarwal (Madhusudan Agarwal) | sachin-agarwal (Sachin Agarwal) | same surname + citizenship — unresearched |
| peter-lim (Peter Lim) | john-lim (John Lim) | same surname + citizenship — unresearched |
| alexander-knauf (Alexander Knauf) | robert-knauf (Robert Knauf & family) | same surname + citizenship — unresearched |
| lu-di (Lu Di) | lu-bin (Lu Bin) | same surname + citizenship — unresearched |
| lu-di (Lu Di) | zhiqiang-lu (Zhiqiang Lu) | same surname + citizenship — unresearched |
| jian-jun (Jian Jun) | dai-jun (Dai Jun) | same surname + citizenship — unresearched |
| anna-maria-braun (Anna Maria Braun) | johanna-braun (Johanna Braun) | same surname + citizenship — unresearched |
| anna-maria-braun (Anna Maria Braun) | karl-friedrich-braun (Karl Friedrich Braun) | same surname + citizenship — unresearched |
| anna-maria-braun (Anna Maria Braun) | ludwig-theodor-braun (Ludwig Theodor Braun) | same surname + citizenship — unresearched |
| johanna-braun (Johanna Braun) | karl-friedrich-braun (Karl Friedrich Braun) | same surname + citizenship — unresearched |
| johanna-braun (Johanna Braun) | ludwig-theodor-braun (Ludwig Theodor Braun) | same surname + citizenship — unresearched |
| karl-friedrich-braun (Karl Friedrich Braun) | ludwig-theodor-braun (Ludwig Theodor Braun) | same surname + citizenship — unresearched |
| kiran-kumar-jain (Kiran Kumar Jain) | naresh-jain (Naresh Jain) | same surname + citizenship — unresearched |
| alberto-coppel-luken (Alberto Coppel Luken) | jose-coppel-luken (José Coppel Luken) | same surname + citizenship — unresearched |
| alberto-coppel-luken (Alberto Coppel Luken) | agustin-coppel-luken (Agustín Coppel Luken) | same surname + citizenship — unresearched |
| jose-coppel-luken (José Coppel Luken) | agustin-coppel-luken (Agustín Coppel Luken) | same surname + citizenship — unresearched |
| surjit-kumar-gupta (Surjit Kumar Gupta) | anil-gupta (Anil Gupta) | same surname + citizenship — unresearched |
| surjit-kumar-gupta (Surjit Kumar Gupta) | nanu-gupta (Nanu Gupta) | same surname + citizenship — unresearched |
| alexander-diehl (Alexander Diehl) | carla-diehl (Carla Diehl) | same surname + citizenship — unresearched |
| alexander-diehl (Alexander Diehl) | konstantin-diehl (Konstantin Diehl) | same surname + citizenship — unresearched |
| alexander-diehl (Alexander Diehl) | laura-diehl (Laura Diehl) | same surname + citizenship — unresearched |
| alexander-diehl (Alexander Diehl) | markus-diehl (Markus Diehl) | same surname + citizenship — unresearched |
| carla-diehl (Carla Diehl) | konstantin-diehl (Konstantin Diehl) | same surname + citizenship — unresearched |
| carla-diehl (Carla Diehl) | laura-diehl (Laura Diehl) | same surname + citizenship — unresearched |
| carla-diehl (Carla Diehl) | markus-diehl (Markus Diehl) | same surname + citizenship — unresearched |
| konstantin-diehl (Konstantin Diehl) | laura-diehl (Laura Diehl) | same surname + citizenship — unresearched |
| konstantin-diehl (Konstantin Diehl) | markus-diehl (Markus Diehl) | same surname + citizenship — unresearched |
| laura-diehl (Laura Diehl) | markus-diehl (Markus Diehl) | same surname + citizenship — unresearched |
| gv-prasad (G.V. Prasad) | aluru-jagadish-prasad (Aluru Jagadish Prasad) | same surname + citizenship — unresearched |
| wang-zhenhua (Wang Zhenhua) | xu-zhenhua (Xu Zhenhua) | same surname + citizenship — unresearched |
| jorge-gallardo-ballart (Jorge Gallardo Ballart) | antonio-gallardo-ballart (Antonio Gallardo Ballart) | same surname + citizenship — unresearched |
| shyam-bhartia (Shyam Bhartia) | hari-bhartia (Hari Bhartia) | same surname + citizenship — unresearched |
| irfan-razack-1 (Irfan Razack) | noaman-razack (Noaman Razack) | same surname + citizenship — unresearched |
| irfan-razack-1 (Irfan Razack) | rezwan-razack (Rezwan Razack) | same surname + citizenship — unresearched |
| noaman-razack (Noaman Razack) | rezwan-razack (Rezwan Razack) | same surname + citizenship — unresearched |
| sanjay-agarwal (Sanjay Agarwal) | sachin-agarwal (Sachin Agarwal) | same surname + citizenship — unresearched |
| fu-guangming (Fu Guangming & family) | xiang-guangming (Xiang Guangming & family) | same surname + citizenship — unresearched |
| christian-dreyer (Christian Dreyer) | justus-dreyer (Justus Dreyer) | same surname + citizenship — unresearched |
| charlotte-goh (Charlotte Goh) | henrietta-goh (Henrietta Goh) | same surname + citizenship — unresearched |
| charlotte-goh (Charlotte Goh) | victoria-goh (Victoria Goh) | same surname + citizenship — unresearched |
| henrietta-goh (Henrietta Goh) | victoria-goh (Victoria Goh) | same surname + citizenship — unresearched |
| dmitry-nikolaev (Dmitry Nikolaev) | konstantin-nikolaev (Konstantin Nikolaev) | same surname + citizenship — unresearched |
| lucio-co (Lucio Co) | susan-co (Susan Co) | same surname + citizenship — unresearched |
| fernando-espinosa-abdala (Fernando Espinosa Abdalá) | leopoldo-espinosa-abdala (Leopoldo Espinosa Abdalá) | same surname + citizenship — unresearched |
| diego-della-valle (Diego Della Valle) | andrea-della-valle (Andrea Della Valle) | same surname + citizenship — unresearched |
| magic-johnson (Magic Johnson) | sheila-johnson (Sheila Johnson) | same surname + citizenship — unresearched |
| magic-johnson (Magic Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| bachtiar-karim-1 (Bachtiar Karim) | bahari-karim (Bahari Karim) | same surname + citizenship — unresearched |
| bachtiar-karim-1 (Bachtiar Karim) | burhan-karim (Burhan Karim) | same surname + citizenship — unresearched |
| wu-zhigang (Wu Zhigang & family) | li-zhigang (Li Zhigang) | same surname + citizenship — unresearched |
| alexander-sixt (Alexander Sixt) | konstantin-sixt (Konstantin Sixt) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | john-macmillan-1 (John MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | martha-macmillan (Martha MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | william-macmillan (William MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| cargill-macmillan-iii (Cargill MacMillan III) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | martha-macmillan (Martha MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | william-macmillan (William MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| john-macmillan-1 (John MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | william-macmillan (William MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| martha-macmillan (Martha MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | andrew-macmillan (Andrew MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | christopher-macmillan (Christopher MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| william-macmillan (William MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| vladimir-fartushnyak (Vladimir Fartushnyak) | nikolay-fartushnyak (Nikolay Fartushnyak) | same surname + citizenship — unresearched |
| samuel-chen (Samuel Chen) | warren-chen (Warren Chen) | same surname + citizenship — unresearched |
| stelios-haji-ioannou (Stelios Haji-Ioannou) | polys-haji-ioannou (Polys Haji-Ioannou) | same surname + citizenship — unresearched |
| stelios-haji-ioannou (Stelios Haji-Ioannou) | clelia-haji-ioannou (Clelia Haji-Ioannou) | same surname + citizenship — unresearched |
| polys-haji-ioannou (Polys Haji-Ioannou) | clelia-haji-ioannou (Clelia Haji-Ioannou) | same surname + citizenship — unresearched |
| huang-jian (Huang Jian) | chu-jian-1 (Chu Jian) | same surname + citizenship — unresearched |
| huang-jian (Huang Jian) | zhou-jian-1 (Zhou Jian) | same surname + citizenship — unresearched |
| huang-jian (Huang Jian) | zhou-jian-3 (Zhou Jian) | same surname + citizenship — unresearched |
| francisco-jose-riberas-mera (Francisco Jose Riberas Mera) | juan-maria-riberas-mera (Juan Maria Riberas Mera) | same surname + citizenship — unresearched |
| hwang-chul-joo (Hwang Chul-joo) | shin-dong-joo (Shin Dong-joo) | same surname + citizenship — unresearched |
| yvonne-lo (Yvonne Lo) | vincent-lo (Vincent Lo) | same surname + citizenship — unresearched |
| lu-lili (Lu Lili) | cheng-lili (Cheng Lili) | same surname + citizenship — unresearched |
| lu-lili (Lu Lili) | tan-lili (Tan Lili) | same surname + citizenship — unresearched |
| lu-lili (Lu Lili) | yu-lili (Yu Lili) | same surname + citizenship — unresearched |
| gabriella-meister (Gabriella Meister) | ulrike-meister (Ulrike Meister) | same surname + citizenship — unresearched |
| alexander-linnik (Alexander Linnik) | victor-linnik (Victor Linnik) | same surname + citizenship — unresearched |
| zheng-wei (Zheng Wei) | rao-wei (Rao Wei & family) | same surname + citizenship — unresearched |
| anil-gupta (Anil Gupta) | nanu-gupta (Nanu Gupta) | same surname + citizenship — unresearched |
| jared-smith-1 (Jared Smith) | scott-smith-1 (Scott Smith) | same surname + citizenship — unresearched |
| jared-smith-1 (Jared Smith) | rick-smith (Rick Smith) | same surname + citizenship — unresearched |
| binny-bansal (Binny Bansal) | peyush-bansal (Peyush Bansal) | same surname + citizenship — unresearched |
| binny-bansal (Binny Bansal) | sachin-bansal (Sachin Bansal) | same surname + citizenship — unresearched |
| ayman-hariri (Ayman Hariri) | fahed-hariri (Fahed Hariri) | same surname + citizenship — unresearched |
| ed-park (Ed Park) | todd-park (Todd Park) | same surname + citizenship — unresearched |
| viren-doshi (Viren Doshi) | hitesh-doshi (Hitesh Doshi) | same surname + citizenship — unresearched |
| viren-doshi (Viren Doshi) | pankaj-doshi (Pankaj Doshi) | same surname + citizenship — unresearched |
| viren-doshi (Viren Doshi) | kirit-doshi (Kirit Doshi) | same surname + citizenship — unresearched |
| gao-yi (Gao Yi & family) | xie-yi (Xie Yi) | same surname + citizenship — unresearched |
| gao-yi (Gao Yi & family) | yao-yi-1 (Yao Yi) | same surname + citizenship — unresearched |
| ma-bin (Ma Bin & family) | melissa-ma-1 (Melissa Ma) | same surname + citizenship — unresearched |
| cristina-green (Cristina Green) | philip-green (Philip Green) | same surname + citizenship — unresearched |
| lee-hae-jin (Lee Hae-jin) | lee-ho-jin (Lee Ho-jin) | same surname + citizenship — unresearched |
| lee-hae-jin (Lee Hae-jin) | kim-taek-jin (Kim Taek-jin) | same surname + citizenship — unresearched |
| lee-hae-jin (Lee Hae-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| jordi-rubiralta (Jordi Rubiralta) | jose-luis-rubiralta (Jose Luis Rubiralta) | same surname + citizenship — unresearched |
| jordi-rubiralta (Jordi Rubiralta) | marc-rubiralta (Marc Rubiralta) | same surname + citizenship — unresearched |
| jordi-rubiralta (Jordi Rubiralta) | xavier-rubiralta (Xavier Rubiralta) | same surname + citizenship — unresearched |
| david-feffer (David Feffer) | daniel-feffer (Daniel Feffer) | same surname + citizenship — unresearched |
| david-feffer (David Feffer) | ruben-feffer (Ruben Feffer) | same surname + citizenship — unresearched |
| david-feffer (David Feffer) | jorge-feffer (Jorge Feffer & family) | same surname + citizenship — unresearched |
| helly-nahmad (Helly Nahmad) | joseph-nahmad-1 (Joseph Nahmad) | same surname + citizenship — unresearched |
| helly-nahmad (Helly Nahmad) | yoni-nahmad (Yoni Nahmad) | same surname + citizenship — unresearched |
| joseph-nahmad-1 (Joseph Nahmad) | yoni-nahmad (Yoni Nahmad) | same surname + citizenship — unresearched |
| hans-sy (Hans Sy) | herbert-sy (Herbert Sy) | same surname + citizenship — unresearched |
| hans-sy (Hans Sy) | harley-sy (Harley Sy) | same surname + citizenship — unresearched |
| hans-sy (Hans Sy) | elizabeth-sy (Elizabeth Sy) | same surname + citizenship — unresearched |
| jan-hendrik-goldbeck (Jan-Hendrik Goldbeck) | joachim-goldbeck (Joachim Goldbeck) | same surname + citizenship — unresearched |
| jan-hendrik-goldbeck (Jan-Hendrik Goldbeck) | jorg-uwe-goldbeck (Jörg-Uwe Goldbeck) | same surname + citizenship — unresearched |
| joachim-goldbeck (Joachim Goldbeck) | jorg-uwe-goldbeck (Jörg-Uwe Goldbeck) | same surname + citizenship — unresearched |
| bahari-karim (Bahari Karim) | burhan-karim (Burhan Karim) | same surname + citizenship — unresearched |
| bhikhabai-virani (Bhikhabai Virani) | chandubhai-virani (Chandubhai Virani) | same surname + citizenship — unresearched |
| bhikhabai-virani (Bhikhabai Virani) | kanjibhai-virani (Kanjibhai Virani) | same surname + citizenship — unresearched |
| cheng-lili (Cheng Lili) | tan-lili (Tan Lili) | same surname + citizenship — unresearched |
| cheng-lili (Cheng Lili) | yu-lili (Yu Lili) | same surname + citizenship — unresearched |
| chang-jing-1 (Chang Jing) | zuo-jing (Zuo Jing) | same surname + citizenship — unresearched |
| chang-jing-1 (Chang Jing) | lou-jing (Lou Jing & family) | same surname + citizenship — unresearched |
| herbert-sy (Herbert Sy) | harley-sy (Harley Sy) | same surname + citizenship — unresearched |
| herbert-sy (Herbert Sy) | elizabeth-sy (Elizabeth Sy) | same surname + citizenship — unresearched |
| jose-roberto-ermirio-de-moraes (Jose Roberto Ermirio de Moraes) | neide-helena-de-moraes (Neide Helena de Moraes) | same surname + citizenship — unresearched |
| junro-ito (Junro Ito) | yasuhisa-ito (Yasuhisa Ito) | same surname + citizenship — unresearched |
| daniel-feffer (Daniel Feffer) | ruben-feffer (Ruben Feffer) | same surname + citizenship — unresearched |
| daniel-feffer (Daniel Feffer) | jorge-feffer (Jorge Feffer & family) | same surname + citizenship — unresearched |
| song-fei (Song Fei) | ma-fei (Ma Fei) | same surname + citizenship — unresearched |
| ruben-feffer (Ruben Feffer) | jorge-feffer (Jorge Feffer & family) | same surname + citizenship — unresearched |
| zuo-jing (Zuo Jing) | lou-jing (Lou Jing & family) | same surname + citizenship — unresearched |
| dora-voigt-de-assis (Dora Voigt de Assis) | livia-voigt-de-assis (Lívia Voigt de Assis) | same surname + citizenship — unresearched |
| tan-lili (Tan Lili) | yu-lili (Yu Lili) | same surname + citizenship — unresearched |
| kim-sang-beom (Kim Sang-beom) | cho-hyun-beom (Cho Hyun-beom) | same surname + citizenship — unresearched |
| peyush-bansal (Peyush Bansal) | sachin-bansal (Sachin Bansal) | same surname + citizenship — unresearched |
| nancy-lerner (Nancy Lerner) | randolph-lerner (Randolph Lerner) | same surname + citizenship — unresearched |
| nancy-lerner (Nancy Lerner) | norma-lerner (Norma Lerner) | same surname + citizenship — unresearched |
| randolph-lerner (Randolph Lerner) | norma-lerner (Norma Lerner) | same surname + citizenship — unresearched |
| lee-ho-jin (Lee Ho-jin) | kim-taek-jin (Kim Taek-jin) | same surname + citizenship — unresearched |
| lee-ho-jin (Lee Ho-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| kim-taek-jin (Kim Taek-jin) | lee-su-jin (Lee Su-jin) | same surname + citizenship — unresearched |
| mustafa-latif-topbas (Mustafa Latif Topbas) | ahmed-afif-topbas (Ahmed Afif Topbas) | same surname + citizenship — unresearched |
| hitesh-doshi (Hitesh Doshi) | pankaj-doshi (Pankaj Doshi) | same surname + citizenship — unresearched |
| hitesh-doshi (Hitesh Doshi) | kirit-doshi (Kirit Doshi) | same surname + citizenship — unresearched |
| pankaj-doshi (Pankaj Doshi) | kirit-doshi (Kirit Doshi) | same surname + citizenship — unresearched |
| mary-alice-malone-jr (Mary Alice Malone Jr) | catherine-malone (Catherine Malone) | same surname + citizenship — unresearched |
| sheila-johnson (Sheila Johnson) | robert-johnson (Robert Johnson) | same surname + citizenship — unresearched |
| zhang-xin (Zhang Xin) | jin-xin (Jin Xin) | same surname + citizenship — unresearched |
| harley-sy (Harley Sy) | elizabeth-sy (Elizabeth Sy) | same surname + citizenship — unresearched |
| xie-yi (Xie Yi) | yao-yi-1 (Yao Yi) | same surname + citizenship — unresearched |
| xiong-wu (Xiong Wu) | gary-wu (Gary Wu) | same surname + citizenship — unresearched |
| chu-jian-1 (Chu Jian) | zhou-jian-1 (Zhou Jian) | same surname + citizenship — unresearched |
| chu-jian-1 (Chu Jian) | zhou-jian-3 (Zhou Jian) | same surname + citizenship — unresearched |
| he-zhenggang (He Zhenggang) | dou-zhenggang (Dou Zhenggang) | same surname + citizenship — unresearched |
| clemens-toennies (Clemens Toennies) | robert-toennies (Robert Toennies) | same surname + citizenship — unresearched |
| daniel-hager (Daniel Hager) | philip-family-hager (Philip & family Hager) | same surname + citizenship — unresearched |
| daniel-hager (Daniel Hager) | dorle-hager (Dorle Hager) | same surname + citizenship — unresearched |
| daniel-hager (Daniel Hager) | evi-hager (Evi Hager) | same surname + citizenship — unresearched |
| daniel-hager (Daniel Hager) | peter-hager (Peter Hager) | same surname + citizenship — unresearched |
| daniel-hager (Daniel Hager) | isabel-ulrike-hager (Isabel-Ulrike Hager) | same surname + citizenship — unresearched |
| philip-family-hager (Philip & family Hager) | dorle-hager (Dorle Hager) | same surname + citizenship — unresearched |
| philip-family-hager (Philip & family Hager) | evi-hager (Evi Hager) | same surname + citizenship — unresearched |
| philip-family-hager (Philip & family Hager) | peter-hager (Peter Hager) | same surname + citizenship — unresearched |
| philip-family-hager (Philip & family Hager) | isabel-ulrike-hager (Isabel-Ulrike Hager) | same surname + citizenship — unresearched |
| dorle-hager (Dorle Hager) | evi-hager (Evi Hager) | same surname + citizenship — unresearched |
| dorle-hager (Dorle Hager) | peter-hager (Peter Hager) | same surname + citizenship — unresearched |
| dorle-hager (Dorle Hager) | isabel-ulrike-hager (Isabel-Ulrike Hager) | same surname + citizenship — unresearched |
| evi-hager (Evi Hager) | peter-hager (Peter Hager) | same surname + citizenship — unresearched |
| evi-hager (Evi Hager) | isabel-ulrike-hager (Isabel-Ulrike Hager) | same surname + citizenship — unresearched |
| peter-hager (Peter Hager) | isabel-ulrike-hager (Isabel-Ulrike Hager) | same surname + citizenship — unresearched |
| zhang-jianguo-1 (Zhang Jianguo & family) | li-jianguo (Li Jianguo) | same surname + citizenship — unresearched |
| scott-smith-1 (Scott Smith) | rick-smith (Rick Smith) | same surname + citizenship — unresearched |
| giuliana-caprotti (Giuliana Caprotti) | marina-caprotti (Marina Caprotti) | same surname + citizenship — unresearched |
| jonas-kamprad (Jonas Kamprad) | mathias-kamprad (Mathias Kamprad) | same surname + citizenship — unresearched |
| jonas-kamprad (Jonas Kamprad) | peter-kamprad (Peter Kamprad) | same surname + citizenship — unresearched |
| mathias-kamprad (Mathias Kamprad) | peter-kamprad (Peter Kamprad) | same surname + citizenship — unresearched |
| deepak-mehta (Deepak Mehta) | kirtikumar-mehta (Kirtikumar Mehta) | same surname + citizenship — unresearched |
| christian-herz (Christian Herz) | michaela-herz (Michaela Herz) | same surname + citizenship — unresearched |
| chandubhai-virani (Chandubhai Virani) | kanjibhai-virani (Kanjibhai Virani) | same surname + citizenship — unresearched |
| eugene-mikhaylov (Eugene MIkhaylov) | sergey-mikhaylov (Sergey Mikhaylov) | same surname + citizenship — unresearched |
| marco-squinzi (Marco Squinzi) | veronica-squinzi (Veronica Squinzi) | same surname + citizenship — unresearched |
| andrew-macmillan (Andrew MacMillan) | daniel-macmillan (Daniel MacMillan) | same surname + citizenship — unresearched |
| andrew-macmillan (Andrew MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| andrew-macmillan (Andrew MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| andrew-macmillan (Andrew MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| andrew-macmillan (Andrew MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| daniel-macmillan (Daniel MacMillan) | david-macmillan (David MacMillan) | same surname + citizenship — unresearched |
| daniel-macmillan (Daniel MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| daniel-macmillan (Daniel MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| daniel-macmillan (Daniel MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| david-macmillan (David MacMillan) | donald-macmillan (Donald MacMillan) | same surname + citizenship — unresearched |
| david-macmillan (David MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| david-macmillan (David MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| donald-macmillan (Donald MacMillan) | john-h-macmillan-iv-iv (John H. MacMillan IV IV) | same surname + citizenship — unresearched |
| donald-macmillan (Donald MacMillan) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| john-h-macmillan-iv-iv (John H. MacMillan IV IV) | sandra-macmillan (Sandra MacMillan) | same surname + citizenship — unresearched |
| jose-luis-rubiralta (Jose Luis Rubiralta) | marc-rubiralta (Marc Rubiralta) | same surname + citizenship — unresearched |
| jose-luis-rubiralta (Jose Luis Rubiralta) | xavier-rubiralta (Xavier Rubiralta) | same surname + citizenship — unresearched |
| marc-rubiralta (Marc Rubiralta) | xavier-rubiralta (Xavier Rubiralta) | same surname + citizenship — unresearched |
| orion-hindawi (Orion Hindawi) | david-hindawi (David Hindawi) | same surname + citizenship — unresearched |
| lu-bin (Lu Bin) | zhiqiang-lu (Zhiqiang Lu) | same surname + citizenship — unresearched |
| amelie-voigt-trejes (Amelie Voigt Trejes) | felipe-voigt-trejes (Felipe Voigt Trejes) | same surname + citizenship — unresearched |
| amelie-voigt-trejes (Amelie Voigt Trejes) | pedro-voigt-trejes (Pedro Voigt Trejes) | same surname + citizenship — unresearched |
| felipe-voigt-trejes (Felipe Voigt Trejes) | pedro-voigt-trejes (Pedro Voigt Trejes) | same surname + citizenship — unresearched |
| zhou-jian-1 (Zhou Jian) | zhou-jian-3 (Zhou Jian) | same surname + citizenship — unresearched |
