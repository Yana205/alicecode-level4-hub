/* AliceCode Level 4 — the Button Lab (Upgrade C)
   A live, terminal-styled playground: vague prompt vs explicit prompt,
   then the girls edit the code themselves. No server, no libraries. */

const LAB_PRESETS = {
  1: {
    title: "🧪 The Button Lab — same wish, two prompts",
    intro: "One plain button. Watch what each prompt gets you — then edit the code yourself. This is the superpower slide, live.",
    start: `<button>Click me</button>`,
    vague: {
      label: "😐 \"Make my button nicer\"",
      code: `<!-- The AI guessed. It's... fine? -->
<style>
  button {
    padding: 6px 14px;
    font-size: 15px;
  }
</style>
<button>Click me</button>`
    },
    explicit: {
      label: "😎 \"border-radius + hover transition + flexbox center + #D83474\"",
      code: `<!-- YOUR words. YOUR design. -->
<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background: #FFF5FA;
  }
  button {
    background: #D83474;
    color: white;
    border: none;
    border-radius: 999px;
    padding: 14px 36px;
    font-size: 18px;
    font-weight: bold;
    font-family: sans-serif;
    transition: transform .2s, box-shadow .2s;
    cursor: pointer;
  }
  button:hover {
    transform: scale(1.12);
    box-shadow: 0 10px 24px rgba(216,52,116,.45);
  }
</style>
<button>Click me 💜</button>`
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

function initButtonLab(container, n, embedded) {
  const P = LAB_PRESETS[n];
  if (!P) return;
  container.innerHTML = `
    ${embedded ? "" : `<h2>${P.title}</h2>
    <p class="muted" style="margin-bottom:12px">${P.intro}</p>`}
    <div class="lab-buttons">
      <button class="btn small" data-lab="vague">${P.vague.label}</button>
      <button class="btn small" data-lab="explicit">${P.explicit.label}</button>
      <button class="btn small dark" data-lab="reset">↺ Reset</button>
      <button class="btn small ghost" style="box-shadow:none;border-color:var(--pink);color:var(--pink)" data-lab="fs">⛶</button>
    </div>
    <div class="lab-split">
      <div class="terminal lab-editor-wrap">
        <div class="term-bar">
          <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
          <span class="title">code — type here, it runs instantly</span>
        </div>
        <textarea class="lab-editor" spellcheck="false" aria-label="HTML and CSS editor"></textarea>
      </div>
      <div class="lab-preview-wrap">
        <div class="lab-preview-bar">🖥️ live preview</div>
        <iframe class="lab-preview" sandbox="allow-same-origin" title="Live preview"></iframe>
      </div>
    </div>`;

  const ta = container.querySelector(".lab-editor");
  const frame = container.querySelector(".lab-preview");
  let typeTimer = null;

  function render() { frame.srcdoc = ta.value; }
  function setCode(code) { ta.value = code; render(); }

  function typeIn(code) {
    clearInterval(typeTimer);
    ta.value = "";
    let i = 0;
    const step = Math.max(2, Math.round(code.length / 220)); // ~3s total
    typeTimer = setInterval(() => {
      i = Math.min(code.length, i + step);
      ta.value = code.slice(0, i);
      ta.scrollTop = ta.scrollHeight;
      if (i % 60 < step) render();
      if (i >= code.length) { clearInterval(typeTimer); render(); }
    }, 14);
  }

  ta.addEventListener("input", () => { clearInterval(typeTimer); render(); });
  container.querySelector('[data-lab="vague"]').addEventListener("click", () => typeIn(P.vague.code));
  container.querySelector('[data-lab="explicit"]').addEventListener("click", () => typeIn(P.explicit.code));
  container.querySelector('[data-lab="reset"]').addEventListener("click", () => { clearInterval(typeTimer); setCode(P.start); });
  container.querySelector('[data-lab="fs"]').addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen && container.requestFullscreen();
  });

  setCode(P.start);
}
