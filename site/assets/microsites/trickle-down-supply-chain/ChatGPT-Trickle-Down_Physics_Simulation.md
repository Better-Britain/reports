# Trickle-Down Physics Simulation

#### You:
can we do a trickle down economics physics simulation in the browser as a background animation? It's like that peg game popular in japan, and coins pour down the screen, and in stripes across, the coins get smaller as wealth is extracted. Just outline it, don't code it.

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
Yeah. Treat it as a Galton-board / pachinko vibe running behind the page on a `<canvas>` (or WebGL if you want extra sparkle), with a simple story baked into the mechanics: coins fall, bounce through pegs, and as they cross “extraction bands” they shrink (and/or lose “value”) so what reaches the bottom is visibly diminished.

Core objects

- World bounds: a tall rectangular playfield, with slightly padded sides so coins don’t clip.
- Peg field: fixed circles in a staggered grid (hex-ish), tuned so coins don’t get stuck in perfect symmetry.
- Coins: circles with mass, radius, restitution, friction, and an attached “value” (a number you can map to size, brightness, trail length, etc).
- Buckets at the bottom: bins that catch coins, purely visual but useful (histogram / pile height).

Physics choices (pick one)

- Lightweight custom 2D: Euler/Verlet integration + circle-vs-circle (coin/peg) + circle-vs-walls, with a bit of positional correction. Good enough visually, easy to control, stable if you cap velocities and iterations.
- Off-the-shelf engine: overkill but robust (especially for lots of coins). Either way, you keep pegs static and only simulate coins.

“Trickle down” mechanics

- Extraction bands: horizontal stripes across the screen at fixed y ranges. When a coin enters a band you apply one or more effects:
  - shrink radius by a factor (visual “wealth extracted”)
  - reduce “value” by a percentage (the real stat)
  - siphon some value into an “extractor counter” (for optional UI overlays)
- Make bands feel unfair/compounding:
  - early bands small, later bands harsher (or vice versa, depending on the narrative)
  - occasional “toll gate” bands that randomly delete a coin or split it into “fees” particles that float upward to a top stash
- Stripe-by-stripe theme: each band can represent rent, interest, monopoly pricing, admin overhead, etc, but you don’t need to label them for a background animation.

The “coins get smaller in stripes across” look

- Don’t animate shrink continuously every frame; trigger it once per band-entry, with a short easing animation (like 200–400ms) so the shrink reads clearly.
- Keep collision radius consistent with visible radius (or you’ll get weird “ghost hits”). If you want the coin to remain physically “coin-sized” but visually smaller, do it intentionally and accept that it’s metaphor not physics.

Top-of-screen spawn

- Spawn coins in bursts so it feels like a “pour”, not a metronome.
- Give each coin a tiny horizontal jitter and a capped initial velocity so they fan out naturally.
- Add a max active coin count; when exceeded, either recycle oldest coins or fade them out near the bottom.

Bottom visualizations (optional, still “backgroundy”)

- Bucket piles: coins stack visually in bins (you can fake stacking without full rigid-body stacking by snapping settled coins to a lattice).
- A faint “wealth extracted” reservoir at the top/right that slowly fills as coins shrink/lose value.
- A subtle histogram line showing final value distribution; keep opacity low so it doesn’t fight foreground content.

Tuning knobs you’ll want exposed (even if only as constants)

- gravity, restitution, friction, peg spacing, peg radius, coin spawn rate, max coins
- band positions and extraction rates
- whether extraction affects mass (usually no; keep mass constant so motion stays readable)
- random seed (lets you keep “stable randomness” across loads if you want)

Performance and UX sanity

- Run at device pixel ratio but clamp DPR (e.g. cap at 2) so it doesn’t melt laptops.
- Step physics at a fixed timestep and render interpolated; if the tab is hidden, pause.
- Respect `prefers-reduced-motion`: swap to a static illustration or super-low-rate mode.
- Keep alpha/contrast low so it reads as ambience, not content.

If you want it to land as “economics metaphor” without being preachy, the key is: pegs create apparent “fair randomness” while the extraction bands quietly dominate outcomes. The viewer feels it before they think it.


#### You:
my interest is in informing users/players about the real systems that extract value from your transactions, not just through payment processors (sending billions to billionaires worldwide) but also through other mechanisms, shrinking the coin every time. The player does however have a choice about where they deposit their new coins, at the top they deposit into amazon, and like 50% is shaved off, then below that a national supermarket chain, then below that a local market, so you can see the real person at the bottom gets back more of their coin after the person who received it deposited it wherever they chose to. This lets us also demonstrate that if you spend money local with people who spend money local, there's a lot less shaving. We will show these as moving agents who get your bits of shrinkage when in a local/regional zone, so they walk over based on their weights to their chosen spend point. 

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
That’s a nice shape because it stops being a vague “rich people siphon it” metaphor and turns into a little supply-chain ledger you can feel.

Make every coin carry two things: current value, and a little provenance tag (where it’s spent, where it came from, what skimmed it). A “transaction” is just a pipeline that splits the coin into (a) the part that continues to the recipient and (b) a handful of skim fragments that peel off and fly to whoever owns that mechanism.

At the top the player isn’t choosing “where to deposit” so much as choosing where to spend. But you can render it as deposit chutes: Amazon chute, national chain chute, local market chute. Dropping a coin into a chute triggers the merchant’s cost stack.

Each merchant has a cost stack that is legible and opinionated:

- payment rails: card processor + scheme + acquirer style slice (tiny, constant-ish per tx, bigger pain for small tickets)
- platform rake: only if the sale is mediated (marketplace, delivery app, app store, etc)
- rent/land: flows to a local-ish landlord agent (or not, if it’s a national landlord)
- debt/interest: flows to a bank/creditor agent (often outside the local zone)
- taxes: VAT/sales tax (immediate), then profit tax later (if any), plus payroll taxes if you want to show “state extraction” separately from “private extraction”
- procurement leakage: the merchant buying stock from outside the region (this is the big one for the “spend local” argument)
- profit distribution: flows to owners/shareholders, tagged by where they live (local vs global)

Visually you don’t want one shrink event per category (it’ll feel like a slot machine). Do one shrink per “layer”, where a layer is a bundled mechanism that reads as a thing: “platform”, “rent”, “imports”, “finance”, “tax”. When the layer triggers, shave value, shrink the coin, and spawn 3–12 tiny skim chips proportional to the shaved amount. Those chips animate to their recipient agents.

Now the important bit you described: after the merchant receives the net coin, the story continues. The merchant is also an agent. It spends its receipts according to weights that differ by chute type. The national chain spends a lot of its coin upward (central procurement, debt service, dividends). The local market spends more sideways (local staff, local suppliers, local services). That’s where the compounding shows up.

So each agent has a “spend preference vector” like:

- % to wages (paid to worker agents located somewhere)
- % to local suppliers (paid to supplier agents, mostly nearby)
- % to national suppliers (farther away)
- % to global suppliers (instantly leaves the map)
- % to rent, finance, platform subscriptions (extractors)
- % to retained profit (eventually distributed to owners)

When an agent spends, it chooses a spend point (merchant node) based on its own preferences. That’s your walking behaviour: agents physically drift toward the spend points they favour, with simple steering. Local-minded agents cluster around local nodes; corporate agents home to national/global nodes. When a skim chip spawns, the relevant extractor agent “notices” and pathfinds toward it with a strength based on how much of their income comes from that mechanism. It’s a greedy little ecosystem.

The “regional zone” idea is best treated as a map with concentric radii around the player (local / regional / national / global). Every agent has a home zone, and every payment has a destination zone. Any skim chip whose destination zone is outside the current zone gets a different motion treatment: it streaks off-screen or phases out through a portal on the edge. Stuff staying local can be physically collected by on-screen agents, which makes “less shaving” feel like “more neighbours eat”.

Amazon / national chain / local market then become three preset merchant archetypes:

- platform-heavy, high external procurement, high profit outflow, lots of “portal” skims
- middle: lower platform rake, still heavy external procurement, some rent/finance extraction
- local: minimal platform rake, higher wage share, higher local supplier share, lower profit outflow (or at least more locally owned)

You’ll want a couple of player-visible toggles that change the extraction routes without turning into a spreadsheet:

- pay method: cash / debit / credit / BNPL (rail skims + finance skims change)
- delivery vs in-person (adds a platform layer)
- ownership: “locally owned?” flag on the same merchant type (profit destination changes)
- sourcing: “local produce?” on the basket (procurement leakage changes)

And then one quiet scoreboard that makes the point without lecturing:

- “value that stayed local” (integral of chips collected by local agents)
- “value that left the region” (integral of portal chips)
- “hands touched before exit” (a simple hop count / multiplier proxy)
- a breakdown strip that’s literally the layers that shaved you, ranked by total skim

The trick to keeping it honest-feeling is making the defaults plausible but editable. You can ship with “illustrative” rates and a tucked-away “show sources / tweak assumptions” panel later, but the animation itself should just show: different spending choices create different networks, and different networks leak value at different points. The coin shrinking is the receipt. The little agents collecting it is the ledger.
