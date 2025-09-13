# Better Britain Bureau — Planning Repo

The homepage and reports site for the Better Britain Bureau reports, starting with the Broken Britain Briefing uses markdown-it and a small build orchestrator so each report can have its own features, while the whole site is built by a GitHub Action and deployed to GitHub Pages.

## TODO:

- Still some missing citations
- Citations to be properly organised by group.

## How to run

1) Install deps: `npm i` or `yarn`
2) Start dev server: `npm run dev` (serves `docs/` and auto-reloads)
3) Rebuild content: run `npm run build` whenever you change sources; the dev server will live-reload the updated `docs/`

## Development

- Reports live in `/reports`. 
    - Note: the “A Year of Labour” source content is currently at the repo root for convenience; while its build script remains in `/reports/year-of-labour/build.js`.
- Build once: `npm run build` (outputs to `docs/`).

## Authoring

- Reports are written in Markdown, each with a small build script.
- Content is intended to be inspectable and reviewable.
- Scores are subjective.
- Please fork and open a PR for substantial changes, or open an issue for tweaks with rationale. Contributions welcome.