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

  // Serve static files - Vite coloca em dist/inss-de-obras
  const staticPath = path.resolve(__dirname, "..", "inss-de-obras");
  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html para todas as rotas
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) {
        console.error("Erro ao servir index.html:", err);
        res.status(404).send("index.html not found");
      }
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
