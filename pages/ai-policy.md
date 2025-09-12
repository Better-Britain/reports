# AI Policy and Objectives

We use AI to work faster, make some tasks possible, and to explain ideas more clearly.

## What do we mean by AI

When we say “AI”, we mean large language models (LLMs) from big, fairly trusted platforms, used through their consumer tools, without custom models, in-depth training or corporation-tuned servers. We are using generally available tools at their intro/initial paid subscription tiers, where we can access _just enough_ capability to make this project possible. 

We are usually **not** talking about custom machine-learning (ML) models or artificial general intelligence (AGI). Those are starting to show up in government and research settings but are still hard for most people to access and come with their own issues.

Most claims about today’s AI need qualifiers like “mostly,” “usually,” or “generally.” We try to stay aware of these limits. We use AI for the things it does well and avoid the areas where it struggles.

## Why we use AI

AI is best at working with natural language—often turning long or messy text into shorter, clearer, or more structured forms. That makes it easier to use natural language processing tech and automation on complex problems.

We also see places where the government’s fast push for AI in public services like the NHS could unintentionally harm citizens, and while the government does run sensible trials and has ways to respond quickly when problems show up, we believe the government should be subject to the same trade-offs everyone else does: tools can speed up work but may also weaken understanding. Our approach lets us test how to use AI responsibly and try to set a good example for using AI in deeper workflows.

AI also lets us:

* Untangle complex systems and summarise evidence
* Draft clearer prose, then edit it to make it easier to read
* Turn messy source texts into useful data
* Support expandable context so reports are readable but can contain lots of raw information too

## How we use AI

* **Multiple LLM models and systems**

  * [ChatGPT’s](https://chatgpt.com/) “deep research” tool and 5/4o “thinking” modes
    * GTP-5s “lite” default mode is essentially GPT-3 (and is not good enough for our work)
  * [Bing’s](https://copilot.microsoft.com/) slightly tweaked ChatGPT behind Copilot, for convenience and quick support
  * Claude 3.5 and 4 for structuring data, mostly via [Cursor](https://cursor.com/en/features)
  * [Grok 4](https://grok.com/) to offer and test counter-arguments, and flag knowledge gaps
    * We have serious concerns about Grok. We use it carefully, but it is good at breaking down an argument and sensibly refuting it.
* **Transparency:** Reports explain how we used AI in its methodology.
* **Record-keeping:** We keep chats and any exportable results in [our repository](https://github.com/Better-Britain) alongside final reports.
* **Verification:** AI outputs are drafts. Wherever possible, we cite sources and claims.
* **Privacy:** We do not upload private or sensitive data to AI tools. We rely on public information, and do not sandbox or silo content or data.

## What we are trying to learn

* Where AI improves clarity without adding errors
* Where AI helps find patterns people miss
* Where and how AI distracts or fails
* Whether and how AI can help with governance analysis
* How closed (black-box) AI use differs from open (and FOSS) AI use
* How to structure our content so readers’ AI tools return faithful summaries
* The limits of AI on large or complex inputs, and multi-source reasoning

## Limits and risks we recognise

* Hallucinations and confident mistakes threaten accuracy and clarity
* A human must read and understand everything before publication
* Both biased or unbiased training data can produce biased outputs
* Over-formal writing can make texts harder to read
* Over-automation can hide problems or dehumanise perspectives

## Guardrails

* Human editing for AI-assisted parts of reports
* Source-first drafting: numbers and quotes come from verifiable sources
  * We aim for high-quality sources
  * Newspapers are treated as nearly as biased as social media
  * Claims in “official” reports are treated as hypothetical until there is evidence
* We document how raw text becomes data, and how that becomes information
* **Corrections policy:** We publish corrections openly. 
  * We encourage you to challenge our findings and claims.

## Roadmap experiments

* A prompt library of re-usable approaches for repeatable research tasks, with paths that encourage good research (and flag lazy or biased research by design)
* Testing different platforms and models over time
* Ask readers whether our reports are readable, understandable and helpful?

If you spot a problem with our use of AI, or have ideas for safer, better practice, please open an issue or pull request on [the BBB GitHub repository](https://github.com/Better-Britain).
