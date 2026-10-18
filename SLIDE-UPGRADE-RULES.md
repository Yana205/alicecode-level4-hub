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
| **Live Edit Challenge** | A third button: **🎯 "Your Turn"**. It shows an empty prompt box plus 3 new words: `text-shadow` · `animation` · `outline`. A word glows orange when the student says it in the prompt, and turns green ✓ when it's really in the CSS. **▶ Run** (or Enter) plays the AI: for every word in the prompt it writes that CSS into the code, and the preview updates. No tech words → "🤖 I can only guess!". All 3 in → sparkles + chime + "Superpower proven!" |
| **Micro-interactions** | Switching to the pro prompt plays a short rising **chime** (synthesized, no files) and a **sparkle burst** from the button. When the code lands, the preview **pops** with more sparkles. 🔊/🔇 toggle; animations turn off for *reduce motion* users. |
| **Active state** | The prompt button that's running has a ring, so the room can see which prompt is "on". |

---

## The global rules (use these on every deck)

1. **Make the contrast loud.** "Before" should look obviously worse: plain, default, boring. "After" should be clearly better. If someone squints and can't see the difference, the example is too weak.
2. **Dull vs. vivid.** Show "before" states in gray or low saturation, and "after" states in full brand color with glow. The color itself says *worse → better*.
3. **Name the cause.** Every "after" must show *which words* made it better. Highlight those words (bold, neon, monospace).
4. **Draw the connection.** Link the cause to the effect with an arrow or a glow: a prompt word → a code line, a code line → the thing it changed on screen. One arrow by default, and more on hover or tap.
5. **Hand over the keyboard.** Every concept slide ends with a **"Your Turn"** step: 2–3 new words, an empty prompt, and live checks that turn green when it works.
6. **Celebrate the moment.** Put a short micro-interaction (sparkle, pop, chime) on the *upgrade* moment and the *success* moment, and nowhere else. Keep it under 1 second, with a mute button, and respect reduce-motion.
7. **Show state.** The active choice (button, tab, step) always looks active.
8. **Simple English, one idea per slide.** The juice supports the message. It never replaces it.

### How to apply it in code
The Lab engine (`lab.js`) turns the juice on **per preset**. A preset gets it when it has:
- `vague.prompt`: the plain prompt text for the bubble
- `explicit.prompt`: the pro prompt. Write `{word}` or `{word|css-property}` to make a neon word linked to that CSS line (`{hover|:hover}` points to a selector)
- `explicit.arrow`: which word gets the default arrow
- `yourTurn`: `{ label, words: [...], win: "...", css: { word: "declaration" }, keyframes: { word: "@keyframes …" } }` for the challenge (`css` is what ▶ Run writes for each word)

Lesson 2 (Flower Shop Lab) doesn't have these fields yet, so it still looks the same as before. To upgrade it, add the fields. No engine changes needed.
