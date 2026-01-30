
// Zorg dat html2pdf via <script> in HTML geladen is, niet via import

function fetchContent() {
  fetch('http://localhost:3000/leskaarten/ALL')
    .then(res => res.json())
    .then(data => {
      const lijst = document.getElementById('leskaartLijst');
      lijst.innerHTML = '';

      data.forEach(contentItem => {
        const div = document.createElement('div');
        div.classList.add('leskaart-item');

        let html = `
          <section class="leskaart">
            <div id="titel" class="kaart">
              <i>${contentItem.id}</i>
              <h1>${contentItem.titel}</h1>
              <button id="bewerk-knop" class="bewerk-knop" onclick="location.href='bewerkleskaart.html?id=${contentItem.id}'">Bewerk</button>
              <button id="bewerk-knop" class="verwijder-knop" onclick="deleteLeskaart(${contentItem.id})">Verwijder</button>
            </div>`;
           
if (contentItem.theorie !== '') {
            html += `
            <div id="theorie-met-afbeeldingen" class="kaart">  
            <div class="theorie-tekst">${contentItem.theorie}</div>
            `;}
        if (contentItem.afb1 !== '') {
            html += `
              <div class="afbeeldingen-container">
                <div class="afbeelding"><img src="${contentItem.afb1}" alt="Afbeelding 1"></div>
             
          `;}
          html += ` </div>
            </div>`;
        html += ` 
            <div id="opdracht-met-afbeeldingen" class="kaart">`;
        
        if (contentItem.opdracht !== '') {
          html += `
              <div class="opdracht-container">
                <div class="opdracht-tekst">
                  <img class="icoon" src="./img/controller-icon.png" alt="Controller icoon">
                  ${contentItem.opdracht}
                </div>
          `;
          if (contentItem.afb2 !== '') {
            html += `
                <div class="afbeelding">
                <img src="${contentItem.afb2}" alt="Afbeelding 2"></div>
            `;
          }
          html += `
              </div>
            </div>`;
        }
          if (contentItem.extra !== '') {
          html += ` 

            <div id="antwoord" class="kaart">
              <label for="antwoord">Antwoord:</label><br>
              <textarea class="input" id="antwoord" placeholder="Typ hier je antwoord..."></textarea>
            </div>
          `;
        }
            

        html += `</section>`;
        div.innerHTML = html;
        lijst.appendChild(div);
      });
    })
    .catch(err => console.error('Fout bij ophalen:', err));
}


async function deleteLeskaart(id) {
  if (!confirm("Weet je zeker dat je deze leskaart wilt verwijderen?")) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Je bent niet ingelogd (geen token gevonden).");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/leskaarten/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    // Probeer serverresponse te lezen (ook bij fouten)
    const raw = await response.text();
    let payload = {};
    try { payload = raw ? JSON.parse(raw) : {}; } catch {}

    if (!response.ok) {
      const msg = payload.error || response.statusText || "Fout bij verwijderen";
      throw new Error(`${response.status} ${msg}`);
    }

    alert("Leskaart succesvol verwijderd!");

    // Herlaad de lijst of ga terug naar overzicht
    if (typeof fetchContent === "function") {
      fetchContent(); // jouw bestaande lijst-herlaadfunctie
    } else {
      // fallback: reload of navigeer
      // location.reload();
      window.location.href = "./overzicht.html";
    }
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}

// Download als Word
// function downloadWord() {
//   const content = document.getElementById('leskaartLijst').innerHTML;
//   const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = 'leskaarten.doc';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// // Download als PDF
// function downloadPDF() {
//   const element = document.getElementById('leskaartLijst').innerHTML;
//   html2pdf().from(element).save();
// }

fetchContent();
