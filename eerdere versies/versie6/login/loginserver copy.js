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

// DATABASE VERBINDING
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
/*
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
*/

// REGISTRATIE EN LOGIN LOGICA
// ------------------------------


// REGISTRATIE ENDPOINT
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 12);
  await db.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [
    email,
    hashed
  ]);

  res.json({ message: "Gebruiker geregistreerd" });
});

// LOGIN ENDPOINT
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) return res.status(400).json({ error: "Onbekend e-mail" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) return res.status(401).json({ error: "Wachtwoord onjuist" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// PROTECTED ENDPOINT
app.get("/profile", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "Geen token" });

  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ message: "Welkom!", userId: decoded.id });
  } catch {
    res.status(403).json({ error: "Ongeldige token" });
  }
});

// START SERVER
app.listen(3000, () => console.log("Server draait op http://localhost:3000"));