/* ================= THEME TOGGLE ================= */

const toggleBtn = document.getElementById("themeToggle");

// Load saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "dark");
    }
});


/* ================= LOADER SIMULATION ================= */

const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

searchBtn.addEventListener("click", () => {
    loader.classList.remove("hidden");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 2000);
});


/* ================= COUNTER ANIMATION ================= */

const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

window.addEventListener("load", animateCounters);
