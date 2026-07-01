const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.translateMedicalText = async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        success: false,
        message: "Text and language are required.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are MediNexa AI.

Your task is to translate medical instructions into the requested language.

Rules:
- Use simple words.
- Preserve the original meaning.
- Do not diagnose diseases.
- If medical terms are difficult, explain them simply.
          `,
        },
        {
          role: "user",
          content: `Translate this into ${language}:

${text}`,
        },
      ],
    });

    res.json({
      success: true,
      translation: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Translation service unavailable.",
    });
  }
};