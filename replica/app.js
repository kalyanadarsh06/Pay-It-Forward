(() => {
  const D = window.PIF_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const money = n => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* pixel fields: random squares that flicker on and off */
  function pixelField(el, n, cls) {
    if (!el) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const s = document.createElement("i");
      s.style.left = (Math.random() * 100) + "%"; s.style.top = (Math.random() * 100) + "%";
      s.style.setProperty("--tw", (3 + Math.random() * 5).toFixed(2) + "s"); s.style.setProperty("--td", (-Math.random() * 8).toFixed(2) + "s");
      const r = Math.random(); if (r < .18) s.classList.add("r"); if (r > .78) s.classList.add(cls);
      frag.appendChild(s);
    }
    el.appendChild(frag);
  }
  pixelField($("#hero-pixels"), 110, "w");
  pixelField($("#panel-pixels"), 36, "w");
  pixelField($("#verify-pixels"), 30, "g");
  pixelField($("#lb-pixels"), 34, "w");

  /* scroll reveal + counters */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); e.target.querySelectorAll("[data-count]").forEach(countUp); e.target.querySelectorAll(".bar i[data-w]").forEach(b => b.style.width = b.dataset.w + "%"); io.unobserve(e.target); } }), { threshold: .18 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  document.querySelectorAll(".stagger").forEach(st => Array.from(st.children).forEach((c, i) => c.style.transitionDelay = (i * 70) + "ms"));
  function countUp(el) {
    const to = parseFloat(el.dataset.count), fmt = el.dataset.money ? money : n => Math.round(n).toLocaleString("en-US");
    if (reduced) { el.textContent = fmt(to); return; }
    let t0 = null; const d = 1300;
    const tick = now => { if (t0 === null) t0 = now; const p = Math.min(1, (now - t0) / d); el.textContent = fmt(to * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(to); };
    requestAnimationFrame(tick);
  }

  /* pixel blob + plane drawn from bitmaps */
  function bitmap(svg, rows, fill, dot) {
    let out = "";
    rows.forEach((row, y) => [...row].forEach((c, x) => {
      if (c === "#") out += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
      if (c === "o") out += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/><rect x="${x + .3}" y="${y + .3}" width=".4" height=".4" fill="${dot}"/>`;
    }));
    svg.innerHTML = out;
  }
  bitmap($("#blob"), [
    "..........####........................##....",
    "........##oooo##..................####oo##..",
    "......##oooooooo##..............##oooooo##..",
    "....##oooooooooooo####........##oooooooo##..",
    "....##oooooooooooooooo##....##oooooooooooo##",
    "..##oooooooooooooooooooo####oooooooooooooo##",
    "..##oooooooooooooooooooooooooooooooooooo##..",
    "....##oooooooooooooooooooooooooooooooo##....",
    "......##oooooooooooooooooooooooooooo##......",
    "........##oooooooooooooooooooooooo##........",
    "..........##oooooooooooooooooooo##..........",
    "............##oooooooooooooooo##............",
    "..............##oooooooooooo##..............",
    "................##oooooooo##................",
    "..................##oooo##..................",
    "....................####...................."
  ], "#2f9bff", "#a0fd00");
  bitmap($("#plane"), [
    "..............................",
    "......##......................",
    "......#oo#....................",
    ".......#ooo#..................",
    "........#oooo#................",
    ".........#oooo#...............",
    "..........#ooooo#.............",
    "...........#oooooo#...........",
    "............#oooooooo#........",
    ".............#oooooooooo#.....",
    "..........####ooooooooooooo#..",
    "........#oooooooooooooooooooo#",
    "......#ooooooooooooooooooooo#.",
    ".....#oooooooooooooooooooooo#.",
    "......#oooooooooooooooooooo#..",
    ".......####ooooooooooooo#.....",
    "...........#oooooooooo#.......",
    "............#ooooooooo#.......",
    ".............#oooooooo#.......",
    "..............#ooooooo#.......",
    "...............#oooooo#.......",
    "................#ooooo#.......",
    ".................#oooo#.......",
    "..................#ooo#.......",
    "...................#oo#.......",
    "....................##........"
  ], "#2f9bff", "#ffffff");

  /* charities */
  const C = D.campaigns; const names = C.filter(c => c.status !== "pool").map(c => c.name);
  const pctOf = (a, b) => b ? Math.min(100, a / b * 100) : 100;
  $("#charities-note").textContent = `Every campaign below was nominated by a holder. PIF's share arrives every sweep, on camera.${D.sample ? " Sample data." : ""}`;
  $("#charities-stats").innerHTML = [
    { b: C.filter(c => c.status !== "pool").length, s: "campaigns funded" }, { b: money(D.totals.donated), s: "routed by PIF so far", m: 1 }, { b: C.filter(c => c.status === "funded").length, s: "fully funded" }, { b: D.totals.holders, s: "holders nominating" }
  ].map(x => `<div><b ${x.m ? "" : `data-count="${x.b}"`}>${x.m ? x.b : 0}</b><span>${x.s}</span></div>`).join("");
  $("#cgrid").innerHTML = C.map((c, i) => c.status === "pool" ? `
    <a class="cg" href="${c.url}">
      <div class="cg__art c-olive"><span class="cat tag tag--queued">${c.category}</span></div>
      <div class="cg__body"><div class="cg__name">${c.name}</div><p class="mid" style="font-size:.95rem">${c.city}. Wallets that haven't nominated feed the pool.</p>
      <div class="cg__pif"><i class="sw"></i><span>routed by PIF</span><b>${money(c.routed)}</b></div>
      <div class="cg__foot"><small>${c.nominators} wallets · no nomination</small></div></div>
    </a>` : `
    <a class="cg ${i === 0 ? "cg--wide" : ""}" href="${c.url}" target="_blank" rel="noopener">
      <div class="cg__art c-${c.art}"><span class="cat tag ${c.status === "funded" ? "tag--paid" : "tag--queued"}">${c.status === "funded" ? "Fully funded" : c.category}</span><span class="city">${c.city}</span></div>
      <div class="cg__body">
        <div class="cg__name">${c.name}</div>
        <div class="cg__row"><b data-count="${c.raised}" data-money="1">$0.00</b><span class="mid">of ${money(c.goal)}</span></div>
        <div class="bar"><i data-w="${pctOf(c.raised, c.goal).toFixed(0)}"></i></div>
        <div class="cg__pif"><i class="sw"></i><span>routed by PIF holders</span><b>${money(c.routed)}</b></div>
        <div class="cg__foot"><span class="btn btn--black">Open on GoFundMe</span><small>nominated by ${c.nominators} holder${c.nominators === 1 ? "" : "s"}</small></div>
      </div>
    </a>`).join("");

  /* leaderboard */
  const L = [...D.leaderboard].sort((a, b) => b.routed - a.routed).map((r, i) => ({ ...r, rank: i + 1 })); const maxR = Math.max(...L.map(r => r.routed));
  const tier = h => h >= .2 ? ["whale", "Whale"] : h >= .1 ? ["shark", "Shark"] : h >= .05 ? ["dolphin", "Dolphin"] : ["minnow", "Minnow"];
  const hue = s => { let x = 0; for (const ch of s) x = (x * 31 + ch.charCodeAt(0)) % 360; return x; };
  const av = (r, cls) => `<span class="${cls}" style="background:hsl(${hue(r.holder)} 80% 72%)">${r.holder.replace(/^0x/, "").slice(0, 2).toUpperCase()}</span>`;
  $("#lb-season").innerHTML = `<span class="live">live</span><span>season · sweeps #0001–#${D.latest.sweep}</span><span>score = $ routed to charity</span><span>updates every minute</span>`;
  const order = [L[1], L[0], L[2]];
  $("#podium").innerHTML = order.map(r => `
    <div class="pd pd--${r.rank}">
      <div class="pd__avatar" style="background:hsl(${hue(r.holder)} 80% 72%)">${r.rank === 1 ? '<svg class="pd__crown" viewBox="0 0 44 30"><path d="M2 28L6 6l10 10L22 2l6 14L38 6l4 22z" fill="#a0fd00"/></svg>' : ""}${r.holder.replace(/^0x/, "").slice(0, 2).toUpperCase()}</div>
      <span class="tier tier--${tier(r.hold)[0]}">${tier(r.hold)[1]} · ${(r.hold * 100).toFixed(1)}%</span>
      <div class="pd__name">${r.holder}</div>
      <div class="pd__score" data-count="${r.routed}" data-money="1">$0.00</div>
      <div class="pd__meta"><span>→ ${r.campaign}</span></div>
      <div class="pd__block">${r.rank}</div>
    </div>`).join("");
  $("#ranks").innerHTML = L.slice(3).map(r => `
    <div class="rk">
      <span class="rk__n">${r.rank}</span>
      ${av(r, "rk__av")}
      <div class="rk__who"><b>${r.holder}</b><small>→ ${r.campaign}</small></div>
      <div class="rk__xp"><div class="bar"><i data-w="${(r.routed / maxR * 100).toFixed(0)}"></i></div><small>${tier(r.hold)[1]} · holds ${(r.hold * 100).toFixed(2)}%</small></div>
      <span class="rk__score" data-count="${r.routed}" data-money="1">$0.00</span>
      <span class="rk__streak">${r.heldFor} streak</span>
    </div>`).join("");
  $("#lb-foot").innerHTML = `<span>Showing ${L.length} of ${D.totals.holders} wallets ≥ 0.5% · ranked by dollars routed to charity, net of the reserve.</span><span>Tiers: Whale ≥ 20% · Shark ≥ 10% · Dolphin ≥ 5% · Minnow. <a href="../prototype/index.html?ledger#leaderboard">Full table</a></span>`;

  /* tabs */
  const TABS = {
    hold: { title: "Sweeps<br>Fees become donations every 15 minutes", lede: "Hold at least 0.5% of supply and you’re counted in every sweep. Your share of the creator fees, weighted by how much you held and for how long, goes to the campaign you nominated. Nothing to claim, nothing to sign.", chips: ["Turn trading fees into donations", "Be counted every 15 minutes", "Keep your share routed while you hold"], btn: ["See the live ledger", "../prototype/index.html?ledger"] },
    nominate: { title: "Nominate<br>Point your share at a real campaign", lede: "Pick any GoFundMe campaign when you buy in. The agent verifies the URL at every sweep and pays it directly. Change it any time from the ledger; wallets with no nomination feed the pool.", chips: ["Fund a campaign you know", "Switch campaigns from the ledger", "Let the pool split your share"], btn: ["Nominate a campaign", "../prototype/index.html?ledger"] },
    verify: { title: "Verify<br>Check any donation in three steps", lede: "Open the fee transaction on the explorer. Open the campaign page and find the donation under the holder’s name. Watch the recording and match the amount. No account needed.", chips: ["Match the fee tx to the sweep", "Find the donation on GoFundMe", "Watch the unedited recording"], btn: ["Open the proofs", "../prototype/index.html?ledger#proofs"] }
  };
  let tabKey = null;
  function setTab(k) {
    if (k === tabKey) return; tabKey = k;
    const t = TABS[k], pc = $("#panel-content");
    document.querySelectorAll(".tab").forEach(el => el.setAttribute("aria-selected", el.dataset.tab === k ? "true" : "false"));
    const apply = () => {
      $("#panel-title").innerHTML = t.title; $("#panel-lede").textContent = t.lede;
      $("#panel-chips").innerHTML = t.chips.map(c => `<span class="chip chip--grey">${c}</span>`).join("");
      const b = $("#panel-btn"); b.textContent = t.btn[0]; b.href = t.btn[1];
    };
    if (reduced || !pc.innerHTML.trim()) { apply(); return; }
    pc.classList.add("is-swapping"); setTimeout(() => { apply(); pc.classList.remove("is-swapping"); }, 360);
  }
  setTab("hold");
  document.querySelectorAll(".tab").forEach(el => el.addEventListener("click", () => setTab(el.dataset.tab)));

  /* proofs carousel */
  const cats = ["Medical bills", "Housing", "Classrooms", "Animals", "Memorials", "Mobility", "Pool"];
  $("#proof-chips").innerHTML = cats.map(c => `<span class="chip chip--cyan">${c}</span>`).join("");
  $("#proof-note").textContent = `Choose from ${D.totals.campaigns} campaigns funded so far, every one with a recording and a receipt.`;
  const arts = ["art-1", "art-2", "art-3", "art-4", "art-5", "art-6"];
  $("#carousel").innerHTML = D.proofs.map((p, i) => `
    <a class="card" href="../prototype/index.html?ledger#proof-${p.id}">
      <div class="card__art ${arts[i % arts.length]}">
        <span class="badge">${D.sample ? "sample" : "rec"} · ${p.length}</span>
        <div class="log">▸ #${p.id} · ${p.holder}<br>paid ${money(p.amount)} · ${p.confirmation}</div>
      </div>
      <div class="card__body">
        <div class="card__title"><span>${p.campaign}</span><span class="tag tag--${p.status}">${p.status}</span></div>
        <p>Donation #${p.id} from sweep #${p.id.split("-")[0]}, routed by ${p.holder}. Fee tx ${p.feeTx}. GoFundMe confirmation ${p.confirmation}.</p>
      </div>
    </a>`).join("");
  const car = $("#carousel"); let drag = null;
  car.addEventListener("pointerdown", e => { drag = { x: e.clientX, s: car.scrollLeft }; car.setPointerCapture(e.pointerId); });
  car.addEventListener("pointermove", e => { if (drag) car.scrollLeft = drag.s - (e.clientX - drag.x); });
  car.addEventListener("pointerup", () => drag = null);

  /* voices */
  const roles = ["holder since Oct 9", "holder since Oct 11", "anon holder"];
  $("#quotes").innerHTML = D.leaderboard.slice(0, 3).map((r, i) => `
    <div class="quote">
      <div class="quote__logo"><i aria-hidden="true"></i>${r.campaign}</div>
      <p>${r.thesis}”</p>
      <div class="who"><b>${r.holder}</b><span><i>${(r.hold * 100).toFixed(1)}% held</i><i>${roles[i]}</i></span></div>
    </div>`).join("");

  /* footer + cta */
  $("#f-campaigns").innerHTML = C.filter(c => c.status !== "pool").map(c => `<li><a href="${c.url}">${c.name}</a></li>`).join("");
  $("#f-proofs").innerHTML = D.proofs.slice(0, 7).map(p => `<li><a href="../prototype/index.html?ledger#proof-${p.id}">#${p.id}</a></li>`).join("");
  $("#f-x").href = D.token.x.url;
  $("#cta-buy").href = D.token.launchpad.url;
  $("#legal").innerHTML = `Pay It Forward, 2026. ${D.sample ? "Every figure on this page is sample data. " : ""}<a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.`;
})();
