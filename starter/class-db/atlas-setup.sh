#!/usr/bin/env bash
# AliceCode Level 4 — create the whole class database with the MongoDB Atlas CLI.
# Makes: a project, a FREE M0 cluster, network access for everyone, a teacher user,
# a student user (readWrite on "alicecode" only), then writes .env and loads the data.
# Needs: Atlas CLI (https://www.mongodb.com/docs/atlas/cli/current/install-atlas-cli/) and Node 18+.
# Prefer clicking? The README has the same steps in the Atlas website.
set -euo pipefail

PROJECT="${PROJECT:-AliceCode Level 4}"
CLUSTER="${CLUSTER:-alicecode}"
REGION="${REGION:-EU_CENTRAL_1}"
json() { node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const o=JSON.parse(s);console.log($1)})"; }
pw() { node -e "console.log(require('crypto').randomBytes(12).toString('base64url'))"; }

echo "🔐 Log in to Atlas (a browser window opens)…"
atlas auth whoami >/dev/null 2>&1 || atlas auth login

echo "📁 Project: $PROJECT"
PID=$(atlas projects list --output json | json "(o.results||[]).find(p=>p.name==='$PROJECT')?.id||''")
[ -z "$PID" ] && PID=$(atlas projects create "$PROJECT" --output json | json "o.id")

echo "🍃 Free cluster: $CLUSTER (takes a few minutes)…"
if ! atlas clusters describe "$CLUSTER" --projectId "$PID" >/dev/null 2>&1; then
  atlas clusters create "$CLUSTER" --projectId "$PID" --provider AWS --region "$REGION" --tier M0
fi
atlas clusters watch "$CLUSTER" --projectId "$PID"

echo "🌍 Network access: everyone (students connect from home and school)"
atlas accessLists create 0.0.0.0/0 --type cidrBlock --comment "AliceCode class" --projectId "$PID" >/dev/null 2>&1 || true

TEACHER_PW=$(pw); STUDENT_PW=$(pw)
echo "👩‍🏫 Users: teacher (admin) + student (readWrite on alicecode)"
atlas dbusers delete teacher --projectId "$PID" --force >/dev/null 2>&1 || true
atlas dbusers delete student --projectId "$PID" --force >/dev/null 2>&1 || true
atlas dbusers create atlasAdmin --username teacher --password "$TEACHER_PW" --projectId "$PID" >/dev/null
atlas dbusers create --username student --password "$STUDENT_PW" --role readWrite@alicecode --projectId "$PID" >/dev/null

SRV=$(atlas clusters connectionStrings describe "$CLUSTER" --projectId "$PID" --output json | json "o.standardSrv")
HOST=${SRV#mongodb+srv://}
cat > .env <<ENV
MONGODB_URI=mongodb+srv://teacher:${TEACHER_PW}@${HOST}/?retryWrites=true&w=majority
STUDENT_URI=mongodb+srv://student:${STUDENT_PW}@${HOST}/?retryWrites=true&w=majority
ENV
echo "📝 Wrote .env (never commit it)"

npm install --silent
npm run setup
echo "⏳ Waiting 20s for the new users to be active…"; sleep 20
npm run check

echo
echo "Next:"
echo "  1 · Vercel → Settings → Environment Variables → MONGODB_URI = the MONGODB_URI line in .env → Redeploy"
echo "  2 · In class, paste the STUDENT_URI line into the 🔑 Class database box on the Part 1 slide"
