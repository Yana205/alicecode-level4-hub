/* AliceCode Level 4 Hub — slide viewer engine */

(function () {
  const params = new URLSearchParams(location.search);
  const n = Math.min(7, Math.max(1, parseInt(params.get("n") || "1", 10)));
  const lesson = LESSONS.find(l => l.n === n);
  if (!lesson) return;

  document.title = `Lesson ${lesson.n} · ${lesson.title} — AliceCode Level 4`;

  /* ---------- header ---------- */
  const head = document.getElementById("lesson-head");
  head.innerHTML = `
    <div class="badge">Lesson ${lesson.n} of 7 · ${lesson.date}</div>
    <h1>${lesson.emoji} ${lesson.title}</h1>
    <p class="sub">${lesson.project}</p>`;

  /* ---------- build slides ---------- */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const colorClass = c => "c-" + (c || "pink");

  function slideHTML(s) {
    if (s.kind === "title") return `
      <div class="brace-art">{ }</div>
      <h1>${esc(s.title)}</h1>
      <div class="sub">${esc(s.sub || "")}</div>`;
    if (s.kind === "section") return `
      <h1>${esc(s.title)}</h1>
      <div class="sub">${esc(s.sub || "")}</div>`;
    if (s.kind === "newword") return `
      <div class="s-newword">
        <div class="nw-tag">✨ NEW WORD ✨</div>
        <div class="nw-term">${esc(s.term)}</div>
        <div class="nw-meaning">${esc(s.meaning)}</div>
        ${s.extra ? `<div class="nw-extra">${esc(s.extra)}</div>` : ""}
      </div>`;
    if (s.kind === "beforeafter") return `
      <h2 class="s-title">${esc(s.title)}</h2>
      <div class="s-body">
        <div class="s-ba">
          <div class="col before"><h4>BEFORE 😖</h4><p>${s.before.map(esc).join("<br>")}</p></div>
          <div class="mid">➜</div>
          <div class="col after"><h4>AFTER 🎉</h4><p>${s.after.map(esc).join("<br>")}</p></div>
        </div>
        ${s.note ? `<div class="s-note">${esc(s.note)}</div>` : ""}
      </div>`;
    /* content */
    const parts = (s.items || []).map(it => {
      if (it.lines) return `<ul class="s-lines">${it.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
      if (it.cards) return `<div class="s-cards">${it.cards.map(c => `
        <div class="s-card ${colorClass(c.color)}"><h4>${esc(c.h)}</h4><p>${c.lines.map(esc).join("<br>")}</p></div>`).join("")}</div>`;
      if (it.note) return `<div class="s-note">${esc(it.note)}</div>`;
      if (it.code) return `<div class="s-code">${it.code.map(esc).join("\n")}</div>`;
      if (it.rows) return `<table class="s-rows">${it.rows.map(r => `
        <tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</table>`;
      return "";
    }).join("");
    return `
      <h2 class="s-title">${esc(s.title)}</h2>
      ${s.lead ? `<div class="s-lead">${esc(s.lead)}</div>` : ""}
      <div class="s-body">${parts}</div>`;
  }

  const stage = document.getElementById("stage");
  stage.innerHTML = lesson.slides.map((s, i) => `
    <div class="slide k-${s.kind} ${i === 0 ? "on" : ""}" data-i="${i}">${slideHTML(s)}</div>`).join("");

  /* ---------- controls ---------- */
  const slides = [...stage.querySelectorAll(".slide")];
  const dots = document.getElementById("dots");
  dots.innerHTML = slides.map((_, i) => `<span data-i="${i}" class="${i === 0 ? "on" : ""}"></span>`).join("");
  const counter = document.getElementById("counter");
  let cur = 0;

  function go(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, j) => s.classList.toggle("on", j === cur));
    dots.querySelectorAll("span").forEach((d, j) => d.classList.toggle("on", j === cur));
    counter.textContent = `${cur + 1} / ${slides.length}`;
    document.getElementById("prev").disabled = cur === 0;
    document.getElementById("next").disabled = cur === slides.length - 1;
  }
  document.getElementById("prev").onclick = () => go(cur - 1);
  document.getElementById("next").onclick = () => go(cur + 1);
  dots.onclick = e => { if (e.target.dataset.i) go(+e.target.dataset.i); };
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(cur + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
  });
  stage.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    go(cur + 1);
  });
  go(0);

  /* ---------- below the deck: goal, missions, tutorial links ---------- */
  const below = document.getElementById("below");
  below.innerHTML = `
    <div class="card reveal">
      <h2>🎯 Today's goal</h2>
      <p>${esc(lesson.goal)}</p>
      <p style="margin-top:8px"><strong class="pink">You leave with:</strong> ${esc(lesson.leaves)}</p>
    </div>

    <div class="card reveal">
      <h2>✅ Your missions</h2>
      <p class="muted" style="margin-bottom:10px">Tick them off as you go — the page remembers you. ✨</p>
      <ul class="check-list" id="mission-list">
        ${lesson.missions.map((m, i) => `
          <li><input type="checkbox" id="l${lesson.n}-m${i}"><label for="l${lesson.n}-m${i}">${esc(m)}</label></li>`).join("")}
      </ul>
    </div>

    <div class="card reveal">
      <h2>🔗 Tutorial links for today's steps</h2>
      <p class="muted" style="margin-bottom:10px">Everything we touch today, one click away.</p>
      <div class="res-grid">
        ${lesson.tutorial.map(t => `
          <a class="res" href="${t.url}" target="_blank" rel="noopener">
            <span class="r-kind">tutorial</span>
            <h3>${esc(t.label)}</h3>
            <span class="r-url">${esc(t.url.replace("https://", ""))} ↗</span>
          </a>`).join("")}
      </div>
    </div>

    <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px">
      ${lesson.n > 1 ? `<a class="btn ghost" href="slides.html?n=${lesson.n - 1}">← Lesson ${lesson.n - 1}</a>` : ""}
      <a class="btn" href="tasks.html">All tasks board</a>
      ${lesson.n < 7 ? `<a class="btn ghost" href="slides.html?n=${lesson.n + 1}">Lesson ${lesson.n + 1} →</a>`
                     : `<a class="btn dark" href="lessons.html#hackathon">🔥 The Hackathon</a>`}
    </div>`;

  bindChecklist(document.getElementById("mission-list"), `ac4-missions-l${lesson.n}`);
  if (window.armReveal) window.armReveal();
})();
