/* ============================================================
   AliceCode Level 4 — lesson data for the whole first half year.
   Lessons 1–3 ported from the official deck specs.
   Lessons 4–7 written from the approved year plan (v0.6).
   Simple English on purpose — our builders are ~14 and awesome.
   ============================================================ */

const NIR_TUTORIAL = "https://github.com/nirkaufman/refernce-project-js/tree/main/tutorial";

const LESSONS = [

/* ================= LESSON 1 ================= */
{
  n: 1, emoji: "🚀", title: "Back to Building",
  project: "P1 · Refresh: APIs + Databases",
  goal: "Warm up APIs, understand why apps need databases, and connect a real app to MongoDB.",
  leaves: "Mongo exercises done + you know how an app connects to MongoDB, and why its key stays secret.",
  tutorial: [
    { label: "MongoDB basics — short and friendly", url: "https://www.mongodb.com/basics" },
    { label: "⭐ Bonus: SQL vs NoSQL — when to use which (freeCodeCamp)", url: "https://www.freecodecamp.org/news/sql-vs-nosql-tutorial/" },
    { label: "Try it yourself: the Idea Tracker guide", url: "https://github.com/Yana205/alicecode-level4-hub/tree/main/starter/idea-tracker" },
    { label: "Video: MongoDB & Node.js — connecting (MongoDB on YouTube)", url: "https://www.youtube.com/watch?v=fbYExfeFsI0" },
    { label: "JSON intro on W3Schools", url: "https://www.w3schools.com/js/js_json_intro.asp" },
    { label: "Play with a real API: PokeAPI", url: "https://pokeapi.co" }
  ],
  missions: [
    "Prompt practice: ask an AI for one small change using at least 3 words from the keyword bank (flexbox, hover, id…).",
    "Open the ready-made Mongo database (alicecode › videos) and finish the 4 small exercises: read, filter, count, sort.",
    "Find: which video has the most likes?",
    "Watch the teacher connect the Idea Tracker to MongoDB: add an idea, restart the server — it's still there.",
    "Explain in one sentence: why does the MongoDB key live in .env and never on GitHub? 🔒",
    "🏠 Try it yourself (optional): follow the Idea Tracker guide with your own free MongoDB database.",
    "📸 Screenshot your before + after for the portfolio."
  ],
  slides: [
    { kind: "title", title: "Lesson 1 · Back to Building 🚀",
      sub: "Project P1 · Refresh: APIs + Databases" },
    { kind: "content", title: "Steps today",
      lead: "Spoiler: by the end, YOUR app remembers — like Instagram does. 👀", items: [
      { lines: [
        "🎮 Game · 20 min",
        "🚀 This year + your superpower",
        "🌐 Part 1 · APIs + databases",
        "☕ Break · 30 min",
        "🔌 Part 2 · how apps connect to MongoDB",
        "🗣️ Explain to me · last 15 min"
      ]},
      { note: "💬 A \"Let's talk\" slide? You answer FIRST!" }
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we build" },
    { kind: "discuss", q: "This summer — how did YOU use AI?",
      hints: ["Did you just chat with it?", "Did it ever do the whole job FOR you?"] },
    { kind: "demo", demo: "agentRace", title: "Chatting vs. building 🤖",
      sub: "Same job. Left: you click for 20 minutes. Right: your agent does it at 8 AM.",
      offline: [
        "😩 AI chat user: type a prompt → wait → copy → paste → ask for an image → save… 20 minutes of clicking.",
        "🤖 Agent builder: your script wakes up at 8 AM, finds trends with an API,",
        "writes the script, makes the image and emails it to you — before your coffee is done. ☕"
      ] },
    { kind: "discuss", q: "Robots that make TikToks for you: what jobs would you give them?",
      hints: ["Find the trend?", "Write the idea?", "Make the video?"] },
    { kind: "demo", demo: "studioLoop", title: "The big build: TikTok Studio 📱",
      sub: "One shared project. We build it together, all year. Click to run it!",
      offline: [
        "1️⃣ Trend finder — an API answers: { \"trend\": \"y2k fashion\" }",
        "2️⃣ Idea maker — a robot thinks… \"Writing script...\"",
        "3️⃣ Video maker — a TikTok with the image + script pops up.",
        "Three agents + a database + a screen that shows it all."
      ] },
    { kind: "content", title: "The road to the hackathon 🗓️", items: [
      { lines: [
        "Weeks 1–2 · P1: refresh APIs and databases",
        "Weeks 3–4 · P2: build agents 1 and 2",
        "Week 5 · P3: connect them in a chain",
        "Week 6 · P4: Agent 3 + the full Studio"
      ]},
      { note: "7–9 December: HACKATHON! You build something like this. 🔥" }
    ]},
    { kind: "discuss", q: "Same AI, same button. One gets amazing code, one gets junk. Why?",
      hints: ["Luck?", "Or… the words they used? 🤔"] },
    { kind: "content", title: "Your secret superpower 🦸‍♀️",
      lead: "You already speak code. Most AI users don't.", items: [
      { cards: [
        { h: "🧱 HTML", lines: ["div · button · form", "class · id"] },
        { h: "🎨 CSS", lines: ["flexbox · grid · hover", "border-radius · transition"], color: "orange" },
        { h: "⚡ JS", lines: ["function · event", "querySelector · classList"], color: "green" }
      ]},
      { note: "These words = PROMPT POWER. Next: see it live. 🧪" }
    ]},
    { kind: "lab", title: "🧪 The Button Lab",
      sub: "Vague prompt vs. pro prompt — live. Then YOUR turn." },
    { kind: "discuss", q: "Do you remember what an API is? 🤔",
      hints: ["In your own words", "What does GET mean?"] },
    { kind: "content", title: "Quick refresh: what is an API? 🌐",
      lead: "Did you remember? Here's the answer. 🎯", items: [
      { cards: [
        { h: "You (the app)", lines: ["\"One pizza, please!\"", "You ask for data."] },
        { h: "The API (waiter)", lines: ["Takes your request", "to the kitchen."], color: "orange" },
        { h: "The server (kitchen)", lines: ["Makes the answer,", "sends it back."], color: "green" }
      ]},
      { note: "GET = \"please give me data\". The answer comes as JSON." }
    ]},
    { kind: "discuss", q: "You type \"pikachu\" and press a button. What comes back?",
      hints: ["A web address?", "A picture? Text? A box of data?"] },
    { kind: "demo", demo: "liveFetch", title: "Live: fetch a real API ⚡",
      sub: "Type a Pokémon. Press the button. The internet answers.",
      offline: [
        "const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');",
        "const data = await response.json();",
        "console.log(data.abilities); // Boom. Live data from the internet.",
        "📮 Next: Postman — the pro tool that does this without code."
      ] },
    { kind: "demo", demo: "toolsOfTrade", title: "Tools of the trade: Postman + JSON 🧰",
      sub: "Pros test an API in Postman first — then write the same request in code.",
      offline: [
        "📮 Postman = the industry tool for testing APIs before you write code.",
        "GET https://pokeapi.co/api/v2/pokemon/pikachu → Send → the JSON answer.",
        "Same request in code: const res = await fetch(url); const data = await res.json();",
        "JSON = JavaScript Object Notation: the universal box APIs pack data in.",
        "Messy one-line JSON → auto-format → neat keys and values (like a recipe card)."
      ] },
    { kind: "discuss", q: "Close Instagram. Open it again. Your likes are still there. HOW? 🤔",
      hints: ["Where does the app keep your stuff?", "Predict: a to-do app + refresh = ?"] },
    { kind: "demo", demo: "dbBefore", title: "Before: variables forget 😱",
      sub: "Add 2 tasks. Then press the red button. Watch closely…",
      offline: [
        "A to-do list that keeps tasks in a variable: let tasks = [ ];",
        "Add \"Finish homework\" and \"Feed cat\" → refresh the page →",
        "the list is EMPTY. Variables live in memory — and memory forgets. 😱"
      ] },
    { kind: "newword", term: "MongoDB",
      meaning: "A database that stores documents — they look just like JSON.",
      extra: "collection = a folder of documents · document = one row" },
    { kind: "demo", demo: "dbMap", title: "What is a database? 🗄️",
      sub: "Click a box to zoom in. Then: databases come in different shapes.",
      offline: [
        "📱 App → asks → ⚙️ Server → asks → 🗄️ Database. The app never talks to the database directly.",
        "Inside MongoDB: cluster (the computer in the cloud) › database (alicecode) › collection (videos) › document { … }",
        "📊 Relational (SQL): tables with rows + columns, like Excel — MySQL, PostgreSQL",
        "📄 Document (NoSQL): JSON-like documents — MongoDB ← we use this one",
        "🔑 Key-value: a name → a value, super fast — Redis",
        "🕸️ Graph: dots + lines, for who-follows-who — Neo4j",
        "⭐ Bonus: freeCodeCamp · SQL vs NoSQL: when to use which → freecodecamp.org/news/sql-vs-nosql-tutorial"
      ] },
    { kind: "demo", demo: "dbAfter", title: "After: MongoDB remembers 🧠",
      sub: "Same app, now with a database. Add a task — watch the document appear.",
      offline: [
        "The same to-do list, plus the backend: db.collection('tasks').insertOne(...)",
        "Add a task → it shoots to MongoDB and a JSON document appears.",
        "Refresh the page → the tasks come back. The database remembered. 🎉"
      ] },
    { kind: "discuss", q: "1,000 TikTok videos. What do you save about EACH one?",
      hints: ["title? likes? …", "Same title twice — how do you tell them apart?"], sec: 90 },
    { kind: "content", title: "What does a good table look like?", items: [
      { code: [
        '{ "id": 1, "title": "cat dance", "likes": 5021 }',
        '{ "id": 2, "title": "pasta hack", "likes": 812 }',
        '{ "id": 3, "title": "study tips", "likes": 4433 }'
      ]},
      { lines: [
        "Every row = one thing (here: one video)",
        "Every row has a unique id — no twins!",
        "All rows share the same fields"
      ]}
    ]},
    { kind: "discuss", q: "30 videos. Which has the most likes — without scrolling?",
      hints: ["Ask the data a question?", "Sort by…?"] },
    { kind: "demo", demo: "readyDb", title: "Part 1 · Task ✅",
      sub: "On your laptop: this site → Lesson 1 → 🧪 Labs → Part 1. 📸 Screenshot your answer.",
      offline: [
        "On your laptop: this site → Lesson 1 → 🧪 Labs → Part 1 · type a filter → Apply",
        "1 · 👀 Read: how many videos are there?",
        "2 · 🔍 Filter: only dance videos → { \"category\": \"dance\" }",
        "3 · 🔢 Count: more than 10,000 likes → { \"likes\": { \"$gt\": 10000 } }",
        "4 · 🏆 Sort: which video has the most likes? → sort { \"likes\": -1 }"
      ] },
    { kind: "section", title: "Break ☕", sub: "30 minutes — you earned it" },
    { kind: "discuss", q: "The app that forgot everything: what does it need?",
      hints: ["Save it where?", "Read it back how?"] },
    { kind: "demo", demo: "dbExercise", title: "Watch: connect the wires 🔌",
      sub: "Teacher demo. An app that forgets → 3 steps → it remembers.",
      offline: [
        "1 · Clone: npx degit Yana205/alicecode-level4-hub/starter/idea-tracker idea-tracker → cd idea-tracker → npm install",
        "2 · Add code: .env → MONGODB_URI=… (the secret key)",
        "   server.js → await db.collection(\"ideas\").insertOne(idea);",
        "   server.js → const all = await db.collection(\"ideas\").find().sort({ createdAt: -1 }).toArray();",
        "3 · Test: npm start → add an idea → Ctrl+C → npm start → refresh. Still there? 🎉"
      ] },
    { kind: "discuss", q: "Your app has a key to the database. What if a stranger finds it? 😬",
      hints: ["Can they read your data?", "Can they DELETE it?"] },
    { kind: "demo", demo: "secretKey", title: "Your key is a secret 🔒",
      sub: "Click the parts of the key. Then: key in the code vs. key in .env.",
      offline: [
        "The key (connection string): mongodb+srv://maya:S3cr3t-Pa55@cluster0.ab12c.mongodb.net/alicecode",
        "user = WHO logs in · password = the secret · cluster = WHERE the database lives · /alicecode = WHICH database",
        "❌ Key inside server.js → pushed to GitHub → anyone can read, change or DELETE your data.",
        "✅ Key in .env + .env in .gitignore → server.js only says process.env.MONGODB_URI → GitHub never sees the password.",
        "Atlas locks: a user that can only touch ONE database · Network Access · leaked? change the password right away."
      ] },
    { kind: "content", title: "Try it yourself 🏠",
      lead: "Want YOUR app to remember? Make your own free database. Not homework!", items: [
      { links: [
        { h: "1 · 🎬 Watch", url: "https://www.youtube.com/watch?v=fbYExfeFsI0", color: "orange",
          text: "MongoDB on YouTube: connect a Node.js app to Atlas, step by step." },
        { h: "2 · 📖 Read", url: "https://www.mongodb.com/docs/get-started/", color: "green",
          text: "Make your free Atlas database: account, cluster, user, connection string." },
        { h: "3 · 🛠️ Build", url: "https://github.com/Yana205/alicecode-level4-hub/tree/main/starter/idea-tracker",
          text: "Our Idea Tracker guide: clone, paste YOUR key in .env, add 2 lines. Done." }
      ]},
      { note: "Stuck? Bring a screenshot next lesson. We fix it together. 💜" }
    ]},
    { kind: "content", title: "Explain to me 🗣️",
      lead: "Last 15 minutes.", items: [
      { lines: [
        "Pick a word: API · JSON · collection · .env",
        "Explain it in 2 sentences.",
        "Show your screenshots."
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["API", "a way for apps to talk to each other"],
        ["GET", "an API request that asks for data"],
        ["fetch()", "the JavaScript way to call an API"],
        ["Postman", "an app to test APIs without code"],
        ["JSON", "the format the internet uses to send data"],
        ["database", "where an app keeps data long-term"],
        ["MongoDB", "the database we use this year"],
        ["SQL vs NoSQL", "tables (rows + columns) vs. other shapes, like documents"],
        ["collection", "a folder of documents in MongoDB"],
        ["document", "one row of data — looks like JSON"],
        ["unique id", "a number/name no other row has"],
        ["connection string", "the key + address an app uses to open a database"],
        [".env", "a secret file for keys — never on GitHub"]
      ]}
    ]},
    { kind: "content", title: "The Builder's Toolkit (Resources) 🚀",
      lead: "Your path: look it up → practice → go pro. Not homework!", items: [
      { links: [
        { h: "1 · 📖 W3Schools", url: "https://www.w3schools.com", color: "green",
          text: "Look it up: the dictionary for HTML, CSS and JavaScript. Keep it open while you code." },
        { h: "2 · 🔥 freeCodeCamp", url: "https://www.freecodecamp.org", color: "orange",
          text: "Practice: the best free, interactive coding paths on the internet." },
        { h: "3 · 🎓 Frontend Masters", url: "https://frontendmasters.com",
          text: "Go pro: courses from the engineers who built Netflix and Spotify." }
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "An AI solves one of YOUR old exercises. Live.",
        "We fix a bug just by chatting with it.",
        "You install a coding agent: opencode."
      ]},
      { note: "Next week the AI starts working for you. 🤖" }
    ]}
  ]
},

/* ================= LESSON 2 ================= */
{
  n: 2, emoji: "😎", title: "Vibe Coding",
  project: "P1 · From LLMs to coding agents",
  goal: "See what an LLM can (and can't) do, then install opencode and let it work inside a real project.",
  leaves: "opencode installed and answering + a bug found and fixed in a big project.",
  tutorial: [
    { label: "opencode docs — install help + commands", url: "https://opencode.ai/docs" },
    { label: "See tokens live — OpenAI tokenizer", url: "https://platform.openai.com/tokenizer" },
    { label: "Prompt tricks — promptingguide.ai", url: "https://www.promptingguide.ai" }
  ],
  missions: [
    "Paste a real exercise from last year into Gemini or Claude. Watch it solve. Then CHECK it.",
    "Fix the planted bug just by chatting with the LLM.",
    "Install opencode (guide on the Setup page).",
    "Open last year's big project and ask: \"What does this project do?\"",
    "Bug hunt: let the agent find the hidden bug. Fix. Run. Test.",
    "Rewrite \"build me a website for my flower shop\" as an explicit prompt — at least 5 keywords (layout, colors, features).",
    "📸 Screenshot the error + the fix — before and after."
  ],
  slides: [
    { kind: "title", title: "Lesson 2 · Vibe Coding 😎",
      sub: "Project P1 · From LLMs to coding agents" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · an LLM solves YOUR old exercise",
        "Break ☕",
        "Part 2 · meet the coding agent: opencode",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then the AI gets to work" },
    { kind: "discuss", q: "Last time we built with APIs + MongoDB. What do you remember?",
      hints: ["What is JSON?","Why do apps need a database?"] },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "We warmed up APIs: GET, JSON.",
        "We saw why apps need databases.",
        "You saw an app connect to MongoDB — and kept its key secret. 🔒"
      ]}
    ]},
    { kind: "discuss", q: "Can an AI write code for you? Then who is the boss?",
      hints: ["Does it always get it right?","Who checks?"] },
    { kind: "content", title: "Today's big idea 💡", items: [
      { lines: [
        "AI can write code with you.",
        "But YOU are the boss.",
        "You describe → AI codes → you check.",
        "That last step is the whole job."
      ]},
      { note: "Vibe coding = leading the AI, not typing every line." }
    ]},
    { kind: "discuss", q: "You tell an AI: \"build me a website\". What do you get?",
      hints: ["What YOU wanted?","Or what it guessed?"] },
    { kind: "beforeafter", title: "The flower shop test 🌸",
      before: ["\"Build me a website", "for my flower shop.\"", "The AI guesses EVERYTHING. 😬"],
      after: ["\"Navbar + hero + a grid of 6", "flower cards with hover, pink", "#D83474, contact form, responsive.\"", "Her exact vision. 💅"],
      note: "Same AI, same minute. Different words → a completely different website." },
    { kind: "content", title: "Why could she ask like that? 🧠", items: [
      { lines: [
        "Because last year you learned the REAL words:",
        "flexbox · grid · hover · form · event · id · responsive",
        "People without them get whatever the AI guesses.",
        "You get YOUR design. That's your head start."
      ]},
      { note: "Explicit prompts = the superpower from lesson 1. Use the keyword bank!" }
    ]},
    { kind: "lab", title: "🌸 The Flower Shop Lab",
      sub: "One vague prompt vs one explicit prompt — a whole site, live." },
    { kind: "content", title: "Part 1 · The LLM challenge ✅",
      lead: "Remember sweating over this exercise? Watch.", items: [
      { lines: [
        "Open Gemini (or Claude) in the browser.",
        "Paste a real exercise from last year.",
        "Watch it solve in seconds.",
        "Now READ the answer. Is it right? Test it."
      ]},
      { note: "The AI is fast. YOU are the judge. ⚖️" }
    ]},
    { kind: "content", title: "Now: fix a bug by chatting 🐞", items: [
      { lines: [
        "Here is code with a bug (planted 😉).",
        "Paste it. Describe what goes wrong.",
        "Ask for a fix. Read it. Test it.",
        "It works — and you never wrote the fix."
      ]}
    ]},
    { kind: "discuss", q: "The AI was fast. Was it always right? What did it miss?",
      hints: ["Your other files?","Things it forgot?"] },
    { kind: "content", title: "But the AI misses things 🙈", items: [
      { cards: [
        { h: "It can't see", lines: ["Only what you paste.", "Your project? Invisible."], color: "red" },
        { h: "It forgets", lines: ["Long chat →", "old parts fall out."], color: "orange" },
        { h: "It sounds sure", lines: ["Even when it's wrong.", "Always test!"], color: "purple" }
      ]}
    ]},
    { kind: "content", title: "3 new words 🧠", items: [
      { cards: [
        { h: "token", lines: ["A piece of a word.", "AI reads in tokens."] },
        { h: "context window", lines: ["How much the AI", "can \"see\" at once."], color: "orange" },
        { h: "system prompt", lines: ["The AI's job description.", "Set before the chat."], color: "green" }
      ]},
      { note: "These 3 explain almost every weird AI moment." }
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["The code crashes", "on an empty list.", "Red error. 😖"],
      after: ["AI spotted it.", "We tested the fix.", "Green. It runs. 🎉"],
      note: "📸 Screenshot the error + the fix — proof #1 today." },
    { kind: "section", title: "Break ☕", sub: "30 minutes" },
    { kind: "discuss", q: "Copy-paste is getting old 😩 What if the AI could open your WHOLE project?",
      hints: ["Read all the files?","Run and test the code?"] },
    { kind: "content", title: "Meet the coding agent 🤝", items: [
      { lines: [
        "A coding agent reads your files.",
        "It runs commands. It edits code. It tests.",
        "Claude Code and tools like it do this.",
        "Ours is free: opencode."
      ]},
      { note: "Chat LLM = advice. Coding agent = hands on your project." }
    ]},
    { kind: "content", title: "Part 2 · Install + first mission 🔧", items: [
      { lines: [
        "Install opencode — guide is on the board.",
        "Open last year's big project with it.",
        "Ask: \"What does this project do?\"",
        "Read its answer. Did it get it right?"
      ]}
    ]},
    { kind: "content", title: "The bug hunt 🕵️‍♀️",
      lead: "Somewhere in this project, a bug is hiding.", items: [
      { lines: [
        "Ask the agent to find it.",
        "Watch HOW it searches your files.",
        "Let it explain the bug to you.",
        "Fix together. Run. Test."
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["The page loads…", "and shows nothing.", "Empty. 😖"],
      after: ["Agent found the bad file.", "One fix. Page works. 🎉"],
      note: "📸 Screenshot before + after. Portfolio!" },
    { kind: "newword", term: "skill",
      meaning: "A saved recipe of instructions your agent can use again and again.",
      extra: "Example: a skill that teaches the agent YOUR project's style." },
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: token · context window · coding agent.",
        "Explain it in 2 sentences.",
        "Show your favorite before/after from today."
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "We BUILD our own agent. From scratch.",
        "LangChain: model + prompt + tools.",
        "The Studio begins: Agent 1, the trend finder."
      ]},
      { note: "You used an agent today. Next week you MAKE one. 🛠️" }
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Open opencode on any project and try these:", items: [
      { rows: [
        ["Understand", "\"Explain this project to me like I'm new here.\""],
        ["Feature", "\"Add one tiny feature. Show me your plan first.\""],
        ["Bug", "\"Find a bug and prove it with a test.\""],
        ["Project notes", "\"Write a CLAUDE.md with tips for working in my project.\""],
        ["Spec first", "\"Write a short spec first. Then build exactly that.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["opencode docs", "opencode.ai/docs — install help + commands"],
        ["See tokens live", "platform.openai.com/tokenizer — paste text, see tokens"],
        ["Tokens + costs", "our Setup page — animated tokenizer + what AI really costs"],
        ["Deploy for free", "vercel.com — put your site online (guide on the Setup page)"],
        ["How LLMs work (video)", "search YouTube: \"Karpathy Intro to Large Language Models\""]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["LLM", "a large language model — the \"brain\" behind AI chat"],
        ["prompt", "what you write to the AI"],
        ["system prompt", "the AI's job description, set before the chat"],
        ["token", "a piece of a word; AI reads tokens, not letters"],
        ["context window", "how much the AI can see at one time"],
        ["coding agent", "an AI that works inside your whole project"],
        ["opencode", "the free coding agent we use"],
        ["vibe coding", "you describe and check; the AI types"]
      ]}
    ]}
  ]
},

/* ================= LESSON 3 ================= */
{
  n: 3, emoji: "🛠️", title: "We Build an Agent",
  project: "P2 · LangChain + the Studio begins",
  goal: "Understand what an agent is made of, build your first one, and start the Studio: Agent 1, the trend finder.",
  leaves: "Agent 1 of the Studio works — it finds real trends from today.",
  tutorial: [
    { label: "Nir's tutorial — lessons 1–4 (our reference project)", url: NIR_TUTORIAL },
    { label: "LangChain JS — the library's own guide", url: "https://js.langchain.com" },
    { label: "Tavily — search made for agents", url: "https://www.tavily.com" }
  ],
  missions: [
    "Open the half-built agent file. It's missing a system prompt and one tool.",
    "Complete it. Run it. Talk to it. Try to break it.",
    "Pull the shared Studio repo.",
    "Give Agent 1 the Tavily search tool.",
    "Prompt it: find 3 TikTok trends from today. Check they are real!",
    "📸 Save the trends — Agent 2 needs them next week."
  ],
  slides: [
    { kind: "title", title: "Lesson 3 · We Build an Agent 🛠️",
      sub: "Project P2 · LangChain + the Studio begins" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · what is an agent + build one",
        "Break ☕",
        "Part 2 · the Studio begins: Agent 1",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we switch sides" },
    { kind: "discuss", q: "Last time an LLM solved your old exercise. What can't a chat AI do?",
      hints: ["See your files?","Remember everything?"] },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "An LLM solved your old exercise in seconds.",
        "You learned tokens + context window.",
        "You installed opencode and fixed a real bug."
      ]}
    ]},
    { kind: "discuss", q: "Which AI agents did you meet this week? Who built them?",
      hints: ["Support bots?","Recommendations?"] },
    { kind: "content", title: "Agents are everywhere 🌍", items: [
      { cards: [
        { h: "Support bots", lines: ["Cancel your order.", "For real, in the system."] },
        { h: "Research agents", lines: ["Browse, read, compare,", "write you a report."], color: "orange" },
        { h: "Coding agents", lines: ["opencode!", "You used one last week."], color: "green" }
      ]},
      { note: "Every one of these was BUILT by someone. It's a product." }
    ]},
    { kind: "content", title: "Today we switch sides 🔄", items: [
      { lines: [
        "Last week: you USED an agent.",
        "Today: you BUILD one.",
        "Companies pay for agents that work.",
        "Your agent = your product. 💼"
      ]}
    ]},
    { kind: "discuss", q: "You build a robot helper. What parts does it need?",
      hints: ["A brain?","Hands? A job description?"] },
    { kind: "content", title: "What is an agent made of? 🧩", items: [
      { cards: [
        { h: "🧠 Model", lines: ["The brain.", "Ours: Gemini."] },
        { h: "📋 System prompt", lines: ["Its job", "description."], color: "orange" },
        { h: "🔧 Tools", lines: ["Its hands:", "search, save, send."], color: "green" },
        { h: "🔑 Access", lines: ["Files, internet,", "database."], color: "dark" }
      ]},
      { note: "Model + prompt + tools + access = an agent." }
    ]},
    { kind: "newword", term: "createAgent",
      meaning: "Give it a model, a prompt and tools — get an agent.",
      extra: "LangChain = the JS library we use to build agents." },
    { kind: "content", title: "Your first agent 🐣",
      lead: "Yes, it's really this short:", items: [
      { code: [
        'const model = initChatModel("gemini-2.5-flash");',
        '',
        'const agent = createAgent({',
        '  model,',
        '  prompt: "You are a helpful trend expert...",',
        '  tools: [searchTool],',
        '});'
      ]},
      { note: "3 ingredients in. One agent out." }
    ]},
    { kind: "content", title: "Part 1 · Task ✅ Wake it up",
      lead: "Clean and small. Everyone gets a working agent.", items: [
      { lines: [
        "Open the half-built agent file.",
        "It's missing a system prompt and one tool.",
        "Complete it. Run it. Talk to it.",
        "Try to break it — what happens?"
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["Agent runs but…", "\"I don't know who I am.\"", "No prompt, no tool. 😵"],
      after: ["Agent introduces itself,", "uses its tool,", "answers like a pro. 🎉"],
      note: "📸 Screenshot both answers — that's your proof." },
    { kind: "section", title: "Break ☕", sub: "30 minutes" },
    { kind: "discuss", q: "How would an agent find TODAY's TikTok trends?",
      hints: ["Guess?","Search the internet?"] },
    { kind: "content", title: "The TikTok Studio starts NOW 📱", items: [
      { lines: [
        "Remember the pipeline? Trends → idea → video.",
        "Today we build the first link:",
        "Agent 1 — the trend finder.",
        "It searches the real internet. Today's trends."
      ]}
    ]},
    { kind: "newword", term: "Tavily",
      meaning: "A search engine made for agents. Clean results, no ads.",
      extra: "We give it to Agent 1 as a tool." },
    { kind: "content", title: "Part 2 · Finish Agent 1 🔧",
      lead: "In the shared Studio repo. Real code, real internet.", items: [
      { lines: [
        "Agent 1 is half-built in our repo. Pull it.",
        "Give it the Tavily search tool.",
        "Prompt it: find 3 TikTok trends from today.",
        "Run it. Are the trends real? Check!"
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["\"I cannot browse", "the internet.\"", "No tool = no trends. 😖"],
      after: ["3 real trends,", "found by YOUR agent,", "fresh from today. 🎉"],
      note: "📸 Save the trends — Agent 2 needs them next week!" },
    { kind: "content", title: "In your pair 👯‍♀️", items: [
      { lines: [
        "Work in pairs: Driver + Navigator.",
        "Driver types. Navigator reads and questions.",
        "Switch every 20 minutes.",
        "Both of you must be able to explain the code."
      ]}
    ]},
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: agent · tool · system prompt · Tavily.",
        "Explain it in 2 sentences.",
        "Show your agent's before/after."
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "Tools in depth: tool() + Zod + describe.",
        "We meet an agent that behaves badly — and fix it.",
        "Agent 2: from trend → video idea."
      ]},
      { note: "Bad tool descriptions make confused agents. You'll see. 😏" }
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Open opencode on the Studio repo and try:", items: [
      { rows: [
        ["Understand", "\"Explain Agent 1's system prompt to me.\""],
        ["Experiment", "\"Change the prompt. What breaks? Screenshot it.\""],
        ["Rules", "\"Add a rule: answer only in Hebrew. Test it.\""],
        ["Spec first", "\"I want a small feature. Write the spec before code.\""],
        ["Project notes", "\"Start a CLAUDE.md for this repo with our rules.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["LangChain JS", "js.langchain.com — the library's own guide"],
        ["Tavily", "tavily.com — what agent-search looks like"],
        ["Agents explained", "deeplearning.ai — Andrew Ng on AI agents"],
        ["Our reference project", "github.com/nirkaufman/refernce-project-js"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["agent", "an AI that can act: think, use tools, finish a job"],
        ["LangChain", "the JS library we use to build agents"],
        ["createAgent", "the function that builds an agent from parts"],
        ["system prompt", "the agent's job description"],
        ["tool", "an action the agent can take (search, save…)"],
        ["Tavily", "internet search made for agents"],
        ["pipeline", "agents in a chain, each passing work on"],
        ["repo", "our shared project folder on GitHub"]
      ]}
    ]}
  ]
},

/* ================= LESSON 4 ================= */
{
  n: 4, emoji: "🧰", title: "Tool Time",
  project: "P2 · Tools, Zod + Agent 2",
  goal: "Give agents great tools (and great descriptions), fix an agent that behaves badly, and build Agent 2.",
  leaves: "Agent 2 works + a confused agent fixed, with before/after proof.",
  tutorial: [
    { label: "Nir's tutorial — tools chapter", url: NIR_TUTORIAL },
    { label: "Zod — how we describe data shapes", url: "https://zod.dev" },
    { label: "LangChain JS — tools guide", url: "https://js.langchain.com" }
  ],
  missions: [
    "Write one tool with tool() + Zod. Give every field a clear .describe().",
    "Meet the badly-behaved agent. Why is it confused? Read its tool descriptions.",
    "Fix the bad .describe() texts. 📸 Before/after proof.",
    "Find the contradiction in its system prompt. Fix it with RTOC.",
    "Build Agent 2: it takes a trend and makes ONE video idea.",
    "Feed Agent 2 the trends you saved last week. Does the idea make sense?"
  ],
  slides: [
    { kind: "title", title: "Lesson 4 · Tool Time 🧰",
      sub: "Project P2 · Tools, Zod + Agent 2" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · build a tool + fix a confused agent",
        "Break ☕",
        "Part 2 · build Agent 2: the idea maker",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we open the toolbox" },
    { kind: "discuss", q: "Last time you built your first agent. What 4 parts make an agent?",
      hints: ["Model? Prompt?","Tools? Access?"] },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "You built your first agent with createAgent.",
        "Agent 1 of the Studio finds real trends.",
        "Model + prompt + tools + access = agent."
      ]}
    ]},
    { kind: "discuss", q: "When did bad instructions ruin a task for you?",
      hints: ["More effort?","Or clearer words?"] },
    { kind: "content", title: "A tool is a promise 🤝",
      lead: "You tell the agent: \"this tool does X\". It believes you.", items: [
      { cards: [
        { h: "The function", lines: ["The code that runs:", "search, save, send."] },
        { h: "The schema", lines: ["What goes in:", "Zod describes the shape."], color: "orange" },
        { h: "The description", lines: ["When to use it —", "written for the AI."], color: "green" }
      ]},
      { note: "The agent never reads your code. It only reads your descriptions!" }
    ]},
    { kind: "content", title: "Your first tool 🔧", items: [
      { code: [
        'const saveIdea = tool(',
        '  async ({ idea }) => db.save(idea),',
        '  {',
        '    name: "save_idea",',
        '    description: "Save one video idea to the database.",',
        '    schema: z.object({',
        '      idea: z.string().describe("the full video idea text"),',
        '    }),',
        '  }',
        ');'
      ]},
      { note: "Every .describe() is a little note to the AI. Write it well." }
    ]},
    { kind: "newword", term: "Zod",
      meaning: "A JS library that describes the shape of data: \"this must be text\", \"this must be a number\".",
      extra: ".describe() adds a note the agent reads to understand each field." },
    { kind: "discuss", q: "An agent has the right tools — but picks the wrong one. Why?",
      hints: ["A bad tool?","A bad description?"] },
    { kind: "content", title: "The confused agent 😵‍💫",
      lead: "This agent has tools… and no idea how to use them.", items: [
      { lines: [
        "Its tool descriptions are empty or wrong.",
        "Its system prompt says two opposite things.",
        "So it guesses. And guesses wrong.",
        "Sound familiar? Bad instructions = bad work."
      ]},
      { note: "An agent is only as good as what you tell it." }
    ]},
    { kind: "content", title: "Part 1 · Task ✅ Fix it", items: [
      { lines: [
        "Run the confused agent. Watch it fail. 📸",
        "Read its tool descriptions. Find the bad ones.",
        "Rewrite them: clear, short, honest.",
        "Find the contradiction in the system prompt. Fix it.",
        "Run again. 📸 Feel the power."
      ]}
    ]},
    { kind: "content", title: "Write prompts like a boss · RTOC 📋", items: [
      { cards: [
        { h: "R · Role", lines: ["Who is the agent?", "\"You are a trend expert.\""] },
        { h: "T · Task", lines: ["What exactly to do?", "One clear job."], color: "orange" },
        { h: "O · Output", lines: ["What shape of answer?", "\"Return 3 bullets.\""], color: "green" },
        { h: "C · Constraints", lines: ["The rules.", "\"Hebrew only. No emojis.\""], color: "dark" }
      ]},
      { note: "Four letters. Works on agents, chatbots — and people. 😉" }
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["Agent picks the wrong tool.", "Saves nothing.", "Answers nonsense. 😵"],
      after: ["Clear describes + clean prompt.", "Right tool, every time. 🎉"],
      note: "📸 This before/after is GOLD for your portfolio." },
    { kind: "section", title: "Break ☕", sub: "30 minutes" },
    { kind: "discuss", q: "A trend is just one word. How do you turn it into a video idea?",
      hints: ["What happens in it?","How does it look?"] },
    { kind: "content", title: "Part 2 · Agent 2: the idea maker 💡",
      lead: "The Studio grows. Trend in → video idea out.", items: [
      { lines: [
        "Agent 2 takes ONE trend from Agent 1.",
        "It writes one video idea + a short description.",
        "Build it: model + RTOC prompt + a save tool.",
        "Test it with the real trends you saved last week."
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["A trend name.", "Just text.", "No plan, no video. 🤷‍♀️"],
      after: ["A full video idea:", "what happens, how it looks,", "written by YOUR agent. 🎬"],
      note: "📸 Save the idea — the pipeline needs it soon!" },
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: tool · schema · .describe() · RTOC.",
        "Explain it in 2 sentences.",
        "Show your confused-agent before/after."
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "Two agents are nice. A TEAM of agents is better.",
        "We build the chain: Agent 1 → Agent 2.",
        "One supervisor to manage them all."
      ]},
      { note: "Next week your agents start talking to each other. ⛓️" }
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Open opencode on the Studio repo and try:", items: [
      { rows: [
        ["Understand", "\"Walk me through Agent 2's tool, line by line.\""],
        ["Experiment", "\"Make a tool description worse. What happens?\""],
        ["RTOC", "\"Rewrite this prompt in RTOC form.\""],
        ["Spec first", "\"Spec a 'funny ideas only' option before coding it.\""],
        ["Bug", "\"Find a bug in my tool schema and prove it.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["Zod", "zod.dev — the schema library we use"],
        ["LangChain tools", "js.langchain.com — the tools guide"],
        ["Prompt guide", "promptingguide.ai — more prompt patterns"],
        ["Nir's tutorial", "our reference project on GitHub"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["tool()", "the function that wraps code so an agent can use it"],
        ["schema", "the shape of the data a tool accepts"],
        ["Zod", "the JS library we use to write schemas"],
        [".describe()", "a note to the agent about one field"],
        ["RTOC", "Role · Task · Output · Constraints — a prompt recipe"],
        ["contradiction", "two instructions that fight each other"],
        ["Agent 2", "our Studio's idea maker: trend in → video idea out"]
      ]}
    ]}
  ]
},

/* ================= LESSON 5 ================= */
{
  n: 5, emoji: "⛓️", title: "Agents in a Chain",
  project: "P3 · The loop, the supervisor + shared memory",
  goal: "Build a tiny agent loop by hand, then connect Agents 1 + 2 with a supervisor and a shared database.",
  leaves: "The 1→2 pipeline runs through a supervisor + writes to Mongo.",
  tutorial: [
    { label: "Nir's tutorial — supervisor chapter", url: NIR_TUTORIAL },
    { label: "MongoDB basics — insert + find", url: "https://www.mongodb.com/basics" },
    { label: "LangChain JS — multi-agent guide", url: "https://js.langchain.com" }
  ],
  missions: [
    "Build the mini loop by hand: ask → act → check → again (~30 min, in pairs).",
    "Say it out loud: \"createAgent is exactly this loop.\" Now you know the secret.",
    "Wire the supervisor: it can call Agent 1 and Agent 2 as tools.",
    "Connect Mongo so both agents read and write shared data.",
    "Run the full chain: trend found → idea written → saved to the DB.",
    "📸 Screenshot the Mongo document your pipeline created."
  ],
  slides: [
    { kind: "title", title: "Lesson 5 · Agents in a Chain ⛓️",
      sub: "Project P3 · The loop, the supervisor + shared memory" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Opener · ~30 min: build the agent loop BY HAND",
        "Part 1 · the supervisor pattern",
        "Break ☕",
        "Part 2 · connect agents 1 + 2 + the database",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we look inside the magic" },
    { kind: "discuss", q: "Last time: tools + Zod. Why do tool descriptions matter so much?",
      hints: ["Who reads them?","What if they're empty?"] },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "Tools = function + schema + description.",
        "You fixed a confused agent with better words.",
        "Agent 2 turns trends into video ideas."
      ]}
    ]},
    { kind: "discuss", q: "createAgent feels like magic. What do you think is inside?",
      hints: ["A loop?","1,000 lines of code?"] },
    { kind: "content", title: "What's inside createAgent? 🔍",
      lead: "Time to open the magic box. It's… a loop.", items: [
      { lines: [
        "1. Send the question to the model.",
        "2. Model answers — or asks for a tool.",
        "3. Run the tool. Give the result back.",
        "4. Repeat until the model says: done."
      ]},
      { note: "That's it. That's the whole secret. 🤯" }
    ]},
    { kind: "content", title: "Build it by hand 🖐️",
      lead: "~30 minutes, in pairs. A loop in plain JS.", items: [
      { code: [
        'while (true) {',
        '  const answer = await model.invoke(messages);',
        '  if (!answer.tool_calls?.length) break; // done!',
        '  const result = await runTool(answer.tool_calls[0]);',
        '  messages.push(answer, result);',
        '}'
      ]},
      { note: "When it runs, say it with me: \"createAgent is exactly this.\"" }
    ]},
    { kind: "discuss", q: "What does a good team leader do?",
      hints: ["Does all the work?","Or gives out the jobs?"] },
    { kind: "newword", term: "supervisor",
      meaning: "An agent whose tools are… other agents. It decides who works next.",
      extra: "Like a team lead: doesn't do the tasks, assigns them." },
    { kind: "content", title: "The supervisor pattern 👩‍💼", items: [
      { cards: [
        { h: "👩‍💼 Supervisor", lines: ["Reads the goal.", "Picks who works."] },
        { h: "🔎 Agent 1", lines: ["Finds trends.", "Reports back."], color: "orange" },
        { h: "💡 Agent 2", lines: ["Makes the idea.", "Reports back."], color: "green" }
      ]},
      { note: "To the supervisor, each agent is just… a tool. Mind blown. 🤯" }
    ]},
    { kind: "section", title: "Break ☕", sub: "30 minutes" },
    { kind: "discuss", q: "Two agents on one team. How do they share what they know?",
      hints: ["Copy-paste?","A shared database?"] },
    { kind: "content", title: "Part 2 · Shared memory 🧠",
      lead: "Agents on a team need to share what they know.", items: [
      { lines: [
        "Agent 1 saves trends to Mongo.",
        "Agent 2 reads them, writes ideas back.",
        "Tomorrow's run can see yesterday's work.",
        "The database is the team's shared brain."
      ]}
    ]},
    { kind: "content", title: "Part 2 · Task ✅ Chain it all", items: [
      { lines: [
        "Wire the supervisor: agents 1 + 2 as its tools.",
        "Connect the Mongo layer.",
        "One command: \"make me a video idea from today's trends.\"",
        "Watch the chain: search → idea → saved. ⛓️"
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["Two lonely agents.", "You copy data between them", "by hand. 😩"],
      after: ["One command.", "The supervisor runs the team.", "The idea is in the DB. 🎉"],
      note: "📸 Screenshot the Mongo document your pipeline wrote." },
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: the loop · supervisor · shared memory.",
        "Explain it in 2 sentences.",
        "Show the document your chain created."
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "The missing piece: Agent 3, the video maker.",
        "The whole Studio on a real screen — the UI.",
        "And your team's hackathon plan. 🔥"
      ]},
      { note: "Next week: lights, camera, Agent 3 — and grand opening. 🎬" }
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Open opencode on the Studio repo and try:", items: [
      { rows: [
        ["Understand", "\"Explain the supervisor's prompt. Why does it work?\""],
        ["Experiment", "\"What happens if both agents have the same name?\""],
        ["Trace", "\"Show me the messages the loop sends, step by step.\""],
        ["Spec first", "\"Spec a third team member before we build it.\""],
        ["Project notes", "\"Update our CLAUDE.md with the supervisor rules.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["Multi-agent systems", "js.langchain.com — multi-agent guide"],
        ["MongoDB", "mongodb.com/basics — insert + find"],
        ["Nir's tutorial", "the supervisor chapter in our reference repo"],
        ["Agentic patterns", "deeplearning.ai — agentic design patterns"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["loop", "ask → act → check → again, until done"],
        ["supervisor", "an agent that manages other agents"],
        ["sub-agent", "an agent used as a tool by another agent"],
        ["shared memory", "a database all the agents can read and write"],
        ["pipeline", "work flowing through agents in order"],
        ["invoke", "run the model once and get its answer"],
        ["state", "everything the team knows right now"]
      ]}
    ]}
  ]
},

/* ================= LESSON 6 (was 6 + 7) ================= */
{
  n: 6, emoji: "🎬", title: "Agent 3 + Grand Opening",
  project: "P3–P4 · The video maker, the full Studio + hackathon prep",
  goal: "Build Agent 3 — idea in, real video out — run the whole Studio on screen, and get your team ready for the hackathon.",
  leaves: "Your first AI video, the full Studio running, and your team's hackathon plan.",
  tutorial: [
    { label: "Nir's tutorial — full reference (incl. the bonus UI)", url: NIR_TUTORIAL },
    { label: "Our Studio repo — the finished pipeline", url: "https://github.com/Yana205" },
    { label: "LangChain JS — docs for your extra feature", url: "https://js.langchain.com" }
  ],
  missions: [
    "Build Agent 3: it turns a video idea into a prompt for the video service — and gets a real video back.",
    "Run the FULL Studio on the UI: trend → idea → video. 🎬",
    "Edit one idea in the UI before it becomes a video.",
    "⭐ Bonus: add ONE feature (genre filter / Israel trends / your idea).",
    "Form your hackathon team. Write the one-pager: idea, MVP, who does what.",
    "📸 Screenshot your first video + the full pipeline run."
  ],
  slides: [
    { kind: "title", title: "Lesson 6 · Agent 3 + Grand Opening 🎬",
      sub: "Project P3–P4 · The video maker, the full Studio + hackathon prep" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · Agent 3: idea → video",
        "Break ☕",
        "Part 2 · the full Studio + your hackathon plan",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then: opening night 🎬" },
    { kind: "discuss", q: "Last time: the loop + the supervisor. Who does what in our agent team?",
      hints: ["Agent 1? Agent 2?","The supervisor?"] },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "You built the agent loop by hand. No more magic.",
        "The supervisor runs agents 1 + 2 as a team.",
        "Mongo is the team's shared memory."
      ]}
    ]},
    { kind: "discuss", q: "Our pipeline stops at an idea. What's missing?",
      hints: ["A video?","Who makes it?"] },
    { kind: "content", title: "The missing piece 🧩",
      lead: "Our pipeline stops at an idea. Time to SHIP.", items: [
      { cards: [
        { h: "In", lines: ["A video idea,", "written by Agent 2."] },
        { h: "Agent 3", lines: ["Turns it into a prompt", "a video service understands."], color: "orange" },
        { h: "Out", lines: ["A real video file.", "Made by AI. 🤯"], color: "green" }
      ]},
      { note: "Agent 3 talks to an outside service — through an API. Week 1 knowledge!" }
    ]},
    { kind: "discuss", q: "What makes a video idea \"doable\" for an AI?",
      hints: ["Vibes?","Or details?"] },
    { kind: "content", title: "A prompt for video 🎥",
      lead: "Video services want DETAILS, not vibes.", items: [
      { lines: [
        "Bad: \"a cool cat video\" 😿",
        "Good: \"a fluffy orange cat dancing in a pink",
        "kitchen, bright light, camera slowly zooms in\"",
        "Agent 3's whole job: write prompts like THAT."
      ]},
      { note: "RTOC strikes again — Output and Constraints matter most here." }
    ]},
    { kind: "content", title: "Part 1 · Task ✅ Build Agent 3", items: [
      { lines: [
        "Open the Agent 3 file — it's waiting in the repo.",
        "RTOC prompt: turn an idea into a video prompt.",
        "Wire the video-service tool: send, wait, receive.",
        "Test with YOUR idea from last week.",
        "Watch your first AI video. 🍿"
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["An idea in the database.", "Just text.", "No pictures, no sound."],
      after: ["A real video,", "made from YOUR idea,", "by YOUR pipeline. 🎬"],
      note: "📸 Save that video. It's going in the showcase." },
    { kind: "section", title: "Break ☕", sub: "30 minutes — last one before the hackathon 😱" },
    { kind: "content", title: "Part 2 · Grand opening 🖥️",
      lead: "Until now: terminal. Now: a real screen.", items: [
      { lines: [
        "Pull the latest repo. Start the Studio UI.",
        "Run it: trend → idea → video, live on screen.",
        "Edit one idea in the UI before it renders.",
        "⭐ Bonus: add ONE feature. Genre filter? Israel trends? 💜"
      ]}
    ]},
    { kind: "content", title: "Look how far you've come 🥹", items: [
      { cards: [
        { h: "Week 1", lines: ["\"What's a", "collection again?\""] },
        { h: "Week 4", lines: ["Fixing confused agents", "like a pro."], color: "orange" },
        { h: "Today", lines: ["Running a full", "AI video studio. 💅"], color: "green" }
      ]},
      { note: "Six weeks. From zero agents to a full pipeline. That's YOU." }
    ]},
    { kind: "content", title: "The HACKATHON 🔥",
      lead: "7–9 December · Hanukkah · 3 days · your build", items: [
      { lines: [
        "Day 1 · together in class: idea + start building",
        "Days 2–3 · on Zoom: build, test, polish",
        "You build something with the Studio's scope.",
        "Your agents. Your idea. Your product."
      ]},
      { note: "It's a celebration, not a test. Everyone demos. 🎉" }
    ]},
    { kind: "discuss", q: "3 days, your team, any idea. What would YOU build?",
      hints: ["Small enough for 3 days?","With an agent inside?"] },
    { kind: "content", title: "What makes a great hackathon idea? 💡", items: [
      { cards: [
        { h: "Small enough", lines: ["An MVP you can", "finish in 3 days."] },
        { h: "Agent-powered", lines: ["At least one agent", "with real tools."], color: "orange" },
        { h: "Yours", lines: ["Something YOU", "actually want to use."], color: "green" }
      ]},
      { note: "MVP = the smallest version that really works." }
    ]},
    { kind: "content", title: "Your team's one-pager 📋",
      lead: "Before you leave today, write it down:", items: [
      { lines: [
        "The idea — one sentence.",
        "The MVP — what MUST work at the demo.",
        "The agents — who does what in the pipeline.",
        "The team — who builds which part."
      ]},
      { note: "A spec first. Then code. Like a boss. 😎" }
    ]},
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: Agent 3 · video prompt · MVP. Explain it in 2 sentences.",
        "Show your first AI video. 🎬",
        "Tell us your team's idea in one sentence."
      ]}
    ]},
    { kind: "content", title: "Hackathon checklist ✅", items: [
      { rows: [
        ["Team", "2–3 girls, names written down"],
        ["Idea", "one sentence, approved by the team"],
        ["MVP", "the smallest demo that works"],
        ["Repo", "created, everyone can push"],
        ["Keys", "API keys ready in .env (never in git!)"],
        ["Proof habit", "📸 before/after at every step"]
      ]}
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Warm up for the hackathon with opencode:", items: [
      { rows: [
        ["Spec first", "\"Here's our hackathon idea. Help me write the MVP spec.\""],
        ["Plan", "\"Split this spec into 3 days of work for 3 people.\""],
        ["Trace", "\"Follow one idea from Mongo to the video call.\""],
        ["Practice", "\"Quiz me: agents, tools, supervisor. Simple English.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Before the hackathon, if you're curious.", items: [
      { rows: [
        ["Our Studio repo", "read the code you'll build from"],
        ["Nir's tutorial", "the full reference + the bonus UI chapter"],
        ["LangChain JS", "js.langchain.com — docs for your feature"],
        ["Rest!", "seriously — sleep before the hackathon 😴"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["Agent 3", "our video maker: idea → prompt → real video"],
        ["video prompt", "a very detailed description a video AI understands"],
        ["UI", "user interface — the screen people see and click"],
        ["end to end", "the whole pipeline, start to finish"],
        ["MVP", "the smallest version that really works"],
        ["spec", "a short plan written BEFORE the code"],
        ["demo", "showing your working build to everyone"],
        ["hackathon", "3 days, one team, one build, zero judging"]
      ]}
    ]}
  ]
}
];

/* Hackathon meta for the roadmap */
const HACKATHON = {
  emoji: "🔥", title: "The Hackathon", date: "7–9 Dec 2026",
  desc: "Three days at Hanukkah. Day 1 together, days 2–3 on Zoom. You build something with the Studio's scope — your idea, your agents, your demo. A celebration, not a test."
};

/* Original girl-boss / girl-code one-liners (ours, no copyrights) */
const MEMES = [
  { tag: "girl code", text: "She saw the error message… and read it. 💅", theme: "m-pink" },
  { tag: "girl boss", text: "My agent has one job. I have ten. We are not the same. ☕", theme: "m-purple" },
  { tag: "girl code", text: "Dear bug: I know where you live. In MY code. Moving out today. 📦", theme: "m-sunset" },
  { tag: "energy", text: "Build like everyone's watching your demo. Because on 4.6 — they are. 🎤", theme: "m-mint" },
  { tag: "girl boss", text: "\"It works on my machine\" — honey, we push to the shared repo here. 😌", theme: "m-purple" },
  { tag: "girl code", text: "Before: 400 errors. After: 0. Screenshot or it didn't happen. 📸", theme: "m-pink" },
  { tag: "truth", text: "The AI types the code. YOU make the decisions. That's the boss part. 👑", theme: "m-sunset" },
  { tag: "girl code", text: "Roses are red, my prompt is precise — my agent picked the right tool twice. 🌹", theme: "m-mint" },
  { tag: "mood", text: "Semicolon missing? Not anymore. We don't do mysteries, we do queries. 🔍", theme: "m-pink" },
  { tag: "girl boss", text: "Some girls collect stickers. We collect working pipelines. ⛓️✨", theme: "m-purple" }
];

/* ============================================================
   FLOWS — "Today's flow" for the instructor: a 3-hour timeline per lesson.
   Each block: start time · name · minutes · slides · steps. Break at 1:30.
   Step kinds: talk = 💬 they answer first · demo = 🎩 live demo (concept + before → after)
               do = ✋ students work · show = 📽️ you show / explain · glimpse = 👀 a peek ahead
   ============================================================ */

const FLOWS = {
  1: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps. Tell them: on a 💬 slide, YOU answer first." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "Skribbl.io — custom words", url: "https://skribbl.io" }, steps: [
        { k: "do", text: "Draw & guess with our words: API, server, database, JSON, cloud, waiter, pizza…" } ] },
      { t: "0:20", icon: "🤖", name: "Chat vs. build", min: 8, slides: "4–5", steps: [
        { k: "talk", text: "This summer — how did YOU use AI?" },
        { k: "demo", concept: "AI agents", before: "AI chat: 20 min of clicking", after: "An agent does the whole job at 8 AM" } ] },
      { t: "0:28", icon: "👀", name: "Glimpse ahead", min: 5, slides: "6–8", steps: [
        { k: "glimpse", text: "Where we're going until the hackathon: a team of agents that makes TikToks. High level only — each lesson builds one piece." } ] },
      { t: "0:33", icon: "🦸‍♀️", name: "Prompt power", min: 10, slides: "9–11", steps: [
        { k: "talk", text: "Same AI, same button. One gets great code, one gets junk. Why?" },
        { k: "show", text: "Your superpower: the code words you already know (flexbox, hover, id…)." },
        { k: "demo", concept: "Prompt words", before: "Vague prompt → a plain button", after: "Pro prompt → the exact design" },
        { k: "do", text: "\"Your turn\": they write a prompt with the 3 new words." } ] },
      { t: "0:43", icon: "🌐", name: "APIs", min: 12, slides: "12–16", steps: [
        { k: "talk", text: "Do you remember what an API is?  → then reveal the waiter." },
        { k: "talk", text: "You type \"pikachu\" and press a button. What comes back?" },
        { k: "demo", concept: "API", before: "You type a Pokémon name", after: "The internet answers with live JSON" },
        { k: "show", text: "Postman + JSON: test the API first, then the same request in code." } ] },
      { t: "0:55", icon: "💾", name: "Databases", min: 20, slides: "17–23", steps: [
        { k: "talk", text: "Close Instagram, open it again — your likes are still there. How?" },
        { k: "show", text: "What is a database? App → server → database. Click into MongoDB: cluster › database › collection › document." },
        { k: "show", text: "Databases come in shapes: relational (SQL tables), document (MongoDB ⭐), key-value, graph. Bonus: the freeCodeCamp link." },
        { k: "demo", concept: "Memory", before: "Variables: refresh → everything is gone", after: "MongoDB: refresh → it's all still there" },
        { k: "talk", text: "1,000 TikTok videos. What do you save about EACH one?" },
        { k: "show", text: "A good table: one row = one thing, a unique id, the same fields." } ] },
      { t: "1:15", icon: "✅", name: "Part 1 · task", min: 15, slides: "24–25", steps: [
        { k: "talk", text: "30 videos. Which has the most likes — without scrolling?" },
        { k: "do", text: "On their laptops: this site → Lesson 1 → 🧪 Labs → Part 1. 4 exercises + 📸 screenshot." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "26", steps: [] },
      { t: "2:00", icon: "🔌", name: "Watch: connect", min: 15, slides: "27–28", steps: [
        { k: "talk", text: "The app that forgot everything — what does it need?" },
        { k: "demo", concept: "Connecting", before: "Idea Tracker: restart → ideas gone", after: "3 steps → restart → still there" },
        { k: "show", text: "You do it live on your laptop (your own key in .env). They watch — no install today." } ] },
      { t: "2:15", icon: "🔒", name: "Your key is a secret", min: 15, slides: "29–30", steps: [
        { k: "talk", text: "Your app has a key to the database. What if a stranger finds it?" },
        { k: "demo", concept: "Secrets", before: "Key in server.js → on GitHub for everyone", after: "Key in .env + .gitignore → GitHub never sees it" },
        { k: "talk", text: "Click each part of the key: who · password · where · which database." } ] },
      { t: "2:30", icon: "🏠", name: "Try it yourself", min: 15, slides: "31", steps: [
        { k: "show", text: "Video + article + our Idea Tracker guide. Optional, at home. Stuck → bring a screenshot." },
        { k: "do", text: "Time left? Fast ones start the guide now: Atlas account + free cluster." } ] },
      { t: "2:45", icon: "🗣️", name: "Explain to me", min: 15, slides: "32–35", steps: [
        { k: "do", text: "Pick a word (API · JSON · collection · .env), explain it in 2 sentences, show screenshots." },
        { k: "show", text: "Glossary, toolkit, next time." } ] }
    ]
  },
  2: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "Gartic Phone", url: "https://garticphone.com" }, steps: [
        { k: "do", text: "Broken telephone with drawings." },
        { k: "talk", text: "What got lost along the chain? A long AI chat does the same. Why?" } ] },
      { t: "0:20", icon: "🔁", name: "Last time", min: 5, slides: "4–5", steps: [
        { k: "talk", text: "Last time we built with APIs + MongoDB. What do you remember?" },
        { k: "show", text: "Reveal: APIs, JSON, MongoDB." } ] },
      { t: "0:25", icon: "💡", name: "Vibe coding", min: 20, slides: "6–11", steps: [
        { k: "talk", text: "Can an AI write code for you? Then who is the boss?" },
        { k: "show", text: "The big idea: you describe → AI codes → YOU check." },
        { k: "talk", text: "You tell an AI \"build me a website\". What do you get?" },
        { k: "demo", concept: "Explicit prompts", before: "\"Build me a flower shop site\" → the AI guesses everything", after: "Navbar, 6 cards, pink #D83474… → her exact vision" },
        { k: "do", text: "Flower Shop Lab: one vague vs. one explicit prompt — live." } ] },
      { t: "0:45", icon: "✅", name: "Part 1 · LLM challenge", min: 25, slides: "12–13", steps: [
        { k: "do", text: "Paste a real exercise from last year into Gemini / Claude. Read the answer. Test it." },
        { k: "demo", concept: "Fix by chatting", before: "The code crashes on an empty list", after: "The AI spots it, we test the fix → green" } ] },
      { t: "1:10", icon: "🙈", name: "What the AI misses", min: 20, slides: "14–17", steps: [
        { k: "talk", text: "The AI was fast. Was it always right? What did it miss?" },
        { k: "show", text: "It can't see · it forgets · it sounds sure. 3 words: token · context window · system prompt." },
        { k: "do", text: "📸 Proof: the error + the fix." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "18", steps: [] },
      { t: "2:00", icon: "🤝", name: "Meet the coding agent", min: 10, slides: "19–20", steps: [
        { k: "talk", text: "Copy-paste is getting old. What if the AI could open your WHOLE project?" },
        { k: "show", text: "Chat LLM = advice. Coding agent = hands on your project. Ours: opencode." } ] },
      { t: "2:10", icon: "🔧", name: "Part 2 · install", min: 20, slides: "21", steps: [
        { k: "do", text: "Install opencode (Setup page). Open last year's project. Ask: \"What does this project do?\"" } ] },
      { t: "2:30", icon: "🕵️‍♀️", name: "Bug hunt", min: 15, slides: "22–24", steps: [
        { k: "demo", concept: "Coding agent", before: "The page loads… and shows nothing", after: "The agent finds the bad file → one fix, it works" },
        { k: "do", text: "They let the agent find the hidden bug. Fix, run, test, 📸." },
        { k: "show", text: "New word: skill." } ] },
      { t: "2:45", icon: "🗣️", name: "Explain to me", min: 15, slides: "25–29", steps: [
        { k: "do", text: "Pick token · context window · coding agent → 2 sentences + their before/after." },
        { k: "show", text: "Next time, prompts to try, glossary." } ] }
    ]
  },
  3: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "Robot & Operator (or Skribbl)", url: "https://skribbl.io" }, steps: [
        { k: "do", text: "In pairs: one is the robot, one gives exact commands. Bad instructions = funny robot." } ] },
      { t: "0:20", icon: "🔁", name: "Last time", min: 5, slides: "4–5", steps: [
        { k: "talk", text: "Last time an LLM solved your old exercise. What can't a chat AI do?" },
        { k: "show", text: "Reveal: LLMs, tokens, opencode." } ] },
      { t: "0:25", icon: "🌍", name: "Agents everywhere", min: 10, slides: "6–8", steps: [
        { k: "talk", text: "Which AI agents did you meet this week? Who built them?" },
        { k: "show", text: "Agents are everywhere — and today we switch sides: from USING to BUILDING." } ] },
      { t: "0:35", icon: "🧩", name: "What's an agent made of", min: 20, slides: "9–12", steps: [
        { k: "talk", text: "You build a robot helper. What parts does it need?" },
        { k: "show", text: "Model + system prompt + tools + access = an agent." },
        { k: "demo", concept: "createAgent", before: "3 parts on the table: model, prompt, tool", after: "7 lines of code → an agent that talks" } ] },
      { t: "0:55", icon: "✅", name: "Part 1 · wake it up", min: 35, slides: "13–14", steps: [
        { k: "do", text: "Complete the half-built agent: add a system prompt + one tool. Run it. Try to break it." },
        { k: "do", text: "📸 Proof: the answer before vs. after." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "15", steps: [] },
      { t: "2:00", icon: "🔎", name: "Agent 1 · trend finder", min: 10, slides: "16–18", steps: [
        { k: "talk", text: "How would an agent find TODAY's TikTok trends?" },
        { k: "show", text: "Our first real agent searches the internet. New word: Tavily — search made for agents." } ] },
      { t: "2:10", icon: "🔧", name: "Part 2 · finish Agent 1", min: 30, slides: "19–21", steps: [
        { k: "do", text: "In pairs (driver + navigator, switch every 20 min): pull the repo, add the Tavily tool, prompt: \"find 3 trends from today\"." },
        { k: "demo", concept: "Tools", before: "\"I cannot browse the internet.\"", after: "3 real trends from today, found by YOUR agent" } ] },
      { t: "2:40", icon: "🗣️", name: "Explain to me", min: 20, slides: "22–26", steps: [
        { k: "do", text: "Pick agent · tool · system prompt · Tavily → 2 sentences + their before/after." },
        { k: "do", text: "💾 Save the trends — Agent 2 needs them next week." },
        { k: "show", text: "Next time, prompts to try, glossary." } ] }
    ]
  },
  4: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "Describe the Tool (Taboo style)", url: "https://codenames.game" }, steps: [
        { k: "do", text: "Describe an everyday tool without saying its name — exactly what .describe() does." } ] },
      { t: "0:20", icon: "🔁", name: "Last time", min: 5, slides: "4–5", steps: [
        { k: "talk", text: "Last time you built your first agent. What 4 parts make an agent?" },
        { k: "show", text: "Reveal: model + prompt + tools + access; Agent 1 finds trends." } ] },
      { t: "0:25", icon: "🤝", name: "A tool is a promise", min: 15, slides: "6–9", steps: [
        { k: "talk", text: "When did bad instructions ruin a task for you?" },
        { k: "show", text: "A tool = function + schema + description. The agent only reads the description." },
        { k: "show", text: "Your first tool: tool() + Zod + .describe()." } ] },
      { t: "0:40", icon: "😵‍💫", name: "The confused agent", min: 10, slides: "10–11", steps: [
        { k: "talk", text: "An agent has the right tools — but picks the wrong one. Why?" },
        { k: "demo", concept: ".describe()", before: "Empty descriptions → wrong tool, saves nothing", after: "Clear words → the right tool, every time" } ] },
      { t: "0:50", icon: "✅", name: "Part 1 · fix it", min: 40, slides: "12–14", steps: [
        { k: "do", text: "Run it, watch it fail 📸. Rewrite the bad descriptions + fix the contradiction in the prompt. Run again 📸." },
        { k: "show", text: "RTOC: Role · Task · Output · Constraints." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "15", steps: [] },
      { t: "2:00", icon: "💡", name: "Part 2 · Agent 2", min: 45, slides: "16–18", steps: [
        { k: "talk", text: "A trend is just one word. How do you turn it into a video idea?" },
        { k: "show", text: "Agent 2: one trend in → one video idea out." },
        { k: "do", text: "Build it: model + RTOC prompt + a save tool. Test with last week's trends." },
        { k: "demo", concept: "Agent 2", before: "A trend name. Just text.", after: "A full video idea, written by YOUR agent" } ] },
      { t: "2:45", icon: "🗣️", name: "Explain to me", min: 15, slides: "19–23", steps: [
        { k: "do", text: "Pick tool · schema · .describe() · RTOC → 2 sentences + the confused-agent before/after." },
        { k: "show", text: "Next time, prompts to try, glossary." } ] }
    ]
  },
  5: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "Gartic Phone — chain mode", url: "https://garticphone.com" }, steps: [
        { k: "do", text: "A chain of players, each passing work to the next. ⛓️" } ] },
      { t: "0:20", icon: "🔁", name: "Last time", min: 5, slides: "4–5", steps: [
        { k: "talk", text: "Last time: tools + Zod. Why do tool descriptions matter so much?" },
        { k: "show", text: "Reveal: tools, describes, Agent 2 makes video ideas." } ] },
      { t: "0:25", icon: "🔍", name: "Inside createAgent", min: 5, slides: "6–7", steps: [
        { k: "talk", text: "createAgent feels like magic. What do you think is inside?" },
        { k: "show", text: "The secret: it's a loop — ask → act → check → again." } ] },
      { t: "0:30", icon: "🖐️", name: "Build the loop by hand", min: 30, slides: "8", steps: [
        { k: "do", text: "In pairs: ~10 lines of plain JS. When it runs, say it: \"createAgent is exactly this.\"" },
        { k: "demo", concept: "The agent loop", before: "createAgent = a magic box", after: "createAgent = a 10-line loop" } ] },
      { t: "1:00", icon: "👩‍💼", name: "The supervisor", min: 30, slides: "9–11", steps: [
        { k: "talk", text: "What does a good team leader do?" },
        { k: "show", text: "Supervisor = an agent whose tools are other agents." },
        { k: "do", text: "Draw the pipeline on paper: who calls whom, what is saved where." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "12", steps: [] },
      { t: "2:00", icon: "🧠", name: "Shared memory", min: 10, slides: "13–14", steps: [
        { k: "talk", text: "Two agents on one team. How do they share what they know?" },
        { k: "show", text: "Agent 1 saves trends to Mongo. Agent 2 reads them and writes ideas back." } ] },
      { t: "2:10", icon: "⛓️", name: "Part 2 · chain it", min: 35, slides: "15–16", steps: [
        { k: "do", text: "Wire the supervisor (Agents 1 + 2 as its tools) + Mongo. One command: \"make me a video idea from today's trends\"." },
        { k: "demo", concept: "Supervisor", before: "Two lonely agents — you copy data by hand", after: "One command — the idea lands in the database" },
        { k: "do", text: "📸 the Mongo document their chain wrote." } ] },
      { t: "2:45", icon: "🗣️", name: "Explain to me", min: 15, slides: "17–21", steps: [
        { k: "do", text: "Pick the loop · supervisor · shared memory → 2 sentences + their document." },
        { k: "show", text: "Next time, prompts to try, glossary." } ] }
    ]
  },
  6: {
    timeline: [
      { t: "0:00", icon: "👋", name: "Welcome", min: 5, slides: "1–2", steps: [
        { k: "show", text: "Today's steps." } ] },
      { t: "0:05", icon: "🎮", name: "Game", min: 15, slides: "3",
        game: { name: "TikTok Charades", url: "https://garticphone.com" }, steps: [
        { k: "do", text: "Act a TikTok trend with no words — a bad prompt is charades." } ] },
      { t: "0:20", icon: "🔁", name: "Last time", min: 5, slides: "4–5", steps: [
        { k: "talk", text: "Last time: the loop + the supervisor. Who does what in our agent team?" },
        { k: "show", text: "Reveal: the loop, the supervisor, shared memory." } ] },
      { t: "0:25", icon: "🧩", name: "Agent 3", min: 10, slides: "6–9", steps: [
        { k: "talk", text: "Our pipeline stops at an idea. What's missing?" },
        { k: "show", text: "The missing piece: idea → video prompt → a real video (through an API — week 1!)." },
        { k: "talk", text: "What makes a video idea \"doable\" for an AI?" },
        { k: "demo", concept: "Video prompts", before: "\"a cool cat video\" 😿", after: "\"fluffy orange cat dancing in a pink kitchen, camera zooms in\"" } ] },
      { t: "0:35", icon: "✅", name: "Part 1 · build Agent 3", min: 55, slides: "10–11", steps: [
        { k: "do", text: "Open the Agent 3 file: RTOC prompt + the video tool. Test with THEIR idea from last week." },
        { k: "do", text: "📸 Save the first AI video." } ] },
      { t: "1:30", icon: "☕", name: "Break", min: 30, slides: "12", steps: [] },
      { t: "2:00", icon: "🖥️", name: "Grand opening", min: 25, slides: "13–14", steps: [
        { k: "demo", concept: "The full Studio", before: "The terminal, one agent at a time", after: "Trend → idea → video, live on screen" },
        { k: "do", text: "They run it, edit one idea before it renders. Done early → one bonus feature." },
        { k: "show", text: "Look how far you've come. 🥹" } ] },
      { t: "2:25", icon: "🔥", name: "Hackathon plan", min: 25, slides: "15–18", steps: [
        { k: "show", text: "7–9 Dec: day 1 in class, days 2–3 on Zoom. A celebration, not a test." },
        { k: "talk", text: "3 days, your team, any idea. What would YOU build?" },
        { k: "do", text: "Teams of 2–3. Great idea = small, agent-powered, theirs. Write the one-pager: idea, MVP, agents, who builds what." } ] },
      { t: "2:50", icon: "🗣️", name: "Explain to me", min: 10, slides: "19–23", steps: [
        { k: "do", text: "Each team: the idea in one sentence + their first AI video." },
        { k: "show", text: "Hackathon checklist, prompts to try, glossary." } ] }
    ]
  }
};

/* ============================================================
   VISUALS — illustration slots per slide (Upgrade B).
   Keyed by lesson number → exact slide title.
   Image file convention: assets/lesson-N/<id>.png
   Until the image exists, instructors see a placeholder with the
   Gemini prompt; students see a subtle "coming soon" chip.
   ============================================================ */

const VISUAL_STYLE = "Flat friendly cartoon illustration, rounded shapes, purple-to-magenta gradient (#674C9B to #A43F86), hot pink accents (#D83474), soft pink details, diverse teen girls when people appear, NO text in the image, 16:9.";

const VISUALS = {
  1: {
    "Quick refresh: what is an API? 🌐": { id: "v1-1", prompt: "A waiter carrying a pizza between a phone screen (customer) and a kitchen (server), restaurant scene." },
    "Your secret superpower 🦸‍♀️": { id: "v1-3", prompt: "A teen girl superhero, cape made of code brackets, floating icons: HTML tag, paint palette, lightning bolt." },
    "Steps today": { id: "v1-6", prompt: "Four icons on lavender: a pink game controller, a purple database stack, a coffee mug, a glowing lightbulb." }
  },
  2: {
    "But the AI misses things 🙈": { id: "v2-1", prompt: "A blindfolded robot at a desk holding one paper, a whole messy project bookshelf behind it that it cannot see." },
    "3 new words 🧠": { id: "v2-2", prompt: "A sentence breaking into colorful puzzle pieces flowing into a robot's head." },
    "Meet the coding agent 🤝": { id: "v2-3", prompt: "A robot with many arms working across multiple open files and screens at once." },
    "Why could she ask like that? 🧠": { id: "v2-4", prompt: "Split image: sad generic gray website vs joyful pink flower-shop website, on the same laptop." }
  },
  3: {
    "Agents are everywhere 🌍": { id: "v3-1", prompt: "Three friendly robots: one with a headset (support), one with a magnifying glass and newspapers (research), one with a keyboard (coding)." },
    "What is an agent made of? 🧩": { id: "v3-2", prompt: "Robot anatomy diagram style: glowing brain, clipboard job description, tool belt, key." },
    "Your first agent 🐣": { id: "v3-3", prompt: "A baby robot hatching from an egg, a girl's hands assembling it from 3 glowing parts." },
    "The TikTok Studio starts NOW 📱": { id: "v3-4", prompt: "A robot with a radar dish scanning floating trending symbols: music notes, dance figures, hearts." }
  },
  4: {
    "A tool is a promise 🤝": { id: "v4-1", prompt: "An open toolbox where every tool has a bright clear name tag." },
    "The confused agent 😵‍💫": { id: "v4-2", prompt: "A dizzy robot holding a fork trying to hammer a nail, tools with blank smudged labels scattered around." },
    "Write prompts like a boss · RTOC 📋": { id: "v4-3", prompt: "A recipe card held by a girl in a chef hat, four ingredient bowls in a row." },
    "Part 2 · Agent 2: the idea maker 💡": { id: "v4-4", prompt: "A robot with a giant lightbulb head turning a trend card into a film storyboard." }
  },
  5: {
    "What's inside createAgent? 🔍": { id: "v5-1", prompt: "A circular conveyor loop labeled by icons only (question, action, check), a little robot running laps on it." },
    "The supervisor pattern 👩‍💼": { id: "v5-2", prompt: "A clipboard team-lead robot pointing, two worker robots saluting." },
    "Part 2 · Shared memory 🧠": { id: "v5-3", prompt: "Two robots both plugging cables into one glowing heart-shaped database." }
  },
  6: {
    "The missing piece 🧩": { id: "v6-1", prompt: "A director robot with a clapperboard and beret, a film reel turning into a phone video." },
    "A prompt for video 🎥": { id: "v6-2", prompt: "Split: a blurry dream cloud vs a sharp detailed storyboard of a fluffy orange cat dancing in a pink kitchen." },
    "Part 2 · Grand opening 🖥️": { id: "v7-2", prompt: "Ribbon-cutting in front of a neon studio sign, confetti, a team of girls with their three robots." },
    "Look how far you've come 🥹": { id: "v7-1", prompt: "A mountain path from a tiny seedling at the bottom to a shining studio building on the peak, little flags along the way." },
    "The HACKATHON 🔥": { id: "v7-3", prompt: "A planning war-room table: map, sticky notes, three girls planning, a rocket model in the middle." }
  }
};
