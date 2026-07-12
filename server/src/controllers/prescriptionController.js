const prisma = require("../lib/prisma");

exports.createPrescription = async (req, res) => {
  try {
    const {
      userId,
      medicine,
      dosage,
      instructions,
    } = req.body;

    const prescription = await prisma.prescription.create({
      data: {
        userId,
        medicine,
        dosage,
        instructions,
      },
    });

    return res.json({
      success: true,
      prescription,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};