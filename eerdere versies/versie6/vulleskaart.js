
document.getElementById('dataForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const titel = document.getElementById('titel').value;
    const theorie = document.getElementById('theorie').value;
    const afb1 = document.getElementById('afb1').value;
    const afb2 = document.getElementById('afb2').value;
    const opdracht = document.getElementById('opdracht').value;
    const extra = document.getElementById('extra').value;

    try {
        const response = await fetch('http://localhost:3000/leskaarten', { // Check endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titel, theorie, afb1, afb2, opdracht, extra })
        });

        const result = await response.json();
        document.getElementById('response').textContent = `Server antwoord: ${JSON.stringify(result)}`;

        // Velden leegmaken NA succesvolle POST
        document.getElementById('titel').value = "";
        document.getElementById('theorie').value = "";
        document.getElementById('afb1').value = "";
        document.getElementById('afb2').value = "";
        document.getElementById('opdracht').value = "";
        document.getElementById('extra').value = "";

    } catch (error) {
        document.getElementById('response').textContent = `Fout: ${error.message}`;
    }
});

