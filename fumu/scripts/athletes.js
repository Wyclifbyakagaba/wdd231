const container =
    document.getElementById("athletes-container");

async function loadMembers() {

    try {

        const response =
            await fetch("data/athletes.json");

        if (!response.ok) {
            throw new Error(
                "Unable to load athletes."
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

function displayMembers(athletes) {
    container.innerHTML = "";

    athletes.forEach(athlete => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/athletes/${athlete.image}"
                alt="${athlete.name}"
                loading="lazy"
                width="300"
                height="200">

            <h3>${athlete.name}</h3>

            <p>${athlete.tagline}</p>

            <p>${athlete.phone}</p>

            <button
                class="details-btn"
                data-id="${athlete.id}">
                View Details
            </button>
        `;

        container.appendChild(card);
    });

    //LOAD THE ATHLETE DETAILS
    const buttons =
        document.querySelectorAll(".details-btn");
    loadAthletes();
}