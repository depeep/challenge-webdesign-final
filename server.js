import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DATABASE VERBINDING ----------------------------
const db = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "xampp-root",
  database: process.env.DB_NAME || "gamedesign"
});

console.log("Verbonden met MySQL database");


// ------------------------------
// REGISTRATIE / LOGIN
// ------------------------------
//registreren
app.post("/register", async (req, res) => {
  const { email, password, naam, rol } = req.body;

  const hashed = await bcrypt.hash(password, 12);

  await db.query(
    "INSERT INTO users (email, password_hash, naam, rol) VALUES (?, ?, ?, ?)",
    [email, hashed, naam, rol || "leerling"] 
  );

  res.json({ message: "Gebruiker geregistreerd" });
});

//inloggen
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0)
    return res.status(400).json({ error: "Onbekend e-mail" });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) return res.status(401).json({ error: "Wachtwoord onjuist" });
//id, naam, rol meegeven in token
const token = jwt.sign(
  { id: user.id, naam: user.naam, rol: user.rol },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

  res.json({ token });
});


// ------------------------------
// AUTH MIDDLEWARE 
// ------------------------------
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Geen token" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ error: "Ongeldige token" });
  }
}

// middleware om rol te controleren voor bepaalde routes
// gebruik: app.get("/admin", auth, requireRole("admin"), (req, res) => { ... });
// voorbeeld auth, requireRole("docent"), zoals hieronder bij get("/leerlingen")

function requireRole(rol) {
  return (req, res, next) => {
    if (!req.user || req.user.rol !== rol) {
      return res.status(403).json({ error: "Geen toegang (rol vereist)" });
    }
    next();
  };
}


// ------------------------------
// PROFILE (beschermd)
// ------------------------------
app.get("/profile", auth, (req, res) => {
  res.json({
    message: "Welkom!",
    naam: req.user.naam,
    userId: req.user.id,
    rol: req.user.rol
  });
});

// Gebruiker ophalen op ID (id, naam, rol)
app.get("/user/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const sql = `
      SELECT id, naam, rol 
      FROM users 
      WHERE id = ?
    `;
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Gebruiker niet gevonden" });
    }

    res.json(rows[0]); // stuur 1 object terug
  } catch (err) {
    console.error("Database fout:", err);
    res.status(500).json({ error: "Database fout" });
  }
});

// Alle leerlingen (id, naam, rol) — alleen ingelogd vereist
app.get("/users", auth, async (req, res) => {
  try {
    const rol = req.query.rol; // optioneel filter
    let sql = "SELECT id, naam, rol FROM users";
    const params = [];

    if (rol) {
      sql += " WHERE rol = ?";
      params.push(rol);
    }

    sql += " ORDER BY naam ASC";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("Database fout:", err);
    res.status(500).json({ error: "Database fout" });
  }
});

// ------------------------------
// LESKAARTEN CRUD
// ------------------------------
// Alle leskaarten ophalen (voor ingelogde gebruikers)

app.get("/leskaarten/ALL",  async (req, res) => {
  const [rows] = await db.query("SELECT * FROM leskaarten");
  res.json(rows);
});

app.get("/leskaarten/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM leskaarten WHERE id = ?", [
    req.params.id
  ]);
  res.json(rows);
});
// Leskaart aanmaken, bijwerken, verwijderen ( alleen docent)
app.post("/leskaarten", auth, requireRole("docent"), async (req, res) => {
  const { titel, theorie, afb1, afb2, opdracht, extra } = req.body;

  const sql = `
    INSERT INTO leskaarten (titel, theorie, afb1, afb2, opdracht, extra)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    titel,
    theorie,
    afb1,
    afb2,
    opdracht,
    extra
  ]);

  res.json({ success: true, id: result.insertId });
});
// Leskaart bijwerken (alleen docent)
app.patch("/leskaarten/:id", auth, requireRole("docent"), async (req, res) => {
  const fields = req.body;
  if (!Object.keys(fields).length)
    return res.status(400).json({ message: "Geen velden om bij te werken" });

  const keys = Object.keys(fields).map((k) => `${k} = ?`).join(", ");
  const values = [...Object.values(fields), req.params.id];

  await db.query(`UPDATE leskaarten SET ${keys} WHERE id = ?`, values);
  res.json({ message: "Leskaart bijgewerkt" });
});
// Leskaart verwijderen (alleen docent)
app.delete("/leskaarten/:id", auth, requireRole("docent"), async (req, res) => {
  await db.query("DELETE FROM leskaarten WHERE id = ?", [req.params.id]);
  res.json({ message: "Leskaart verwijderd" });
});

// ------------------------------
// ANTWOORDEN OPSLAAN EN OPHALEN
// ------------------------------ 
// //antwoorden opslaan (voor ingelogde gebruikers)
app.post("/antwoorden", auth, async (req, res) => {
  const { leskaartenid, antwoord } = req.body;

  // user-id halen uit token
  const usersid = req.user.id;

  if (!leskaartenid || !antwoord) {
    return res.status(400).json({ error: "leskaartenid en antwoord zijn verplicht" });
  }

  try {
    const sql = `
      INSERT INTO antwoorden (usersid, leskaartenid, antwoord)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [usersid, leskaartenid, antwoord]);

    res.json({
      success: true,
      insertedId: result.insertId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database fout" });
  }
});

//antwoorden ophalen (voor docent) per leerling alleen docent
app.get("/antwoorden/:usersid", auth, requireRole("docent"), async (req, res) => {
  const usersid = req.params.usersid; 
  try {
    const sql = `
      SELECT * FROM antwoorden WHERE usersid = ?
    `;
    const [rows] = await db.query(sql, [usersid]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database fout" });
  }
}); 




// ------------------------------
// START SERVER
// ------------------------------

app.listen(3000, () => console.log("Server draait op http://localhost:3000"));