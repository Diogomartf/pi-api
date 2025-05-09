import { ImageResponse } from "@vercel/og";
import AiClockImage from "../components/AiClockImage";
import { Groq } from "groq-sdk";

// System prompt for AI Clock
const systemPrompt = `
You are a time-based rhyme generator. When given the current time in 24-hour format (HH:MM), create a brief, creative rhyme that incorporates that time.

The rhyme should:
1. Be 2 lines long
2. Include the time in some form (can be written as numbers or words)
3. Have a clear rhyming scheme
4. Fit one of these three styles (randomly choose):
   - Original: Simple, everyday imagery and straightforward language
   - Current: Modern references with a calm, balanced tone
   - Experimental: Unusual word combinations and unexpected imagery

Return ONLY a JSON object in this exact format with no additional text:
{
  "data": "Your two-line rhyme here"
}

For example, if given "14:56", you might return:
{
  "data": "The sky now a warm mix, It's nearly two fifty-six."
}

or for "14:53":
{
  "data": "Love's warmth shines like sun's beam, It's now two fifty-three, a dream."
}

Make sure your response contains ONLY the JSON object and nothing else.
`;

export async function handleAiClockRoute() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const lisbonTime = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Lisbon",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: lisbonTime,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: {
        type: "json_object",
      },
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0]?.message?.content);
    const aiTime = aiResponse.data;

    const imageResponse = new ImageResponse(<AiClockImage aiTime={aiTime} />, {
      width: 800,
      height: 480,
    });

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
