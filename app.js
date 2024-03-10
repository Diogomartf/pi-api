const express = require("express");
const axios = require("axios");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

registerFont("./public/fonts/uncut-sans.ttf", { family: "Uncut Sans" });

const app = express();
const PORT = process.env.PORT || 3000;

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/simple/";

const coingeckoApi = `${COINGECKO_BASE_URL}/price?ids=ethereum,bitcoin,solana&vs_currencies=usd`;

const tokenText = price => {
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedPrice;
};

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
  let bitcoinText = "$69,420";
  let ethText = "$4,200";
  let solText = "$4,20";

  try {
    // Fetch current price of tokens
    const response = await axios.get(coingeckoApi);

    const { data } = response;
    if (data && data.bitcoin && data.ethereum) {
      bitcoinText = tokenText(data.bitcoin.usd);
      ethText = tokenText(data.ethereum.usd);
      solText = tokenText(data.solana.usd);
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
  const imagePathETH = path.join(__dirname, "public", "images/eth.png");
  const imagePathSOL = path.join(__dirname, "public", "images/sol.png");

  // Load an image from file or URL
  const imageBitcoin = await loadImage(imagePathBitcoin);
  const imageETH = await loadImage(imagePathETH);
  const imageSOL = await loadImage(imagePathSOL);

  // Draw the image onto the canvas
  const tokenImageSize = 110;
  const imagePaddingLeft = 50;

  context.drawImage(
    imageBitcoin,
    imagePaddingLeft,
    30,
    tokenImageSize,
    tokenImageSize
  );
  context.drawImage(
    imageETH,
    imagePaddingLeft,
    170,
    tokenImageSize,
    tokenImageSize
  );
  context.drawImage(
    imageSOL,
    imagePaddingLeft,
    330,
    tokenImageSize,
    tokenImageSize
  );

  // Set font properties
  context.font = "84px Uncut Sans";
  context.fillStyle = "#000000"; // black tex
  // Add text to the canvas
  const textPaddingLeft = 248;
  context.fillText(bitcoinText, textPaddingLeft, 120);
  context.fillText(ethText, textPaddingLeft, 260);
  context.fillText(solText, textPaddingLeft, 420);

  // green percentage
  // context.font = font;
  // context.fillStyle = "#00A83E"; // black tex
  // context.fillText("+3%", 600, 150);

  // Convert the canvas to a Buffer and send it as the response
  const buffer = canvas.toBuffer("image/png");

  res.type("png");
  res.send(buffer);
});
