import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// ✅ Allow both local + deployed frontend
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://127.0.0.1:5174",
  "http://localhost:5174",
  "https://myportfolio-beta-seven-60.vercel.app",
  "https://myportfoliov2.vercel.app" // Add your new Vercel URL here
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow tools like Postman

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// Main contact routes that perform DB and Mailer logic
app.use("/api", contactRoutes);

// Simple login route for Admin Dashboard
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Replace these with your preferred credentials in your .env file
  const adminUser = process.env.ADMIN_USERNAME || "Engrdotman";
  const adminPass = process.env.ADMIN_PASSWORD || "Hertheydotun";

  if (username === adminUser && password === adminPass) {
    // In a production app, you would sign a real JWT here using jsonwebtoken
    res.json({ 
      success: true, 
      access: "dev-token-" + Date.now() // Matching the "access" key expected by frontend
    });
  } else {
    res.status(401).json({ detail: "Invalid username or password" });
  }
});

import pool from "./db/db.js";

app.get("/setup-db", async (req, res) => {
  try {
    // Setup contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    res.json({
      message: "Database tables initialized successfully! ✅",
      tables: ["contacts"],
      next_steps: "You can now test your contact form and login to the admin dashboard."
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating table: " + err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});