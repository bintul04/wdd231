// Get buttons for toggling views
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

const membersContainer = document.querySelector('#members');

function loadMembers() {
    fetch('chamber/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            displayMembersByCategory(data);
            setGridView();
        })
        .catch(err => console.error('Failed to load members:', err));
}
function displayMembersByCategory(groupedData) {
    container.innerHTML = '';

    for (const category in groupedData) {
        const categorySection = document.createElement('div');
        categorySection.classList.add('category-section');

        const title = document.createElement('h2');
        title.textContent = category;
        categorySection.appendChild(title);

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('directory-category-row');
        categorySection.appendChild(cardContainer);

        // Add cards
        groupedData[category].forEach(member => {
            const card = document.createElement('section');
            card.classList.add('member-card');

            const {
                name = 'No Name Provided',
                image = 'default.jpg',
                address = 'No address available',
                phone = 'No phone number',
                membership_level = 'Not specified',
                description = '',
                website = '#'
            } = member;

            card.innerHTML = `
        <img src="images/${image}" alt="Logo of ${name}" loading="lazy"
          onerror="this.onerror=null; this.src='images/city.jpg';">
        <h3>${name}</h3>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Membership:</strong> ${membership_level}</p>
        <p>${description}</p>
        <a href="${website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
      `;

            cardContainer.appendChild(card);
        });

        container.appendChild(categorySection);
    }
}

// Set Grid View: 3 cards per row horizontally
function setGridView() {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');

// For each category, set grid class and remove list grouping
    document.querySelectorAll('.directory-category-row').forEach(row => {
        row.classList.add('grid-view');
        row.classList.remove('list-view');
    });
}

function setListView() {
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');

    document.querySelectorAll('.directory-category-row').forEach(row => {
        row.classList.remove('grid-view');
        row.classList.add('list-view');

        // First, get all cards
        const cards = Array.from(row.querySelectorAll('.member-card'));
        row.innerHTML = '';

        // Create groups of 3 cards stacked vertically
        for (let i = 0; i < cards.length; i += 3) {
            const groupDiv = document.createElement('div');
            groupDiv.classList.add('card-group');

            cards.slice(i, i + 3).forEach(card => {
                groupDiv.appendChild(card);
            });

            row.appendChild(groupDiv);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const modalLinks = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', setGridView);
        listViewBtn.addEventListener('click', setListView);
    }

    loadMembers();

    // Modal handlers
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });
});


// Year & Last Modified
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;
