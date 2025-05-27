// Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// URL for current weather in Trier using imperial units (°F) — replace YOUR_API_KEY!
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=imperial&appid=382c2e08abb69fd2177e18e9487e100d';

// Function to display results on the page
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

// Async function to fetch weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For debugging
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

apiFetch();
