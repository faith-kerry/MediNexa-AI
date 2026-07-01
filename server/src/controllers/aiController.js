const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are MediNexa AI.

Rules:
- Never diagnose diseases.
- Explain medical information simply.
- Suggest when the user should visit a doctor.
- Be friendly and supportive.
- Translate medical instructions if requested.
- Keep answers concise.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI service unavailable.",
    });
  }
};