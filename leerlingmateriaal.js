
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
           
              <h1>${contentItem.titel}</h1>
 
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
        <div class="kaart">
          <label>Antwoord:</label><br>
          <textarea class="input" id="antwoord_${contentItem.id}" placeholder="Typ hier je antwoord..."></textarea>
          <br>
          <button class="opslaan" onclick="slaAntwoordOp(${contentItem.id})">
            Antwoord opslaan
          </button>
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

fetchContent();



async function slaAntwoordOp(leskaartenid) {
  const token = localStorage.getItem("token");
  const antwoord = document.getElementById("antwoord_" + leskaartenid).value;

  if (!token) {
    alert("Je bent niet ingelogd!");
    return;
  }

  if (!antwoord.trim()) {
    alert("Je moet een antwoord typen!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/antwoorden", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        leskaartenid: leskaartenid,
        antwoord: antwoord
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert("Fout bij opslaan van antwoord");
      return;
    }

    alert("Antwoord opgeslagen!");
  } catch (err) {
    console.error(err);
    alert("Netwerkfout");
  }
}