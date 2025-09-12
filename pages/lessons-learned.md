# Lessons Learned (Living Log)

We keep a running log of what worked, what didn’t, and what changed as a result.

## Entries

### AI summarisation fidelity
- Short, plain sections produce better reader‑side AI summaries
- Keep paragraphs tight
- Use explicit headings
- State reading ease level by school style boundary 'high-school senior'
- Context is limited, summarising a single short document gives better results than a a massive PDF. 
    - Limit below 200 lines of text (perhaps 4000 words max) for best chance of usable output

### Evidence placement
- Reduce waffle in main flow. 
- Keep main text focused
- Link to context/citations
    - OpenAI markdown parser added
    - Ensure research reports are exported in json, then converted to fully annotated markdown
- Citations from 'deep research' tools often keep the point, but lose the connection to the underlying source. 
    - Labour report has mostly reliable claims, but is missing some citations, to be resolved

### Quality drivers
- Exploration in drafts/chats, clarity in print
- ChatGPT and Claude respond well to direct instruction, as it encourages more careful output, and in the case of GPT-5, to engage thinking mode, where it produces much better quality outputs. 
- This is most likely because GPT-5 marshalls requests to older models, which have vastly different capabilities. 
- Research from ChatGPT can only be considered 'mostly' reliable if it comes from 'thinking' or 'deep research' modes.
- Most models are great with markdown as input and output
- Server load is a MASSIVE influence on LLM response quality. Do NOT use a service under heavy load, or at heavy load times. The results at peak demand times are unusable and cannot be trusted. This applies to all platforms.
