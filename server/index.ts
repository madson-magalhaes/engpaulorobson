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

  // Routes - Tracking API (ANTES de static files)
  app.use(pageviewRouter);
  app.use(cliqueRouter);

  // Serve static files SOMENTE da pasta da landing page (não da raiz de dist/)
  const landingPath = path.resolve(__dirname, "..", "inss-de-obras");
  app.use(express.static(landingPath));

  // Fallback para index.html (client-side routing)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(landingPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
