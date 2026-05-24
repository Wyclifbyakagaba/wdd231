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

       // 2 .CONVERT NUMERICAL MEMBERSHIP TO STRING VALUES
        let tierName = "General Member";
        let tierClass = "Member";

        if (member.membership === 1) {
            tierName = "General";
            tierClass = "general";
        } else if (member.membership === 2) {
            tierName = "Silver";
            tierClass = "silver";
        } else if (member.membership === 3) {
            tierName = "Gold";
            tierClass = "gold";
        } else if (member.membership === 4) {
            tierName = "Platinum";
            tierClass = "platinum";
        }
        // 3. GENERATE THE TARGET CARD ELEMENTS WITH DESIGN CLASSES
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <a href="${member.website}" target="_blank" class="website-btn">Visit Website</a>
            <p class="address-text">${member.address}</p>
            <p class="phone-text">${member.phone}</p>
            <span class="badge ${tierClass}">${tierName}</span>
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