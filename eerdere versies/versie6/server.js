const express = require('express');
const mysql = require('mysql2');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); //toegevoegd wegens tweede server 

// Maak verbinding met de MySQL database
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'xampp-root', // vul je MySQL-wachtwoord in indien nodig
   database: 'gamedesign' // vul je database naam in
});

db.connect(err => {
   if (err) {
      console.error('Database verbinding mislukt:', err);
      return;
   }
   console.log('Verbonden met MySQL database');
});

// SELECT: Haal alle data op (GET endpoint)
app.get('/leskaarten/ALL', (req, res) => {
   db.query('SELECT * FROM leskaarten', (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      res.json(results);
   });
});

// SELECT: Haal leskaarten op met een id (GET endpoint)
app.get('/leskaarten/:id', (req, res) => {
   const { id } = req.params;
   db.query('SELECT * FROM leskaarten WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: err });
      }
      res.json(results);
   });
});



// INSERT: Voeg nieuwe content toe (POST endpoint)
app.post('/leskaarten', (req, res) => {
  const { titel, theorie, afb1, afb2, opdracht, extra } = req.body;

  const sql = `
    INSERT INTO leskaarten
    (titel, theorie, afb1, afb2, opdracht, extra) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [titel, theorie, afb1, afb2, opdracht, extra], (err, result) => {
    if (err) {
      console.error('Fout bij toevoegen:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, blokid: result.insertId });
  });
});

// Endpoint om een boek gedeeltelijk bij te werken op id (PATCH endpoint)
app.patch('/leskaarten/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  // Controleer of er velden zijn om bij te werken
  if (!fields || Object.keys(fields).length === 0) {
    return res.status(400).json({ message: 'Geen velden om bij te werken' });
  }

  // Dynamisch SQL-query opbouwen
  const columns = Object.keys(fields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(fields);

  const sql = `UPDATE leskaarten SET ${columns} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Leskaart niet gevonden' });
    }

    res.json({ message: 'Leskaart succesvol gedeeltelijk bijgewerkt' });
  });
});

// Endpoint om een leskaart te verwijderen op id
app.delete('/leskaarten/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM leskaarten WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Leskaart niet gevonden' });
    }

    res.json({ message: 'Leskaart succesvol verwijderd' });
  });
});

// --- GET (zoeken) ---
app.get("/leerlingen", (req, res) => {
  let query = "SELECT * FROM leerlingen WHERE 1=1";
  const params = [];

  for (const key of ["id", "naam", "gebruikersnaam", "wachtwoord", "actief"]) {
    if (req.query[key]) {
      query += ` AND ${key} LIKE ?`;
      params.push("%" + req.query[key] + "%");
    }
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// --- POST (toevoegen) ---
app.post("/leerlingen", (req, res) => {
  const { id, naam, gebruikersnaam, wachtwoord, actief } = req.body;

  db.query(
    "INSERT INTO leerlingen (id, naam, gebruikersnaam, wachtwoord, actief) VALUES (?, ?, ?, ?, ?)",
    [id, naam, gebruikersnaam, wachtwoord, actief],
    err => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Toegevoegd" });
    }
  );
});

// --- PATCH (bewerken) ---
app.patch("/leerlingen/:id", (req, res) => {
  const fields = req.body;
  const keys = Object.keys(fields);

  if (keys.length === 0)
    return res.status(400).json({ error: "Geen velden om bij te werken" });

  const updates = keys.map(k => `${k} = ?`).join(", ");
  const values = keys.map(k => fields[k]);
  values.push(req.params.id);

  db.query(`UPDATE leerlingen SET ${updates} WHERE id = ?`, values, err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Bijgewerkt" });
  });
});

// --- DELETE ---
app.delete("/leerlingen/:id", (req, res) => {
  db.query("DELETE FROM leerlingen WHERE id = ?", [req.params.id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Verwijderd" });
  });
});

// ---------- Start Server ---------- //

app.listen(3000, () => {
  console.log("SQL backend draait op http://localhost:3000");
});

// Start de server
app.listen(3000, () => {
   console.log('Server draait op http://localhost:3000');
});


