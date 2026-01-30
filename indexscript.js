// Token uitlezen
function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

// Sidebar vullen
function laadSidebar() {
  const user = getUserFromToken();
  if (!user) return;

  document.getElementById("user-name").innerText = user.naam;
  document.getElementById("user-role").innerText = "Rol: " + user.rol;
  document.getElementById("user-id").innerText = "ID: " + user.id;
}

//inloggen/logout functies
//inloggen gebeurt in login.html
function openInIframe(event, url) {
  event.preventDefault();
  document.getElementById('content-iframe').src = url;
}

document.querySelector(".login-btn").addEventListener("click", (event) => {
   openInIframe(event, './login/login.html');
});

document.querySelector(".logout-btn").addEventListener("click", (event) => {
    logout();
   
});

// Uitloggen
function logout() {
  localStorage.removeItem("token");
    alert("Uitgelogd");
    location.reload();
    // terug naar loginpagina        
    openInIframe(event, './login/login.html');
}

// LAAD MENU OP BASIS VAN ROL
function laadMenu() {
  const user = getUserFromToken();
  if (!user) return;

  if (user.rol === "docent") {
    laadDocentmenu();
  } else {
    laadLeerlingmenu();
  }
}

// DOCENTMENU
function laadDocentmenu() {
  const menuContainer = document.getElementById("menu");

  menuContainer.innerHTML = `
    <h2>Docentmenu</h2>
    <a href="overzicht.html" onclick="openInIframe(event, 'overzicht.html')">Overzicht leskaarten</a><br><br>
    <a href="vulleskaart.html" onclick="openInIframe(event, 'vulleskaart.html')">Nieuwe leskaart</a><br><br>
    <a href="bewerkvanuitoverzicht.html" onclick="openInIframe(event, 'bewerkvanuitoverzicht.html')">Bewerk leskaarten</a><br><br>
    <a href="leerlingmateriaal.html" onclick="openInIframe(event, 'leerlingmateriaal.html')">Leerlingmateriaal</a><br><br>
    <a href="antwoorden.html" onclick="openInIframe(event, 'antwoorden.html')">Antwoorden overzicht</a><br><br>
  `;

  console.log("Docentmenu geladen");
}

// LEERLINGMENU
function laadLeerlingmenu() {
  const menuContainer = document.getElementById("menu");

  menuContainer.innerHTML = `
    <h2>Leerlingmenu</h2>
    <a href="lesmateriaalperkaart.html" onclick="openInIframe(event, 'lesmateriaalperkaart.html')">Werk per bladzijde</a><br><br>
    <a href="leerlingmateriaal.html" onclick="openInIframe(event, 'leerlingmateriaal.html')">Bekijk de hele module</a><br><br>
  `;

  console.log("Leerlingmenu geladen");
}

// BIJ PAGINALAAD
window.addEventListener("load", () => {
  laadSidebar();
  laadMenu();
});