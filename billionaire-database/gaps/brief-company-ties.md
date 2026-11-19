# Billionaire Database — research brief: Company memberships — verify and complete

_Generated 2026-11-19 from the 17 Nov 2026 snapshot (3,378 roster people)._

## Context

Companies group billionaires the way ties group people — but 'membership' covers very different attachments: owning the fortune's source, founding it, holding shares, sitting on the board, or softer structures (strategic partners, shared vehicles, ecosystems) that never show up in wealth feeds. Most memberships below come from feed labels and wealth-source tags, not verified records — and most companies are missing members we haven't captured at all.

## Task

For each company, list every billionaire (on or near this list) with a real connection, naming the kind: founder/co-founder, heir/inherited stake, major shareholder, board member, executive, early investor — or a soft structure that doesn't fit a clean category (strategic arrangement, shared vehicle, ecosystem partner). Include source URLs. Also flag anyone listed under 'members we have' who doesn't actually belong.

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

## Gaps (337)

| company | company_uri | members we have | combined worth usd_millions |
|---|---|---|---|
| SpaceX | spacex | Elon Musk (fortune source); Larry Ellison (reported holding); Peter Thiel (reported holding); Gwynne Shotwell (fortune source); Kimbal Musk (fortune source); Bret Johnsen (fortune source) | 1070135 |
| Tesla | tesla | Elon Musk (fortune source); Larry Ellison (researched tie); Rupert Murdoch & family (reported holding); JB Straubel (fortune source); Kimbal Musk (fortune source); KoGuan Leo (inferred feed link) | 1061246 |
| PayPal alumni | paypal-alumni | Elon Musk (researched tie); Peter Thiel (researched tie); Reid Hoffman (researched tie); Max Levchin (researched tie) | 911794 |
| Zip2 | zip2 | Elon Musk (researched tie); Kimbal Musk (researched tie) | 875594 |
| Google | google | Larry Page (fortune source); Sergey Brin (fortune source); Andreas von Bechtolsheim & family (fortune source); Eric Schmidt (fortune source); David Cheriton (fortune source); Vinod Khosla (inferred feed link) | 553041 |
| Walmart | walmart | Rob Walton & family (fortune source); Jim Walton & family (fortune source); Alice Walton (fortune source); Lukas Walton (fortune source); Christy Walton (fortune source); Nancy Walton Laurie (fortune source) | 552970 |
| Amazon | amazon | Jeff Bezos (fortune source); MacKenzie Scott (fortune source); John Doerr (inferred feed link); Douglas Leone (inferred feed link); Mark Stevens (inferred feed link) | 445393 |
| Blue Origin | blue-origin | Jeff Bezos (researched tie) | 376701 |
| Microsoft | microsoft | Steve Ballmer (fortune source); Bill Gates (fortune source); Melinda French Gates (fortune source); Charles Simonyi (fortune source); Reid Hoffman (inferred feed link); Satya Nadella (fortune source) | 329606 |
| Meta | meta | Mark Zuckerberg (fortune source); Eduardo Saverin (fortune source); Peter Thiel (fortune source); Dustin Moskovitz (fortune source); Jeff Rothschild (fortune source); Sean Parker (fortune source) | 301394 |
| Berkshire Hathaway | berkshire-hathaway | Warren Buffett (fortune source); Bill Gates (reported holding); Stewart Horejsi & family (fortune source); Greg Abel (fortune source) | 289973 |
| The Giving Pledge | the-giving-pledge | Warren Buffett (researched tie); Bill Gates (researched tie) | 284280 |
| Broadcom | broadcom | Michael Dell (reported holding); Henry Samueli (reported holding); Henry Nicholas III (inferred feed link) | 251898 |
| Fomento de Construcciones y Contrata | fomento-de-construcciones-y-contrata | Carlos Slim Helu & family (reported holding); Bill Gates (reported holding) | 247186 |
| Dell Technologies | dell-technologies | Michael Dell (fortune source) | 199137 |
| VMware | vmware | Michael Dell (reported holding) | 199137 |
| Koch Industries | koch-industries | Julia Koch & family (fortune source); Charles Koch & family (fortune source); Elaine Marshall & family (fortune source) | 193808 |
| Tether | tether | Giancarlo Devasini (feed profile link); Jean-Louis van der Velde (feed profile link); Paolo Ardoino (feed profile link); Stuart Hoegner (feed profile link) | 190000 |
| Twitter, | twitter | Steve Ballmer (reported holding); Jack Dorsey (fortune source); Evan Williams (fortune source) | 170187 |
| Zara | zara | Amancio Ortega (fortune source); Sandra Ortega Mera (fortune source) | 165659 |
| Stagwell | stagwell | Steve Ballmer (reported holding) | 160702 |
| Oracle | oracle | Larry Ellison (fortune source) | 158282 |
| Skydance | skydance | Larry Ellison (reported holding) | 158282 |
| Waste Management | waste-management | Bill Gates (reported holding); Melinda French Gates (reported holding); Fumio Kaneko (fortune source) | 158012 |
| Banco Santander | banco-santander | Amancio Ortega (reported holding); Sol Daurella (inferred feed link) | 156543 |
| AutoNation | autonation | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| Canadian National Railway | canadian-national-railway | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| Coca-Cola FEMSA | coca-cola-femsa | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| Deere & | deere | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| Givaudan | givaudan | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| OCI | oci | Bill Gates (reported holding); Melinda French Gates (reported holding) | 156212 |
| Enagas | enagas | Amancio Ortega (reported holding) | 152051 |
| Industria de Diseno Textil | industria-de-diseno-textil | Amancio Ortega (reported holding) | 152051 |
| Redeia Corporacion | redeia-corporacion | Amancio Ortega (reported holding) | 152051 |
| Redes Energeticas Nacionais | redes-energeticas-nacionais | Amancio Ortega (reported holding) | 152051 |
| BT Group | bt-group | Carlos Slim Helu & family (reported holding); Sunil Mittal (inferred feed link); Sunil Mittal & family (inferred feed link) | 140791 |
| NVIDIA | nvidia | Jensen Huang (fortune source); Harvey Jones (fortune source); Maky Zanganeh (inferred feed link) | 137764 |
| Bitcoin | bitcoin | Changpeng Zhao (reported holding); Michael Saylor (inferred feed link); Cameron Winklevoss (inferred feed link); Tyler Winklevoss (inferred feed link); Tim Draper (inferred feed link) | 126270 |
| LVMH Moet Hennessy Louis Vuitton | lvmh-moet-hennessy-louis-vuitton | Bernard Arnault & family (reported holding); Alberto Palatchi (inferred feed link); Nicola Bulgari (inferred feed link) | 126147 |
| America Movil SAB de CV (ADR) | america-movil-sab-de-cv-adr | Carlos Slim Helu & family (reported holding) | 125419 |
| Grupo Carso S.A.B. de C.V. (Series A | grupo-carso-s-a-b-de-c-v-series-a | Carlos Slim Helu & family (reported holding) | 125419 |
| Grupo Financiero Inbursa S.A.B. de C | grupo-financiero-inbursa-s-a-b-de-c | Carlos Slim Helu & family (reported holding) | 125419 |
| Impulsora del Desarrollo y el Empleo | impulsora-del-desarrollo-y-el-empleo | Carlos Slim Helu & family (reported holding) | 125419 |
| Minera Frisco | minera-frisco | Carlos Slim Helu & family (reported holding) | 125419 |
| PBF Energy Inc (PBF) | pbf-energy-inc-pbf | Carlos Slim Helu & family (reported holding) | 125419 |
| Realia Business | realia-business | Carlos Slim Helu & family (reported holding) | 125419 |
| Talos Energy | talos-energy | Carlos Slim Helu & family (reported holding) | 125419 |
| Telesites SAB | telesites-sab | Carlos Slim Helu & family (reported holding) | 125419 |
| Birkenstock Holding | birkenstock-holding | Bernard Arnault & family (reported holding); Christian Birkenstock (inferred feed link) | 122800 |
| Arch Capital Group | arch-capital-group | Bill Gates (reported holding) | 121767 |
| Arcos Dorados Holdings | arcos-dorados-holdings | Bill Gates (reported holding) | 121767 |
| Ecolab | ecolab | Bill Gates (reported holding) | 121767 |
| Evolv Technologies Holdings | evolv-technologies-holdings | Bill Gates (reported holding) | 121767 |
| Exicure | exicure | Bill Gates (reported holding) | 121767 |
| Fomento Economico Mex-SP | fomento-economico-mex-sp | Bill Gates (reported holding) | 121767 |
| Ginkgo Bioworks Holdings | ginkgo-bioworks-holdings | Bill Gates (reported holding) | 121767 |
| Grupo Televisa S.A.B Unit | grupo-televisa-s-a-b-unit | Bill Gates (reported holding) | 121767 |
| Heineken Holding | heineken-holding | Bill Gates (reported holding) | 121767 |
| Orascom Construction Industries | orascom-construction-industries | Bill Gates (reported holding) | 121767 |
| Otter Tail | otter-tail | Bill Gates (reported holding) | 121767 |
| Republic Services | republic-services | Bill Gates (reported holding) | 121767 |
| Sika | sika | Bill Gates (reported holding) | 121767 |
| Vicarious Surgical | vicarious-surgical | Bill Gates (reported holding) | 121767 |
| Vroom | vroom | Bill Gates (reported holding) | 121767 |
| Hermes International S.C.A. | hermes-international-s-c-a | Bernard Arnault & family (reported holding) | 120668 |
| LVMH | lvmh | Bernard Arnault & family (fortune source) | 120668 |
| Binance Coin (BNB) | binance-coin-bnb | Changpeng Zhao (reported holding); Matthew Roszak (inferred feed link) | 116873 |
| Adani Enterprises | adani-enterprises | Gautam Adani (reported holding); Vinod Adani (reported holding) | 111176 |
| Adani Green Energy | adani-green-energy | Gautam Adani (reported holding); Vinod Adani (reported holding) | 111176 |
| Adani Port & Special Economic Zone | adani-port-special-economic-zone | Gautam Adani (reported holding); Vinod Adani (reported holding) | 111176 |
| Adani Power | adani-power | Gautam Adani (reported holding); Vinod Adani (reported holding) | 111176 |
| Adani Transmission | adani-transmission | Gautam Adani (reported holding); Vinod Adani (reported holding) | 111176 |
| Bloomberg LP | bloomberg-lp | Michael Bloomberg (fortune source); Thomas Secunda (fortune source); Charles Zegar (fortune source); Duncan MacMillan (fortune source) | 105477 |
| L'Oreal | l-oreal | Francoise Bettencourt Meyers & family (fortune source) | 104327 |
| Mars | mars | Jacqueline Mars (researched tie); John Mars (researched tie) | 100696 |
| Contemporary Amperex Technology | contemporary-amperex-technology | Robin Zeng (reported holding); Huang Shilin (inferred feed link); Yu Yong (inferred feed link); Pei Zhenhua (inferred feed link); Li Ping (inferred feed link) | 96631 |
| Jio Financial Services | jio-financial-services | Mukesh Ambani (reported holding) | 93172 |
| Reliance Industries | reliance-industries | Mukesh Ambani (researched tie) | 93172 |
| Interactive Broker Group, | interactive-broker-group | Thomas Peterffy (reported holding) | 91664 |
| Newsmax | newsmax | Thomas Peterffy (reported holding) | 91664 |
| Log-In Logistica | log-in-logistica | Gianluigi Aponte (reported holding); Rafaela Aponte-Diamant (reported holding) | 89392 |
| Wilson Sons Holdings | wilson-sons-holdings | Gianluigi Aponte (reported holding); Rafaela Aponte-Diamant (reported holding) | 89392 |
| ByteDance / TikTok | bytedance-tiktok | Zhang Yiming (fortune source); Liang Rubo (fortune source) | 86200 |
| Adani Gas | adani-gas | Gautam Adani (reported holding) | 83647 |
| Adani Group | adani-group | Gautam Adani (researched tie) | 83647 |
| Chanel | chanel | Alain Wertheimer (fortune source); Gerard Wertheimer (fortune source) | 78781 |
| First Solar | first-solar | Lukas Walton (reported holding); Christy Walton (reported holding) | 75477 |
| Fidelity | fidelity | Abigail Johnson (fortune source); Edward Johnson IV (fortune source); Elizabeth Johnson (fortune source) | 72369 |
| Fast Retailing | fast-retailing | Tadashi Yanai & family (reported holding) | 71230 |
| Zoom Video Communications | zoom-video-communications | Li Ka-shing (reported holding); Douglas Leone (inferred feed link); Eric Yuan & family (fortune source); Solina Chau (inferred feed link) | 67815 |
| BEIJING WANTAI BIOLOGICAL PHARMACY | beijing-wantai-biological-pharmacy | Zhong Shanshan (reported holding) | 66723 |
| Nongfu Spring | nongfu-spring | Zhong Shanshan (reported holding) | 66723 |
| JD.com | jd-com | Ma Huateng (reported holding); Prince Alwaleed Bin Talal Alsaud (feed profile link) | 66037 |
| Alibaba Group | alibaba-group | Masayoshi Son (researched tie); Jack Ma (researched tie) | 65895 |
| GMexico Transportes | gmexico-transportes | Germán Larrea Mota Velasco & family (reported holding) | 62888 |
| Grupo Mexico | grupo-mexico | Germán Larrea Mota Velasco & family (reported holding) | 62888 |
| Southern Copper | southern-copper | Germán Larrea Mota Velasco & family (reported holding) | 62888 |
| Tencent | tencent | Ma Huateng (reported holding); Zhang Zhidong (inferred feed link); Martin Lau (inferred feed link) | 57033 |
| CK Hutchison | ck-hutchison | Li Ka-shing (reported holding); Michael Kadoorie (inferred feed link) | 56741 |
| Dangote Cement | dangote-cement | Aliko Dangote (reported holding) | 55713 |
| Dangote Sugar Refinery | dangote-sugar-refinery | Aliko Dangote (reported holding) | 55713 |
| National Salt Company of Nigeria | national-salt-company-of-nigeria | Aliko Dangote (reported holding) | 55713 |
| United Bank for Africa | united-bank-for-africa | Aliko Dangote (reported holding) | 55713 |
| Novatek | novatek | Leonid Mikhelson & family (reported holding); Gennady Timchenko (feed profile link); Leonid Simanovsky (inferred feed link) | 54121 |
| Samsung | samsung | Jay Y. Lee (fortune source); Lee Boo-jin (fortune source); Hong Ra-hee (fortune source); Lee Seo-hyun (fortune source) | 52775 |
| Samsung Electronics | samsung-electronics | Jay Y. Lee (reported holding); Lee Boo-jin (inferred feed link); Hong Ra-hee (inferred feed link); Lee Seo-hyun (inferred feed link) | 52775 |
| Walt Disney | walt-disney | Rupert Murdoch & family (reported holding); Laurene Powell Jobs (fortune source); George Lucas (inferred feed link); Safra Catz (inferred feed link); Sheryl Sandberg (inferred feed link) | 52509 |
| Cargill | cargill | Pauline MacMillan Keinath (fortune source); Gwendolyn Sontheim Meyer (fortune source); Austen Cargill II (fortune source); James Cargill II (fortune source); Marianne Liebmann (fortune source); Alexandra Daitch (fortune source) | 50758 |
| Xiaomi Corp. | xiaomi-corp | Lei Jun (feed profile link); Alisher Usmanov (inferred feed link); Lin Bin (inferred feed link); Li Wanqiang (inferred feed link) | 50637 |
| BMW AG | bmw-ag | Susanne Klatten (fortune source); Stefan Quandt (fortune source); Alberto Palatchi (inferred feed link) | 49354 |
| Celsius Holdings | celsius-holdings | Li Ka-shing (reported holding) | 48881 |
| cenovus energy - | cenovus-energy | Li Ka-shing (reported holding) | 48881 |
| CK Asset Holdings | ck-asset-holdings | Li Ka-shing (reported holding) | 48881 |
| CK Infrastructure Holdings | ck-infrastructure-holdings | Li Ka-shing (reported holding) | 48881 |
| Husky Energy | husky-energy | Li Ka-shing (reported holding) | 48881 |
| Hutchison Telecommunications Hong Kong Holdings | hutchison-telecommunications-hong-kong-holdings | Li Ka-shing (reported holding) | 48881 |
| NexGen Energy, | nexgen-energy | Li Ka-shing (reported holding) | 48881 |
| Postal Savings Bank of China | postal-savings-bank-of-china | Li Ka-shing (reported holding) | 48881 |
| Block | block | Len Blavatnik (reported holding); Vinod Khosla (inferred feed link); Jay-Z (inferred feed link) | 48418 |
| Entrust Corp. | entrust-corp | Susanne Klatten (feed profile link); Stefan Quandt (feed profile link); Gregg Hymowitz (inferred feed link) | 48146 |
| Norilsk Nickel Mining & Metallurgica | norilsk-nickel-mining-metallurgica | Vladimir Potanin (reported holding); Roman Abramovich & family (inferred feed link); Alexander Abramov (inferred feed link); Alexander Frolov (inferred feed link) | 47434 |
| Thomson Reuters | thomson-reuters | Sherry Brydson (fortune source); David Thomson (fortune source); Peter Thomson (fortune source); Taylor Thomson (fortune source); Gaye Farncombe (fortune source); Linda Campbell (fortune source) | 46335 |
| Nutella | nutella | Giovanni Ferrero (fortune source) | 45532 |
| Meituan Dianping | meituan-dianping | Ma Huateng (reported holding); Neil Shen (inferred feed link) | 44946 |
| Lactalis | lactalis | Emmanuel Besnier (feed profile link); Jean-Michel Besnier (inferred feed link); Marie Besnier Beauvalot (inferred feed link) | 43777 |
| Midea Group | midea-group | He Xiangjian (reported holding); Fang Hongbo (inferred feed link); Huang Jian (inferred feed link) | 43552 |
| SoftBank Group | softbank-group | Masayoshi Son (researched tie); Nikesh Arora (fortune source); Yoichi & Keiko Erikawa (inferred feed link) | 43081 |
| Red Bull | red-bull | Mark Mateschitz (fortune source) | 42762 |
| Lukoil Holdings | lukoil-holdings | Vagit Alekperov (reported holding); Leonid Fedun (inferred feed link); Anton Fedun (inferred feed link); Ekaterina Fedun (inferred feed link) | 41997 |
| Blackstone Group | blackstone-group | Stephen Schwarzman (reported holding) | 41777 |
| PJT Partners | pjt-partners | Stephen Schwarzman (reported holding) | 41777 |
| C-MER Eye Care Holdings | c-mer-eye-care-holdings | Ma Huateng (reported holding) | 41684 |
| Arm | arm | Masayoshi Son (researched tie) | 41415 |
| Royal Caribbean Cruises | royal-caribbean-cruises | Eyal Ofer (reported holding); Thomas Pritzker (inferred feed link) | 41266 |
| HCA Holdings | hca-holdings | Thomas Frist Jr & family (reported holding) | 41111 |
| Netease.com Inc-ADR | netease-com-inc-adr | William Ding (reported holding) | 40949 |
| Antofagasta | antofagasta | Iris Fontbona & family (reported holding) | 40716 |
| Quinenco | quinenco | Iris Fontbona & family (reported holding) | 40716 |
| Jindal Saw | jindal-saw | Savitri Jindal & family (reported holding) | 40693 |
| Jindal Steel & Power | jindal-steel-power | Savitri Jindal & family (reported holding) | 40693 |
| JSL | jsl | Savitri Jindal & family (reported holding) | 40693 |
| JSW Cement | jsw-cement | Savitri Jindal & family (reported holding) | 40693 |
| JSW Energy | jsw-energy | Savitri Jindal & family (reported holding) | 40693 |
| JSW Infrastructure | jsw-infrastructure | Savitri Jindal & family (reported holding) | 40693 |
| JSW Steel | jsw-steel | Savitri Jindal & family (reported holding) | 40693 |
| Las Vegas Sands | las-vegas-sands | Miriam Adelson & family (reported holding); Karen Pritzker (inferred feed link) | 40324 |
| Beijing HualuBaina Film & TV | beijing-hualubaina-film-tv | He Xiangjian (reported holding) | 40047 |
| Infore Environment Technology Group | infore-environment-technology-group | He Xiangjian (reported holding) | 40047 |
| Midea Real Estate Holding Limited | midea-real-estate-holding-limited | He Xiangjian (reported holding) | 40047 |
| Welling Holding | welling-holding | He Xiangjian (reported holding) | 40047 |
| VinFast | vinfast | Pham Nhat Vuong (reported holding) | 38205 |
| Vingroup Joint Stock Company | vingroup-joint-stock-company | Pham Nhat Vuong (reported holding) | 38205 |
| Arista Networks | arista-networks | Andreas von Bechtolsheim & family (reported holding) | 37674 |
| Lenta International (MICEX) | lenta-international-micex | Alexey Mordashov & family (reported holding) | 36932 |
| Rostelecom | rostelecom | Alexey Mordashov & family (reported holding) | 36932 |
| Severstal JSC | severstal-jsc | Alexey Mordashov & family (reported holding) | 36932 |
| TUI | tui | Alexey Mordashov & family (reported holding) | 36932 |
| Mizrahi Tefahot Bank | mizrahi-tefahot-bank | Eyal Ofer (reported holding); David Wertheim (inferred feed link) | 36574 |
| Chick-fil-A | chick-fil-a | Bubba Cathy (fortune source); Dan Cathy (fortune source); Trudy Cathy White (fortune source) | 36036 |
| Alumis | alumis | Len Blavatnik (reported holding) | 35492 |
| Chime | chime | Len Blavatnik (reported holding) | 35492 |
| Climb Bio | climb-bio | Len Blavatnik (reported holding) | 35492 |
| Constellation Energy | constellation-energy | Len Blavatnik (reported holding) | 35492 |
| Crescent Energy | crescent-energy | Len Blavatnik (reported holding) | 35492 |
| Damora Therapeutics | damora-therapeutics | Len Blavatnik (reported holding) | 35492 |
| Day One Biopharmaceuticals | day-one-biopharmaceuticals | Len Blavatnik (reported holding) | 35492 |
| Deezer | deezer | Len Blavatnik (reported holding) | 35492 |
| DigitalOcean | digitalocean | Len Blavatnik (reported holding) | 35492 |
| Disc Medicine | disc-medicine | Len Blavatnik (reported holding) | 35492 |
| Gamida Cell | gamida-cell | Len Blavatnik (reported holding) | 35492 |
| Hemab Therapeutics | hemab-therapeutics | Len Blavatnik (reported holding) | 35492 |
| LyondellBasell | lyondellbasell | Len Blavatnik (reported holding) | 35492 |
| OnKure Therapeutics | onkure-therapeutics | Len Blavatnik (reported holding) | 35492 |
| Opendoor Technologies | opendoor-technologies | Len Blavatnik (reported holding) | 35492 |
| Surrozen | surrozen | Len Blavatnik (reported holding) | 35492 |
| Syndax Pharmaceuticals | syndax-pharmaceuticals | Len Blavatnik (reported holding) | 35492 |
| Upstream Bio | upstream-bio | Len Blavatnik (reported holding) | 35492 |
| Warner Music Group | warner-music-group | Len Blavatnik (reported holding) | 35492 |
| Yarrow Bioscience | yarrow-bioscience | Len Blavatnik (reported holding) | 35492 |
| Zhihu | zhihu | Len Blavatnik (reported holding) | 35492 |
| Zura Bio | zura-bio | Len Blavatnik (reported holding) | 35492 |
| Airbnb | airbnb | Brian Chesky (fortune source); Nathan Blecharczyk (fortune source); Joe Gebbia (fortune source) | 34830 |
| Palantir | palantir | Peter Thiel (reported holding); Shyam Sankar (fortune source) | 34447 |
| Grupo Televisa, S.A.B. | grupo-televisa-s-a-b | Melinda French Gates (reported holding) | 34444 |
| Orascom Construction | orascom-construction | Melinda French Gates (reported holding) | 34444 |
| AKVA Group | akva-group | Idan Ofer (reported holding) | 34430 |
| ICL Group | icl-group | Idan Ofer (reported holding) | 34430 |
| OPC Energy | opc-energy | Idan Ofer (reported holding) | 34430 |
| ZIM Integrated Shipping Services | zim-integrated-shipping-services | Idan Ofer (reported holding) | 34430 |
| Chemomab Therapeutics | chemomab-therapeutics | Peter Thiel (reported holding) | 33273 |
| Melisron | melisron | Eyal Ofer (reported holding) | 33154 |
| New Zealand Oil & Gas | new-zealand-oil-gas | Eyal Ofer (reported holding) | 33154 |
| ArcelorMittal | arcelormittal | Lakshmi Mittal (reported holding); Jose Maria Aristrain (inferred feed link) | 31358 |
| Pinduoduo | pinduoduo | Colin Huang (reported holding); Neil Shen (inferred feed link) | 30790 |
| HCL Infosystems | hcl-infosystems | Shiv Nadar (reported holding) | 30491 |
| HCL Technologies | hcl-technologies | Shiv Nadar (reported holding) | 30491 |
| H&M | h-m | Stefan Persson (fortune source); Lottie Tham & family (fortune source); Karl-Johan Persson (fortune source); Tom Persson (fortune source); Charlotte Soderstrom (fortune source) | 30465 |
| Lego | lego | Sofie Kirk Kristiansen (fortune source); Thomas Kirk Kristiansen (fortune source); Agnete Kirk Thinggaard (fortune source); Kjeld Kirk Kristiansen (fortune source) | 30248 |
| Huayi Brothers Media Corp | huayi-brothers-media-corp | Jack Ma (feed profile link); Lu Weiding (inferred feed link) | 30103 |
| Aperam | aperam | Lakshmi Mittal (reported holding) | 29859 |
| Breedon Group | breedon-group | Lakshmi Mittal (reported holding) | 29859 |
| Nostrum Oil & Gas | nostrum-oil-gas | Lakshmi Mittal (reported holding) | 29859 |
| TCS Group Holding (MICEX) | tcs-group-holding-micex | Vladimir Potanin (reported holding) | 29740 |
| Yandex (MICEX) | yandex-micex | Vladimir Potanin (reported holding) | 29740 |
| Orchid Chemicals & Pharmaceuticals Limited | orchid-chemicals-pharmaceuticals-limited | Cyrus Poonawalla (reported holding) | 29385 |
| Poonawalla Fincorp | poonawalla-fincorp | Cyrus Poonawalla (reported holding) | 29385 |
| Hengli Petrochemical | hengli-petrochemical | Chen Jianhua (feed profile link); Fan Hongwei (inferred feed link) | 29244 |
| Archer Aviation | archer-aviation | Brett Adcock (feed profile link); Marc Lore (inferred feed link) | 28493 |
| Diamondback Energy, Inc. - Commmon Stock | diamondback-energy-inc-commmon-stock | Lyndal Stephens Greth & family (reported holding) | 28391 |
| ACC | acc | Vinod Adani (reported holding) | 27529 |
| Ambuja Cements | ambuja-cements | Vinod Adani (reported holding) | 27529 |
| Rocket Companies | rocket-companies | Daniel Gilbert (feed profile link); Jennifer Gilbert (inferred feed link) | 27173 |
| Rocket Mortgage | rocket-mortgage | Daniel Gilbert (fortune source); Jennifer Gilbert (fortune source) | 27173 |
| Sun Pharma Advanced Research | sun-pharma-advanced-research | Dilip Shanghvi (reported holding) | 26801 |
| Sun Pharmaceutical Industries | sun-pharmaceutical-industries | Dilip Shanghvi (reported holding) | 26801 |
| Suzlon Energy | suzlon-energy | Dilip Shanghvi (reported holding) | 26801 |
| Legends Hospitality Management | legends-hospitality-management | Jerry Jones & family (feed profile link); Hal Steinbrenner (inferred feed link); Jennifer Steinbrenner Swindal (inferred feed link) | 26790 |
| Spotify | spotify | Daniel Ek (fortune source); Martin Lorentzon (fortune source) | 26671 |
| Secure Trust Bank | secure-trust-bank | Steve Cohen (reported holding) | 26669 |
| JOYY Inc. Sponsored ADR | joyy-inc-sponsored-adr | Lei Jun (feed profile link); David Xueling Li (inferred feed link) | 25959 |
| Nike | nike | Phil Knight & family (fortune source) | 25774 |
| Polyus Gold | polyus-gold | Suleiman Kerimov & family (reported holding) | 25662 |
| Cheil Industries | cheil-industries | Jay Y. Lee (reported holding) | 25654 |
| Samsung Engineering | samsung-engineering | Jay Y. Lee (reported holding) | 25654 |
| Samsung Fire & Marine Insurance | samsung-fire-marine-insurance | Jay Y. Lee (reported holding) | 25654 |
| Samsung Life Insurance | samsung-life-insurance | Jay Y. Lee (reported holding) | 25654 |
| Samsung SDS | samsung-sds | Jay Y. Lee (reported holding) | 25654 |
| Fox | fox | Rupert Murdoch & family (reported holding) | 25572 |
| News | news | Rupert Murdoch & family (reported holding) | 25572 |
| Novolipetsk Steel OJSC | novolipetsk-steel-ojsc | Vladimir Lisin (reported holding) | 25532 |
| OpenAI | openai | Greg Brockman (fortune source) | 25486 |
| eBay | ebay | Pierre Omidyar (fortune source); Jeff Skoll (fortune source); Meg Whitman (fortune source) | 24427 |
| Dallas Cowboys | dallas-cowboys | Jerry Jones & family (fortune source) | 23336 |
| WhatsApp | whatsapp | Jan Koum (fortune source); Brian Acton (fortune source) | 22100 |
| Apple | apple | Laurene Powell Jobs (fortune source); Tim Cook (fortune source); Art Levinson (fortune source) | 21290 |
| Heineken | heineken | Charlene de Carvalho-Heineken & family (fortune source) | 18053 |
| Carnival Cruises | carnival-cruises | Micky Arison & family (fortune source); Shari Arison (fortune source) | 18030 |
| Aldi | aldi | Theo Albrecht Jr & family (fortune source) | 17646 |
| Trader Joe's | trader-joe-s | Theo Albrecht Jr & family (fortune source) | 17646 |
| New England Patriots | new-england-patriots | Robert Kraft (fortune source) | 15233 |
| PayPal | paypal | Pierre Omidyar (fortune source) | 13991 |
| Home Depot | home-depot | Arthur Blank (fortune source) | 13550 |
| Franklin Templeton | franklin-templeton | Charles B. Johnson (fortune source); Rupert Johnson Jr (fortune source) | 12920 |
| Houston Rockets | houston-rockets | Tilman Fertitta (fortune source) | 12546 |
| Manchester United | manchester-united | Avram Glazer (fortune source); Bryan Glazer (fortune source); Darcie Glazer Kassewitz (fortune source); Edward Glazer (fortune source); Joel Glazer (fortune source); Kevin Glazer (fortune source) | 12066 |
| Tampa Bay Buccaneers | tampa-bay-buccaneers | Avram Glazer (fortune source); Bryan Glazer (fortune source); Darcie Glazer Kassewitz (fortune source); Edward Glazer (fortune source); Joel Glazer (fortune source); Kevin Glazer (fortune source) | 12066 |
| Estée Lauder | est-e-lauder | Ronald Lauder (fortune source); Jane Lauder (fortune source); William Lauder (fortune source); Aerin Lauder (fortune source) | 11594 |
| New Orleans Saints | new-orleans-saints | Gayle Benson (fortune source) | 11199 |
| Shein | shein | Maggie Gu (fortune source); Molly Miao (fortune source); Ren Xiaoqing (fortune source) | 11130 |
| Hyundai | hyundai | Mong-Koo Chung (fortune source); Euisun Chung (fortune source) | 11035 |
| Baltimore Ravens | baltimore-ravens | Stephen Bisciotti (fortune source) | 10731 |
| Loews | loews | Jonathan Tisch (fortune source); Laurie Tisch (fortune source); Steven Tisch (fortune source); James Tisch (fortune source); Andrew Tisch (fortune source) | 10694 |
| Subway | subway | Elisabeth DeLuca & family (fortune source) | 10206 |
| Sun Microsystems | sun-microsystems | Vinod Khosla (fortune source) | 10122 |
| San Francisco 49ers | san-francisco-49ers | Denise York & family (fortune source) | 10022 |
| Uber | uber | Garrett Camp (fortune source); Travis Kalanick (fortune source); Ryan Graves (fortune source) | 9635 |
| Yahoo | yahoo | David Filo (fortune source); Jerry Yang (fortune source); Marissa Mayer (fortune source) | 9604 |
| TD Ameritrade | td-ameritrade | J. Joe Ricketts & family (fortune source) | 8842 |
| Philadelphia Eagles | philadelphia-eagles | Jeffrey Lurie (fortune source) | 8841 |
| U-Haul | u-haul | Mark Shoen (fortune source); E. Joe Shoen (fortune source) | 8587 |
| Netscape | netscape | James Clark (fortune source) | 8339 |
| Kansas City Chiefs | kansas-city-chiefs | Clark Hunt & family (fortune source); Daniel Hunt & family (fortune source); Lamar Hunt Jr & family (fortune source); Sharron Hunt & family (fortune source) | 8002 |
| Houston Texans | houston-texans | Cal McNair (fortune source) | 7734 |
| Cincinnati Bengals | cincinnati-bengals | Mike Brown & family (fortune source) | 7638 |
| Campbell Soup | campbell-soup | John Dorrance III (fortune source); Bennett Dorrance (fortune source); Charlotte Colket Weber (fortune source) | 7584 |
| Little Caesars Pizza | little-caesars-pizza | Marian Ilitch & family (fortune source) | 7580 |
| Square | square | Jack Dorsey (fortune source) | 7534 |
| Alo Yoga | alo-yoga | Danny Harris (fortune source); Marco DeGeorge (fortune source) | 7421 |
| In-N-Out Burger | in-n-out-burger | Lynsi Snyder (fortune source) | 7268 |
| New York Giants | new-york-giants | Jonathan Tisch (fortune source); Laurie Tisch (fortune source); Steven Tisch (fortune source) | 7110 |
| New Balance | new-balance | Jim Davis & family (fortune source) | 6900 |
| Dallas Mavericks | dallas-mavericks | Mark Cuban (fortune source) | 6846 |
| Gap | gap | John Fisher (fortune source); Robert Fisher (fortune source); William Fisher (fortune source) | 6732 |
| Groupon | groupon | Eric Lefkofsky (fortune source) | 6368 |
| Jersey Mike's Subs | jersey-mike-s-subs | Peter Cancro (fortune source) | 6104 |
| Timberland | timberland | Archie Aldis Emmerson & family (fortune source) | 6047 |
| Marvel Comics | marvel-comics | Isaac Perlmutter (fortune source) | 5881 |
| Getty Oil | getty-oil | Gordon Getty & family (fortune source) | 5755 |
| Gemini | gemini | Cameron Winklevoss (researched tie); Tyler Winklevoss (researched tie) | 5589 |
| Indianapolis Colts | indianapolis-colts | Carlie Irsay-Gordon (fortune source); Casey Foyt (fortune source); Kalen Jackson (fortune source) | 5546 |
| Star Wars | star-wars | George Lucas (fortune source) | 5526 |
| Coca Cola Israel | coca-cola-israel | David Wertheim (fortune source); Drorit Wertheim (fortune source) | 5363 |
| Washington Commanders | washington-commanders | Dan Snyder (fortune source) | 5341 |
| Best Buy | best-buy | Richard Schulze (fortune source) | 5221 |
| Dolby Laboratories | dolby-laboratories | Dagmar Dolby & family (fortune source) | 5186 |
| Jet.com | jet-com | Marc Lore (fortune source) | 5112 |
| Johnson & Johnson | johnson-johnson | Robert Johnson & family (fortune source) | 4980 |
| New York Jets | new-york-jets | Robert Johnson & family (fortune source) | 4980 |
| Los Angeles Angels | los-angeles-angels | Arturo Moreno (fortune source) | 4927 |
| Lululemon | lululemon | Chip Wilson (fortune source) | 4873 |
| Dick's Sporting Goods | dick-s-sporting-goods | Edward Stack & family (fortune source) | 4697 |
| Charlotte Hornets | charlotte-hornets | Michael Jordan (fortune source) | 4663 |
| ABInBev | abinbev | Alexandre Van Damme (fortune source) | 4657 |
| EasyJet | easyjet | Stelios Haji-Ioannou (fortune source); Polys Haji-Ioannou (fortune source); Clelia Haji-Ioannou (fortune source) | 4335 |
| LG | lg | Koo Kwang-mo (fortune source); Koo Bon-sik (fortune source) | 4161 |
| Netflix | netflix | Reed Hastings (fortune source) | 4057 |
| Jack Link's meat snacks | jack-link-s-meat-snacks | Jack Link & family (fortune source) | 4000 |
| Snap Inc. | snap-inc | Evan Spiegel (fortune source); Bobby Murphy (fortune source) | 3759 |
| Starbucks | starbucks | Howard Schultz (fortune source) | 3631 |
| Roku | roku | Anthony Wood (fortune source) | 3519 |
| IKEA | ikea | Jonas Kamprad (fortune source); Mathias Kamprad (fortune source); Peter Kamprad (fortune source) | 3409 |
| Las Vegas Raiders | las-vegas-raiders | Mark Davis (fortune source) | 3317 |
| Urban Outfitters | urban-outfitters | Richard Hayne & family (fortune source) | 3118 |
| Virgin Group | virgin-group | Richard Branson (fortune source) | 2810 |
| WeWork | wework | Adam Neumann (fortune source) | 2803 |
| Tennessee Titans | tennessee-titans | Amy Adams Strunk (fortune source) | 2771 |
| Formula One | formula-one | Bernard Ecclestone & family (fortune source) | 2630 |
| LinkedIn | linkedin | Reid Hoffman (fortune source) | 2628 |
| Flipkart | flipkart | Binny Bansal (fortune source); Sachin Bansal (fortune source) | 2563 |
| SAP | sap | Hans-Werner Hector (fortune source) | 2488 |
| Campbell's Soup | campbell-s-soup | Mary Alice Malone Jr (fortune source); Catherine Malone (fortune source) | 2421 |
| FIAT | fiat | John Elkann (fortune source) | 2371 |
| Arca Continental | arca-continental | Cynthia Helena Grossman Fleishman (fortune source) | 2364 |
| Golden State Warriors | golden-state-warriors | Joe Lacob (fortune source) | 2344 |
| AOL | aol | Steve Case (fortune source) | 2343 |
| Instagram | instagram | Kevin Systrom (fortune source) | 2316 |
| Columbia Sportswear | columbia-sportswear | Timothy Boyle (fortune source) | 2184 |
| Sears | sears | Edward Lampert (fortune source) | 2174 |
| Genentech | genentech | Art Levinson (fortune source) | 2017 |
| Waffle House | waffle-house | Joe Rogers Jr (fortune source) | 1984 |
| DirecTV | directv | Stanley Hubbard (fortune source) | 1799 |
| Nascar | nascar | James France (fortune source) | 1771 |
| General Electric | general-electric | Larry Culp (fortune source) | 1745 |
| Cirque du Soleil | cirque-du-soleil | Guy Laliberté (fortune source) | 1698 |
| Le Creuset | le-creuset | Paul Van Zuydam (fortune source) | 1616 |
| Motorola | motorola | Greg Brown (fortune source) | 1556 |
| Law & Order | law-order | Dick Wolf (fortune source) | 1539 |
| Reebok | reebok | Paul Fireman (fortune source) | 1489 |
| Comcast | comcast | Brian Roberts (fortune source) | 1477 |
| Spanx | spanx | Sara Blakely (fortune source) | 1416 |
| Korea Investment Holdings | korea-investment-holdings | Kim Nam-goo (fortune source) | 1235 |
| GoPro | gopro | Nicholas Woodman (fortune source) | 1216 |
| Yandex | yandex | Vladimir Ivanov (fortune source) | 1190 |
| Hello Kitty | hello-kitty | Shintaro Tsuji (fortune source) | 1186 |
| Pinterest | pinterest | Paul Sciarra (fortune source) | 1039 |
| BET | bet | Robert Johnson (fortune source) | 1000 |
| Polymarket | polymarket | Shayne Coplan (fortune source) | 1000 |
