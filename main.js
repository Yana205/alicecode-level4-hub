/* AliceCode Level 4 Hub — shared behavior */

/* ============ locks ============ */
/* magic view-password: opens locked lessons on this device (spoiler-level, not security) */
const AC4_UNLOCK_KEY = "ac4-magic-unlock";
function isUnlocked() {
  try { return localStorage.getItem(AC4_UNLOCK_KEY) === "yes"; } catch (e) { return false; }
}
function tryPassword(p) {
  if ((p || "").trim().toLowerCase() === atob("dW5sb2NrcGxlYXNl")) {
    try { localStorage.setItem(AC4_UNLOCK_KEY, "yes"); } catch (e) {}
    return true;
  }
  return false;
}
function relock() { try { localStorage.removeItem(AC4_UNLOCK_KEY); } catch (e) {} }

async function loadLocks() {
  try {
    const r = await fetch("locks.json?v=" + Date.now(), { cache: "no-store" });
    if (r.ok) return await r.json();
  } catch (e) {}
  return {};
}
function lessonLocked(locks, n) { return !!locks[String(n)]; }
function canView() { return isUnlocked(); }
function lessonVisible(locks, n) { return canView() || !lessonLocked(locks, n); }

/* ============ floating doodles ============ */
(function doodles() {
  const layer = document.createElement("div");
  layer.className = "doodles";
  layer.setAttribute("aria-hidden", "true");
  const marks = ["{", "}", "#", "//", ":>", "</>", "⚡", "{ }", "✦", ";"];
  for (let i = 0; i < 14; i++) {
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

/* ============ nav ============ */
(function nav() {
  const here = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
  const groups = [
    { name: "Class", links: [
      ["lessons", "📚", "Lessons"],
      ["calendar", "🗓️", "Calendar"],
      ["tasks", "✅", "Tasks"]
    ]},
    { name: "Help", links: [
      ["setup", "🔧", "Setup"],
      ["learn-more", "🌟", "Learn More"]
    ]}
  ];
  const isOn = p => p === here || (here === "slides" && p === "lessons");
  const linkHTML = ([p, ic, label]) =>
    `<a class="nl ${isOn(p) ? "active" : ""}" href="${p}.html"><span class="nl-ic">${ic}</span>${label}</a>`;

  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="logo" href="index.html">
      <img class="logo-img" src="assets/brand/alicecode-logo.webp" width="300" height="123"
           alt="AliceCode" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">
      <span class="logo-text" style="display:none">
        <span class="logo-stars">★</span>
        <span class="brace">{</span>Alice code<span class="brace">}</span>
      </span>
      <span class="lvl">LEVEL 4</span>
    </a>
    <div class="links desktop-links">
      ${linkHTML(["index", "🏠", "Home"])}
      ${groups.map(g => g.links.map(linkHTML).join("")).join("")}
    </div>
    <button class="burger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="mobile-menu" id="mobile-menu">
      ${linkHTML(["index", "🏠", "Home"])}
      ${groups.map(g => `
        <div class="mm-group">${g.name}</div>
        ${g.links.map(linkHTML).join("")}`).join("")}
    </div>`;
  document.body.insertBefore(nav, document.body.children[1]);

  const burger = nav.querySelector(".burger");
  const menu = nav.querySelector(".mobile-menu");
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", e => { if (e.target.closest("a")) menu.classList.remove("open"); });

  if (isUnlocked()) {
    const b = document.createElement("div");
    b.className = "admin-banner";
    b.innerHTML = `🔓 Magic password active — locked lessons are visible on this device. <a href="#" id="relock-link">Lock again</a>`;
    document.body.insertBefore(b, nav.nextSibling);
    b.querySelector("#relock-link").addEventListener("click", e => { e.preventDefault(); relock(); location.reload(); });
  }
})();

/* ============ reveal on scroll ============ */
(function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("seen"); io.unobserve(e.target); }
  }), { threshold: .12 });
  const arm = () => document.querySelectorAll(".reveal:not(.seen)").forEach(el => io.observe(el));
  document.addEventListener("DOMContentLoaded", arm);
  window.armReveal = arm;
})();

/* ============ meme cards ============ */
function renderMemes(el, list) {
  el.innerHTML = list.map(m => `
    <div class="meme ${m.theme} reveal">
      <span class="spark s1">✨</span><span class="spark s2">💫</span>
      <div class="tag">${m.tag}</div>
      <div>${m.text}</div>
    </div>`).join("");
  if (window.armReveal) window.armReveal();
}

/* ============ confetti ============ */
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

/* ============ persistent checklists ============ */
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

/* ============ lesson flow modal ============ */
function openFlowModal(n) {
  const lesson = (typeof LESSONS !== "undefined") && LESSONS.find(l => l.n === n);
  const flow = (typeof FLOWS !== "undefined") && FLOWS[n];
  if (!lesson || !flow) return;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  const stageBody = {
    tease: `<p>${esc(flow.tease)}</p>`,
    game: `<p><a class="btn small" href="${flow.game.url}" target="_blank" rel="noopener">🎮 ${esc(flow.game.name)} ↗</a></p>
           <p class="muted">${esc(flow.game.note)}</p>`,
    material: `<p>${esc(flow.material)}</p>`,
    discussion: `<p>${esc(flow.discussion)}</p>`,
    demo: `<p>${esc(flow.demo)}</p>`,
    exercises: `<p>${esc(flow.exercises)}</p>`,
    building: `<p>${esc(flow.building)}</p>
      <div class="flow-sources">${flow.sources.map(s =>
        `<a href="${s.url}" target="_blank" rel="noopener">🔗 ${esc(s.label)}</a>`).join("")}</div>
      <div class="flow-start">🚦 <strong>How to start:</strong> ${esc(flow.start)}</div>`
  };

  const old = document.getElementById("flow-modal");
  if (old) old.remove();
  const wrap = document.createElement("div");
  wrap.id = "flow-modal";
  wrap.className = "modal-backdrop";
  wrap.innerHTML = `
    <div class="modal" role="dialog" aria-label="Lesson flow">
      <button class="modal-x" aria-label="Close">✕</button>
      <div class="modal-head">
        <div class="badge" style="background:rgba(216,52,116,.1); border-color:var(--pink); color:var(--pink)">Lesson ${lesson.n} of 7</div>
        <h2>${lesson.emoji} Lesson ${lesson.n} — today's flow</h2>
      </div>
      <div class="flow-list">
        ${FLOW_STAGES.map((st, i) => `
          <div class="flow-stage">
            <div class="fs-head">
              <span class="fs-ic">${st.icon}</span>
              <h3>${st.name}</h3>
              <span class="fs-min">~${st.min}′</span>
            </div>
            <div class="fs-body">${stageBody[st.key] || ""}</div>
          </div>`).join("")}
        ${lesson.missionsInFlow ? `
          <div class="flow-stage flow-tasks">
            <div class="fs-head">
              <span class="fs-ic">✅</span>
              <h3>Today's tasks</h3>
            </div>
            <div class="fs-body">
              <p class="muted">Tick them off as you go — the page remembers you. ✨</p>
              <ul class="check-list" id="flow-mission-list">
                ${lesson.missions.map((m, i) => `
                  <li><input type="checkbox" id="l${lesson.n}-m${i}"><label for="l${lesson.n}-m${i}">${esc(m)}</label></li>`).join("")}
              </ul>
            </div>
          </div>` : ""}
      </div>
    </div>`;
  document.body.appendChild(wrap);
  if (lesson.missionsInFlow) bindChecklist(wrap.querySelector("#flow-mission-list"), `ac4-missions-l${lesson.n}`);
  const close = () => wrap.remove();
  wrap.addEventListener("click", e => { if (e.target === wrap) close(); });
  wrap.querySelector(".modal-x").addEventListener("click", close);
  document.addEventListener("keydown", function esck(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esck); }
  });
}

/* ============ terminal typing animation (loops forever) ============ */
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
    if (line >= script.length) {
      setTimeout(() => {
        out = []; line = 0; ch = 0;
        render("");
        setTimeout(step, 500);
      }, opts.holdEnd || 3800);
      return;
    }
    const item = script[line];
    if (item.pause && ch === 0) {
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
