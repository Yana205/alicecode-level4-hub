/* AliceCode Level 4 — live slide demos (Part 2 upgrades)
   A slide with kind:"demo" renders <div class="demo-embed" data-demo="name">,
   and DEMOS[name](el) builds it. Demos replay when their slide is shown
   (the slide fires a "slide-on" event). Sounds reuse the Lab's chime + mute. */

const demoEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const demoWait = ms => new Promise(r => setTimeout(r, ms));
const demoReduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function demoOnShow(el, fn) { const s = el.closest(".slide"); if (s) s.addEventListener("slide-on", fn); }

/* the classic "wah wah wahhh" for the Oh-no moment */
function demoSadTrombone() {
  if (typeof labSoundOn === "function" && !labSoundOn()) return;
  try {
    labAudio = labAudio || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = labAudio.currentTime;
    [392, 370, 349, 330].forEach((f, i) => {
      const o = labAudio.createOscillator(), g = labAudio.createGain();
      o.type = "sawtooth"; o.frequency.value = f;
      const t = t0 + i * 0.32, d = i === 3 ? 0.9 : 0.3;
      if (i === 3) { /* wobble on the last note */
        const lfo = labAudio.createOscillator(), lg = labAudio.createGain();
        lfo.frequency.value = 6; lg.gain.value = 9;
        lfo.connect(lg).connect(o.frequency); lfo.start(t); lfo.stop(t + d);
      }
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.03);
      g.gain.setValueAtTime(0.09, t + d - 0.1);
      g.gain.linearRampToValueAtTime(0, t + d);
      o.connect(g).connect(labAudio.destination);
      o.start(t); o.stop(t + d);
    });
  } catch (e) {}
}

const DEMOS = {};

/* ============================================================
   A · Chatting vs. building — mouse vs. terminal race
   ============================================================ */
DEMOS.agentRace = function (el) {
  el.innerHTML = `
    <div class="race">
      <div class="race-side race-chat">
        <div class="race-head"><span>😩 AI chat user</span><span class="race-clock">⏱ 0 min</span></div>
        <div class="race-screen">
          <div class="rz rz-chat"><b>💬 AI chat</b><div class="rz-msg"></div></div>
          <div class="rz rz-doc"><b>📄 My doc</b><div class="rz-msg"></div></div>
          <div class="rz rz-files"><b>📁 Downloads</b><div class="rz-msg"></div></div>
          <svg class="race-cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l15 10.5-6.6 1.2 3.9 7.3-3 1.6-3.9-7.4L4 20z"/></svg>
          <div class="race-toast"></div>
        </div>
        <div class="race-cap">…</div>
      </div>
      <div class="race-side race-agent terminal">
        <div class="term-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
          <span class="title">🤖 agent builder · runs at 08:00 ⏰</span></div>
        <pre class="race-term"></pre>
      </div>
    </div>
    <div class="race-foot">
      <button class="btn small" data-act="play">▶ Play again</button>
      <span class="race-score"></span>
    </div>`;

  const $ = s => el.querySelector(s);
  const screen = $(".race-screen"), cursor = $(".race-cursor"), toast = $(".race-toast");
  const cap = $(".race-cap"), clock = $(".race-clock"), term = $(".race-term"), score = $(".race-score");
  const zone = n => $(".rz-" + n);
  let run = 0;

  const STEPS = [
    { z: "chat", cap: "Typing: “Write me a TikTok script about tech”…", msg: "You: Write me a TikTok script about tech", min: 2 },
    { z: "chat", cap: "Waiting for the answer… 🥱", msg: "AI: Sure! “Hey tech fans! Today…”", min: 4 },
    { z: "chat", cap: "Select it all… copy", toast: "Copied 📋", min: 6 },
    { z: "doc", cap: "Paste it into a doc", toast: "Pasted 📄", msg: "Hey tech fans! Today…", min: 8 },
    { z: "chat", cap: "“Now make me an image for it”", msg: "You: make an image for it", min: 11 },
    { z: "chat", cap: "Waiting again… 🥱", msg: "AI: 🖼️ here's your image", min: 14 },
    { z: "files", cap: "Right-click → Save image as…", toast: "Saved 💾", msg: "image (3).png", min: 17 },
    { z: "doc", cap: "Find the file, attach it, send it… 😮‍💨", toast: "Done…?", min: 20 }
  ];
  const TERM = [
    ["dim", "$ node studio.js"],
    ["dim", "⏰ 08:00 · the agent wakes up"],
    ["run", "[Agent 1: Running]  GET /api/trends"],
    ["ok", "[Agent 1: Task Complete] ✅ trend = \"y2k fashion\""],
    ["run", "[Agent 2: Running]  writing the script…"],
    ["ok", "[Agent 2: Task Complete] ✅ script.txt"],
    ["run", "[Agent 3: Running]  creating the image…"],
    ["ok", "[Agent 3: Task Complete] ✅ cover.png"],
    ["run", "[Email] 📧 sent to you"],
    ["done", "[Done] ⚡ 08:00:42 — your coffee is still hot ☕"]
  ];

  function moveTo(z) {
    const t = zone(z);
    cursor.style.left = (t.offsetLeft + t.offsetWidth * 0.62) + "px";
    cursor.style.top = (t.offsetTop + t.offsetHeight * 0.55) + "px";
    el.querySelectorAll(".rz").forEach(r => r.classList.toggle("on", r === t));
  }

  async function playAgent(me) {
    term.innerHTML = "";
    await demoWait(400);
    for (const [cls, line] of TERM) {
      if (me !== run) return;
      term.innerHTML += `<span class="t-${cls}">${demoEsc(line)}</span>\n`;
      term.scrollTop = term.scrollHeight;
      await demoWait(cls === "run" ? 380 : 260);
    }
    $(".race-agent").classList.add("won");
    if (typeof labChime === "function") labChime(LAB_UPGRADE_NOTES);
  }

  async function playChat(me) {
    el.querySelectorAll(".rz-msg").forEach(m => m.textContent = "");
    clock.textContent = "⏱ 0 min";
    for (const s of STEPS) {
      if (me !== run) return;
      moveTo(s.z);
      cap.textContent = s.cap;
      await demoWait(demoReduced() ? 500 : 950);
      if (me !== run) return;
      if (s.msg) zone(s.z).querySelector(".rz-msg").textContent = s.msg;
      if (s.toast) { toast.textContent = s.toast; toast.classList.remove("pop"); void toast.offsetWidth; toast.classList.add("pop"); }
      clock.textContent = `⏱ ${s.min} min`;
      await demoWait(650);
    }
  }

  async function play() {
    const me = ++run;
    score.textContent = "";
    $(".race-agent").classList.remove("won");
    cursor.style.transition = "none"; moveTo("chat"); void cursor.offsetWidth; cursor.style.transition = "";
    await Promise.all([playChat(me), playAgent(me)]);
    if (me === run) score.innerHTML = `<b class="bad">😩 20 minutes of clicking</b> vs <b class="good">⚡ 42 seconds — while you slept</b>`;
  }

  $('[data-act="play"]').addEventListener("click", play);
  demoOnShow(el, play);
};

/* ============================================================
   B · TikTok Studio teaser — 3 clicks: input → brain → output
   ============================================================ */
DEMOS.studioLoop = function (el) {
  el.innerHTML = `
    <div class="sl-grid">
      <div class="sl-col" data-s="1">
        <div class="sl-head">1️⃣ Trend finder <small>the input</small></div>
        <div class="sl-box"><div class="sl-empty">?</div>
          <pre class="sl-json"><span class="j-dim">GET /api/trends · 200 OK</span>
{
  <span class="j-key">"trend"</span>: <span class="j-str sl-hot">"y2k fashion"</span>,
  <span class="j-key">"views"</span>: <span class="j-str">"48.2M"</span>,
  <span class="j-key">"hashtag"</span>: <span class="j-str">"#y2k"</span>
}</pre></div>
      </div>
      <div class="sl-arrow">➜</div>
      <div class="sl-col" data-s="2">
        <div class="sl-head">2️⃣ Idea maker <small>the brain</small></div>
        <div class="sl-box"><div class="sl-empty">?</div>
          <div class="sl-brain"><div class="sl-robot">🤖<span class="sl-think">💭</span></div>
            <div class="sl-typing"></div></div></div>
      </div>
      <div class="sl-arrow">➜</div>
      <div class="sl-col" data-s="3">
        <div class="sl-head">3️⃣ Video maker <small>the output</small></div>
        <div class="sl-box"><div class="sl-empty">?</div>
          <div class="sl-phone"><div class="sl-art"><span class="a1">🦋</span><span class="a2">💿</span><span class="a3">👛</span><span class="a4">✨</span><b>Y2K</b></div>
            <div class="sl-side">❤️<small>48K</small>💬<small>1.2K</small>↗️</div>
            <div class="sl-cap"><b>@alicecode.studio</b><br>POV: your mom's 2003 closet is back 🦋 #y2k #fashion</div></div></div>
      </div>
    </div>
    <div class="sl-foot"><button class="btn small sl-next"></button>
      <span class="muted">Three agents + a database + a screen that shows it all.</span></div>`;

  const btn = el.querySelector(".sl-next"), typing = el.querySelector(".sl-typing");
  const LABELS = ["▶ Click 1 · The Input", "▶ Click 2 · The Brain", "▶ Click 3 · The Output", "↺ Loop again"];
  const SCRIPT = ["Writing script...", "🎬 Hook: “POV: your mom's 2003 closet is back”", "👗 3 outfits in 15 seconds", "🎵 early-2000s pop beat"];
  let step = 0, run = 0;

  function set(n) {
    step = n; run++;
    el.querySelectorAll(".sl-col").forEach(c => c.classList.toggle("on", +c.dataset.s <= n));
    el.querySelectorAll(".sl-col").forEach(c => c.classList.toggle("now", +c.dataset.s === n));
    btn.textContent = LABELS[n];
    if (n < 2) typing.innerHTML = "";
  }
  async function think(me) {
    typing.innerHTML = "";
    for (const line of SCRIPT) {
      const p = document.createElement("div"); typing.appendChild(p);
      for (let i = 1; i <= line.length; i += 2) {
        if (me !== run) return;
        p.textContent = line.slice(0, i + 1);
        await demoWait(demoReduced() ? 0 : 18);
      }
      await demoWait(220);
    }
  }
  function next() {
    const n = (step + 1) % 4;
    set(n);
    if (n === 2) think(run);
    if (n === 3) {
      if (typeof labChime === "function") labChime(LAB_UPGRADE_NOTES);
      if (typeof labSparkle === "function") labSparkle(el, el.querySelector(".sl-phone"), 18);
    }
  }
  el.addEventListener("click", e => { if (!e.target.closest("a")) next(); });
  demoOnShow(el, () => set(0));
  set(0);
};

/* ============================================================
   C · Live fetch — a real REST API on the slide (PokeAPI)
   ============================================================ */
DEMOS.liveFetch = function (el) {
  el.innerHTML = `
    <div class="lf">
      <div class="lf-left">
        <div class="lf-form">
          <input class="lf-input" type="text" value="pikachu" aria-label="Pokémon name" autocomplete="off" spellcheck="false">
          <button class="btn small lf-go">Fetch REST API ⚡</button>
        </div>
        <div class="lf-chips">try: ${["pikachu", "eevee", "charizard", "snorlax", "jigglypuff"].map(p => `<button class="lf-chip" data-p="${p}">${p}</button>`).join("")}</div>
        <pre class="lf-code"><span class="c-com">// The superpower: fetching real data</span>
<span class="c-kw">const</span> response = <span class="c-kw">await</span> <span class="c-fn">fetch</span>(<span class="c-str">'https://pokeapi.co/api/v2/pokemon/<b class="lf-name">pikachu</b>'</span>);
<span class="c-kw">const</span> data = <span class="c-kw">await</span> response.<span class="c-fn">json</span>();
<span class="lf-log">console.<span class="c-fn">log</span>(data.<b>abilities</b>);</span> <span class="c-com">// Boom. Live data from the internet.</span></pre>
        <div class="lf-postman">📮 <b>Postman</b> does exactly this — just in a fancier app.</div>
      </div>
      <div class="lf-right terminal">
        <div class="term-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
          <span class="title lf-status">response — waiting for you 👈</span></div>
        <div class="lf-out"><div class="lf-hint">👈 Type a Pokémon name, then press <b>Fetch REST API</b>.<br>The answer comes back as JSON.</div></div>
      </div>
    </div>`;

  const input = el.querySelector(".lf-input"), nameEl = el.querySelector(".lf-name");
  const status = el.querySelector(".lf-status"), out = el.querySelector(".lf-out"), log = el.querySelector(".lf-log");
  const clean = () => input.value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "pikachu";
  let run = 0;

  function jsonHTML(v, ind = "") {
    const pad = ind + "  ";
    if (Array.isArray(v)) return v.length ? `[\n${v.map(x => pad + jsonHTML(x, pad)).join(",\n")}\n${ind}]` : "[]";
    if (v && typeof v === "object") return `{\n${Object.entries(v).map(([k, x]) =>
      `${pad}<span class="j-key${k === "abilities" ? " j-hot" : ""}">"${demoEsc(k)}"</span>: ${jsonHTML(x, pad)}`).join(",\n")}\n${ind}}`;
    if (typeof v === "string") return `<span class="j-str">"${demoEsc(v)}"</span>`;
    return `<span class="j-num">${v}</span>`;
  }

  async function go() {
    const name = clean(), me = ++run;
    nameEl.textContent = name;
    log.classList.remove("lit");
    status.textContent = `GET /pokemon/${name} …`;
    out.innerHTML = `<div class="lf-hint">⏳ Asking the PokeAPI server…</div>`;
    const t0 = performance.now();
    try {
      const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
      const ms = Math.round(performance.now() - t0);
      if (me !== run) return;
      if (!r.ok) {
        status.textContent = `GET /pokemon/${name} · ${r.status} ${r.status === 404 ? "Not Found" : "Error"} · ${ms} ms`;
        out.innerHTML = `<div class="lf-hint">🤔 No Pokémon called <b>${demoEsc(name)}</b>.<br>Check the spelling — APIs are picky!</div>`;
        return;
      }
      const raw = await r.text(), d = JSON.parse(raw);
      if (me !== run) return;
      status.textContent = `GET /pokemon/${name} · 200 OK · ${ms} ms · ${Math.round(raw.length / 1024)} KB`;
      const slim = {
        name: d.name, id: d.id, height: d.height, weight: d.weight,
        types: d.types.map(t => t.type.name),
        abilities: d.abilities.map(a => ({ ability: { name: a.ability.name }, is_hidden: a.is_hidden }))
      };
      const img = d.sprites && (d.sprites.other && d.sprites.other["official-artwork"] && d.sprites.other["official-artwork"].front_default || d.sprites.front_default);
      out.innerHTML = `
        <div class="lf-card">${img ? `<img src="${img}" alt="${demoEsc(d.name)}">` : ""}
          <div><b class="lf-pname">${demoEsc(d.name)}</b> <span class="lf-id">#${d.id}</span><br>
          ${slim.types.map(t => `<span class="lf-type">${demoEsc(t)}</span>`).join("")}<br>
          <span class="lf-ab">abilities: ${slim.abilities.map(a => demoEsc(a.ability.name)).join(" · ")}</span></div></div>
        <pre class="lf-json">${jsonHTML(slim)}</pre>
        <div class="lf-more">The real answer is ${Math.round(raw.length / 1024)} KB of JSON — we show the important part.</div>`;
      log.classList.add("lit");
      if (typeof labChime === "function") labChime([880, 1175]);
    } catch (e) {
      if (me !== run) return;
      status.textContent = `GET /pokemon/${name} · no connection`;
      out.innerHTML = `<div class="lf-hint">📡 No internet right now — the API can't answer.<br>That's the deal: no network, no live data.</div>`;
    }
  }

  input.addEventListener("input", () => { nameEl.textContent = clean(); });
  input.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  el.querySelector(".lf-go").addEventListener("click", go);
  el.querySelectorAll(".lf-chip").forEach(c => c.addEventListener("click", () => { input.value = c.dataset.p; go(); }));
};

/* ============================================================
   D · To-do lab — "Variables forget" vs "MongoDB remembers"
   ============================================================ */

/* task store: real MongoDB through /api/tasks when the server has
   MONGODB_URI, otherwise this browser's storage (labelled honestly) */
const TASK_STORE = {
  mode: null,
  local: [],
  async init() {
    if (this.mode) return this.mode;
    try {
      const r = await fetch("api/tasks", { cache: "no-store" });
      const j = r.ok && (r.headers.get("content-type") || "").includes("json") ? await r.json() : null;
      if (j && j.ok) return (this.mode = "live");
    } catch (e) {}
    try { this.local = JSON.parse(localStorage.getItem("ac4-demo-tasks") || "[]"); } catch (e) { this.local = []; }
    return (this.mode = "local");
  },
  save() { try { localStorage.setItem("ac4-demo-tasks", JSON.stringify(this.local)); } catch (e) {} },
  async list() {
    if (this.mode === "live") { const r = await fetch("api/tasks", { cache: "no-store" }); return (await r.json()).docs || []; }
    return this.local.slice();
  },
  async add(text) {
    if (this.mode === "live") {
      const r = await fetch("api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      const j = await r.json(); if (!j.ok) throw new Error(j.error); return j.doc;
    }
    const hex = n => Array.from({ length: n }, () => "0123456789abcdef"[Math.random() * 16 | 0]).join("");
    const doc = { _id: (Date.now() / 1000 | 0).toString(16) + hex(16), text, done: false, createdAt: new Date().toISOString() };
    this.local.push(doc); this.save(); return doc;
  },
  async remove(id) {
    if (this.mode === "live") { await fetch(`api/tasks?id=${encodeURIComponent(id)}`, { method: "DELETE" }); return; }
    this.local = id === "all" ? [] : this.local.filter(d => d._id !== id); this.save();
  }
};

function todoShell(el, side, refreshLabel) {
  el.innerHTML = `
    <div class="td">
      <div class="td-app">
        <div class="td-bar">📝 My To-Do <span class="td-mode"></span></div>
        <div class="td-form">
          <input class="td-input" type="text" maxlength="60" placeholder="Finish homework" aria-label="New task" autocomplete="off">
          <button class="btn small td-add">+ Add task</button>
        </div>
        <ul class="td-list"></ul>
        <button class="td-refresh">${refreshLabel}</button>
        <div class="td-overlay"></div>
      </div>
      ${side}
    </div>`;
  return {
    input: el.querySelector(".td-input"), list: el.querySelector(".td-list"),
    app: el.querySelector(".td-app"), overlay: el.querySelector(".td-overlay"),
    refresh: el.querySelector(".td-refresh"), mode: el.querySelector(".td-mode")
  };
}
const TODO_HINTS = ["Finish homework", "Feed cat", "Practice the dance", "Text grandma 💜"];

DEMOS.todoForget = function (el) {
  const ui = todoShell(el, `
    <div class="td-side terminal">
      <div class="term-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
        <span class="title">🧠 memory (RAM) — a plain variable</span></div>
      <pre class="td-ram"></pre>
    </div>`, "🔄 Refresh page");
  ui.refresh.classList.add("danger");
  const ram = el.querySelector(".td-ram");
  let tasks = [];

  function draw() {
    ui.list.innerHTML = tasks.length ? tasks.map(t => `<li>${demoEsc(t)}</li>`).join("") : `<li class="td-empty">No tasks yet — add one!</li>`;
    ram.innerHTML = `<span class="c-kw">let</span> tasks = [${tasks.length ? "\n" + tasks.map(t => `  <span class="j-str">"${demoEsc(t)}"</span>`).join(",\n") + "\n" : ""}];`;
    ui.input.placeholder = TODO_HINTS[tasks.length % TODO_HINTS.length];
  }
  function add() {
    const t = ui.input.value.trim() || ui.input.placeholder;
    tasks.push(t.slice(0, 60)); ui.input.value = ""; draw();
  }
  async function refresh() {
    ui.app.classList.add("reloading"); ui.overlay.innerHTML = `<div class="td-spin"></div>`;
    await demoWait(700);
    const had = tasks.length;
    tasks = []; draw();
    ui.app.classList.remove("reloading");
    if (!had) { ui.overlay.innerHTML = ""; return; }
    ram.innerHTML += `  <span class="c-com">// memory wiped 💨</span>`;
    ui.overlay.innerHTML = `<div class="td-ohno">😱 Oh no!<small>Everything is gone.</small></div>`;
    ui.app.classList.remove("shake"); void ui.app.offsetWidth; ui.app.classList.add("shake");
    demoSadTrombone();
    setTimeout(() => { ui.overlay.innerHTML = ""; }, 2200);
  }
  el.querySelector(".td-add").addEventListener("click", add);
  ui.input.addEventListener("keydown", e => { if (e.key === "Enter") add(); });
  ui.refresh.addEventListener("click", refresh);
  draw();
};

DEMOS.todoMongo = function (el) {
  const ui = todoShell(el, `
    <div class="td-side atlas">
      <div class="at-top">🍃 <b>MongoDB Atlas</b> <span>alicecode › <b>tasks</b></span></div>
      <div class="at-tabs"><span class="on">Documents</span><span>Aggregations</span><span>Indexes</span></div>
      <div class="at-count"></div>
      <div class="at-docs"></div>
    </div>`, "🔄 Refresh page");
  ui.refresh.classList.add("calm");
  const docsEl = el.querySelector(".at-docs"), count = el.querySelector(".at-count");
  let docs = [];

  function docHTML(d, fresh) {
    const id = String(d._id);
    return `<div class="at-doc${fresh ? " fresh" : ""}">
      <div><span class="at-k">_id</span>: <span class="at-oid">ObjectId('${demoEsc(id)}')</span></div>
      <div><span class="at-k">text</span>: <span class="j-str">"${demoEsc(d.text)}"</span></div>
      <div><span class="at-k">done</span>: <span class="j-num">${d.done ? "true" : "false"}</span></div>
      <div><span class="at-k">createdAt</span>: <span class="at-date">${demoEsc(String(d.createdAt).replace(/\.\d+Z$/, "Z"))}</span></div>
    </div>`;
  }
  function draw(freshId) {
    ui.list.innerHTML = docs.length ? docs.map(d => `<li>${demoEsc(d.text)}<button class="td-x" data-id="${demoEsc(String(d._id))}" aria-label="Delete">✕</button></li>`).join("")
      : `<li class="td-empty">No tasks yet — add one!</li>`;
    docsEl.innerHTML = docs.map(d => docHTML(d, String(d._id) === freshId)).join("") || `<div class="at-none">No documents yet.</div>`;
    count.innerHTML = `QUERY RESULTS: <b>${docs.length ? `1-${docs.length} OF ${docs.length}` : "0"}</b> <button class="at-clear" title="Delete all documents">🧹 clear</button>`;
    if (freshId) docsEl.scrollTop = docsEl.scrollHeight;
    ui.input.placeholder = TODO_HINTS[docs.length % TODO_HINTS.length];
  }
  async function load() { docs = await TASK_STORE.list(); }
  async function add() {
    const t = (ui.input.value.trim() || ui.input.placeholder).slice(0, 60);
    ui.input.value = "";
    try { const d = await TASK_STORE.add(t); docs.push(d); draw(String(d._id)); }
    catch (e) { ui.overlay.innerHTML = `<div class="td-ohno small">⚠️ ${demoEsc(e.message || "Could not save")}</div>`; setTimeout(() => ui.overlay.innerHTML = "", 2200); }
  }
  async function refresh() {
    ui.app.classList.add("reloading"); docs = []; draw();
    ui.overlay.innerHTML = `<div class="td-spin"></div><div class="td-loading">Loading from MongoDB…</div>`;
    await demoWait(800);
    await load();
    ui.app.classList.remove("reloading");
    ui.overlay.innerHTML = docs.length ? `<div class="td-yay">🎉 Still here!<small>The database remembered.</small></div>` : "";
    draw();
    if (docs.length) {
      if (typeof labChime === "function") labChime(LAB_WIN_NOTES);
      if (typeof labSparkle === "function") labSparkle(el, ui.list, 16);
    }
    setTimeout(() => { ui.overlay.innerHTML = ""; }, 1800);
  }
  el.addEventListener("click", async e => {
    const x = e.target.closest(".td-x"), clear = e.target.closest(".at-clear");
    if (x) { await TASK_STORE.remove(x.dataset.id); docs = docs.filter(d => String(d._id) !== x.dataset.id); draw(); }
    if (clear) { await TASK_STORE.remove("all"); docs = []; draw(); }
  });
  el.querySelector(".td-add").addEventListener("click", add);
  ui.input.addEventListener("keydown", e => { if (e.key === "Enter") add(); });
  ui.refresh.addEventListener("click", refresh);

  TASK_STORE.init().then(async mode => {
    ui.mode.textContent = mode === "live" ? "🟢 live · MongoDB Atlas" : "🟡 demo · saved in this browser";
    ui.mode.title = mode === "live" ? "Connected to the real database" : "No database connected yet — tasks are saved in this browser";
    try { await load(); } catch (e) {}
    draw();
  });
};
