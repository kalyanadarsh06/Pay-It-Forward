// SAMPLE DATA. Every value here is illustrative and is labeled as such in the UI.
// The agent will write a file of this exact shape; swap it in and the page is live.
window.PIF_DATA = {
  sample: true,
  generatedAt: "2026-10-21T14:35:19Z",
  token: {
    ticker: "PIF",
    name: "Pay It Forward",
    chain: "Robinhood Chain",
    address: "0x5c1e9a4f7b2d8e3c6a0f1b9d4e7c2a8f5b3d6e1c",
    feeWallet: "0x8f3a2c11d9e04b7f6a2c58e1b3d7f9a0c4e6b21e",
    launchpad: { name: "the launchpad", url: "#launchpad", placeholder: true },
    x: { handle: "@payitforward", url: "https://x.com/payitforward" },
    stream: { label: "twitch.tv/payitforward", url: "#stream" }
  },
  policy: { reserveRate: 0.20, sweepMinutes: 15, minHold: 0.005 },
  totals: {
    since: "2026-10-09",
    fees: 23078.00,
    reserve: 4615.60,
    donated: 17222.40,
    queued: 1240.00,
    campaigns: 14,
    sweeps: 412,
    holders: 23
  },
  latest: {
    id: "0412-07",
    holder: "nicu.eth",
    wallet: "0x7d2e…91af",
    campaign: "Maya’s NICU bills",
    campaignUrl: "https://www.gofundme.com/f/mayas-nicu-bills",
    sweep: "0412",
    window: ["2026-10-21T14:17:00Z", "2026-10-21T14:32:00Z"],
    feesInWindow: 1000.00,
    hold: 0.30,
    minutesHeld: 15,
    weight: 0.3000,
    gross: 300.00,
    reserve: 60.00,
    amount: 240.00,
    paidAt: "2026-10-21T14:33:41Z",
    confirmation: "GF-8K2M-41Q",
    feeTx: "0x8f3a2c…c21e",
    appearsAs: "Pay It Forward holders (nicu.eth)",
    recording: { length: "2:14", sha256: "3f9c…a1e0", url: "#proof-0412-07" }
  },
  lastFive: {
    window: ["2026-10-21T14:30:00Z", "2026-10-21T14:35:00Z"],
    fees: 333.00,
    top: [
      { holder: "nicu.eth", hold: 0.30, campaign: "Maya’s NICU bills", amount: 79.92 },
      { holder: "deshawn-van", hold: 0.124, campaign: "Wheelchair van for Deshawn", amount: 33.03 },
      { holder: "0xa41c…7f22", hold: 0.081, campaign: "Rebuild the Larsen family home", amount: 21.58 }
    ]
  },
  campaigns: [
    { id: "mayas-nicu", name: "Maya’s NICU bills", category: "Medical", city: "Fresno, CA", goal: 45000, raised: 18210, routed: 5538.72, nominators: 4, status: "active", url: "https://www.gofundme.com/f/mayas-nicu-bills", art: "pink" },
    { id: "deshawn-van", name: "Wheelchair van for Deshawn", category: "Mobility", city: "Baltimore, MD", goal: 62000, raised: 31004, routed: 2289.44, nominators: 3, status: "active", url: "#", art: "blue" },
    { id: "larsen-home", name: "Rebuild the Larsen family home", category: "Housing", city: "Paradise, CA", goal: 80000, raised: 9870, routed: 412.16, nominators: 2, status: "active", url: "#", art: "green" },
    { id: "okafor-class", name: "Ms. Okafor’s 3rd grade classroom", category: "Education", city: "Detroit, MI", goal: 4000, raised: 2140, routed: 1601.90, nominators: 2, status: "active", url: "#", art: "lime" },
    { id: "biscuit", name: "Surgery for Biscuit", category: "Animals", city: "Austin, TX", goal: 6500, raised: 3310, routed: 788.03, nominators: 1, status: "active", url: "#", art: "violet" },
    { id: "rosa-mendes", name: "Laying Rosa Mendes to rest", category: "Memorial", city: "El Paso, TX", goal: 12000, raised: 12000, routed: 1874.55, nominators: 2, status: "funded", url: "#", art: "coral" },
    { id: "priya-insulin", name: "A year of insulin for Priya", category: "Medical", city: "Queens, NY", goal: 7200, raised: 1980, routed: 301.26, nominators: 1, status: "active", url: "#", art: "cyan" },
    { id: "pool", name: "The pool", category: "All of the above", city: "Split across every active campaign", goal: 0, raised: 0, routed: 640.12, nominators: 8, status: "pool", url: "#", art: "olive" }
  ],
  leaderboard: [
    { rank: 1, holder: "nicu.eth", wallet: "0x7d2e…91af", hold: 0.30, heldFor: "6 d 03 h", thesis: "My daughter spent 41 days in the NICU. I know exactly what these bills look like.", campaign: "Maya’s NICU bills", raised: "$18,210 of $45,000", routed: 5538.72, status: "queued" },
    { rank: 2, holder: "deshawn-van", wallet: "0x3b91…e4d0", hold: 0.124, heldFor: "4 d 19 h", thesis: "A wheelchair van is freedom. Degens can fund freedom.", campaign: "Wheelchair van for Deshawn", raised: "$31,004 of $62,000", routed: 2289.44, status: "paid" },
    { rank: 3, holder: "0xa41c…7f22", wallet: "anon", hold: 0.081, heldFor: "0 d 09 h", thesis: "Lost my own place to a fire in ’19. Nobody showed up for us.", campaign: "Rebuild the Larsen family home", raised: "$9,870 of $80,000", routed: 412.16, status: "confirming" },
    { rank: 4, holder: "hollis.rh", wallet: "0xc2f0…1b88", hold: 0.0675, heldFor: "5 d 22 h", thesis: "Teachers buy their own supplies. That’s insane. Fund the classroom.", campaign: "Ms. Okafor’s 3rd grade classroom", raised: "$2,140 of $4,000", routed: 1601.90, status: "paid" },
    { rank: 5, holder: "0x19de…aa03", wallet: "anon", hold: 0.052, heldFor: "2 d 01 h", thesis: "Vet bills shouldn’t decide whether a dog lives.", campaign: "Surgery for Biscuit", raised: "$3,310 of $6,500", routed: 788.03, status: "paid" },
    { rank: 6, holder: "tanaka.eth", wallet: "0x6e77…0c4d", hold: 0.0495, heldFor: "6 d 03 h", thesis: "Funeral costs hit the people least able to pay them.", campaign: "Laying Rosa Mendes to rest", raised: "fully funded · $12,000", routed: 1874.55, status: "paid" },
    { rank: 7, holder: "0xf0a2…55e9", wallet: "anon", hold: 0.033, heldFor: "1 d 14 h", thesis: "Insulin. That’s the whole thesis.", campaign: "A year of insulin for Priya", raised: "$1,980 of $7,200", routed: 301.26, status: "paid" },
    { rank: 8, holder: "quietwhale", wallet: "0x0b3c…9d71", hold: 0.0285, heldFor: "3 d 08 h", thesis: "No thesis. Just want to see if this thing is real.", campaign: "Pool (split across all campaigns)", raised: "no campaign nominated", routed: 640.12, status: "paid" }
  ],
  proofs: [
    { id: "0412-07", at: "2026-10-21T14:33:41Z", holder: "nicu.eth", campaign: "Maya’s NICU bills", amount: 240.00, confirmation: "GF-8K2M-41Q", feeTx: "0x8f3a…c21e", length: "2:14", status: "paid" },
    { id: "0412-08", at: "2026-10-21T14:34:50Z", holder: "deshawn-van", campaign: "Wheelchair van for Deshawn", amount: 99.20, confirmation: "GF-2T7X-90A", feeTx: "0x8f3a…c21e", length: "1:51", status: "paid" },
    { id: "0412-09", at: "2026-10-21T14:36:12Z", holder: "0xa41c…7f22", campaign: "Rebuild the Larsen family home", amount: 38.88, confirmation: "pending", feeTx: "0x8f3a…c21e", length: "1:47", status: "confirming" },
    { id: "0411-07", at: "2026-10-21T14:18:30Z", holder: "nicu.eth", campaign: "Maya’s NICU bills", amount: 211.20, confirmation: "GF-7PQ1-3LD", feeTx: "0x61b0…4e9a", length: "2:02", status: "paid" },
    { id: "0411-08", at: "2026-10-21T14:19:44Z", holder: "hollis.rh", campaign: "Ms. Okafor’s 3rd grade classroom", amount: 59.40, confirmation: "GF-5HC8-22M", feeTx: "0x61b0…4e9a", length: "1:58", status: "paid" },
    { id: "0411-09", at: "2026-10-21T14:21:05Z", holder: "tanaka.eth", campaign: "Laying Rosa Mendes to rest", amount: 43.56, confirmation: "GF-9VV2-08R", feeTx: "0x61b0…4e9a", length: "2:21", status: "paid" },
    { id: "0410-07", at: "2026-10-21T14:03:12Z", holder: "0x19de…aa03", campaign: "Surgery for Biscuit", amount: 45.76, confirmation: "GF-1NB6-77K", feeTx: "0x2c8d…f013", length: "1:39", status: "paid" },
    { id: "0410-08", at: "2026-10-21T14:04:31Z", holder: "0xf0a2…55e9", campaign: "A year of insulin for Priya", amount: 29.04, confirmation: "GF-4RL2-61Z", feeTx: "0x2c8d…f013", length: "1:44", status: "paid" },
    { id: "0409-07", at: "2026-10-21T13:48:57Z", holder: "nicu.eth", campaign: "Maya’s NICU bills", amount: 198.00, confirmation: "GF-0QD8-35N", feeTx: "0x9a17…b4c2", length: "2:08", status: "paid" }
  ],
  disputes: [{ id: "0188", note: "a $0.02 rounding difference, corrected in sweep #0189", url: "#dispute-0188" }]
};
