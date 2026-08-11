import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import pageviewRouter from "./routes/pageview.js";
import cliqueRouter from "./routes/clique.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // Routes - Tracking API (deve vir ANTES do static files)
  app.use(pageviewRouter);
  app.use(cliqueRouter);

  // Serve static files from dist (Vite output)
  const staticPath = path.resolve(__dirname, "..", "dist");
  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "inss-de-obras", "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
