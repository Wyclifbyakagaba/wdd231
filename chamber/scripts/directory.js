const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayMembers(data);

}
//update the directory page to display the members from the JSON file
function displayMembers(members) {
    // clear the container before adding new members to avoid duplicates when switching between grid and list views
    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        // 1. ADD A CLASS TO THE CARD BASED ON THE MEMBERSHIP LEVEL
        card.classList.add("directory-card");

       // 2.  Add target style classes to the button, text elements, and badge
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
getMembers();

document.querySelector("#gridBtn").addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});
// KEEP THESE: Perfect standard footer requirements
document.querySelector("#listBtn").addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});
 // KEEP THESE: Perfect standard footer requirements
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;