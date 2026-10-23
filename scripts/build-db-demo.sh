#!/bin/sh
# Pre-builds the "Variables vs. Database" slide demo, so the browser gets plain files:
#   db-demo.jsx  → db-demo.js   (JSX compiled once, here — no Babel in the browser)
#   Tailwind     → db-demo.css  (only the classes the demo uses — no Tailwind runtime)
# Run it from the repo root after you edit db-demo.jsx:   sh scripts/build-db-demo.sh
set -e
npx -y esbuild@0.28.2 db-demo.jsx --loader:.jsx=jsx --jsx=transform --target=es2019 --minify --outfile=db-demo.js
npx -y tailwindcss@3.4.16 -c scripts/db-demo.tailwind.config.js -i scripts/db-demo.input.css -o db-demo.css --minify
