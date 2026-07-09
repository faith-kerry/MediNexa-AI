const prisma = require("../lib/prisma");

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.json({
      success: true,
      hospitals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};