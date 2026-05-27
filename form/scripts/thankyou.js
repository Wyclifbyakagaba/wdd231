const params = new URLSearchParams(window.location.search);

document.getElementById("first").textContent = params.get("firstname");
document.getElementById("last").textContent = params.get("lastname");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("org").textContent = params.get("organization");
document.getElementById("time").textContent = params.get("timestamp");