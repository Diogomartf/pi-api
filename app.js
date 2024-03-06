const express = require("express");
const axios = require("axios");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

registerFont("./public/fonts/uncut-sans.ttf", { family: "Uncut Sans" });

const app = express();
const PORT = process.env.PORT || 3000;

const COINGECKO_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

// Serve static files from the "public" directory
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.get("/test", (req, res) => {
  const imagePath = path.join(__dirname, "public", "images/tokens.png");
  res.sendFile(imagePath);
});

app.get("/image", async (req, res) => {
  let bitcoinText = "Bitcoin - $69,392.34";
  try {
    // Fetch current price of Bitcoin
    const response = await axios.get(COINGECKO_API);

    console.log(response);
    const { data } = response;
    if (data && data.bitcoin) {
      console.log("bitcoin price", data.bitcoin.usd);
      bitcoinText = `Bitcoin - $${data.bitcoin.usd}`;
    }
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send("Error creating image");
  }
  // Set the dimensions of the image
  const width = 800;
  const height = 480;

  // Create a canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill the background (optional)
  context.fillStyle = "#FFFFFF"; // white background
  context.fillRect(0, 0, width, height);

  const imagePathBitcoin = path.join(__dirname, "public", "images/bitcoin.png");
  // const imagePathETH = path.join(__dirname, "public", "images/tokens.png");

  // Load an image from file or URL
  const imageBitcoin = await loadImage(imagePathBitcoin);
  // const imageETH = await loadImage(imagePathETH);

  // Draw the image onto the canvas
  // context.drawImage(imageBitcoin, 0, 0, width, height);
  const tokenImageSize = 99;
  context.drawImage(imageBitcoin, 50, 80, tokenImageSize, tokenImageSize);

  // Set token text properties
  context.font = "48px Uncut Sans";
  context.fillStyle = "#000000"; // black tex
  // Add text to the canvas
  context.fillText(bitcoinText, 180, 150);

  // green percentage
  context.font = "48px Uncut Sans";
  context.fillStyle = "#00A83E"; // black tex
  context.fillText("+3%", 550, 150);

  // Convert the canvas to a Buffer and send it as the response
  const buffer = canvas.toBuffer("image/png");

  res.type("png");
  res.send(buffer);
});
