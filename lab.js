/* AliceCode Level 4 — the Button Lab (Upgrade C)
   A live, terminal-styled playground: vague prompt vs explicit prompt,
   then the girls edit the code themselves. No server, no libraries.
   Presets with a `prompt` also get the "juice": dull vs highlighted editor,
   prompt bubble with neon keywords + arrow to the CSS, Your Turn challenge,
   sparkle + chime on the upgrade. */

const LAB_PRESETS = {
  1: {
    title: "🧪 The Button Lab — same wish, two prompts",
    intro: "One plain button. Watch what each prompt gets you — then edit the code yourself. This is the superpower slide, live.",
    start: `<button>Click me</button>`,
    vague: {
      label: "😐 \"Make my button nicer\"",
      prompt: "Make my button nicer",
      code: `<!-- The AI Guessed. It's a standard, boring button. -->
<style>
  button {
    background-color: #007BFF;
    color: white;
    padding: 10px 20px;
    border: 1px solid #0056b3;
    border-radius: 4px;
    font-size: 16px;
  }
</style>
<button>Click me</button>`
    },
    explicit: {
      label: "😎 \"gradient + pill + hover + shadow + center\"",
      /* {word|css target} = neon keyword in the prompt bubble, linked to its line in the code */
      prompt: "{gradient|background} background + pill {border-radius} + {hover|:hover} {transition} {transform} + soft {box-shadow} + {flexbox|display} {center|justify-content}",
      arrow: "transition",
      code: `<!-- The AI Obeyed. You controlled the design. -->
<style>
  body {
    display: flex; /* flexbox center */
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    margin: 0;
  }

  button {
    background: linear-gradient(135deg, #FF9A9E, #FECFEF);
    color: #333;
    padding: 12px 28px;
    border: none;
    border-radius: 50px; /* Pill shape */
    font-weight: 700;
    font-family: system-ui, sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
    transition: all 0.3s ease;
  }

  button:hover {
    transform: translateY(-3px) scale(1.05); /* The wow effect */
    box-shadow: 0 8px 20px rgba(255, 154, 158, 0.6);
  }
</style>
<button>Click me ✨</button>`
    },
    yourTurn: {
      label: "🎯 \"Your Turn\"",
      words: ["text-shadow", "animation", "outline"],
      win: "🦸‍♀️ Superpower proven! 3 new words → 3 new looks.",
      /* what the "AI" writes when ▶ Run sees each word in the prompt */
      css: {
        "text-shadow": "text-shadow: 0 0 8px #fff, 0 2px 0 #FF9A9E;",
        "animation": "animation: float 2s ease-in-out infinite;",
        "outline": "outline: 3px dashed #FF79A8;\n    outline-offset: 5px;"
      },
      keyframes: {
        "animation": "@keyframes float {\n    0%, 100% { translate: 0 0; }\n    50% { translate: 0 -10px; }\n  }"
      }
    }
  },
  2: {
    title: "🌸 The Flower Shop Lab — vague vs explicit, full page",
    intro: "Lesson 1's trick, bigger: a whole site from one prompt. Watch both, then make it yours.",
    start: `<h1>Flower Shop</h1>
<p>Welcome to my shop.</p>`,
    vague: {
      label: "😐 \"Build me a website for my flower shop\"",
      code: `<!-- The AI guessed everything. -->
<h1>Flower Shop</h1>
<p>Welcome to my flower shop.</p>
<p>We sell flowers.</p>
<ul>
  <li>Roses</li>
  <li>Tulips</li>
</ul>`
    },
    explicit: {
      label: "😎 \"navbar + hero + card grid with hover + #D83474 + responsive\"",
      code: `<style>
  body { margin: 0; font-family: sans-serif; color: #3B1F5C; }
  nav {
    display: flex; gap: 16px; align-items: center;
    padding: 12px 20px; background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,.08);
  }
  nav b { color: #D83474; }
  .hero {
    background: linear-gradient(135deg,#674C9B,#D83474);
    color: #fff; text-align: center; padding: 42px 16px;
  }
  .hero button {
    background: #fff; color: #D83474; border: none;
    border-radius: 999px; padding: 10px 26px;
    font-weight: bold; cursor: pointer;
  }
  .grid {
    display: flex; gap: 14px; flex-wrap: wrap;
    justify-content: center; padding: 24px 14px;
  }
  .card {
    background: #fff; border: 2px solid #EFA6C3;
    border-radius: 16px; padding: 16px; width: 120px;
    text-align: center; transition: transform .2s;
  }
  .card:hover { transform: translateY(-6px); }
  .price { color: #D83474; font-weight: bold; }
</style>
<nav><b>🌸 Flora</b> Home · Shop · Contact</nav>
<div class="hero">
  <h1>Fresh flowers, every day</h1>
  <button>Order now</button>
</div>
<div class="grid">
  <div class="card">🌹<br>Rose<br><span class="price">₪12</span></div>
  <div class="card">🌷<br>Tulip<br><span class="price">₪9</span></div>
  <div class="card">🌻<br>Sunflower<br><span class="price">₪10</span></div>
</div>`
    }
  }
};


/* ---------- "juice" helpers (presets opt in: prompt / arrow / yourTurn) ---------- */

const labEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* tiny HTML+CSS highlighter → spans for the layer under the textarea */
function labHighlight(code) {
  const re = /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/)|(<\/?[a-zA-Z][^>]*>)|([a-zA-Z][\w:.#-]*)(?=\s*\{)|([a-z-]+)(?=\s*:[^;{}]*;)|(#[0-9a-fA-F]{3,8}\b)|((?<![\w#.])-?\d*\.?\d+(?:px|em|rem|vh|vw|%|s|deg)?)/g;
  let out = "", last = 0, m;
  while ((m = re.exec(code))) {
    out += labEsc(code.slice(last, m.index));
    const t = labEsc(m[0]);
    if (m[1]) out += `<span class="tk-com">${t}</span>`;
    else if (m[2]) out += `<span class="tk-tag">${t}</span>`;
    else if (m[3]) out += `<span class="tk-sel">${t}</span>`;
    else if (m[4]) out += `<span class="tk-prop" data-prop="${t}">${t}</span>`;
    else if (m[5]) out += `<span class="tk-hex">${t}</span>`;
    else out += `<span class="tk-num">${t}</span>`;
    last = re.lastIndex;
  }
  return out + labEsc(code.slice(last)) + "\n";
}

/* "{word|target} plain {word}" → neon keyword spans */
function labPromptHTML(prompt) {
  return labEsc(prompt).replace(/\{([^|}]+)(?:\|([^}]+))?\}/g,
    (_, w, t) => `<b class="kw" data-target="${t || w}" tabindex="0">${w}</b>`);
}

/* sound: a short rising chime, synthesized (no files) */
let labAudio = null;
function labSoundOn() { try { return localStorage.getItem("ac4-lab-sound") !== "off"; } catch (e) { return true; } }
function labChime(notes) {
  if (!labSoundOn()) return;
  try {
    labAudio = labAudio || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = labAudio.currentTime;
    notes.forEach((f, i) => {
      const o = labAudio.createOscillator(), g = labAudio.createGain();
      o.type = "triangle"; o.frequency.value = f;
      const t = t0 + i * 0.07;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      o.connect(g).connect(labAudio.destination);
      o.start(t); o.stop(t + 0.5);
    });
  } catch (e) {}
}
const LAB_UPGRADE_NOTES = [784, 988, 1175, 1568];
const LAB_WIN_NOTES = [523, 659, 784, 1047, 1319];

/* sparkle burst centered on an element */
function labSparkle(host, target, count = 18) {
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const h = host.getBoundingClientRect(), r = target.getBoundingClientRect();
  const cx = r.left - h.left + r.width / 2, cy = r.top - h.top + r.height / 2;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "lab-spark";
    s.textContent = ["✨", "⭐", "💖", "✦"][i % 4];
    const a = (Math.PI * 2 * i) / count, d = 50 + Math.random() * 70;
    s.style.left = cx + "px"; s.style.top = cy + "px";
    s.style.setProperty("--dx", Math.cos(a) * d + "px");
    s.style.setProperty("--dy", Math.sin(a) * d + "px");
    host.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }
}

function initButtonLab(container, n, embedded) {
  const P = LAB_PRESETS[n];
  if (!P) return;
  const juice = !!P.explicit.prompt; // presets with a prompt get the upgraded lab
  container.classList.add("lab-host");
  if (juice) container.classList.add("lab-juice");
  container.innerHTML = `
    ${embedded ? "" : `<h2>${P.title}</h2>
    <p class="muted" style="margin-bottom:12px">${P.intro}</p>`}
    <div class="lab-buttons">
      <button class="btn small" data-lab="vague">${P.vague.label}</button>
      <button class="btn small" data-lab="explicit">${P.explicit.label}</button>
      ${P.yourTurn ? `<button class="btn small lab-yt-btn" data-lab="yourturn">${P.yourTurn.label}</button>` : ""}
      <button class="btn small dark" data-lab="reset">↺ Reset</button>
      ${juice ? `<button class="btn small ghost lab-icon" data-lab="sound" title="Sound on/off">${labSoundOn() ? "🔊" : "🔇"}</button>` : ""}
      <button class="btn small ghost lab-icon" data-lab="fs">⛶</button>
    </div>
    ${juice ? `<div class="lab-bubble" aria-live="polite"></div>` : ""}
    <div class="lab-split">
      <div class="terminal lab-editor-wrap">
        <div class="term-bar">
          <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
          <span class="title">code — type here, it runs instantly</span>
        </div>
        <div class="lab-code">
          ${juice ? `<pre class="lab-hl" aria-hidden="true"></pre>` : ""}
          <textarea class="lab-editor" spellcheck="false" aria-label="HTML and CSS editor"></textarea>
        </div>
      </div>
      <div class="lab-preview-wrap">
        <div class="lab-preview-bar">🖥️ live preview</div>
        <iframe class="lab-preview" sandbox="allow-same-origin" title="Live preview"></iframe>
      </div>
    </div>
    ${juice ? `<svg class="lab-arrow" aria-hidden="true"><defs><marker id="lab-head-${n}${embedded ? "e" : ""}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z"/></marker></defs><path class="lab-arrow-path"/></svg>` : ""}`;

  const ta = container.querySelector(".lab-editor");
  const hl = container.querySelector(".lab-hl");
  const frame = container.querySelector(".lab-preview");
  const wrap = container.querySelector(".lab-editor-wrap");
  const previewWrap = container.querySelector(".lab-preview-wrap");
  const previewBar = container.querySelector(".lab-preview-bar");
  const bubble = container.querySelector(".lab-bubble");
  const svg = container.querySelector(".lab-arrow");
  const arrowPath = svg && svg.querySelector(".lab-arrow-path");
  if (arrowPath) arrowPath.setAttribute("marker-end", `url(#${svg.querySelector("marker").id})`);
  let typeTimer = null, mode = "start", arrowTarget = null, won = false;

  function paint() {
    if (!hl) return;
    hl.innerHTML = labHighlight(ta.value);
    hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft;
  }
  function render() { frame.srcdoc = ta.value; }
  function update() { paint(); drawArrow(); checkYourTurn(); }

  /* ---- color-coded feedback: dull "before", vivid "after" ---- */
  function setMode(m) {
    mode = m;
    if (!juice) return;
    container.querySelectorAll(".lab-buttons [data-lab]").forEach(b => b.classList.toggle("on", b.dataset.lab === m));
    wrap.classList.toggle("dull", m === "vague");
    wrap.classList.toggle("vivid", m === "explicit" || m === "yourturn");
    previewWrap.classList.toggle("dull", m === "vague");
    previewBar.textContent = { vague: "🖥️ live preview — the AI guessed 😐",
      explicit: "🖥️ live preview — you designed it 😎",
      yourturn: "🖥️ live preview — your turn 🎯" }[m] || "🖥️ live preview";
    setBubble(m);
    if (m !== "explicit") clearArrow();
  }

  /* ---- the prompt bubble ---- */
  function setBubble(m) {
    if (!bubble) return;
    bubble.className = "lab-bubble b-" + m;
    if (m === "vague") bubble.innerHTML = `<span class="who">💬 Prompt</span><span class="txt">"${labEsc(P.vague.prompt)}"</span>`;
    else if (m === "explicit") {
      bubble.innerHTML = `<span class="who">💬 Prompt</span><span class="txt">"${labPromptHTML(P.explicit.prompt)}"</span>`;
      bubble.querySelectorAll(".kw").forEach(k => {
        const pick = () => pointTo(k.dataset.target, true);
        k.addEventListener("mouseenter", pick);
        k.addEventListener("focus", pick);
        k.addEventListener("click", pick);
      });
    }
    else if (m === "yourturn") {
      bubble.innerHTML = `<span class="who">🎯 Your Turn</span>
        <input class="yt-input" type="text" placeholder="Write your prompt… use all 3 words →" aria-label="Your prompt">
        <button class="btn small yt-run" type="button">▶ Run</button>
        <span class="yt-words">${P.yourTurn.words.map(w => `<span class="yt-chip" data-w="${w}">${w}</span>`).join("")}</span>
        <span class="yt-msg"></span>`;
      const input = bubble.querySelector(".yt-input");
      input.addEventListener("input", checkYourTurn);
      input.addEventListener("keydown", e => { if (e.key === "Enter") runPrompt(); });
      bubble.querySelector(".yt-run").addEventListener("click", runPrompt);
    }
    else bubble.innerHTML = `<span class="who">💬 Prompt</span><span class="txt dim">Pick a prompt above 👆 — same AI, different words.</span>`;
  }

  /* ---- anatomy arrow: keyword in the prompt → its line in the CSS ---- */
  function findToken(target) {
    if (!hl) return null;
    if (target.startsWith(":")) return [...hl.querySelectorAll(".tk-sel")].find(s => s.textContent.includes(target));
    return hl.querySelector(`.tk-prop[data-prop="${target}"]`);
  }
  function pointTo(target, scroll) {
    arrowTarget = target;
    const tok = findToken(target);
    if (tok && scroll) {
      const line = tok.offsetTop - ta.clientHeight / 2;
      if (tok.offsetTop < ta.scrollTop || tok.offsetTop > ta.scrollTop + ta.clientHeight - 30) {
        ta.scrollTop = Math.max(0, line); hl.scrollTop = ta.scrollTop;
      }
    }
    drawArrow();
  }
  function clearArrow() {
    arrowTarget = null;
    if (svg) svg.classList.remove("on");
    if (hl) hl.querySelectorAll(".lit").forEach(e => e.classList.remove("lit"));
    if (bubble) bubble.querySelectorAll(".kw.lit").forEach(e => e.classList.remove("lit"));
  }
  function drawArrow() {
    if (!svg || !arrowTarget || mode !== "explicit") return;
    const kw = bubble.querySelector(`.kw[data-target="${arrowTarget}"]`);
    const tok = findToken(arrowTarget);
    bubble.querySelectorAll(".kw").forEach(e => e.classList.toggle("lit", e === kw));
    hl.querySelectorAll(".lit").forEach(e => e.classList.toggle("lit", e === tok));
    const H = container.getBoundingClientRect();
    if (!kw || !tok || !H.width) { svg.classList.remove("on"); return; }
    tok.classList.add("lit");
    const k = kw.getBoundingClientRect(), t = tok.getBoundingClientRect(), box = ta.getBoundingClientRect();
    const ty = t.top + t.height / 2;
    if (ty < box.top || ty > box.bottom) { svg.classList.remove("on"); return; }
    const x1 = k.left - H.left + k.width / 2, y1 = k.bottom - H.top + 2;
    const x2 = t.left - H.left - 4, y2 = ty - H.top;
    const sx = Math.max(box.left - H.left + 2, x2 - 70);
    arrowPath.setAttribute("d", `M${x1},${y1} C${x1},${y1 + 70} ${sx},${y2} ${x2},${y2}`);
    svg.classList.add("on");
  }

  /* ---- ▶ Run: the "AI" obeys the student's prompt ---- */
  function runPrompt() {
    const Y = P.yourTurn, msg = bubble.querySelector(".yt-msg");
    const said = bubble.querySelector(".yt-input").value.toLowerCase();
    const has = w => new RegExp(`(^|[\\s;{])${w}\\s*:`).test(ta.value.replace(/\/\*[\s\S]*?\*\//g, ""));
    const asked = Y.words.filter(w => said.includes(w));
    const fresh = asked.filter(w => !has(w));
    if (!asked.length) { msg.textContent = `🤖 No tech words… I can only guess! Try: ${Y.words.join(" · ")}`; return; }
    if (!fresh.length) { msg.textContent = "🤖 Already in your code! Add another word."; return; }
    let code = ta.value;
    const marker = "  /* 🎯 Your words → your code */\n  button {\n";
    if (!code.includes(marker)) {
      const block = `${marker}  }\n`;
      code = /\n?\s*\/\* 🎯 Your turn:[^*]*\*\/\n?/.test(code)
        ? code.replace(/\n?\s*\/\* 🎯 Your turn:[^*]*\*\/\n?/, "\n\n" + block)
        : code.replace("</style>", block + "</style>");
    }
    const decls = fresh.map(w => "    " + Y.css[w] + "\n").join("");
    code = code.replace(marker, marker + decls);
    fresh.forEach(w => {
      const kf = Y.keyframes && Y.keyframes[w];
      if (kf && !code.includes(kf.split("{")[0])) code = code.replace("</style>", `\n  ${kf}\n</style>`);
    });
    code = code.replace(/\n{3,}/g, "\n\n");
    clearInterval(typeTimer);
    ta.value = code; render(); paint();
    const tok = findToken(fresh[0]);
    if (tok) { ta.scrollTop = Math.max(0, tok.offsetTop - ta.clientHeight / 3); hl.scrollTop = ta.scrollTop; }
    msg.textContent = `🤖 The AI obeyed: added ${fresh.join(" + ")}`;
    labChime(LAB_UPGRADE_NOTES);
    labSparkle(container, previewWrap, 14);
    checkYourTurn();
  }

  /* ---- live edit challenge ---- */
  function checkYourTurn() {
    if (mode !== "yourturn" || !bubble) return;
    const css = ta.value.replace(/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g, "");
    const said = (bubble.querySelector(".yt-input") || {}).value || "";
    let done = 0;
    bubble.querySelectorAll(".yt-chip").forEach(c => {
      const w = c.dataset.w;
      const inCode = new RegExp(`(^|[\\s;{])${w}\\s*:`).test(css);
      c.classList.toggle("said", said.toLowerCase().includes(w));
      c.classList.toggle("done", inCode);
      if (inCode) done++;
    });
    if (done === P.yourTurn.words.length && !won) {
      won = true;
      labChime(LAB_WIN_NOTES);
      labSparkle(container, previewWrap, 26);
      const msg = document.createElement("span");
      msg.className = "yt-win"; msg.textContent = P.yourTurn.win;
      bubble.appendChild(msg);
    }
  }

  function setCode(code) { ta.value = code; ta.scrollTop = 0; render(); update(); }

  function typeIn(code, done) {
    clearInterval(typeTimer);
    ta.value = "";
    let i = 0;
    const step = Math.max(2, Math.round(code.length / 220)); // ~3s total
    typeTimer = setInterval(() => {
      i = Math.min(code.length, i + step);
      ta.value = code.slice(0, i);
      ta.scrollTop = ta.scrollHeight;
      paint();
      if (i % 60 < step) render();
      if (i >= code.length) { clearInterval(typeTimer); render(); ta.scrollTop = 0; paint(); done && done(); }
    }, 14);
  }

  ta.addEventListener("input", () => { clearInterval(typeTimer); render(); update(); });
  ta.addEventListener("scroll", () => { if (hl) { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; } drawArrow(); });
  if (window.ResizeObserver) new ResizeObserver(() => drawArrow()).observe(container);

  container.querySelector('[data-lab="vague"]').addEventListener("click", () => {
    setMode("vague"); typeIn(P.vague.code);
  });
  container.querySelector('[data-lab="explicit"]').addEventListener("click", function () {
    const upgrade = juice && mode !== "explicit";
    setMode("explicit");
    if (upgrade) { labChime(LAB_UPGRADE_NOTES); labSparkle(container, this, 14); }
    typeIn(P.explicit.code, () => {
      if (!juice) return;
      previewWrap.classList.remove("pop"); void previewWrap.offsetWidth; previewWrap.classList.add("pop");
      labSparkle(container, previewWrap, 22);
      if (P.explicit.arrow) pointTo(P.explicit.arrow, true);
    });
  });
  const yt = container.querySelector('[data-lab="yourturn"]');
  if (yt) yt.addEventListener("click", () => {
    clearInterval(typeTimer); won = false;
    setMode("yourturn");
    setCode(P.explicit.code.replace("</style>", `\n  /* 🎯 Your turn: ${P.yourTurn.words.join(" · ")} */\n\n</style>`));
    const input = bubble.querySelector(".yt-input");
    input && input.focus({ preventScroll: true });
  });
  container.querySelector('[data-lab="reset"]').addEventListener("click", () => {
    clearInterval(typeTimer); setMode("start"); setCode(P.start);
  });
  const snd = container.querySelector('[data-lab="sound"]');
  if (snd) snd.addEventListener("click", () => {
    const on = !labSoundOn();
    try { localStorage.setItem("ac4-lab-sound", on ? "on" : "off"); } catch (e) {}
    document.querySelectorAll('[data-lab="sound"]').forEach(b => b.textContent = on ? "🔊" : "🔇");
    if (on) labChime([1047]);
  });
  container.querySelector('[data-lab="fs"]').addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen && container.requestFullscreen();
  });

  setMode("start");
  setCode(P.start);
}
