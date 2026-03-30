import axios from "axios";

// ==============================
// AI FUNCTION (Ask AI)
// ==============================
export const askAi = async (messages) => {
  try {
    // ❗ Check: messages array empty to nahi
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    // ==============================
    // API CALL TO OPENROUTER
    // ==============================
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // 🤖 AI model
        model: "openai/gpt-4o-mini",

        // 💬 user + system messages
        messages: messages,
      },
      {
        headers: {
          // 🔐 API key (env file se aa rahi hai)
          // samjo hmaray pass ticket hy kay hm us ai ko  use kar saktay ahen like that
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );

    // ==============================
    // RESPONSE SE DATA NIKALNA
    // ==============================
    const content = response?.data?.choices?.[0]?.message?.content;

    // ❗ Check: AI ne empty response diya to error
    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    // ✅ Final AI response return
    return content;
  } catch (error) {
    // ❌ Error handling
    console.error("OpenRouter Error:", error.response?.data || error.message);

    throw new Error("OpenRouter API Error");
  }
};
