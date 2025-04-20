const express = require("express");
const path = require("path");
const fs = require("fs");
const React = require("react");
const TokensImage = require("./components/TokensImage").default;
const AiClock = require("./routes/aiClock");
const Tokens = require("./routes/tokens");

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === "development";

// Serve static files from the "public" directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center;'>Image Gen OS™</h1>");
});

app.get("/test", (req, res) => {
  const imagePath = path.join(__dirname, "public", "images/tokens.png");
  res.sendFile(imagePath);
});

app.get("/tokens", Tokens);

app.get("/ai-clock", AiClock);
