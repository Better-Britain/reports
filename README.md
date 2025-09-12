# Better Britain Bureau — Planning Repo

This is the planning/staging repo for WIP reports before they’re published on the homepage repo. It uses markdown-it and a small build orchestrator so each report can have its own features, while the whole site is built by a GitHub Action and deployed to GitHub Pages.

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
- Scores are subjective, I don't know everything.
- If you disagree with choices, please fork and open a PR for substantial changes, or open an issue for tweaks with rationale. 
- Method details will be added soon.
- The site will be promoted to its own repo when I've filled out the main report text Placeholders.
