// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// LAST MODIFIED
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

// LOCAL STORAGE VISIT MESSAGE
const visitMessage = document.getElementById("visitMessage");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! First time visiting Kampala Chamber Discover Page.";
} else {
  const days = Math.floor((now - Number(lastVisit)) / 86400000);

  if (days < 1) {
    visitMessage.textContent = "Back so soon! Great to see you again.";
  } else if (days === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// LOAD JSON CARDS
const container = document.getElementById("places-container");

async function loadPlaces() {
  try {
    const response = await fetch("data/places.json");
    const places = await response.json();

    places.forEach(place => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${place.name}</h3>

        <figure>
          <img src="${place.image}" 
               alt="${place.name}" 
               loading="lazy">
        </figure>

        <p class="address">${place.address}</p>
        <p>${place.description}</p>

        <a href="${place.url}" target="_blank" class="btn">Learn More</a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading places:", error);
  }
}

loadPlaces();