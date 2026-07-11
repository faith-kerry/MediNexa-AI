const prisma = require("../lib/prisma");

// Upload a medical record
exports.createMedicalRecord = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const record = await prisma.medicalRecord.create({
      data: {
        title,
        description,
        fileUrl: fileUrl || null,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Medical record created successfully.",
      record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get logged-in user's records
exports.getMedicalRecords = async (req, res) => {
  try {
    const records = await prisma.medicalRecord.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      records,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get one record
exports.getMedicalRecord = async (req, res) => {
  try {
    const record = await prisma.medicalRecord.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found.",
      });
    }

    return res.json({
      success: true,
      record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a record
exports.deleteMedicalRecord = async (req, res) => {
  try {
    await prisma.medicalRecord.delete({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      success: true,
      message: "Medical record deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};