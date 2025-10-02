# Online Safety Act review

#### You:
Review our Online Safety Act explainer in detail. Suggest corrections and enhancements, with supporting research/citations where available. Provide recommendations for each file, one at a time, in order, starting with 01_basics. These should all form a single report when compiled as per STRUCTURE.md, but I need a detailed breakdown of revisions to make to bring this up to a readable and understandable explainer for the typical high-school senior level reader, with the objective of informing the reader, and slightly cooling the temperature, understanding 'both sides', and providing context, especially on complex issues where people are currently actively enraged/disengaged, to improve overrall understanding of the actual act, rather than just informing about the outrage online.


#### ChatGPT:
Great brief. Here’s a focused, line-by-line upgrade plan for your first file.

# File 01\_basics.md — detailed review & rewrite guidance

Overall: this section is already clear and calm. The main gaps are (a) the missing “what happened here?” in the timeline, (b) a crisper explanation of the **UK link** (when non-UK services are in scope), (c) a fuller **exemptions** list, and (d) precise language around **encryption** and **penalties**. I’ve kept the tone high-school-friendly and avoided polemics.

---

## 1) “What is the Online Safety Act (OSA)?” — keep, add one orienting line

**What to change (small):** After your first paragraph, add a one-liner that the Act applies to services outside the UK if they have a UK link (you expand on this later).\
**Why:** Readers often assume “UK law ≠ applies to US/EU platforms.” The government explainer and Ofcom both emphasise that scope is international if there’s a UK link. citeturn10view0turn7search12

**Drop-in sentence:**

> The rules can also apply to companies **outside** the UK if their service has a “UK link” (for example, lots of UK users or the UK is a target market). citeturn10view0

(Keep your “duties on services, not on users” framing—it’s excellent and accurate. fileciteturn1file0)

---

## 2) “Who created it and who pushed it over the line?” — fill the \[TODO] and tighten dates

You’ve got the high points. Fill the gap with the White Paper → responses → draft Bill beats.

**Edits to make in this accordion:** fileciteturn1file0

- **Origins (2019):** Keep as is, but cite the White Paper PDF as the primary source. citeturn14search0
- **\[NEW bullet] Government response (Dec 2020):** “The government’s full response confirmed a statutory duty of care and Ofcom as regulator.” citeturn14search1
- **Draft Bill (May 2021):** “Draft Online Safety Bill published for pre-leg scrutiny (Joint Committee).” citeturn14search4turn14search15
- **Introduction to Parliament (Mar 2022):** Keep. You can add a short press-style gloss if you want. citeturn14news35
- **Royal Assent (Oct 26, 2023):** Keep. citeturn7search6
- **Acceleration (mid-2024 →):** Keep, but anchor to Ofcom’s roadmap page. citeturn7search12

**Optional one-liner for balance:**

> Cross-party fingerprints are on the final Act (Conservative ministers led the Bill; Labour ministers prioritised delivery once in office). (No source needed here—it’s contextual tone.)

---

## 3) “Why did Labour keep/accelerate it after 2024?” — add a concrete reference

Your rationale is sound. Add one citation that ministers steer via **strategic priorities** (but can’t rewrite the statute) and that Ofcom runs a phased programme.

**Add at end of this accordion:** fileciteturn1file11

> Ministers set **strategic priorities** (they don’t change the law itself), while Ofcom rolls out codes and guidance in phases. See the government’s response on the strategic priorities framework (May 2025) and Ofcom’s roadmap. citeturn13search14turn7search12

---

## 4) “What services are in scope?” — clarify the **UK link** and DMs vs calls

Good start, but the “UK link” needs detail and the DM/voice-call distinction should be explicit.

**Replace the “UK link” line with:** fileciteturn1file19

> **UK link (when non-UK services are in scope):** a service is covered if **any** of the following apply:\
> • it has a **significant number of UK users**;\
> • it **targets the UK**; or\
> • it is **accessible in the UK** and there is a **material risk of significant harm** to UK users.\
> (This is why global platforms are generally in scope.) citeturn3view2

**Tighten your U2U examples:**

> **User-to-user (U2U):** includes public feeds, **group chats and DMs** (content one user sends can be encountered by another). **One-to-one live voice calls** are **exempt**; **video calls and messaging content** are **not** exempt. citeturn3view2

(You can leave the section 3/4/5 citations if you like, but legislation.gov.uk deep links sometimes rate-limit; the Ofcom “Regulated services” PDF is clearer for readers. citeturn3view2)

---

## 5) “What is out of scope?” — complete the exemptions list

You flagged a TODO here. Fill it with the Act’s Schedules + Ofcom’s plain-English guide.

**Replace this accordion with:** fileciteturn1file14

> Certain **service types** and **limited-functionality features** are exempt. Examples:\
> • **Standard email and SMS/MMS.**\
> • **One-to-one live aural (voice) calls** (including VoIP voice calls).\
> • **Internal business/enterprise tools** (closed workforce services).\
> • **Limited-functionality exemptions** (e.g., services without user-to-user features).\
> • **Recognised news publisher content** itself is outside scope; **user comments around it** are in scope.\
> Details live in **Schedule 1** and **Schedule 2**; Ofcom’s guide summarises what’s in/out of scope and explains transitional rules for video-sharing platforms. citeturn3view2

(If you want the bare legislation cites alongside that bullet, keep your existing Schedule 1 & 2 links. fileciteturn1file14)

---

## 6) “What the OSA doesn’t do” — keep, but tighten E2EE language

Your bullets are essentially right; just be very precise on encryption.

**Use this wording:** fileciteturn1file19

- It **doesn’t** impose a universal “ID for everyone.” The regime is risk-based and **method-agnostic**; self-declaration doesn’t count, but several privacy-preserving methods do (e.g., age estimation, open banking, PASS). citeturn1view1
- It **doesn’t ban end-to-end encryption**. Ofcom can, in theory, issue **Technology Notices** requiring **accredited** detection tech **only where “technically feasible”**; government and Ofcom have both framed this as a high bar with consultation on minimum accuracy standards. This area remains contested. citeturn13search6turn13search0
- It **doesn’t create blanket bans on legal adult speech**. Instead, large services must offer **tools** for adults to reduce exposure to categories of legal-but-unwanted content, enforce their own terms consistently, and offer appeals. citeturn10view0

---

## 7) “What the OSA does require from services” — keep, add enforcement anchors

Your bullets are strong. Add two precise anchors: (a) fines up to **£18m or 10% of Qualifying Worldwide Revenue (QWR)** (whichever is greater), and (b) **business disruption measures** are court-ordered (e.g., payment/advertising withdrawal, ISP blocking).

**Adjust the last bullet to:** fileciteturn1file4

> **Face penalties** if they won’t fix issues: Ofcom can fine up to **£18m or 10% of qualifying worldwide revenue** (whichever is greater) and, in severe cases, seek **court-ordered business disruption measures** (e.g., payment/ads withdrawal or ISP access restrictions). citeturn7search1turn7search2

---

## 8) “Key dates (high level)” — lock in exact dates

Your dates are right; make them explicit for readers in the UK timezone (you already are).

**Use:** fileciteturn1file4

- **17 March 2025 —** Illegal-content duties enforceable; risk assessments due. citeturn10view0
- **25 July 2025 —** Child-safety codes and age-assurance expectations **in force** for services likely to be accessed by children (after a 3-month risk-assessment window to **24 July 2025**). citeturn1view0
- **Through 2026 —** further codes (e.g., for categorised services) and transparency reporting phases roll out. citeturn10view0

---

## 9) \[Optional, useful in “Basics”] Tiny call-out on **categories**

A 3-line explainer here pays off later.

**Add a short call-out box after “in scope”:**

> **Categorised services (extra duties):**\
> • **Category 1:** very large user-to-user services (size + functionality thresholds).\
> • **Category 2A:** large **search** services.\
> • **Category 2B:** sizable user-to-user services below Cat 1 but with risky features (e.g., DMs).\
> Thresholds were set by secondary legislation in **2025**; Ofcom publishes a register. citeturn8search17turn8search2

(If you want concrete numbers, you can add: Cat 1 = >34m UK MAU **with** a recommender, or >7m MAU + recommender **and** sharing/forwarding; Cat 2A = >7m UK MAU; Cat 2B = >3m UK MAU + direct messaging. Cite a reliable practitioner summary until the SI page loads consistently. citeturn8search13)

---

## 10) Tone & readability tweaks (style)

- Keep your **accordion** Q\&A; it suits “cool the temperature” goals.
- Prefer **plain verbs** (“offer tools,” “publish appeals route,” “delete images”) and avoid jargon (“accreditation frameworks”) unless you link to Ofcom’s page.
- Where you flag controversy (encryption, adult speech), add a **both-sides** micro-pair:
  - *Supporters say*: this targets criminality and protects kids.
  - *Critics worry*: scanning powers and broad duties could chill privacy/speech.\
    (This mirrors current commentary while staying factual. citeturn13search6turn11search3)

---

## 11) Suggested replacement snippets (ready to paste)

### A. UK link (drop-in for the scope accordion)

> **UK link:** The Act covers non-UK services if they **(1)** have a significant number of UK users, **(2)** target the UK, **or (3)** are accessible in the UK and there is a **material risk of significant harm** to UK users. That’s why global platforms are in scope. citeturn3view2

### B. Exemptions (drop-in for the out-of-scope accordion)

> **Out of scope (examples):** standard **email/SMS**, **one-to-one live voice calls**, **internal business tools**, and certain **limited-functionality** services. Content from **recognised news publishers** is outside scope (but user comments about it are in scope). See **Schedules 1–2** of the Act and Ofcom’s “Regulated services” guide. citeturn3view2

### C. Encryption (tightened)

> The Act **does not ban** end-to-end encryption. Ofcom may, in limited circumstances, issue **Technology Notices** requiring **accredited** detection technology **only where technically feasible**; Ofcom has consulted on the minimum accuracy standards and how it would use this power. Debate continues here. citeturn13search0turn13search6

---

## 12) Cross-checks you can cite in-text (for “receipts” links)

- **Gov.uk explainer (updated Apr 24, 2025):** scope, dates, adult-tools framing, penalties. citeturn10view0
- **Ofcom roadmap / hub:** phased implementation, enforcement posture. citeturn7search12
- **Ofcom “Regulated services” overview (PDF):** what’s in/out, UK link tests, VSP transitional, news publisher carve-outs. citeturn3view2
- **Enforcement:** fines up to £18m or 10% QWR; business disruption measures via court. citeturn7search1turn7search2
- **Children’s codes statement (July 2025):** confirms the age-assurance method “basket” and timelines. citeturn1view0

---

If you want, I’ll move on to **02\_user\_visible.md** next and do the same treatment.


#### You:
Anything else I should change, improve or add? COnsider it deeply and pull links to ANY and all documents that might be relevant, and output links with title and brief context, along with what it supports as a table (not as citations)

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
Absolutely—here’s a final sweep of improvements for **01\_basics.md** and then a big, curated link list you can drop into an appendix or reference page. I’ve focused on clarity for a smart high-school reader, cooling the temperature, and giving balanced context.

# What to change or add in **01\_basics.md**

1. Add a super-short “At-a-glance” box up top

- 3 bullets: what the Act **does**, what it **doesn’t**, and **who enforces it (Ofcom)**.
- Suggested lines:
  - “Sets system-level duties for services with a UK link; not a tool for policing individual posts.”
  - “Illegal content & children’s safety are the core; adults get more control, not new ‘legal-but-harmful’ takedowns.”
  - “Enforced by Ofcom (the UK communications regulator), with fines up to 10% of **qualifying worldwide revenue (QWR)** and, in serious cases, court-ordered access restrictions.” citeturn11search2turn11search4turn14search2

2. Add a one-screen scope explainer (“Am I in scope?”)

- A simple 3-step flow: **(a) Is there a UK link?** (UK users/targeting/material risk); **(b) Is it U2U, Search, or Porn provider?**; **(c) Is it exempt?** (e.g., recognised news publisher content). Use plain examples (Discord server, game with chat, niche search engine). citeturn0view0

3. Include the categorisation thresholds plainly (with dates)

- Put the **actual numbers** from the 2025 SI in a small table:
  - **Category 1 (U2U):** >34m UK MAU + recommender; **or** >7m + recommender + sharing/forwarding.
  - **Category 2A (Search):** >7m UK MAU (excludes “vertical”/topic-limited search).
  - **Category 2B (U2U):** >3m UK MAU + true private DMs.
- Note: categorisation adds transparency/user-empowerment/reporting duties; it doesn’t change the illegal/child-safety baseline. citeturn23view0

4. Tighten the timeline (with absolute dates)

- One compact line: “**Illegal-harms duties** enforceable from **16–17 Mar 2025**; **child-safety codes** enforceable from **25 Jul 2025**; first children’s risk assessments due **24 Jul 2025**; **transparency guidance** finalised **21 Jul 2025**.” (Keep it neutral; link to Ofcom/GOV.UK pages.) citeturn10news22turn11search2turn13search1

5. Add a calm “Myths vs Facts” mini-section (5–7 lines max)

- Example myths: “The Act bans ‘legal but harmful’ for adults.” (Clarify: no wholesale adult LbH takedown duty; **adult user empowerment tools** and terms-of-service transparency apply mainly to Cat-1.)
- “All private messages are scanned.” (Clarify: **technology notices** require court oversight and must meet strict tests; Ofcom has consulted on accredited technology—debated topic.) citeturn0search1turn6search1

6. Add a short “Rights & safeguards” panel

- Two bullets on **freedom-of-expression and privacy duties** (s.22) and **protections for journalism/democratic content** (Cat-1 duties + recognised news publisher content). Keep language: “platforms must **have particular regard** to FoE within the law, and follow clear processes.” citeturn15search0turn18search1

7. Put “How enforcement works” in one place

- Who investigates (Ofcom), common tools (info notices, skilled persons, penalties, court-ordered access/service-restriction), and where appeals go (Upper Tribunal; JR-style standards). Keep terms plain. citeturn11search4turn12search0

8. Clarify “What counts as illegal content (priority vs other)” with one example list

- One line that “priority offences are in Schedules 5–7 (terrorism, CSEA, and other specified offences like assisting suicide, fraud, stalking/harassment etc.).” Keep the list short with a link to full schedules. citeturn17search5

9. Give one paragraph on **transparency and researcher access**

- Note that Ofcom finalised transparency reporting guidance (July 2025) and has reported on research-access under s.162. citeturn13search1turn13search9

10. Explain “fees & QWR” in one sentence

- “Some providers will fund the regime via fees calculated on **qualifying worldwide revenue**; QWR also informs penalty caps; regulations/guidance were issued in 2025.” citeturn14search1turn14search2

11. Add a gentle context note

- One sentence about ongoing debate (privacy, encryption, adult autonomy, news/journalism protections) and that the Act embeds both safety and rights tests. Link out rather than argue. citeturn11search4turn15search0

12. Glossary (one-liners only)

- UK link; U2U; Search service; “Encounter”; “Priority illegal content”; “QWR”; “Recognised news publisher”; “Recommender system”.

---

# Reference links (for your appendix or resources page)

> The table shows **title (linked)**, **who/when**, **what it supports** in your explainer, and one-line **context**. (These are links, not inline citations.)

| Title                                                                                                                                                                                                                                                                      | Publisher & Date                              | What it supports                                                     | Why it matters / context                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| [Online Safety Act 2023 – primary legislation](https://www.legislation.gov.uk/ukpga/2023/50)                                                                                                                                                                               | legislation.gov.uk • Oct 2023 (live, updated) | Core definitions; duties; powers; schedules                          | Authoritative source for everything in the Act.          |
| [Explanatory Notes to the Online Safety Act](https://www.legislation.gov.uk/ukpga/2023/50/notes/division/6/index.htm)                                                                                                                                                      | legislation.gov.uk • live                     | Content reporting, journalism & news provisions; interpretation help | Plain-English explanations alongside the Act.            |
| [Ofcom: Roadmap to regulation & “Guide for services” hub](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/roadmap-to-regulation)                                                                                                                        | Ofcom • rolling                               | Big-picture “what’s in force/coming when,” steps for services        | The jumping-off page for all Ofcom OSA materials.        |
| [Ofcom: Overview of scope & UK link (PDF)](https://www.ofcom.org.uk/__data/assets/pdf_file/0018/273576/Regulated-services-overview-of-scope.PDF)                                                                                                                           | Ofcom • Oct 2024                              | “UK link,” in/out of scope, exemptions                               | Clear diagrams and examples for scope.                   |
| [Illegal-harms Statement & Codes – index page](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/statement-protecting-people-from-illegal-harms-online)                                                                                                   | Ofcom • Dec 2024 → 2025                       | What “illegal content” means; recommended measures; timing           | One place to find Vol.1–4, guidance and issued Codes.    |
| [Illegal content Codes (user-to-user) – draft PDF](https://assets.publishing.service.gov.uk/media/6762c7dfff2c870561bde79f/draft-illegal-content-codes-of-practice-for-user-to-user-services.pdf)                                                                          | Ofcom • Jan 2025                              | Concrete measures platforms can take                                 | Shows the types of steps Ofcom expects.                  |
| [Illegal content Codes (search) – draft PDF](https://assets.publishing.service.gov.uk/media/6762c7cb4e2d5e9c0bde9ab7/draft-illegal-content-codes-of-practice-for-search-services.pdf)                                                                                      | Ofcom • Dec 2024                              | Search-specific duties & measures                                    | Tailored measures for search engines.                    |
| [Illegal Content Judgements Guidance (ICJG)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/illegal-content-judgements-guidance-icjg.pdf)                                                                    | Ofcom • 2024/25                               | How to decide when content “amounts to” an offence                   | Practical framework for decisioning.                     |
| [Overview of Illegal Harms (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/overview-of-illegal-harms.pdf)                                                                                              | Ofcom • 2024/25                               | Short explainer for “illegal content”                                | Handy summary for basics chapter.                        |
| [Vol.1 Governance & Risk (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/volume-1-governance-and-risks-management.pdf)                                                                                 | Ofcom • Dec 2024                              | Risk assessments, governance expectations                            | Useful when you explain “what services must do.”         |
| [Vol.2 Service design & user choice (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/volume-2-service-design-and-user-choice.pdf)                                                                       | Ofcom • Dec 2024                              | Safety-by-design; user controls                                      | Supports “system-level” nature of duties.                |
| [Vol.3 Transparency & other guidance (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/volume-3-transparency-trust-and-other-guidance.pdf)                                                               | Ofcom • Dec 2024                              | Reporting/complaints, transparency                                   | For the reporting & redress basics.                      |
| [Schedules 5–7 (priority offences)](https://www.legislation.gov.uk/ukpga/2023/50/schedule/5)                                                                                                                                                                               | legislation.gov.uk • live                     | Short line on “priority illegal content”                             | Link through to the full lists when readers want detail. |
| [Child Safety Codes & quick guide](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/protecting-children-online)                                                                                                                                          | Ofcom • Apr–Jul 2025                          | What changed from 25 Jul 2025; age checks                            | Anchor for your child-safety date box.                   |
| [GOV.UK Online Safety Act collection page](https://www.gov.uk/government/collections/online-safety-act)                                                                                                                                                                    | DSIT • updated Jul 2025                       | Plain explainer + timelines                                          | Government’s public-facing summary.                      |
| [Transparency reporting – final guidance (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/consultations/category-1-10-weeks/consultation-draft-transparency-reporting-guidance/main-docs/final-transparency-guidance.pdf)                                    | Ofcom • 21 Jul 2025                           | Transparency section in basics                                       | Final rules on what Ofcom will ask for.                  |
| [Transparency reporting – Ofcom statement](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/transparency-reporting)                                                                                                                                      | Ofcom • 21 Jul 2025                           | Same                                                                 | Landing page for docs & timelines.                       |
| [Researchers’ access report (s.162) – GOV.UK page](https://www.gov.uk/government/publications/researchers-access-to-information-from-regulated-services)                                                                                                                   | DSIT/Ofcom • Jul 2025                         | One-paragraph “research access” note                                 | Shows the regime is building research access.            |
| [Researchers’ access report – PDF](https://assets.publishing.service.gov.uk/media/68766a70a8d0255f9fe28eea/researchers__access_to_information_from_regulated_online_services-20-point.pdf)                                                                                 | Ofcom • Jul 2025                              | Same                                                                 | Direct PDF for citation.                                 |
| [Fees & penalties – Ofcom policy statement (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/consultations/category-1-10-weeks/consultation-online-safety---fees-and-penalties/main-documents/statement-on-online-safety-fees-and-penalties.pdf)              | Ofcom • 26 Jun 2025                           | One-liner on QWR; funding the regime                                 | Explains QWR for fees + penalties logic.                 |
| [QWR Regulations 2025 (SI)](https://www.legislation.gov.uk/ukdsi/2025/9780348273113)                                                                                                                                                                                       | legislation.gov.uk • 2025                     | “10% of QWR” penalty backdrop; fees basis                            | The statutory piece that defines QWR for the regime.     |
| [Fees Notification Regulations 2025 (SI 2025/747)](https://www.legislation.gov.uk/uksi/2025/747/made)                                                                                                                                                                      | legislation.gov.uk • Jun 2025                 | How/when providers notify QWR                                        | Useful reference for larger services.                    |
| [Guidance consultation on QWR](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/guidance-on-qualifying-worldwide-revenue-online-safety-fees-and-penalties)                                                                                               | Ofcom • Jul 2025                              | “What is QWR?” glossary entry                                        | Shows Ofcom’s interpretive guidance.                     |
| [Categorisation Threshold Conditions (SI 2025/226) – PDF](https://upload.wikimedia.org/wikipedia/commons/7/77/The_Online_Safety_Act_2023_%28Category_1%2C_Category_2A_and_Category_2B_Threshold_Conditions%29_Regulations_2025_%28UKSI_2025-226_kp%29.pdf)                 | UK SI • 26 Feb 2025                           | The actual Cat-1/2A/2B numbers                                       | Use these numbers verbatim in your basics box.           |
| [Parliamentary vote: Threshold Conditions regs](https://votes.parliament.uk/votes/commons/division/1926)                                                                                                                                                                   | UK Parliament • 12 Feb 2025                   | “Approved by Parliament” note                                        | Confirms the regs’ parliamentary approval.               |
| [Ofcom Enforcement Guidance (PDF)](https://www.ofcom.org.uk/siteassets/resources/documents/online-safety/information-for-industry/illegal-harms/online-safety-enforcement-guidance.pdf?v=391925)                                                                           | Ofcom • Dec 2024                              | “How enforcement works” panel                                        | Clear description of Ofcom’s tools & approach.           |
| [Appeals route – s.168 Online Safety Act](https://www.legislation.gov.uk/id/ukpga/2023/50/section/168)                                                                                                                                                                     | legislation.gov.uk • live                     | The “Upper Tribunal (JR-style)” line                                 | Anchor for your appeals paragraph.                       |
| [GOV.UK Online Safety Act explainer](https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer)                                                                                                                                   | DSIT • maintained                             | Basic public-facing context                                          | Good neutral, non-technical primer to link.              |
| [Commons Library: Implementation briefing](https://commonslibrary.parliament.uk/research-briefings/cdp-2025-0043/)                                                                                                                                                         | HoC Library • Feb 2025                        | Balanced overview for students                                       | Non-partisan context on offences/examples.               |
| [Content of democratic importance & journalism – sections overview](https://www.legislation.gov.uk/ukpga/2023/50/notes/division/6/index.htm)                                                                                                                               | legislation.gov.uk • live                     | One-liner in rights panel                                            | Explains those special duties at Cat-1.                  |
| [Recognised news publisher/journalism fact-sheet (Bill stage)](https://www.gov.uk/government/publications/fact-sheet-on-enhanced-protections-for-journalism-within-the-online-safety-bill/fact-sheet-on-enhanced-protections-for-journalism-within-the-online-safety-bill) | GOV.UK • Aug 2022                             | Origins of the journalism safeguards                                 | Historical context readers may ask about.                |
| [GOV.UK: Illegal harms codes explanatory memorandum](https://www.gov.uk/government/publications/online-safety-act-illegal-content-codes-of-practice-2024-explanatory-memorandum/online-safety-act-illegal-content-codes-of-practice-2024-explanatory-memorandum)           | GOV.UK • Dec 2024                             | Why Codes look the way they do                                       | Background to the illegal harms Codes.                   |
| [Ofcom industry bulletin (May 2025)](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-industry-bulletins/online-safety-industry-bulletin-May-25)                                                                                           | Ofcom • May 2025                              | Timeline tone-setter                                                 | “Year of action” message & milestones.                   |
| [Reuters: Illegal-harms enforcement start](https://www.reuters.com/technology/tech-firms-must-start-protecting-uk-users-illegal-content-2025-03-17/)                                                                                                                       | Reuters • 17 Mar 2025                         | Date check for enforcement line                                      | Independent timestamp on the first phase going live.     |
| [Guardian: Child-safety rules from 25 Jul 2025](https://www.theguardian.com/technology/2025/apr/24/ofcom-rules-protect-keep-children-safe-online)                                                                                                                          | Guardian • 24 Apr 2025                        | Date check for child-safety start                                    | Independent reporting on the start date & measures.      |

---

## Notes on tone and balance you can weave in

- Throughout 01\_basics, keep verbs **system-level** (“put in place processes,” “assess risk,” “provide tools to users”) rather than **content-by-content** (“ban this post”). That framing better reflects the law and calms “censorship” fears. citeturn11search4
- When you mention controversial areas (e.g., end-to-end encryption or technology notices), acknowledge debate and point to Ofcom consultations and legal safeguards instead of arguing outcomes. citeturn6search1
- Use absolute dates (e.g., “25 July 2025”) to avoid confusion for readers coming to the page later. citeturn13search1

If you want, I can fold these edits straight into **01\_basics.md** in your style (glossary, timelines, mini-tables, and the myths/facts box) next.
