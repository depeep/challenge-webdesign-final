
document.addEventListener("DOMContentLoaded", () => {

  let selectedBlokId = null;
  let sortAscending = true;

  // Inputs
  const idInput = document.getElementById("id");
  const naamInput = document.getElementById("naam");
  const gebruikersnaamInput = document.getElementById("gebruikersnaam");
  const wachtwoordInput = document.getElementById("wachtwoord");
  const actiefInput = document.getElementById("actief");
  const result = document.getElementById("result");

  // Edit form
  const editForm = document.getElementById("editForm");
  const editId = document.getElementById("editId");
  const editNaam = document.getElementById("editNaam");
  const editGebruikersnaam = document.getElementById("editGebruikersnaam");
  const editWachtwoord = document.getElementById("editWachtwoord");
  const editActief = document.getElementById("editActief");

  // ------------------------------
  // VALIDATIE
  // ------------------------------
  function validateLeerlingFields(data, isNew = false) {
    const errors = [];

    if (isNew && !data.id) errors.push("ID is verplicht");
    if (!data.naam) errors.push("Naam is verplicht");
    if (!data.gebruikersnaam) errors.push("Gebruikersnaam verplicht");
    if (!data.wachtwoord || data.wachtwoord.length < 6)
      errors.push("Wachtwoord min. 6 tekens");
    if (!["1", "0"].includes(data.actief))
      errors.push("Actief moet '1' of '0' zijn");

    return errors;
  }

  // ------------------------------
  // SORTEREN
  // ------------------------------
  function toggleSort() {
    sortAscending = !sortAscending;
    searchLeerling();
  }

  // ------------------------------
  // LIVE SEARCH
  // ------------------------------
  let timer = null;

  function liveSearch() {
    clearTimeout(timer);
    timer = setTimeout(() => searchLeerling(), 200);
  }

  // ------------------------------
  // ZOEKEN
  // ------------------------------
  async function searchLeerling() {
    const params = new URLSearchParams({
      id: idInput.value,
      naam: naamInput.value,
      gebruikersnaam: gebruikersnaamInput.value,
      wachtwoord: wachtwoordInput.value,
      actief: actiefInput.value
    });

    try {
      const res = await fetch(`http://localhost:3000/leerlingen?${params}`);
      const data = await res.json();

      data.sort((a, b) =>
        sortAscending
          ? a.naam.localeCompare(b.naam)
          : b.naam.localeCompare(a.naam)
      );

      if (data.length === 0) {
        result.innerHTML = "Geen leerling gevonden";
        return;
      }

      showResults(data);
    } catch (err) {
      console.error(err);
      result.innerHTML = "Fout bij laden van gegevens.";
    }
  }

  // ------------------------------
  // RESULTATEN TONEN
  // ------------------------------
  function showResults(data) {
    result.innerHTML = "";

    data.forEach(leerling => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${leerling.naam}</h3>
        <p>
          <strong>ID:</strong> ${leerling.id}<br>
          <strong>Naam:</strong> ${leerling.naam}<br>
          <strong>Gebruikersnaam:</strong> ${leerling.gebruikersnaam}<br>
          <strong>Wachtwoord:</strong> ${leerling.wachtwoord}<br>
          <strong>Actief:</strong> ${leerling.actief}
        </p>
      `;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Bewerken";
      editBtn.onclick = () => editLeerling(leerling.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Verwijderen";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteLeerling(leerling.id);

      card.append(editBtn, deleteBtn);
      result.appendChild(card);
    });
  }

  // ------------------------------
  // NIEUW FORMULIER
  // ------------------------------
  function openNewLeerlingForm() {
    selectedBlokId = null;
    editId.value = "";
    editNaam.value = "";
    editGebruikersnaam.value = "";
    editWachtwoord.value = "";
    editActief.value = "";
    editForm.classList.remove("hidden");
  }

  function closeEditForm() {
    editForm.classList.add("hidden");
  }

  // ------------------------------
  // TOEVOEGEN
  // ------------------------------
  async function addLeerling() {
    const data = {
      id: editId.value.trim(),
      naam: editNaam.value.trim(),
      gebruikersnaam: editGebruikersnaam.value.trim(),
      wachtwoord: editWachtwoord.value.trim(),
      actief: editActief.value.trim()
    };

    const errors = validateLeerlingFields(data, true);
    if (errors.length > 0) return alert(errors.join("\n"));

    await fetch("http://localhost:3000/leerlingen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Toegevoegd!");
    closeEditForm();
    searchLeerling();
  }

  // ------------------------------
  // BIJWERKEN (PATCH)
  // ------------------------------
  async function patchLeerling() {
    const data = {
      naam: editNaam.value.trim(),
      gebruikersnaam: editGebruikersnaam.value.trim(),
      wachtwoord: editWachtwoord.value.trim(),
      actief: editActief.value.trim()
    };

    // Lege velden uit PATCH halen
    Object.keys(data).forEach(key => {
      if (data[key] === "") delete data[key];
    });

    await fetch(`http://localhost:3000/leerlingen/${selectedBlokId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Bijgewerkt!");
    closeEditForm();
    searchLeerling();
  }

  // ------------------------------
  // VERWIJDEREN
  // ------------------------------
  async function deleteLeerling(id) {
    if (!confirm("Weet je zeker dat je deze leerling wilt verwijderen?"))
      return;

    await fetch(`http://localhost:3000/leerlingen/${id}`, {
      method: "DELETE"
    });

    alert("Verwijderd!");
    searchLeerling();
  }

  // ------------------------------
  // BEWERKEN (EDIT)
  // ------------------------------
async function editLeerling(id) {
  selectedBlokId = id;

  editForm.classList.remove("hidden");

  const res = await fetch(`http://localhost:3000/leerlingen?id=${id}`);

  const data = await res.json();

  const leerling = data[0]; // want backend geeft array terug

  if (!leerling) {
    alert("Leerling niet gevonden!");
    return;
  }

  editId.value = leerling.id;
  editNaam.value = leerling.naam;
  editGebruikersnaam.value = leerling.gebruikersnaam;
  editWachtwoord.value = leerling.wachtwoord;
  editActief.value = leerling.actief;
}
``


  // Expose functies aan HTML
  window.liveSearch = liveSearch;
  window.toggleSort = toggleSort;
  window.openNewLeerlingForm = openNewLeerlingForm;
  window.closeEditForm = closeEditForm;
  window.addLeerling = addLeerling;
  window.patchLeerling = patchLeerling;
});
