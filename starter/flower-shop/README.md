# 🌸 Flower Shop — Lesson 2 practice app

One file, no install. Students copy it from the "The practice app" slide (or download `index.html`), open the folder in VS Code and practice with opencode:

1. **Plan mode** — plan a search box (no files change).
2. **Build mode** — build it.
3. **Fix the bug** — the ❤️ button never counts.

### For the teacher (don't tell them!)
The bug: `like()` adds to `flowers[i].like` (no **s**), so `likes` stays 0. The fix is `flowers[i].likes++`.
