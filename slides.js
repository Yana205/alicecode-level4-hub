/* AliceCode Level 4 Hub — slide viewer engine (v2: locks, flow modal, fullscreen, swipe) */

(async function () {
  const params = new URLSearchParams(location.search);
  const n = Math.min(7, Math.max(1, parseInt(params.get("n") || "1", 10)));
  const lesson = LESSONS.find(l => l.n === n);
  if (!lesson) return;

  document.title = `Lesson ${lesson.n} · ${lesson.title} — AliceCode Level 4`;

  const head = document.getElementById("lesson-head");
  const stageWrap = document.querySelector(".stage-wrap");
  const below = document.getElementById("below");

  /* ---------- lock gate ---------- */
  const locks = await loadLocks();
  const locked = lessonLocked(locks, n);
  if (locked && !canView()) {
    head.innerHTML = `<div class="badge">Lesson ${lesson.n} of 7</div><h1>🔒 Not yet!</h1>`;
    stageWrap.style.display = "none";
    below.innerHTML = `
      <div class="card lock-screen">
        <span class="big-lock">🔒</span>
        <h2>This lesson is still locked</h2>
        <p class="muted" style="max-width:420px;margin:10px auto 18px">It unlocks when we get there in class — no spoilers. 😉 Check the calendar to see when.</p>
        <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:18px">
          <input type="password" id="magic-pass" placeholder="Magic password 🪄" autocomplete="off"
                 style="padding:12px 16px; border:2px solid #E8DCF0; border-radius:14px; font-family:var(--font-body); font-weight:600; outline:none; width:210px">
          <button class="btn small" id="magic-btn">Unlock</button>
        </div>
        <p class="admin-status err" id="magic-status" style="text-align:center"></p>
        <a class="btn ghost dark" style="border-color:var(--pink);color:var(--pink);box-shadow:none" href="calendar.html">🗓️ Calendar</a>
        <a class="btn ghost dark" style="border-color:var(--pink);color:var(--pink);box-shadow:none" href="lessons.html">← All lessons</a>
      </div>`;
    const tryIt = () => {
      if (tryPassword(document.getElementById("magic-pass").value)) location.reload();
      else document.getElementById("magic-status").textContent = "Hmm, that's not it. Ask your instructor. 😉";
    };
    document.getElementById("magic-btn").addEventListener("click", tryIt);
    document.getElementById("magic-pass").addEventListener("keydown", e => { if (e.key === "Enter") tryIt(); });
    return;
  }

  /* ---------- header ---------- */
  head.innerHTML = `
    <div class="badge">Lesson ${lesson.n} of 7 · Thursday ${lesson.date}${locked ? ' · <b>🔒 locked for students</b>' : ""}</div>
    <h1>${lesson.emoji} ${lesson.title}</h1>
    <p class="sub">${lesson.project}</p>
    <div style="margin-top:14px; display:flex; gap:10px; justify-content:center; flex-wrap:wrap">
      <button class="btn small" id="flow-btn">📋 Today's flow</button>
      <button class="btn small dark" id="fs-btn">⛶ Fullscreen</button>
      <button class="btn small ghost" style="box-shadow:none" id="pptx-btn">⬇️ PowerPoint</button>
    </div>`;

  document.getElementById("flow-btn").addEventListener("click", () => openFlowModal(n));
  document.getElementById("pptx-btn").addEventListener("click", async function () {
    this.disabled = true; const was = this.textContent; this.textContent = "⏳ Building…";
    try { await downloadPPTX(n); this.textContent = "✅ Downloaded!"; }
    catch (e) { this.textContent = "⚠️ Try again"; console.error(e); }
    setTimeout(() => { this.textContent = was; this.disabled = false; }, 2500);
  });

  /* ---------- build slides ---------- */
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const colorClass = c => "c-" + (c || "pink");

  /* visual slot (Upgrade B): real image if it exists, else placeholder */
  function visualHTML(title) {
    const v = (typeof VISUALS !== "undefined") && VISUALS[n] && VISUALS[n][title];
    if (!v) return "";
    const src = `assets/lesson-${n}/${v.id}.png`;
    const ph = canView()
      ? `<div class="s-vis-ph"><b>🎨 Visual placeholder · ${v.id}</b>
           <span>${esc(VISUAL_STYLE)} ${esc(v.prompt)}</span>
           <i>Generate with Gemini → upload as <code>${src}</code> (GitHub → Add file → Upload files inside that folder)</i></div>`
      : `<div class="s-vis-chip">🎨 illustration coming soon</div>`;
    return `<div class="s-visual"><img src="${src}" alt="" loading="lazy"
      onerror="this.closest('.s-visual').classList.add('missing')">${ph}</div>`;
  }

  function slideHTML(s) {
    if (s.kind === "title") return `
      <div class="brace-art">{ }</div>
      <h1>${esc(s.title)}</h1>
      <div class="sub">${esc(s.sub || "")}</div>`;
    if (s.kind === "section") return `
      <h1>${esc(s.title)}</h1>
      <div class="sub">${esc(s.sub || "")}</div>`;
    if (s.kind === "lab") return `
      <h2 class="s-title">${esc(s.title)}</h2>
      ${s.sub ? `<div class="s-lead">${esc(s.sub)}</div>` : ""}
      <div class="lab-embed"></div>`;
    if (s.kind === "demo") return `
      <h2 class="s-title">${esc(s.title)}</h2>
      ${s.sub ? `<div class="s-lead">${esc(s.sub)}</div>` : ""}
      <div class="demo-embed" data-demo="${esc(s.demo)}"></div>`;
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
    const parts = (s.items || []).map(it => {
      if (it.lines) return `<ul class="s-lines">${it.lines.map(l => `<li>${esc(l)}</li>`).join("")}</ul>`;
      if (it.cards) return `<div class="s-cards">${it.cards.map(c => `
        <div class="s-card ${colorClass(c.color)}"><h4>${esc(c.h)}</h4><p>${c.lines.map(esc).join("<br>")}</p></div>`).join("")}</div>`;
      if (it.links) return `<div class="s-links">${it.links.map(c => `
        <a class="s-card s-link ${colorClass(c.color)}" href="${c.url}" target="_blank" rel="noopener">
          <h4>${esc(c.h)}</h4><p>${esc(c.text)}</p>
          <span class="s-link-url">${esc(c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))} ↗</span></a>`).join("")}</div>`;
      if (it.note) return `<div class="s-note">${esc(it.note)}</div>`;
      if (it.code) return `<div class="s-code">${it.code.map(esc).join("\n")}</div>`;
      if (it.rows) return `<table class="s-rows">${it.rows.map(r => `
        <tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</table>`;
      return "";
    }).join("");
    return `
      <h2 class="s-title">${esc(s.title)}</h2>
      ${s.lead ? `<div class="s-lead">${esc(s.lead)}</div>` : ""}
      ${(() => {
        const vis = visualHTML(s.title);
        if (!vis) return `<div class="s-body">${parts}</div>`;
        /* text-only slides put the picture beside the text; card slides stack it on top */
        const row = !(s.items || []).some(it => it.cards || it.code || it.rows || it.links);
        return row ? `<div class="s-body vis-row">${vis}<div class="s-col">${parts}</div></div>`
                   : `<div class="s-body vis-top">${vis}${parts}</div>`;
      })()}`;
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
    slides[cur].dispatchEvent(new CustomEvent("slide-on")); // live demos replay when shown
  }
  document.getElementById("prev").onclick = () => go(cur - 1);
  document.getElementById("next").onclick = () => go(cur + 1);
  dots.onclick = e => { if (e.target.dataset.i) go(+e.target.dataset.i); };
  document.addEventListener("keydown", e => {
    if (e.target.closest && e.target.closest("textarea, input")) return; // typing in the Lab
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(cur + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(cur - 1); }
    if (e.key === "f" || e.key === "F") toggleFS();
  });
  stage.addEventListener("click", e => {
    if (e.target.closest("a, .lab-embed, .demo-embed, button, textarea, input")) return;
    go(cur + 1);
  });

  /* lab slides: init the playground inside the deck */
  stage.querySelectorAll(".slide.k-lab .lab-embed").forEach(el => {
    if (typeof initButtonLab === "function") initButtonLab(el, n, true);
  });

  /* demo slides: live widgets (demos.js) */
  stage.querySelectorAll(".slide.k-demo .demo-embed").forEach(el => {
    const make = (typeof DEMOS !== "undefined") && DEMOS[el.dataset.demo];
    if (make) make(el);
  });

  /* swipe */
  let tx = null, ty = null;
  stage.addEventListener("touchstart", e => {
    tx = e.touches[0].clientX; ty = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1));
    tx = ty = null;
  }, { passive: true });

  /* fullscreen */
  function toggleFS() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stageWrap.requestFullscreen) stageWrap.requestFullscreen();
    else stageWrap.webkitRequestFullscreen && stageWrap.webkitRequestFullscreen();
  }
  document.getElementById("fs-btn").addEventListener("click", toggleFS);
  go(0);

  /* ---------- below the deck ---------- */
  const flow = FLOWS[n];
  const hasLab = (typeof LAB_PRESETS !== "undefined") && LAB_PRESETS[n];
  below.innerHTML = `
    ${hasLab ? `<div class="card reveal lab-card" id="button-lab"></div>` : ""}`;
  below.innerHTML += `
    <div class="card reveal">
      <h2>🎯 Today's goal</h2>
      <p>${esc(lesson.goal)}</p>
      <p style="margin-top:8px"><strong class="pink">You leave with:</strong> ${esc(lesson.leaves)}</p>
      ${flow ? `<button class="btn small" style="margin-top:14px" onclick="openFlowModal(${n})">📋 See today's full flow</button>` : ""}
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
  if (hasLab) initButtonLab(document.getElementById("button-lab"), n);
  if (window.armReveal) window.armReveal();
})();
