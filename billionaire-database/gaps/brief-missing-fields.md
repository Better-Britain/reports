# Billionaire Database — research brief: Roster rows missing basic fields

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

Roster completeness: 2,569 people have no age recorded, mostly because the source feed omits it for lower-ranked entries.

## Task

For each person, fill what you can verify: age (or birth year), gender. Also flag anyone whose citizenship or industry looks wrong.

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

## Gaps (2569)

| rank | name | person_uri | missing |
|---|---|---|---|
| 2 | Jeff Bezos | jeff-bezos | age |
| 6 | Michael Dell | michael-dell | age |
| 7 | Warren Buffett | warren-buffett | age |
| 8 | Steve Ballmer | steve-ballmer | age |
| 9 | Larry Ellison | larry-ellison | age |
| 10 | Amancio Ortega | amancio-ortega | age |
| 11 | Rob Walton & family | rob-walton | age |
| 12 | Jim Walton & family | jim-walton | age |
| 13 | Alice Walton | alice-walton | age |
| 14 | Jensen Huang | jensen-huang | age |
| 15 | Carlos Slim Helu & family | carlos-slim-helu | age |
| 16 | Bill Gates | bill-gates | age |
| 17 | Bernard Arnault & family | bernard-arnault | age |
| 19 | Francoise Bettencourt Meyers & family | francoise-bettencourt-meyers | age |
| 20 | Michael Bloomberg | michael-bloomberg | age |
| 21 | Mukesh Ambani | mukesh-ambani | age |
| 22 | Thomas Peterffy | thomas-peterffy | age |
| 23 | Giancarlo Devasini | giancarlo-devasini | age |
| 24 | Julia Koch & family | julia-koch | age |
| 26 | Gautam Adani | gautam-adani-1 | age |
| 27 | Jeff Yass | jeff-yass | age |
| 28 | Charles Koch & family | charles-koch | age |
| 29 | Tadashi Yanai & family | tadashi-yanai | age |
| 30 | Zhong Shanshan | zhong-shanshan | age |
| 31 | Germán Larrea Mota Velasco & family | german-larrea-mota-velasco | age |
| 32 | Dieter Schwarz | dieter-schwarz | age |
| 33 | Ken Griffin | ken-griffin | age |
| 34 | Aliko Dangote | aliko-dangote | age |
| 36 | Jacqueline Mars | jacqueline-mars | age |
| 37 | John Mars | john-mars | age |
| 38 | Li Ka-shing | li-ka-shing | age |
| 40 | Giovanni Ferrero | giovanni-ferrero | age |
| 41 | Gianluigi Aponte | gianluigi-aponte | age |
| 42 | Rafaela Aponte-Diamant | rafaela-aponte-diamant | age |
| 44 | Stephen Schwarzman | stephen-schwarzman | age |
| 46 | Abigail Johnson | abigail-johnson | age |
| 47 | Masayoshi Son | masayoshi-son | age |
| 48 | Thomas Frist Jr & family | thomas-frist-jr | age |
| 50 | Iris Fontbona & family | iris-fontbona | age |
| 51 | Savitri Jindal & family | savitri-jindal | age |
| 52 | Robin Zeng | robin-zeng | age |
| 53 | He Xiangjian | he-xiangjian | age |
| 55 | Alain Wertheimer | alain-wertheimer | age |
| 56 | Gerard Wertheimer | gerard-wertheimer-1 | age |
| 57 | Pham Nhat Vuong | pham-nhat-vuong | age |
| 58 | Jean-Louis van der Velde | jean-louis-van-der-velde | age |
| 60 | Andreas von Bechtolsheim & family | andreas-von-bechtolsheim | age |
| 61 | Alexey Mordashov & family | alexey-mordashov | age |
| 62 | Marilyn Simons & family | marilyn-simons | age |
| 63 | Len Blavatnik | len-blavatnik | age |
| 65 | Melinda French Gates | melinda-french-gates | age |
| 66 | Idan Ofer | idan-ofer | age |
| 67 | Peter Thiel | peter-thiel | age |
| 68 | Eric Schmidt | eric-schmidt | age |
| 69 | Eyal Ofer | eyal-ofer | age |
| 70 | Elaine Marshall & family | elaine-marshall | age |
| 71 | Henry Samueli | henry-samueli | age |
| 72 | Miriam Adelson & family | miriam-adelson | age |
| 73 | Shiv Nadar | shiv-nadar | age |
| 74 | Lakshmi Mittal | lakshmi-mittal | age |
| 75 | Vladimir Potanin | vladimir-potanin | age |
| 77 | Vagit Alekperov | vagit-alekperov | age |
| 78 | Cyrus Poonawalla | cyrus-poonawalla | age |
| 79 | Reinhold Wuerth & family | reinhold-wuerth | age |
| 80 | David Tepper | david-tepper | age |
| 82 | Leonid Mikhelson & family | leonid-mikhelson | age |
| 84 | Stanley Kroenke | stanley-kroenke | age |
| 85 | Israel Englander | israel-englander | age |
| 87 | Vinod Adani | vinod-adani | age |
| 88 | Dilip Shanghvi | dilip-shanghvi | age |
| 89 | Steve Cohen | steve-cohen | age |
| 90 | Phil Knight & family | phil-knight | age |
| 92 | Suleiman Kerimov & family | suleiman-kerimov-family | age |
| 93 | Jay Y. Lee | jay-y-lee | age |
| 94 | Rupert Murdoch & family | rupert-murdoch | age |
| 95 | Vladimir Lisin | vladimir-lisin | age |
| 96 | John Tu | john-tu | age |
| 97 | David Sun | david-sun | age |
| 99 | Christy Walton | christy-walton | age |
| 100 | Stuart Hoegner | stuart-hoegner | age |
| 101 | Jack Ma | jack-ma | age |
| 102 | Prince Alwaleed Bin Talal Alsaud | prince-alwaleed-bin-talal-alsaud | age |
| 104 | Gina Rinehart | gina-rinehart | age |
| 105 | Gennady Timchenko | gennady-timchenko | age |
| 106 | Lei Jun | lei-jun | age |
| 108 | Diane Hendricks | diane-hendricks | age |
| 109 | Susanne Klatten | susanne-klatten | age |
| 110 | Vicky Safra & family | vicky-safra | age |
| 111 | Ernest Garcia II | ernest-garcia-ii | age |
| 113 | Jerry Jones & family | jerry-jones | age |
| 114 | Zheng Shuliang & family | zheng-shuliang | age |
| 115 | Stefan Quandt | stefan-quandt | age |
| 116 | Daniel Gilbert | daniel-gilbert | age |
| 117 | Kumar Birla | kumar-birla | age |
| 118 | François Pinault & family | francois-pinault | age |
| 119 | Harry Triguboff | harry-triguboff | age |
| 120 | John Fredriksen | john-fredriksen | age |
| 121 | Qin Yinglin | qin-yinglin | age |
| 122 | Stefan Persson | stefan-persson | age |
| 123 | Takemitsu Takizaki | takemitsu-takizaki | age |
| 124 | Stephen Ross | stephen-ross | age |
| 125 | Torstein Hagen | torstein-hagen | age |
| 126 | Henry Nicholas III | henry-nicholas-iii | age |
| 127 | Michael Platt | michael-platt | age |
| 128 | Jorge Paulo Lemann & family | jorge-paulo-lemann | age |
| 130 | John Doerr | john-doerr | age |
| 131 | Nancy Walton Laurie | nancy-walton-laurie | age |
| 132 | Wang Chuanfu | wang-chuanfu | age |
| 134 | Donald Bren | donald-bren | age |
| 136 | Arthur Dantchik | arthur-dantchik | age |
| 137 | Philip Anschutz | philip-anschutz | age |
| 138 | Huang Shilin | huang-shilin | age |
| 139 | Harold Hamm & family | harold-hamm | age |
| 140 | Nathan Kirsh | nathan-kirsh | age |
| 141 | Ray Dalio | ray-dalio | age |
| 142 | Renata Kellnerova & family | renata-kellnerova | age |
| 144 | Beate Heister | beate-heister | age |
| 145 | Karl Albrecht Jr. & family | karl-albrecht-jr | age |
| 148 | Rick Cohen & family | rick-cohen | age |
| 149 | Zhong Huijuan | zhong-huijuan | age |
| 150 | Ben Horowitz | ben-horowitz | age |
| 151 | Charlene de Carvalho-Heineken & family | charlene-de-carvalho-heineken | age |
| 153 | Eric Smidt | eric-smidt | age |
| 154 | Theo Albrecht Jr & family | theo-albrecht-jr | age |
| 155 | Jason Chang | jason-chang | age |
| 158 | John Menard Jr | john-menard-jr | age |
| 159 | Alexander Karp | alexander-karp | age |
| 160 | Yu Yong | yu-yong | age |
| 161 | James Ratcliffe | james-ratcliffe | age |
| 163 | Kwong Siu-hing | kwong-siu-hing | age |
| 164 | Jaime Gilinski Bacal | jaime-gilinski-bacal | age |
| 165 | Mikhail Fridman | mikhail-fridman | age |
| 166 | Enrique Razon Jr. | enrique-razon-jr | age |
| 168 | Dhanin Chearavanont | dhanin-chearavanont | age |
| 169 | Murali Divi & family | murali-divi | age |
| 171 | Sarath Ratanavadi | sarath-ratanavadi | age |
| 172 | Ludwig Merckle | ludwig-merckle | age |
| 174 | Uday Kotak | uday-kotak | age |
| 175 | Edward Johnson IV | edward-johnson-iv | age |
| 176 | Shahid Khan | shahid-khan | age |
| 177 | Laurene Powell Jobs | laurene-powell-jobs | age |
| 179 | George Kaiser | george-kaiser | age |
| 180 | Johann Rupert & family | johann-rupert | age |
| 181 | Lu Xiangyang | lu-xiangyang | age |
| 182 | Ralph Lauren & family | ralph-lauren | age |
| 183 | Kushal Pal Singh | kushal-pal-singh | age |
| 184 | Sunil Mittal | sunil-mittal-1 | age |
| 185 | Hussain Sajwani | hussain-sajwani | age |
| 186 | Robert Kraft | robert-kraft | age |
| 188 | Ken Fisher | ken-fisher | age |
| 189 | Andrew Forrest & family | andrew-forrest | age |
| 190 | Ann Walton Kroenke | ann-walton-kroenke | age |
| 191 | Georg Schaeffler | georg-schaeffler | age |
| 192 | James Dyson | james-dyson | age |
| 193 | Jeffery Hildebrand | jeffery-hildebrand | age |
| 194 | Hasso Plattner & family | hasso-plattner | age |
| 195 | Liu Yongxing | liu-yongxing | age |
| 196 | Peter Woo | peter-woo | age |
| 197 | Friedhelm Loh | friedhelm-loh | age |
| 198 | Elizabeth Johnson | elizabeth-johnson | age |
| 199 | Alejandro Baillères Gual & family | alejandro-bailleres-gual | age |
| 202 | Leon Black | leon-black | age |
| 203 | J. Christopher Reyes | j-christopher-reyes | age |
| 204 | Jude Reyes | jude-reyes | age |
| 205 | Xavier Niel & family | xavier-niel | age |
| 206 | Alisher Usmanov | alisher-usmanov | age |
| 211 | Joseph Lau | joseph-lau | age |
| 213 | Pierre Omidyar | pierre-omidyar | age |
| 214 | Eric Li | eric-li | age |
| 215 | George Roberts | george-roberts | age |
| 216 | Charles Ergen | charles-ergen | age |
| 217 | Li Shuirong & family | li-shuirong | age |
| 218 | Radhakishan Damani | radhakishan-damani-1 | age |
| 220 | Sandra Ortega Mera | sandra-ortega-mera | age |
| 221 | Arthur Blank | arthur-blank | age |
| 224 | Terry Gou | terry-gou | age |
| 225 | Gong Hongjia & family | gong-hongjia | age |
| 226 | Charles Schwab | charles-schwab | age |
| 227 | R. Budi Hartono | r-budi-hartono | age |
| 228 | Zhou Qunfei & family | zhou-qunfei | age |
| 229 | Dan Friedkin | dan-friedkin | age |
| 230 | David Reuben | david-reuben | age |
| 231 | Simon Reuben | simon-reuben | age |
| 232 | Martin Lorentzon | martin-lorentzon | age |
| 233 | Richard Kinder | richard-kinder | age |
| 236 | Antonia Ax:son Johnson & family | antonia-axson-johnson | age |
| 237 | Brad Jacobs | brad-jacobs | age |
| 239 | Ivan Glasenberg | ivan-glasenberg | age |
| 241 | Wang Liping & family | wang-liping | age |
| 242 | Henry Kravis | henry-kravis | age |
| 243 | Barry Lam | barry-lam | age |
| 244 | Marijke Mars | marijke-mars | age |
| 245 | Pamela Mars | pamela-mars | age |
| 246 | Valerie Mars | valerie-mars | age |
| 247 | Victoria Mars | victoria-mars | age |
| 248 | Tilman Fertitta | tilman-fertitta | age |
| 250 | Robert Kuok | robert-kuok | age |
| 251 | Michael Sabel | michael-sabel | age |
| 252 | Robert Pender | robert-pender | age |
| 253 | Francesco Gaetano Caltagirone | francesco-gaetano-caltagirone | age |
| 254 | David Steward | david-steward | age |
| 255 | Sherry Brydson | sherry-brydson | age |
| 256 | Abdulsamad Rabiu | abdulsamad-rabiu | age |
| 257 | Jimmy Haslam | jimmy-haslam | age |
| 258 | Andrew Beal | andrew-beal | age |
| 260 | Micky Arison & family | micky-arison | age |
| 261 | Pei Zhenhua | pei-zhenhua-1 | age |
| 262 | Bubba Cathy | bubba-cathy | age |
| 263 | Dan Cathy | dan-cathy | age |
| 264 | Trudy Cathy White | trudy-cathy-white | age |
| 265 | William Ackman | william-ackman | age |
| 266 | Viatcheslav Kantor | viatcheslav-kantor | age |
| 267 | Josh Harris | josh-harris | age |
| 269 | Li Xiting | li-xiting | age |
| 270 | Christopher Hohn | christopher-hohn | age |
| 271 | Vikram Lal & family | vikram-lal | age |
| 272 | Ken Langone | ken-langone | age |
| 273 | Carrie Perrodo & family | carrie-perrodo | age |
| 274 | Terrence Pegula | terrence-pegula | age |
| 276 | Jim Pattison | jim-pattison | age |
| 279 | Wang Laisheng | wang-laisheng | age |
| 281 | Ramzi Musallam | ramzi-musallam | age |
| 282 | Roger Penske | roger-penske | age |
| 283 | Charoen Sirivadhanabhakdi & family | charoen-sirivadhanabhakdi | age |
| 284 | Francine von Finck & family | francine-von-finck | age |
| 285 | Pierre Chen | pierre-chen | age |
| 286 | John Malone | john-malone | age |
| 287 | Ernesto Bertarelli | ernesto-bertarelli | age |
| 288 | Wang Laichun | wang-laichun | age |
| 289 | Joseph Tsai | joseph-tsai | age |
| 290 | David Duffield | david-duffield | age |
| 291 | Randa Duncan Williams | randa-duncan-williams | age |
| 293 | Anthony Pratt | anthony-pratt | age |
| 294 | Finn Rausing | finn-rausing | age |
| 295 | Jorn Rausing | jorn-rausing | age |
| 296 | Kirsten Rausing | kirsten-rausing | age |
| 297 | Juan Roig | juan-roig | age |
| 298 | Dannine Avara | dannine-avara | age |
| 299 | Charles Butt | charles-butt | age |
| 300 | Milane Frantz | milane-frantz | age |
| 301 | Antony Ressler | antony-ressler | age |
| 302 | Charlie Mills | charlie-mills | age |
| 304 | Gayle Benson | gayle-benson | age |
| 305 | Ravi Jaipuria | ravi-jaipuria | age |
| 306 | Douglas Leone | douglas-leone | age |
| 307 | Magdalena Martullo-Blocher | magdalena-martullo-blocher | age |
| 308 | Daniel Tsai | daniel-tsai | age |
| 309 | James Goodnight | james-goodnight | age |
| 311 | Mikhail Prokhorov | mikhail-prokhorov | age |
| 312 | Robert F. Smith | robert-f-smith | age |
| 313 | John Paulson | john-paulson | age |
| 314 | Sun Piaoyang | sun-piaoyang | age |
| 315 | Jay Chaudhry | jay-chaudhry | age |
| 316 | German Khan | german-khan | age |
| 319 | David Shaw | david-shaw | age |
| 320 | Andrei Guryev & family | andrei-guryev-family | age |
| 321 | Stephen Bisciotti | stephen-bisciotti | age |
| 322 | Andreas Struengmann & family | andreas-struengmann | age |
| 323 | Thomas Struengmann & family | thomas-struengmann | age |
| 324 | Tom Gores | tom-gores | age |
| 326 | Nicky Oppenheimer & family | nicky-oppenheimer | age |
| 327 | Richard Tsai | richard-tsai | age |
| 329 | Ron Baron | ron-baron | age |
| 330 | Tsai Ming-kai | tsai-ming-kai | age |
| 331 | Don Hankey | don-hankey | age |
| 332 | Wang Weixiu & family | wang-weixiu | age |
| 333 | Luis Carlos Sarmiento | luis-carlos-sarmiento | age |
| 334 | Zhu Yi | zhu-yi | age |
| 335 | Bruce Kovner | bruce-kovner | age |
| 336 | David Cheriton | david-cheriton | age |
| 337 | Leonid Fedun | leonid-fedun | age |
| 338 | Johann Graf | johann-graf | age |
| 339 | Graeme Hart | graeme-hart | age |
| 340 | Harry Stine & family | harry-stine | age |
| 341 | Elisabeth DeLuca & family | elisabeth-deluca | age |
| 342 | Pankaj Patel | pankaj-patel | age |
| 343 | Gabe Newell | gabe-newell | age |
| 344 | Patrick Ryan | patrick-ryan | age |
| 345 | Rafael Del Pino | rafael-del-pino-1 | age |
| 346 | Jeff Greene | jeff-greene | age |
| 347 | Vinod Khosla | vinod-khosla | age |
| 348 | Rajan Mittal | rajan-mittal | age |
| 349 | Rakesh Mittal | rakesh-mittal | age |
| 350 | Denise York & family | denise-york | age |
| 351 | Robert Rowling | robert-rowling | age |
| 352 | Seo Jung-jin | seo-jung-jin | age |
| 353 | Thomas Schmidheiny | thomas-schmidheiny | age |
| 354 | Lin Bin | lin-bin | age |
| 356 | Li Ge | li-ge | age |
| 358 | Iskander Makhmudov | iskander-makhmudov | age |
| 359 | Viktor Vekselberg | viktor-vekselberg | age |
| 360 | Robert Duggan | robert-duggan | age |
| 361 | Theo Mueller | theo-mueller | age |
| 362 | David Geffen | david-geffen | age |
| 363 | Tamara Gustavson | tamara-gustavson | age |
| 364 | Low Tuck Kwong | low-tuck-kwong | age |
| 365 | Judy Faulkner | judy-faulkner | age |
| 366 | Karel Komarek | karel-komarek | age |
| 367 | Nassef Sawiris | nassef-sawiris | age |
| 368 | Zhang Xuexin & family | zhang-xuexin | age |
| 369 | Wang Yusuo & family | wang-yusuo | age |
| 370 | Fredrik Lundberg | fredrik-lundberg | age |
| 371 | Philippe Laffont | philippe-laffont | age |
| 373 | Sulaiman Al Habib | sulaiman-al-habib | age |
| 374 | Carl Cook | carl-cook | age |
| 375 | John Morris | john-morris | age |
| 376 | Jack Dangermond | jack-dangermond | age |
| 378 | Steven Rales | steven-rales | age |
| 379 | Prajogo Pangestu | prajogo-pangestu | age |
| 381 | Mark Stevens | mark-stevens | age |
| 382 | Maria Asuncion Aramburuzabala & family | maria-asuncion-aramburuzabala | age |
| 383 | Cho Jung-ho | cho-jung-ho | age |
| 384 | Law Kar Po | law-kar-po | age |
| 385 | Roman Abramovich & family | roman-abramovich | age |
| 386 | Les Wexner & family | les-wexner | age |
| 387 | Viktor Rashnikov | viktor-rashnikov | age |
| 388 | Carl Bennet | carl-bennet | age |
| 389 | John Overdeck | john-overdeck | age |
| 390 | David Siegel | david-siegel-1 | age |
| 391 | Andre Esteves | andre-esteves | age |
| 392 | Fernando Roberto Moreira Salles | fernando-roberto-moreira-salles | age |
| 394 | Lin Tsung-Chi | lin-tsung-chi | age |
| 395 | Igor Olenicoff | igor-olenicoff | age |
| 396 | Zhang Hejun | zhang-hejun | age |
| 397 | Pang Kang | pang-kang | age |
| 398 | Michael Federmann & family | michael-federmann | age |
| 399 | Leonard Stern | leonard-stern | age |
| 400 | Juan Carlos Escotet | juan-carlos-escotet | age |
| 401 | Jean-Michel Besnier | jean-michel-besnier | age |
| 403 | Eric Wittouck | eric-wittouck | age |
| 404 | William Goldring & family | william-goldring | age |
| 405 | Rekha Jhunjhunwala | rekha-jhunjhunwala | age |
| 406 | Tahir & family | tahir | age |
| 407 | Laurent Dassault | laurent-dassault | age |
| 408 | Sami Mnaymneh | sami-mnaymneh | age |
| 409 | Tony Tamer | tony-tamer | age |
| 410 | Stanley Druckenmiller | stanley-druckenmiller | age |
| 411 | Lin Muqin & family | lin-muqin | age |
| 412 | Ty Warner | ty-warner | age |
| 413 | Hong Ra-hee | hong-ra-hee | age |
| 414 | Anthoni Salim | anthoni-salim-1 | age |
| 415 | Chen Dongsheng | chen-dongsheng | age |
| 416 | Marie-Hélène Habert-Dassault | marie-helene-habert-dassault | age |
| 417 | Thierry Dassault | thierry-dassault | age |
| 418 | Patrick Soon-Shiong | patrick-soon-shiong | age |
| 419 | Odd Reitan & family | odd-reitan | age |
| 420 | Vivek Chaand Sehgal | vivek-chaand-sehgal | age |
| 421 | J. Joe Ricketts & family | j-joe-ricketts | age |
| 422 | Jeffrey Lurie | jeffrey-lurie | age |
| 423 | Dennis Washington | dennis-washington | age |
| 426 | Tsai Hong-tu | tsai-hong-tu | age |
| 428 | Frank Lowy | frank-lowy | age |
| 430 | Min Kao & family | min-kao | age |
| 431 | Yang Shaopeng | yang-shaopeng | age |
| 432 | Yuri Milner | yuri-milner | age |
| 433 | Morris Chang | morris-chang | age |
| 435 | Marc Benioff | marc-benioff | age |
| 436 | Charles Simonyi | charles-simonyi | age |
| 438 | George Soros | george-soros | age |
| 439 | Kelcy Warren | kelcy-warren | age |
| 440 | Tsai Cheng-ta | tsai-cheng-ta | age |
| 441 | Karen Pritzker | karen-pritzker | age |
| 442 | Michael Milken | michael-milken | age |
| 443 | Pedro Moreira Salles | pedro-moreira-salles | age |
| 445 | Kjell Inge Rokke | kjell-inge-rokke | age |
| 447 | Alexei Kuzmichev | alexei-kuzmichev | age |
| 448 | Liang Wengen | liang-wengen | age |
| 449 | Hasmukh Chudgar & family | hasmukh-chudgar | age |
| 450 | Pavel Tykac | pavel-tykac | age |
| 451 | Ken Xie & family | ken-xie | age |
| 452 | Pauline MacMillan Keinath | pauline-macmillan-keinath | age |
| 453 | Chris Larsen | chris-larsen | age |
| 454 | Andrew Cherng | andrew-cherng-1 | age |
| 455 | Peggy Cherng | peggy-cherng | age |
| 456 | Leo KoGuan | leo-koguan | age |
| 457 | Neil Bluhm | neil-bluhm | age |
| 458 | Massimiliana Landini Aleotti & family | massimiliana-landini-aleotti | age |
| 459 | Jean Salata | jean-salata | age |
| 460 | James Clark | james-clark | age |
| 461 | Piero Ferrari & family | piero-ferrari | age |
| 462 | Dirk Rossmann & family | dirk-rossmann | age |
| 463 | Ray Lee Hunt | ray-lee-hunt | age |
| 465 | Dirk Ziff | dirk-ziff | age |
| 466 | Robert Ziff | robert-ziff | age |
| 467 | Lin Li | lin-li | age |
| 468 | Anthony Bamford & family | anthony-bamford | age |
| 469 | Azim Premji | azim-premji | age |
| 471 | Thomas Pritzker | thomas-pritzker | age |
| 472 | Wei Jianjun & family | wei-jianjun | age |
| 473 | Paul Tudor Jones II | paul-tudor-jones-ii | age |
| 475 | Clifford Asness | clifford-asness | age |
| 476 | Andreas Halvorsen | andreas-halvorsen | age |
| 477 | Sri Prakash Lohia | sri-prakash-lohia | age |
| 478 | Herb Simon | herb-simon | age |
| 479 | Francis Choi | francis-choi | age |
| 482 | Tanya Saadé Zeenny | tanya-saade-zeenny | age |
| 483 | Steven Spielberg | steven-spielberg | age |
| 484 | Horst Julius Pudwill | horst-julius-pudwill | age |
| 485 | Venu Srinivasan | venu-srinivasan-1 | age |
| 486 | Rahul Bhatia | rahul-bhatia-1 | age |
| 487 | Michael Kadoorie | michael-kadoorie | age |
| 488 | Vincent Viola | vincent-viola | age |
| 490 | Denise Coates | denise-coates | age |
| 491 | Satyanarayan Nuwal | satyanarayan-nuwal | age |
| 492 | Patrick Drahi | patrick-drahi | age |
| 493 | Xu Hang | xu-hang | age |
| 494 | Wu Jianshu | wu-jianshu | age |
| 496 | Vyacheslav Kim | vyacheslav-kim | age |
| 497 | Marc Rowan | marc-rowan | age |
| 498 | Paolo Rocca | paolo-rocca | age |
| 499 | Gianfelice Rocca | gianfelice-rocca-1 | age |
| 500 | Rinat Akhmetov | rinat-akhmetov | age |
| 504 | Li Ping | li-ping-1 | age |
| 505 | Sudhir Mehta | sudhir-mehta | age |
| 506 | Samir Mehta | samir-mehta | age |
| 508 | Oleg Deripaska | oleg-deripaska | age |
| 509 | Cal McNair | cal-mcnair | age |
| 511 | Jim Kavanaugh | jim-kavanaugh | age |
| 512 | Mikhail Gutseriev | mikhail-gutseriev | age |
| 513 | Michael Kim | michael-kim | age |
| 514 | Alain Bouchard | alain-bouchard | age |
| 515 | Cao Renxian | cao-renxian | age |
| 516 | Mike Brown & family | mike-brown-1 | age |
| 518 | Jeffrey Koo Jr | jeffrey-koo-jr | age |
| 519 | Joseph Liemandt | joseph-liemandt | age |
| 521 | Marian Ilitch & family | marian-ilitch | age |
| 526 | Ling Tang | ling-tang | age |
| 528 | John Grayken | john-grayken | age |
| 529 | Edward Roski Jr | edward-roski-jr | age |
| 530 | Elizabeth Uihlein | elizabeth-uihlein | age |
| 531 | Richard Uihlein | richard-uihlein | age |
| 532 | David Thomson | david-thomson | age |
| 533 | Peter Thomson | peter-thomson | age |
| 534 | Taylor Thomson | taylor-thomson | age |
| 535 | Blair Parry-Okeden | blair-parry-okeden | age |
| 536 | Jim Kennedy | jim-kennedy | age |
| 537 | H. Ross Perot Jr | h-ross-perot-jr | age |
| 538 | Dona Bertarelli | dona-bertarelli | age |
| 539 | Quek Leng Chan | quek-leng-chan | age |
| 540 | Wolfgang Marguerre & family | wolfgang-marguerre | age |
| 541 | Frederik Paulsen | frederik-paulsen | age |
| 542 | Thai Lee | thai-lee | age |
| 543 | Zeng Fangqin | zeng-fangqin | age |
| 544 | You Xiaoping & family | you-xiaoping | age |
| 546 | Mark Walter | mark-walter | age |
| 547 | Mangal Prabhat Lodha | mangal-prabhat-lodha | age |
| 549 | Maria Fernanda Amorim & family | maria-fernanda-amorim | age |
| 550 | Zhang Congyuan | zhang-congyuan | age |
| 551 | Ronda Stryker | ronda-stryker | age |
| 552 | Michael Xie | michael-xie | age |
| 553 | Ding Shijia | ding-shijia | age |
| 554 | Bruce Cheng | bruce-cheng | age |
| 555 | Paul Singer | paul-singer | age |
| 556 | Mike Hollingshead & family | mike-hollingshead | age |
| 557 | Neal Blue & family | neal-blue | age |
| 558 | Vincent Bolloré & family | vincent-bollore | age |
| 561 | Howard Lutnick & family | howard-lutnick | age |
| 562 | Leonid Boguslavsky | leonid-boguslavsky | age |
| 563 | Juergen Blickle | juergen-blickle | age |
| 565 | Rick Caruso | rick-caruso | age |
| 566 | John Brown | john-brown | age |
| 567 | Jayshree Ullal | jayshree-ullal | age |
| 568 | Carlos Alberto Sicupira & family | carlos-alberto-sicupira | age |
| 569 | Daryl Katz | daryl-katz | age |
| 570 | Ion Stoica | ion-stoica | age |
| 572 | Edythe Broad & family | edythe-broad | age |
| 573 | Joe Lewis | joe-lewis | age |
| 574 | Robert Bass | robert-bass | age |
| 575 | Kerry Stokes | kerry-stokes | age |
| 576 | Robert Clark | robert-clark | age |
| 577 | Philip Ng | philip-ng | age |
| 578 | Alexandra Schoerghuber & family | alexandra-schoerghuber | age |
| 580 | Jeremy Jacobs Sr & family | jeremy-jacobs-sr | age |
| 581 | Kjeld Kirk Kristiansen | kjeld-kirk-kristiansen | age |
| 582 | Charles B. Johnson | charles-b-johnson | age |
| 583 | Ronald Wanek | ronald-wanek | age |
| 584 | Jim Davis & family | jim-davis | age |
| 585 | Clive Calder | clive-calder | age |
| 586 | Evangelos Marinakis & family | evangelos-marinakis | age |
| 587 | Robert Ng | robert-ng | age |
| 588 | Michael Moritz | michael-moritz | age |
| 589 | Mark Cuban | mark-cuban | age |
| 590 | Andrei Skoch & family | andrei-skoch-family | age |
| 593 | Mike Adenuga | mike-adenuga | age |
| 594 | Stephen Smith | stephen-smith | age |
| 595 | Yitzhak Tshuva | yitzhak-tshuva | age |
| 597 | Michael Ashley | michael-ashley | age |
| 598 | Mitchell Morgan & family | mitchell-morgan | age |
| 599 | Dmitry Rybolovlev & family | dmitry-rybolovlev | age |
| 600 | Zhou Chaonan | zhou-chaonan | age |
| 601 | Yuan Fugen & family | yuan-fugen | age |
| 603 | Tench Coxe | tench-coxe | age |
| 604 | Christiane Schoeller | christiane-schoeller | age |
| 605 | Stefan von Holtzbrinck | stefan-von-holtzbrinck | age |
| 606 | Alain Merieux & family | alain-merieux | age |
| 608 | Zou Zhinong & family | zou-zhinong | age |
| 609 | Giuseppe De'Longhi & family | giuseppe-delonghi | age |
| 611 | Rudolf Maag | rudolf-maag | age |
| 612 | Sumet Jiaravanon | sumet-jiaravanon | age |
| 613 | Jean (Gigi) Pritzker | jean-gigi-pritzker | age |
| 614 | Arnon Milchan | arnon-milchan | age |
| 615 | Jon Yarbrough | jon-yarbrough | age |
| 616 | Peter Gilgan | peter-gilgan | age |
| 617 | Robert Hale Jr | robert-hale-jr | age |
| 618 | Michael Otto | michael-otto | age |
| 619 | Jaran Chiaravanont | jaran-chiaravanont | age |
| 620 | Emanuele (Lino) Saputo & family | emanuele-lino-saputo | age |
| 621 | Ma Jianrong | ma-jianrong | age |
| 622 | Yasumitsu Shigeta | yasumitsu-shigeta | age |
| 623 | Margot Birmingham Perot | margot-birmingham-perot | age |
| 625 | Richard Li | richard-li | age |
| 626 | Eric Lefkofsky | eric-lefkofsky | age |
| 627 | Matthias Reimann-Andersen | matthias-reimann-andersen | age |
| 628 | Renate Reimann-Haas | renate-reimann-haas | age |
| 629 | Stefan Reimann-Andersen | stefan-reimann-andersen | age |
| 630 | Wolfgang Reimann | wolfgang-reimann | age |
| 632 | Rakesh Gangwal | rakesh-gangwal | age |
| 633 | Hortensia Herrero | hortensia-herrero | age |
| 634 | Donald Trump | donald-trump | age |
| 635 | Gao Dekang & family | gao-dekang | age |
| 636 | Stefano Pessina | stefano-pessina | age |
| 637 | Chen Bang | chen-bang | age |
| 638 | Bruce Flatt | bruce-flatt | age |
| 639 | Mohed Altrad | mohed-altrad | age |
| 640 | Bill Haslam | bill-haslam | age |
| 641 | Stephen Feinberg & family | stephen-feinberg | age |
| 643 | Tom Golisano | tom-golisano | age |
| 644 | John Catsimatidis | john-catsimatidis | age |
| 645 | Bert Beveridge | bert-beveridge | age |
| 646 | Doug Meijer & family | doug-meijer | age |
| 647 | Hank Meijer & family | hank-meijer | age |
| 648 | Mark Meijer & family | mark-meijer | age |
| 650 | Michael Herz | michael-herz | age |
| 651 | Wolfgang Herz | wolfgang-herz | age |
| 652 | Miguel Krigsner | miguel-krigsner | age |
| 653 | John Henry | john-henry | age |
| 654 | Albert Boehringer | albert-boehringer | age |
| 656 | Christian Boehringer | christian-boehringer | age |
| 660 | Hubertus von Baumbach | hubertus-von-baumbach | age |
| 664 | Mathias Boehringer | mathias-boehringer | age |
| 666 | Otto Boehringer | otto-boehringer | age |
| 668 | Ulrike von Baumbach | ulrike-von-baumbach | age |
| 669 | Dietmar Hopp & family | dietmar-hopp | age |
| 671 | Zhang Daocai | zhang-daocai | age |
| 672 | Erich Wesjohann & family | erich-wesjohann | age |
| 674 | Benu Gopal Bangur | benu-gopal-bangur | age |
| 675 | Joseph Grendys | joseph-grendys | age |
| 676 | Peter Cancro | peter-cancro | age |
| 677 | Trevor Rees-Jones | trevor-rees-jones | age |
| 678 | Eren Ozmen | eren-ozmen | age |
| 681 | Carl Douglas | carl-douglas | age |
| 682 | Lin Shu-hong | lin-shu-hong | age |
| 683 | Alexander Otto | alexander-otto | age |
| 684 | Archie Aldis Emmerson & family | archie-aldis-emmerson | age |
| 685 | Tom Morris | tom-morris | age |
| 686 | Cen Junda | cen-junda | age |
| 688 | Rupert Johnson Jr | rupert-johnson-jr | age |
| 689 | Gary Rollins & family | gary-rollins | age |
| 690 | Renuka Jagtiani | renuka-jagtiani | age |
| 691 | Koon Poh Keong | koon-poh-keong | age |
| 692 | Matthias Reinhart | matthias-reinhart | age |
| 693 | Robert Faith | robert-faith | age |
| 694 | Shari Arison | shari-arison | age |
| 695 | Jiang Bin | jiang-bin | age |
| 696 | Vladimir Kim | vladimir-kim | age |
| 697 | Penny Pritzker | penny-pritzker | age |
| 698 | Jeff Skoll | jeff-skoll | age |
| 700 | Thomas Kaeser | thomas-kaeser-1 | age |
| 702 | Claudio Del Vecchio | claudio-del-vecchio | age |
| 706 | Marisa Del Vecchio | marisa-del-vecchio | age |
| 707 | Nicoletta Zampillo | nicoletta-zampillo | age |
| 708 | Paola Del Vecchio | paola-del-vecchio | age |
| 710 | Pablo Legorreta | pablo-legorreta | age |
| 711 | Isaac Perlmutter | isaac-perlmutter | age |
| 713 | Romesh T. Wadhwani | romesh-t-wadhwani | age |
| 714 | M.A. Yusuff Ali | ma-yusuff-ali | age |
| 715 | Gaye Farncombe | gaye-farncombe | age |
| 716 | Linda Campbell | linda-campbell | age |
| 717 | Fatih Ozmen | fatih-ozmen | age |
| 718 | Johnelle Hunt | johnelle-hunt | age |
| 719 | Jorge Moll Filho & family | jorge-moll-filho | age |
| 720 | Eric Douglas | eric-douglas | age |
| 721 | Joe Mansueto | joe-mansueto | age |
| 722 | Annette Lerner & family | annette-lerner | age |
| 723 | Alex Behring | alex-behring | age |
| 724 | Robert Rich Jr | robert-rich-jr | age |
| 725 | Alexander Abramov | alexander-abramov | age |
| 726 | Balkrishan Goenka | balkrishan-goenka | age |
| 727 | Peter Kellogg | peter-kellogg | age |
| 728 | Mong-Koo Chung | mong-koo-chung | age |
| 729 | Barry Diller | barry-diller | age |
| 730 | Reinhold Schmieding | reinhold-schmieding | age |
| 732 | Falguni Nayar | falguni-nayar | age |
| 733 | Gordon Getty & family | gordon-getty | age |
| 735 | Shapoor Mistry | shapoor-mistry-1 | age |
| 736 | Willy Michel | willy-michel | age |
| 737 | Helen Johnson-Leipold | helen-johnson-leipold | age |
| 738 | Michel Leclercq & family | michel-leclercq | age |
| 739 | Andrew Currie | andrew-currie | age |
| 740 | Liu Hanyuan | liu-hanyuan | age |
| 741 | Rajiv Bajaj | rajiv-bajaj | age |
| 742 | Sanjiv Bajaj | sanjiv-bajaj | age |
| 743 | Chandru Raheja | chandru-raheja | age |
| 744 | John Reece | john-reece | age |
| 745 | Stephen Mandel Jr | stephen-mandel-jr | age |
| 748 | Mitchell Rales | mitchell-rales | age |
| 749 | Winifred J. Marquart | winifred-j-marquart | age |
| 750 | Fan Hongwei | fan-hongwei | age |
| 752 | Liu Yonghao & family | liu-yonghao | age |
| 754 | Steven Klinsky | steven-klinsky | age |
| 755 | Thomas Hagen & family | thomas-hagen | age |
| 756 | H. Fisk Johnson | h-fisk-johnson | age |
| 757 | Lee Thiam Wah | lee-thiam-wah | age |
| 758 | S. Curtis Johnson | s-curtis-johnson | age |
| 759 | Naguib Sawiris | naguib-sawiris | age |
| 760 | Robert Low | robert-low | age |
| 763 | Andy Mills | andy-mills | age |
| 764 | Mario Verrocchi | mario-verrocchi | age |
| 765 | George Lucas | george-lucas | age |
| 766 | Dinara Kulibayeva | dinara-kulibayeva | age |
| 767 | Timur Kulibayev | timur-kulibayev | age |
| 768 | Joy Alukkas | joy-alukkas | age |
| 769 | Bob Gaglardi & family | bob-gaglardi | age |
| 770 | Florentino Perez | florentino-perez | age |
| 771 | Thomas Straumann | thomas-straumann | age |
| 772 | Li Min | li-min | age |
| 773 | Ronald Lauder | ronald-lauder | age |
| 776 | Bulat Utemuratov | bulat-utemuratov | age |
| 777 | Lynda Resnick | lynda-resnick | age |
| 778 | Stewart Resnick | stewart-resnick | age |
| 780 | Cho Tak Wong | cho-tak-wong | age |
| 781 | John Sall | john-sall | age |
| 782 | Anthony von Mandl | anthony-von-mandl | age |
| 783 | Paul Foster | paul-foster | age |
| 784 | Ratmir Timashev | ratmir-timashev | age |
| 785 | Gopikishan Damani | gopikishan-damani | age |
| 787 | Torbjorn Tornqvist | torbjorn-tornqvist | age |
| 788 | Gwendolyn Sontheim Meyer | gwendolyn-sontheim-meyer | age |
| 789 | Heinrich Otto Deichmann | heinrich-otto-deichmann | age |
| 791 | Dan Snyder | dan-snyder | age |
| 792 | Andre Koo | andre-koo | age |
| 794 | Kailashchandra Nuwal | kailashchandra-nuwal | age |
| 795 | George Economou | george-economou | age |
| 796 | Ruan Liping | ruan-liping | age |
| 797 | Tsai Eng-meng | tsai-eng-meng | age |
| 799 | Maria Del Pino | maria-del-pino | age |
| 800 | Yip Sum Yin | yip-sum-yin | age |
| 802 | Scott Cook | scott-cook | age |
| 803 | Arkady Rotenberg | arkady-rotenberg | age |
| 804 | Michal Solowow | michal-solowow | age |
| 805 | Margarita Louis-Dreyfus & family | margarita-louis-dreyfus | age |
| 806 | Pyotr Aven | pyotr-aven | age |
| 807 | Angelo Koo | angelo-koo | age |
| 808 | Sukanto Tanoto | sukanto-tanoto | age |
| 809 | Ian Livingstone | ian-livingstone | age |
| 810 | Richard Livingstone | richard-livingstone | age |
| 811 | Scott Kapnick | scott-kapnick | age |
| 812 | Gail Miller & family | gail-miller | age |
| 814 | Richard Schulze | richard-schulze | age |
| 815 | Jon Stryker | jon-stryker | age |
| 816 | David Filo | david-filo | age |
| 817 | Andrei Kozitsyn | andrei-kozitsyn | age |
| 818 | Anil Agarwal & family | anil-agarwal | age |
| 819 | Catherine Commisso & family | catherine-commisso-family | age |
| 820 | John A. Sobrato & family | john-a-sobrato | age |
| 821 | Hamad bin Jassim bin Jaber Al Thani | hamad-bin-jassim-bin-jaber-al-thani | age |
| 823 | Dagmar Dolby & family | dagmar-dolby | age |
| 824 | Thomas Secunda | thomas-secunda | age |
| 825 | Abhay Firodia | abhay-firodia | age |
| 826 | Phil Ruffin | phil-ruffin | age |
| 827 | Shaul Shani | shaul-shani | age |
| 829 | Zhu Baoguo & family | zhu-baoguo | age |
| 830 | Don Vultaggio & family | don-vultaggio | age |
| 831 | Jamshyd Godrej | jamshyd-godrej | age |
| 832 | Smita Crishna Godrej | smita-crishna-godrej | age |
| 834 | Danielle Bellon & family | danielle-bellon | age |
| 836 | Zarakh Iliev | zarakh-iliev | age |
| 837 | Peter Gassner | peter-gassner | age |
| 838 | Steven Udvar-Hazy | steven-udvar-hazy | age |
| 839 | Jerzy Starak | jerzy-starak | age |
| 841 | Abdulla bin Ahmad Al Ghurair & family | abdulla-bin-ahmad-al-ghurair | age |
| 842 | Lutz Mario Helmig & family | lutz-mario-helmig | age |
| 843 | Cho Jyh-jer | cho-jyh-jer | age |
| 844 | Murat Ulker | murat-ulker | age |
| 845 | David MacNeil | david-macneil | age |
| 848 | Todd Christopher | todd-christopher | age |
| 849 | B. Partha Saradhi Reddy | b-partha-saradhi-reddy | age |
| 851 | Shen Guojun | shen-guojun | age |
| 853 | Larry Gies | larry-gies | age |
| 854 | Jiang Rensheng & family | jiang-rensheng | age |
| 855 | Byron Trott | byron-trott | age |
| 856 | Robert Johnson & family | robert-johnson-3 | age |
| 857 | Nirmal Minda | nirmal-minda | age |
| 858 | Daniel D'Aniello | daniel-daniello | age |
| 859 | James Chambers | james-chambers | age |
| 860 | Katharine Rayner | katharine-rayner | age |
| 861 | Margaretta Taylor | margaretta-taylor | age |
| 862 | Drayton McLane Jr | drayton-mclane-jr | age |
| 863 | Anthony Pritzker | anthony-pritzker | age |
| 864 | Martin Ebner | martin-ebner | age |
| 865 | Alejandro Bulgheroni | alejandro-bulgheroni | age |
| 866 | Beatriz Davila de Santo Domingo | beatriz-davila-de-santo-domingo | age |
| 867 | Arturo Moreno | arturo-moreno | age |
| 868 | N. Murray Edwards | n-murray-edwards | age |
| 871 | John Middleton | john-middleton | age |
| 872 | Li Chunan | li-chunan | age |
| 873 | Chip Wilson | chip-wilson | age |
| 875 | Herbert Wertheim | herbert-wertheim | age |
| 876 | Hu Baifan | hu-baifan | age |
| 878 | Andrei Bokarev | andrei-bokarev | age |
| 879 | Igor Kesaev | igor-kesaev | age |
| 881 | Miguel Fluxa Rossello | miguel-fluxa-rossello | age |
| 883 | Nikolai Buinov | nikolai-buinov | age |
| 884 | Georg Nemetschek & family | georg-nemetschek | age |
| 885 | Rodger Riney & family | rodger-riney | age |
| 886 | Austen Cargill II | austen-cargill-ii | age |
| 887 | James Cargill II | james-cargill-ii | age |
| 888 | Marianne Liebmann | marianne-liebmann | age |
| 889 | Donald Sterling | donald-sterling | age |
| 891 | Fernand Huts | fernand-huts | age |
| 892 | C. Dean Metropoulos | c-dean-metropoulos | age |
| 894 | Otto Toto Sugiri | otto-toto-sugiri | age |
| 895 | Daniel Och | daniel-och | age |
| 898 | Henning Oldendorff | henning-oldendorff | age |
| 899 | Hansjoerg Wyss | hansjoerg-wyss | age |
| 900 | Eleanor Butt Crook & family | eleanor-butt-crook | age |
| 901 | August Troendle | august-troendle | age |
| 902 | Wendy Abrams | wendy-abrams | age |
| 903 | Martin Haefner | martin-haefner | age |
| 904 | Stewart Rahr | stewart-rahr | age |
| 906 | Baba Kalyani | baba-kalyani | age |
| 907 | Edward Stack & family | edward-stack | age |
| 908 | Edward DeBartolo Jr | edward-debartolo-jr | age |
| 909 | Masahiro Noda | masahiro-noda | age |
| 910 | Mark Shoen | mark-shoen | age |
| 911 | Nusli Wadia | nusli-wadia | age |
| 912 | Stewart Horejsi & family | stewart-horejsi | age |
| 913 | Jim Coulter | jim-coulter | age |
| 914 | Michael Jordan | michael-jordan | age |
| 915 | Alexandre Van Damme | alexandre-van-damme | age |
| 916 | Abdulla Al Futtaim & family | abdulla-al-futtaim | age |
| 917 | Jennifer Gilbert | jennifer-gilbert | age |
| 918 | George Prokopiou & family | george-prokopiou | age |
| 920 | Joao Moreira Salles | joao-moreira-salles | age |
| 921 | Walther Moreira Salles Junior | walther-moreira-salles-junior | age |
| 923 | Lorinc Meszaros | lorinc-meszaros | age |
| 924 | Hamilton James & family | hamilton-james | age |
| 925 | Sid Bass | sid-bass | age |
| 926 | Niels Peter Louis-Hansen | niels-peter-louis-hansen | age |
| 927 | Bob Parsons | bob-parsons | age |
| 928 | Lee Yeow Chor | lee-yeow-chor | age |
| 929 | Robin Li | robin-li | age |
| 930 | Mahendra Choksi & family | mahendra-choksi | age |
| 931 | Kagemasa Kozuki | kagemasa-kozuki | age |
| 932 | Thomas Siebel | thomas-siebel | age |
| 934 | Harsh Mariwala | harsh-mariwala | age |
| 936 | Laurence Graff & family | laurence-graff | age |
| 937 | George Bishop | george-bishop | age |
| 938 | Theodore Leonsis | theodore-leonsis | age |
| 939 | Michael Pieper | michael-pieper | age |
| 940 | Carl Thoma | carl-thoma | age |
| 941 | Keith Dunleavy & family | keith-dunleavy | age |
| 942 | Lynn Schusterman & family | lynn-schusterman | age |
| 943 | Takao Yasuda | takao-yasuda | age |
| 944 | Theodore Rachmat | theodore-rachmat | age |
| 946 | Sol Daurella | sol-daurella | age |
| 947 | Meg Whitman | meg-whitman | age |
| 949 | Hans Peter Wild | hans-peter-wild | age |
| 950 | Qiu Jianping & family | qiu-jianping | age |
| 951 | James Duff | james-duff | age |
| 952 | Richard White | richard-white | age |
| 953 | Amos Hostetter Jr | amos-hostetter-jr | age |
| 956 | Thomas Duff | thomas-duff | age |
| 957 | Xu Shihui | xu-shihui | age |
| 959 | Cheng Cheung Ling | cheng-cheung-ling | age |
| 960 | Kenneth Dart | kenneth-dart | age |
| 961 | Erwin Franz Mueller | erwin-franz-mueller | age |
| 962 | Wang Jianlin | wang-jianlin | age |
| 963 | Andreas Martinos & family | andreas-martinos | age |
| 965 | Bernard Fraisse & family | bernard-fraisse | age |
| 966 | Walter Frey | walter-frey | age |
| 967 | Ajay Piramal | ajay-piramal | age |
| 968 | Wu Yajun | wu-yajun | age |
| 969 | Gilles Martin | gilles-martin | age |
| 970 | Ray Davis | ray-davis | age |
| 971 | Daniel Loeb | daniel-loeb | age |
| 972 | Jim Davis | jim-davis-1 | age |
| 973 | Liu Jincheng & family | liu-jincheng | age |
| 974 | Takahisa Takahara | takahisa-takahara | age |
| 975 | Chey Tae-won | chey-tae-won | age |
| 977 | Gil Shwed | gil-shwed | age |
| 978 | John Gandel | john-gandel | age |
| 979 | Nancy Mills Barnett | nancy-mills-barnett | age |
| 980 | Steve Wynn | steve-wynn | age |
| 981 | Pham Thu Huong | pham-thu-huong | age |
| 983 | Ira Rennert | ira-rennert | age |
| 985 | P.V. Ramprasad Reddy | pv-ramprasad-reddy | age |
| 986 | Huang Li | huang-li-1 | age |
| 987 | Marc Ladreit de Lacharriere | marc-ladreit-de-lacharriere | age |
| 988 | Norman Braman | norman-braman | age |
| 989 | Thomas Wu | thomas-wu | age |
| 990 | Carlo Fidani | carlo-fidani | age |
| 992 | Saban Cemil Kazanci | saban-cemil-kazanci | age |
| 993 | David Rubenstein | david-rubenstein | age |
| 994 | Zhang Wanzhen | zhang-wanzhen | age |
| 995 | Ji Qi | ji-qi | age |
| 996 | David Blitzer | david-blitzer | age |
| 997 | Yeung Kin-man | yeung-kin-man | age |
| 998 | Steve Lavin & family | steve-lavin | age |
| 999 | Masahiro Miki | masahiro-miki | age |
| 1000 | Friede Springer | friede-springer | age |
| 1001 | Renzo Rosso & family | renzo-rosso | age |
| 1002 | Patrizio Bertelli | patrizio-bertelli | age |
| 1003 | Karsanbhai Patel | karsanbhai-patel | age |
| 1004 | Miuccia Prada | miuccia-prada | age |
| 1005 | Hilton Schlosberg & family | hilton-schlosberg | age |
| 1006 | Carlos Hank Rhon & family | carlos-hank-rhon | age |
| 1007 | Lin Chen-hai | lin-chen-hai | age |
| 1009 | Eduardo Eurnekian | eduardo-eurnekian | age |
| 1010 | Eduardo Hochschild | eduardo-hochschild | age |
| 1012 | Anne Beaufour | anne-beaufour | age |
| 1013 | Todd Wanek | todd-wanek | age |
| 1014 | Antti Herlin | antti-herlin | age |
| 1015 | Somurai Jaruphnit | somurai-jaruphnit | age |
| 1016 | Angela Bennett | angela-bennett | age |
| 1020 | J.B. Pritzker | jb-pritzker | age |
| 1021 | Phillip T. (Terry) Ragon | phillip-t-terry-ragon | age |
| 1022 | Pansy Ho | pansy-ho | age |
| 1024 | N.R. Narayana Murthy | nr-narayana-murthy | age |
| 1025 | Pat Stryker | pat-stryker | age |
| 1026 | Roger Samuelsson | roger-samuelsson | age |
| 1027 | John Caudwell | john-caudwell | age |
| 1028 | Xiao Yongming & family | xiao-yongming | age |
| 1029 | Jeffrey Cheah | jeffrey-cheah | age |
| 1030 | Xu Gaoming | xu-gaoming | age |
| 1031 | Lam Wai-ying | lam-wai-ying | age |
| 1032 | Samuel Tak Lee | samuel-tak-lee | age |
| 1033 | Tung Chee Chen | tung-chee-chen | age |
| 1034 | Weili Dai | weili-dai | age |
| 1035 | Yang Chang-Chih | yang-chang-chih | age |
| 1037 | Shekhar Bajaj | shekhar-bajaj | age |
| 1038 | Kumud Bajaj | kumud-bajaj | age |
| 1039 | Niraj Bajaj | niraj-bajaj-1 | age |
| 1040 | Aristotelis Mistakidis | aristotelis-mistakidis | age |
| 1043 | Akira Mori & family | akira-mori | age |
| 1044 | T.S. Kalyanaraman | ts-kalyanaraman | age |
| 1045 | Liang Zhaoxian | liang-zhaoxian | age |
| 1046 | Ronald McAulay | ronald-mcaulay | age |
| 1047 | Samvel Karapetyan | samvel-karapetyan | age |
| 1049 | Reed Hastings | reed-hastings | age |
| 1050 | Miao Hangen | miao-hangen | age |
| 1051 | Ravi Pillai | ravi-pillai | age |
| 1052 | Dan Olsson | dan-olsson | age |
| 1053 | Giuliana Benetton | giuliana-benetton | age |
| 1054 | Luciano Benetton | luciano-benetton | age |
| 1056 | Mohamed Mansour | mohamed-mansour | age |
| 1057 | Prathap Reddy | prathap-reddy | age |
| 1058 | Andrej Babis | andrej-babis | age |
| 1059 | Maria-Elisabeth Schaeffler-Thumann | maria-elisabeth-schaeffler-thumann | age |
| 1060 | David Nahmad | david-nahmad | age |
| 1061 | Jack Link & family | jack-link | age |
| 1062 | Sunny Varkey | sunny-varkey | age |
| 1063 | Neal Aronson | neal-aronson | age |
| 1064 | Lim Hariyanto Wijaya Sarwono | lim-hariyanto-wijaya-sarwono | age |
| 1065 | Vivek Jain | vivek-jain | age |
| 1067 | Anand Mahindra | anand-mahindra | age |
| 1068 | Susan Alfond | susan-alfond | age |
| 1069 | Ted Alfond | ted-alfond | age |
| 1070 | Bill Alfond | bill-alfond | age |
| 1071 | Hubert Burda | hubert-burda | age |
| 1072 | Jose Joao Abdalla Filho | jose-joao-abdalla-filho | age |
| 1074 | Wolfgang Leitner | wolfgang-leitner | age |
| 1075 | Jozef Tkac | jozef-tkac | age |
| 1076 | Erik Selin | erik-selin | age |
| 1077 | William Conway Jr | william-conway-jr | age |
| 1078 | Xia Zuoquan | xia-zuoquan | age |
| 1079 | Margaret Baker | margaret-baker | age |
| 1081 | Sergio Stevanato & family | sergio-stevanato | age |
| 1083 | E. Joe Shoen | e-joe-shoen | age |
| 1084 | Eugene Wu | eugene-wu | age |
| 1085 | Chairul Tanjung | chairul-tanjung | age |
| 1086 | G. M. Rao | g-m-rao | age |
| 1088 | Otto Happel | otto-happel | age |
| 1089 | Patrick Lee | patrick-lee | age |
| 1090 | Paul Gauselmann & family | paul-gauselmann | age |
| 1091 | Nadir Godrej | nadir-godrej | age |
| 1093 | P.N.C. Menon | pnc-menon | age |
| 1094 | Najib Mikati | najib-mikati | age |
| 1095 | Taha Mikati | taha-mikati | age |
| 1096 | Paul-Heinz Wesjohann & family | paul-heinz-wesjohann | age |
| 1097 | Clive Palmer | clive-palmer | age |
| 1098 | Yakir Gabay | yakir-gabay | age |
| 1099 | Kavitark Ram Shriram | kavitark-ram-shriram | age |
| 1100 | Yu Renrong | yu-renrong | age |
| 1102 | Kwek Leng Beng | kwek-leng-beng | age |
| 1103 | Nick Caporella | nick-caporella | age |
| 1104 | Ivar Tollefsen | ivar-tollefsen | age |
| 1105 | Spiro Latsis & family | spiro-latsis | age |
| 1106 | Maurizio Billi | maurizio-billi | age |
| 1108 | Michael Saylor | michael-saylor | age |
| 1110 | Chao Chung-Hsin | chao-chung-hsin | age |
| 1111 | Adi Godrej | adi-godrej | age |
| 1112 | Norbert Dentressangle & family | norbert-dentressangle | age |
| 1113 | Sanjiv Goenka | sanjiv-goenka | age |
| 1114 | Brunello Cucinelli & family | brunello-cucinelli | age |
| 1115 | Lawrence Stroll | lawrence-stroll | age |
| 1116 | Wang Junlin & family | wang-junlin | age |
| 1117 | Kuok Khoon Hong | kuok-khoon-hong | age |
| 1119 | Anthony Hall | anthony-hall | age |
| 1120 | Reinold Geiger | reinold-geiger | age |
| 1121 | Daniel Mate | daniel-mate | age |
| 1124 | Martua Sitorus | martua-sitorus | age |
| 1128 | Arkady Volozh | arkady-volozh | age |
| 1129 | Thomas James | thomas-james | age |
| 1131 | Mark Leonard & family | mark-leonard | age |
| 1132 | Yuji Otsuka | yuji-otsuka-1 | age |
| 1134 | Han Tao | han-tao | age |
| 1135 | Du Jiangtao & family | du-jiangtao | age |
| 1136 | Louis Le Duff | louis-le-duff | age |
| 1137 | Harish Ahuja | harish-ahuja | age |
| 1138 | Sam Hupert | sam-hupert | age |
| 1139 | Michael Novogratz | michael-novogratz | age |
| 1140 | Ugur Sahin | ugur-sahin | age |
| 1141 | Duke Reyes | duke-reyes | age |
| 1143 | John Fish | john-fish | age |
| 1146 | Barry Zekelman | barry-zekelman | age |
| 1147 | Jean Coutu & family | jean-coutu | age |
| 1148 | Issad Rebrab & family | issad-rebrab | age |
| 1150 | Panagiotis Tsakos & family | panagiotis-tsakos | age |
| 1151 | Howard Schultz | howard-schultz | age |
| 1152 | Charles Zegar | charles-zegar | age |
| 1153 | Vladimir Litvinenko & family | vladimir-litvinenko | age |
| 1154 | Leon G. Cooperman | leon-g-cooperman | age |
| 1155 | Klaus-Peter Schulenberg | klaus-peter-schulenberg | age |
| 1156 | Walden Yan | walden-yan | age |
| 1158 | Jacques D'Amours | jacques-damours | age |
| 1159 | Pierre Karl Péladeau | pierre-karl-peladeau | age |
| 1160 | Michiel Le Roux | michiel-le-roux | age |
| 1161 | Zhou Jianping | zhou-jianping | age |
| 1163 | Dennis Bastas | dennis-bastas | age |
| 1164 | Carlos March Delgado | carlos-march-delgado | age |
| 1165 | Peter Hargreaves | peter-hargreaves | age |
| 1166 | Jeff Rothschild | jeff-rothschild | age |
| 1167 | William Wrigley Jr | william-wrigley-jr | age |
| 1168 | Jonathan Nelson | jonathan-nelson | age |
| 1170 | William Stone | william-stone | age |
| 1172 | Chao Yung-Tsang | chao-yung-tsang | age |
| 1173 | Ricardo Salinas Pliego & family | ricardo-salinas-pliego | age |
| 1174 | Xue Min | xue-min | age |
| 1175 | Leena Tewari | leena-tewari | age |
| 1176 | Antonio Del Valle Ruiz & family | antonio-del-valle-ruiz | age |
| 1177 | Yang Weidong & family | yang-weidong-1 | age |
| 1178 | Romano Minozzi | romano-minozzi | age |
| 1180 | Anthony Wood | anthony-wood | age |
| 1181 | Martin Bouygues | martin-bouygues-1 | age |
| 1182 | Cai Kui | cai-kui | age |
| 1183 | Frank Fertitta III | frank-fertitta-iii | age |
| 1184 | James Packer | james-packer | age |
| 1185 | Lorenzo Fertitta | lorenzo-fertitta | age |
| 1188 | Vinod Rai Gupta | vinod-rai-gupta | age |
| 1189 | Juan Abello | juan-abello | age |
| 1190 | Fu Liquan | fu-liquan | age |
| 1191 | John Fisher | john-fisher | age |
| 1192 | Michael Intrator | michael-intrator | age |
| 1193 | Giorgio Perfetti | giorgio-perfetti | age |
| 1194 | Frank Slootman | frank-slootman | age |
| 1195 | Xie Weitong | xie-weitong | age |
| 1196 | Joel Greenberg | joel-greenberg | age |
| 1197 | Jose Roberto Marinho | jose-roberto-marinho | age |
| 1198 | Jack Gance | jack-gance | age |
| 1199 | Joao Roberto Marinho | joao-roberto-marinho | age |
| 1200 | Olivier Bouygues | olivier-bouygues | age |
| 1202 | Oprah Winfrey | oprah-winfrey | age |
| 1203 | David Wertheim | david-wertheim | age |
| 1204 | David Hoffmann | david-hoffmann | age |
| 1205 | Rodney Sacks & family | rodney-sacks | age |
| 1207 | Ma Yunsheng | ma-yunsheng | age |
| 1208 | Frank VanderSloot | frank-vandersloot | age |
| 1209 | Vincent McMahon | vincent-mcmahon | age |
| 1210 | Chang Kuo-Hua | chang-kuo-hua | age |
| 1211 | Waleed Mohammad Al Zaabi | waleed-mohammad-al-zaabi | age |
| 1212 | Eva Maria Bucher-Haefner | eva-maria-bucher-haefner | age |
| 1214 | Mohamed Alabbar | mohamed-alabbar | age |
| 1215 | Richard Peery | richard-peery | age |
| 1217 | Michael Latifi | michael-latifi | age |
| 1218 | Felix Baker | felix-baker | age |
| 1219 | Julian Baker | julian-baker | age |
| 1221 | Maggie Hardy | maggie-hardy | age |
| 1222 | Juan March Delgado | juan-march-delgado | age |
| 1223 | Warren Stephens | warren-stephens | age |
| 1224 | Erman Ilicak | erman-ilicak | age |
| 1225 | Ron Burkle | ron-burkle | age |
| 1226 | Syed Mokhtar AlBukhary | syed-mokhtar-albukhary | age |
| 1230 | Alceu Elias Feldmann & family | alceu-elias-feldmann | age |
| 1231 | Cao Longxiang & family | cao-longxiang | age |
| 1232 | David Baszucki | david-baszucki | age |
| 1234 | Isabella Seràgnoli | isabella-seragnoli | age |
| 1235 | Leonard Schleifer | leonard-schleifer | age |
| 1236 | Anthony Langley | anthony-langley | age |
| 1239 | Jack Cockwell | jack-cockwell | age |
| 1240 | Madhukar Parekh | madhukar-parekh-1 | age |
| 1241 | Qiu Guanghe & family | qiu-guanghe | age |
| 1243 | Ramon Ang | ramon-ang | age |
| 1244 | Howard Butt III & family | howard-butt-iii | age |
| 1245 | Stephen Butt & family | stephen-butt | age |
| 1246 | Mark Davis | mark-davis-1 | age |
| 1247 | Patrice Motsepe | patrice-motsepe | age |
| 1248 | Eduard Schleicher | eduard-schleicher | age |
| 1249 | Ursula Hutter-Schleicher | ursula-hutter-schleicher | age |
| 1252 | Roberto Hartono | roberto-hartono | age |
| 1253 | Stefanus Hartono | stefanus-hartono | age |
| 1254 | Tessa Natalia Hartono | tessa-natalia-hartono | age |
| 1255 | Vanessa Hartono | vanessa-hartono | age |
| 1256 | Akio Nitori | akio-nitori | age |
| 1257 | Udo Schütz & family | udo-schutz | age |
| 1259 | Alan Howard | alan-howard | age |
| 1260 | Shiv Kishan Agrawal | shiv-kishan-agrawal | age |
| 1261 | Lina Tombolato | lina-tombolato | age |
| 1262 | Marina Berlusconi | marina-berlusconi | age |
| 1263 | Pier Silvio Berlusconi | pier-silvio-berlusconi | age |
| 1264 | Jay Paul | jay-paul | age |
| 1266 | Catheline Perier D'Ieteren | catheline-perier-dieteren | age |
| 1267 | Neil Shen | neil-shen | age |
| 1269 | Georg von Opel | georg-von-opel | age |
| 1271 | Lawrence Golub | lawrence-golub | age |
| 1272 | Haim Saban | haim-saban | age |
| 1273 | Richard Chang | richard-chang | age |
| 1274 | Song Zuowen | song-zuowen | age |
| 1275 | Ren Yuanlin | ren-yuanlin | age |
| 1276 | Christian Haub | christian-haub | age |
| 1277 | Cui Lixin | cui-lixin | age |
| 1279 | Shlomo Eliahu | shlomo-eliahu | age |
| 1280 | Lucio Tan | lucio-tan | age |
| 1282 | Ramesh Juneja | ramesh-juneja | age |
| 1284 | Sam Gance | sam-gance | age |
| 1285 | Tse Ping & family | tse-ping | age |
| 1286 | John Pritzker | john-pritzker | age |
| 1287 | Alberto Palatchi | alberto-palatchi | age |
| 1289 | John Dorrance III | john-dorrance-iii | age |
| 1290 | Massimo Doris | massimo-doris | age |
| 1291 | Henry Laufer | henry-laufer | age |
| 1292 | Ralph Dommermuth | ralph-dommermuth | age |
| 1293 | Koos Bekker | koos-bekker | age |
| 1294 | Ben Navarro | ben-navarro | age |
| 1295 | Daniel Pritzker | daniel-pritzker | age |
| 1296 | Kim Jun-ki | kim-jun-ki | age |
| 1297 | Fabrizio Di Amato | fabrizio-di-amato | age |
| 1298 | Wang Yanqing | wang-yanqing | age |
| 1299 | William Chisholm | william-chisholm | age |
| 1301 | Senapathy Gopalakrishnan | senapathy-gopalakrishnan | age |
| 1302 | John Tyson & family | john-tyson | age |
| 1303 | Choo Chong Ngen | choo-chong-ngen | age |
| 1304 | Patrizio Vinciarelli | patrizio-vinciarelli | age |
| 1305 | Hiroshi Mikitani | hiroshi-mikitani | age |
| 1306 | Rajeev Juneja | rajeev-juneja | age |
| 1307 | Chan Tan Ching-fen | chan-tan-ching-fen | age |
| 1310 | Maritsa Lazari & family | maritsa-lazari | age |
| 1312 | Cai Dongchen | cai-dongchen | age |
| 1314 | Stephen Lansdown | stephen-lansdown | age |
| 1315 | D. Leopoldo Del Pino | d-leopoldo-del-pino | age |
| 1316 | Frank Love | frank-love | age |
| 1317 | Greg Love | greg-love | age |
| 1318 | Jenny Love Meyer | jenny-love-meyer | age |
| 1319 | Laura Love | laura-love | age |
| 1320 | Hsieh Wen-Ta | hsieh-wen-ta | age |
| 1321 | Tim Cook | tim-cook | age |
| 1322 | Eugene Murtagh | eugene-murtagh | age |
| 1323 | Richard Hayne & family | richard-hayne | age |
| 1324 | Sergei Galitsky | sergei-galitsky | age |
| 1326 | Liora Ofer | liora-ofer | age |
| 1327 | Gerald Ford | gerald-ford | age |
| 1330 | Deng Wen | deng-wen | age |
| 1333 | Kiran Mazumdar-Shaw | kiran-mazumdar-shaw | age |
| 1337 | Rajan Raheja & family | rajan-raheja | age |
| 1338 | Jerry Yang | jerry-yang | age |
| 1339 | Lin Jianhua | lin-jianhua | age |
| 1340 | Satyanarayana Chava | satyanarayana-chava | age |
| 1341 | Jiang Weiping & family | jiang-weiping | age |
| 1342 | George Argyros & family | george-argyros | age |
| 1344 | Theo Roussis | theo-roussis | age |
| 1345 | Denis O'Brien | denis-obrien | age |
| 1346 | Jamie Dimon | jamie-dimon | age |
| 1347 | Fernando Chico Pardo | fernando-chico-pardo | age |
| 1348 | Gerry Harvey | gerry-harvey | age |
| 1349 | Maja Oeri | maja-oeri | age |
| 1351 | Edward Bass | edward-bass | age |
| 1355 | Chen Fashu | chen-fashu | age |
| 1357 | John Paul DeJoria | john-paul-dejoria | age |
| 1358 | Feng Hailiang | feng-hailiang | age |
| 1360 | Roberto Irineu Marinho | roberto-irineu-marinho | age |
| 1361 | Mário Araripe | mario-araripe | age |
| 1362 | J. Tomilson Hill | j-tomilson-hill | age |
| 1363 | Park Hyeon-joo | park-hyeon-joo | age |
| 1365 | Arun Bharat Ram | arun-bharat-ram | age |
| 1366 | Wayne Rothbaum | wayne-rothbaum | age |
| 1368 | Kommer Damen | kommer-damen | age |
| 1370 | Urs Wietlisbach | urs-wietlisbach | age |
| 1371 | Jim Breyer | jim-breyer | age |
| 1372 | V. Prem Watsa | v-prem-watsa | age |
| 1374 | Richard Chandler | richard-chandler | age |
| 1375 | Alfred Gantner | alfred-gantner | age |
| 1376 | Marcel Erni | marcel-erni | age |
| 1377 | Augusto Perfetti | augusto-perfetti | age |
| 1378 | Michael S. Smith | michael-s-smith | age |
| 1379 | Brett Blundy | brett-blundy | age |
| 1380 | Barry Sternlicht | barry-sternlicht | age |
| 1381 | Anatoly Sedykh | anatoly-sedykh | age |
| 1383 | Lin Ming-hsiung | lin-ming-hsiung | age |
| 1384 | Henry Swieca | henry-swieca | age |
| 1385 | Anand Deshpande | anand-deshpande | age |
| 1387 | Alberto Siccardi & family | alberto-siccardi | age |
| 1388 | Jorge Mas | jorge-mas | age |
| 1389 | Dmitry Pumpyansky | dmitry-pumpyansky | age |
| 1390 | Qian Dongqi | qian-dongqi | age |
| 1391 | Lee Bass | lee-bass | age |
| 1392 | Remo Ruffini | remo-ruffini | age |
| 1394 | Beda Diethelm | beda-diethelm | age |
| 1395 | Frank Blase | frank-blase | age |
| 1396 | Li Hongxin & family | li-hongxin | age |
| 1397 | Robert Sands | robert-sands | age |
| 1398 | Kim Beom-su | kim-beom-su | age |
| 1399 | Xiang Guangda | xiang-guangda | age |
| 1400 | Peter Sondakh | peter-sondakh | age |
| 1402 | Jurgen Wirtgen | jurgen-wirtgen | age |
| 1404 | Ajay Bhardwaj | ajay-bhardwaj | age |
| 1405 | Nicolas Berggruen | nicolas-berggruen | age |
| 1406 | Marina Budiman | marina-budiman | age |
| 1407 | Arvind Poddar | arvind-poddar | age |
| 1408 | Scott Lin | scott-lin | age |
| 1410 | Timothy Springer | timothy-springer | age |
| 1411 | Jian Yao | jian-yao | age |
| 1412 | Gu Yuhua & family | gu-yuhua | age |
| 1413 | C.C. Leung | cc-leung | age |
| 1414 | Koo Bon-neung | koo-bon-neung | age |
| 1415 | John Krystynak | john-krystynak | age |
| 1416 | J. Hyatt Brown | j-hyatt-brown | age |
| 1418 | Raamdeo Agrawal | raamdeo-agrawal | age |
| 1419 | Harindarpal Banga | harindarpal-banga | age |
| 1420 | Charles Edelstenne & family | charles-edelstenne | age |
| 1421 | Lottie Tham & family | lottie-tham | age |
| 1422 | Don Levin | don-levin | age |
| 1425 | Julio Ponce Lerou | julio-ponce-lerou | age |
| 1426 | Glenn Dubin | glenn-dubin | age |
| 1430 | Jonathan Tisch | jonathan-tisch | age |
| 1431 | Shen Xiqiang & family | shen-xiqiang | age |
| 1433 | Lisa Su | lisa-su | age |
| 1434 | Sathien Sathientham | sathien-sathientham | age |
| 1435 | Stephen Deckoff | stephen-deckoff | age |
| 1436 | Safra Catz | safra-catz | age |
| 1437 | Marianna Latsis & family | marianna-latsis | age |
| 1438 | Gao Guangrong | gao-guangrong | age |
| 1440 | David Booth | david-booth | age |
| 1441 | Hal Jackman | hal-jackman | age |
| 1442 | Richard LeFrak & family | richard-lefrak | age |
| 1443 | Chen Kaixuan | chen-kaixuan | age |
| 1444 | Liang Xinjun | liang-xinjun | age |
| 1445 | Sylvan Adams | sylvan-adams | age |
| 1446 | Wu Guangming | wu-guangming | age |
| 1447 | Glen Taylor | glen-taylor | age |
| 1448 | Craig McCaw | craig-mccaw | age |
| 1449 | Mikhail Shelkov | mikhail-shelkov | age |
| 1450 | Philip Niarchos | philip-niarchos | age |
| 1453 | Richard Branson | richard-branson | age |
| 1454 | Mitchell Goldhar | mitchell-goldhar | age |
| 1455 | Wu Guanjiang & family | wu-guanjiang | age |
| 1456 | Jay-Z | jay-z | age |
| 1457 | Rufino Vigil Gonzalez | rufino-vigil-gonzalez | age |
| 1459 | Rajiv Jain | rajiv-jain | age |
| 1460 | Harsh Goenka | harsh-goenka | age |
| 1461 | Victor Pinchuk | victor-pinchuk | age |
| 1462 | T.Y. Tsai | ty-tsai | age |
| 1465 | Karin Sartorius-Herbst | karin-sartorius-herbst | age |
| 1466 | Luca Garavoglia | luca-garavoglia | age |
| 1468 | Lindsay Fox | lindsay-fox | age |
| 1469 | Shi Yuzhu | shi-yuzhu | age |
| 1470 | Larry Tanenbaum | larry-tanenbaum | age |
| 1471 | Brett Hildebrand | brett-hildebrand | age |
| 1473 | Jennifer Pritzker | jennifer-pritzker | age |
| 1476 | Mortimer Zuckerman | mortimer-zuckerman | age |
| 1477 | Adebayo Ogunlesi | adebayo-ogunlesi | age |
| 1478 | Amy Adams Strunk | amy-adams-strunk | age |
| 1479 | Gerald Frere | gerald-frere | age |
| 1480 | M.Satyanarayana Reddy | msatyanarayana-reddy | age |
| 1481 | Herb Chambers | herb-chambers | age |
| 1482 | Christian Latouche & family | christian-latouche | age |
| 1483 | Kwek Leng Kee | kwek-leng-kee | age |
| 1484 | Manohar Lal Agarwal | manohar-lal-agarwal | age |
| 1485 | Ferit Faik Sahenk | ferit-faik-sahenk | age |
| 1487 | Gudrun Heine | gudrun-heine | age |
| 1488 | Sybill Storz | sybill-storz | age |
| 1490 | David Dean Halbert | david-dean-halbert | age |
| 1491 | Hu Rongda & family | hu-rongda | age |
| 1493 | Kiril Domuschiev | kiril-domuschiev | age |
| 1494 | Joseph Edelman | joseph-edelman | age |
| 1495 | Marcel Herrmann Telles & family | marcel-herrmann-telles | age |
| 1496 | Fernando Roig | fernando-roig | age |
| 1497 | Barbara Tyson | barbara-tyson | age |
| 1498 | Martin Viessmann | martin-viessmann | age |
| 1499 | Kei Hoi Pang | kei-hoi-pang | age |
| 1500 | Ugo Gussalli Beretta & family | ugo-gussalli-beretta | age |
| 1501 | Wu Xiangdong | wu-xiangdong | age |
| 1502 | Kalanithi Maran | kalanithi-maran | age |
| 1503 | Sunil Vachani | sunil-vachani | age |
| 1504 | Peter Unger | peter-unger | age |
| 1505 | Lachhman Das Mittal | lachhman-das-mittal | age |
| 1507 | Bernard Lewis & family | bernard-lewis | age |
| 1508 | Xue Hua | xue-hua | age |
| 1509 | Aneel Bhusri | aneel-bhusri | age |
| 1510 | Farhad Moshiri | farhad-moshiri | age |
| 1511 | Bernard Saul II & family | bernard-saul-ii | age |
| 1512 | Stefan Olsson | stefan-olsson | age |
| 1513 | Susan Ocampo & family | susan-ocampo | age |
| 1515 | Bidzina Ivanishvili & family | bidzina-ivanishvili | age |
| 1516 | Tor Peterson | tor-peterson | age |
| 1517 | Wilhelm Beier & family | wilhelm-beier | age |
| 1518 | Arne Alexander Wilhelmsen | arne-alexander-wilhelmsen | age |
| 1519 | Bent Wilhelmsen | bent-wilhelmsen | age |
| 1520 | Peter Preben Wilhelmsen | peter-preben-wilhelmsen | age |
| 1521 | Pavel Baudis | pavel-baudis | age |
| 1522 | Jeff Sutton | jeff-sutton | age |
| 1523 | Bill Austin | bill-austin | age |
| 1525 | Xu Jinfu & family | xu-jinfu | age |
| 1526 | Michael Hintze | michael-hintze | age |
| 1527 | Sanjeev Bikhchandani | sanjeev-bikhchandani | age |
| 1528 | Chen Hua & family | chen-hua-1 | age |
| 1529 | John Abele & family | john-abele | age |
| 1530 | Lalit Khaitan | lalit-khaitan | age |
| 1531 | Ye Qiongjiu | ye-qiongjiu | age |
| 1533 | Surender Saluja | surender-saluja | age |
| 1535 | Devi Shetty | devi-shetty | age |
| 1536 | Gustavo Denegri & family | gustavo-denegri | age |
| 1537 | Oei Hong Leong | oei-hong-leong | age |
| 1538 | Jorge Perez | jorge-perez | age |
| 1539 | Anna Angelicoussis & family | anna-angelicoussis | age |
| 1540 | Cui Genliang | cui-genliang | age |
| 1542 | Jay Hennick | jay-hennick | age |
| 1545 | Bernard Ecclestone & family | bernard-ecclestone | age |
| 1546 | Walter P.J. Droege | walter-pj-droege | age |
| 1547 | Reid Hoffman | reid-hoffman | age |
| 1548 | Bertil Hult | bertil-hult | age |
| 1549 | Yoo Jung-hyun | yoo-jung-hyun | age |
| 1550 | Satish Mehta | satish-mehta | age |
| 1551 | Richard Sands | richard-sands | age |
| 1552 | Albert Chao & family | albert-chao | age |
| 1553 | Dorothy Chao Jenkins & family | dorothy-chao-jenkins | age |
| 1554 | James Chao & family | james-chao | age |
| 1555 | Jimmy John Liautaud | jimmy-john-liautaud | age |
| 1556 | Chao Teng-hsiung | chao-teng-hsiung | age |
| 1557 | Douglas Hsu | douglas-hsu | age |
| 1558 | Tang Yiu | tang-yiu | age |
| 1559 | Dewi Kam | dewi-kam | age |
| 1560 | Manuel Puig Rocha | manuel-puig-rocha | age |
| 1561 | Mathias Doepfner | mathias-doepfner | age |
| 1563 | Jack Cowin | jack-cowin | age |
| 1567 | Alan Trefler | alan-trefler | age |
| 1569 | Gurbachan Singh Dhingra | gurbachan-singh-dhingra | age |
| 1570 | Kuldip Singh Dhingra | kuldip-singh-dhingra | age |
| 1571 | Stephan Schmidheiny | stephan-schmidheiny | age |
| 1572 | Hu Kaijun | hu-kaijun | age |
| 1573 | William Young | william-young | age |
| 1574 | William Foley II | william-foley-ii | age |
| 1575 | Bruce Karsh | bruce-karsh | age |
| 1576 | Semahat Sevim Arsel | semahat-sevim-arsel | age |
| 1577 | Stephan Crétier | stephan-cretier | age |
| 1578 | Sun Shoukuan | sun-shoukuan | age |
| 1579 | Bennett Dorrance | bennett-dorrance | age |
| 1580 | Jaroslav Hascak & family | jaroslav-hascak | age |
| 1581 | Gabriele Gebauer | gabriele-gebauer | age |
| 1582 | Robert G. Miller | robert-g-miller | age |
| 1583 | Roger Wang | roger-wang | age |
| 1584 | Filiz Sahenk | filiz-sahenk | age |
| 1585 | Kathy Britton | kathy-britton | age |
| 1586 | Roy Carroll II | roy-carroll-ii | age |
| 1587 | Alexander Svetakov | alexander-svetakov | age |
| 1588 | Ni Zugen | ni-zugen | age |
| 1589 | Mi Enhua | mi-enhua | age |
| 1590 | David Golub | david-golub | age |
| 1591 | Ye Chenghai & family | ye-chenghai | age |
| 1593 | Nandan Nilekani | nandan-nilekani | age |
| 1595 | Timm Oberwelland | timm-oberwelland | age |
| 1596 | William Boyd & family | william-boyd | age |
| 1597 | Dmitry Mazepin | dmitry-mazepin | age |
| 1600 | Jannie Mouton & family | jannie-mouton | age |
| 1601 | Madeleine Grogg | madeleine-grogg | age |
| 1602 | Tom Ford | tom-ford-1 | age |
| 1603 | Lirio Parisotto | lirio-parisotto | age |
| 1604 | Phillip Frost | phillip-frost | age |
| 1605 | Alexander Frolov | alexander-frolov | age |
| 1606 | Luo Liguo & family | luo-liguo | age |
| 1607 | Thomas Kwok | thomas-kwok | age |
| 1608 | Yusuf Hamied | yusuf-hamied | age |
| 1609 | Hussain Binghatti Aljbori | hussain-binghatti-aljbori | age |
| 1610 | Motilal Oswal | motilal-oswal | age |
| 1611 | Prem Kumar Arora | prem-kumar-arora | age |
| 1615 | Henry Davis | henry-davis | age |
| 1616 | Alessandra Garavoglia | alessandra-garavoglia | age |
| 1617 | Hans-Werner Hector | hans-werner-hector | age |
| 1620 | Zhang Li | zhang-li | age |
| 1621 | Brian Hill | brian-hill | age |
| 1622 | Guo Guangchang | guo-guangchang | age |
| 1624 | Michael Polsky | michael-polsky | age |
| 1625 | Robert Langer | robert-langer | age |
| 1626 | Wu Kai | wu-kai | age |
| 1627 | Zadik Bino & family | zadik-bino | age |
| 1628 | Abdullah bin Sulaiman Al Rajhi | abdullah-bin-sulaiman-al-rajhi | age |
| 1630 | Chen Tei-fu | chen-tei-fu | age |
| 1631 | Kenneth Feld & family | kenneth-feld | age |
| 1632 | Yasuhiro Fukushima | yasuhiro-fukushima | age |
| 1633 | Dwight Schar | dwight-schar | age |
| 1634 | Carmen Daurella Aguilera | carmen-daurella-aguilera | age |
| 1635 | Hans Georg Naeder & family | hans-georg-naeder | age |
| 1637 | Jim Crane | jim-crane | age |
| 1638 | Charles Bronfman | charles-bronfman | age |
| 1639 | Sam Chong | sam-chong | age |
| 1640 | Huang Xiaofen & family | huang-xiaofen | age |
| 1642 | F.C. Tseng | fc-tseng | age |
| 1645 | Kenneth Hao | kenneth-hao | age |
| 1646 | Daniel Rocher | daniel-rocher | age |
| 1648 | Mike Repole | mike-repole | age |
| 1649 | K.C. Liu | kc-liu | age |
| 1650 | Keith Bentley & family | keith-bentley | age |
| 1653 | Zhao Yan | zhao-yan | age |
| 1656 | Zhuo Jun | zhuo-jun-1 | age |
| 1657 | Alexander Skorobogatko | alexander-skorobogatko | age |
| 1658 | Robert Friedland | robert-friedland | age |
| 1659 | Zhao Fenggang | zhao-fenggang | age |
| 1660 | Huijiao Yu | huijiao-yu | age |
| 1661 | Thomas Steyer | thomas-steyer | age |
| 1662 | Wee Ee Cheong | wee-ee-cheong | age |
| 1663 | Andreas Pohl | andreas-pohl | age |
| 1664 | Wesley Edens | wesley-edens | age |
| 1666 | Emad Al Muhaidib | emad-al-muhaidib-1 | age |
| 1667 | Hiroshi Ishibashi | hiroshi-ishibashi | age |
| 1668 | John Stanton | john-stanton | age |
| 1669 | Ge Weidong | ge-weidong | age |
| 1670 | Li Zhenguo & family | li-zhenguo-1 | age |
| 1671 | Dennis Gillings | dennis-gillings | age |
| 1673 | Hao Hong | hao-hong | age |
| 1674 | James Dinan | james-dinan | age |
| 1675 | Sheryl Sandberg | sheryl-sandberg | age |
| 1676 | Alec Gores | alec-gores | age |
| 1677 | Xiao Hongxing & family | xiao-hongxing | age |
| 1678 | Haryanto Tjiptodihardjo | haryanto-tjiptodihardjo | age |
| 1679 | Shlomo Kramer | shlomo-kramer | age |
| 1680 | Francois Feuillet & family | francois-feuillet | age |
| 1681 | Zhang Jian | zhang-jian | age |
| 1682 | Qi Jinxing | qi-jinxing | age |
| 1683 | Pavan Jain | pavan-jain | age |
| 1684 | Zhang Gongyun | zhang-gongyun | age |
| 1685 | Steven Witkoff & family | steven-witkoff | age |
| 1686 | Julio Bozano | julio-bozano | age |
| 1687 | Wei Ing-Chou | wei-ing-chou | age |
| 1688 | Wei Yin-Chun | wei-yin-chun | age |
| 1689 | Wei Yin-Heng | wei-yin-heng | age |
| 1690 | Wei Ying-Chiao | wei-ying-chiao | age |
| 1691 | Ron Sim | ron-sim | age |
| 1692 | Wu Yiling | wu-yiling | age |
| 1693 | Steven Schonfeld | steven-schonfeld | age |
| 1694 | Tran Dinh Long | tran-dinh-long | age |
| 1695 | Sylvia Stroeher | sylvia-stroeher | age |
| 1701 | Alfredo Egydio Arruda Villela Filho | alfredo-egydio-arruda-villela-filho | age |
| 1703 | Cynthia Helena Grossman Fleishman | cynthia-helena-grossman-fleishman | age |
| 1704 | Nicola Leibinger-Kammueller | nicola-leibinger-kammueller | age |
| 1705 | Peter Leibinger | peter-leibinger | age |
| 1706 | Regine Leibinger | regine-leibinger | age |
| 1707 | Asok Kumar Hiranandani | asok-kumar-hiranandani | age |
| 1709 | Huang Xiaolei | huang-xiaolei | age |
| 1710 | Or Wai Sheun | or-wai-sheun | age |
| 1711 | Xu Shugen | xu-shugen | age |
| 1712 | Petter Stordalen & family | petter-stordalen | age |
| 1713 | Tomas Chrenek Sr & family | tomas-chrenek-sr | age |
| 1716 | Zhang Jianzhong | zhang-jianzhong | age |
| 1717 | Alex Beard | alex-beard | age |
| 1718 | Steven Sarowitz | steven-sarowitz | age |
| 1719 | Michael Ying | michael-ying | age |
| 1720 | Igor Makarov | igor-makarov | age |
| 1721 | Joe Lacob | joe-lacob | age |
| 1722 | Steve Case | steve-case | age |
| 1723 | Alberto Bombassei | alberto-bombassei | age |
| 1724 | Leng Youbin | leng-youbin | age |
| 1725 | Herbert Allen Jr & family | herbert-allen-jr | age |
| 1728 | Kamal Ghaffarian | kamal-ghaffarian | age |
| 1730 | Todd Wagner | todd-wagner | age |
| 1731 | Leslie Alexander | leslie-alexander | age |
| 1732 | John Oyler | john-oyler | age |
| 1733 | David Fong | david-fong-1 | age |
| 1734 | Natacha Nikolajevic | natacha-nikolajevic | age |
| 1735 | Daniel Lubetzky | daniel-lubetzky | age |
| 1736 | Zygmunt Solorz & family | zygmunt-solorz | age |
| 1737 | Serge Godin | serge-godin | age |
| 1739 | Hamdi Akin & family | hamdi-akin | age |
| 1740 | Rishad Naoroji | rishad-naoroji | age |
| 1742 | Alexander Ponomarenko | alexander-ponomarenko | age |
| 1744 | David Grain | david-grain | age |
| 1749 | Sun Weijie | sun-weijie-1 | age |
| 1750 | Rolf Gerling | rolf-gerling | age |
| 1751 | Tim Draper | tim-draper | age |
| 1752 | Alexandra Daitch | alexandra-daitch | age |
| 1753 | Jerry Reinsdorf | jerry-reinsdorf | age |
| 1754 | Lucy Stitzer | lucy-stitzer | age |
| 1755 | Sarah MacMillan | sarah-macmillan | age |
| 1758 | George Alexander Muthoot | george-alexander-muthoot | age |
| 1759 | George Jacob Muthoot | george-jacob-muthoot | age |
| 1760 | George Thomas Muthoot | george-thomas-muthoot | age |
| 1761 | Sara George Muthoot | sara-george-muthoot | age |
| 1763 | Rita Tong Liu | rita-tong-liu | age |
| 1764 | Yao Liangsong | yao-liangsong | age |
| 1765 | Jiang Yintai & family | jiang-yintai | age |
| 1766 | Cho Hyun-joon | cho-hyun-joon | age |
| 1767 | Ajay Parekh | ajay-parekh | age |
| 1769 | Reinfried Pohl Jr | reinfried-pohl-jr | age |
| 1774 | Li Rucheng | li-rucheng | age |
| 1777 | Nicola Bulgari | nicola-bulgari | age |
| 1779 | Edwin Leong | edwin-leong | age |
| 1780 | Noubar Afeyan | noubar-afeyan | age |
| 1781 | Bahaa Hariri | bahaa-hariri | age |
| 1782 | Liu Fangyi | liu-fangyi | age |
| 1784 | Narendrakumar Parekh | narendrakumar-parekh | age |
| 1785 | B. Wayne Hughes Jr | b-wayne-hughes-jr | age |
| 1786 | Essam Al Muhaidib | essam-al-muhaidib-1 | age |
| 1787 | Sulaiman Al Muhaidib | sulaiman-al-muhaidib-1 | age |
| 1790 | Manuel Villar | manuel-villar | age |
| 1791 | Bent Jensen & Family | bent-jensen-family | age |
| 1793 | Liu Gexin & family | liu-gexin | age |
| 1794 | Leonard Abess | leonard-abess | age |
| 1795 | Luis Enrique Yarur Rey | luis-enrique-yarur-rey | age |
| 1796 | Chen Jinxia | chen-jinxia | age |
| 1797 | Mustafa Rahmi Koc | mustafa-rahmi-koc | age |
| 1798 | Mika Anttonen | mika-anttonen | age |
| 1799 | Han Arming Hanafia | han-arming-hanafia | age |
| 1800 | Noam Gottesman | noam-gottesman | age |
| 1801 | Fan Xiulian | fan-xiulian | age |
| 1804 | Constantinos Martinos & family | constantinos-martinos | age |
| 1805 | Inder Jaisinghani | inder-jaisinghani-1 | age |
| 1806 | Clayton Zekelman | clayton-zekelman | age |
| 1807 | Bill Malhotra | bill-malhotra | age |
| 1808 | Catherine Phillips | catherine-phillips | age |
| 1809 | John Phillips | john-phillips | age |
| 1810 | Lin Lairong & family | lin-lairong | age |
| 1811 | Alfred West Jr | alfred-west-jr | age |
| 1812 | Stephen Rubin & family | stephen-rubin | age |
| 1813 | Hans Jakob Limbach | hans-jakob-limbach-1 | age |
| 1814 | Per Sandberg | per-sandberg | age |
| 1815 | Wee Ee Lim | wee-ee-lim | age |
| 1816 | Sergei Studennikov & family | sergei-studennikov | age |
| 1817 | Jupally Rameshwar Rao | jupally-rameshwar-rao | age |
| 1819 | Irving Grousbeck & family | irving-grousbeck | age |
| 1820 | Domenico Dolce | domenico-dolce | age |
| 1821 | Stefano Gabbana | stefano-gabbana | age |
| 1822 | Manfredi Lefebvre d'Ovidio & family | manfredi-lefebvre-dovidio | age |
| 1823 | Anu Aga | anu-aga | age |
| 1824 | Jim Thompson & family | jim-thompson | age |
| 1825 | Jerry Speyer & family | jerry-speyer | age |
| 1826 | Carl Icahn | carl-icahn | age |
| 1827 | Maren Otto | maren-otto | age |
| 1828 | Howard Marks | howard-marks | age |
| 1829 | Chung Yong-jin | chung-yong-jin | age |
| 1830 | Pierre van der Mersch & family | pierre-van-der-mersch | age |
| 1831 | Gordon Wu | gordon-wu | age |
| 1832 | Ion Tiriac | ion-tiriac | age |
| 1834 | Zhu Xingming | zhu-xingming | age |
| 1835 | Dermot Desmond | dermot-desmond | age |
| 1840 | Christine Knauf | christine-knauf | age |
| 1841 | Karl Knauf | karl-knauf | age |
| 1842 | Wang Changtian | wang-changtian | age |
| 1845 | Anurang Jain | anurang-jain-1 | age |
| 1846 | Bob Ell | bob-ell | age |
| 1848 | Karl Scheufele III & family | karl-scheufele-iii | age |
| 1850 | Katsumi Tada | katsumi-tada | age |
| 1851 | Enrique Coppel Luken | enrique-coppel-luken | age |
| 1852 | Huang Jiangji | huang-jiangji | age |
| 1853 | Jayme Garfinkel & family | jayme-garfinkel | age |
| 1854 | John Armitage | john-armitage | age |
| 1855 | Christine Franken & family | christine-franken-family | age |
| 1856 | Ulrike Baro | ulrike-baro | age |
| 1857 | Koh Wee Meng | koh-wee-meng | age |
| 1858 | Jerry Moyes & family | jerry-moyes | age |
| 1859 | Roberto Hernandez Ramirez | roberto-hernandez-ramirez | age |
| 1860 | Frank Laukien | frank-laukien | age |
| 1861 | Linda Pritzker | linda-pritzker | age |
| 1862 | Timothy Boyle | timothy-boyle | age |
| 1866 | Marc Lasry | marc-lasry | age |
| 1867 | Edward Lampert | edward-lampert | age |
| 1868 | Ramesh Jaisinghani | ramesh-jaisinghani | age |
| 1870 | Masaaki Arai | masaaki-arai | age |
| 1871 | Katharina Otto-Bernstein | katharina-otto-bernstein | age |
| 1872 | Fiona Geminder | fiona-geminder | age |
| 1873 | Ajay Jaisinghani | ajay-jaisinghani | age |
| 1874 | Larry Robbins | larry-robbins | age |
| 1875 | Bruce Toll | bruce-toll | age |
| 1877 | Nicholas Pritzker | nicholas-pritzker | age |
| 1878 | Heikki Kyostila | heikki-kyostila | age |
| 1879 | Xie Liangzhi & family | xie-liangzhi | age |
| 1880 | Liang Feng | liang-feng | age |
| 1882 | Phongthep Chiaravanont | phongthep-chiaravanont | age |
| 1883 | Danna Azrieli | danna-azrieli | age |
| 1884 | Naomi Azrieli | naomi-azrieli | age |
| 1885 | Sharon Azrieli | sharon-azrieli | age |
| 1887 | Wichai Thongtang | wichai-thongtang | age |
| 1888 | Doug Ostrover | doug-ostrover | age |
| 1890 | Arnout Schuijff | arnout-schuijff | age |
| 1891 | Vladislav Filev & family | vladislav-filev | age |
| 1892 | Strive Masiyiwa | strive-masiyiwa | age |
| 1893 | Joaquin del Pino y Calvo-Sotelo | joaquin-del-pino-y-calvo-sotelo | age |
| 1894 | John de Mol | john-de-mol | age |
| 1895 | Zhao Lixin | zhao-lixin | age |
| 1896 | Alicia Koplowitz | alicia-koplowitz | age |
| 1899 | Solina Chau | solina-chau | age |
| 1902 | Dong Zengping | dong-zengping | age |
| 1903 | Manas Chiaravanond | manas-chiaravanond | age |
| 1904 | Kishore Jain | kishore-jain | age |
| 1905 | John Liew | john-liew | age |
| 1907 | Basudeo Singh | basudeo-singh | age |
| 1908 | Somsri Lamsam | somsri-lamsam | age |
| 1910 | Walter Wang | walter-wang-1 | age |
| 1911 | Archie Hwang | archie-hwang | age |
| 1913 | Chu Lam Yiu | chu-lam-yiu | age |
| 1914 | Vasily Anisimov | vasily-anisimov | age |
| 1915 | Bennett Rosenthal | bennett-rosenthal | age |
| 1917 | Laurie Tisch | laurie-tisch | age |
| 1918 | Steven Tisch | steven-tisch | age |
| 1919 | Prathip Chiravanond | prathip-chiravanond | age |
| 1922 | Chen Qiongxiang | chen-qiongxiang | age |
| 1923 | Gerda Tschira | gerda-tschira | age |
| 1925 | Udo Tschira | udo-tschira | age |
| 1926 | Gavril Yushvaev & family | gavril-yushvaev | age |
| 1927 | Zhang Fan | zhang-fan | age |
| 1928 | Ishay Davidi | ishay-davidi | age |
| 1929 | Henry Sy Jr | henry-sy-jr | age |
| 1930 | Manuel Arango Arias | manuel-arango-arias | age |
| 1938 | Johnny Ho | johnny-ho | age |
| 1940 | Zhao Lidong | zhao-lidong | age |
| 1944 | Solomon Lew | solomon-lew | age |
| 1945 | Mario Gabelli | mario-gabelli | age |
| 1946 | Larry Connor | larry-connor | age |
| 1947 | Athanasios Martinos & family | athanasios-martinos | age |
| 1948 | Daniel Hirschfeld | daniel-hirschfeld | age |
| 1949 | Simon Nixon | simon-nixon | age |
| 1950 | Lai Guogui & family | lai-guogui | age |
| 1952 | Manuel Lao Hernández & family | manuel-lao-hernandez | age |
| 1953 | Wu Shaoxun | wu-shaoxun | age |
| 1955 | J. Frank Harrison III & family | j-frank-harrison-iii | age |
| 1956 | Binod Chaudhary | binod-chaudhary | age |
| 1958 | Agoes Projosasmito | agoes-projosasmito | age |
| 1959 | Luciano Hang | luciano-hang | age |
| 1961 | Alexandre Grendene Bartelle | alexandre-grendene-bartelle | age |
| 1962 | George Yancopoulos | george-yancopoulos | age |
| 1963 | John Bloor | john-bloor | age |
| 1964 | Paul Saville | paul-saville | age |
| 1965 | Zhang Yuqiang | zhang-yuqiang | age |
| 1966 | Thomas Mueller | thomas-mueller | age |
| 1967 | Barbara Banke & family | barbara-banke-1 | age |
| 1968 | Lam Kong | lam-kong | age |
| 1970 | Koo Bon-sik | koo-bon-sik | age |
| 1971 | Randal J. Kirk | randal-j-kirk | age |
| 1974 | Dragos Paval | dragos-paval | age |
| 1975 | K. Dinesh | k-dinesh | age |
| 1976 | Wu Yingming | wu-yingming | age |
| 1980 | Abdullah Al Othaim | abdullah-al-othaim | age |
| 1981 | Ilkka Herlin | ilkka-herlin | age |
| 1984 | Tom Werner | tom-werner-1 | age |
| 1985 | Vadim Yakunin | vadim-yakunin | age |
| 1986 | Huang Xu | huang-xu | age |
| 1987 | Raj Sardana | raj-sardana | age |
| 1988 | Barry Bentley & family | barry-bentley | age |
| 1989 | Richard Fortin | richard-fortin | age |
| 1990 | Dan Wilks | dan-wilks | age |
| 1991 | Hu Yangzhong | hu-yangzhong | age |
| 1992 | Ron Corio | ron-corio | age |
| 1994 | Eugene Kaspersky | eugene-kaspersky | age |
| 1995 | Marek Dospiva | marek-dospiva | age |
| 1996 | Fang Hongbo | fang-hongbo | age |
| 1997 | Michael Hsing | michael-hsing | age |
| 1998 | Bhadresh Shah | bhadresh-shah | age |
| 1999 | Tony Chen | tony-chen | age |
| 2000 | Stephen Orenstein & family | stephen-orenstein | age |
| 2001 | Yao Kuizhang | yao-kuizhang | age |
| 2002 | Arvind Lal | arvind-lal | age |
| 2003 | Alex Birkenstock | alex-birkenstock | age |
| 2004 | Art Levinson | art-levinson | age |
| 2005 | Monica Crippa | monica-crippa-1 | age |
| 2007 | Long Wan | long-wan | age |
| 2008 | Avram Glazer | avram-glazer | age |
| 2009 | Bryan Glazer | bryan-glazer | age |
| 2010 | Darcie Glazer Kassewitz | darcie-glazer-kassewitz | age |
| 2011 | Edward Glazer | edward-glazer | age |
| 2012 | Joel Glazer | joel-glazer | age |
| 2013 | Kevin Glazer | kevin-glazer | age |
| 2014 | Alan Wilson | alan-wilson | age |
| 2015 | Bruce Wilson | bruce-wilson | age |
| 2016 | John Wilson | john-wilson | age |
| 2017 | Bill Gross | bill-gross | age |
| 2018 | G. Rajendran | g-rajendran | age |
| 2019 | Michael Ashcroft | michael-ashcroft | age |
| 2020 | David Walentas | david-walentas | age |
| 2021 | Carmen Riu Guell | carmen-riu-guell | age |
| 2022 | Luis Riu | luis-riu | age |
| 2024 | Li Jianquan & family | li-jianquan | age |
| 2025 | David Kabiller | david-kabiller | age |
| 2026 | Clark Hunt & family | clark-hunt | age |
| 2028 | Lamar Hunt Jr & family | lamar-hunt-jr | age |
| 2029 | Sharron Hunt & family | sharron-hunt | age |
| 2030 | Alex Bouzari | alex-bouzari | age |
| 2031 | Joseph 'Pitt'  Reeves Hyde III | joseph-pitt-reeves-hyde-iii | age |
| 2032 | Oren Zeev | oren-zeev | age |
| 2033 | Paul Bloch | paul-bloch | age |
| 2034 | Sam Goi | sam-goi | age |
| 2037 | Gary Chouest & family | gary-chouest | age |
| 2038 | David Lichtenstein | david-lichtenstein | age |
| 2040 | Gregg Hymowitz | gregg-hymowitz | age |
| 2042 | Helena Revoredo & family | helena-revoredo | age |
| 2043 | Hans-Ueli Rihs & family | hans-ueli-rihs | age |
| 2044 | Yuri Kovalchuk & family | yuri-kovalchuk | age |
| 2045 | Nicholas Howley | nicholas-howley | age |
| 2046 | Gan Zhongru | gan-zhongru | age |
| 2047 | Huang Zhenda & family | huang-zhenda | age |
| 2050 | Hemendra Kothari | hemendra-kothari | age |
| 2051 | Joe Rogers Jr | joe-rogers-jr | age |
| 2053 | Carsten Maschmeyer | carsten-maschmeyer | age |
| 2054 | Vivek Chand Burman | vivek-chand-burman | age |
| 2055 | Du Jinhao | du-jinhao | age |
| 2056 | Mrudula Parekh | mrudula-parekh | age |
| 2057 | Amjad Masad | amjad-masad | age |
| 2058 | Peter Sperling | peter-sperling | age |
| 2060 | P.V. Krishna Reddy | pv-krishna-reddy | age |
| 2063 | Bina Chhabria | bina-chhabria | age |
| 2064 | Alan Miller & family | alan-miller-1 | age |
| 2065 | Sandeep Engineer | sandeep-engineer | age |
| 2066 | Sun Mengquan & family | sun-mengquan | age |
| 2067 | Peter Jackson | peter-jackson | age |
| 2068 | Anju Agarwal | anju-agarwal | age |
| 2069 | Ke Zunhong & family | ke-zunhong | age |
| 2074 | Mitchell Jacobson | mitchell-jacobson | age |
| 2075 | Ilona Herlin | ilona-herlin | age |
| 2076 | Nerio Alessandri | nerio-alessandri | age |
| 2077 | Abdullah Amer Al Nahdi | abdullah-amer-al-nahdi | age |
| 2079 | Geoffrey Palmer | geoffrey-palmer | age |
| 2080 | Willis Johnson | willis-johnson | age |
| 2082 | William Koch | william-koch | age |
| 2084 | Christopher Goldsbury | christopher-goldsbury | age |
| 2085 | Shi Yonghong & family | shi-yonghong | age |
| 2086 | Zhu Gongshan & family | zhu-gongshan | age |
| 2091 | Mark Coombs | mark-coombs | age |
| 2092 | Wenaas Lars | wenaas-lars | age |
| 2093 | Drorit Wertheim | drorit-wertheim | age |
| 2094 | Richard Desmond | richard-desmond | age |
| 2095 | David Kaplan | david-kaplan | age |
| 2096 | Yves-Loic Martin | yves-loic-martin | age |
| 2097 | Pan Dong | pan-dong-1 | age |
| 2098 | Sue Gross | sue-gross | age |
| 2099 | Ivan Chrenko | ivan-chrenko | age |
| 2100 | Angela Leong | angela-leong | age |
| 2101 | Airat Shaimiev | airat-shaimiev | age |
| 2102 | Yang Yuanqing | yang-yuanqing | age |
| 2103 | Ren Jinsheng & family | ren-jinsheng | age |
| 2104 | Hong Jie | hong-jie | age |
| 2106 | Pantaleo Dell'Orco | pantaleo-dellorco | age |
| 2107 | Hisao Nagata | hisao-nagata | age |
| 2108 | David Fattal & family | david-fattal | age |
| 2109 | Mark Attanasio | mark-attanasio | age |
| 2110 | Gideon Hamburger | gideon-hamburger | age |
| 2111 | Nurit Manor | nurit-manor | age |
| 2112 | Yair Hamburger | yair-hamburger | age |
| 2113 | Martine Rothblatt | martine-rothblatt | age |
| 2114 | Boris Zingarevich | boris-zingarevich | age |
| 2115 | Alain Taravella | alain-taravella | age |
| 2116 | Paolo Bulgari | paolo-bulgari | age |
| 2118 | Yao Hsiao Tung | yao-hsiao-tung | age |
| 2120 | James Tisch | james-tisch | age |
| 2124 | Oleg Boyko | oleg-boyko | age |
| 2125 | Alberto Alcocer | alberto-alcocer | age |
| 2126 | Ronald Clarke | ronald-clarke | age |
| 2127 | Wang Jianfeng & family | wang-jianfeng | age |
| 2128 | Wee Ee Chao | wee-ee-chao | age |
| 2129 | P.P. Reddy | pp-reddy | age |
| 2131 | Christoph Henkel | christoph-henkel | age |
| 2132 | Alberto Prada | alberto-prada | age |
| 2133 | Marina Prada | marina-prada | age |
| 2140 | Robert Miller | robert-miller | age |
| 2141 | Xu Yingzhuo | xu-yingzhuo | age |
| 2142 | Mustafa Kucuk | mustafa-kucuk | age |
| 2143 | Farris Wilks | farris-wilks | age |
| 2144 | Shu Ping | shu-ping | age |
| 2145 | Zhao Tao | zhao-tao | age |
| 2146 | Masateru Uno & family | masateru-uno | age |
| 2147 | John Goff | john-goff | age |
| 2148 | Pawan Munjal | pawan-munjal-1 | age |
| 2150 | Conni Jonsson | conni-jonsson | age |
| 2151 | John Van Lieshout | john-van-lieshout | age |
| 2152 | Chen Jiancheng | chen-jiancheng | age |
| 2153 | Saroj Rani Gupta | saroj-rani-gupta | age |
| 2154 | Sandor Csanyi | sandor-csanyi | age |
| 2155 | Ruan Shuilong & family | ruan-shuilong | age |
| 2157 | Philippe Ginestet & family | philippe-ginestet | age |
| 2158 | Terry Taylor | terry-taylor | age |
| 2159 | Akirov Alfred | akirov-alfred | age |
| 2160 | Wang Junshi & family | wang-junshi | age |
| 2162 | Itzhak Ezratti & family | itzhak-ezratti | age |
| 2163 | Mariarosa Lavelli | mariarosa-lavelli | age |
| 2165 | Jim McKelvey | jim-mckelvey | age |
| 2166 | Zakhar Smushkin | zakhar-smushkin | age |
| 2171 | Jean-Pierre Cayard & family | jean-pierre-cayard | age |
| 2172 | Kie Chie Wong | kie-chie-wong | age |
| 2175 | Premchand Godha | premchand-godha | age |
| 2177 | Zhang Xiaojuan | zhang-xiaojuan | age |
| 2178 | Rafique Malik | rafique-malik | age |
| 2180 | Alan Zekelman | alan-zekelman | age |
| 2181 | Mehmet Ali Aydinlar | mehmet-ali-aydinlar | age |
| 2182 | Alfred Oetker | alfred-oetker | age |
| 2184 | Jeffrey Michael & family | jeffrey-michael | age |
| 2185 | James Leininger | james-leininger | age |
| 2186 | Alfons Doblinger | alfons-doblinger | age |
| 2187 | Philip O'Doherty | philip-odoherty | age |
| 2188 | Sandro Veronesi & family | sandro-veronesi | age |
| 2192 | Girdhari Lal Bawri | girdhari-lal-bawri | age |
| 2193 | Wang Wenmo | wang-wenmo | age |
| 2196 | Hui Wing Mau | hui-wing-mau | age |
| 2197 | Barbara Benetton | barbara-benetton | age |
| 2199 | Jon Winkelried | jon-winkelried | age |
| 2200 | Yeh Kuo-I | yeh-kuo-i | age |
| 2201 | Christoffel Wiese | christoffel-wiese | age |
| 2204 | Stephane Bonvin | stephane-bonvin | age |
| 2205 | Fan Daidi | fan-daidi | age |
| 2206 | Elisabeth Douglas | elisabeth-douglas | age |
| 2207 | Deng Weiming & family | deng-weiming | age |
| 2208 | Olivia Holding | olivia-holding-1 | age |
| 2210 | Ashwin Desai | ashwin-desai | age |
| 2211 | Annika Bootsman Kleberg | annika-bootsman-kleberg | age |
| 2212 | Jonas Kleberg | jonas-kleberg | age |
| 2214 | Chirayu Amin | chirayu-amin | age |
| 2215 | Jitendra Virwani | jitendra-virwani | age |
| 2216 | Zhou Xiaoping | zhou-xiaoping-1 | age |
| 2217 | David Paul | david-paul | age |
| 2218 | R.G. Chandramogan | rg-chandramogan | age |
| 2219 | Mehmet Sinan & Family Tara | mehmet-sinan-family-tara | age |
| 2220 | Holger Loclair | holger-loclair | age |
| 2221 | Diona Teh Li Shian | diona-teh-li-shian | age |
| 2222 | Lillian Teh Li Ming | lillian-teh-li-ming | age |
| 2223 | Lillyn Teh Li Hua | lillyn-teh-li-hua | age |
| 2224 | William Teh Lee Pang | william-teh-lee-pang | age |
| 2225 | Wang Wenjing | wang-wenjing | age |
| 2226 | Weng Xianding | weng-xianding | age |
| 2227 | Liang Guangwei | liang-guangwei | age |
| 2228 | Chey Ki-won | chey-ki-won | age |
| 2229 | Harald Link | harald-link | age |
| 2230 | Youssef Mansour | youssef-mansour | age |
| 2231 | Girdhari Jaisinghani | girdhari-jaisinghani | age |
| 2233 | Horst Wortmann & family | horst-wortmann | age |
| 2234 | Massimo Moratti | massimo-moratti | age |
| 2235 | Charlotte Colket Weber | charlotte-colket-weber | age |
| 2236 | Marius Nacht | marius-nacht | age |
| 2237 | Sergei Katsiev | sergei-katsiev | age |
| 2238 | Suman Munjal | suman-munjal | age |
| 2240 | Kwee Liong Keng | kwee-liong-keng | age |
| 2241 | Kwee Liong Phing | kwee-liong-phing | age |
| 2242 | Kwee Liong Seen | kwee-liong-seen | age |
| 2243 | Kwee Liong Tek | kwee-liong-tek | age |
| 2244 | James Reyes | james-reyes | age |
| 2245 | Thomas Reyes | thomas-reyes | age |
| 2246 | Lesley Bamberger | lesley-bamberger | age |
| 2247 | Azad Moopen | azad-moopen | age |
| 2248 | Alexander Tkachev | alexander-tkachev | age |
| 2249 | Forrest Preston | forrest-preston | age |
| 2250 | Grigory Berezkin | grigory-berezkin | age |
| 2252 | Brian Higgins | brian-higgins | age |
| 2253 | Gerry Cardinale | gerry-cardinale | age |
| 2255 | O. Francis Biondi | o-francis-biondi | age |
| 2256 | Timothy Dunn & family | timothy-dunn | age |
| 2258 | Fumio Kaneko | fumio-kaneko | age |
| 2259 | Edir Macedo & family | edir-macedo | age |
| 2260 | Renu Munjal | renu-munjal | age |
| 2261 | Stanley Hubbard | stanley-hubbard | age |
| 2263 | Walter Kortschak | walter-kortschak | age |
| 2265 | Shao Qinxiang | shao-qinxiang | age |
| 2266 | Cheng Zhenghui | cheng-zhenghui | age |
| 2267 | Thierry Cruanes | thierry-cruanes | age |
| 2268 | Li Liangbin | li-liangbin | age |
| 2269 | Banwari Lal Bawri | banwari-lal-bawri | age |
| 2271 | Robert Fisher | robert-fisher | age |
| 2272 | Radik Shaimiev | radik-shaimiev | age |
| 2273 | William Lauder | william-lauder | age |
| 2274 | Wei Huang | wei-huang | age |
| 2275 | Bernd Freier | bernd-freier | age |
| 2277 | Roberto Angelini Rossi | roberto-angelini-rossi | age |
| 2278 | Husnu Ozyegin | husnu-ozyegin | age |
| 2280 | Kushal Desai | kushal-desai | age |
| 2281 | Daniel Chiu | daniel-chiu | age |
| 2282 | Michael Minhong Yu | michael-minhong-yu | age |
| 2283 | Joop van den Ende | joop-van-den-ende | age |
| 2284 | James France | james-france | age |
| 2285 | Lu Zongjun | lu-zongjun | age |
| 2286 | Gu Wei | gu-wei | age |
| 2287 | Mario Moretti Polegato & family | mario-moretti-polegato | age |
| 2288 | Andrew Tan | andrew-tan | age |
| 2289 | Kapil Bhatia | kapil-bhatia | age |
| 2290 | Thaksin Shinawatra | thaksin-shinawatra | age |
| 2291 | Giovanni Arvedi | giovanni-arvedi | age |
| 2293 | Gary Tharaldson | gary-tharaldson | age |
| 2294 | Amnon Shashua | amnon-shashua | age |
| 2295 | Gary Michelson | gary-michelson | age |
| 2296 | Henry Engelhardt | henry-engelhardt | age |
| 2297 | Albert Shigaboutdinov | albert-shigaboutdinov | age |
| 2298 | Vicente Boluda Fos | vicente-boluda-fos | age |
| 2299 | Lin Fanlian | lin-fanlian | age |
| 2300 | Gwynne Shotwell | gwynne-shotwell | age |
| 2301 | Sefik Yilmaz Dizdar | sefik-yilmaz-dizdar | age |
| 2302 | Gregory Bentley & family | gregory-bentley | age |
| 2303 | Duncan MacMillan | duncan-macmillan | age |
| 2304 | Samir Mane | samir-mane | age |
| 2305 | Rustem Sulteev | rustem-sulteev | age |
| 2306 | Brad Keywell | brad-keywell | age |
| 2308 | Rubén Coppel Luken | ruben-coppel-luken | age |
| 2309 | Zhang Jingzhang & family | zhang-jingzhang | age |
| 2310 | David Teoh | david-teoh | age |
| 2311 | Tseng Cheng | tseng-cheng | age |
| 2312 | Pavel Demidov & family | pavel-demidov | age |
| 2313 | Donald Friese | donald-friese | age |
| 2316 | Wang Linxiang | wang-linxiang | age |
| 2318 | Larry Culp | larry-culp | age |
| 2319 | Alberto Cortina | alberto-cortina | age |
| 2320 | Zbigniew Juroszek & family | zbigniew-juroszek | age |
| 2321 | Tian Ming | tian-ming | age |
| 2322 | Park Soon-jae | park-soon-jae | age |
| 2323 | Habil Khorakiwala | habil-khorakiwala | age |
| 2325 | Alessandro Rosano | alessandro-rosano | age |
| 2326 | James Scapa | james-scapa | age |
| 2327 | Ronnie Screwvala | ronnie-screwvala | age |
| 2328 | Igor Khudokormov | igor-khudokormov | age |
| 2329 | Benoit Dageville | benoit-dageville | age |
| 2330 | Hal Steinbrenner | hal-steinbrenner | age |
| 2331 | Jennifer Steinbrenner Swindal | jennifer-steinbrenner-swindal | age |
| 2332 | Jessica Steinbrenner | jessica-steinbrenner | age |
| 2333 | Luiz Frias | luiz-frias | age |
| 2335 | Evangelos Mytilineos | evangelos-mytilineos | age |
| 2336 | Shigenobu Nagamori | shigenobu-nagamori | age |
| 2337 | Jeffrey Chih Lo | jeffrey-chih-lo | age |
| 2338 | Eric Sprott | eric-sprott | age |
| 2339 | Sergey Shishkarev | sergey-shishkarev | age |
| 2340 | Madhusudan Agarwal | madhusudan-agarwal | age |
| 2341 | Paul Lee | paul-lee-1 | age |
| 2342 | Gao Mingqing | gao-mingqing | age |
| 2343 | Nan Cunhui | nan-cunhui | age |
| 2344 | An Kang | an-kang | age |
| 2345 | Patrick Hanrahan | patrick-hanrahan | age |
| 2346 | Peter Lim | peter-lim | age |
| 2347 | Chen Zhisong | chen-zhisong | age |
| 2348 | Jimmy Rane | jimmy-rane | age |
| 2349 | Dong Jinggui | dong-jinggui | age |
| 2350 | D.V. Manjunatha | dv-manjunatha | age |
| 2352 | Igor Tulchinsky | igor-tulchinsky | age |
| 2356 | Vladimir Leshchikov | vladimir-leshchikov | age |
| 2357 | Wang Chaobin | wang-chaobin | age |
| 2358 | Guy Laliberté | guy-laliberte | age |
| 2359 | She Yingjie | she-yingjie | age |
| 2360 | Michael Heine | michael-heine | age |
| 2361 | Zhang Shilong & family | zhang-shilong | age |
| 2362 | Nihat Ozdemir | nihat-ozdemir | age |
| 2363 | Sezai Bacaksiz | sezai-bacaksiz | age |
| 2365 | Zeng Chaoyi | zeng-chaoyi | age |
| 2366 | Maike Oberwelland-Height | maike-oberwelland-height | age |
| 2367 | Farkhad Akhmedov | farkhad-akhmedov | age |
| 2368 | Zhuang Kuilong & family | zhuang-kuilong | age |
| 2369 | Lloyd Blankfein | lloyd-blankfein | age |
| 2371 | Margarita Latsis Catsiapis & family | margarita-latsis-catsiapis | age |
| 2372 | Lu Di | lu-di | age |
| 2373 | Phil Shawe | phil-shawe | age |
| 2374 | Jian Jun | jian-jun | age |
| 2375 | Xue Jiping | xue-jiping | age |
| 2376 | Tibor Veres | tibor-veres | age |
| 2377 | Anita Zucker | anita-zucker | age |
| 2381 | Andrew Tisch | andrew-tisch | age |
| 2382 | Wong Luen Hei | wong-luen-hei | age |
| 2383 | Ivan Savvidis & family | ivan-savvidis | age |
| 2384 | Kiran Kumar Jain | kiran-kumar-jain | age |
| 2386 | Jahm Najafi | jahm-najafi | age |
| 2387 | Alberto Coppel Luken | alberto-coppel-luken | age |
| 2388 | José Coppel Luken | jose-coppel-luken | age |
| 2389 | Bambang Sutantio | bambang-sutantio | age |
| 2391 | Nikesh Arora | nikesh-arora | age |
| 2392 | Lin Xiucheng & family | lin-xiucheng | age |
| 2393 | Chen Qixing | chen-qixing | age |
| 2394 | Huang Dawen | huang-dawen | age |
| 2395 | Stephane Courbit | stephane-courbit | age |
| 2396 | Chang Jianming & family | chang-jianming | age |
| 2399 | Liu Xiaodong | liu-xiaodong | age |
| 2400 | Wu Bo | wu-bo | age |
| 2401 | Kai-Uwe Hollweg | kai-uwe-hollweg | age |
| 2402 | Othman Benjelloun & family | othman-benjelloun | age |
| 2403 | Surjit Kumar Gupta | surjit-kumar-gupta | age |
| 2404 | Leonid Simanovsky | leonid-simanovsky | age |
| 2405 | Kenny Troutt | kenny-troutt | age |
| 2407 | Yi Dasheng | yi-dasheng | age |
| 2408 | Jose Ignacio Comenge | jose-ignacio-comenge | age |
| 2409 | Edward Netylko | edward-netylko | age |
| 2417 | Jeffrey Gundlach | jeffrey-gundlach | age |
| 2418 | G.V. Prasad | gv-prasad | age |
| 2419 | Helene Odfjell | helene-odfjell | age |
| 2422 | Satish Reddy | satish-reddy | age |
| 2423 | Chu Mang Yee & family | chu-mang-yee | age |
| 2424 | Sam Pollock | sam-pollock | age |
| 2425 | Shrikant Badve | shrikant-badve | age |
| 2426 | Jeffrey Lorberbaum | jeffrey-lorberbaum | age |
| 2427 | Raymond Kwok | raymond-kwok | age |
| 2428 | Chin Jong Hwa | chin-jong-hwa | age |
| 2429 | Femi Otedola | femi-otedola | age |
| 2430 | Djoko Susanto | djoko-susanto | age |
| 2431 | Zheng Jianjiang & family | zheng-jianjiang | age |
| 2432 | Mao Geping & family | mao-geping | age |
| 2433 | Gretel Packer | gretel-packer | age |
| 2435 | Vladimir Krupchak | vladimir-krupchak | age |
| 2437 | Eustasio Lopez Gonzalez | eustasio-lopez-gonzalez | age |
| 2438 | Brandt Louie | brandt-louie | age |
| 2439 | Chen Yung-tai | chen-yung-tai | age |
| 2441 | Claire Bristow | claire-bristow | age |
| 2442 | Carson Brice | carson-brice | age |
| 2445 | Wang Zhenhua | wang-zhenhua | age |
| 2446 | Rolly van Rappard | rolly-van-rappard | age |
| 2447 | Shigefumi Wada | shigefumi-wada | age |
| 2448 | Xue Xiangdong & family | xue-xiangdong | age |
| 2449 | Ke Xiping & family | ke-xiping | age |
| 2451 | Paul Van Zuydam | paul-van-zuydam | age |
| 2452 | Vladimir Yevtushenkov | vladimir-yevtushenkov | age |
| 2454 | Raj Kumar | raj-kumar | age |
| 2455 | Jorge Gallardo Ballart | jorge-gallardo-ballart | age |
| 2456 | Ulrich Mommert & family | ulrich-mommert | age |
| 2457 | Eduard Kucera | eduard-kucera | age |
| 2458 | Yoshiaki Yoshida | yoshiaki-yoshida | age |
| 2459 | Shyam Bhartia | shyam-bhartia | age |
| 2460 | Irfan Razack | irfan-razack-1 | age |
| 2461 | Noaman Razack | noaman-razack | age |
| 2462 | Rezwan Razack | rezwan-razack | age |
| 2463 | Hari Bhartia | hari-bhartia | age |
| 2464 | Ni Yongpei & family | ni-yongpei | age |
| 2465 | Chung Mong-joon | chung-mong-joon | age |
| 2466 | Laszlo Szijj | laszlo-szijj | age |
| 2468 | Fu Guangming & family | fu-guangming | age |
| 2469 | Christian Dreyer | christian-dreyer | age |
| 2478 | Rick Workman | rick-workman | age |
| 2481 | Dean Solon | dean-solon | age |
| 2482 | Richard Fairbank | richard-fairbank | age |
| 2483 | Dmitry Nikolaev | dmitry-nikolaev | age |
| 2485 | Chen Bangdong | chen-bangdong | age |
| 2486 | Thomas Bruch | thomas-bruch | age |
| 2487 | Lucio Co | lucio-co | age |
| 2488 | Pacal Vanhalst & family | pacal-vanhalst | age |
| 2489 | Faisal Bin Qassim Al Thani | faisal-bin-qassim-al-thani | age |
| 2491 | S.D. Shibulal | sd-shibulal | age |
| 2492 | Harvey Jones | harvey-jones | age |
| 2493 | Gerald Schwartz | gerald-schwartz | age |
| 2494 | Xu Chuanhua & family | xu-chuanhua | age |
| 2495 | Chen Shibin | chen-shibin-1 | age |
| 2497 | Sidney Kimmel | sidney-kimmel | age |
| 2498 | Fernando Espinosa Abdalá | fernando-espinosa-abdala | age |
| 2499 | Leopoldo Espinosa Abdalá | leopoldo-espinosa-abdala | age |
| 2500 | Liang Yunchao | liang-yunchao | age |
| 2505 | Hajime Satomi | hajime-satomi | age |
| 2506 | Gloria Joseph | gloria-joseph | age |
| 2507 | John Coustas | john-coustas | age |
| 2508 | Antonio Gallardo Ballart | antonio-gallardo-ballart | age |
| 2509 | Ben Ashkenazy | ben-ashkenazy | age |
| 2510 | Guillermo Fierro | guillermo-fierro | age |
| 2511 | Diego Della Valle | diego-della-valle | age |
| 2513 | Terence (Terry) Matthews | terence-terry-matthews | age |
| 2514 | Li Zhongchu | li-zhongchu | age |
| 2516 | Kwek Leng Keow | kwek-leng-keow | age |
| 2517 | Kwek Leng Peck | kwek-leng-peck | age |
| 2518 | Mohammad Abunayyan | mohammad-abunayyan | age |
| 2519 | Li Shui-po | li-shui-po | age |
| 2522 | Nelson Peltz | nelson-peltz | age |
| 2523 | Michael Steinhardt | michael-steinhardt | age |
| 2524 | Bharat Desai | bharat-desai | age |
| 2525 | Torsten Toeller | torsten-toeller | age |
| 2526 | Aloke Lohia | aloke-lohia | age |
| 2527 | Wang Kunxiao | wang-kunxiao | age |
| 2528 | Greg Brown | greg-brown | age |
| 2529 | Evgeny (Eugene) Shvidler | evgeny-eugene-shvidler | age |
| 2530 | Yigal Dimri | yigal-dimri | age |
| 2531 | Magic Johnson | magic-johnson | age |
| 2532 | Ahmet Calik | ahmet-calik | age |
| 2533 | Lau Cho Kun | lau-cho-kun | age |
| 2534 | Robert Mouawad | robert-mouawad | age |
| 2535 | Frank McCourt | frank-mccourt | age |
| 2536 | Eric Hémar | eric-hemar | age |
| 2537 | Paritosh Garg | paritosh-garg | age |
| 2538 | Bachtiar Karim | bachtiar-karim-1 | age |
| 2539 | Antti Aarnio-Wihuri | antti-aarnio-wihuri | age |
| 2540 | Peter Guber | peter-guber | age |
| 2541 | Pieter van der Does | pieter-van-der-does | age |
| 2542 | Kenzo Tsujimoto | kenzo-tsujimoto | age |
| 2543 | Wu Zhigang & family | wu-zhigang | age |
| 2544 | Dick Wolf | dick-wolf-1 | age |
| 2545 | Jin Baofang | jin-baofang | age |
| 2547 | Wu Chung-yi | wu-chung-yi | age |
| 2551 | Zhong Ruonong & family | zhong-ruonong | age |
| 2554 | Alexander Evnevich & family | alexander-evnevich | age |
| 2557 | Chen Kaichen | chen-kaichen | age |
| 2558 | Marc Lipschultz | marc-lipschultz | age |
| 2559 | Winai Teawsomboonkij | winai-teawsomboonkij | age |
| 2561 | Andrei Komarov & family | andrei-komarov | age |
| 2562 | He Zuxun | he-zuxun | age |
| 2564 | Carlos Sanchez | carlos-sanchez | age |
| 2565 | Jose Llorens Torra | jose-llorens-torra | age |
| 2566 | Sasson Dayan & family | sasson-dayan | age |
| 2567 | Artur Grynbaum | artur-grynbaum-1 | age |
| 2568 | Nobutada Saji | nobutada-saji | age |
| 2570 | George Christ & family | george-christ | age |
| 2572 | Cargill MacMillan III | cargill-macmillan-iii | age |
| 2573 | John MacMillan | john-macmillan-1 | age |
| 2574 | Martha MacMillan | martha-macmillan | age |
| 2575 | William MacMillan | william-macmillan | age |
| 2576 | Frank Holding Jr | frank-holding-jr | age |
| 2577 | Allan Wong | allan-wong | age |
| 2578 | Zhang Xinghai & family | zhang-xinghai | age |
| 2579 | Lim Chap Huat | lim-chap-huat | age |
| 2581 | Vladimir Fartushnyak | vladimir-fartushnyak | age |
| 2582 | Michael Teel | michael-teel | age |
| 2583 | Arsen Kanokov | arsen-kanokov | age |
| 2584 | Ronald Perelman | ronald-perelman | age |
| 2585 | Shirley Kao | shirley-kao | age |
| 2586 | Lei Jufang | lei-jufang | age |
| 2588 | Ignacio Torras | ignacio-torras | age |
| 2589 | John Morgan | john-morgan | age |
| 2594 | Seth Klarman | seth-klarman | age |
| 2595 | Thomas Crowley Jr & family | thomas-crowley-jr | age |
| 2598 | Samuel Chen | samuel-chen | age |
| 2599 | Jose Maria Aristrain | jose-maria-aristrain | age |
| 2600 | Chen Wenyuan & family | chen-wenyuan | age |
| 2601 | Zhao Tongtong | zhao-tongtong-1 | age |
| 2602 | Chen Shiliang | chen-shiliang | age |
| 2603 | Susan Co | susan-co | age |
| 2605 | Alan Gerry | alan-gerry | age |
| 2606 | Gao Yunfeng | gao-yunfeng | age |
| 2607 | Stelios Haji-Ioannou | stelios-haji-ioannou | age |
| 2609 | Agustín Coppel Luken | agustin-coppel-luken | age |
| 2611 | Paul Fireman | paul-fireman | age |
| 2612 | Naresh Jain | naresh-jain | age |
| 2614 | Hans Thomann | hans-thomann | age |
| 2615 | Yin Yee Lee | yin-yee-lee | age |
| 2616 | Suh Kyung-bae | suh-kyung-bae | age |
| 2617 | Aziz Akhannouch & family | aziz-akhannouch | age |
| 2618 | Stephen Winn | stephen-winn | age |
| 2619 | John Lim | john-lim | age |
| 2621 | Mori Arkin | mori-arkin | age |
| 2622 | Polys Haji-Ioannou | polys-haji-ioannou | age |
| 2623 | Bob Muglia | bob-muglia | age |
| 2624 | Dong Fan | dong-fan | age |
| 2625 | Carmen Thyssen | carmen-thyssen | age |
| 2626 | Georgios Peristeris | georgios-peristeris | age |
| 2627 | Onkar Kanwar | onkar-kanwar | age |
| 2631 | Anas Sefrioui & family | anas-sefrioui | age |
| 2632 | Huang Jian | huang-jian | age |
| 2633 | Georg Haub | georg-haub | age |
| 2634 | Brian Roberts | brian-roberts | age |
| 2636 | Tieer Gu | tieer-gu | age |
| 2638 | Turgay Ciner | turgay-ciner | age |
| 2639 | Francisco Jose Riberas Mera | francisco-jose-riberas-mera | age |
| 2640 | Hwang Chul-joo | hwang-chul-joo | age |
| 2641 | Pantas Sutardja | pantas-sutardja | age |
| 2642 | Peter Kelly | peter-kelly | age |
| 2644 | Adam Norwitt | adam-norwitt | age |
| 2645 | Yvonne Lo | yvonne-lo | age |
| 2646 | George Marcus | george-marcus | age |
| 2647 | Kenneth Lo | kenneth-lo-1 | age |
| 2648 | William Fisher | william-fisher | age |
| 2649 | Lu Lili | lu-lili | age |
| 2650 | Surin Upatkoon | surin-upatkoon | age |
| 2651 | Gary Magness | gary-magness | age |
| 2652 | Anand Burman | anand-burman-1 | age |
| 2653 | Vadim Vikulov | vadim-vikulov | age |
| 2656 | Lai Jianping | lai-jianping | age |
| 2657 | Alexander Savelyev & family | alexander-savelyev | age |
| 2661 | Li Jiaquan | li-jiaquan | age |
| 2662 | Ye Xiaoping | ye-xiaoping | age |
| 2663 | Gabriella Meister | gabriella-meister | age |
| 2664 | Andrei Kosogov | andrei-kosogov | age |
| 2665 | Thomas von Koch | thomas-von-koch | age |
| 2667 | Timothy Headington | timothy-headington | age |
| 2669 | Rajeev Gulati | rajeev-gulati | age |
| 2670 | Wang Zhenghua | wang-zhenghua | age |
| 2672 | Wong Man Li | wong-man-li | age |
| 2673 | Takaya Awata | takaya-awata | age |
| 2675 | Deniz Sahenk | deniz-sahenk | age |
| 2676 | Alexander Linnik | alexander-linnik | age |
| 2677 | Victor Linnik | victor-linnik | age |
| 2679 | Juan Domingo Beckmann Legorreta & family | juan-domingo-beckmann-legorreta | age |
| 2680 | Lin Chang Su-O | lin-chang-su-o | age |
| 2684 | Yuan Zhongxue | yuan-zhongxue | age |
| 2685 | Ulrike Meister | ulrike-meister | age |
| 2687 | Anil Gupta | anil-gupta | age |
| 2688 | Tsai Cheng-Chiu | tsai-cheng-chiu | age |
| 2689 | Erik Must | erik-must | age |
| 2690 | Chris Lin | chris-lin | age |
| 2691 | Mike Gordon | mike-gordon-1 | age |
| 2692 | Park Dong-suk | park-dong-suk | age |
| 2693 | Giannis Alafouzos & family | giannis-alafouzos | age |
| 2695 | Li Xuhui | li-xuhui | age |
| 2697 | Jim Koch | jim-koch | age |
| 2700 | Smagulov Nurlan | smagulov-nurlan | age |
| 2702 | Brad Kelley | brad-kelley | age |
| 2703 | Zhang Wenzhong | zhang-wenzhong | age |
| 2705 | Patricia Angelini Rossi | patricia-angelini-rossi | age |
| 2706 | Rubens Menin Teixeira de Souza | rubens-menin-teixeira-de-souza | age |
| 2707 | Tang Jinkui & family | tang-jinkui | age |
| 2708 | Mark Pincus | mark-pincus | age |
| 2709 | Vladimir Bogdanov | vladimir-bogdanov | age |
| 2711 | Daniel Calugar | daniel-calugar | age |
| 2712 | Lai Jianfa | lai-jianfa | age |
| 2713 | Satya Nadella | satya-nadella | age |
| 2714 | Elly Reisman | elly-reisman | age |
| 2715 | Mark Dixon | mark-dixon | age |
| 2716 | Alexander Rakshin & family | alexander-rakshin | age |
| 2718 | Trey Parker | trey-parker | age |
| 2719 | Pan Laican | pan-laican | age |
| 2721 | Sven Hagströmer | sven-hagstromer | age |
| 2725 | Mirwais Azizi | mirwais-azizi | age |
| 2726 | Viren Doshi | viren-doshi | age |
| 2727 | Li Weiguo | li-weiguo | age |
| 2728 | Huang Chulong | huang-chulong | age |
| 2729 | Gleb Fetisov | gleb-fetisov | age |
| 2731 | Filip Balcaen & family | filip-balcaen | age |
| 2732 | Wu Xushun & family | wu-xushun | age |
| 2734 | Ren Jianhua | ren-jianhua | age |
| 2735 | Heloise Pratt | heloise-pratt | age |
| 2736 | Aluru Jagadish Prasad | aluru-jagadish-prasad | age |
| 2739 | Ziv Aviram | ziv-aviram | age |
| 2740 | Sergey Dmitriev | sergey-dmitriev | age |
| 2741 | Huang Zelan & family | huang-zelan | age |
| 2742 | Gao Yi & family | gao-yi | age |
| 2743 | Karl Hedin | karl-hedin | age |
| 2744 | Nanu Gupta | nanu-gupta | age |
| 2745 | Wang Xicheng & family | wang-xicheng | age |
| 2746 | Zong Yanmin | zong-yanmin | age |
| 2747 | Yu Qibing & family | yu-qibing | age |
| 2748 | Zhang Yin | zhang-yin | age |
| 2749 | Zhang Xingang | zhang-xingang | age |
| 2750 | Vadim Moshkovich | vadim-moshkovich | age |
| 2752 | Paul McCartney | paul-mccartney | age |
| 2754 | Andrei Rappoport | andrei-rappoport | age |
| 2755 | Sylvia Wedemeyer | sylvia-wedemeyer | age |
| 2759 | Chris Wallin | chris-wallin | age |
| 2762 | Michel Litvak | michel-litvak-2 | age |
| 2763 | Samih Sawiris | samih-sawiris | age |
| 2764 | Martin Herrenknecht | martin-herrenknecht | age |
| 2765 | Alexander Lutsenko & family | alexander-lutsenko | age |
| 2768 | Meng Qingshan & family | meng-qingshan | age |
| 2769 | Cristina Green | cristina-green | age |
| 2770 | Philip Green | philip-green | age |
| 2771 | Vera Rechulski Santo Domingo | vera-rechulski-santo-domingo | age |
| 2772 | Lee Hae-jin | lee-hae-jin | age |
| 2774 | Joseph Steinberg | joseph-steinberg | age |
| 2775 | Roland Duchatelet & family | roland-duchatelet | age |
| 2776 | Yu Peidi | yu-peidi | age |
| 2777 | Adrian Paval | adrian-paval | age |
| 2778 | Wang Shih-Chung | wang-shih-chung | age |
| 2781 | Yasseen Mansour | yasseen-mansour | age |
| 2782 | Naresh Trehan | naresh-trehan | age |
| 2783 | Li Zhiyuan | li-zhiyuan | age |
| 2784 | Tyler Perry | tyler-perry | age |
| 2785 | Melissa Ma | melissa-ma-1 | age |
| 2786 | Larry Fink | larry-fink | age |
| 2789 | Mofatraj Munot | mofatraj-munot | age |
| 2790 | Soegiarto Adikoesoemo | soegiarto-adikoesoemo | age |
| 2791 | A. Jayson Adair | a-jayson-adair | age |
| 2792 | C.C. Paarthipan | cc-paarthipan | age |
| 2793 | Xiang Guangming & family | xiang-guangming | age |
| 2794 | Shao Peisheng & family | shao-peisheng | age |
| 2797 | Gao Xingjiang | gao-xingjiang-1 | age |
| 2798 | William Franke | william-franke | age |
| 2799 | Xu Wanmao | xu-wanmao | age |
| 2800 | David Feffer | david-feffer | age |
| 2802 | Liu Zhiqiang | liu-zhiqiang | age |
| 2803 | Qian Ying | qian-ying | age |
| 2805 | Yasuhide Uno | yasuhide-uno | age |
| 2811 | Michael Spencer | michael-spencer | age |
| 2813 | Réal Plourde | real-plourde | age |
| 2815 | John Colgrove | john-colgrove | age |
| 2816 | Stefan Kaluzny | stefan-kaluzny | age |
| 2817 | Lee Joon-ho | lee-joon-ho | age |
| 2818 | Charles Liang | charles-liang | age |
| 2821 | Hans Sy | hans-sy | age |
| 2823 | Nikolay Fartushnyak | nikolay-fartushnyak | age |
| 2824 | Dhruv Sawhney | dhruv-sawhney | age |
| 2827 | Jörg-Uwe Goldbeck | jorg-uwe-goldbeck | age |
| 2828 | Boris Rotenberg | boris-rotenberg | age |
| 2829 | Chua Thian Poh | chua-thian-poh | age |
| 2830 | Lim Kaling | lim-kaling | age |
| 2831 | Bahari Karim | bahari-karim | age |
| 2832 | Burhan Karim | burhan-karim | age |
| 2834 | Salil Singhal | salil-singhal-1 | age |
| 2835 | Bhikhabai Virani | bhikhabai-virani | age |
| 2836 | Mochtar Riady & family | mochtar-riady | age |
| 2837 | Douglas Rippel | douglas-rippel | age |
| 2838 | Koon Poh Ming | koon-poh-ming | age |
| 2839 | Ajlan bin Abdulaziz Al-Ajlan | ajlan-bin-abdulaziz-al-ajlan | age |
| 2840 | Zhang Fangliang | zhang-fangliang | age |
| 2842 | Elena Baturina | elena-baturina | age |
| 2843 | Richard Kayne | richard-kayne | age |
| 2844 | Andrei Kuzyaev | andrei-kuzyaev | age |
| 2845 | Cheng Lili | cheng-lili | age |
| 2846 | Jeff Sprecher | jeff-sprecher | age |
| 2847 | Lyudmila Kogan | lyudmila-kogan | age |
| 2850 | Frederic Luddy | frederic-luddy | age |
| 2851 | Mark Kurtser | mark-kurtser | age |
| 2852 | Liu Chengyu & family | liu-chengyu | age |
| 2853 | Yuri Karptsov | yuri-karptsov | age |
| 2857 | Subbamma Jasti | subbamma-jasti | age |
| 2859 | Hua Xuande & family | hua-xuande | age |
| 2860 | Zhang Liguo | zhang-liguo | age |
| 2861 | Herbert Sy | herbert-sy | age |
| 2862 | Hans-Otto Kromberg | hans-otto-kromberg | age |
| 2864 | Jose Ermirio de Moraes Neto | jose-ermirio-de-moraes-neto | age |
| 2865 | Jose Roberto Ermirio de Moraes | jose-roberto-ermirio-de-moraes | age |
| 2866 | Neide Helena de Moraes | neide-helena-de-moraes | age |
| 2867 | Jack Zhang | jack-zhang | age |
| 2869 | Josef Boquoi & family | josef-boquoi | age |
| 2870 | Junro Ito | junro-ito | age |
| 2871 | Xiang Wenbo | xiang-wenbo | age |
| 2872 | Sun Guangxin | sun-guangxin | age |
| 2873 | Itamar Locks & family | itamar-locks | age |
| 2874 | Blairo Maggi | blairo-maggi | age |
| 2875 | Martin Moller Nielsen | martin-moller-nielsen | age |
| 2876 | Michael Kum | michael-kum | age |
| 2877 | Michael Krasny | michael-krasny | age |
| 2878 | Mikhail Fedyaev | mikhail-fedyaev | age |
| 2879 | Krishna Kumar Bangur | krishna-kumar-bangur | age |
| 2881 | Daniel Feffer | daniel-feffer | age |
| 2882 | Miguel Tomás Arrufat Pujol | miguel-tomas-arrufat-pujol | age |
| 2883 | Igor Yakovlev | igor-yakovlev | age |
| 2884 | Zhou Chengjian | zhou-chengjian | age |
| 2885 | Lev Kvetnoi | lev-kvetnoi | age |
| 2886 | Liu Zhenfeng | liu-zhenfeng | age |
| 2887 | Ilson Mateus & family | ilson-mateus | age |
| 2888 | Rao Wei & family | rao-wei | age |
| 2889 | Peng Hao | peng-hao | age |
| 2890 | Mao Zhongwu | mao-zhongwu | age |
| 2891 | Song Fei | song-fei | age |
| 2892 | J. Wayne Weaver | j-wayne-weaver | age |
| 2893 | Wang Aiguo & family | wang-aiguo | age |
| 2894 | Zhou Zongwen & family | zhou-zongwen | age |
| 2895 | Shin Dong-joo | shin-dong-joo | age |
| 2896 | Jack Cogen | jack-cogen | age |
| 2897 | Tang Xiuguo | tang-xiuguo | age |
| 2898 | Alexander Klyachin | alexander-klyachin | age |
| 2900 | Michael Andlauer | michael-andlauer | age |
| 2901 | Wen Pengcheng & family | wen-pengcheng | age |
| 2902 | Juan Maria Riberas Mera | juan-maria-riberas-mera | age |
| 2903 | Ruben Feffer | ruben-feffer | age |
| 2904 | Lim Kok Thay | lim-kok-thay | age |
| 2905 | Zuo Jing | zuo-jing | age |
| 2906 | Zuo Yuyu | zuo-yuyu | age |
| 2907 | David Kong | david-kong | age |
| 2908 | Shin Chang-jae | shin-chang-jae | age |
| 2909 | Vincent Lo | vincent-lo | age |
| 2910 | Chang Kuo-Ming | chang-kuo-ming | age |
| 2911 | Hisako Yamamoto | hisako-yamamoto | age |
| 2912 | Yasuhisa Ito | yasuhisa-ito | age |
| 2913 | Tong Yongsheng & family | tong-yongsheng | age |
| 2914 | Lin Por-Fong | lin-por-fong | age |
| 2915 | Hans Schmid | hans-schmid | age |
| 2916 | Sun Huaiqing & family | sun-huaiqing | age |
| 2917 | Antonio Percassi | antonio-percassi | age |
| 2918 | Roman Avdeev | roman-avdeev | age |
| 2921 | Daniela Grogg | daniela-grogg | age |
| 2924 | Tan Lili | tan-lili | age |
| 2925 | Kim Sang-beom | kim-sang-beom | age |
| 2926 | Li Xiaohua & family | li-xiaohua | age |
| 2927 | Arthur Levine | arthur-levine | age |
| 2928 | Lauren Leichtman | lauren-leichtman | age |
| 2930 | Jorge Feffer & family | jorge-feffer | age |
| 2931 | Ye Shanqun & family | ye-shanqun | age |
| 2932 | Vitali Machitski & family | vitali-machitski | age |
| 2933 | Ruben Vardanyan & family | ruben-vardanyan | age |
| 2934 | Mohammed Ibrahim | mohammed-ibrahim | age |
| 2935 | Keiko Erikawa | keiko-erikawa | age |
| 2936 | Joe Kiani | joe-kiani | age |
| 2937 | Gao Jifan & family | gao-jifan | age |
| 2938 | James Jannard | james-jannard | age |
| 2939 | Yoichi Erikawa | yoichi-erikawa | age |
| 2940 | Derek Stevens | derek-stevens | age |
| 2941 | Nancy Lerner | nancy-lerner | age |
| 2942 | J. Christopher Flowers | j-christopher-flowers | age |
| 2943 | Ge Tairong | ge-tairong | age |
| 2945 | Eduardo Costantini | eduardo-costantini | age |
| 2946 | Hermanto Tanoko | hermanto-tanoko | age |
| 2947 | Randolph Lerner | randolph-lerner | age |
| 2948 | Lee Ho-jin | lee-ho-jin | age |
| 2949 | Madeleine Olsson Eriksson | madeleine-olsson-eriksson | age |
| 2950 | Norma Lerner | norma-lerner | age |
| 2952 | Ravi S. | ravi-s | age |
| 2953 | Lin Por-Chun | lin-por-chun | age |
| 2956 | Boris Nuraliev | boris-nuraliev | age |
| 2957 | Kim Nam-goo | kim-nam-goo | age |
| 2958 | Ilyas Khan | ilyas-khan | age |
| 2960 | Kim Taek-jin | kim-taek-jin | age |
| 2961 | Carsten Koerl | carsten-koerl | age |
| 2962 | Lim Wee Chai | lim-wee-chai | age |
| 2963 | Ruan Hongliang | ruan-hongliang | age |
| 2965 | Zhu Shunquan | zhu-shunquan | age |
| 2966 | Bret Johnsen | bret-johnsen | age |
| 2967 | Mustafa Latif Topbas | mustafa-latif-topbas | age |
| 2968 | Li Ming | li-ming | age |
| 2970 | Wang Shuifu | wang-shuifu | age |
| 2971 | Petro Poroshenko | petro-poroshenko | age |
| 2972 | Tony Townley | tony-townley | age |
| 2973 | Jose Isaac Peres & family | jose-isaac-peres | age |
| 2974 | Kurt Krieger | kurt-krieger | age |
| 2975 | Pat Neal | pat-neal | age |
| 2976 | Oleg Misevra | oleg-misevra | age |
| 2977 | Rajju Shroff | rajju-shroff | age |
| 2978 | Hitesh Doshi | hitesh-doshi | age |
| 2980 | Marcus Pürner | marcus-purner | age |
| 2981 | J.K. Rowling | jk-rowling | age |
| 2982 | Wu Kaiting | wu-kaiting | age |
| 2983 | Pankaj Doshi | pankaj-doshi | age |
| 2986 | Neerja Sethi | neerja-sethi | age |
| 2987 | Christoph Zeller | christoph-zeller | age |
| 2990 | Alexander Mamut & family | alexander-mamut | age |
| 2991 | Sheila Johnson | sheila-johnson | age |
| 2993 | David Humphreys & family | david-humphreys | age |
| 2994 | Sarah Humphreys Atkins & family | sarah-humphreys-atkins | age |
| 2995 | Herriot Tabuteau | herriot-tabuteau | age |
| 2996 | Xu Yuejuan | xu-yuejuan | age |
| 2997 | Ryuji Arai | ryuji-arai | age |
| 3000 | Ranga Raju Kanumuri | ranga-raju-kanumuri | age |
| 3002 | Jean-Marc Chapus | jean-marc-chapus | age |
| 3003 | Zhao Jianhui | zhao-jianhui | age |
| 3005 | Cheah Cheng Hye | cheah-cheng-hye | age |
| 3006 | Tsao Ter-fung | tsao-ter-fung | age |
| 3007 | James Truchard | james-truchard | age |
| 3009 | Fumio Sakiya | fumio-sakiya | age |
| 3010 | Vinod Saraf | vinod-saraf | age |
| 3011 | Bhaskara Rao Bollineni | bhaskara-rao-bollineni | age |
| 3012 | Zhang Xin | zhang-xin | age |
| 3013 | Ken Kendrick | ken-kendrick | age |
| 3014 | Tseng Sing-ai | tseng-sing-ai | age |
| 3015 | Gerald Engström | gerald-engstrom | age |
| 3016 | Xiu Laigui | xiu-laigui | age |
| 3017 | Donald Mackenzie | donald-mackenzie | age |
| 3018 | Harley Sy | harley-sy | age |
| 3019 | Zhu Shuangquan | zhu-shuangquan | age |
| 3021 | William Heinecke | william-heinecke | age |
| 3024 | Qiao Zhiyong | qiao-zhiyong-1 | age |
| 3025 | Lin Por-Shih | lin-por-shih | age |
| 3028 | Chu Jian | chu-jian-1 | age |
| 3029 | Wang Jilei | wang-jilei | age |
| 3031 | Thomas Sandell | thomas-sandell | age |
| 3032 | Eiichi Kuriwada | eiichi-kuriwada | age |
| 3033 | Quek Leng Chye | quek-leng-chye | age |
| 3035 | Shintaro Tsuji | shintaro-tsuji | age |
| 3037 | Michael Tojner | michael-tojner | age |
| 3038 | He Zhenggang | he-zhenggang | age |
| 3039 | Arnold Schwarzenegger | arnold-schwarzenegger | age |
| 3040 | Hartati Murdaya | hartati-murdaya | age |
| 3043 | Michael Gans & family | michael-gans | age |
| 3044 | Mustafa Hamied | mustafa-hamied | age |
| 3045 | Sujit Bhayani | sujit-bhayani | age |
| 3046 | Dieter Müller | dieter-muller | age |
| 3050 | Liu Ming Chung | liu-ming-chung | age |
| 3051 | Hong Seok-joh | hong-seok-joh | age |
| 3052 | Sanjeev Shah | sanjeev-shah | age |
| 3054 | Bruce Springsteen | bruce-springsteen | age |
| 3057 | Yu Lili | yu-lili | age |
| 3058 | Leo Huang | leo-huang | age |
| 3060 | Gina Vecchiarelli | gina-vecchiarelli | age |
| 3061 | Terry Leprino | terry-leprino | age |
| 3062 | Ron Shaich | ron-shaich | age |
| 3063 | Holger Timm | holger-timm | age |
| 3064 | Ngo Chi Dung | ngo-chi-dung | age |
| 3065 | Simón Pedro Barceló Vadell | simon-pedro-barcelo-vadell | age |
| 3066 | Vadim Novinsky | vadim-novinsky | age |
| 3069 | Suresh Krishna | suresh-krishna | age |
| 3070 | Clemens Toennies | clemens-toennies | age |
| 3074 | Vitaly Orlov | vitaly-orlov | age |
| 3075 | Hugo Ribeiro & family | hugo-ribeiro | age |
| 3076 | Ramesh Kunhikannan | ramesh-kunhikannan | age |
| 3077 | Anne Dinning | anne-dinning | age |
| 3078 | Wang Miaotong | wang-miaotong | age |
| 3079 | Dorle Hager | dorle-hager | age |
| 3080 | Evi Hager | evi-hager | age |
| 3081 | Peter Hager | peter-hager | age |
| 3082 | Edwin Soeryadjaya | edwin-soeryadjaya-1 | age |
| 3083 | Zan Shengda | zan-shengda | age |
| 3084 | Maxim Shubarev | maxim-shubarev | age |
| 3087 | Teresita Sy-Coson | teresita-sy-coson | age |
| 3088 | Bulent Eczacibasi | bulent-eczacibasi | age |
| 3089 | Bruce Mathieson | bruce-mathieson | age |
| 3090 | Rubens Ometto Silveira Mello | rubens-ometto-silveira-mello | age |
| 3094 | Zhang Jianguo & family | zhang-jianguo-1 | age |
| 3095 | Lee Jay-hyun | lee-jay-hyun | age |
| 3098 | Susan Carol Holland | susan-carol-holland | age |
| 3099 | Scott Smith | scott-smith-1 | age |
| 3100 | Kazim Turker | kazim-turker | age |
| 3101 | Theresia Gouw | theresia-gouw | age |
| 3102 | Axel Oberwelland & family | axel-oberwelland | age |
| 3103 | Ahmed Afif Topbas | ahmed-afif-topbas | age |
| 3105 | Michael Dunlap & family | michael-dunlap | age |
| 3107 | Richard Teets Jr | richard-teets-jr | age |
| 3108 | John Christodoulou | john-christodoulou | age |
| 3109 | Wang Chou-hsiong | wang-chou-hsiong | age |
| 3110 | Lyu Yixiong | lyu-yixiong | age |
| 3111 | Giuliana Caprotti | giuliana-caprotti | age |
| 3113 | Edouard Carmignac | edouard-carmignac | age |
| 3114 | Eduard Chukhlebov | eduard-chukhlebov | age |
| 3116 | Hideyuki Busujima | hideyuki-busujima | age |
| 3119 | Jiang Zhaobai | jiang-zhaobai | age |
| 3120 | Jonas Kamprad | jonas-kamprad | age |
| 3121 | Mathias Kamprad | mathias-kamprad | age |
| 3122 | Peter Kamprad | peter-kamprad | age |
| 3124 | Craig Abod | craig-abod | age |
| 3126 | Richard Warke | richard-warke | age |
| 3128 | Philippe Benacin | philippe-benacin | age |
| 3131 | Manny Stul | manny-stul | age |
| 3132 | Deepak Mehta | deepak-mehta | age |
| 3133 | Zhong Peifeng | zhong-peifeng-1 | age |
| 3134 | René Holecek | rene-holecek | age |
| 3135 | Igor Kudryashkin | igor-kudryashkin | age |
| 3136 | Myron Wentz | myron-wentz | age |
| 3137 | Jacques Merceron-Vicat & family | jacques-merceron-vicat | age |
| 3138 | Sergey Kasyanenko & family | sergey-kasyanenko | age |
| 3139 | Shen Jinhua | shen-jinhua | age |
| 3140 | Jiang Xuefei & family | jiang-xuefei | age |
| 3141 | Wang Minwen | wang-minwen | age |
| 3142 | Nutchamai Thanombooncharoen | nutchamai-thanombooncharoen | age |
| 3143 | Zhong Sheng Jian | zhong-sheng-jian | age |
| 3145 | Tatiana Volodina | tatiana-volodina | age |
| 3146 | Chen Yuantai | chen-yuantai | age |
| 3148 | Benjamin Zhengmin Pan & family | benjamin-zhengmin-pan | age |
| 3149 | Qiu Minxiu | qiu-minxiu | age |
| 3151 | Kochouseph Chittilappilly | kochouseph-chittilappilly | age |
| 3152 | Zhang Changhong | zhang-changhong | age |
| 3153 | Pan Longquan | pan-longquan | age |
| 3154 | Zhu Xingliang | zhu-xingliang | age |
| 3155 | Dou Zhenggang | dou-zhenggang | age |
| 3157 | Cai Hongbin | cai-hongbin | age |
| 3158 | Marty Horton | marty-horton | age |
| 3159 | Roy Chi Ping Chung | roy-chi-ping-chung | age |
| 3160 | Sam Tarascio | sam-tarascio | age |
| 3162 | Pan Shiyi | pan-shiyi | age |
| 3163 | Valery Kustov | valery-kustov | age |
| 3167 | Yu De-Chao | yu-de-chao | age |
| 3168 | Jin Xin | jin-xin | age |
| 3169 | Lee Dong-chae | lee-dong-chae | age |
| 3171 | Chandubhai Virani | chandubhai-virani | age |
| 3172 | Kanjibhai Virani | kanjibhai-virani | age |
| 3173 | Hartley Rogers | hartley-rogers | age |
| 3174 | James Cameron | james-cameron | age |
| 3175 | Jerry Seinfeld | jerry-seinfeld | age |
| 3176 | Weijian Shan | weijian-shan | age |
| 3177 | Jane Goldman | jane-goldman | age |
| 3178 | Phillippe Van de Vyvere | phillippe-van-de-vyvere | age |
| 3181 | Alfredo Harp Helu & family | alfredo-harp-helu | age |
| 3182 | Anatoly Skurov | anatoly-skurov | age |
| 3184 | Thomas Powell | thomas-powell | age |
| 3185 | David Capobianco | david-capobianco | age |
| 3186 | Zhang Keqiang | zhang-keqiang | age |
| 3188 | Huang Shanbing & family | huang-shanbing | age |
| 3189 | Azman Hashim | azman-hashim | age |
| 3191 | Kuldip Rathee | kuldip-rathee | age |
| 3193 | Xiong Haitao | xiong-haitao | age |
| 3194 | Hou Juncheng | hou-juncheng | age |
| 3199 | Alan Rydge | alan-rydge | age |
| 3200 | Lu Zhongfang | lu-zhongfang | age |
| 3201 | William Fung | william-fung | age |
| 3202 | Albert Nahmad | albert-nahmad | age |
| 3203 | Lee Joong-keun | lee-joong-keun | age |
| 3205 | Alexander Mikhalskiy | alexander-mikhalskiy | age |
| 3209 | Michele Kang | michele-kang | age |
| 3210 | Christian Louboutin | christian-louboutin | age |
| 3212 | Anne Pedrero | anne-pedrero | age |
| 3215 | David MacMillan | david-macmillan | age |
| 3217 | John H. MacMillan IV IV | john-h-macmillan-iv-iv | age |
| 3218 | Kate MacMillan Reed | kate-macmillan-reed | age |
| 3220 | Ma Fei | ma-fei | age |
| 3221 | Kalpana Parekh | kalpana-parekh | age |
| 3222 | Chang Kuo-Cheng | chang-kuo-cheng | age |
| 3224 | Liu Shengjun | liu-shengjun | age |
| 3225 | Nguyen Dang Quang | nguyen-dang-quang | age |
| 3226 | Diamantis Diamantides & family | diamantis-diamantides | age |
| 3228 | Lee Hwa-kyung | lee-hwa-kyung | age |
| 3229 | Victor Fung | victor-fung | age |
| 3233 | K. Rai Sahi | k-rai-sahi | age |
| 3235 | Xu Jiangnan | xu-jiangnan | age |
| 3236 | Kirit Doshi | kirit-doshi | age |
| 3238 | Miao Yongjun | miao-yongjun | age |
| 3245 | Cai Wensheng | cai-wensheng | age |
| 3246 | Su Qingcan | su-qingcan | age |
| 3247 | Kirtikumar Mehta | kirtikumar-mehta | age |
| 3249 | Elizabeth Sy | elizabeth-sy | age |
| 3251 | Brian Lawson | brian-lawson | age |
| 3252 | Mai Michael | mai-michael | age |
| 3255 | Jeffrey Soffer | jeffrey-soffer | age |
| 3256 | Jean Madar | jean-madar | age |
| 3258 | Yao Yi | yao-yi-1 | age |
| 3260 | Oscar Baeza Fares | oscar-baeza-fares | age |
| 3261 | Lu Bin | lu-bin | age |
| 3263 | Dick Portillo | dick-portillo | age |
| 3264 | Wang Baoqing | wang-baoqing | age |
| 3266 | Ric Elias | ric-elias | age |
| 3268 | Eddy Sugianto | eddy-sugianto | age |
| 3269 | Cyrus Madon | cyrus-madon | age |
| 3270 | Prayudh Mahagitsiri | prayudh-mahagitsiri | age |
| 3271 | Patokh Chodiev | patokh-chodiev | age |
| 3272 | Larry Silverstein | larry-silverstein | age |
| 3275 | Roy Vagelos | roy-vagelos | age |
| 3276 | Wang Mingwang | wang-mingwang | age |
| 3279 | Feng Yuxia | feng-yuxia | age |
| 3281 | Li Liufa & family | li-liufa | age |
| 3282 | Parakramsinh Jadeja | parakramsinh-jadeja | age |
| 3283 | Don Ahern | don-ahern | age |
| 3285 | Li Jianguo | li-jianguo | age |
| 3286 | Bill Cummings | bill-cummings | age |
| 3287 | Warren Chen | warren-chen | age |
| 3288 | Cheng Zhangwen | cheng-zhangwen | age |
| 3290 | Jia Tianjiang & family | jia-tianjiang | age |
| 3292 | Lv Yongxiang | lv-yongxiang | age |
| 3294 | KR Sridhar | kr-sridhar | age |
| 3296 | Cao Ji | cao-ji | age |
| 3297 | Xi Chao | xi-chao | age |
| 3298 | Greg Abel | greg-abel | age |
| 3299 | Sanjay Mehrotra | sanjay-mehrotra | age |
| 3300 | Wu Yulan | wu-yulan | age |
| 3303 | Mats Paulsson & family | mats-paulsson | age |
| 3304 | Hans Langer | hans-langer | age |
| 3305 | Karen Virginia Beckmann Legoretta | karen-virginia-beckmann-legoretta | age |
| 3307 | Xie Juhua & family | xie-juhua | age |
| 3308 | Yuri Shefler | yuri-shefler | age |
| 3309 | Gabor Szeles | gabor-szeles | age |
| 3311 | Omani Carson | omani-carson | age |
| 3312 | Paul Taubman | paul-taubman | age |
| 3313 | Prachak Tangkaravakoon | prachak-tangkaravakoon | age |
| 3314 | Li San Yim | li-san-yim | age |
| 3315 | Ivan Streshinsky | ivan-streshinsky | age |
| 3316 | Vladimir Melnikov | vladimir-melnikov | age |
| 3317 | Andrea Della Valle | andrea-della-valle | age |
| 3318 | Louis Bacon | louis-bacon | age |
| 3319 | Raymond Bentley & family | raymond-bentley | age |
| 3320 | Charles Beauduin | charles-beauduin | age |
| 3321 | Sergio Fogel | sergio-fogel | age |
| 3322 | Zach McLeroy | zach-mcleroy | age |
| 3326 | Huang Yi | huang-yi | age |
| 3327 | Aydin Dogan | aydin-dogan | age |
| 3328 | Ivan Müller Botelho | ivan-muller-botelho | age |
| 3330 | Axel Stawski | axel-stawski | age |
| 3331 | Analjit Singh | analjit-singh | age |
| 3332 | Yuan Zhimin & family | yuan-zhimin | age |
| 3335 | David Hindawi | david-hindawi | age |
| 3336 | Dr. Dre | dr-dre | age |
| 3340 | Richard Kurtz | richard-kurtz | age |
| 3341 | Rick Jackson | rick-jackson | age |
| 3342 | Robert Johnson | robert-johnson | age |
| 3344 | Stephen Ketchum | stephen-ketchum | age |
| 3345 | Thor Bjorgolfsson | thor-bjorgolfsson | age |
| 3349 | Dariusz Milek | dariusz-milek | age |
| 3350 | Lou Jing & family | lou-jing | age |
| 3351 | Lee Chae-yoon | lee-chae-yoon | age |
| 3352 | Chi Fung Cheng | chi-fung-cheng | age |
| 3353 | Chen Baohua | chen-baohua | age |
| 3356 | Xiong Xiaochuan | xiong-xiaochuan | age |
| 3359 | Ashok Kajaria | ashok-kajaria | age |
| 3360 | Andrew Feldman | andrew-feldman | age |
| 3361 | He Yamin & family | he-yamin | age |
| 3362 | Zhiqiang Lu | zhiqiang-lu | age |
| 3363 | Norman Asbjornson | norman-asbjornson | age |
| 3366 | Yoon Dae-in | yoon-dae-in | age |
| 3367 | Wang Xuefeng | wang-xuefeng | age |
| 3368 | Xia Dinghu | xia-dinghu | age |
| 3371 | Ho Te Yu | ho-te-yu | age |
| 3372 | Roman Sokolov | roman-sokolov | age |
| 3373 | Zhou Mingjie | zhou-mingjie | age |
