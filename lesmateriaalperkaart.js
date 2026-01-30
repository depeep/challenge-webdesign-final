
  // Globale state
  let allLeskaarten = [];
  let currentIndex = 0;

  //  Ophalen van ALLE leskaarten (eenmalig), daarna 1 per keer tonen
  async function fetchContent() {
    try {
      const res = await fetch('http://localhost:3000/leskaarten/ALL');
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        renderEmpty("Geen leskaarten gevonden. Controleer of je ingelogd bent");
        return;
      }

      allLeskaarten = data;
      currentIndex = 0;
      renderLeskaart(currentIndex);
      updateNav();
    } catch (err) {
      console.error('Fout bij ophalen:', err);
      renderEmpty("Fout bij ophalen van leskaarten.");
    }
  }

  //  Toon leeg / foutmelding
  function renderEmpty(bericht) {
    const container = document.getElementById('leskaartContainer');
    container.innerHTML = `<div class="kaart"><p>${bericht}</p></div>`;
    document.getElementById('positie').textContent = '';
    document.getElementById('btnPrev').disabled = true;
    document.getElementById('btnNext').disabled = true;
  }

  // Bouw exact 1 leskaart in de container
  function renderLeskaart(index) {
    const container = document.getElementById('leskaartContainer');
    const contentItem = allLeskaarten[index];

    if (!contentItem) {
      renderEmpty("Leskaart niet gevonden.");
      return;
    }

    // Veiligheidshelpers
    const isNonEmpty = v => typeof v === 'string' && v.trim() !== '';
    const esc = (s) => s; // indien nodig kun je hier HTML-escaping toepassen

    let html = `
      <section class="leskaart" data-leskaartenid="${contentItem.id}">
        <div id="titel" class="kaart">
          <h1>${esc(contentItem.titel ?? '')}</h1>
        </div>
    `;

    // Theorie + eventuele afbeelding 1 (afb1)
    if (isNonEmpty(contentItem.theorie) || isNonEmpty(contentItem.afb1)) {
      html += `
        <div id="theorie-met-afbeeldingen" class="kaart">
          ${isNonEmpty(contentItem.theorie) ? `<div class="theorie-tekst">${contentItem.theorie}</div>` : ''}
          ${isNonEmpty(contentItem.afb1) ? `
            <div class="afbeeldingen-container">
              <div class="afbeelding"><img src="${contentItem.afb1}" alt="Afbeelding 1"></div>
            </div>
          ` : ''}
        </div>
      `;
    }

    // Opdracht + eventuele afbeelding 2 (afb2)
    if (isNonEmpty(contentItem.opdracht) || isNonEmpty(contentItem.afb2)) {
      html += `
        <div id="opdracht-met-afbeeldingen" class="kaart">
          <div class="opdracht-container">
            <div class="opdracht-tekst">
              <img class="icoon" src="./img/controller-icon.png" alt="Controller icoon">
              <div>${isNonEmpty(contentItem.opdracht) ? contentItem.opdracht : ''}</div>
            </div>
            ${isNonEmpty(contentItem.afb2) ? `
              <div class="afbeelding"><img src="${contentItem.afb2}" alt="Afbeelding 2"></div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // Antwoord-veld als 'extra' niet leeg is (volgens jouw bestaande logica)
    if (isNonEmpty(contentItem.extra)) {
      html += `
        <div class="kaart">
          <label for="antwoord_${contentItem.id}">Antwoord:</label><br>
          <textarea class="input" id="antwoord_${contentItem.id}" placeholder="Typ hier je antwoord..."></textarea>
          <br>
          <button class="opslaan" onclick="slaAntwoordOp(${contentItem.id})">Antwoord opslaan</button>
        </div>
      `;
    }

    html += `</section>`;

    container.innerHTML = html;

    // Update positietekst (bijv. "3 / 12")
    const positie = document.getElementById('positie');
    positie.textContent = `${index + 1} / ${allLeskaarten.length}`;
  }

  //  Update knopstatus
  function updateNav() {
    const prev = document.getElementById('btnPrev');
    const next = document.getElementById('btnNext');

    prev.disabled = (currentIndex <= 0);
    next.disabled = (currentIndex >= allLeskaarten.length - 1);
  }

  //  Navigatie handlers
  function goPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      renderLeskaart(currentIndex);
      updateNav();
    }
  }
  function goNext() {
    if (currentIndex < allLeskaarten.length - 1) {
      currentIndex++;
      renderLeskaart(currentIndex);
      updateNav();
    }
  }

  //  Event listeners voor knoppen en pijltjestoetsen
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnPrev').addEventListener('click', goPrev);
    document.getElementById('btnNext').addEventListener('click', goNext);

    // Keyboard: links/rechts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    });

    // Optioneel: PDF export knop
    const btnPdf = document.getElementById('btnPdf');
    if (btnPdf) {
      btnPdf.addEventListener('click', downloadHuidigeLeskaartAlsPDF);
    }

    // Start: haal alle leskaarten op
    fetchContent();
  });

  //  Ongewijzigd t.o.v. jouw code, maar iets defensiever gemaakt
  async function slaAntwoordOp(leskaartenid) {
    const token = localStorage.getItem("token");
    const textarea = document.getElementById("antwoord_" + leskaartenid);
    const antwoord = textarea ? textarea.value : '';

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

  //  Optioneel: huidige kaart als PDF met html2pdf
  function downloadHuidigeLeskaartAlsPDF() {
    const sectie = document.querySelector('#leskaartContainer .leskaart');
    if (!sectie) return;

    // Gebruik titel + index voor bestandsnaam
    const contentItem = allLeskaarten[currentIndex];
    const titel = (contentItem?.titel || 'leskaart').toString().replace(/[^\w\-]+/g, '_');
    const bestandsnaam = `${titel}_${currentIndex + 1}.pdf`;

    // Basisinstellingen html2pdf
    const opt = {
      margin:       10,
      filename:     bestandsnaam,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().from(sectie).set(opt).save();
  }
