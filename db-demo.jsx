/* AliceCode Level 4 — "Variables vs. Database" slide components (React + Tailwind)

   <VariablesForget />  BEFORE: app UI + RAM editor. Refresh = glitch, everything wiped.
   <MongoRemembers />   AFTER:  app UI + backend code + MongoDB Atlas view.
                        Add = a beam shoots app → database. Refresh = blank, "Fetching…",
                        the data beams back and the list refills.

   Plain React state drives the flow. The "database" is its own state that survives
   the fake refresh. If the site's /api/tasks has a real MongoDB behind it
   (MONGODB_URI on Vercel) the After slide uses it and says "live";
   otherwise it simulates the database in this browser and says "demo".

   Runs in-browser via db-demo.html (React UMD + Babel standalone).
   In a bundled React app: `import { useState, useEffect, useRef } from "react"`
   instead of the line below, and export the two components. */

const { useState, useEffect, useRef } = React;

/* ---------------- helpers ---------------- */
const wait = ms => new Promise(r => setTimeout(r, ms));
const reducedMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const HINTS = ["Finish homework", "Feed cat", "Practice the dance", "Text grandma 💜"];

/* the database: real MongoDB through /api/tasks, or simulated in this browser */
const LOCAL_KEY = "ac4-demo-tasks";
const store = {
  mode: "demo",
  mem: [],
  save() { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(this.mem)); } catch (e) {} },
  async init() {
    try {
      const r = await fetch("api/tasks", { cache: "no-store" });
      if (r.ok && (r.headers.get("content-type") || "").includes("json")) {
        const j = await r.json();
        if (j.ok) { this.mode = "live"; return j.docs; }
      }
    } catch (e) {}
    try { this.mem = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); } catch (e) { this.mem = []; }
    return this.mem.slice();
  },
  async find() {
    if (this.mode === "live") return (await (await fetch("api/tasks", { cache: "no-store" })).json()).docs || [];
    return this.mem.slice();
  },
  async insertOne(text) {
    if (this.mode === "live") {
      const r = await fetch("api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "Could not save");
      return j.doc;
    }
    const hex = n => Array.from({ length: n }, () => "0123456789abcdef"[Math.random() * 16 | 0]).join("");
    const doc = { _id: (Date.now() / 1000 | 0).toString(16) + hex(16), text, done: false, createdAt: new Date().toISOString() };
    this.mem.push(doc); this.save();
    return doc;
  },
  async deleteOne(id) {
    if (this.mode === "live") { await fetch(`api/tasks?id=${encodeURIComponent(id)}`, { method: "DELETE" }); return; }
    this.mem = id === "all" ? [] : this.mem.filter(d => d._id !== id); this.save();
  }
};

/* ---------------- shared pieces ---------------- */

function Editor({ file, note, children, className = "", size = "text-[.85rem] leading-relaxed" }) {
  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-2xl bg-ac-code shadow-xl ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#37204F] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E04F5F]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2FB380]" />
        <span className="ml-2 truncate font-mono text-[.8rem] text-[#C9B6E4]">{file}</span>
        {note && <span className="ml-auto whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[.7rem] font-bold text-[#C9B6E4]">{note}</span>}
      </div>
      <div className={`min-h-0 flex-1 overflow-auto p-3 font-mono text-[#EDE4FA] ${size}`}>{children}</div>
    </div>
  );
}
const K = ({ children }) => <span className="text-[#FF79A8]">{children}</span>;   // keyword
const F = ({ children }) => <span className="text-[#FFD166]">{children}</span>;   // function
const S = ({ children }) => <span className="text-[#9FF0C8]">{children}</span>;   // string
const C = ({ children }) => <span className="italic text-[#8E7BB0]">{children}</span>; // comment

function TodoApp({ appRef, tasks, onAdd, onRemove, onRefresh, refreshStyle, badge, dim, overlay, busy }) {
  const [text, setText] = useState("");
  const hint = HINTS[tasks.length % HINTS.length];
  const add = () => { const t = (text.trim() || hint).slice(0, 60); setText(""); onAdd(t); };
  return (
    <div ref={appRef} className="relative flex min-h-0 flex-col gap-2 rounded-2xl border-[2.5px] border-ac-soft bg-white p-3 shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <span className="font-head text-[1.15rem] font-extrabold">📝 My To-Do</span>
        {badge}
      </div>
      <div className="flex gap-2">
        <input
          value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && add()}
          placeholder={hint} maxLength={60} aria-label="New task"
          className="min-w-0 flex-1 rounded-xl border-2 border-[#E8DCF0] px-3 py-1.5 font-bold outline-none focus:border-ac-pink"
        />
        <button onClick={add} disabled={busy}
          className="whitespace-nowrap rounded-full bg-ac-pink px-4 py-1.5 font-extrabold text-white shadow-md shadow-ac-pink/40 transition hover:scale-105 disabled:opacity-50">
          + Add Task
        </button>
      </div>
      <ul className={`flex min-h-0 flex-1 flex-col gap-1.5 overflow-auto transition-opacity duration-300 ${dim ? "opacity-0" : ""}`}>
        {tasks.length === 0 && <li className="py-3 text-center font-bold text-[#B9AFC9]">No tasks yet — add one!</li>}
        {tasks.map((t, i) => (
          <li key={t._id || `${i}-${t.text}`} className="flex animate-pop items-center gap-2 rounded-xl bg-ac-lav px-3 py-1.5 font-bold">
            <span className="text-ac-pink">☐</span>
            <span className="flex-1 truncate">{t.text}</span>
            {onRemove && t._id && (
              <button onClick={() => onRemove(t._id)} aria-label={`Delete ${t.text}`} className="font-extrabold text-[#B9AFC9] hover:text-ac-red">✕</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={onRefresh} disabled={busy}
        className={`rounded-2xl py-2.5 font-head text-[1.15rem] font-extrabold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60 ${refreshStyle}`}>
        🔄 Refresh Page
      </button>
      {overlay && <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl">{overlay}</div>}
    </div>
  );
}

/* ================================================================
   Component 1 — BEFORE: Variables Forget
   ================================================================ */
function VariablesForget() {
  const [tasks, setTasks] = useState([]);       // the variable in RAM
  const [phase, setPhase] = useState("idle");   // idle | glitch | gone
  const [freshAt, setFreshAt] = useState(-1);

  const add = text => { setFreshAt(tasks.length); setTasks(t => [...t, { text }]); };

  const refresh = async () => {
    if (phase !== "idle") return;
    const had = tasks.length > 0;
    setPhase("glitch");
    await wait(reducedMotion() ? 150 : 650);
    setTasks([]);                              // the page starts over: RAM is empty again
    setFreshAt(-1);
    if (!had) { setPhase("idle"); return; }
    setPhase("gone");
    await wait(2400);
    setPhase("idle");
  };

  return (
    <div className={`relative grid h-full min-h-0 grid-cols-1 gap-3 md:grid-cols-2 ${phase === "glitch" ? "animate-glitch motion-reduce-none" : ""} ${phase === "gone" ? "animate-shake motion-reduce-none" : ""}`}>
      <TodoApp
        tasks={tasks} onAdd={add} onRefresh={refresh} busy={phase !== "idle"}
        refreshStyle="bg-gradient-to-br from-[#FF5A6E] to-[#D7263D] shadow-[#D7263D]/40"
        overlay={phase === "gone" && (
          <div className="animate-pop rounded-2xl bg-white/95 px-5 py-2 text-center font-head text-[2rem] font-extrabold text-ac-red shadow-xl">
            😱 Oh no!<div className="font-body text-[.85rem] text-ac-ink">The page restarted. Everything is gone.</div>
          </div>
        )}
      />

      <Editor file="app.js" note="🧠 RAM · a plain variable">
        <div><K>let</K> tasks = [{tasks.length === 0 && "];"}</div>
        {tasks.map((t, i) => (
          <div key={i} className={`pl-5 ${i === freshAt ? "animate-pop rounded bg-[#FF79A8]/20" : ""}`}>
            <S>"{t.text}"</S>{i < tasks.length - 1 ? "," : ""}
          </div>
        ))}
        {tasks.length > 0 && <div>];</div>}
        <div className="mt-3">
          {phase === "gone"
            ? <C>// 💨 memory wiped — the page started over</C>
            : <C>// lives in RAM. Refresh = gone.</C>}
        </div>
      </Editor>

      {phase === "glitch" && (
        <div className="scanlines pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-2xl">
          <span className="rgb-split font-mono text-[2.2rem] font-bold tracking-widest text-white">RELOADING…</span>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   Component 2 — AFTER: MongoDB Remembers
   ================================================================ */

/* a glowing dot that shoots along a curve from one panel to another */
function Beam({ d, color }) {
  return (
    <g style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d={d} pathLength="1" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" className="beam-line" />
      <circle r="7" fill="#fff" stroke={color} strokeWidth="3">
        <animateMotion dur="0.6s" fill="freeze" path={d} />
        <animate attributeName="opacity" from="1" to="0" begin="0.6s" dur="0.4s" fill="freeze" />
      </circle>
    </g>
  );
}

function BackendCode({ lastText, hot }) {
  const block = on => `-mx-1 rounded-lg px-1 transition ${on ? "animate-glow bg-[#FF79A8]/15" : ""}`;
  return (
    <Editor file="server.js" note="⚙️ backend" size="text-[.7rem] leading-snug">
      <div><C>// 1 · Add Task → save it</C></div>
      <div className={block(hot === "insert")}>
        <div>app.<F>post</F>(<S>'/tasks'</S>, <K>async</K> (req, res) =&gt; {"{"}</div>
        <div className="pl-4"><K>await</K> db.<F>collection</F>(<S>'tasks'</S>)</div>
        <div className="pl-8">.<F>insertOne</F>({"{"}</div>
        <div className="pl-12">text: <S>"{lastText}"</S>,</div>
        <div className="pl-12">done: <span className="text-[#FFB86C]">false</span></div>
        <div className="pl-8">{"}"});</div>
        <div>{"}"});</div>
      </div>
      <div className="mt-2"><C>// 2 · Page loads → read them back</C></div>
      <div className={block(hot === "find")}>
        <div>app.<F>get</F>(<S>'/tasks'</S>, <K>async</K> (req, res) =&gt; {"{"}</div>
        <div className="pl-4"><K>const</K> tasks = <K>await</K> db</div>
        <div className="pl-8">.<F>collection</F>(<S>'tasks'</S>).<F>find</F>()</div>
        <div className="pl-8">.<F>toArray</F>();</div>
        <div className="pl-4">res.<F>json</F>(tasks);</div>
        <div>{"}"});</div>
      </div>
    </Editor>
  );
}

function AtlasPanel({ dbRef, docs, freshId, onClear }) {
  const [view, setView] = useState("json");
  const listRef = useRef(null);
  useEffect(() => { if (freshId && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [freshId]);
  const tab = on => `pb-1 ${on ? "border-b-[3px] border-atlas-leaf text-atlas-green" : ""}`;
  const shortDate = d => String(d).replace(/\.\d+Z$/, "Z");
  return (
    <div ref={dbRef} className="flex min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-[#C1E7D0] bg-white shadow-lg">
      <div className="flex flex-wrap items-center gap-2 bg-atlas-bg px-3 py-2 text-white">
        <span>🍃</span><b className="text-atlas-leaf">MongoDB Atlas</b>
        <span className="text-[.8rem] text-[#C1C7C6]">alicecode › <b className="text-white">tasks</b></span>
      </div>
      <div className="flex items-end gap-4 border-b border-atlas-line px-3 pt-2 text-[.8rem] font-bold text-[#889397]">
        <button className={tab(view === "json")} onClick={() => setView("json")}>{"{ }"} Documents</button>
        <button className={tab(view === "table")} onClick={() => setView("table")}>▦ Table</button>
      </div>
      <div className="flex items-center justify-between px-3 py-1.5 text-[.72rem] font-extrabold tracking-wide text-[#5C6C75]">
        <span>QUERY RESULTS: {docs.length ? `1-${docs.length} OF ${docs.length}` : "0"}</span>
        <button onClick={onClear} title="Delete all documents" className="rounded-lg border border-atlas-line px-2 font-bold hover:bg-[#F9FBFA]">🧹 clear</button>
      </div>
      <div ref={listRef} className="min-h-0 flex-1 overflow-auto px-2.5 pb-2.5">
        {docs.length === 0 && <div className="py-6 text-center font-bold text-[#889397]">No documents yet.</div>}
        {view === "json" ? (
          <div className="flex flex-col gap-1.5">
            {docs.map(d => (
              <div key={d._id} className={`rounded-xl border border-atlas-line bg-[#F9FBFA] px-2.5 py-1.5 font-mono text-[.76rem] leading-normal text-atlas-bg ${d._id === freshId ? "animate-landed" : ""}`}>
                <div className="break-all"><span className="text-atlas-blue">_id</span>: <span className="text-atlas-green">ObjectId('{d._id}')</span></div>
                <div><span className="text-atlas-blue">text</span>: <span className="text-[#12924F]">"{d.text}"</span></div>
                <div><span className="text-atlas-blue">done</span>: <span className="text-atlas-purple">{d.done ? "true" : "false"}</span></div>
                <div><span className="text-atlas-blue">createdAt</span>: <span className="text-atlas-purple">{shortDate(d.createdAt)}</span></div>
              </div>
            ))}
          </div>
        ) : docs.length > 0 && (
          <table className="w-full border-collapse font-mono text-[.74rem]">
            <thead>
              <tr className="text-left text-[#5C6C75]">
                <th className="border-b border-atlas-line py-1 pr-2">_id</th>
                <th className="border-b border-atlas-line py-1 pr-2">text</th>
                <th className="border-b border-atlas-line py-1">done</th>
              </tr>
            </thead>
            <tbody>
              {docs.map(d => (
                <tr key={d._id} className={d._id === freshId ? "animate-landed" : ""}>
                  <td className="border-b border-atlas-line py-1 pr-2 text-atlas-green">…{String(d._id).slice(-6)}</td>
                  <td className="border-b border-atlas-line py-1 pr-2 text-[#12924F]">"{d.text}"</td>
                  <td className="border-b border-atlas-line py-1 text-atlas-purple">{d.done ? "true" : "false"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function MongoRemembers() {
  const boxRef = useRef(null), appRef = useRef(null), dbRef = useRef(null);
  const [appTasks, setAppTasks] = useState([]);   // what the PAGE shows (lives in RAM)
  const [docs, setDocs] = useState([]);           // what MONGODB stores (survives refresh)
  const [mode, setMode] = useState(null);         // live | demo
  const [phase, setPhase] = useState("idle");     // idle | blank | fetching | back
  const [hot, setHot] = useState(null);           // which backend block is running
  const [lastText, setLastText] = useState("Feed cat");
  const [freshId, setFreshId] = useState(null);
  const [beams, setBeams] = useState([]);
  const [error, setError] = useState("");

  /* first page load: read the tasks from the database */
  useEffect(() => {
    store.init().then(list => { setMode(store.mode); setDocs(list); setAppTasks(list); });
  }, []);

  /* shoot a beam between two panels (positions measured live) */
  function shoot(fromRef, toRef, color) {
    if (reducedMotion() || !boxRef.current) return;
    const B = boxRef.current.getBoundingClientRect();
    const a = fromRef.current.getBoundingClientRect(), b = toRef.current.getBoundingClientRect();
    const rightward = a.left < b.left;
    if (b.top > a.bottom - 10) { /* stacked layout (phones): shoot downward/upward */
      const x = a.left - B.left + a.width / 2;
      const d = `M${x},${a.bottom - B.top} L${x},${b.top - B.top + 20}`;
      const id = Math.random(); setBeams(s => [...s, { id, d, color }]);
      setTimeout(() => setBeams(s => s.filter(z => z.id !== id)), 1200); return;
    }
    const x1 = (rightward ? a.right : a.left) - B.left, x2 = (rightward ? b.left : b.right) - B.left;
    const y1 = a.top - B.top + Math.min(72, a.height * 0.3), y2 = b.top - B.top + Math.min(110, b.height * 0.35);
    const lift = Math.min(70, Math.abs(x2 - x1) * 0.12);
    const d = `M${x1},${y1} C${x1 + (x2 - x1) * 0.35},${y1 - lift} ${x1 + (x2 - x1) * 0.65},${y2 - lift} ${x2},${y2}`;
    const id = Math.random();
    setBeams(s => [...s, { id, d, color }]);
    setTimeout(() => setBeams(s => s.filter(z => z.id !== id)), 1200);
  }

  const add = async text => {
    setError("");
    setAppTasks(t => [...t, { text }]);            // shows on the page right away
    setLastText(text); setHot("insert");
    shoot(appRef, dbRef, "#FF79A8");
    await wait(reducedMotion() ? 0 : 620);          // the beam lands…
    try {
      const doc = await store.insertOne(text);     // …and the document appears in MongoDB
      setDocs(d => [...d, doc]); setFreshId(doc._id);
      setAppTasks(t => { const i = t.findIndex(x => !x._id && x.text === text); return i < 0 ? t : t.map((x, j) => j === i ? doc : x); });
    } catch (e) {
      setError(e.message || "Could not save");
      setAppTasks(t => t.filter(x => x._id || x.text !== text));
    }
    setTimeout(() => setHot(h => (h === "insert" ? null : h)), 900);
  };

  const remove = async id => {
    await store.deleteOne(id);
    setDocs(d => d.filter(x => x._id !== id));
    setAppTasks(t => t.filter(x => x._id !== id));
  };

  const clearDb = async () => { await store.deleteOne("all"); setDocs([]); };

  /* ✨ the magic moment */
  const refresh = async () => {
    if (phase !== "idle") return;
    setError("");
    setPhase("blank"); setAppTasks([]);            // the page restarts: RAM is empty
    await wait(450);
    setPhase("fetching"); setHot("find");
    const [list] = await Promise.all([store.find().catch(() => docs), wait(1100)]);
    if (list.length) shoot(dbRef, appRef, "#00ED64");
    await wait(reducedMotion() ? 0 : 650);
    setPhase("back"); setDocs(list);
    for (const d of list) { setAppTasks(t => [...t, d]); await wait(130); }
    await wait(1500);
    setPhase("idle"); setHot(null);
  };

  const badge = mode && (
    <span title={mode === "live" ? "Connected to the real MongoDB" : "No database connected — simulated in this browser"}
      className="whitespace-nowrap rounded-full bg-ac-lav px-2 py-0.5 text-[.68rem] font-extrabold text-ac-inksoft">
      {mode === "live" ? "🟢 live · MongoDB Atlas" : "🟡 demo · simulated database"}
    </span>
  );

  const overlay =
    phase === "fetching" ? (
      <>
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-ac-soft border-t-ac-pink motion-reduce-none" />
        <div className="font-head text-[1.3rem] font-extrabold text-ac-inksoft">Fetching…</div>
        <div className="rounded-lg bg-ac-code px-2 py-1 font-mono text-[.75rem] text-[#9FF0C8]">GET /tasks → find()</div>
      </>
    ) : phase === "back" && appTasks.length > 0 ? (
      <div className="mt-auto mb-16 animate-pop rounded-2xl bg-white/95 px-4 py-1.5 text-center font-head text-[1.5rem] font-extrabold text-ac-mint shadow-xl">
        🎉 Still here!<div className="font-body text-[.8rem] text-ac-ink">The database remembered.</div>
      </div>
    ) : error ? (
      <div className="mt-auto mb-16 animate-pop rounded-xl bg-white px-3 py-1 font-bold text-ac-red shadow-lg">⚠️ {error}</div>
    ) : null;

  return (
    <div ref={boxRef} className="relative grid h-full min-h-0 grid-cols-1 gap-3 md:grid-cols-[1fr_1.15fr_1fr]">
      <TodoApp
        appRef={appRef} tasks={appTasks} onAdd={add} onRemove={remove} onRefresh={refresh}
        busy={phase !== "idle"} dim={phase === "blank" || phase === "fetching"} badge={badge} overlay={overlay}
        refreshStyle="bg-gradient-to-br from-[#674C9B] to-ac-pink shadow-ac-pink/40"
      />
      <BackendCode lastText={lastText} hot={hot} />
      <AtlasPanel dbRef={dbRef} docs={docs} freshId={freshId} onClear={clearDb} />

      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" aria-hidden="true">
        {beams.map(b => <Beam key={b.id} d={b.d} color={b.color} />)}
      </svg>
    </div>
  );
}

/* ---------------- mount ---------------- */
function Page() {
  const q = new URLSearchParams(location.search);
  const part = q.get("part") || "both";
  if (part === "before") return <div className="h-full p-1.5"><VariablesForget /></div>;
  if (part === "after") return <div className="h-full p-1.5"><MongoRemembers /></div>;
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 p-6">
      <section className="flex h-[560px] flex-col gap-3">
        <h1 className="font-head text-[1.8rem] font-extrabold">Before: variables forget 😱</h1>
        <div className="min-h-0 flex-1"><VariablesForget /></div>
      </section>
      <section className="flex h-[600px] flex-col gap-3">
        <h1 className="font-head text-[1.8rem] font-extrabold">After: MongoDB remembers 🧠</h1>
        <div className="min-h-0 flex-1"><MongoRemembers /></div>
      </section>
    </div>
  );
}

const params = new URLSearchParams(location.search);
if (params.get("embed")) {
  document.body.classList.add("embed");
  /* inside the deck: ← → still change slides while this frame has focus */
  document.addEventListener("keydown", e => {
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (["ArrowRight", "ArrowLeft", "PageDown", "PageUp"].includes(e.key) && window.parent !== window) {
      try { window.parent.document.dispatchEvent(new KeyboardEvent("keydown", { key: e.key })); } catch (err) {}
    }
  });
} else {
  document.body.classList.add("bg-[#F7F2FB]");
}
ReactDOM.createRoot(document.getElementById("root")).render(<Page />);
