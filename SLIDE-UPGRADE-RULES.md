# Slide "Juice" — upgrade rules 💜✨

The pilot is **Lesson 1, slide 6 (🧪 The Button Lab)**. This file says what it looked like
before and after, then turns that into rules we can use on every other deck and visual.

---

## The pilot: Lesson 1 · slide 6

### BEFORE 😐
- **Before code:** padding and font-size only. It looked almost the same as no CSS at all, so the contrast was weak.
- **After code:** pink pill button, flexbox center, hover scale. Good, but the prompt only showed up as a button label.
- **Editor:** both versions were the same white-on-purple text. Nothing showed that better words gave better code.
- **Prompt:** a long button label. The tech words weren't highlighted, so there was no link between a word and the CSS line it made.
- **Students:** they could type in the editor, but there was no clear challenge.
- **Upgrade moment:** the code just typed in. There was no "wow" beat.

### AFTER 🎉
| Upgrade | What happens on the slide |
|---|---|
| **Stronger before/after code** | Before = the standard boring blue button (`#007BFF`, `border-radius: 4px`). After = gradient + pill + hover transition/transform + soft box-shadow + **flexbox center** (`body { display:flex; justify-content:center; align-items:center }`). |
| **Color-coded feedback** | The *Before* editor turns **dull gray**, with no colors. The *After* editor **pops**: syntax highlighting (tags pink, selectors yellow, properties cyan, numbers orange, colors mint) and a neon frame. Better words = better code, and you can see it. |
| **Prompt bubble: anatomy of a prompt** | A chat bubble shows the prompt. Vague prompt = plain gray text. Pro prompt = every tech word (`gradient`, `border-radius`, `hover`, `transition`, `transform`, `box-shadow`, `flexbox`, `center`) in **bold neon**. |
| **The arrow** | When the code finishes typing, a glowing dashed arrow goes from **`transition`** in the prompt to the **`transition:`** line in the CSS, and that line glows. Hover or tap any other neon word and the arrow moves to *its* line. |
| **Live Edit Challenge** | A third button: **🎯 "Your Turn"**. It shows an empty prompt box plus 3 new words: `text-shadow` · `animation` · `outline`. A word glows orange when the student says it in the prompt, and turns green ✓ when it's really in the CSS. **▶ Run** (or Enter) plays the AI: for every word in the prompt it writes that CSS into the code, and the preview updates. No tech words → "🤖 I can only guess!". All 3 in → sparkles + "Superpower proven!" |
| **Micro-interactions** | Switching to the pro prompt plays a **sparkle burst** from the button. When the code lands, the preview **pops** with more sparkles. No sound. Animations turn off for *reduce motion* users. |
| **Active state** | The prompt button that's running has a ring, so the room can see which prompt is "on". |

---

## The global rules (use these on every deck)

1. **Make the contrast loud.** "Before" should look obviously worse: plain, default, boring. "After" should be clearly better. If someone squints and can't see the difference, the example is too weak.
2. **Dull vs. vivid.** Show "before" states in gray or low saturation, and "after" states in full brand color with glow. The color itself says *worse → better*.
3. **Name the cause.** Every "after" must show *which words* made it better. Highlight those words (bold, neon, monospace).
4. **Draw the connection.** Link the cause to the effect with an arrow or a glow: a prompt word → a code line, a code line → the thing it changed on screen. One arrow by default, and more on hover or tap.
5. **Hand over the keyboard.** Every concept slide ends with a **"Your Turn"** step: 2–3 new words, an empty prompt, and live checks that turn green when it works.
6. **Celebrate the moment.** Put a short visual micro-interaction (sparkle, pop) on the *upgrade* moment and the *success* moment, and nowhere else. Keep it under 1 second and respect reduce-motion. **No sound** in any lesson (removed on purpose).
7. **Show state.** The active choice (button, tab, step) always looks active.
8. **Simple English, one idea per slide.** The juice supports the message. It never replaces it.

### How to apply it in code
The Lab engine (`lab.js`) turns the juice on **per preset**. A preset gets it when it has:
- `vague.prompt`: the plain prompt text for the bubble
- `explicit.prompt`: the pro prompt. Write `{word}` or `{word|css-property}` to make a neon word linked to that CSS line (`{hover|:hover}` points to a selector)
- `explicit.arrow`: which word gets the default arrow
- `yourTurn`: `{ label, words: [...], win: "...", css: { word: "declaration" }, keyframes: { word: "@keyframes …" } }` for the challenge (`css` is what ▶ Run writes for each word)

Lesson 2 (Flower Shop Lab) doesn't have these fields yet, so it still looks the same as before. To upgrade it, add the fields. No engine changes needed.

---

## Part 2 · Lesson 1 live demos (before → after)

| Slide | BEFORE | AFTER (live on the slide) |
|---|---|---|
| **3.5 · Chatting vs. building 🤖** (new) | — | Split screen. Left (gray): a mouse slowly types, copies, pastes and saves while a clock counts to **20 min**. Right (glowing terminal): `[Agent 1: Task Complete]` → `[Agent 2: Running]` → … → `[Done] 08:00:42`. Replays every time the slide opens. |
| **TikTok Studio** | 3 static boxes | A 3-click loop: **1** a JSON answer drops in (`"trend": "y2k fashion"`), **2** a robot thinks and types *"Writing script..."*, **3** a TikTok phone pops up with the image + script (sparkle). Click 4 loops. |
| **APIs** | 1 slide (waiter), then a jump | + **"A locked door vs. the master key 🔑"** (empty hardcoded app vs. live data) + **"Live: fetch a real API ⚡"**: type a Pokémon, press *Fetch REST API*, live JSON fills the right side. The name in the `fetch(…)` URL updates as you type, and `console.log(data.abilities)` lights up with the same color as `"abilities"` in the answer. Postman note. |
| **Databases** | Cards: "variables forget / a database remembers" | Two **React + Tailwind** slides (`db-demo.jsx`). **"Before: variables forget 😱"**: app UI + RAM editor (`let tasks = [...]` grows as you add). *Refresh Page* → glitch + "RELOADING…" → both sides wiped, "Oh no!" + a shake. **"After: MongoDB remembers 🧠"**: app UI + backend editor (`db.collection('tasks').insertOne(...)`) + MongoDB Atlas view (Documents / Table). Add → a pink beam shoots app → database and the document lands. *Refresh Page* → app goes blank, "Fetching…", the `find()` block glows, a green beam comes back and the list refills: "🎉 Still here!" |
| **Keep Building (Resources) 🚀** (new, last) | — | Clickable cards: Frontend Masters, freeCodeCamp, W3Schools (the social-media creators card was removed later). |

### More global rules (from Part 2)
9. **Feel it, don't explain it.** If a concept has a "moment" (data disappears, data comes back, an API answers), build that moment as a live widget on the slide.
10. **Before and after are twin slides.** Same UI, one change (no database → database). The only difference on screen is the thing you're teaching.
11. **Show the machine.** Next to the app, show what's happening underneath (RAM variable, database documents, JSON answer) and update it live.
12. **Be honest about "live".** When a demo can't reach its real service it says so (🟡 demo badge, "no internet" message) instead of faking it.
13. **Every live slide still works in PowerPoint** as plain text (`offline` lines) plus a "open it in the browser" note.

### How to add a demo slide
In `lessons-data.js`: `{ kind: "demo", demo: "<name>", title, sub, offline: [ ...lines for PowerPoint ] }`.
In `demos.js`: `DEMOS.<name> = function (el) { … }`. It's built once, and the slide sends a `slide-on` event each time it's shown, so you can replay it. Clicks inside a demo never change slides.

---

## Part 4 · API tools + the live database exercise

| Slide | What it adds |
|---|---|
| **14 · Tools of the trade: Postman + JSON 🧰** (new) | Left: a Postman-style window (GET + URL + **Send** = a real call) with the same request written as `fetch` code underneath; the URL in the code updates as you edit. Right: "JSON = JavaScript Object Notation". A messy one-line recipe JSON → **✨ Auto-format** → neat colored JSON + a recipe card built from it. |
| **15 · The Builder's Toolkit (Resources)** (moved from the last slide) | Frontend Masters, freeCodeCamp, W3Schools (social-media creators removed). |
| **22 · Connect the wires: a live database 🔌** (new) | Tabs **Clone → Add code → Test** with copy buttons (degit command, `.env`, the `insertOne` / `find` lines), plus a looping "expected result" animation: terminal + browser, add → Ctrl+C → restart → refresh → "Still there!". The app is `starter/idea-tracker/`. |
| **23 · Find it in the vault 🔍** (new) | Atlas steps + a working mock filter bar: type `{ "name": "Maya" }` → Apply → your document lights up. Teaches case-sensitivity and valid JSON. Shows the real `ideas` collection when the hub has `MONGODB_URI`. |

14. **Concept → tool → practice.** After a live demo (fetch), show the pro tool that does the same thing (Postman), then give a hands-on exercise with real code.
15. **A video can be a script.** Show the "expected result" as a short looping animation on the slide, so it never goes out of date.
16. **Exercises ship with a starter.** Every hands-on slide links a tiny project in `starter/` with 🎯 STEP comments in the code, so students change only the lines that teach the idea.

---

## Lesson 1 · final order (35 slides) — slide numbers above are from earlier versions

💬 = a "Let's talk" slide: the students answer first, the next slide reveals it. One per topic, no more.

| Part | Slides |
|---|---|
| **Opening** | 1 Title · 2 Steps today · 3 Game 🎮 |
| **This year** | 4 💬 How did you use AI? · 5 Chatting vs. building · 6 💬 Robots that make TikToks? · 7 TikTok Studio · 8 Road to the hackathon |
| **Superpower** | 9 💬 Same AI, junk vs. amazing — why? · 10 Secret superpower (the words) · 11 Button Lab (live) |
| **APIs** | 12 💬 Remember what an API is? · 13 API waiter · 14 💬 "pikachu" → what comes back? · 15 Live fetch · 16 Postman + JSON |
| **Databases** | 17 💬 How does Instagram remember you? · 18 Variables forget · 19 NEW WORD MongoDB · 20 What is a database? 🗄️ · 21 MongoDB remembers · 22 💬 What do you save about each video? · 23 A good table |
| **Part 1** | 24 💬 Most likes, without scrolling? · 25 Part 1 task (on the website, live database) |
| **Break** | 26 ☕ |
| **Part 2** | 27 💬 What does the app need? · 28 Watch: connect the wires (teacher demo) · 29 💬 What if a stranger finds the key? · 30 Your key is a secret 🔒 · 31 Try it yourself 🏠 |
| **Wrap-up** | 32 Explain to me · 33 Glossary · 34 Toolkit · 35 Next time |

What the final review removed (49 → 34): "This year" (same message as the race demo), "Same wish, two prompts" (the Lab shows it live), "Locked door" (the refresh + live fetch already say it), "Why a database?" (a recap of the two demos), "What we learned" (the glossary says it), both "Proof time" slides (📸 is now on the task slides), and 7 extra 💬 slides — one talk per topic.

20. **Less is more.** One idea per slide, one talk per topic, no recap slide that repeats the slide before it. If a slide's words fit in the instructor's mouth, cut them from the slide.

**Part 2 went from practice to demo.** The hands-on part (class key → clone → connect → find it in the vault → bonus) was too heavy for the end of a 3-hour lesson. Now the teacher connects the Idea Tracker live, one slide explains why the key is a secret, and the last Part 2 slide is a "Try it yourself" page: a video, an article and the Idea Tracker README, where each girl makes her **own** free Atlas database. The class connection string is no longer shown on a slide.

| Slide | What it adds |
|---|---|
| **30 · Your key is a secret 🔒** (new) | The connection string split into colored parts: click one to see what it is (who · the password · where · which database). Below: **❌ Key in server.js** → GitHub shows the password in red + "anyone can read, change or DELETE your data", vs. **✅ Key in .env** → `.gitignore` keeps `.env` off GitHub, `server.js` only says `process.env.MONGODB_URI` (sparkle). Three Atlas locks underneath. |
| **31 · Try it yourself 🏠** (new) | 🎬 Watch (MongoDB's own YouTube video) · 📖 Read (Atlas get started) · 🛠️ Build (the Idea Tracker README, now written for your own free database + a "keep your key secret" section). |

21. **Heavy setup = demo + take-home.** When a hands-on step needs accounts, installs or secrets, show it live and give a "Try it yourself" slide with a video, an article and the starter README.

| Slide | What it adds |
|---|---|
| **20 · What is a database? 🗄️** (new) | Left: **📱 App → ⚙️ Server → 🗄️ Database** (a pink dot runs the request once when the slide opens), then MongoDB zoomed in as nested boxes **cluster0 › alicecode › videos › { document }**: click any box for a one-line meaning. Right: 4 tabs, the same video in 4 shapes: **📊 Relational** (a SQL table) · **📄 Document** (JSON, "⭐ we use this one") · **🔑 Key-value** · **🕸️ Graph** (dots + lines), each with "good for" + examples. Bottom: ⭐ Bonus link to freeCodeCamp's "SQL vs NoSQL: when to use which". |

### Earlier: the second reorder (48 slides)

What changed in the second reorder:
- **The schedule comes first.** "Steps today" is slide 2, right after the title, with the spoiler of the day and every part of the lesson (also the year intro and the superpower, which the old list skipped).
- **Recall before reveal.** APIs start with "Do you remember what an API is?", then the waiter slide is the answer, then the locked door shows why it matters.
- **💬 Talk before every reveal.** A discussion slide opens every new topic (17 in all); "How does an app remember you?" turned from a section slide into one.
- **End on the hook.** Glossary and resources come before "Next time", so the last thing they see is next week.

---

### Earlier reorder (32 slides)

What changed in the reorder:
- **No duplicates:** "Want more?" merged into the Builder's Toolkit, which moved to the end (one resources slide). "Same wish" no longer repeats the Lab — it's a vote, the Lab is the test. The live-fetch slide hands off to Postman instead of explaining it twice.
- **Story order:** year vision → superpower → today's plan → Part 1 → Break → Part 2 → wrap-up.
- **Databases: feel → name → fix → recap.** The "forget" demo comes first, then the word MongoDB, then the "remember" demo, then the "Why a database?" cards as a recap.
- **Part 2 is the live exercise.** "Create your own collection" became a bonus for fast finishers. The agenda, Part 2 proof, recap, missions, lesson goal and "Today's flow" all match.

17. **One slide, one job.** If two slides say the same thing, merge them or give one a new job (predict → test, teach → recap).

---

## Labs & live demos below the deck
Every lesson page lists **all** its labs and live demos (any `kind: "lab"` or `kind: "demo"` slide) in one card under the slides:
‹ › arrows, the lab's name + description in big text, numbered name chips to jump, "▶ show on slide N" to jump the deck there, and ⛶ fullscreen. The card starts **closed** (just the name chips); clicking a name opens that lab, ✕ Close folds it back. Each lab is built the first time it's opened. New demo slides show up there automatically.

18. **Every live slide is also a tool.** An instructor should be able to open any lab without hunting through the deck.

## Discussion slides
19. **Talk first, reveal second.** Before every new topic (not just the big ones), put a `kind: "discuss"` slide with an open question. The students answer (think → partner → share), then the next slide shows the answer. Fields: `q` (the question), `hints` (2–3 small nudges, optional), `sec` (talk timer, default 60), `how` (optional, replaces "Think · Tell your partner · Share"). On the web the ⏱ button starts the timer and resets each time the slide opens; in PowerPoint it's the question, the hints and the note.
