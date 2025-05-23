document.addEventListener("DOMContentLoaded", () => {
    // Menu Toggle (Must come after DOM is ready!)
    const menuItem = document.querySelector("#menu");
    const navElement = document.querySelector("#animated-menu");

    if (menuItem && navElement) {
        menuItem.addEventListener("click", () => {
            navElement.classList.toggle("open");
            menuItem.classList.toggle("open");
        });
    }

    // Year & Last Modified
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // View Toggle Buttons
    const membersContainer = document.getElementById("members-container");
    const gridBtn = document.getElementById("grid-view");
    const listBtn = document.getElementById("list-view");

    if (gridBtn && listBtn && membersContainer) {
        gridBtn.addEventListener("click", () => {
            membersContainer.classList.add("grid-view");
            membersContainer.classList.remove("list-view");
        });

        listBtn.addEventListener("click", () => {
            membersContainer.classList.add("list-view");
            membersContainer.classList.remove("grid-view");
        });
    }

    // Load Members
    async function loadMembers() {
        try {
            const response = await fetch("chamber/data/members.json");
            const members = await response.json();

            members.forEach(member => {
                const card = document.createElement("div");
                card.className = `member-card level-${member.membership}`;
                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="34" height="40">
                    <h3>${member.name}</h3>
                    <p>${member.description}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                membersContainer.appendChild(card);
            });
            
        } catch (error) {
            membersContainer.innerHTML = "<p>Failed to load members.</p>";
            console.error("Error loading members:", error);
        }
    }

    loadMembers();
});
