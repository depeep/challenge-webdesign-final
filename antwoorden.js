

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

// leerlingen tonen )
function toonLeerlingen(leerlingen) {
  const lijst = document.getElementById("leerlingenContainer");
  lijst.innerHTML = "";

  leerlingen.forEach(l => {
    const div = document.createElement("div");
    div.classList.add("leerling-item");

    div.innerHTML = `
      <p><strong>${l.naam} "---""</strong>
      <button onclick="laadAntwoordenVanLeerling(${l.id}, '${l.naam}')">
        Bekijk antwoorden</p>
      </button>
    `;

    lijst.appendChild(div);
  });
}


// antwoorden van leerling ophalen en tonen
async function laadAntwoordenVanLeerling(usersid, leerlingnaam) {
  const token = localStorage.getItem("token");
  const naam = leerlingnaam;
  try {
    const response = await fetch(`http://localhost:3000/antwoorden/${usersid}`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + token }
    });

    const data = await response.json();

    toonAntwoordenVanLeerling(data, naam);

  } catch (err) {
    console.error("Fout bij ophalen van antwoorden:", err);
  }
}

function toonAntwoordenVanLeerling(antwoorden, naam) {
  const container = document.getElementById("antwoordenContainer");
  container.innerHTML = "";
  const leerlingnaam = naam;

  if (antwoorden.length === 0) {
    container.innerHTML = "<p>Geen antwoorden gevonden voor leerling: " + leerlingnaam + "</p>";
    return;
  }
  container.innerHTML += `<h1><strong>Antwoorden van:</strong> ${leerlingnaam}</h1>`;
  antwoorden.forEach(a => {
    
    const div = document.createElement("div");
    div.classList.add("antwoord-item");

    div.innerHTML = `
        <table>
          <tr>
            <td><strong>Leskaart: ${a.leskaartenid}</strong></td>
            <td>${a.antwoord}</td>
          </tr>
        </table>
        <br>
    `;

    container.appendChild(div);
  });
}

laadLeerlingen()