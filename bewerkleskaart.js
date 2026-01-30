

// Haal het id uit de querystring
const params = new URLSearchParams(window.location.search);
const id = params.get('id');



async function getLeskaart() {
  try {
    const response = await fetch(`http://localhost:3000/leskaarten/${id}`);
    const data = await response.json();
    console.log('Leskaart data:', data);
    // Vul hier je HTML met de data
    document.getElementById('titel').value = data[0].titel;
    document.getElementById('theorie').value = data[0].theorie;
    document.getElementById('afb1').value = data[0].afb1;
    document.getElementById('afb2').value = data[0].afb2;
    document.getElementById('opdracht').value = data[0].opdracht;
    document.getElementById('extra').value = data[0].extra;

  } catch (error) {
    console.error('Fout bij ophalen:', error);
  }
}

// Event listener voor de update knop
document.getElementById('update-knop').addEventListener('click', () => {
    const titel = document.getElementById('titel').value;
    const theorie = document.getElementById('theorie').value;
    const afb1 = document.getElementById('afb1').value;
    const afb2 = document.getElementById('afb2').value;
    const opdracht = document.getElementById('opdracht').value;
    const extra = document.getElementById('extra').value;       

    updateLeskaart({ titel, theorie, afb1, afb2, opdracht, extra });
});

// // Event listener voor de verwijder knop, verplaatst naar overzicht.js
// document.getElementById('verwijder-knop').addEventListener('click', () => {
//     deleteLeskaart(id);
// });




getLeskaart();

async function updateLeskaart(fields) {
  // Haal token op
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Je bent niet ingelogd (geen token gevonden).');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/leskaarten/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Token meesturen
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(fields)
    });

    // Probeer server body te lezen (ook bij fouten)
    const raw = await response.text();
    let payload = {};
    try { payload = raw ? JSON.parse(raw) : {}; } catch {}

    if (!response.ok) {
      const msg = payload.error || response.statusText || 'Fout bij updaten';
      throw new Error(`${response.status} ${msg}`);
    }

    alert('Leskaart succesvol bijgewerkt!');
    // Optioneel: herlaad de pagina of ga terug naar het overzicht
    window.location.href = './overzicht.html';
  } catch (error) {
    alert('Fout bij updaten: ' + error.message);
  }
}

/* Verwijder leskaart functie is verplaatst naar overzicht.js */
/*
async function deleteLeskaart(id) {
  if (!confirm("Weet je zeker dat je deze leskaart wilt verwijderen?")) return;

  try {
    const response = await fetch(`http://localhost:3000/leskaarten/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Fout bij verwijderen");
    alert("Leskaart succesvol verwijderd!");
    searchBook(); // herlaad de lijst
  } catch (error) {
    alert("Er is een fout opgetreden: " + error.message);
  }
}
*/

