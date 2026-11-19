/* billionaire-database — progressive enhancement only.
   Everything works without JS; this just filters the people index. */
(function () {
  "use strict";
  const input = document.getElementById("nameSearch");
  if (!input) return;
  const rows = document.querySelectorAll("#peopleTable tbody tr");
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    const ind = (new URLSearchParams(location.search).get("industry") || "").toLowerCase();
    for (const tr of rows) {
      tr.hidden = (q !== "" && !tr.dataset.name.includes(q))
        || (ind !== "" && (tr.dataset.industry || "") !== ind);
    }
    const note = document.getElementById("filterNote");
    if (note) {
      note.textContent = ind ? `Filtered to ${ind} — ` : "";
      note.hidden = ind === "";
    }
  };
  const q0 = new URLSearchParams(location.search).get("q");
  if (q0) input.value = q0;
  input.addEventListener("input", apply);
  apply();
})();

/* graph captions — hover shows the person's name + worth under the chart;
   on touch screens the first tap arms a node (shows its label), the second
   tap follows the link. The browser <title> tooltip is desktop-only. */
(function () {
  "use strict";
  const coarse = matchMedia("(hover: none)").matches;
  document.querySelectorAll("svg.webGraph").forEach((svg) => {
    const cap = document.createElement("p");
    cap.className = "graphCap";
    cap.setAttribute("aria-live", "polite");
    (svg.closest(".webFig") || svg).insertAdjacentElement("afterend", cap);

    const show = (a) => {
      svg.querySelectorAll("a.armed").forEach((x) => x.classList.remove("armed"));
      a.classList.add("armed");
      const name = a.getAttribute("data-name") || "";
      const meta = a.getAttribute("data-meta") || "";
      const strong = document.createElement("strong");
      strong.textContent = name;
      cap.replaceChildren(strong, document.createTextNode(meta ? " · " + meta : ""));
    };

    svg.addEventListener("pointerover", (e) => {
      const a = e.target.closest("a");
      if (a) show(a);
    });
    svg.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || !coarse) return;
      if (!a.classList.contains("armed")) {
        e.preventDefault();
        show(a);
      }
    });
    document.addEventListener("pointerdown", (e) => {
      if (!svg.contains(e.target)) {
        svg.querySelectorAll("a.armed").forEach((x) => x.classList.remove("armed"));
        cap.replaceChildren();
      }
    });
  });
})();
