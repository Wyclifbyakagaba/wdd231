const membersContainer = document.querySelector("#members");
document.addEventListener("DOMContentLoaded", () => {

    getMembers(

document.querySelector("#gridBtn").addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

document.querySelector("#listBtn").addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
};

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

   if (response.ok) {
        displayMembers(cannot load json data);

    }
    const data = await response.json();
        displayMembers(data.members);
        catch (error) {
        console.error("Error fetching members data:", error);
}
}
function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear existing content
    members.forEach(member => {

        const card = document.createElement("section");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership}</p>
        `;

        membersContainer.appendChild(card);
    });
} 
