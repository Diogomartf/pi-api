const express = require("express");
const axios = require("axios");
const { ImageResponse } = require("@vercel/og");
const path = require("path");
const fs = require("fs");
const React = require("react");
const TokenImage = require("./components/TokenImage").default;
const AiClockImage = require("./components/AiClock").default;

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === "development";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/simple/";
const coingeckoApi = `${COINGECKO_BASE_URL}/price?ids=ethereum,bitcoin,solana&vs_currencies=usd`;

// Mock data for development
const mockApiResponse = {
  bitcoin: { usd: 85103 },
  ethereum: { usd: 1615.97 },
  solana: { usd: 138.68 },
};

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

app.get("/tokens", async (req, res) => {
  let bitcoinText = "$69,420";
  let ethText = "$4,200";
  let solText = "$4,20";

  try {
    let data;
    if (isDevelopment) {
      console.log("Using mock data in development mode");
      data = mockApiResponse;
    } else {
      // Fetch current price of tokens
      const response = await axios.get(coingeckoApi);
      data = response.data;
      console.log("data:", data);
    }

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
        tailwindConfig: {
          theme: {
            extend: {
              fontFamily: {
                sans: ["sans-serif"],
              },
            },
          },
        },
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

app.get("/ai", async (req, res) => {
  try {
    // Create the image using Satori with JSX
    const imageResponse = new ImageResponse(<AiClockImage />, {
      width: 800,
      height: 480,
      tailwindConfig: {
        theme: {
          extend: {
            fontFamily: {
              sans: ["sans-serif"],
            },
          },
        },
      },
    });

    // Convert the image to a buffer and send it
    const buffer = await imageResponse.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send("Error creating image");
  }
});
