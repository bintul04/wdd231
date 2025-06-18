document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn?.querySelector("i");
  
    if (menuBtn && navLinks && menuBtnIcon) {
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
        menuBtn.setAttribute("aria-expanded", isOpen);
      });
  
      navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
        menuBtn.setAttribute("aria-expanded", false);
      });
    }
  
    // --- ScrollReveal Animations ---
    if (typeof ScrollReveal !== "undefined") {
      const scrollRevealOption = {
        origin: "bottom",
        distance: "50px",
        duration: 1000,
      };
  
      ScrollReveal().reveal(".header__image img", {
        ...scrollRevealOption,
        origin: "right",
      });
      ScrollReveal().reveal(".header__content h1", { ...scrollRevealOption, delay: 500 });
      ScrollReveal().reveal(".header__content p", { ...scrollRevealOption, delay: 1000 });
      ScrollReveal().reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });
      ScrollReveal().reveal(".arrival__card", { ...scrollRevealOption, interval: 500 });
      ScrollReveal().reveal(".sale__image img", { ...scrollRevealOption, origin: "left" });
      ScrollReveal().reveal(".sale__content h2", { ...scrollRevealOption, delay: 500 });
      ScrollReveal().reveal(".sale__content p", { ...scrollRevealOption, delay: 1000 });
      ScrollReveal().reveal(".sale__content h4", { ...scrollRevealOption, delay: 1000 });
      ScrollReveal().reveal(".sale__btn", { ...scrollRevealOption, delay: 1500 });
      ScrollReveal().reveal(".favorite__card", { ...scrollRevealOption, interval: 500 });
    }
  
    // --- Banner Duplicate for scrolling effect ---
    const banner = document.querySelector(".banner__container");
    if (banner && !banner.classList.contains("duplicated")) {
      const bannerContent = Array.from(banner.children);
      bannerContent.forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute("aria-hidden", true);
        banner.appendChild(duplicateNode);
      });
      banner.classList.add("duplicated");
    }
  
    // --- Load fashions.json and render catalogue ---
    const catalogueContainer = document.getElementById("catalogue-page");
    if (!catalogueContainer) return;
  
    let fashions = [];
    let itemsToShow = 4; // show 4 items initially
    let viewMoreBtn;
  
    // Create and append View More button
    function createViewMoreButton() {
      viewMoreBtn = document.createElement("button");
      viewMoreBtn.textContent = "View More";
      viewMoreBtn.className = "view-more-btn";
      viewMoreBtn.style.margin = "1em auto";
      viewMoreBtn.style.display = "block";
      viewMoreBtn.style.padding = "0.75em 2em";
      viewMoreBtn.style.fontSize = "1rem";
      viewMoreBtn.style.cursor = "pointer";
      catalogueContainer.parentNode.insertBefore(viewMoreBtn, catalogueContainer.nextSibling);
  
      viewMoreBtn.addEventListener("click", () => {
        itemsToShow += 4;
        renderCatalogue();
      });
    }
  
    // Render catalogue items based on itemsToShow
    function renderCatalogue() {
      catalogueContainer.innerHTML = ""; // Clear old items
  
      const items = fashions.slice(0, itemsToShow);
  
      items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "catalogue__item";
  
        // Build stars for rating
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
          starsHTML += `<i class="${i <= item.rating ? "ri-star-fill" : "ri-star-line"}"></i>`;
        }
  
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <h3>${item.title}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <div class="rating">${starsHTML}</div>
        `;
  
        catalogueContainer.appendChild(div);
      });
  
      // Hide button if all items are shown
      if (itemsToShow >= fashions.length) {
        viewMoreBtn.style.display = "none";
      } else {
        viewMoreBtn.style.display = "block";
      }
    }
  
    // Fetch fashions.json and start
    fetch("fashions.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load fashions.json");
        return response.json();
      })
      .then((data) => {
        fashions = data.catalogue || [];
        if (fashions.length === 0) return;
        createViewMoreButton();
        renderCatalogue();
      })
      .catch((error) => {
        console.error("Error loading catalogue:", error);
        catalogueContainer.innerHTML = "<p>Failed to load catalogue items.</p>";
      });
  });
  