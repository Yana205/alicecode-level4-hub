/* AliceCode Level 4 — serves /calendar.html with the class dates already inside the page
   (rewrite in vercel.json), so it shows everything at once: no second request, no waiting.
   The template is pages/calendar.html. The CDN keeps the finished page and rebuilds it from
   Google (in the background) after 10 min; browsers re-download it only if it changed (ETag). */

const fs = require("fs");
const path = require("path");
const { loadEvents, fingerprint, CACHE } = require("./_calendar");

const TEMPLATE = path.join(__dirname, "..", "pages", "calendar.html");

module.exports = async (req, res) => {
  let events = null;
  try { events = await loadEvents(); } catch (e) { /* the page then asks api/calendar itself */ }
  const data = JSON.stringify(events).replace(/</g, "\\u003c");
  const html = fs.readFileSync(TEMPLATE, "utf8")
    .replace("<!--CAL_DATA-->", `<script>window.CAL_DATA = ${data};</script>`);
  const etag = fingerprint(html);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", events ? CACHE : "no-store");
  res.setHeader("ETag", etag);
  if (req.headers["if-none-match"] === etag) return res.status(304).end();
  return res.status(200).send(html);
};
