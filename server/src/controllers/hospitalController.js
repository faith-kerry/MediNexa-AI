const prisma = require("../lib/prisma");

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        county: true,
        address: true,
        phone: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      total: hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.error("Get Hospitals Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hospitals.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};