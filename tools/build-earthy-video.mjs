// Builds the Earthy walkthrough video:
// 1. times each line from its word count, 2. writes replica/tour-timeline.js,
// 3. records the page in real time over CDP, 4. stitches a silent mp4.
// usage: node tools/build-earthy-video.mjs [--wpm 150] [--skip-record]
import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs"; import path from "node:path";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2); const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const WPM = +opt("--wpm", "150"), W = 1440, H = 900;

const STEPS = [
  { id: "hello", say: "Hi, I'm Earthy. Let me walk you down Pay It Forward.", x: .40, y: .56, mood: "glad", gesture: "wave", target: ".h-display" },
  { id: "hero", say: "Your trading fees, paid forward. Creator fees from PIF go to GoFundMe campaigns that holders choose, and an agent pays them on a live stream.", x: .40, y: .56, gesture: "point", target: ".hero__lede", actions: [{ at: 4.2, type: "cursor", sel: ".hero__cta .btn--white" }] },
  { id: "charities", say: "These are the campaigns holders are funding right now. Each one was nominated by a holder, and PIF's share lands every sweep.", scroll: "#charities", offset: 80, x: .62, y: .40, walk: true, gesture: "point", target: ".cg--wide", actions: [{ at: 0, type: "hide-cursor" }, { at: 4.2, type: "focus", sel: ".cgrid > :nth-child(3)" }, { at: 6.4, type: "focus", sel: ".cgrid > :nth-child(5)" }] },
  { id: "hold", say: "Three things to know. Hold at least half a percent of supply, and you're counted in every fifteen-minute sweep.", scroll: "#how", offset: 110, x: .62, y: .34, walk: true, gesture: "point", target: ".olive-panel", actions: [{ at: 1.2, type: "click", sel: '[data-tab="hold"]' }] },
  { id: "nominate", say: "Nominate any GoFundMe campaign when you buy in. The agent verifies the link at every sweep and pays it directly.", x: .62, y: .34, gesture: "point", target: ".olive-panel", actions: [{ at: .4, type: "click", sel: '[data-tab="nominate"]' }] },
  { id: "verify-tab", say: "And verify it yourself: the fee transaction, the donation on GoFundMe, and the unedited recording.", x: .62, y: .34, gesture: "count", target: ".olive-panel", actions: [{ at: .4, type: "click", sel: '[data-tab="verify"]' }, { at: 3.6, type: "cursor", sel: "#panel-btn" }] },
  { id: "leaderboard", say: "The leaderboard. Score is dollars routed to charity. Hold more, hold longer, climb higher.", scroll: "#leaderboard", offset: 40, x: .05, y: .50, walk: true, mood: "glad", gesture: "cheer", target: ".pd--1", actions: [{ at: 0, type: "hide-cursor" }, { at: 4.0, type: "focus", sel: ".ranks" }] },
  { id: "proofs", say: "Every donation we've made is here, with a recording and a receipt. Scroll through them whenever you like.", scroll: "#proofs", offset: 90, x: .62, y: .36, walk: true, gesture: "point", target: ".carousel", actions: [{ at: 2.4, type: "carousel", ms: 3000 }] },
  { id: "why", say: "Why trust it? It happens on camera, every time. Receipts, not promises. Holders choose where it goes. And a reserve for tax, nothing else.", scroll: ".why", offset: 90, x: .38, y: .64, walk: true, gesture: "point-up", target: ".why__card:nth-child(1)", actions: [{ at: 3.4, type: "focus", sel: ".why__card:nth-child(2)" }, { at: 5.4, type: "focus", sel: ".why__card:nth-child(3)" }, { at: 7.6, type: "focus", sel: ".why__card:nth-child(4)" }] },
  { id: "method", say: "Here's the method, row by row. The math is read out loud on the stream. The card is redacted, the receipt is shown. Disputes are resolved in public. And the data feed is open.", scroll: "#verify-rows", offset: 60, x: .36, y: .66, walk: true, gesture: "count", target: ".row:nth-child(1)", actions: [{ at: 4.4, type: "focus", sel: ".row:nth-child(2)" }, { at: 7.6, type: "focus", sel: ".row:nth-child(3)" }, { at: 9.8, type: "focus", sel: ".row:nth-child(4)" }] },
  { id: "voices", say: "Here's why people hold it, in their own words.", scroll: "#voices", offset: 80, x: .05, y: .55, walk: true, gesture: "raise", target: ".quotes" },
  { id: "cta", say: "When you're ready, this is the button. Hold PIF, nominate a campaign, and watch your share go somewhere real.", scroll: "#cta", offset: 160, x: .58, y: .50, walk: true, mood: "glad", gesture: "present", target: "#cta-buy", actions: [{ at: 1.6, type: "cursor", sel: "#cta-buy" }] },
  { id: "bye", say: "That's the tour. Receipts, not promises. See you on the ledger.", scroll: ".footer", offset: 40, x: .05, y: .52, walk: true, mood: "glad", gesture: "wave", target: ".footer__mark", actions: [{ at: 0, type: "hide-cursor" }] }
];

// 1. timeline from reading pace
let t = 1.2; const GAP = 0.9;
for (const s of STEPS) {
  const words = s.say.trim().split(/\s+/).length;
  s.dur = +Math.max(2.8, words / (WPM / 60) + 0.9).toFixed(2); s.at = +t.toFixed(2);
  const lead = s.scroll ? 0.5 : 0; s.audioAt = +(t + lead).toFixed(2);
  t += lead + s.dur + GAP;
}
const END = +(t + 1.2).toFixed(2);
const timeline = { end: END, steps: STEPS };
fs.writeFileSync(path.join(ROOT, "replica", "tour-timeline.js"), "window.PIF_TOUR = " + JSON.stringify(timeline, null, 1) + ";\n");
console.log(`timeline: ${STEPS.length} steps, ${END}s`);
if (args.includes("--skip-record")) process.exit(0);

// 2. record in real time over CDP
const FR = path.join(ROOT, ".context", "earthy-frames"); fs.mkdirSync(FR, { recursive: true });
for (const f of fs.readdirSync(FR)) fs.unlinkSync(path.join(FR, f));
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--window-size=${W},${H}`, "--user-data-dir=/tmp/pif-chrome-" + port, "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let target; for (let i = 0; i < 50 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(x => x.type === "page"); } catch { await sleep(200); } }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map(); const frames = [];
const send = (m, p = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); return; }
  if (m.method === "Page.screencastFrame") { const f = path.join(FR, `f-${String(frames.length).padStart(5, "0")}.jpg`); fs.writeFileSync(f, Buffer.from(m.params.data, "base64")); frames.push({ f, t: m.params.metadata.timestamp }); send("Page.screencastFrameAck", { sessionId: m.params.sessionId }); } };
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `file://${ROOT}/replica/index.html?tour=earthy&wait=1` });
// wait until the tour script is loaded and fonts are ready (scripts after a <link rel=stylesheet> block on it)
for (let i = 0; i < 100; i++) {
  const r = await send("Runtime.evaluate", { expression: "typeof window.PIF_TOUR_START === 'function' && document.fonts.status === 'loaded'", returnByValue: true });
  if (r?.result?.value === true) break; await sleep(200);
  if (i === 99) { chrome.kill(); throw new Error("tour never became ready"); }
}
await sleep(600);
await send("Page.startScreencast", { format: "jpeg", quality: 84, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
await sleep(250);
const startedAt = Date.now();
const started = await send("Runtime.evaluate", { expression: "window.PIF_TOUR_START(), 'ok'", returnByValue: true });
if (started?.result?.value !== "ok") { chrome.kill(); throw new Error("tour failed to start: " + JSON.stringify(started)); }
const firstFrameT = frames.length ? frames[0].t : null;
await sleep(END * 1000 + 600);
await send("Page.stopScreencast"); ws.close(); chrome.kill();
// trim frames captured before the tour started
const startT = frames.find(x => x.t >= (frames[0].t + (Date.now() - startedAt - END * 1000 - 600) / 1000 * 0))?.t ?? frames[0].t;
const t0 = frames.length ? frames[0].t : 0;
const list = frames.map((x, i) => { const d = i < frames.length - 1 ? frames[i + 1].t - x.t : 0.4; return `file '${x.f}'\nduration ${Math.max(0.001, d).toFixed(4)}`; }).join("\n") + `\nfile '${frames.at(-1).f}'`;
const listFile = path.join(FR, "list.txt"); fs.writeFileSync(listFile, list);
console.log(`recorded ${frames.length} frames over ${(frames.at(-1).t - t0).toFixed(1)}s`);

// 3. stitch a silent mp4
const out = path.join(ROOT, ".context", "earthy-walkthrough.mp4");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-an", out]);
for (const f of fs.readdirSync(FR)) fs.unlinkSync(path.join(FR, f));
console.log("wrote", out);
