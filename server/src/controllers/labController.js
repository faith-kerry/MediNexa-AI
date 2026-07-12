const prisma = require("../lib/prisma");

// =========================
// Upload Lab Result
// =========================
exports.uploadLabResult = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Report title is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file.",
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const labResult = await prisma.labResult.create({
      data: {
        title,
        fileUrl,
        userId: "cmrd78yjo0000tk1lbndzqpnd", // temporary until auth is connected
      },
    });

    return res.status(201).json({
      success: true,
      message: "Lab result uploaded successfully.",
      labResult,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Lab Results
// =========================
exports.getLabResults = async (req, res) => {
  try {
    const labResults = await prisma.labResult.findMany({
      where: {
        userId: "cmrd78yjo0000tk1lbndzqpnd", // temporary until auth is connected
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    return res.json({
      success: true,
      labResults,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Lab Result
// =========================
exports.deleteLabResult = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.labResult.delete({
      where: {
        id,
      },
    });

    return res.json({
      success: true,
      message: "Lab result deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};