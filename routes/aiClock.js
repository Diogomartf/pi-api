const { ImageResponse } = require("@vercel/og");
const AiClockImage = require("../components/AiClockImage").default;
const React = require("react");

async function AiClock(req, res) {
  try {
    const imageResponse = new ImageResponse(<AiClockImage />, {
      width: 800,
      height: 480,
    });

    // Convert the image to a buffer and send it
    const buffer = await imageResponse.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(500).send("Error creating image");
  }
}

module.exports = AiClock;
