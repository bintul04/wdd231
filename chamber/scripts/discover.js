const discoverGrid = document.querySelector(".discover-grid");
const visitDates = document.querySelector(".visit-data");
const todaysDate = new Date();
const msToDays = 86400000;
let lastVisitDate = null;

async function getDiscoveryData() {
    const response = await fetch("poi.json");
    const data = await response.json();
    displayDiscovery(data.poi);
}

const displayDiscovery = (pois) => {
    pois.forEach((poi) => {
        let card = document.createElement('section');
        let title = document.createElement('h2');
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let address = document.createElement('address');
        let desc = document.createElement('p');
        let button = document.createElement('button');
        let link = document.createElement('a');

        title.innerHTML = `${poi.name}`;
        img.src = `${poi.image}`;
        img.alt = `${poi.name}`;
        img.loading = `${poi.loading}`;
        address.innerHTML = `${poi.address}`;
        link.title = `${poi.name}`;
        desc.innerHTML = `${poi.description}`;
        link.href = `${poi.url}`;
        link.target = "_blank";
        button.textContent = `Learn More`;

        figure.appendChild(img);

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        link.appendChild(button);
        card.appendChild(link);

        discoverGrid.appendChild(card);
    });
}

getDiscoveryData();

function displayWelcome() {
    if (localStorage.getItem("lastVisit") == null) {
        localStorage.setItem("lastVisit", todaysDate.toISOString());
        visitDates.innerHTML = `Welcome! Let us know if you have any questions.`;
        return;
    }
    else {
        lastVisitDate = new Date(localStorage.getItem("lastVisit"));
    }

    let daysBetween = Math.floor((todaysDate - lastVisitDate) / msToDays);
    console.log(todaysDate.getTime() - new Date(lastVisitDate).getTime(), msToDays);

    if (daysBetween < 1) {
        visitDates.innerHTML = `Back so soon! Awesome!`;
    } else if (daysBetween == 1) {
        visitDates.innerHTML = `You last visited ${daysBetween} day ago.`;
    }
    else {
        visitDates.innerHTML = `You last visited ${daysBetween} days ago.`;
    }

    localStorage.setItem("lastVisit", todaysDate);
}

displayWelcome();
