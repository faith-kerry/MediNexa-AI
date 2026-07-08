exports.analyzeLab = async (req, res) => {
  try {
    const { reportText } = req.body;

    if (!reportText) {
      return res.status(400).json({
        success: false,
        message: "Report text is required.",
      });
    }

    return res.json({
      success: true,
      analysis: `
Summary:
Your lab report appears generally normal.

Possible Findings:
• Blood sugar is within the normal range.
• Hemoglobin level looks healthy.
• Cholesterol is slightly elevated.

Recommendations:
• Continue a balanced diet.
• Exercise regularly.
• Schedule a follow-up with your doctor if symptoms persist.

Disclaimer:
This explanation is AI-generated and should not replace professional medical advice.
      `,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};