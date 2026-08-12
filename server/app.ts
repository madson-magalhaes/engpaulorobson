import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pageviewRouter from "./routes/pageview.js";
import cliqueRouter from "./routes/clique.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// CORS configuration (optional but good practice for serverless setup)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Routes - Tracking API (ANTES de static files)
app.use(pageviewRouter);
app.use(cliqueRouter);

// Serve static files SOMENTE da pasta da landing page
const landingPath = path.resolve(__dirname, "inss-de-obras");
const fallbackPath = path.resolve(__dirname, "..", "inss-de-obras");
const finalPath = fs.existsSync(landingPath) ? landingPath : fallbackPath;

app.use(express.static(finalPath));

// Fallback para index.html (client-side routing)
app.get("*", (_req, res) => {
  const indexPath = path.join(finalPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Landing page index.html not found");
  }
});

export default app;
