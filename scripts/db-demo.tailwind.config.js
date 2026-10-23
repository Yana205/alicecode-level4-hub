/* Tailwind config for the "Variables vs. Database" demo (db-demo.jsx). Used by scripts/build-db-demo.sh */
module.exports = {
  content: ["db-demo.jsx", "db-demo.html"],

  theme: {
    extend: {
      colors: {
        ac: { pink: "#D83474", soft: "#EFA6C3", ink: "#3B1F5C", inksoft: "#6B5590", lav: "#F3ECFD", code: "#241436", mint: "#2FB380", red: "#E04F5F" },
        atlas: { bg: "#001E2B", leaf: "#00ED64", green: "#00684A", blue: "#016BF8", purple: "#B45AF2", line: "#E8EDEB" }
      },
      fontFamily: {
        head: ['"Baloo 2"', "sans-serif"],
        body: ["Nunito", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"]
      },
      keyframes: {
        pop: { "0%": { opacity: "0", transform: "scale(.85) translateY(6px)" }, "100%": { opacity: "1", transform: "none" } },
        glitch: {
          "0%, 100%": { transform: "none", filter: "none" },
          "15%": { transform: "translate(-6px, 2px) skewX(7deg)", filter: "hue-rotate(90deg) saturate(3)" },
          "30%": { transform: "translate(7px, -3px) skewX(-8deg)", filter: "invert(1)" },
          "45%": { transform: "translate(-4px, 1px)", filter: "hue-rotate(-120deg) contrast(2)" },
          "60%": { transform: "translate(5px, 0) skewX(4deg)", filter: "none" },
          "75%": { transform: "translate(-2px, 2px)", filter: "invert(1) hue-rotate(45deg)" }
        },
        shake: { "20%, 60%": { transform: "translateX(-8px)" }, "40%, 80%": { transform: "translateX(8px)" } },
        landed: { "0%": { opacity: "0", transform: "scale(.85)", backgroundColor: "#E3FCF7" }, "40%": { opacity: "1", transform: "scale(1.03)", backgroundColor: "#C0FAE6", boxShadow: "0 0 0 3px #00ED64" } },
        glow: { "0%, 100%": { boxShadow: "0 0 0 2px rgba(255,121,168,.55)" }, "50%": { boxShadow: "0 0 0 2px rgba(255,121,168,1), 0 0 18px rgba(255,121,168,.9)" } }
      },
      animation: {
        pop: "pop .35s cubic-bezier(.3,1.6,.5,1) both",
        glitch: "glitch .65s steps(1, end)",
        shake: "shake .5s ease",
        landed: "landed .9s ease",
        glow: "glow 1s ease-in-out infinite"
      }
    }
  }
};
