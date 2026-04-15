const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const prompt = `
Convert this user query into JSON format.

Rules:
- operation: top | total | average
- column: product
- metric: sales
- limit: number if mentioned

Only return valid JSON.

Query: "${query}"
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("AI RAW:", rawText);

    let parsed = null;

    try {
      const match = rawText.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    } catch (e) {
      console.log("Parse Error:", e);
    }

    res.json({ aiResponse: parsed });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "AI failed",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;