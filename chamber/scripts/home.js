// DOM Element Selectors
const spotlightContainer = document.querySelector("#spotlight-container");
const currentWeatherContainer = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast-wrapper");

// API Configuration Constants (Kampala Coordinate Mapping)
const lat = "0.3476";
const lon = "32.5825";
const apiKey = "YOUR_API_KEY_HERE"; 

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersSource = "data/members.json";

// ---- 1. Dynamic OpenWeatherMap Fetch Logic ----
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        currentWeatherContainer.innerHTML = `<p>Weather feed temporarily offline.</p>`;
        console.error("Current weather breakdown:", error);
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    currentWeatherContainer.innerHTML = `
        <div class="weather-row">
            <img src="${iconSrc}" alt="${desc}" />
            <div>
                <p class="current-temp">${temp}°C</p>
                <p class="weather-desc">${desc}</p>
            </div>
        </div>
    `;
}

// ---- 2. 3-Day Forecast Processing ----
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error("Forecast track breakdown:", error);
    }
}

function displayForecast(data) {
    forecastContainer.innerHTML = "";
    // Filter out historical intervals to secure noon-time data blocks over the next 3 days
    const activeIntervals = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    activeIntervals.forEach(dayData => {
        const dateObj = new Date(dayData.dt * 1000);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
        const dayTemp = Math.round(dayData.main.temp);
        const dayDesc = dayData.weather[0].description;

        const dayBlock = document.createElement("div");
        dayBlock.classList.add("forecast-card");
        dayBlock.innerHTML = `
            <h4>${dayName}</h4>
            <p class="forecast-temp">${dayTemp}°C</p>
            <p class="forecast-desc">${dayDesc}</p>
        `;
        forecastContainer.appendChild(dayBlock);
    });
}

// ---- 3. Random Gold/Silver Company Spotlight Filter ----
async function loadSpotlights() {
    try {
        const response = await fetch(membersSource);
        const members = await response.json();
        
        // Filter out corporate listings to strictly look for Gold or Silver classifications
        const eligibleMembers = members.filter(m => m.membership === "Gold" || m.membership === "Silver");
        
        // Randomize list index
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffled.slice(0, Math.random() > 0.5 ? 3 : 2); // Pulls 2 or 3 items randomly

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Spotlight engine execution failure:", error);
    }
}

function displaySpotlights(spotlights) {
    spotlightContainer.innerHTML = "";

    spotlights.forEach(company => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        
        // Inherits the same clean visual hierarchy structure as your screenshot
        card.innerHTML = `
            <img src="images/${company.image}" alt="Logo of ${company.name}" loading="lazy">
            <h3>${company.name}</h3>
            <a href="${company.website}" target="_blank" class="website-btn">VISIT WEBSITE</a>
            <p class="address-text">${company.address}</p>
            <p class="phone-text">${company.phone}</p>
            <span class="badge ${company.membership.toLowerCase()}">${company.membership} Member</span>
        `;
        spotlightContainer.appendChild(card);
    });
}

// ---- 4. System Framework Init ----
fetchWeather();
fetchForecast();
loadSpotlights();

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified} | Portal: https://wyckifbyakagaba.github.io/wdd231/chamber/directory.html`;

    const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});