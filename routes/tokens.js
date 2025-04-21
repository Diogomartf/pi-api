import axios from "axios";
import { ImageResponse } from "@vercel/og";
import path from "path";
import fs from "fs";
import TokensImage from "../components/TokensImage";

// Constants
const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/simple/";
const COINGECKO_API_URL = `${COINGECKO_BASE_URL}/price?ids=ethereum,bitcoin,solana&vs_currencies=usd`;

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

export async function handleTokensRoute() {
  let bitcoinText = "$69,420";
  let ethText = "$4,200";
  let solText = "$4,20";

  try {
    let data;
    if (process.env.NODE_ENV === "development") {
      console.log("Using mock data in development mode");
      data = mockApiResponse;
    } else {
      const response = await axios.get(COINGECKO_API_URL); // Fetch current price of tokens
      data = response.data;
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
          .readFileSync(path.join(process.cwd(), "public/images/bitcoin.png"))
          .toString("base64"),
      eth:
        "data:image/png;base64," +
        fs
          .readFileSync(path.join(process.cwd(), "public/images/eth.png"))
          .toString("base64"),
      sol:
        "data:image/png;base64," +
        fs
          .readFileSync(path.join(process.cwd(), "public/images/sol.png"))
          .toString("base64"),
    };

    const imageResponse = new ImageResponse(
      (
        <TokensImage
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
    return new Response(buffer, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("Error creating image:", error);
    return new Response("Error creating image", { status: 500 });
  }
}
