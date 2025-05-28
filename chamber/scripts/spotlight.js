const spotlightContainer = document.querySelector('.spotlight-container');

const members = [
    {
        companyName: "UMTECH Solutions",
        logo: "images/tech-solutions.jpeg",  // updated path
        phone: "+232 75 124980",
        address: "Freetown, Sierra Leone",
        website: "+232 75 124980",
        membershipLevel: "Gold"
    },
    {
        companyName: "Best Built Interior",
        logo: "images/best_build_interior.jpg",  // updated path
        phone: "+232-75 55-56-78",
        address: "456 Syke St, Freetown, Sierra Leone",
        website: "https://nobili-design.com/",
        membershipLevel: "Silver"
    },
    {
        companyName: "Sierra Leone Marketing",
        logo: "images/sl-market.jpg",  // updated path
        phone: "+232-75-32-90-62",
        address: "Big Market Ave, Freetown City",
        website: "https://tourismsierraleone.com/",
        membershipLevel: "Gold"
    },
];

// Filter only Gold and Silver members
const goldSilverMembers = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");

// Randomly shuffle and pick 6 members max
function getRandomSpotlights(arr, num = 6) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(num, arr.length));
}

function displaySpotlights() {
    const spotlights = getRandomSpotlights(goldSilverMembers, 6);

    spotlightContainer.innerHTML = '';

    spotlights.forEach(member => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';

        card.innerHTML = `
      <img src="${member.logo}" alt="${member.companyName} logo">
      <h3>${member.companyName}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
    `;

        spotlightContainer.appendChild(card);
    });
}

displaySpotlights();
