# Pay-It-Forward
On-Chain Charity Engine on RH; Agents route transaction fees to charitable causes holders define

## Design system and site build

Added 2026-10-24. Everything is static HTML/CSS/JS; open any `index.html` straight from disk.

| Path | What it is |
| --- | --- |
| `replica/` | The main landing page: hero, campaigns grid, how-it-works tabs, game-style leaderboard, proofs carousel, verification method, holder voices, CTA. Open with `?tour=earthy` to run Earthy's guided walkthrough in the browser. |
| `replica/media/` | `earthy-walkthrough.mp4`, a real-time screen recording of Earthy walking a visitor down the page (silent). |
| `prototype/` | The split-shell "Field and Ledger" prototype: Earthy's six-step first visit, live ledger, holders table, proofs gallery, token address. Sample data feed in `prototype/data/sample.js`; sourced world-state figures in `prototype/data/world.js`. |
| `shared/` | Earthy's rig: `earthy.svg.html` (the globe character) and `earthy.css` (moods and gestures). Used by both pages. |
| `tools/build-earthy-video.mjs` | Rebuilds the walkthrough video: generates the timeline, records the page over Chrome's debugging protocol, stitches an mp4. Needs Chrome, ffmpeg, Node 22+. |
| `mockups/` | First-pass ledger mockups (2026-10-21), kept for reference. |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/` | Product record, design system (tokens + rules), surface brief and sidecar used by the Impeccable design tooling. |

Every figure on these pages is **sample data** and is labeled as such. The agent's JSON feed replaces `prototype/data/sample.js` when it goes live.
