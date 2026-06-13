javascript
// Footer Information
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById("lastModified");
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}

// Visitor Message using localStorage
const visitMessage = document.getElementById("visitMessage");

if (visitMessage) {
    const lastVisit = localStorage.getItem("lastVisit");
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor(
            (currentDate - Number(lastVisit)) / 86400000
        );

        if (daysBetween < 1) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent =
                "You last visited 1 day ago.";
        } else {
            visitMessage.textContent =
                `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentDate);
}

// Build Discover Cards from JSON
const cardsContainer = document.getElementById("places-container");

async function loadPlaces() {
    try {
        const response = await fetch("data/places.json");

        if (!response.ok) {
            throw new Error("Failed to load JSON data.");
        }

        const places = await response.json();

        places.forEach(place => {
            const card = document.createElement("article");
            card.classList.add("card");

            card.innerHTML = `
                <h2>${place.name}</h2>

                <figure>
                    <img
                        src="${place.image}"
                        alt="${place.name}"
                        loading="lazy"
                        width="400"
                        height="250">
                </figure>

                <address>${place.address}</address>

                <p>${place.description}</p>

                <a
                    href="${place.url}"
                    target="_blank"
                    rel="noopener"
                    class="button">
                    Learn More
                </a>
            `;

            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading places:", error);
    }
}

if (cardsContainer) {
    loadPlaces();
}
