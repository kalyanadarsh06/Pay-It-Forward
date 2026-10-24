window.PIF_TOUR = {
 "end": 126.7,
 "steps": [
  {
   "id": "hello",
   "say": "Hi, I'm Earthy. Let me walk you down Pay It Forward.",
   "x": 0.4,
   "y": 0.56,
   "mood": "glad",
   "gesture": "wave",
   "target": ".h-display",
   "dur": 5.3,
   "at": 1.2,
   "audioAt": 1.2
  },
  {
   "id": "hero",
   "say": "Your trading fees, paid forward. Creator fees from PIF go to GoFundMe campaigns that holders choose, and an agent pays them on a live stream.",
   "x": 0.4,
   "y": 0.56,
   "gesture": "point",
   "target": ".hero__lede",
   "actions": [
    {
     "at": 4.2,
     "type": "cursor",
     "sel": ".hero__cta .btn--white"
    }
   ],
   "dur": 10.9,
   "at": 7.4,
   "audioAt": 7.4
  },
  {
   "id": "charities",
   "say": "These are the campaigns holders are funding right now. Each one was nominated by a holder, and PIF's share lands every sweep.",
   "scroll": "#charities",
   "offset": 80,
   "x": 0.62,
   "y": 0.4,
   "walk": true,
   "gesture": "point",
   "target": ".cg--wide",
   "actions": [
    {
     "at": 0,
     "type": "hide-cursor"
    },
    {
     "at": 4.2,
     "type": "focus",
     "sel": ".cgrid > :nth-child(3)"
    },
    {
     "at": 6.4,
     "type": "focus",
     "sel": ".cgrid > :nth-child(5)"
    }
   ],
   "dur": 9.7,
   "at": 19.2,
   "audioAt": 19.7
  },
  {
   "id": "hold",
   "say": "Three things to know. Hold at least half a percent of supply, and you're counted in every fifteen-minute sweep.",
   "scroll": "#how",
   "offset": 110,
   "x": 0.62,
   "y": 0.34,
   "walk": true,
   "gesture": "point",
   "target": ".olive-panel",
   "actions": [
    {
     "at": 1.2,
     "type": "click",
     "sel": "[data-tab=\"hold\"]"
    }
   ],
   "dur": 8.5,
   "at": 30.3,
   "audioAt": 30.8
  },
  {
   "id": "nominate",
   "say": "Nominate any GoFundMe campaign when you buy in. The agent verifies the link at every sweep and pays it directly.",
   "x": 0.62,
   "y": 0.34,
   "gesture": "point",
   "target": ".olive-panel",
   "actions": [
    {
     "at": 0.4,
     "type": "click",
     "sel": "[data-tab=\"nominate\"]"
    }
   ],
   "dur": 8.9,
   "at": 40.2,
   "audioAt": 40.2
  },
  {
   "id": "verify-tab",
   "say": "And verify it yourself: the fee transaction, the donation on GoFundMe, and the unedited recording.",
   "x": 0.62,
   "y": 0.34,
   "gesture": "count",
   "target": ".olive-panel",
   "actions": [
    {
     "at": 0.4,
     "type": "click",
     "sel": "[data-tab=\"verify\"]"
    },
    {
     "at": 3.6,
     "type": "cursor",
     "sel": "#panel-btn"
    }
   ],
   "dur": 6.9,
   "at": 50,
   "audioAt": 50
  },
  {
   "id": "leaderboard",
   "say": "The leaderboard. Score is dollars routed to charity. Hold more, hold longer, climb higher.",
   "scroll": "#leaderboard",
   "offset": 40,
   "x": 0.05,
   "y": 0.5,
   "walk": true,
   "mood": "glad",
   "gesture": "cheer",
   "target": ".pd--1",
   "actions": [
    {
     "at": 0,
     "type": "hide-cursor"
    },
    {
     "at": 4,
     "type": "focus",
     "sel": ".ranks"
    }
   ],
   "dur": 6.5,
   "at": 57.8,
   "audioAt": 58.3
  },
  {
   "id": "proofs",
   "say": "Every donation we've made is here, with a recording and a receipt. Scroll through them whenever you like.",
   "scroll": "#proofs",
   "offset": 90,
   "x": 0.62,
   "y": 0.36,
   "walk": true,
   "gesture": "point",
   "target": ".carousel",
   "actions": [
    {
     "at": 2.4,
     "type": "carousel",
     "ms": 3000
    }
   ],
   "dur": 8.1,
   "at": 65.7,
   "audioAt": 66.2
  },
  {
   "id": "why",
   "say": "Why trust it? It happens on camera, every time. Receipts, not promises. Holders choose where it goes. And a reserve for tax, nothing else.",
   "scroll": ".why",
   "offset": 90,
   "x": 0.38,
   "y": 0.64,
   "walk": true,
   "gesture": "point-up",
   "target": ".why__card:nth-child(1)",
   "actions": [
    {
     "at": 3.4,
     "type": "focus",
     "sel": ".why__card:nth-child(2)"
    },
    {
     "at": 5.4,
     "type": "focus",
     "sel": ".why__card:nth-child(3)"
    },
    {
     "at": 7.6,
     "type": "focus",
     "sel": ".why__card:nth-child(4)"
    }
   ],
   "dur": 10.5,
   "at": 75.2,
   "audioAt": 75.7
  },
  {
   "id": "method",
   "say": "Here's the method, row by row. The math is read out loud on the stream. The card is redacted, the receipt is shown. Disputes are resolved in public. And the data feed is open.",
   "scroll": "#verify-rows",
   "offset": 60,
   "x": 0.36,
   "y": 0.66,
   "walk": true,
   "gesture": "count",
   "target": ".row:nth-child(1)",
   "actions": [
    {
     "at": 4.4,
     "type": "focus",
     "sel": ".row:nth-child(2)"
    },
    {
     "at": 7.6,
     "type": "focus",
     "sel": ".row:nth-child(3)"
    },
    {
     "at": 9.8,
     "type": "focus",
     "sel": ".row:nth-child(4)"
    }
   ],
   "dur": 14.5,
   "at": 87.1,
   "audioAt": 87.6
  },
  {
   "id": "voices",
   "say": "Here's why people hold it, in their own words.",
   "scroll": "#voices",
   "offset": 80,
   "x": 0.05,
   "y": 0.55,
   "walk": true,
   "gesture": "raise",
   "target": ".quotes",
   "dur": 4.5,
   "at": 103,
   "audioAt": 103.5
  },
  {
   "id": "cta",
   "say": "When you're ready, this is the button. Hold PIF, nominate a campaign, and watch your share go somewhere real.",
   "scroll": "#cta",
   "offset": 160,
   "x": 0.58,
   "y": 0.5,
   "walk": true,
   "mood": "glad",
   "gesture": "present",
   "target": "#cta-buy",
   "actions": [
    {
     "at": 1.6,
     "type": "cursor",
     "sel": "#cta-buy"
    }
   ],
   "dur": 8.5,
   "at": 108.9,
   "audioAt": 109.4
  },
  {
   "id": "bye",
   "say": "That's the tour. Receipts, not promises. See you on the ledger.",
   "scroll": ".footer",
   "offset": 40,
   "x": 0.05,
   "y": 0.52,
   "walk": true,
   "mood": "glad",
   "gesture": "wave",
   "target": ".footer__mark",
   "actions": [
    {
     "at": 0,
     "type": "hide-cursor"
    }
   ],
   "dur": 5.3,
   "at": 118.8,
   "audioAt": 119.3
  }
 ]
};
