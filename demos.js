/* AliceCode Level 4 — live slide demos (Part 2 upgrades)
   A slide with kind:"demo" renders <div class="demo-embed" data-demo="name">,
   and DEMOS[name](el) builds it. Demos replay when their slide is shown
   (the slide fires a "slide-on" event). */

const demoEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const demoWait = ms => new Promise(r => setTimeout(r, ms));
const demoReduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
/* pretty, colored JSON (hotKey gets a glow, to link it to the code) */
function demoJSON(v, hotKey, ind = "") {
  const pad = ind + "  ";
  if (Array.isArray(v)) return v.length ? `[\n${v.map(x => pad + demoJSON(x, hotKey, pad)).join(",\n")}\n${ind}]` : "[]";
  if (v && typeof v === "object") return `{\n${Object.entries(v).map(([k, x]) =>
    `${pad}<span class="j-key${k === hotKey ? " j-hot" : ""}">"${demoEsc(k)}"</span>: ${demoJSON(x, hotKey, pad)}`).join(",\n")}\n${ind}}`;
  if (typeof v === "string") return `<span class="j-str">"${demoEsc(v)}"</span>`;
  return `<span class="j-num">${v}</span>`;
}
/* a demo lives on a slide or in a lab panel below the deck; both fire "slide-on" when shown */
function demoOnShow(el, fn) { const s = el.closest(".slide, .lab-panel"); if (s) s.addEventListener("slide-on", fn); }

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
        <div class="lf-postman">📮 Next: <b>Postman</b> — the pro tool that does this without code.</div>
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
        <pre class="lf-json">${demoJSON(slim, "abilities")}</pre>
        <div class="lf-more">The real answer is ${Math.round(raw.length / 1024)} KB of JSON — we show the important part.</div>`;
      log.classList.add("lit");
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
   D · Variables vs. Database — React + Tailwind components
   (db-demo.jsx) shown in a frame so Tailwind stays out of the deck.
   The frame loads the first time its slide is shown.
   ============================================================ */
function demoFrame(el, part) {
  const src = `db-demo.html?part=${part}&embed=1`;
  el.innerHTML = `<iframe class="demo-frame" title="Live demo" loading="lazy"></iframe>`;
  const frame = el.querySelector("iframe");
  demoOnShow(el, () => { if (!frame.getAttribute("src")) frame.src = src; });
}
DEMOS.dbBefore = el => demoFrame(el, "before");
DEMOS.dbAfter = el => demoFrame(el, "after");

/* ============================================================
   C+ · Tools of the trade — Postman next to fetch, and JSON auto-format
   ============================================================ */
DEMOS.toolsOfTrade = function (el) {
  const RECIPE = {
    recipe: "Pink pancakes", emoji: "🥞", minutes: 15, serves: 2, vegan: false,
    ingredients: ["1 cup flour", "1 egg", "1 cup milk", "2 tbsp beet juice 💗"],
    steps: ["Mix everything", "Cook 2 min each side", "Add sprinkles ✨"]
  };
  el.innerHTML = `
    <div class="tt">
      <div class="tt-pm">
        <div class="pm-top"><b>📮 Postman</b><span class="pm-tab">GET · pikachu</span></div>
        <div class="pm-req">
          <span class="pm-method">GET</span>
          <input class="pm-url" value="https://pokeapi.co/api/v2/pokemon/pikachu" spellcheck="false" aria-label="Request URL">
          <button class="pm-send">Send</button>
        </div>
        <div class="pm-res">
          <div class="pm-status">Body · press <b>Send</b> to call the API</div>
          <pre class="pm-body"></pre>
        </div>
        <div class="pm-same">↕ the same request, in code</div>
        <pre class="pm-code"><span class="c-kw">const</span> res = <span class="c-kw">await</span> <span class="c-fn">fetch</span>(<span class="c-str">'<span class="pm-u"></span>'</span>);
<span class="c-kw">const</span> data = <span class="c-kw">await</span> res.<span class="c-fn">json</span>();</pre>
      </div>
      <div class="tt-json">
        <div class="tj-head"><b>JSON</b> = <b>J</b>ava<b>S</b>cript <b>O</b>bject <b>N</b>otation — the universal box APIs pack data in.</div>
        <div class="tj-stage">
          <pre class="tj-raw">${demoEsc(JSON.stringify(RECIPE))}</pre>
          <pre class="tj-pretty">${demoJSON(RECIPE)}</pre>
          <div class="tj-card">
            <div class="tj-emoji">${RECIPE.emoji}</div>
            <h4>${RECIPE.recipe}</h4>
            <div class="tj-chips"><span>⏱ ${RECIPE.minutes} min</span><span>🍽 serves ${RECIPE.serves}</span></div>
            <b>Ingredients</b><ul>${RECIPE.ingredients.map(i => `<li>${demoEsc(i)}</li>`).join("")}</ul>
            <b>Steps</b><ol>${RECIPE.steps.map(s => `<li>${demoEsc(s)}</li>`).join("")}</ol>
          </div>
        </div>
        <button class="btn small tj-btn">✨ Auto-format</button>
      </div>
    </div>`;

  const url = el.querySelector(".pm-url"), u = el.querySelector(".pm-u");
  const status = el.querySelector(".pm-status"), body = el.querySelector(".pm-body");
  const stage = el.querySelector(".tj-stage"), fmt = el.querySelector(".tj-btn");
  let run = 0;

  const syncUrl = () => { u.textContent = url.value.trim(); };
  async function send() {
    const me = ++run, t0 = performance.now();
    status.innerHTML = "⏳ Sending…"; body.innerHTML = "";
    try {
      const r = await fetch(url.value.trim());
      const raw = await r.text(), ms = Math.round(performance.now() - t0);
      if (me !== run) return;
      status.innerHTML = `Status: <b class="${r.ok ? "ok" : "bad"}">${r.status} ${r.ok ? "OK" : "Error"}</b> · Time: <b>${ms} ms</b> · Size: <b>${Math.max(1, Math.round(raw.length / 1024))} KB</b>`;
      let data; try { data = JSON.parse(raw); } catch (e) { body.textContent = raw.slice(0, 2000); return; }
      /* Postman shows it all; we keep the first part so the slide stays fast */
      const keep = Array.isArray(data) ? data.slice(0, 5) : Object.fromEntries(Object.entries(data).filter(([, v]) => !Array.isArray(v) || v.length < 6).slice(0, 10));
      body.innerHTML = demoJSON(keep);
    } catch (e) {
      if (me !== run) return;
      status.innerHTML = `<b class="bad">Could not get any response</b> · check the URL and your internet`;
    }
  }
  url.addEventListener("input", syncUrl);
  url.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
  el.querySelector(".pm-send").addEventListener("click", send);
  fmt.addEventListener("click", () => {
    const on = stage.classList.toggle("formatted");
    fmt.textContent = on ? "↺ Show raw" : "✨ Auto-format";
    if (on) {
      if (typeof labSparkle === "function") labSparkle(el, el.querySelector(".tj-card"), 12);
    }
  });
  demoOnShow(el, () => { stage.classList.remove("formatted"); fmt.textContent = "✨ Auto-format"; });
  syncUrl();
};

/* ============================================================
   🗄️ Databases, one idea per slide: dbArch (app → server → database) · dbInside (inside MongoDB) · dbShapes (4 types)
   ============================================================ */
/* click a [data-k] box → it lights up and the info line explains it */
function dbPicker(el, INFO, first) {
  const info = el.querySelector(".dm-info");
  const pick = k => { el.querySelectorAll("[data-k]").forEach(x => x.classList.toggle("on", x.dataset.k === k)); info.innerHTML = INFO[k]; };
  el.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); pick(b.dataset.k); }));
  pick(first);
  return pick;
}

DEMOS.dbArch = function (el) {
  const INFO = {
    app: "📱 <b>The app</b> = what you see. It never opens the database itself. It asks the server.",
    server: "⚙️ <b>The server</b> = the middle. It keeps the secret key and talks to the database.",
    db: "🗄️ <b>The database</b> = long-term memory in the cloud. Restart everything — the data is still there."
  };
  const node = (k, ic, h, sub) => `<button class="dm-node" data-k="${k}"><span class="dm-ic">${ic}</span><b>${h}</b><small>${sub}</small></button>`;
  el.innerHTML = `
    <div class="dm dm-one">
      <div class="dm-arch">
        ${node("app", "📱", "App", "phone · website")}
        <div class="dm-wire"><span>asks</span><i></i></div>
        ${node("server", "⚙️", "Server", "backend")}
        <div class="dm-wire"><span>asks</span><i></i></div>
        ${node("db", "🗄️", "Database", "MongoDB · cloud")}
      </div>
      <div class="dm-info"></div>
    </div>`;
  const arch = el.querySelector(".dm-arch"), pick = dbPicker(el, INFO, "app");
  demoOnShow(el, () => { pick("app"); arch.classList.remove("go"); void arch.offsetWidth; arch.classList.add("go"); }); // one trip of the request dot
};

DEMOS.dbInside = function (el) {
  const INFO = {
    cluster: "☁️ <b>Cluster</b> = the computers in the cloud that run MongoDB.",
    database: "🗂️ <b>Database</b> = one drawer for one project. Ours is <code>alicecode</code>.",
    collection: "📁 <b>Collection</b> = a folder of documents of one kind. Here: <code>videos</code>.",
    document: "📄 <b>Document</b> = ONE thing — one video. It looks like JSON."
  };
  el.innerHTML = `
    <div class="dm dm-one">
      <div class="dm-zoom">
        <button class="dm-box" data-k="cluster">☁️ cluster0
          <span class="dm-box" data-k="database">🗂️ alicecode
            <span class="dm-box" data-k="collection">📁 videos
              <span class="dm-box dm-doc" data-k="document">{ "title": "cat dance", "likes": 5021 }</span>
            </span>
          </span>
        </button>
      </div>
      <div class="dm-info"></div>
    </div>`;
  const pick = dbPicker(el, INFO, "cluster");
  demoOnShow(el, () => pick("cluster"));
};

DEMOS.dbShapes = function (el) {
  const TYPES = [
    { k: "sql", ic: "📊", h: "Relational", tag: "SQL", good: "data with a strict shape — e.g. MySQL",
      show: `<table class="dm-table"><tr><th>id</th><th>title</th><th>likes</th></tr><tr><td>1</td><td>cat dance</td><td>5021</td></tr><tr><td>2</td><td>pasta hack</td><td>812</td></tr></table>`,
      say: "Tables with rows + columns, like Excel." },
    { k: "doc", ic: "📄", h: "Document", tag: "NoSQL", good: "apps that change fast — e.g. MongoDB", ours: true,
      show: `<pre class="dm-json">{ <span class="j-key">"title"</span>: <span class="j-str">"cat dance"</span>, <span class="j-key">"likes"</span>: <span class="j-num">5021</span> }</pre>`,
      say: "JSON-like documents." },
    { k: "kv", ic: "🔑", h: "Key-value", tag: "NoSQL", good: "super-fast lookups — e.g. Redis",
      show: `<div class="dm-kv"><span>"video:1:likes"</span><i>→</i><b>5021</b></div>`,
      say: "A name → a value. Like a locker number." },
    { k: "graph", ic: "🕸️", h: "Graph", tag: "NoSQL", good: "who follows who — e.g. Neo4j",
      show: `<svg class="dm-graph" viewBox="0 0 300 92" role="img" aria-label="Maya follows Noa, both liked cat dance">
          <line x1="48" y1="24" x2="150" y2="24"/><line x1="48" y1="24" x2="252" y2="70"/><line x1="150" y1="24" x2="252" y2="70"/>
          <text x="99" y="16">follows</text><text x="128" y="62">liked</text><text x="214" y="38">liked</text>
          <circle cx="48" cy="24" r="17"/><text class="n" x="48" y="28">Maya</text>
          <circle cx="150" cy="24" r="17"/><text class="n" x="150" y="28">Noa</text>
          <circle class="v" cx="252" cy="70" r="19"/><text class="n" x="252" y="74">🐱 video</text>
        </svg>`,
      say: "Dots + lines. The lines ARE the data." }
  ];
  el.innerHTML = `
    <div class="dm dm-one">
      <div class="dm-tabs">${TYPES.map(t => `<button class="dm-tab" data-t="${t.k}"><span>${t.ic} ${t.h}</span><i>${t.tag}</i></button>`).join("")}</div>
      <div class="dm-show"></div>
      <a class="dm-bonus" href="https://www.freecodecamp.org/news/sql-vs-nosql-tutorial/" target="_blank" rel="noopener">⭐ Bonus · <b>freeCodeCamp</b>: SQL vs NoSQL ↗</a>
    </div>`;
  const show = el.querySelector(".dm-show");
  function type(k) {
    const t = TYPES.find(x => x.k === k);
    el.querySelectorAll(".dm-tab").forEach(b => b.classList.toggle("on", b.dataset.t === k));
    show.innerHTML = `${t.ours ? `<span class="dm-ours">⭐ we use this one</span>` : ""}${t.show}
      <p class="dm-say">${t.say}</p><p class="dm-good">✅ Good for: <b>${t.good}</b></p>`;
    if (t.ours && typeof labSparkle === "function") labSparkle(el, show.querySelector(".dm-ours"), 10);
  }
  el.querySelectorAll(".dm-tab").forEach(b => b.addEventListener("click", () => type(b.dataset.t)));
  demoOnShow(el, () => type("doc"));
  type("doc");
};

/* ============================================================
   D+ · Watch: connect the wires — teacher demo, 3 steps + an animated "expected result"
   ============================================================ */
DEMOS.dbExercise = function (el) {
  const REPO = "Yana205/alicecode-level4-hub";
  const code = (lines, label) => `<div class="ex-code"><button class="ex-copy" title="Copy">📋 copy</button>${label ? `<span class="ex-file">${label}</span>` : ""}<pre>${lines}</pre></div>`;
  const STEPS = [
    { h: "📥 1 · Clone", body: `
        <p>Get the starter app — a <b>TikTok Idea Tracker</b>:</p>
        ${code(`npx degit ${REPO}/starter/idea-tracker idea-tracker
cd idea-tracker
npm install`)}
        <p class="ex-small">No Node.js? <a href="https://codespaces.new/${REPO}" target="_blank" rel="noopener">Open in GitHub Codespaces ↗</a> → <code>cd starter/idea-tracker</code></p>` },
    { h: "🔌 2 · Add code", body: `
        <p>Make a <code>.env</code> file with the <b>secret key</b> (never on GitHub 🔒):</p>
        ${code(`MONGODB_URI=mongodb+srv://maya:••••••@cluster0…/alicecode`, ".env")}
        <p>In <code>server.js</code>, swap the 🎯 lines for:</p>
        ${code(`await db.collection("ideas").insertOne(idea);`, "STEP 2a")}
        ${code(`const all = await db.collection("ideas")
  .find().sort({ createdAt: -1 }).toArray();`, "STEP 2b")}` },
    { h: "✅ 3 · Test", body: `
        ${code(`npm start`)}
        <ol class="ex-list">
          <li>Open <b>localhost:3000</b> → add an idea</li>
          <li>Stop the server: <kbd>Ctrl</kbd> + <kbd>C</kbd></li>
          <li><code>npm start</code> again → refresh the page</li>
          <li>Still there? 🎉 <b>The database remembered.</b></li>
        </ol>` }
  ];
  el.innerHTML = `
    <div class="ex">
      <div class="ex-left">
        <div class="ex-tabs">${STEPS.map((s, i) => `<button class="ex-tab${i ? "" : " on"}" data-i="${i}">${s.h}</button>`).join("")}</div>
        ${STEPS.map((s, i) => `<div class="ex-panel${i ? "" : " on"}" data-i="${i}">${s.body}</div>`).join("")}
      </div>
      <div class="ex-right">
        <div class="ex-vid-head">🎬 Expected result <button class="ex-replay">↺ replay</button></div>
        <div class="terminal ex-term"><div class="term-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><span class="title">terminal</span></div><pre class="ex-term-body"></pre></div>
        <div class="ex-browser">
          <div class="ex-url">🔒 localhost:3000 <span class="ex-reload">⟳</span></div>
          <div class="ex-page">
            <b class="ex-title">📱 TikTok Idea Tracker</b>
            <div class="ex-form"><span class="ex-typing"></span><span class="ex-add">+ Add idea</span></div>
            <ul class="ex-ideas"></ul>
            <div class="ex-badge"></div>
          </div>
        </div>
      </div>
    </div>`;

  el.querySelectorAll(".ex-tab").forEach(t => t.addEventListener("click", () => {
    el.querySelectorAll(".ex-tab, .ex-panel").forEach(x => x.classList.toggle("on", x.dataset.i === t.dataset.i));
  }));
  el.querySelectorAll(".ex-copy").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.parentElement.querySelector("pre").textContent); b.textContent = "✅ copied"; }
    catch (e) { b.textContent = "select + copy"; }
    setTimeout(() => { b.textContent = "📋 copy"; }, 1500);
  }));

  /* the "video": a scripted loop of terminal + browser */
  const term = el.querySelector(".ex-term-body"), typing = el.querySelector(".ex-typing");
  const ideas = el.querySelector(".ex-ideas"), badge = el.querySelector(".ex-badge"), page = el.querySelector(".ex-page");
  const slide = el.closest(".slide, .lab-panel");
  let run = 0;
  const line = (t, cls = "") => { term.innerHTML += `<span class="${cls}">${demoEsc(t)}</span>\n`; term.scrollTop = term.scrollHeight; };
  async function type(text, me) { for (let i = 1; i <= text.length; i++) { if (me !== run) return; typing.textContent = text.slice(0, i); await demoWait(45); } }
  async function play() {
    const me = ++run, ok = () => me === run && (!slide || slide.classList.contains("on"));
    term.innerHTML = ""; ideas.innerHTML = ""; typing.textContent = ""; badge.textContent = "";
    line("$ npm start", "t-dim"); await demoWait(500); if (!ok()) return;
    line("🍃 Connected to MongoDB", "t-ok"); line("🚀 Idea Tracker running on http://localhost:3000", "t-ok"); await demoWait(700); if (!ok()) return;
    await type("POV: your mom's 2003 closet is back", me); await demoWait(300); if (!ok()) return;
    ideas.innerHTML = `<li><b>Maya</b> POV: your mom's 2003 closet is back</li>`; typing.textContent = ""; await demoWait(1100); if (!ok()) return;
    line("^C", "t-run"); line("(server stopped)", "t-dim"); await demoWait(800); if (!ok()) return;
    line("$ npm start", "t-dim"); await demoWait(500); line("🍃 Connected to MongoDB", "t-ok"); line("🚀 Idea Tracker running on http://localhost:3000", "t-ok"); await demoWait(600); if (!ok()) return;
    page.classList.add("reloading"); ideas.innerHTML = ""; await demoWait(700); if (!ok()) return;
    page.classList.remove("reloading");
    ideas.innerHTML = `<li><b>Maya</b> POV: your mom's 2003 closet is back</li>`;
    badge.textContent = "✅ Still there! The database remembered.";
    await demoWait(3200);
    if (ok()) play(); // loop like a GIF while the slide is open
  }
  el.querySelector(".ex-replay").addEventListener("click", play);
  demoOnShow(el, play);
};

/* ============================================================
   🔒 Your key is a secret — the parts of a connection string + key in code vs. key in .env
   ============================================================ */
DEMOS.secretKey = function (el) {
  const PARTS = [
    { t: "mongodb+srv://", c: "proto", h: "🔌 How to talk", d: "Says: “this is a MongoDB address”." },
    { t: "maya", c: "user", h: "👤 Who", d: "The database user that logs in." },
    { t: ":" },
    { t: "S3cr3t-Pa55", c: "pw", h: "🔑 The secret", d: "The password. Whoever has it gets in — like your Instagram password." },
    { t: "@" },
    { t: "cluster0.ab12c.mongodb.net", c: "host", h: "📍 Where", d: "The address of your database in the cloud." },
    { t: "/alicecode", c: "db", h: "📁 Which", d: "The database inside it." }
  ];
  const MODES = {
    bad: {
      btn: "❌ Key in server.js",
      code: `<span class="c-kw">const</span> uri = <span class="c-str">"mongodb+srv://maya:<b class="sk-leak">S3cr3t-Pa55</b>@cluster0…"</span>;`,
      gh: `<div class="sk-ghf">📄 server.js</div><code>const uri = "mongodb+srv://maya:<b class="sk-leak">S3cr3t-Pa55</b>@…"</code>`,
      verdict: "🚨 Public! Bots search GitHub for keys all day. They can read, change or DELETE all your data."
    },
    good: {
      btn: "✅ Key in .env",
      code: `<span class="sk-file">.env</span>MONGODB_URI=mongodb+srv://maya:<b class="sk-safe">S3cr3t-Pa55</b>@…
<span class="sk-file">.gitignore</span><b class="sk-safe">.env</b>
<span class="sk-file">server.js</span><span class="c-kw">const</span> uri = process.env.<b class="sk-safe">MONGODB_URI</b>;`,
      gh: `<div class="sk-ghf">📄 server.js</div><code>const uri = process.env.MONGODB_URI;</code><div class="sk-ghf sk-skip">🚫 .env — not uploaded (it's in .gitignore)</div>`,
      verdict: "✅ Safe! The password never leaves your laptop."
    }
  };
  el.innerHTML = `
    <div class="sk">
      <div class="sk-key">
        <div class="sk-uri">${PARTS.map((p, i) => p.c ? `<button class="sk-part sk-${p.c}" data-i="${i}">${demoEsc(p.t)}</button>` : `<span>${p.t}</span>`).join("")}</div>
        <div class="sk-what"><b>👆 Click a part of the key</b> — it's called a <b>connection string</b>.</div>
      </div>
      <div class="sk-row">
        <div class="sk-laptop">
          <div class="sk-modes">${Object.entries(MODES).map(([k, m]) => `<button class="sk-mode" data-m="${k}">${m.btn}</button>`).join("")}</div>
          <div class="sk-head">💻 Your laptop</div>
          <pre class="sk-code"></pre>
          <div class="sk-push">⬆️ git push</div>
        </div>
        <div class="sk-gh">
          <div class="sk-head">🌍 GitHub · public · everyone can see</div>
          <div class="sk-ghbody"></div>
          <div class="sk-verdict"></div>
        </div>
      </div>
      <div class="sk-locks">
        <span>👤 A user that can only touch <b>ONE</b> database</span>
        <span>🌐 <b>Network Access</b> = who may knock</span>
        <span>🔁 Leaked? <b>Change the password</b> right away</span>
      </div>
    </div>`;

  const what = el.querySelector(".sk-what"), sk = el.querySelector(".sk");
  el.querySelectorAll(".sk-part").forEach(b => b.addEventListener("click", () => {
    const p = PARTS[+b.dataset.i];
    el.querySelectorAll(".sk-part").forEach(x => x.classList.toggle("on", x === b));
    what.innerHTML = `<b>${p.h}</b> ${p.d}`;
  }));
  function mode(k) {
    const m = MODES[k];
    sk.dataset.mode = k;
    el.querySelectorAll(".sk-mode").forEach(b => b.classList.toggle("on", b.dataset.m === k));
    el.querySelector(".sk-code").innerHTML = m.code;
    el.querySelector(".sk-ghbody").innerHTML = m.gh;
    el.querySelector(".sk-verdict").textContent = m.verdict;
    if (k === "good" && typeof labSparkle === "function") labSparkle(el, el.querySelector(".sk-verdict"), 12);
  }
  el.querySelectorAll(".sk-mode").forEach(b => b.addEventListener("click", () => mode(b.dataset.m)));
  demoOnShow(el, () => {
    mode("bad");
    el.querySelectorAll(".sk-part").forEach(x => x.classList.remove("on"));
    what.innerHTML = `<b>👆 Click a part of the key</b> — it's called a <b>connection string</b>.`;
  });
  mode("bad");
};

/* ============================================================
   Part 1 · ask the data — 4 questions, each one a simple SQL query (+ the same in MongoDB). Guess first, then ▶ Run.
   ============================================================ */
DEMOS.sqlAsk = function (el) {
  const kw = t => t.replace(/\b(SELECT|COUNT|FROM|WHERE|ORDER BY|DESC|LIMIT)\b/g, '<span class="c-kw">$1</span>')
    .replace(/('[^']*')/g, '<span class="c-str">$1</span>').replace(/\b(\d+)\b/g, '<span class="c-fn">$1</span>');
  const Q = [
    { ic: "👀", h: "Read", q: "How many videos are there?", sql: "SELECT COUNT(*) FROM videos;", mongo: "db.videos.countDocuments()", run: v => ({ n: v.length }) },
    { ic: "🔍", h: "Filter", q: "Show only the dance videos.", sql: "SELECT title, likes FROM videos\nWHERE category = 'dance';", mongo: 'db.videos.find({ category: "dance" })', run: v => ({ rows: v.filter(d => d.category === "dance") }) },
    { ic: "🔢", h: "Count", q: "How many have more than 10,000 likes?", sql: "SELECT COUNT(*) FROM videos\nWHERE likes > 10000;", mongo: "db.videos.countDocuments({ likes: { $gt: 10000 } })", run: v => ({ n: v.filter(d => d.likes > 10000).length }) },
    { ic: "🏆", h: "Sort", q: "Which video has the MOST likes?", sql: "SELECT title, likes FROM videos\nORDER BY likes DESC\nLIMIT 1;", mongo: "db.videos.find().sort({ likes: -1 }).limit(1)", run: v => ({ rows: v.slice().sort((a, b) => b.likes - a.likes).slice(0, 1), win: true }) }
  ];
  el.innerHTML = `
    <div class="sq">
      <ol class="sq-qs">${Q.map((x, i) => `<li><button class="sq-q" data-i="${i}"><b>${x.ic} ${x.h}</b><span>${x.q}</span></button></li>`).join("")}</ol>
      <div class="sq-right">
        <div class="sq-editor">
          <div class="term-bar"><span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span><span class="title">query.sql · table videos (30 rows)</span></div>
          <pre class="sq-code"></pre>
          <button class="btn small sq-run">▶ Run</button>
        </div>
        <div class="sq-mongo">🍃 Same question in MongoDB: <code></code></div>
        <div class="sq-out"></div>
      </div>
    </div>`;

  let videos = [], cur = 0, run = 0;
  const code = el.querySelector(".sq-code"), out = el.querySelector(".sq-out"), slide = el.closest(".slide, .lab-panel");
  const guess = () => { out.className = "sq-out"; out.innerHTML = `🤔 <b>Guess the answer first.</b> Then press ▶ Run.`; };
  async function pick(i) {
    const me = ++run; cur = i;
    el.querySelectorAll(".sq-q").forEach(b => b.classList.toggle("on", +b.dataset.i === i));
    guess();
    el.querySelector(".sq-mongo code").textContent = Q[i].mongo;
    const sql = Q[i].sql;
    if (demoReduced()) { code.innerHTML = kw(demoEsc(sql)); return; }
    for (let k = 1; k <= sql.length; k += 2) {
      if (me !== run || (slide && !slide.classList.contains("on"))) { code.innerHTML = kw(demoEsc(sql)); return; }
      code.innerHTML = kw(demoEsc(sql.slice(0, k))); await demoWait(18);
    }
    code.innerHTML = kw(demoEsc(sql));
  }
  function exec() {
    if (!videos.length) { out.textContent = "Couldn't load the videos — check the internet connection."; return; }
    const r = Q[cur].run(videos);
    out.className = "sq-out done";
    out.innerHTML = r.rows
      ? `<table class="sq-table"><tr><th>title</th><th>likes</th></tr>${r.rows.map(d => `<tr><td>${r.win ? "🏆 " : ""}${demoEsc(d.title)}</td><td>${d.likes.toLocaleString("en")}</td></tr>`).join("")}</table>
         <small>${r.rows.length} row${r.rows.length === 1 ? "" : "s"}</small>`
      : `<div class="sq-num">${r.n}</div><small>COUNT(*)</small>`;
    if (typeof labSparkle === "function") labSparkle(el, out, 10);
  }
  el.querySelectorAll(".sq-q").forEach(b => b.addEventListener("click", () => pick(+b.dataset.i)));
  el.querySelector(".sq-run").addEventListener("click", exec);
  demoOnShow(el, () => pick(0));
  fetch("starter/class-db/videos.json").then(r => r.json()).then(list => { videos = list; }).catch(() => {});
  pick(0);
};
