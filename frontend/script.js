const API_URL = "https://api.semanticscholar.org/graph/v1/paper/search?query=";

function switchTab(tab) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

    document.getElementById(tab).classList.add("active");
    event.target.classList.add("active");

    if (tab === "library") loadLibrary();
    if (tab === "history") loadHistory();
}

async function searchPapers() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    saveHistory(query);

    const response = await fetch(`${API_URL}${query}&limit=6&fields=title,abstract,authors,url`);
    const data = await response.json();

    const results = document.getElementById("results");
    results.innerHTML = "";

    data.data.forEach(paper => {
        const card = document.createElement("div");
        card.className = "paper-card";
        card.innerHTML = `
            <h3>${paper.title}</h3>
            <p>${paper.abstract ? paper.abstract.substring(0,200) + "..." : "No abstract available"}</p>
            <button onclick='savePaper(${JSON.stringify(paper)})'>Save</button>
        `;
        results.appendChild(card);
    });
}

function savePaper(paper) {
    let library = JSON.parse(localStorage.getItem("library")) || [];
    library.push(paper);
    localStorage.setItem("library", JSON.stringify(library));
    alert("Saved to My Readings!");
}

function loadLibrary() {
    let library = JSON.parse(localStorage.getItem("library")) || [];
    const container = document.getElementById("libraryContainer");
    container.innerHTML = "";

    library.forEach(paper => {
        const card = document.createElement("div");
        card.className = "paper-card";
        card.innerHTML = `
            <h3>${paper.title}</h3>
            <p>${paper.abstract ? paper.abstract.substring(0,200) + "..." : ""}</p>
        `;
        container.appendChild(card);
    });
}

function saveHistory(query) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(query);
    localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    const list = document.getElementById("historyList");
    list.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
