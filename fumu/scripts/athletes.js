const container =
    document.querySelector("#athletes-container");

const searchInput =
    document.querySelector("#search-input");

let members = [];

async function loadMembers() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                "Unable to load members."
            );
        }

        members =
            await response.json();

        displayMembers(members);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p>
                Failed to load member data.
            </p>
        `;
    }
}

function displayMembers(data) {

    container.innerHTML = "";

    data.forEach(member => {

        const card =
            document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/members/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="300"
                height="200">

            <h3>${member.name}</h3>

            <p>${member.tagline}</p>

            <p>${member.phone}</p>

            <button
                class="details-btn"
                data-id="${member.id}">
                View Details
            </button>
        `;

        container.appendChild(card);
    });

    attachModalEvents();
}

loadMembers();