# Product

<!-- impeccable:product-schema 1 -->

<!-- Interview substitution: the founder delegated ("spend a lot of time figuring this out and get back to me"), so this record was inferred from their two written briefs (2026-10-21 and 2026-10-22). Facts marked [inferred] were not confirmed in conversation. -->

## Platform

web

## Stack

delegated: static HTML/CSS/JS prototype first (no build step, opens from disk, screenshots cleanly); production target is a Next.js app on Vercel reading a JSON feed the agent writes. [inferred]

## Users

- **Primary:** traders on Robinhood Chain who find tokens through GMGN-style terminals and FOMO feeds. Mobile-heavy, skeptical by profession, decide in seconds, and share links to friends who are even more skeptical. Their job on this site: decide whether Pay It Forward is real, then hold $PIF and nominate a campaign.
- **Secondary:** the people those traders send the link to (friends, press, the campaign owners themselves) who need to verify a donation happened without understanding crypto. [inferred]

## Product Purpose

Pay It Forward ($PIF) is a token on Robinhood Chain whose creator fees are donated. Every 15 minutes an AI agent running in an isolated cloud VM sweeps the creator fees, splits them across holders by how much $PIF each wallet held and for how long, holds back a tax reserve, and donates each holder's share to the GoFundMe campaign that holder nominated. The agent does this on a continuous live stream, including the arithmetic, the form-filling, and the receipt. The website exists to make that process legible and verifiable: a leaderboard of who is holding and for whom, a proofs gallery of every donation recording and receipt, and a guided first visit that gets a stranger from "what is this" to the token address in under a minute.

Success: a first-time visitor believes the donations are real, understands how their hold turns into a donation, and reaches the token address with a clear next step.

## Positioning

The mechanism a neighboring project cannot truthfully copy: the fee-to-donation math is computed on camera by an agent nobody touches during a sweep, and every donation ships with an unedited recording, a GoFundMe confirmation, and the fee transaction hash. "If you can't see it being done, assume it wasn't." Holders, not the developers, choose where the money goes.

## Operating Context

- Chain: Robinhood Chain. Fees accrue to a creator-fee wallet; sweeps are on-chain transactions with explorer-visible hashes.
- Agent: runs in a Linux VM in the cloud, screen streamed to Twitch and mirrored to X. Recordings are retained and linked per donation.
- Donations: card payments on gofundme.com, filled in by the agent. Card details are redacted in recordings; the GoFundMe receipt is shown in full.
- Cadence: 15-minute sweep windows [inferred from earlier brief]; a "last 5 minutes" top-donor view is required on the first visit.
- Social: an X account is the primary off-site channel.
- Buy path: the token address and a link to the launchpad where $PIF trades ("Pumped Up Fund or wherever" in the brief; exact venue undecided).

## Capabilities and Constraints

- Guided first visit hosted by **Earthy**, a small character who introduces the state of the world, shows the latest donation recording and receipt, shows fees earned for charities, shows the last-5-minute top donor, then hands off to the all-time dashboard and proofs, ending on the token address and the buy link. Must be skippable and never shown twice unasked.
- All-time leaderboard: holders ranked by fees routed to charity, each with their thesis and nominated campaign.
- Proofs: a video gallery of every donation the agent has made, each with receipt, confirmation, and fee tx. Totals: fees collected, reserve, donated.
- Terminology: *sweep* (one 15-minute fee collection), *weight* (hold × fraction of window held), *reserve* (the tax hold-back), *campaign* (the holder's nominated GoFundMe), *proof* (recording + receipt + tx).
- Money truth that must never be misstated: creator fees are taxable income to the developers; the reserve covers that liability. Donations are not "taxed." Gifts to personal GoFundMe campaigns are generally not tax-deductible for anyone. Reserve rate: 20%, to be confirmed by an accountant [inferred rate from brief; confirmation pending].
- Undecided: launchpad/venue name and URL; stream platform embed; snapshot rules for gaming prevention (minimum hold, sampling interval); whether holders nominate campaigns individually or the project picks one charity at a time.

## Brand Commitments

- Name: **Pay It Forward**, ticker **$PIF**. Abbreviation "PIF" is internal shorthand, not customer-facing.
- Host character: **Earthy**, described by the founder as "a little emoticon." Earthy guides, never sells; Earthy's job is to show, not tell.
- Founder's visual constraints (binding, updated 2026-10-22): clean, minimalist, unique, earthy, premium, **with more color**. Baseline the UI on Obsidian and Notion (calm document surfaces, hairline structure, restrained chrome). Two reference screenshots the founder supplied are binding references, kept at `prototype/ref/reference-01-hero.png` and `prototype/ref/reference-02-ledger.png`: a split shell with a dark luminous gradient field on the left and a pale document panel on the right; high-contrast serif display; tracked uppercase labels for stats and nav; a large outlined action with an arrow; a lime spark mark. Must read as real and authentic, never as a template or an AI swap, never as memecoin hype.
- Earthy must be alive: an actual character with a face and hands that move and gesture, not a static emoticon.
- Voice: plain, specific, accountable. Numbers over adjectives. No celebration of donations beyond what the receipt itself says.

## Evidence on Hand

- No real sweep data, recordings, receipts, holder list, or totals exist yet. Every figure in the prototype is labeled sample data and must be replaced by the agent's feed before launch.
- World-state figures used in Earthy's opening are real and sourced (World Bank 2025 poverty line update; UN IGME 2025; UNHCR Global Trends 2025; WHO/UNICEF JMP 2025; GoFundMe's own medical-campaign share). Sources are recorded in `prototype/data/world.json` with URLs and dates.
- No logo, no Earthy artwork, no photography. Earthy is authored in this project as vector geometry.
- Earlier static mockups of a ledger/leaderboard and proofs page exist in `mockups/` (2026-10-21). They are evidence of the content and mechanism, not visual authority; the founder has since asked for a new, more premium world.

## Product Principles

1. **Receipts before rhetoric.** Any claim about money is shown with the artifact that proves it: the recording, the confirmation, the tx hash. If there is no artifact, the claim is not made.
2. **The visitor's doubt is the design brief.** Every surface should survive a hostile skim by someone who assumes it is a scam.
3. **Holders are the donors.** The site credits the people holding the coin and the campaigns they chose; the developers stay in the colophon.
4. **One minute to the address.** The guided first visit is a path to the token address and the buy link, not a tour of features.
5. **Dignity for the people being helped.** The state-of-the-world opening uses sourced figures and restraint, never imagery of suffering as a hook.

## Accessibility & Inclusion

The guided visit must be fully usable by keyboard and screen reader, skippable at every step, and must respect `prefers-reduced-motion` by replacing spatial animation with crossfades while keeping every fact and control. Figures are presented with their sources so a reader can check them.
