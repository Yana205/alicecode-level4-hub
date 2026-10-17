/* AliceCode Level 4 — export a lesson's web deck to a real .pptx
   Built in the browser with PptxGenJS from the same data as the slides,
   so the download always matches what's on screen. */

async function downloadPPTX(n) {
  const lesson = LESSONS.find(l => l.n === n);
  if (!lesson) throw new Error("no lesson");

  if (!window.PptxGenJS) {
    const load = src => new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    // self-hosted bundle first; CDN as backup
    await load("pptxgen.bundle.js").catch(() =>
      load("https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"));
    if (!window.PptxGenJS) throw new Error("could not load pptx library");
  }

  const INK = "3B1F5C", PINK = "D83474", PURPLE = "674C9B", MAGENTA = "A43F86",
        SOFT = "EFA6C3", DARKBG = "241436", GRAY = "6B5590",
        NOTE_BG = "FBE9F2", CODE_FG = "EDE4FA";
  const CARD_COLORS = { pink: "D83474", orange: "F2842C", green: "2FB380", red: "E04F5F", purple: "674C9B", dark: "3B1F5C" };
  const W = 10, H = 5.625, MX = 0.55, CW = W - 2 * MX;
  const HEAD = "Arial", BODY = "Arial", MONO = "Courier New";

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: W, height: H });
  pptx.layout = "WIDE";
  pptx.author = "AliceCode Level 4";
  pptx.title = `Lesson ${lesson.n} · ${lesson.title}`;

  const join = a => (a || []).join("\n");

  function brandBar(s) { // thin pink bar bottom-left as a brand touch
    s.addShape("rect", { x: 0, y: H - 0.12, w: W, h: 0.12, fill: { color: PINK } });
    s.addText("{Alice code} · Level 4", { x: W - 2.6, y: H - 0.48, w: 2.45, h: 0.3, align: "right", fontFace: BODY, fontSize: 9, color: GRAY });
  }

  function addTitleLike(sl, big) {
    const s = pptx.addSlide();
    s.background = { color: big ? PURPLE : MAGENTA };
    s.addText("{ }", { x: 0, y: 0.55, w: W, h: 0.9, align: "center", fontFace: HEAD, bold: true, fontSize: 40, color: SOFT });
    s.addText(sl.title, { x: 0.4, y: 1.7, w: W - 0.8, h: 1.4, align: "center", valign: "middle", fontFace: HEAD, bold: true, fontSize: big ? 32 : 30, color: "FFFFFF" });
    if (sl.sub) s.addText(sl.sub, { x: 0.6, y: 3.25, w: W - 1.2, h: 0.9, align: "center", fontFace: BODY, fontSize: 16, color: "FFFFFF" });
    s.addShape("rect", { x: 0, y: H - 0.14, w: W, h: 0.14, fill: { color: PINK } });
  }

  function itemHeight(it) {
    if (it.lines) return it.lines.length * 0.34 + 0.1;
    if (it.cards) return 1.55;
    if (it.note) return 0.55;
    if (it.code) return it.code.length * 0.24 + 0.3;
    if (it.rows) return it.rows.length * 0.32 + 0.1;
    return 0;
  }

  function addItems(s, items, y0) {
    let y = y0;
    const bottom = H - 0.35;
    const total = (items || []).reduce((a, it) => a + itemHeight(it) + 0.18, 0);
    const squeeze = total > (bottom - y0) ? (bottom - y0) / total : 1;

    (items || []).forEach(it => {
      const h = itemHeight(it) * squeeze;
      if (it.lines) {
        s.addText(it.lines.map(t => ({ text: t, options: { bullet: { code: "25B8", indent: 14 }, color: INK, breakLine: true } })),
          { x: MX + 0.1, y, w: CW - 0.2, h, fontFace: BODY, fontSize: Math.round(14 * Math.min(1, squeeze + 0.15)), bold: false, lineSpacingMultiple: 1.12, valign: "top" });
      } else if (it.cards) {
        const gap = 0.18, cw = (CW - gap * (it.cards.length - 1)) / it.cards.length;
        it.cards.forEach((c, i) => {
          const cx = MX + i * (cw + gap), col = CARD_COLORS[c.color || "pink"];
          s.addShape("roundRect", { x: cx, y, w: cw, h, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: col, width: 2 } });
          s.addText(c.h, { x: cx + 0.06, y: y + 0.06, w: cw - 0.12, h: 0.34, align: "center", fontFace: HEAD, bold: true, fontSize: 12, color: col });
          s.addText(join(c.lines), { x: cx + 0.08, y: y + 0.42, w: cw - 0.16, h: h - 0.5, align: "center", valign: "top", fontFace: BODY, fontSize: 10.5, color: INK, lineSpacingMultiple: 1.05 });
        });
      } else if (it.note) {
        s.addShape("roundRect", { x: MX, y, w: CW, h, rectRadius: 0.06, fill: { color: NOTE_BG }, line: { color: PINK, width: 1.5 } });
        s.addText(it.note, { x: MX + 0.15, y, w: CW - 0.3, h, valign: "middle", fontFace: BODY, bold: true, fontSize: 11.5, color: INK });
      } else if (it.code) {
        s.addShape("roundRect", { x: MX, y, w: CW, h, rectRadius: 0.06, fill: { color: DARKBG } });
        s.addText(join(it.code), { x: MX + 0.2, y: y + 0.08, w: CW - 0.4, h: h - 0.16, fontFace: MONO, fontSize: 10.5, color: CODE_FG, valign: "top", lineSpacingMultiple: 1.05 });
      } else if (it.rows) {
        s.addTable(it.rows.map(r => ([
          { text: r[0], options: { bold: true, color: PINK, fontFace: HEAD, fontSize: 10.5 } },
          { text: r[1], options: { color: INK, fontFace: BODY, fontSize: 10.5 } }
        ])), { x: MX, y, w: CW, colW: [2.3, CW - 2.3], border: { type: "solid", color: "F2E8F5", pt: 0.5 }, valign: "middle", rowH: 0.3 * squeeze });
      }
      y += h + 0.18 * squeeze;
    });
  }

  lesson.slides.forEach(sl => {
    if (sl.kind === "title") { addTitleLike(sl, true); return; }
    if (sl.kind === "section") { addTitleLike(sl, false); return; }

    if (sl.kind === "newword") {
      const s = pptx.addSlide(); s.background = { color: "FFFFFF" };
      s.addText("✨ NEW WORD ✨", { x: 0, y: 0.8, w: W, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 13, color: PINK, charSpacing: 4 });
      s.addText(sl.term, { x: 0, y: 1.5, w: W, h: 1.0, align: "center", fontFace: MONO, bold: true, fontSize: 36, color: INK });
      s.addText(sl.meaning, { x: 1.2, y: 2.7, w: W - 2.4, h: 0.9, align: "center", fontFace: BODY, bold: true, fontSize: 16, color: INK });
      if (sl.extra) s.addText(sl.extra, { x: 1.2, y: 3.7, w: W - 2.4, h: 0.6, align: "center", fontFace: BODY, fontSize: 12.5, color: GRAY });
      brandBar(s); return;
    }

    if (sl.kind === "beforeafter") {
      const s = pptx.addSlide(); s.background = { color: "FFFFFF" };
      s.addText(sl.title, { x: MX, y: 0.3, w: CW, h: 0.55, fontFace: HEAD, bold: true, fontSize: 24, color: INK });
      const bw = 3.9, by = 1.15, bh = 2.6;
      s.addShape("roundRect", { x: MX, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: "FDEEEF" }, line: { color: "E04F5F", width: 2 } });
      s.addText("BEFORE 😖", { x: MX, y: by + 0.12, w: bw, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 14, color: "E04F5F" });
      s.addText(join(sl.before), { x: MX + 0.15, y: by + 0.6, w: bw - 0.3, h: bh - 0.75, align: "center", fontFace: BODY, bold: true, fontSize: 12.5, color: INK, lineSpacingMultiple: 1.15 });
      s.addText("➜", { x: W / 2 - 0.4, y: by + bh / 2 - 0.35, w: 0.8, h: 0.7, align: "center", fontFace: HEAD, bold: true, fontSize: 30, color: PINK });
      const ax = W - MX - bw;
      s.addShape("roundRect", { x: ax, y: by, w: bw, h: bh, rectRadius: 0.1, fill: { color: "EAF7F1" }, line: { color: "2FB380", width: 2 } });
      s.addText("AFTER 🎉", { x: ax, y: by + 0.12, w: bw, h: 0.4, align: "center", fontFace: HEAD, bold: true, fontSize: 14, color: "2FB380" });
      s.addText(join(sl.after), { x: ax + 0.15, y: by + 0.6, w: bw - 0.3, h: bh - 0.75, align: "center", fontFace: BODY, bold: true, fontSize: 12.5, color: INK, lineSpacingMultiple: 1.15 });
      if (sl.note) {
        s.addShape("roundRect", { x: MX, y: 4.1, w: CW, h: 0.6, rectRadius: 0.06, fill: { color: NOTE_BG }, line: { color: PINK, width: 1.5 } });
        s.addText(sl.note, { x: MX + 0.15, y: 4.1, w: CW - 0.3, h: 0.6, valign: "middle", fontFace: BODY, bold: true, fontSize: 11.5, color: INK });
      }
      brandBar(s); return;
    }

    /* content */
    const s = pptx.addSlide(); s.background = { color: "FFFFFF" };
    s.addText(sl.title, { x: MX, y: 0.3, w: CW, h: 0.55, fontFace: HEAD, bold: true, fontSize: 24, color: INK });
    let y = 0.98;
    if (sl.lead) {
      s.addText(sl.lead, { x: MX, y, w: CW, h: 0.35, fontFace: BODY, bold: true, fontSize: 13, color: PINK });
      y += 0.45;
    }
    addItems(s, sl.items, y + 0.1);
    brandBar(s);
  });

  const safe = lesson.title.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-");
  await pptx.writeFile({ fileName: `AliceCode-Lesson-${lesson.n}-${safe}.pptx` });
}
