const Groq = require("groq-sdk");
const prisma = require("../lib/prisma");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =====================================
// AI Chat
// =====================================

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
- Explain medical information in simple language.
- Encourage users to consult a qualified healthcare professional.
- Be friendly, reassuring and professional.
- Keep responses concise.
`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.json({
      success: true,
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI service unavailable.",
    });
  }
};

// =====================================
// Explain Lab Report
// =====================================

exports.explainLabResult = async (req, res) => {
  try {
    const { id } = req.params;

    const labResult = await prisma.labResult.findUnique({
      where: {
        id,
      },
    });

    if (!labResult) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found.",
      });
    }    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are MediNexa AI.

You explain laboratory reports in a way that ordinary patients can understand.

Rules:
- Never diagnose diseases.
- Never claim someone definitely has a condition.
- Explain what the test is generally used for.
- Explain what abnormal results could mean in simple language.
- Advise the patient to discuss results with their doctor.
- End every explanation with a short disclaimer that AI is not a substitute for professional medical advice.
- Use a calm, reassuring and professional tone.
`,
        },

        {
          role: "user",
          content: `Please explain this laboratory report: ${labResult.title}`,
        },
      ],
    });

    const explanation =
      completion.choices[0].message.content;

    const updatedLab = await prisma.labResult.update({
      where: {
        id,
      },
      data: {
        aiExplanation: explanation,
      },
    });

    return res.json({
      success: true,
      message: "AI explanation generated successfully.",
      labResult: updatedLab,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate AI explanation.",
    });
  }
};