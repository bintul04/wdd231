document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.setAttribute("aria-expanded", "false"); // Initialize aria-expanded

    // Toggle nav menu on button click
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");

        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
        menuBtn.setAttribute("aria-expanded", isOpen.toString());
    });

    // Optional: Close menu when clicking on a nav link (only on small screens)
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtnIcon.setAttribute("class", "ri-menu-line");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
});
