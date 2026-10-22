// Pay It Forward ($PIF) — site logic.
//
// ---------------------------------------------------------------------------------------------------------------
// CONFIG: edit this block. While `live` is false the page shows the sample numbers below, labelled SAMPLE DATA, so
// visitors never mistake them for real donations. Set `live` to true only once `dataUrl` serves real payouts.
// ---------------------------------------------------------------------------------------------------------------
const CONFIG = {
  live: false,
  dataUrl: "",          // JSON endpoint with { causes, holders, payouts, stats } (same shape as PREVIEW below)
  registerUrl: "",      // POST endpoint that saves a vote { wallet, causeUrl, message, signature } after the user signs
  fomoUrl: "",          // link to $PIF on FOMO; the Join section shows an "Open FOMO" button once set
  contract: "",         // token contract address; shown in the footer once set
  explorerBase: "",     // e.g. "https://explorer.example/address/" for the contract link
  payoutEveryHours: 24, // payout cadence, drives the countdown
  milestones: [1000, 10000, 50000, 100000],
};

// Sample data: made up, shown with a SAMPLE DATA label until CONFIG.live is true.
// Each cause lists `holders` (how many back it) and its top `backers`: a backer's amount is the part of that cause's
// payouts routed by their vote (weighted by holdings and time held). The rest of the total is spread over the others.
// Each payout has the cause's donation page (`url`), the agent's live view or recording (`session`, an embeddable URL),
// `live: true` while the agent is still paying, and optionally `steps` [{ label, done }] reported by the agent.
const PREVIEW = {
  causes: [
    { who: "Neighborhood Food Bank", amount: 4210.00, holders: 412, backers: [
      { who: "0x71C...8E42", amount: 812.40 }, { who: "0xBC1...2290", amount: 410.80 },
      { who: "0x5D0...A1C7", amount: 288.30 }, { who: "0xE47...09B2", amount: 241.15 } ] },
    { who: "Clean Water Initiative", amount: 3185.40, holders: 318, backers: [
      { who: "0x3A2...F911", amount: 640.25 }, { who: "ocean_clean.eth", amount: 301.00 },
      { who: "0x0F8...7C3D", amount: 254.60 }, { who: "0x88A...E5F0", amount: 198.75 } ] },
    { who: "Children's Hospital Fund", amount: 2640.00, holders: 276, backers: [
      { who: "kindness.eth", amount: 522.00 }, { who: "0x992...DA04", amount: 366.15 },
      { who: "0x4B9...1E66", amount: 233.40 }, { who: "0xC2D...8F01", amount: 187.20 } ] },
    { who: "Animal Shelter Network", amount: 1922.75, holders: 201, backers: [
      { who: "0x6E3...B4A9", amount: 284.10 }, { who: "0x17F...C0D2", amount: 219.55 },
      { who: "0xA4E...9D30", amount: 176.30 }, { who: "0xA0B...3E7F", amount: 142.85 } ] },
    { who: "Medical Fundraiser", amount: 1310.10, holders: 134, backers: [
      { who: "0xD9C...5A12", amount: 268.40 }, { who: "0x2E5...F7B8", amount: 190.05 },
      { who: "0x7A1...0C93", amount: 133.70 } ] },
    { who: "School Supplies Drive", amount: 980.00, holders: 88, backers: [
      { who: "0xF3E...61AD", amount: 201.25 }, { who: "0x590...B2C4", amount: 158.90 },
      { who: "0x3C8...D7E1", amount: 117.60 } ] },
  ],
  holders: [
    { who: "0x71C...8E42", amount: 812.40 },
    { who: "0x3A2...F911", amount: 640.25 },
    { who: "kindness.eth", amount: 522.00 },
    { who: "0xBC1...2290", amount: 410.80 },
    { who: "0x992...DA04", amount: 366.15 },
    { who: "ocean_clean.eth", amount: 301.00 },
  ],
  payouts: [
    { live: true, cause: "School Supplies Drive", url: "school-supplies-drive.example/donate", amount: 58.75 },
    { minsAgo: 14, cause: "Neighborhood Food Bank", url: "neighborhood-food-bank.example/donate", amount: 212.40, receipt: "#" },
    { minsAgo: 52, cause: "Clean Water Initiative", url: "clean-water-initiative.example/give", amount: 148.10, receipt: "#" },
    { minsAgo: 97, cause: "Animal Shelter Network", url: "animal-shelter-network.example/donate", amount: 96.55, receipt: "#" },
    { minsAgo: 160, cause: "Children's Hospital Fund", url: "childrens-hospital-fund.example/donate", amount: 131.20, receipt: "#" },
    { minsAgo: 230, cause: "Medical Fundraiser", url: "fundraiser.example/f/medical-fund", amount: 74.00, receipt: "#" },
  ],
  stats: { donated: 14248.25, causes: 6, payouts: 38, holders: 1429 },
};

// ---------------------------------------------------------------------------------------------------------------
const $ = (id) => document.getElementById(id);
const fmtUSD = (n, d = 2) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtInt = (n) => Number(n).toLocaleString("en-US");
let DATA = PREVIEW;
let board = "causes";
const LEDE = {
  causes: "How much each cause has received so far. Tap a cause to see the holders behind it.",
  holders: "Holders ranked by how much their vote has sent to their cause.",
};
const openCauses = new Set(); // causes whose backer list is expanded; kept across live refreshes

function ago(mins) {
  if (mins < 60) return `${mins} MIN AGO`;
  const h = Math.floor(mins / 60);
  return h < 24 ? `${h} HR AGO` : `${Math.floor(h / 24)} D AGO`;
}

function renderBoard() {
  const list = $("leaderboard");
  list.innerHTML = "";
  (DATA[board] || []).forEach((r, i) => {
    const li = document.createElement("li");
    const cells = `<span class="rank">${String(i + 1).padStart(2, "0")}</span><span class="who"></span><span class="amount">${fmtUSD(r.amount)}</span>`;
    if (board === "causes" && r.backers) { li.className = "cause-item"; li.append(...causeRow(r, i, cells)); }
    else { li.className = "row"; li.innerHTML = cells; }
    li.querySelector(".who").textContent = r.who;
    list.appendChild(li);
  });
}

// A cause row is a toggle; under it sits the list of holders backing that cause and how much each has donated.
function causeRow(r, i, cells) {
  const btn = document.createElement("button");
  btn.className = "row row-toggle";
  btn.id = `cause-${i}`;
  btn.setAttribute("aria-controls", `backers-${i}`);
  btn.innerHTML = `${cells}<span class="who-meta">${fmtInt(r.holders || r.backers.length)} HOLDERS</span><span class="chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>`;

  const panel = document.createElement("div");
  panel.className = "backers";
  panel.id = `backers-${i}`;
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", btn.id);
  const shown = r.backers.reduce((a, b) => a + b.amount, 0);
  const rest = Math.max(0, (r.holders || 0) - r.backers.length);
  panel.innerHTML = `<div class="backers-inner"><div class="backers-head"><span>HOLDER</span><span>DONATED</span></div><ol class="backer-list"></ol>
    ${rest ? `<p class="backers-rest">+ ${fmtInt(rest)} more holders <span>${fmtUSD(Math.max(0, r.amount - shown))}</span></p>` : ""}</div>`;
  const ol = panel.querySelector(".backer-list");
  r.backers.forEach((b) => {
    const row = document.createElement("li");
    row.className = "backer";
    row.innerHTML = `<span class="backer-who"></span><span class="backer-bar"><span style="width:${Math.min(100, (b.amount / r.amount) * 100).toFixed(1)}%"></span></span><span class="backer-amt">${fmtUSD(b.amount)}</span>`;
    row.querySelector(".backer-who").textContent = b.who;
    ol.appendChild(row);
  });

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", open);
    btn.parentElement?.classList.toggle("is-open", open);
    panel.inert = !open;
    open ? openCauses.add(r.who) : openCauses.delete(r.who);
  };
  btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  queueMicrotask(() => setOpen(openCauses.has(r.who)));
  return [btn, panel];
}

let watching = null; // index of the payout shown in the agent viewer

function renderPayouts() {
  const list = $("payouts");
  list.innerHTML = "";
  const ps = DATA.payouts || [];
  if (watching === null || watching >= ps.length) watching = Math.max(0, ps.findIndex((p) => p.live));
  ps.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "payout" + (p.live ? " is-live" : "") + (i === watching ? " is-watching" : "");
    li.innerHTML = `<span class="when">${p.live ? "IN PROGRESS" : ago(p.minsAgo)}</span><span class="cause"></span><span class="amt">${fmtUSD(p.amount)}</span>
      <span class="payout-actions"><button class="watch" type="button">${p.live ? "WATCH LIVE" : "WATCH"}</button>${p.live ? '<span class="receipt is-pending">PENDING</span>' : '<a class="receipt">RECEIPT</a>'}</span>`;
    li.querySelector(".cause").textContent = p.cause;
    const a = li.querySelector("a.receipt");
    if (a) {
      a.href = p.receipt || "#";
      if (p.receipt && p.receipt !== "#") { a.target = "_blank"; a.rel = "noopener"; }
    }
    li.querySelector(".watch").addEventListener("click", () => {
      watching = i;
      renderPayouts();
      $("agent").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    list.appendChild(li);
  });
  showAgent(ps[watching]);
}

// -------- agent viewer: the browser an agent uses to make a payout --------
const STEPS = ["Open the donation page", "Enter the amount", "Pay with the $PIF card", "Confirm the donation", "Save the receipt"];
let shownKey = "";
let demoTimer = null;

function showAgent(p) {
  $("agent").hidden = !p;
  if (!p) return;
  const key = [p.cause, p.amount, p.session || "", !!p.live].join("|");
  if (key === shownKey) return; // same payout: keep the live view running across refreshes
  shownKey = key;
  clearTimeout(demoTimer);
  $("agent-title").textContent = `${p.live ? "Paying" : "Paid"} ${p.cause} · ${fmtUSD(p.amount)}`;
  $("agent-url").textContent = p.url || "";
  const badge = $("agent-badge");
  badge.lastElementChild.textContent = !CONFIG.live ? "SAMPLE" : p.live ? "LIVE" : "REPLAY";
  badge.querySelector(".dot").classList.toggle("is-preview", !(CONFIG.live && p.live));
  const open = $("agent-open");
  open.hidden = !(CONFIG.live && p.session);
  if (!open.hidden) open.href = p.session;
  if (!CONFIG.live) return runDemo(p);

  const view = $("agent-view");
  view.innerHTML = p.session ? '<iframe title="Agent browser" allow="fullscreen"></iframe>' : '<p class="agent-empty">The recording will appear here shortly.</p>';
  if (p.session) view.querySelector("iframe").src = p.session;
  renderSteps(p.steps || STEPS.map((label) => ({ label, done: !p.live })));
}

function renderSteps(steps) {
  const ol = $("agent-steps");
  ol.innerHTML = "";
  steps.forEach((s) => {
    const li = document.createElement("li");
    li.className = "agent-step" + (s.done ? " is-done" : "") + (s.now ? " is-now" : "");
    li.innerHTML = '<span class="tick" aria-hidden="true"></span><span class="label"></span>';
    li.querySelector(".label").textContent = s.label;
    ol.appendChild(li);
  });
}

// Preview only: act out a payment on a mock donation page, one step at a time, then loop.
function runDemo(p) {
  const view = $("agent-view");
  view.innerHTML = `<div class="mock"><p class="mock-org"></p><p class="mock-h">Make a donation</p>
    <div class="mock-field" data-step="1"><span>Amount</span><b>${fmtUSD(p.amount)}</b></div>
    <div class="mock-field" data-step="2"><span>Card</span><b>•••• •••• •••• ••••</b></div>
    <div class="mock-btn" data-step="3">Donate</div>
    <p class="mock-done">Thank you! Your receipt has been emailed.</p>
    <svg class="cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.6L10 19z" fill="#3b1e14" stroke="#fffaf4" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
  view.querySelector(".mock-org").textContent = p.cause;
  const mock = view.querySelector(".mock"), cursor = mock.querySelector(".cursor");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let step = still ? STEPS.length : 0;
  const tick = () => {
    mock.dataset.step = step;
    const el = mock.querySelector(`[data-step="${step}"]`);
    mock.querySelectorAll("[data-step]").forEach((x) => x.classList.toggle("is-focus", x === el));
    mock.classList.toggle("is-done", step >= 4);
    const x = el ? el.offsetLeft + el.offsetWidth * 0.72 : mock.clientWidth * 0.82;
    const y = el ? el.offsetTop + el.offsetHeight * 0.55 : mock.clientHeight * 0.86;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    renderSteps(STEPS.map((label, i) => ({ label, done: i < step, now: i === step })));
    if (still) return;
    demoTimer = setTimeout(() => { step = step >= STEPS.length ? 0 : step + 1; tick(); }, step >= STEPS.length ? 3200 : 1500);
  };
  tick();
}

function renderStats() {
  const s = DATA.stats || {};
  $("stat-donated").textContent = fmtUSD(s.donated || 0, 0);
  $("stat-causes").textContent = fmtInt(s.causes || 0);
  $("stat-payouts").textContent = fmtInt(s.payouts || 0);
  $("stat-holders").textContent = fmtInt(s.holders || 0);
  $("holders-count").textContent = fmtInt(s.holders || 0);
  const ms = CONFIG.milestones, top = ms[ms.length - 1], donated = s.donated || 0;
  $("track-fill").style.width = Math.min(100, (donated / top) * 100) + "%";
  $("marks").innerHTML = ms.map((m) => `<span class="${donated >= m ? "hit" : ""}">${m >= 1000 ? "$" + m / 1000 + "K" : "$" + m}</span>`).join("");
}

function renderMode() {
  $("feed-label").textContent = CONFIG.live ? "LIVE DATA" : "SAMPLE DATA";
  document.querySelector(".feed .dot").classList.toggle("is-preview", !CONFIG.live);
  if (CONFIG.contract) {
    const a = $("contract-link");
    a.textContent = "CONTRACT: " + CONFIG.contract.slice(0, 6) + "..." + CONFIG.contract.slice(-4);
    if (CONFIG.explorerBase) { a.href = CONFIG.explorerBase + CONFIG.contract; a.target = "_blank"; a.rel = "noopener"; }
  }
}

function startCountdown() {
  if (!CONFIG.live) { $("next-payout").textContent = "SAMPLE NUMBERS · PAYOUTS START AT LAUNCH"; return; }
  const period = CONFIG.payoutEveryHours * 3600 * 1000;
  const tick = () => {
    const left = period - (Date.now() % period);
    const h = String(Math.floor(left / 3600000)).padStart(2, "0");
    const m = String(Math.floor((left % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
    $("next-payout").textContent = `NEXT PAYOUT IN ${h}:${m}:${s}`;
  };
  tick(); setInterval(tick, 1000);
}

function initTabs() {
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
    board = t.dataset.board;
    document.querySelectorAll(".tab").forEach((x) => { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); });
    $("board-lede").textContent = LEDE[board];
    renderBoard();
  }));
}

function initNav() {
  const items = [...document.querySelectorAll(".nav-item")];
  const byId = Object.fromEntries(items.map((a) => [a.getAttribute("href").slice(1), a]));
  const setActive = (id) => items.forEach((a) => a.classList.toggle("is-active", a === byId[id]));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && byId[e.target.id]) setActive(e.target.id); }), { rootMargin: "-40% 0px -55% 0px" });
  Object.keys(byId).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

// -------- wallet connect + signed cause choice (any EIP-1193 wallet: MetaMask, Coinbase Wallet, Rabby...) --------
let account = null;
// The pasted donation link, made absolute ("gofundme.com/f/x" -> "https://gofundme.com/f/x"), or null if it isn't a web link.
function causeUrl() {
  let v = $("cause-url").value.trim();
  if (v && !/^[a-z]+:\/\//i.test(v)) v = "https://" + v;
  try { const u = new URL(v); return /^https?:$/.test(u.protocol) && u.hostname.includes(".") ? u.href : null; } catch (e) { return null; }
}

function initConnect() {
  const refresh = () => { $("sign-btn").disabled = !(account && causeUrl()); };
  $("cause-url").addEventListener("input", refresh);
  if (CONFIG.fomoUrl) { $("fomo-link").href = CONFIG.fomoUrl; $("fomo-link").hidden = false; }

  $("connect-btn").addEventListener("click", async () => {
    if (!window.ethereum) { $("wallet-status").textContent = "No wallet found. Install MetaMask or open this page in your wallet's browser."; return; }
    try {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" });
      account = accs && accs[0];
      $("wallet-status").textContent = account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Your wallet didn't share an account. Please try again.";
      $("connect-btn").textContent = account ? "Connected" : "Connect Wallet";
    } catch (e) { $("wallet-status").textContent = "You cancelled the connection."; }
    refresh();
  });

  $("sign-btn").addEventListener("click", async () => {
    const url = causeUrl();
    if (!account || !url) return;
    const site = new URL(url).hostname;
    const message = `Pay It Forward ($PIF)\nMy cause: ${url}\nWallet: ${account}\nTime: ${new Date().toISOString()}\nThis signature is free and does not move any funds.`;
    try {
      const signature = await window.ethereum.request({ method: "personal_sign", params: [message, account] });
      if (!CONFIG.registerUrl) { $("sign-status").textContent = `Signed for ${site}. Voting opens at launch, so please sign again then.`; return; }
      const r = await fetch(CONFIG.registerUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ wallet: account, causeUrl: url, message, signature }) });
      $("sign-status").textContent = r.ok ? `Saved. Your vote now goes to ${site}.` : "Couldn't save your vote right now. Please try again.";
    } catch (e) { $("sign-status").textContent = "You cancelled the signature. Nothing was saved."; }
  });
}

async function loadData() {
  if (!CONFIG.live || !CONFIG.dataUrl) return;
  try { const r = await fetch(CONFIG.dataUrl, { cache: "no-store" }); if (r.ok) DATA = await r.json(); } catch (e) { /* keep last data */ }
}

async function main() {
  renderMode(); initTabs(); initNav(); initConnect(); startCountdown();
  await loadData(); renderBoard(); renderPayouts(); renderStats();
  if (CONFIG.live && CONFIG.dataUrl) setInterval(async () => { await loadData(); renderBoard(); renderPayouts(); renderStats(); }, 30000);
}
main();
