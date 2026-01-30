const API = "http://localhost:3000";  // Pas aan indien nodig

// Regex-validatie (zoals in je security-aantekeningen)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  return regex.test(email);
}

// REGISTREREN
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const naam = document.getElementById("regName").value;

  if (!validateEmail(email)) {
    document.getElementById("regMsg").innerText = "Ongeldig e-mailadres";
    return;
  }

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, naam })
  });

  const data = await res.json();
  document.getElementById("regMsg").innerText = data.message || data.error;
}

// LOGIN
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("loginMsg").innerText = "Inloggen gelukt!";
    window.location.href = "profile.html"; // maak deze zelf aan
  } else {
    document.getElementById("loginMsg").innerText = data.error;
  }
}