/* AliceCode Level 4 — export a lesson's web deck to a real .pptx
   v2: built on the OFFICIAL AliceCode template (Yan's שלד מצגת, 18.10):
   - title/section slides on the template gradient (tpl-title.jpg)
   - content slides on the template frame + white card (tpl-content.png)
   - lavender boxes + template typography inside the card */

async function downloadPPTX(n) {
  const lesson = LESSONS.find(l => l.n === n);
  if (!lesson) throw new Error("no lesson");

  if (!window.PptxGenJS) {
    const load = src => new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    await load("pptxgen.bundle.js").catch(() =>
      load("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"));
    if (!window.PptxGenJS) throw new Error("could not load pptx library");
  }

  /* template palette */
  const INK = "241436",        // near-black purple (template titles)
        PURPLE = "43317E",     // body text in lavender boxes
        LAV = "E5DBFD",        // template lavender box
        PINK = "D83474", SOFT = "EFA6C3",
        MINT = "2FB380", ORANGE = "F2842C", RED = "E04F5F",
        DARKBG = "241436", CODE_FG = "EDE4FA", NOTE_BG = "FBE9F2";
  const HEAD_COLORS = { pink: PINK, orange: ORANGE, green: MINT, red: RED, purple: "674C9B", dark: INK };

  const W = 10, H = 5.625;
  /* white card area of tpl-content.png */
  const CARD = { x: 0.42, y: 0.38, w: 9.16, h: 4.82 };
  const MX = CARD.x + 0.33, CW = CARD.w - 0.66;           // inner margins
  const BODY_TOP = CARD.y + 0.78, BODY_BOT = CARD.y + CARD.h - 0.18;
  const HEAD = "Arial", BODY = "Arial", MONO = "Courier New";

  /* Upgrade B: embed generated visuals when the image file exists */
  const visMap = (typeof VISUALS !== "undefined" && VISUALS[n]) || {};
  const visOk = {};
  await Promise.all(Object.entries(visMap).map(async ([title, v]) => {
    const p = `assets/lesson-${n}/${v.id}.png`;
    try { const r = await fetch(p, { method: "HEAD" }); if (r.ok) visOk[title] = p; } catch (e) {}
  }));

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: W, height: H });
  pptx.layout = "WIDE";
  pptx.author = "AliceCode Level 4";
  pptx.title = `Lesson ${lesson.n} · ${lesson.title}`;

  const join = a => (a || []).join("\n");

  /* the white {Alice code} badge, top-right, like the template */
  function badge(s) {
    s.addShape("roundRect", { x: W - 1.95, y: 0.22, w: 1.7, h: 0.5, rectRadius: 0.24, fill: { color: "FFFFFF" } });
    s.addText([
      { text: "★ ", options: { color: PINK, fontSize: 8 } },
      { text: "{", options: { color: PINK, bold: true, fontSize: 14 } },
      { text: "Alice code", options: { color: INK, bold: true, fontSize: 11 } },
      { text: "}", options: { color: PINK, bold: true, fontSize: 14 } }
    ], { x: W - 1.95, y: 0.22, w: 1.7, h: 0.5, align: "center", valign: "middle", fontFace: HEAD });
  }

  function titleSlide(sl) {
    const s = pptx.addSlide();
    s.background = { path: "tpl-title.jpg" };
    badge(s);
    /* left meta column (template style) */
    const m = (sl.sub || "").split("·").map(t => t.trim());
    s.addText(lesson.date, { x: 0.55, y: 1.9, w: 2.9, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 16, color: "FFFFFF" });
    s.addText(`${lesson.project}`, { x: 0.45, y: 2.32, w: 3.1, h: 0.6, align: "center", fontFace: BODY, fontSize: 11.5, color: "FFFFFF" });
    s.addText(`Lesson ${lesson.n} of 7 · Thursday`, { x: 0.45, y: 2.9, w: 3.1, h: 0.35, align: "center", fontFace: BODY, fontSize: 11, color: "FFFFFF" });
    /* big title right */
    s.addText(sl.title.replace(/^Lesson \d+ · /, `Lesson ${lesson.n} ·\n`), {
      x: 3.8, y: 1.2, w: 5.9, h: 3.2, align: "center", valign: "middle",
      fontFace: HEAD, bold: true, fontSize: 30, color: "FFFFFF", lineSpacingMultiple: 1.05
    });
  }

  function sectionSlide(sl) {
    const s = pptx.addSlide();
    s.background = { path: "tpl-title.jpg" };
    badge(s);
    s.addText(sl.title, { x: 0.7, y: 1.6, w: W - 1.4, h: 1.4, align: "center", valign: "middle", fontFace: HEAD, bold: true, fontSize: 32, color: "FFFFFF" });
    if (sl.sub) s.addText(sl.sub, { x: 1, y: 3.1, w: W - 2, h: 0.8, align: "center", fontFace: BODY, fontSize: 15, color: "FFFFFF" });
  }

  function contentBase(title) {
    const s = pptx.addSlide();
    s.background = { path: "tpl-content.png" };
    s.addText(title, { x: CARD.x + 0.2, y: CARD.y + 0.1, w: CARD.w - 0.4, h: 0.55, align: "center", fontFace: HEAD, bold: true, fontSize: 21, color: INK });
    return s;
  }

  function itemHeight(it) {
    if (it.lines) return it.lines.length * 0.33 + 0.26;
    if (it.cards) return 1.5;
    if (it.note) return 0.52;
    if (it.code) return it.code.length * 0.23 + 0.28;
    if (it.rows) return it.rows.length * 0.31 + 0.08;
    return 0;
  }

  function addItems(s, items, y0) {
    let y = y0;
    const avail = BODY_BOT - y0;
    const total = (items || []).reduce((a, it) => a + itemHeight(it) + 0.16, 0);
    const k = total > avail ? avail / total : 1;

    (items || []).forEach(it => {
      const h = itemHeight(it) * k;
      if (it.lines) {
        /* template lavender box */
        s.addShape("roundRect", { x: MX, y, w: CW, h, rectRadius: 0.09, fill: { color: LAV } });
        s.addText(it.lines.map(t => ({ text: t, options: { breakLine: true } })),
          { x: MX + 0.25, y: y + 0.08, w: CW - 0.5, h: h - 0.16, fontFace: BODY,
            fontSize: Math.max(11, Math.round(13.5 * Math.min(1, k + 0.1))), color: PURPLE, valign: "middle", lineSpacingMultiple: 1.18 });
      } else if (it.cards) {
        const gap = 0.16, cw = (CW - gap * (it.cards.length - 1)) / it.cards.length;
        it.cards.forEach((c, i) => {
          const cx = MX + i * (cw + gap), col = HEAD_COLORS[c.color || "pink"];
          s.addShape("roundRect", { x: cx, y, w: cw, h, rectRadius: 0.09, fill: { color: LAV } });
          s.addText(c.h, { x: cx + 0.05, y: y + 0.07, w: cw - 0.1, h: 0.32, align: "center", fontFace: HEAD, bold: true, fontSize: 11.5, color: col });
          s.addText(join(c.lines), { x: cx + 0.08, y: y + 0.4, w: cw - 0.16, h: h - 0.48, align: "center", valign: "top", fontFace: BODY, fontSize: 10, color: PURPLE, lineSpacingMultiple: 1.08 });
        });
      } else if (it.note) {
        s.addShape("roundRect", { x: MX, y, w: CW, h, rectRadius: 0.08, fill: { color: NOTE_BG }, line: { color: PINK, width: 1.25 } });
        s.addText(it.note, { x: MX + 0.18, y, w: CW - 0.36, h, valign: "middle", fontFace: BODY, bold: true, fontSize: 11, color: INK });
      } else if (it.code) {
        s.addShape("roundRect", { x: MX, y, w: CW, h, rectRadius: 0.08, fill: { color: DARKBG } });
        s.addText(join(it.code), { x: MX + 0.2, y: y + 0.07, w: CW - 0.4, h: h - 0.14, fontFace: MONO, fontSize: 10, color: CODE_FG, valign: "top", lineSpacingMultiple: 1.05 });
      } else if (it.rows) {
        s.addTable(it.rows.map(r => ([
          { text: r[0], options: { bold: true, color: PINK, fontFace: HEAD, fontSize: 10 } },
          { text: r[1], options: { color: PURPLE, fontFace: BODY, fontSize: 10 } }
        ])), { x: MX, y, w: CW, colW: [2.1, CW - 2.1], border: { type: "solid", color: "EFE8FA", pt: 0.5 }, fill: { color: "F8F5FE" }, valign: "middle", rowH: 0.29 * k });
      }
      y += h + 0.16 * k;
    });
  }

  lesson.slides.forEach(sl => {
    if (sl.kind === "title") { titleSlide(sl); return; }
    if (sl.kind === "section") { sectionSlide(sl); return; }

    if (sl.kind === "lab") {
      const s = contentBase(sl.title);
      s.addShape("roundRect", { x: MX, y: BODY_TOP + 0.5, w: CW, h: 1.5, rectRadius: 0.1, fill: { color: LAV } });
      s.addText([
        { text: (sl.sub || "Live playground.") + "\n", options: { bold: true } },
        { text: `Open it live: alicecode-level4-hub.vercel.app → Lessons → Lesson ${lesson.n}`, options: {} }
      ], { x: MX + 0.3, y: BODY_TOP + 0.5, w: CW - 0.6, h: 1.5, align: "center", valign: "middle", fontFace: BODY, fontSize: 14, color: PURPLE, lineSpacingMultiple: 1.3 });
      s.addText("🧪 This one happens in the browser, not on a slide.", { x: MX, y: BODY_TOP + 2.3, w: CW, h: 0.4, align: "center", fontFace: BODY, bold: true, fontSize: 12, color: PINK });
      return;
    }
    if (sl.kind === "newword") {
      const s = pptx.addSlide();
      s.background = { path: "tpl-content.png" };
      s.addText("✨ NEW WORD ✨", { x: CARD.x, y: CARD.y + 0.5, w: CARD.w, h: 0.35, align: "center", fontFace: HEAD, bold: true, fontSize: 12, color: PINK, charSpacing: 4 });
      s.addText(sl.term, { x: CARD.x, y: CARD.y + 1.0, w: CARD.w, h: 0.9, align: "center", fontFace: MONO, bold: true, fontSize: 34, color: INK });
      s.addShape("roundRect", { x: CARD.x + 1.5, y: CARD.y + 2.15, w: CARD.w - 3, h: 1.05, rectRadius: 0.1, fill: { color: LAV } });
      s.addText(sl.meaning, { x: CARD.x + 1.7, y: CARD.y + 2.15, w: CARD.w - 3.4, h: 1.05, align: "center", valign: "middle", fontFace: BODY, bold: true, fontSize: 14, color: PURPLE });
      if (sl.extra) s.addText(sl.extra, { x: CARD.x + 1, y: CARD.y + 3.4, w: CARD.w - 2, h: 0.5, align: "center", fontFace: BODY, fontSize: 11.5, color: "6B5590" });
      return;
    }

    if (sl.kind === "beforeafter") {
      const s = contentBase(sl.title);
      /* template two-column: left white box w/ colored border, right lavender */
      const bw = (CW - 0.7) / 2, by = BODY_TOP + 0.05, bh = sl.note ? 2.5 : 3.1;
      s.addShape("roundRect", { x: MX, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: "FFFFFF" }, line: { color: RED, width: 1.5 } });
      s.addText("BEFORE 😖", { x: MX, y: by + 0.1, w: bw, h: 0.35, align: "center", fontFace: HEAD, bold: true, fontSize: 12.5, color: RED });
      s.addText(join(sl.before), { x: MX + 0.15, y: by + 0.5, w: bw - 0.3, h: bh - 0.65, align: "center", fontFace: BODY, fontSize: 11.5, color: PURPLE, lineSpacingMultiple: 1.2 });
      s.addText("➜", { x: W / 2 - 0.3, y: by + bh / 2 - 0.3, w: 0.6, h: 0.6, align: "center", fontFace: HEAD, bold: true, fontSize: 24, color: PINK });
      const ax = MX + bw + 0.7;
      s.addShape("roundRect", { x: ax, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: LAV }, line: { color: MINT, width: 1.5 } });
      s.addText("AFTER 🎉", { x: ax, y: by + 0.1, w: bw, h: 0.35, align: "center", fontFace: HEAD, bold: true, fontSize: 12.5, color: MINT });
      s.addText(join(sl.after), { x: ax + 0.15, y: by + 0.5, w: bw - 0.3, h: bh - 0.65, align: "center", fontFace: BODY, fontSize: 11.5, color: PURPLE, lineSpacingMultiple: 1.2 });
      if (sl.note) {
        const ny = by + bh + 0.18;
        s.addShape("roundRect", { x: MX, y: ny, w: CW, h: 0.52, rectRadius: 0.08, fill: { color: NOTE_BG }, line: { color: PINK, width: 1.25 } });
        s.addText(sl.note, { x: MX + 0.18, y: ny, w: CW - 0.36, h: 0.52, valign: "middle", fontFace: BODY, bold: true, fontSize: 11, color: INK });
      }
      return;
    }

    /* content */
    const s = contentBase(sl.title);
    let y = BODY_TOP;
    if (sl.lead) {
      s.addText(sl.lead, { x: MX, y: y - 0.2, w: CW, h: 0.32, align: "center", fontFace: BODY, bold: true, fontSize: 12, color: PINK });
      y += 0.26;
    }
    if (visOk[sl.title]) {
      const ih = 1.75, iw = ih * 16 / 9;
      s.addImage({ path: visOk[sl.title], x: (W - iw) / 2, y, w: iw, h: ih });
      y += ih + 0.14;
    }
    addItems(s, sl.items, y);
  });

  const safe = lesson.title.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-");
  await pptx.writeFile({ fileName: `AliceCode-Lesson-${lesson.n}-${safe}.pptx` });
}
