/* the page only talks to OUR server (/api/ideas) — the server talks to the database */
const form = document.getElementById("form");
const nameIn = document.getElementById("name");
const ideaIn = document.getElementById("idea");
const list = document.getElementById("list");
const error = document.getElementById("error");

nameIn.value = localStorage.getItem("idea-tracker-name") || "";

function showError(msg) { error.textContent = "⚠️ " + msg; error.hidden = !msg; }

async function loadIdeas() {
  const res = await fetch("/api/ideas");
  const ideas = await res.json();
  if (!res.ok) return showError(ideas.error);
  list.innerHTML = ideas.length ? "" : `<li class="empty">No ideas yet — add the first one!</li>`;
  for (const i of ideas) {
    const li = document.createElement("li");
    li.innerHTML = `<b></b><span></span><small></small>`;
    li.querySelector("b").textContent = i.name;
    li.querySelector("span").textContent = i.idea;
    li.querySelector("small").textContent = new Date(i.createdAt).toLocaleTimeString();
    list.appendChild(li);
  }
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  showError("");
  localStorage.setItem("idea-tracker-name", nameIn.value.trim());
  const res = await fetch("/api/ideas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameIn.value, idea: ideaIn.value })
  });
  if (!res.ok) return showError((await res.json()).error);
  ideaIn.value = "";
  loadIdeas();
});

loadIdeas().catch(() => showError("Can't reach the server. Is it running? (npm start)"));
