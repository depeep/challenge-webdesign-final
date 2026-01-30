

// ophalen leerlingen
async function laadLeerlingen() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/users?rol=leerling", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error(err);
    alert(err.error || "Fout bij ophalen leerlingen");
    return;
  }

  const data = await response.json();
  toonLeerlingen(data);
}

// leerlingen tonen (ongewijzigd, behoud je eigen functie)
function toonLeerlingen(leerlingen) {
  const lijst = document.getElementById("leerlingenContainer");
  lijst.innerHTML = "";

  leerlingen.forEach(l => {
    const div = document.createElement("div");
    div.classList.add("leerling-item");

    div.innerHTML = `
      <p><strong>${l.naam}</strong></p>
      <button onclick="laadAntwoordenVanLeerling(${l.id})">
        Bekijk antwoorden
      </button>
    `;

    lijst.appendChild(div);
  });
}


// antwoorden van leerling ophalen en tonen
async function laadAntwoordenVanLeerling(usersid) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3000/antwoorden/${usersid}`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + token }
    });

    const data = await response.json();

    toonAntwoordenVanLeerling(data);

  } catch (err) {
    console.error("Fout bij ophalen van antwoorden:", err);
  }
}

function toonAntwoordenVanLeerling(antwoorden) {
  const container = document.getElementById("antwoordenContainer");
  container.innerHTML = "";

  if (antwoorden.length === 0) {
    container.innerHTML = "<p>Geen antwoorden gevonden.</p>";
    return;
  }

  antwoorden.forEach(a => {
    const div = document.createElement("div");
    div.classList.add("antwoord-item");

    div.innerHTML = `
      <p><strong>Leskaart-ID:</strong> ${a.leskaartenid}</p>
      <p><strong>Antwoord:</strong><br> ${a.antwoord}</p>
      <hr>
    `;

    container.appendChild(div);
  });
}

laadLeerlingen()