/* Pay It Forward · first visit + ledger. No dependencies. */
(() => {
  const W = window.PIF_WORLD, D = window.PIF_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(location.search);
  const STILL = params.has("still");       // settle all motion instantly (review captures)
  const FORCE = params.get("tour");         // force the tour at a step
  const DONE_KEY = "pif.tour.done";

  /* ---------- formatting ---------- */
  const money = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const int = n => n.toLocaleString("en-US");
  const pct = n => (n * 100).toFixed(2) + "%";
  const tfmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const dfmt = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  const utc = iso => iso.replace("T", " ").replace("Z", " UTC");
  const localTime = (iso, long) => `<time datetime="${iso}" title="${utc(iso)}">${(long ? dfmt : tfmt).format(new Date(iso))}</time>`;

  const easeOut = t => 1 - Math.pow(1 - t, 4);
  function countUp(el, to, fmt, dur = 1000) {
    if (reduced || STILL) { el.textContent = fmt(to); return; }
    let t0 = null;
    const isInt = fmt === int;
    const tick = now => {
      if (t0 === null) t0 = now;
      const p = Math.max(0, Math.min(1, (now - t0) / dur));
      const v = to * easeOut(p);
      el.textContent = fmt(isInt ? Math.round(v) : Math.round(v * 100) / 100);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(to);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Earthy ---------- */
  const earthy = $("#earthy"), mouth = $("#earthy-mouth"), hostLine = $("#host-line"), field = $("#field");
  const MOUTH = { neutral: "M92 118 Q102 128 112 118", concerned: "M93 122 Q102 117 111 122", glad: "M88 116 Q102 134 116 116" };
  function face(mood, gesture) {
    earthy.dataset.mood = mood; mouth.setAttribute("d", MOUTH[mood] || MOUTH.neutral);
    earthy.dataset.gesture = "none";
    // restart CSS animations for gestures that carry one
    void earthy.getBoundingClientRect();
    earthy.dataset.gesture = gesture;
  }
  let blinkTimer;
  function scheduleBlink() {
    clearTimeout(blinkTimer);
    if (reduced || STILL) return;
    blinkTimer = setTimeout(() => {
      earthy.classList.add("is-blinking");
      setTimeout(() => earthy.classList.remove("is-blinking"), 200);
      scheduleBlink();
    }, 2400 + Math.random() * 3400);
  }
  let typeTimer;
  function say(text) {
    clearTimeout(typeTimer);
    hostLine.classList.remove("is-done");
    if (reduced || STILL) { hostLine.textContent = text; hostLine.classList.add("is-done"); return; }
    hostLine.innerHTML = '<span class="t"></span><span class="caret"></span>';
    const t = $(".t", hostLine); let i = 0;
    const step = () => {
      i += 1; t.textContent = text.slice(0, i);
      if (i < text.length) typeTimer = setTimeout(step, /[.,;:]/.test(text[i - 1]) ? 120 : 18);
      else hostLine.classList.add("is-done");
    };
    step();
  }
  earthy.classList.add("is-up"); if (!reduced && !STILL) earthy.classList.add("is-alive");
  earthy.addEventListener("click", () => { face(earthy.dataset.mood, "wave"); });

  /* ---------- tour ---------- */
  const tour = $("#tour"), steps = $$(".step", tour), marks = $$("#steps button"), countEl = $("#tour-count");
  const LINES = [
    { say: "Hi. I’m Earthy.", mood: "glad", gesture: "wave", dwell: 4500 },
    { say: "First, the world as it is. These are the latest numbers from the people who count them.", mood: "concerned", gesture: "cheeks", dwell: 11000 },
    { say: "Here’s the last thing we did about it. Recorded start to finish. The card is blacked out; the receipt isn’t.", mood: "neutral", gesture: "point", dwell: 9500, glow: 1 },
    { say: "And here’s where that money came from, pass by pass.", mood: "neutral", gesture: "count", dwell: 8000 },
    { say: "Who gave the most in the last five minutes, just by holding.", mood: "neutral", gesture: "raise", dwell: 6500 },
    { say: "Everything so far. The leaderboard and every proof are below, whenever you want them.", mood: "glad", gesture: "cheer", dwell: 6500 },
    { say: "If you want your share to go somewhere real, this is the address.", mood: "glad", gesture: "present", dwell: Infinity }
  ];
  let step = -1, autoplay = true, autoTimer, leaving = false;
  const built = new Set();

  function riseIn(root, delay = 110) {
    $$(".rise", root).forEach((el, i) => {
      el.classList.remove("is-in");
      if (reduced || STILL) { el.classList.add("is-in"); return; }
      setTimeout(() => el.classList.add("is-in"), 160 + i * delay);
    });
  }
  const liveRow = (x, i, lead) => `
    <li class="live-row rise ${lead ? "live-row--lead" : ""}">
      <span class="t">${lead ? "<span class=\"caps\">Top</span>" : "<span class=\"caps\">#" + (i + 1) + "</span>"}</span>
      <span class="who">${x.holder}<small>held ${pct(x.hold)} · to ${x.campaign}</small></span>
      <span class="amt">${money(x.amount)}</span>
      <span class="status status--settled caps">routed</span>
    </li>`;

  function buildStep(n) {
    if (built.has(n)) return; built.add(n);
    if (n === 1) {
      $("#figures").innerHTML = W.figures.map(f => `
        <li class="figure rise">
          <span class="figure__n num" data-count="${f.value}">0</span>
          <span class="figure__line">${f.line}</span>
          <a class="figure__src" href="${f.url}" target="_blank" rel="noopener">${f.source} ↗</a>
        </li>`).join("");
      $("#closer").innerHTML = `${W.closer.text}<small><a class="figure__src" href="${W.closer.url}" target="_blank" rel="noopener">${W.closer.source} ↗</a></small>`;
    }
    if (n === 2) {
      const L = D.latest;
      $("#rcpt-id").textContent = "#" + L.id;
      $("#rcpt-campaign").innerHTML = `<a href="${L.campaignUrl}" target="_blank" rel="noopener">${L.campaign}</a>`;
      $("#rcpt-holder").innerHTML = `${L.holder} <span class="soft mono">${L.wallet}</span>`;
      $("#rcpt-paid").innerHTML = localTime(L.paidAt, true);
      $("#rcpt-conf").textContent = L.confirmation;
      $("#rcpt-tx").textContent = L.feeTx;
      $("#rcpt-amount").innerHTML = `<span class="num" data-count="${L.amount}" data-money="1">$0.00</span>`;
      $("#rec-len").textContent = L.recording.length;
      $("#rec-tag").textContent = D.sample ? "Sample recording" : "";
      $("#rec-cap").textContent = D.sample ? "Stand-in for the agent's recording. The real file is unedited, with only the card redacted in post." : "Recorded by the agent in its VM. Unedited. The card is redacted in post, nothing else.";
      $("#rec-sha").textContent = D.sample ? "" : "sha256 " + L.recording.sha256;
    }
    if (n === 3) {
      const L = D.latest, r = D.policy.reserveRate;
      $("#passes").innerHTML = [
        { k: `Creator fees in sweep #${L.sweep}`, s: `${utc(L.window[0]).slice(11, 16)}–${utc(L.window[1]).slice(11, 16)} UTC · tx ${L.feeTx}`, v: money(L.feesInWindow) },
        { k: `${L.holder}’s weight`, s: `held ${pct(L.hold)} for ${L.minutesHeld} of ${D.policy.sweepMinutes} minutes → ${L.weight.toFixed(4)}`, v: money(L.gross) },
        { k: `Reserve, ${Math.round(r * 100)}%`, s: "set aside for the tax owed on the fees", v: "−" + money(L.reserve), cls: "pass--minus" },
        { k: `Donated to ${L.campaign}`, s: `GoFundMe ${L.confirmation}`, v: money(L.amount), cls: "pass--out" }
      ].map(p => `<li class="pass rise ${p.cls || ""}"><span class="pass__k">${p.k}<small>${p.s}</small></span><span class="pass__v">${p.v}</span></li>`).join("");
    }
    if (n === 4) {
      const F = D.lastFive;
      $("#top-rows").innerHTML = F.top.map((x, i) => liveRow(x, i, i === 0)).join("");
      $("#top-window").innerHTML = `Window ${localTime(F.window[0])}–${localTime(F.window[1])} local · ${money(F.fees)} in fees`;
    }
    if (n === 5) {
      const T = D.totals;
      $("#totals").innerHTML = [
        { k: "Donated, confirmed", v: T.donated, m: 1, lead: 1 },
        { k: "Creator fees collected", v: T.fees, m: 1 },
        { k: "Held in reserve", v: T.reserve, m: 1 },
        { k: "Campaigns funded", v: T.campaigns },
        { k: "Sweeps completed", v: T.sweeps }
      ].map(x => `<div class="stat rise ${x.lead ? "stat--lead" : ""}"><span class="caps">${x.k}</span><span class="num" data-count="${x.v}" data-money="${x.m ? 1 : 0}">0</span></div>`).join("");
      $("#totals-since").textContent = `Since ${new Date(T.since + "T12:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })} · ${int(T.holders)} wallets counted`;
    }
    if (n === 6) {
      $("#join-address").textContent = D.token.address;
      $("#join-buy").href = D.token.launchpad.url;
      $("#join-buy").innerHTML = buyLabel();
    }
  }
  const buyLabel = () => D.token.launchpad.placeholder
    ? `<span>Hold $PIF <span class="caps">· venue to be confirmed</span></span><span class="arrow" aria-hidden="true">→</span>`
    : `<span>Hold $PIF on ${D.token.launchpad.name}</span><span class="arrow" aria-hidden="true">→</span>`;
  function runCounters(root) {
    $$("[data-count]", root).forEach(el => countUp(el, parseFloat(el.dataset.count), el.dataset.money === "1" ? money : int, 1100));
  }
  function setMarks(n) {
    marks.forEach((m, i) => {
      m.classList.remove("is-filling");
      m.classList.toggle("is-done", i < n - 1);
      m.classList.toggle("is-active", i === n - 1);
      m.setAttribute("aria-current", i === n - 1 ? "step" : "false");
      m.style.removeProperty("--dwell");
    });
    countEl.textContent = n === 0 ? "" : `Step ${n} of 6`;
    const m = marks[n - 1], d = LINES[n].dwell;
    if (!m || !autoplay || !isFinite(d) || reduced || STILL) return;
    m.style.setProperty("--dwell", d + "ms");
    requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("is-filling")));
  }

  function go(n, opts = {}) {
    n = Math.max(0, Math.min(steps.length - 1, n));
    if (n === step || leaving) return;
    clearTimeout(autoTimer);
    const prev = steps[step], next = steps[n];
    const show = () => {
      if (prev) prev.classList.remove("is-active", "is-leaving");
      step = n; buildStep(n);
      next.classList.add("is-active");
      setMarks(n);
      const L = LINES[n];
      face(L.mood, L.gesture); say(L.say);
      field.dataset.glow = L.glow ? "1" : "0";
      riseIn(next); runCounters(next);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (!opts.silent) (next.querySelector(".action") || next).focus({ preventScroll: true });
      if (autoplay && isFinite(L.dwell) && !STILL) autoTimer = setTimeout(() => go(n + 1, { silent: true }), L.dwell);
    };
    if (prev && !reduced && !STILL) { leaving = true; prev.classList.add("is-leaving"); setTimeout(() => { leaving = false; show(); }, 150); }
    else show();
  }
  function stopAuto() { if (!autoplay) return; autoplay = false; clearTimeout(autoTimer); marks.forEach(m => { m.style.setProperty("--dwell", "0ms"); m.classList.remove("is-filling"); }); }
  function endTour(target) {
    clearTimeout(autoTimer); clearTimeout(typeTimer);
    document.body.dataset.mode = "ledger";
    face("glad", "none"); say("The books are open. Ask me again any time.");
    try { localStorage.setItem(DONE_KEY, "1"); } catch (e) {}
    const el = target && $(target);
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); else $("#ledger-top").focus();
  }
  function startTour(at = 0) {
    document.body.dataset.mode = "tour"; step = -1; autoplay = !STILL;
    scheduleBlink(); go(at);
  }

  document.addEventListener("click", e => {
    const t = e.target.closest("[data-next], [data-back], [data-go], [data-exit], #tour-skip");
    if (!t) return;
    if (t.matches("[data-exit]")) { e.preventDefault(); endTour(t.dataset.target || t.getAttribute("href")); return; }
    if (t.id === "tour-skip") { endTour("#ledger-top"); return; }
    stopAuto();
    if (t.matches("[data-next]")) go(step + 1);
    else if (t.matches("[data-back]")) go(step - 1);
    else if (t.matches("[data-go]")) go(+t.dataset.go);
  });
  document.addEventListener("keydown", e => {
    if (document.body.dataset.mode !== "tour") return;
    if (e.key === "Escape") { endTour("#ledger-top"); return; }
    const onControl = e.target.matches("button, a, input");
    if (e.key === "ArrowRight" || (!onControl && (e.key === "Enter" || e.key === " "))) { e.preventDefault(); stopAuto(); go(step + 1); }
    else if (e.key === "ArrowLeft") { stopAuto(); go(step - 1); }
    else if (/^[1-6]$/.test(e.key)) { stopAuto(); go(+e.key); }
  });
  ["pointerdown", "wheel", "touchstart"].forEach(ev => document.addEventListener(ev, () => { if (document.body.dataset.mode === "tour" && autoplay) stopAuto(); }, { passive: true }));

  function wireCopy(btn) {
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(D.token.address); btn.textContent = "Copied"; }
      catch (e) { btn.textContent = "Select & copy"; }
      setTimeout(() => btn.textContent = "Copy", 1600);
    });
  }
  wireCopy($("#copy-address")); wireCopy($("#site-copy"));

  /* ---------- field + ledger ---------- */
  function buildSite() {
    const T = D.totals, L = D.latest;
    $("#field-sweep").textContent = `Sweep #${L.sweep} · ${money(L.feesInWindow)} in fees`;
    $("#field-meta").innerHTML = `<span>[ ${T.holders} wallets ]</span><span>[ VM-01 ]</span><span>[ ${localTime(L.window[1])} ]</span>${D.sample ? "<span>[ sample data ]</span>" : ""}`;
    $("#nav-stream").href = D.token.stream.url;
    ["#nav-x", "#col-x"].forEach(s => $(s).href = D.token.x.url);
    $("#hero-line").innerHTML = `→ ${money(T.donated)} donated to ${T.campaigns} campaigns since ${new Date(T.since + "T12:00:00").toLocaleDateString(undefined, { month: "long", day: "numeric" })}${D.sample ? " · sample data" : ""}`;

    $("#live-aside").textContent = "refreshing every minute";
    $("#live-rows").innerHTML = D.proofs.slice(0, 5).map(p => `
      <li class="live-row">
        <span class="t">${localTime(p.at)}</span>
        <span class="who">${p.campaign}<small>${p.holder} · #${p.id}</small></span>
        <span class="amt">${money(p.amount)}</span>
        <span class="status status--${p.status} caps">${p.status === "paid" ? "settled" : p.status}</span>
      </li>`).join("");

    $("#ledger-totals").innerHTML = [
      { k: "Total fees diverted", v: money(T.fees) }, { k: "Donated, confirmed", v: money(T.donated) },
      { k: "GoFundMe campaigns", v: int(T.campaigns) }, { k: "Wallets counted", v: int(T.holders) }
    ].map(x => `<div class="stat"><span class="caps">${x.k}</span><span class="num">${x.v}</span></div>`).join("");

    $("#lb-aside").textContent = `${T.holders} wallets ≥ ${(D.policy.minHold * 100).toFixed(1)}% · by weight`;
    const maxHold = Math.max(...D.leaderboard.map(r => r.hold));
    $("#lb-body").innerHTML = D.leaderboard.map(r => `
      <tr>
        <td class="rank">${r.rank}</td>
        <td class="holder">${r.holder}<small>${r.wallet}</small></td>
        <td><div class="hold ${r.rank === 1 ? "is-top" : ""}"><span>${pct(r.hold)}</span><div class="bar"><i style="width:${(r.hold / maxHold * 100).toFixed(0)}%"></i></div></div></td>
        <td class="right">${r.heldFor}</td>
        <td class="thesis"><span>“${r.thesis}”</span></td>
        <td class="camp"><a href="#">${r.campaign} ↗</a><small>${r.raised}</small></td>
        <td class="right amt">${money(r.routed)}</td>
        <td><span class="status status--${r.status} caps">${r.status}</span></td>
      </tr>`).join("");
    $("#lb-foot").innerHTML = `Showing ${D.leaderboard.length} of ${T.holders} · <a href="#">all wallets</a> · <a href="#">export CSV</a>`;

    $("#pf-aside").textContent = `${D.proofs.length} shown · newest first`;
    $("#gallery").innerHTML = D.proofs.map(p => `
      <a class="proof" href="#proof-${p.id}" id="proof-${p.id}">
        <div class="proof__rec"><div>#${p.id} · ${p.holder}</div><div class="rec__play" aria-hidden="true"></div>${D.sample ? '<span class="proof__tag caps">Sample</span>' : ""}<span class="proof__len">${p.length}</span></div>
        <span class="proof__amt">${money(p.amount)}</span>
        <span>${p.campaign}</span>
        <span class="proof__meta"><span>${localTime(p.at, true)}</span><span class="mono">${p.confirmation}</span></span>
        <span class="proof__meta"><span class="mono">tx ${p.feeTx}</span><span class="status status--${p.status} caps">${p.status}</span></span>
      </a>`).join("");
    $("#pf-foot").textContent = `Showing ${D.proofs.length} of ${T.campaigns} donations`;
    $("#pf-dispute").innerHTML = D.disputes.length ? `${D.disputes.length} dispute to date: #${D.disputes[0].id}, ${D.disputes[0].note}. <a href="${D.disputes[0].url}">Read the thread</a>.` : "No disputes to date.";

    $("#site-address").textContent = D.token.address; $("#site-buy").href = D.token.launchpad.url;
    $("#site-buy").innerHTML = buyLabel();
    $("#col-mins").textContent = D.policy.sweepMinutes; $("#col-min").textContent = (D.policy.minHold * 100).toFixed(1) + "%";
    $("#col-rate").textContent = Math.round(D.policy.reserveRate * 100) + "%"; $("#col-wallet").textContent = D.token.feeWallet;
    $("#col-disputes").textContent = D.disputes.length ? `${D.disputes.length} raised, ${D.disputes.length} resolved` : "none";
    $("#col-sample").innerHTML = D.sample ? `<b>Prototype.</b> Every figure on this page is sample data generated ${localTime(D.generatedAt, true)} to show the layout. Nothing is live yet.` : "";
  }
  buildSite();
  $("#replay").addEventListener("click", () => { try { localStorage.removeItem(DONE_KEY); } catch (e) {} window.scrollTo(0, 0); startTour(0); });

  let done = false; try { done = localStorage.getItem(DONE_KEY) === "1"; } catch (e) {}
  if (FORCE !== null) startTour(+FORCE || 0);
  else if (done || params.has("ledger")) { document.body.dataset.mode = "ledger"; face("glad", "none"); say("The books are open."); scheduleBlink(); }
  else startTour(0);
})();
