const express = require("express");
const axios = require("axios");
const { ImageResponse } = require("@vercel/og");
const path = require("path");
const fs = require("fs");
const React = require("react");
const TokenImage = require("./components/TokenImage").default;

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

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center;'>Image Gen OS™</h1>");
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

    // Load images as base64
    const images = {
      bitcoin:
        "data:image/png;base64," +
        fs
          .readFileSync(path.join(__dirname, "public/images/bitcoin.png"))
          .toString("base64"),
      eth:
        "data:image/png;base64," +
        fs
          .readFileSync(path.join(__dirname, "public/images/eth.png"))
          .toString("base64"),
      sol:
        "data:image/png;base64," +
        fs
          .readFileSync(path.join(__dirname, "public/images/sol.png"))
          .toString("base64"),
    };

    // Create the image using Satori with JSX
    const imageResponse = new ImageResponse(
      (
        <TokenImage
          bitcoinPrice={bitcoinText}
          ethPrice={ethText}
          solPrice={solText}
          images={images}
        />
      ),
      {
        width: 800,
        height: 480,
      }
    );

    // Convert the image to a buffer and send it
    const buffer = await imageResponse.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send("Error creating image");
  }
});
