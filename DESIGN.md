---
name: Pay It Forward
description: A living field and a calm document. Agent-run giving on Robinhood Chain, shown as receipts.
colors:
  field: "oklch(23% 0.05 300)"
  field-raised: "oklch(19% 0.04 300)"
  field-deep: "oklch(14% 0.04 300)"
  violet-mass: "oklch(42% 0.15 298)"
  magenta-mass: "oklch(54% 0.19 345)"
  coral-mass: "oklch(66% 0.15 18)"
  on-field: "oklch(95% 0.012 300)"
  on-field-muted: "oklch(72% 0.035 300)"
  on-field-faint: "oklch(48% 0.04 300)"
  paper: "oklch(90.5% 0.008 108)"
  paper-raised: "oklch(94% 0.006 108)"
  ink: "oklch(17% 0.012 290)"
  ink-muted: "oklch(41% 0.012 290)"
  line: "oklch(79% 0.012 108)"
  lime: "oklch(88% 0.21 122)"
  leaf: "oklch(58% 0.15 148)"
  amber: "oklch(75% 0.16 62)"
  amber-deep: "oklch(56% 0.16 48)"
  amber-lit: "oklch(90% 0.11 80)"
  link: "oklch(48% 0.2 300)"
  redact: "oklch(8% 0.02 300)"
typography:
  display:
    fontFamily: "Instrument Serif, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(2.8rem, 6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.012em"
  figure:
    fontFamily: "Instrument Serif, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(2.6rem, 4.6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  stat:
    fontFamily: "Instrument Serif, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(2rem, 3.4vw, 2.9rem)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Instrument Serif, Iowan Old Style, Times New Roman, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
  action:
    fontFamily: "Instrument Serif, Iowan Old Style, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  lede:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  data:
    fontFamily: "Martian Mono, SFMono-Regular, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    letterSpacing: "-0.01em"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4.5rem"
  "9": "7rem"
components:
  action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "1.5rem 2rem"
    width: "100%"
  action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  action-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "1.5rem 2rem"
  action-lime-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.lime}"
  button-small:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.7em 1.1em"
  button-small-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  spark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.lime}"
    rounded: "{rounded.none}"
    size: "44px"
  recording:
    backgroundColor: "{colors.field-raised}"
    textColor: "{colors.on-field}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "1rem"
---

# Design System: Pay It Forward

## Overview

**Creative North Star: "The Field and the Ledger"**

Two surfaces share every screen. On the left is the field: a dusty violet ground where three large blurred masses of violet, magenta and coral drift slowly and never stop. It is where the agent lives and where Earthy, a smiling globe with green continents, a winking eye and two little blue arms, stands and speaks. On the right is the ledger: a pale warm-gray document in the Notion and Obsidian register, structured only by hairlines and whitespace, where every claim is a line item with a time, an amount and a status. The split is the argument. Warmth and life on one side, receipts on the other.

The ledger is deliberately plain so that the few colored things carry meaning: lime for the brand mark and the live state, leaf green for money that has settled, amber for Earthy, violet for links. Type is high-contrast serif for everything that must feel declared (headings, every large number) and a quiet grotesk for everything that must simply be read. Primary actions are large outlined rectangles with a serif label on the left and an arrow on the right, which fill to ink on hover. Nothing casts a shadow.

**Key Characteristics:**
- Split shell: dark living field left (40%), pale document right, stacked on phones.
- Hairline structure only. No cards, no shadows, no rounded containers.
- High-contrast serif for headings and all large figures; tracked uppercase labels for metadata.
- Four accents with one job each: lime (brand and live), leaf (settled money), amber (Earthy), violet (links).
- Earthy is articulated: body breath, blink, a morphing mouth, brows, and two hands with named gestures.

## Colors

A dark chromatic field against a pale neutral document, with four single-purpose accents.

### Primary
- **Lime Spark** (`oklch(88% 0.21 122)`): the brand mark in its ink square, the live-stream indicator, the filled "Hold $PIF" action. It is the only saturated fill on the document.
- **Leaf** (`oklch(58% 0.15 148)`): settled money. The donated amount on a receipt, the "settled" status dot, the lead figure in totals. Never used for anything that is not confirmed money.

### Secondary
- **Earthy Sea** (`#1e8fe6` to `#7fdcff`), **Earthy Land** (`#3fc34c` / `#2fa83f`), **Earthy Arm** (`#2a8fe0`), **Earthy Spark** (`#b5ff2e`): the globe character's sea gradient, continents, arms and sparkle lines. Reserved for the character.
- **Violet Link** (`oklch(48% 0.2 300)`): link hover and focus rings on the document.

### Tertiary
- **Violet Mass** (`oklch(42% 0.15 298)`), **Magenta Mass** (`oklch(54% 0.19 345)`), **Coral Mass** (`oklch(66% 0.15 18)`): the three drifting color masses in the field, each sized to 60–95% of the field's height, blurred to 110px and held at 60% opacity so they read as a dusty wash rather than a hot gradient. A dark gradient over the lower 60% of the field keeps the ground behind Earthy and the status block dark. They brighten one step when a donation is on screen.

### Neutral
- **Field** (`oklch(23% 0.05 300)`): the left ground, a dusty violet lifted well off black so the color masses bleed to every edge. **Field Raised** (`oklch(19% 0.04 300)`): the darker surface of anything the agent recorded (recording panels, proof thumbnails) when it appears on the document. **Field Deep** (`oklch(14% 0.04 300)`): the gradient that darkens the lower 60% of the field so Earthy and the status block always sit on a dark ground.
- **On Field** (`oklch(95% 0.012 300)`), **On Field Muted** (`oklch(72% 0.035 300)`), **On Field Faint** (`oklch(48% 0.04 300)`): text tiers on the field.
- **Paper** (`oklch(90.5% 0.008 108)`) and **Paper Raised** (`oklch(94% 0.006 108)`): the document ground.
- **Ink** (`oklch(17% 0.012 290)`) and **Ink Muted** (`oklch(41% 0.012 290)`): document text tiers. Ink Muted is the floor for functional text; nothing lighter carries meaning.
- **Line** (`oklch(79% 0.012 108)`): the only hairline.
- **Redact** (`oklch(8% 0.02 300)`): the bar over card details in recordings.

### Named Rules
**The One Job Rule.** Each accent has exactly one meaning. Leaf is never decorative; lime never marks money; amber never leaves Earthy.
**The Recorded Surface Rule.** Anything the agent recorded is shown on the field's dark surface, even inside the document. The visitor learns that dark means "captured by the agent."

## Typography

**Display Font:** Instrument Serif (with Iowan Old Style, Times New Roman)
**Body Font:** Hanken Grotesk (with Helvetica Neue, Arial)
**Label/Mono Font:** Martian Mono, for hashes, addresses and recording logs only

**Character:** Declared versus read. The serif is tall, tight and high-contrast and is used for every heading and every large number, so figures feel stated rather than computed. The grotesk is neutral and does the reading. Tracked uppercase labels in the grotesk carry metadata and navigation, as in the reference material.

### Hierarchy
- **Display** (400, clamp(2.8rem, 6vw, 5.4rem), 0.98): step titles and the ledger's opening line. One per view.
- **Figure** (400, clamp(2.6rem, 4.6vw, 4rem), 1.0): world-state figures and the lead total.
- **Stat** (400, clamp(2rem, 3.4vw, 2.9rem), 1.0): totals, the donated amount on a receipt, the lead amount in a live-ledger row.
- **Title** (400, 1.75rem, 1.0): section titles and the field's sweep line.
- **Action** (400, clamp(1.5rem, 2.8vw, 2.25rem), 1.1): the label inside a large outlined action.
- **Lede** (400, 1.3rem, 1.45): the sentence beneath a display heading; also Earthy's spoken line on the field.
- **Body** (400, 1.0625rem, 1.5): everything else. Measure capped at 52–54ch.
- **Label** (500, 0.72rem, 0.14em, uppercase): nav, status, stat labels, column heads, metadata.
- **Data** (400, 0.78rem): hashes, confirmations, addresses, recording logs. Never used as a costume for "technical" prose.

### Named Rules
**The Serif Number Rule.** Any number large enough to be read from across the room is set in the serif. Small numbers stay in the body face; hashes stay in mono.
**The No Kicker Rule.** No label sits above a heading. Labels sit above stats, beside statuses, and in nav, never as an eyebrow.

## Layout

A two-column shell: the field at `minmax(21rem, 40%)`, sticky and full viewport height, and the document taking the rest. The document's content column is capped at 50rem and left-aligned; the leaderboard table may exceed it inside a horizontal scroll container. Document padding is `clamp(1.5rem, 5vw, 5rem)` on the inline axis. Vertical rhythm uses the 4pt spacing scale, with 3rem between a heading and its first content and 4.5rem between sections; more space above a heading than below it.

Below 64rem the shell stacks: the field becomes a band at the top of the page (no longer sticky) with Earthy at 120px beside his line, and the document follows. Below 40rem, Earthy drops to 96px, stats and the address box collapse to one column, and live-ledger rows wrap their status beneath the row.

## Elevation & Depth

No shadows anywhere. Depth on the document is conveyed only by hairlines (Line) and by the dark recorded surface sitting on the pale ground. Depth in the field comes from the blurred color masses behind Earthy and from Earthy's radial skin gradient. Hover on a proof draws a 1px lime outline at 2px offset; it does not lift.

### Named Rules
**The Flat Document Rule.** Surfaces are flat. If something needs to feel raised, it changes color (Field Raised on Paper), never shadow.

## Shapes

Square. Every container, action, table and panel has 0px corner radius. The only circles are Earthy's body, eyes, cheeks and hands, the play control on a recording, and status dots. Borders are 1px in Ink for actions and in Line for structure.

## Components

### Actions
- **Shape:** full-width rectangle, 1px Ink border, square corners, serif label at title size on the left, a sans arrow on the right.
- **Primary (`action`):** transparent on Paper; hover fills Ink and turns text Paper, the arrow slides 6px right over 280ms.
- **Lime (`action-lime`):** filled Lime with Ink text, reserved for the single buy action; hover fills Ink and turns text Lime.
- **Small (`button-small`):** 1px Ink border, label typography, used for "Copy" beside an address.
- **Quiet:** plain Ink Muted text that turns Ink on hover, used for "Back" and "Skip".
- **Focus:** 2px Violet Link ring at 3px offset on the document, Lime on the field. Rings appear instantly.

### Live-ledger rows
- **Style:** four columns (time, campaign with holder beneath, serif amount, status) separated by hairlines above and below the list. The lead row sets its amount at stat size in Leaf.
- **Status:** a dot plus a tracked label. Leaf for settled or routed, Ink Muted for queued, Amber Deep for confirming.

### Receipt
- **Style:** a definition list of hairline rows, label on the left in Label typography and Ink Muted, value right-aligned. The total row sets its value at stat size in Leaf.

### Recording panel
- **Style:** Field Raised surface, On Field text, Martian Mono log lines, a lime play control circle at center, a two-pixel scrub bar with a Lime progress segment, and Redact bars over card details.

### Navigation
- **Document nav:** tracked uppercase links top-right with the lime spark square at the end; the current link underlines in Ink. In the field during ledger mode, the same links sit under Earthy in On Field Muted with a Lime underline on hover.

### Earthy (signature)
An SVG globe in a 200-unit viewBox (`shared/earthy.svg.html`, rig in `shared/earthy.css`): sea gradient body (r 72) with six clipped continent shapes; a big left eye with a glint and a right eye that becomes a wink arc in the glad mood; brows only in the concerned mood; pink cheeks; a mouth path that morphs between moods; two arms (13px stroke) ending in palms, on groups whose transform origins sit at the shoulders, so every gesture is a rotation: `wave`, `cheeks`, `point`, `point-up`, `count`, `raise`, `cheer`, `present`, `walk`. Lime sparkle lines flash beside the hands on wave, cheer and present. Idle is a 4.2s breath and a random blink every 2–6s. Under reduced motion, Earthy holds each gesture's end pose and the field's masses stop drifting.

## Do's and Don'ts

### Do:
- **Do** keep the field dark and moving and the document pale and still; the contrast is the design.
- **Do** set every large number in Instrument Serif and every hash in Martian Mono.
- **Do** show anything the agent recorded on the Field Raised surface, even inside the document.
- **Do** use the large outlined action for the one primary step on a view, and Lime only for the buy action.
- **Do** label sample data as sample data wherever a visitor could mistake it for live figures.

### Don't:
- **Don't** add shadows, rounded containers, or cards. Structure is hairlines and space.
- **Don't** place a label or step number above a heading.
- **Don't** use Leaf for anything other than confirmed money, or Lime for anything other than the brand mark, live state and the buy action.
- **Don't** let Earthy's amber appear on UI elements; it belongs to the character.
- **Don't** animate layout properties; motion is transform and opacity, and the field's masses are transform-only.
