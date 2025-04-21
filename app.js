import path from "path";
import dotenv from "dotenv";
import { handleTokensRoute } from "./routes/tokens";
import { handleAiClockRoute } from "./routes/aiClock";
dotenv.config(); // Load environment variables

// Start the Bun server
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Route handling
    if (url.pathname === "/") {
      return new Response("<h1 style='text-align: center;'>Image Gen OS</h1>", {
        headers: { "Content-Type": "text/html" },
      });
    }

    if (url.pathname === "/test") {
      const imagePath = path.join(process.cwd(), "public", "images/tokens.png");
      const file = Bun.file(imagePath);
      return new Response(file);
    }

    if (url.pathname === "/tokens") {
      return await handleTokensRoute();
    }

    if (url.pathname === "/ai-clock") {
      return await handleAiClockRoute();
    }

    // Default 404 response
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server listening on port: ${server.port}`);
