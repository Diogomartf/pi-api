import axios from "axios";
import { ImageResponse } from "@vercel/og";
import path from "path";
import fs from "fs";
import StocksImage from "../components/StocksImage";

const stocksPanoramaUserId = "user_2fTCuCsOA7Spl6k37aeUMCGzAJy";
const STOCKS_PANORAMA_API_URL = `https://stockspanorama.com/api/users/${stocksPanoramaUserId}/stocks/gainers-and-losers`;

const formatPrice = (price) => {
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedPrice;
};

export async function handleStocksRoute() {
  try {
    let data;
    if (process.env.NODE_ENV === "development") {
      console.log("Using mock data in development mode");
      data = mockApiResponse;
    } else {
      const response = await axios.get(STOCKS_PANORAMA_API_URL);
      data = response.data;
    }

    const stockGainers = data.data.gainers;

    const imageResponse = new ImageResponse(
      <StocksImage stocks={stockGainers} />,
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

const mockApiResponse = {
  data: {
    gainers: [
      {
        id: 9292,
        ticker: "TTD",
        name: "The Trade Desk, Inc.",
        price: {
          o: 43.87,
          h: 44.575,
          l: 43.1,
          c: 44.47,
          v: 52977809,
          vw: 44.2492,
          todaysChangePerc: 1.2966082403824293,
        },
      },
      {
        id: 7387,
        ticker: "PEP",
        name: "PepsiCo, Inc.",
        price: {
          o: 141.46,
          h: 142.08,
          l: 140.46,
          c: 141.76,
          v: 12365088,
          vw: 141.5702,
          todaysChangePerc: 0.9024372912669724,
        },
      },
      {
        id: 2168,
        ticker: "COKE",
        name: "Coca-Cola Consolidated, Inc.",
        price: {
          o: 111.92,
          h: 113.5,
          l: 110.6,
          c: 113.22,
          v: 2553518,
          vw: 112.8919,
          todaysChangePerc: 0.750603163256191,
        },
      },
    ],
    losers: [
      {
        id: 103,
        ticker: "ACI",
        price: {
          o: 18.28,
          h: 18.32,
          l: 17.81,
          c: 17.9,
          v: 10053101,
          vw: 17.9162,
          todaysChangePerc: -1.1456628477904927,
        },
      },
      {
        id: 2073,
        ticker: "CMG",
        name: "Chipotle Mexican Grill, Inc.",
        price: {
          o: 40.03,
          h: 40.035,
          l: 38.98,
          c: 39.32,
          v: 36439845,
          vw: 39.3049,
          todaysChangePerc: -1.1052499372017202,
        },
      },
      {
        id: 5648,
        ticker: "K",
        name: "Kellanova Inc.",
        price: {
          o: 78.22,
          h: 78.22,
          l: 77.2,
          c: 77.38,
          v: 6204945,
          vw: 77.5498,
          todaysChangePerc: -1.048593350383641,
        },
      },
    ],
  },
};
