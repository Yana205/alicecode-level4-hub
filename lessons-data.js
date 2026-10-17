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
  date: "19 Oct 2026", project: "P1 · Refresh: APIs + Databases",
  goal: "Warm up APIs, understand why apps need databases, and build your own Mongo collection.",
  leaves: "Mongo exercises done + a new collection YOU created.",
  tutorial: [
    { label: "MongoDB basics — short and friendly", url: "https://www.mongodb.com/basics" },
    { label: "JSON intro on W3Schools", url: "https://www.w3schools.com/js/js_json_intro.asp" },
    { label: "Play with a real API: PokeAPI", url: "https://pokeapi.co" }
  ],
  missions: [
    "Open the ready-made Mongo database and finish the 4 small exercises (read, filter, count).",
    "Find: which video has the most likes?",
    "Create a NEW collection about a topic you love.",
    "Insert 3 documents, each with a unique id.",
    "Find your documents with a query.",
    "📸 Screenshot your before + after for the portfolio."
  ],
  slides: [
    { kind: "title", title: "Lesson 1 · Back to Building 🚀",
      sub: "19 October 2026 · Project P1 · Refresh: APIs + Databases" },
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we build" },
    { kind: "content", title: "This year: from users to builders 💪", items: [
      { cards: [
        { h: "🤖 AI tools", lines: ["You code with AI tools,", "like real developers do."] },
        { h: "🛠️ Agents", lines: ["You don't just use agents.", "You build them."], color: "orange" },
        { h: "💼 A product", lines: ["Your agent is a product.", "Customers will want it."], color: "green" }
      ]},
      { note: "Big change: last year you learned code. This year you lead it." }
    ]},
    { kind: "content", title: "The big build: TikTok Studio 📱",
      lead: "One shared project. We build it together, all year.", items: [
      { cards: [
        { h: "1️⃣ Trend finder", lines: ["Agent 1 searches:", "what is hot on TikTok today?"] },
        { h: "2️⃣ Idea maker", lines: ["Agent 2 turns a trend", "into one video idea."], color: "orange" },
        { h: "3️⃣ Video maker", lines: ["Agent 3 sends the idea", "to a video service."], color: "green" }
      ]},
      { note: "Three agents + a database + a screen that shows it all." }
    ]},
    { kind: "content", title: "The road to the hackathon 🗓️", items: [
      { lines: [
        "Weeks 1–2 · P1: refresh APIs and databases",
        "Weeks 3–4 · P2: build agents 1 and 2",
        "Weeks 5–6 · P3: connect them in a chain",
        "Week 7 · P4: finish the full Studio"
      ]},
      { note: "7–9 December: HACKATHON! You build something like this. 🔥" }
    ]},
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · APIs refresh + why databases exist",
        "Break ☕",
        "Part 2 · you create your own database",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "content", title: "Quick refresh: what is an API? 🌐",
      lead: "You know this — let's warm it up.", items: [
      { cards: [
        { h: "You (the app)", lines: ["\"One pizza, please!\"", "You ask for data."] },
        { h: "The API (waiter)", lines: ["Takes your request", "to the kitchen."], color: "orange" },
        { h: "The server (kitchen)", lines: ["Makes the answer,", "sends it back."], color: "green" }
      ]},
      { note: "GET = \"please give me data\". The answer comes as JSON." }
    ]},
    { kind: "section", title: "How does an app remember you? 🤔",
      sub: "Close Instagram. Open it again. Your likes are still there. HOW?" },
    { kind: "content", title: "Why a database? 💾", items: [
      { cards: [
        { h: "Variables forget", lines: ["Close the app →", "memory is gone."], color: "red" },
        { h: "Files get messy", lines: ["1000 videos in one file?", "Good luck searching. 😅"], color: "orange" },
        { h: "A database remembers", lines: ["Saved. Organized.", "Fast to search."], color: "green" }
      ]}
    ]},
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
    { kind: "newword", term: "MongoDB",
      meaning: "A database that stores documents — they look just like JSON.",
      extra: "collection = a folder of documents · document = one row" },
    { kind: "content", title: "Part 1 · Task ✅",
      lead: "Clean and small. Everyone finishes this one.", items: [
      { lines: [
        "Open the ready-made Mongo database.",
        "4 small exercises: read, filter, count.",
        "Find: which video has the most likes?",
        "Stuck 5 minutes? Ask. That's the rule."
      ]},
      { note: "Goal: read data like a pro. 💜" }
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["You scroll the data", "and guess the answer.", "Slow. Maybe wrong."],
      after: ["One query.", "One exact answer.", "Two seconds. ⚡"],
      note: "📸 Screenshot your query + answer — first proof of the year!" },
    { kind: "section", title: "Break ☕", sub: "30 minutes — you earned it" },
    { kind: "content", title: "Part 2 · Your own database 🔧",
      lead: "Now the real thing: build, don't just read.", items: [
      { lines: [
        "Create a NEW collection. Yours. Any topic you love.",
        "Plan first: what fields must a row have?",
        "Give every document a unique id.",
        "Insert 3 documents. Then find them with a query."
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["Your collection: empty.", "A query finds nothing."],
      after: ["3 documents with ids.", "Your query finds them all. 🎉"],
      note: "📸 Before + after screenshots go in your portfolio." },
    { kind: "content", title: "Explain to me 🗣️",
      lead: "Last 15 minutes — the best part.", items: [
      { lines: [
        "Pick a card: API · collection · unique id.",
        "Explain it in 2 sentences. No slides, just you.",
        "Show your before/after screenshots."
      ]}
    ]},
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "APIs = how apps ask for data (GET).",
        "Databases = how apps remember.",
        "MongoDB: collections hold documents, like JSON.",
        "You created your own collection. 💪"
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "An AI solves one of YOUR old exercises. Live.",
        "We fix a bug just by chatting with it.",
        "You install a coding agent: opencode."
      ]},
      { note: "Next week the AI starts working for you. 🤖" }
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["MongoDB basics", "mongodb.com/basics — short and friendly"],
        ["What is an API (video)", "search YouTube: \"APIs for beginners freeCodeCamp\""],
        ["JSON practice", "w3schools.com/js/js_json_intro.asp"],
        ["Play with a real API", "pokeapi.co — open it in your browser!"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["API", "a way for apps to talk to each other"],
        ["GET", "an API request that asks for data"],
        ["JSON", "the format the internet uses to send data"],
        ["database", "where an app keeps data long-term"],
        ["MongoDB", "the database we use this year"],
        ["collection", "a folder of documents in MongoDB"],
        ["document", "one row of data — looks like JSON"],
        ["unique id", "a number/name no other row has"]
      ]}
    ]}
  ]
},

/* ================= LESSON 2 ================= */
{
  n: 2, emoji: "😎", title: "Vibe Coding",
  date: "26 Oct 2026", project: "P1 · From LLMs to coding agents",
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
    "📸 Screenshot the error + the fix — before and after."
  ],
  slides: [
    { kind: "title", title: "Lesson 2 · Vibe Coding 😎",
      sub: "26 October 2026 · Project P1 · From LLMs to coding agents" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "We warmed up APIs: GET, JSON.",
        "We saw why apps need databases.",
        "You built your own Mongo collection. 💪"
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then the AI gets to work" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · an LLM solves YOUR old exercise",
        "Break ☕",
        "Part 2 · meet the coding agent: opencode",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "content", title: "Today's big idea 💡", items: [
      { lines: [
        "AI can write code with you.",
        "But YOU are the boss.",
        "You describe → AI codes → you check.",
        "That last step is the whole job."
      ]},
      { note: "Vibe coding = leading the AI, not typing every line." }
    ]},
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
    { kind: "content", title: "Copy-paste is getting old 😩", items: [
      { lines: [
        "Paste code in. Copy code out. Again. Again.",
        "One file is not a project.",
        "Real projects have MANY files that connect.",
        "What if the AI could open the whole project?"
      ]}
    ]},
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
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "A chat LLM is strong — but blind and forgetful.",
        "Tokens, context window, system prompt explain why.",
        "A coding agent sees the WHOLE project.",
        "You installed opencode and fixed a real bug."
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
        ["Prompt tricks", "promptingguide.ai — how pros write prompts"],
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
  date: "2 Nov 2026", project: "P2 · LangChain + the Studio begins",
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
      sub: "2 November 2026 · Project P2 · LangChain + the Studio begins" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "An LLM solved your old exercise in seconds.",
        "You learned tokens + context window.",
        "You installed opencode and fixed a real bug."
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we switch sides" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · what is an agent + build one",
        "Break ☕",
        "Part 2 · the Studio begins: Agent 1",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
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
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "An agent = model + prompt + tools + access.",
        "createAgent builds one in a few lines.",
        "Agent 1 of OUR Studio finds real trends.",
        "You are officially agent builders. 🛠️"
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
  date: "9 Nov 2026", project: "P2 · Tools, Zod + Agent 2",
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
      sub: "9 November 2026 · Project P2 · Tools, Zod + Agent 2" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "You built your first agent with createAgent.",
        "Agent 1 of the Studio finds real trends.",
        "Model + prompt + tools + access = agent."
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we open the toolbox" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · build a tool + fix a confused agent",
        "Break ☕",
        "Part 2 · build Agent 2: the idea maker",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
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
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "A tool = function + schema + description.",
        "The agent only reads descriptions — write them well.",
        "RTOC: Role, Task, Output, Constraints.",
        "Agent 2 turns trends into video ideas. 💡"
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
  date: "16 Nov 2026", project: "P3 · The loop, the supervisor + shared memory",
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
      sub: "16 November 2026 · Project P3 · The loop, the supervisor + shared memory" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "Tools = function + schema + description.",
        "You fixed a confused agent with better words.",
        "Agent 2 turns trends into video ideas."
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we look inside the magic" },
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
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "Inside every agent: a simple loop.",
        "A supervisor is an agent whose tools are agents.",
        "A shared DB = the team's memory.",
        "Your pipeline runs end to end (almost!). ⛓️"
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "The missing piece: Agent 3, the video maker.",
        "Plus: a real screen for the Studio — the UI.",
        "You'll SEE your pipeline as a graph."
      ]},
      { note: "Next week: lights, camera, Agent 3. 🎬" }
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

/* ================= LESSON 6 ================= */
{
  n: 6, emoji: "🎬", title: "Lights, Camera, Agent 3",
  date: "23 Nov 2026", project: "P3 · The video maker + the Studio UI",
  goal: "Build Agent 3 — idea in, real video out — and give the Studio a screen that shows every step.",
  leaves: "The first video made by your pipeline + a UI that shows the steps.",
  tutorial: [
    { label: "Nir's tutorial — the bonus UI chapter", url: NIR_TUTORIAL },
    { label: "LangChain JS — streaming guide", url: "https://js.langchain.com" },
    { label: "LangGraph — see your agents as a graph", url: "https://langchain-ai.github.io/langgraphjs/" }
  ],
  missions: [
    "Build Agent 3: it turns a video idea into a prompt for the video service.",
    "Wire the call: send the prompt, wait, get the video back.",
    "Run the FULL chain: trend → idea → video. 🎬",
    "Start the Studio UI and watch your pipeline live.",
    "Open the graph view: find your three agents in the picture.",
    "📸 Screenshot the first video + the pipeline screen."
  ],
  slides: [
    { kind: "title", title: "Lesson 6 · Lights, Camera, Agent 3 🎬",
      sub: "23 November 2026 · Project P3 · The video maker + the Studio UI" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "You built the agent loop by hand. No more magic.",
        "The supervisor runs agents 1 + 2 as a team.",
        "Mongo is the team's shared memory."
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then we go to the movies" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · Agent 3: idea → video prompt → video",
        "Break ☕",
        "Part 2 · the Studio UI + the graph view",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "content", title: "The missing piece 🧩",
      lead: "Our pipeline stops at an idea. Time to SHIP.", items: [
      { cards: [
        { h: "In", lines: ["A video idea,", "written by Agent 2."] },
        { h: "Agent 3", lines: ["Turns it into a prompt", "a video service understands."], color: "orange" },
        { h: "Out", lines: ["A real video file.", "Made by AI. 🤯"], color: "green" }
      ]},
      { note: "Agent 3 talks to an outside service — through an API. Week 1 knowledge!" }
    ]},
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
    { kind: "section", title: "Break ☕", sub: "30 minutes" },
    { kind: "content", title: "Part 2 · The Studio gets a face 🖥️",
      lead: "Until now: terminal. Today: a real screen.", items: [
      { lines: [
        "Start the Studio UI from the repo.",
        "It shows each step while the pipeline runs.",
        "Found trend → idea → video — live on screen.",
        "This is what customers would actually see."
      ]}
    ]},
    { kind: "newword", term: "LangGraph",
      meaning: "A way to see (and run) your agent team as a graph: boxes and arrows.",
      extra: "We use it as a MAP today — the Studio draws your pipeline." },
    { kind: "content", title: "Find yourself on the map 🗺️", items: [
      { lines: [
        "Open the graph view.",
        "Find Agent 1, Agent 2, Agent 3, the supervisor.",
        "Trace one run: where does the data flow?",
        "Point at the box YOU built. Own it. 💅"
      ]}
    ]},
    { kind: "content", title: "Explain to me 🗣️", items: [
      { lines: [
        "Pick: Agent 3 · video prompt · the graph.",
        "Explain it in 2 sentences.",
        "Show your first AI video. 🎬"
      ]}
    ]},
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "Agent 3 turns ideas into video prompts + real videos.",
        "Detailed prompts beat vibes. Every time.",
        "The UI shows the pipeline live.",
        "Your team of agents is now a real product. 💼"
      ]}
    ]},
    { kind: "content", title: "Next time 👀", items: [
      { lines: [
        "We finish the WHOLE Studio, end to end.",
        "Extra features: genres, regions, your ideas.",
        "And… we start planning the hackathon. 🔥"
      ]},
      { note: "One more week to the full Studio. You're almost there!" }
    ]},
    { kind: "content", title: "Prompts to try at home 💬",
      lead: "Open opencode on the Studio repo and try:", items: [
      { rows: [
        ["Understand", "\"Explain how the UI knows what step we're on.\""],
        ["Experiment", "\"Make Agent 3's prompts shorter. Do videos get worse?\""],
        ["Trace", "\"Follow one idea from Mongo to the video call.\""],
        ["Spec first", "\"Spec a 'funny mode' for Agent 3 before building.\""],
        ["Bug", "\"What happens if the video service is down? Find out.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Not homework. Only if you're curious.", items: [
      { rows: [
        ["LangGraph", "langchain-ai.github.io/langgraphjs — graphs for agents"],
        ["Streaming UIs", "js.langchain.com — the streaming guide"],
        ["Nir's bonus UI", "the UI chapter in our reference repo"],
        ["AI video", "try describing one scene in 3 different ways"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["Agent 3", "our video maker: idea → prompt → real video"],
        ["video prompt", "a very detailed description a video AI understands"],
        ["UI", "user interface — the screen people see and click"],
        ["frontend", "the part of an app that runs in the browser"],
        ["streaming", "showing results live, piece by piece"],
        ["LangGraph", "boxes-and-arrows view of an agent team"],
        ["node", "one box in the graph (an agent or a step)"]
      ]}
    ]}
  ]
},

/* ================= LESSON 7 ================= */
{
  n: 7, emoji: "🏁", title: "Studio Grand Opening",
  date: "30 Nov 2026", project: "P4 · Finish the Studio + hackathon prep",
  goal: "Run the whole Studio end to end, add your own touch, and get your team ready for the hackathon.",
  leaves: "A complete Studio running + your team's hackathon plan.",
  tutorial: [
    { label: "Nir's tutorial — full reference", url: NIR_TUTORIAL },
    { label: "Our Studio repo — the finished pipeline", url: "https://github.com/Yana205" },
    { label: "LangChain JS — docs for your extra feature", url: "https://js.langchain.com" }
  ],
  missions: [
    "Run the FULL Studio: trend → idea → video, on the UI, no help.",
    "Edit one idea in the UI before it becomes a video.",
    "Pick one optional feature (genre filter / regional trends / your idea) and build it.",
    "Form your hackathon team.",
    "Write your team's one-page plan: idea, MVP, who does what.",
    "📸 Screenshot the full pipeline run — this is your biggest proof yet."
  ],
  slides: [
    { kind: "title", title: "Lesson 7 · Studio Grand Opening 🏁",
      sub: "30 November 2026 · Project P4 · Finish the Studio + hackathon prep" },
    { kind: "content", title: "Last time", items: [
      { lines: [
        "Agent 3 made your first AI video. 🎬",
        "The UI shows the pipeline live.",
        "You found your agents on the graph map."
      ]}
    ]},
    { kind: "section", title: "First: a game! 🎮", sub: "20 minutes · then: opening night" },
    { kind: "content", title: "Steps today", items: [
      { lines: [
        "20 min · game",
        "Part 1 · finish the Studio, end to end",
        "Break ☕",
        "Part 2 · hackathon prep: team + plan",
        "Last 15 min · \"Explain to me\" 🗣️"
      ]}
    ]},
    { kind: "content", title: "Look how far you've come 🥹", items: [
      { cards: [
        { h: "Week 1", lines: ["\"What's a", "collection again?\""] },
        { h: "Week 4", lines: ["Fixing confused agents", "like a pro."], color: "orange" },
        { h: "Today", lines: ["Running a full", "AI video studio. 💅"], color: "green" }
      ]},
      { note: "Seven weeks. From zero agents to a full pipeline. That's YOU." }
    ]},
    { kind: "content", title: "Part 1 · Task ✅ Grand opening", items: [
      { lines: [
        "Pull the latest repo. Run the full Studio.",
        "Trend → idea → video, all on the UI.",
        "Edit one idea in the UI before it renders.",
        "Then: add ONE optional feature.",
        "Genre filter? Israel trends? Your call. 💜"
      ]}
    ]},
    { kind: "beforeafter", title: "Proof time 📸",
      before: ["Week 1: an empty", "Mongo collection", "and a dream."],
      after: ["Week 7: a full AI studio.", "Three agents. One team.", "Real videos. 🎬"],
      note: "📸 The full-pipeline screenshot is your biggest proof yet." },
    { kind: "section", title: "Break ☕", sub: "30 minutes — last one before the hackathon 😱" },
    { kind: "content", title: "Part 2 · HACKATHON 🔥",
      lead: "7–9 December · Hanukkah · 3 days · your build", items: [
      { lines: [
        "Day 1 · together in class: idea + start building",
        "Days 2–3 · on Zoom: build, test, polish",
        "You build something with the Studio's scope.",
        "Your agents. Your idea. Your product."
      ]},
      { note: "It's a celebration, not a test. Everyone demos. 🎉" }
    ]},
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
        "Tell us your team's idea in one sentence.",
        "What's the ONE thing your demo must show?",
        "What are you most excited to build?"
      ]}
    ]},
    { kind: "content", title: "What we learned today", items: [
      { lines: [
        "The Studio runs end to end. You built it.",
        "You added a feature nobody asked you to. 💅",
        "Your hackathon team has a plan.",
        "Next stop: 7–9 December. 🔥"
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
        ["Scaffold", "\"Set up an empty agent project like our Studio.\""],
        ["Practice", "\"Quiz me: agents, tools, supervisor. Simple English.\""]
      ]}
    ]},
    { kind: "content", title: "Want more? 📚",
      lead: "Before the hackathon, if you're curious.", items: [
      { rows: [
        ["Our Studio repo", "read the code you'll build from"],
        ["Nir's tutorial", "the full reference, lessons 1–4"],
        ["LangChain JS", "js.langchain.com — docs for your feature"],
        ["Rest!", "seriously — sleep before the hackathon 😴"]
      ]}
    ]},
    { kind: "content", title: "Glossary 📖", items: [
      { rows: [
        ["MVP", "the smallest version that really works"],
        ["spec", "a short plan written BEFORE the code"],
        ["demo", "showing your working build to everyone"],
        ["end to end", "the whole pipeline, start to finish"],
        ["feature", "one ability of a product"],
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
