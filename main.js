/* AliceCode Level 4 Hub — shared behavior */

/* ---------- floating doodles (deck-style: braces, #, //, :>, constellation) ---------- */
(function doodles() {
  const layer = document.createElement("div");
  layer.className = "doodles";
  layer.setAttribute("aria-hidden", "true");
  const marks = ["{", "}", "#", "//", ":>", "</>", "⚡", "{ }", "✦", ";"];
  for (let i = 0; i < 16; i++) {
    const d = document.createElement("div");
    d.className = "doodle";
    d.textContent = marks[i % marks.length];
    d.style.cssText = `
      left:${(i * 61) % 100}%; top:${(i * 37 + 11) % 100}%;
      font-family:'Baloo 2',sans-serif; font-weight:800;
      font-size:${18 + ((i * 13) % 30)}px;
      color:rgba(255,255,255,.5);
      animation-delay:${-(i * 1.3)}s;`;
    layer.appendChild(d);
  }
  // constellation svg
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.cssText = "position:absolute;left:-40px;top:20%;width:340px;opacity:.14;";
  svg.innerHTML = `<g stroke="#fff" stroke-width="1.5" fill="#fff">
    <line x1="20" y1="40" x2="110" y2="90"/><line x1="110" y1="90" x2="60" y2="180"/>
    <line x1="110" y1="90" x2="210" y2="60"/><line x1="60" y1="180" x2="160" y2="230"/>
    <line x1="210" y1="60" x2="250" y2="160"/><line x1="160" y1="230" x2="250" y2="160"/>
    <circle cx="20" cy="40" r="6"/><circle cx="110" cy="90" r="9"/><circle cx="60" cy="180" r="7"/>
    <circle cx="210" cy="60" r="7"/><circle cx="250" cy="160" r="9"/><circle cx="160" cy="230" r="6"/>
  </g>`;
  layer.appendChild(svg);
  document.body.prepend(layer);
})();

/* ---------- nav ---------- */
(function nav() {
  const here = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
  const links = [
    ["index", "🏠 Home"],
    ["lessons", "📚 Lessons"],
    ["tasks", "✅ Tasks"],
    ["setup", "🔧 Setup"],
    ["learn-more", "🌟 Learn More"]
  ];
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="logo" href="index.html">
      <span class="logo-stars">★</span>
      <span class="brace">{</span>Alice code<span class="brace">}</span>
      <span class="lvl">LEVEL 4</span>
    </a>
    <div class="links">
      ${links.map(([p, label]) =>
        `<a class="nl ${p === here || (here === "slides" && p === "lessons") ? "active" : ""}" href="${p}.html">${label}</a>`).join("")}
    </div>`;
  document.body.insertBefore(nav, document.body.children[1]);
})();

/* ---------- reveal on scroll ---------- */
(function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); }
  }), { threshold: .12 });
  const arm = () => document.querySelectorAll(".reveal:not(.seen)").forEach(el => io.observe(el));
  document.addEventListener("DOMContentLoaded", arm);
  window.armReveal = arm;
})();

/* ---------- meme cards ---------- */
function renderMemes(el, list) {
  el.innerHTML = list.map(m => `
    <div class="meme ${m.theme} reveal">
      <span class="spark s1">✨</span><span class="spark s2">💫</span>
      <div class="tag">${m.tag}</div>
      <div>${m.text}</div>
    </div>`).join("");
  if (window.armReveal) window.armReveal();
}

/* ---------- confetti ---------- */
function confetti(x, y) {
  const bits = ["🎉", "✨", "💖", "⭐", "💜"];
  for (let i = 0; i < 10; i++) {
    const b = document.createElement("div");
    b.className = "confetti-bit";
    b.textContent = bits[i % bits.length];
    b.style.left = (x + (Math.random() * 120 - 60)) + "px";
    b.style.top = (y - 10) + "px";
    b.style.animationDelay = (Math.random() * .25) + "s";
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1800);
  }
}

/* ---------- persistent checklists ---------- */
function bindChecklist(root, storeKey) {
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch (e) {}
  root.querySelectorAll("input[type=checkbox]").forEach(cb => {
    if (saved[cb.id]) cb.checked = true;
    cb.addEventListener("change", e => {
      saved[cb.id] = cb.checked;
      try { localStorage.setItem(storeKey, JSON.stringify(saved)); } catch (err) {}
      if (cb.checked) {
        const r = cb.getBoundingClientRect();
        confetti(r.left + 10, r.top);
      }
      if (typeof updateProgress === "function") updateProgress();
    });
  });
}

/* ---------- terminal typing animation (loops forever) ---------- */
function runTerminal(bodyEl, script, opts = {}) {
  const speed = opts.speed || 26;
  let line = 0, ch = 0, out = [];
  const cursor = '<span class="cursor"></span>';

  function render(currentHtml) {
    bodyEl.innerHTML = out.join("\n") + (out.length ? "\n" : "") + currentHtml + cursor;
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function wrap(item, text) {
    const cls = item.c ? ` class="${item.c}"` : "";
    return `<span${cls}>${esc(text)}</span>`;
  }
  function step() {
    if (line >= script.length) {           // loop: fade, clear, restart
      setTimeout(() => {
        out = []; line = 0; ch = 0;
        render("");
        setTimeout(step, 500);
      }, opts.holdEnd || 3800);
      return;
    }
    const item = script[line];
    if (item.pause && ch === 0) {          // leading pause for this line
      const p = item.pause; item.pause = 0;
      setTimeout(step, p);
      return;
    }
    if (item.instant) {
      out.push(wrap(item, item.t));
      line++; ch = 0;
      render("");
      setTimeout(step, item.after || 320);
      return;
    }
    ch++;
    const part = item.t.slice(0, ch);
    render(wrap(item, part));
    if (ch >= item.t.length) {
      out.push(wrap(item, item.t));
      line++; ch = 0;
      setTimeout(step, item.after || 420);
    } else {
      setTimeout(step, item.c === "u" ? speed + 24 : speed);
    }
  }
  render("");
  setTimeout(step, 600);
}
