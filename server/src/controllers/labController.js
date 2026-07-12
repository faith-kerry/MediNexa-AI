const prisma = require("../lib/prisma");

// Upload Lab Result
exports.uploadLabResult = async (req, res) => {
  try {
    const { title, fileUrl } = req.body;

    if (!title || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and file URL are required.",
      });
    }

    const labResult = await prisma.labResult.create({
      data: {
        title,
        fileUrl,
        userId: "cmrd78yjo0000tk1lbndzqpnd"
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

// Get Logged-in User Lab Results
exports.getLabResults = async (req, res) => {
  try {
    const labResults = await prisma.labResult.findMany({
      where: {
        userId: "cmrd78yjo0000tk1lbndzqpnd"
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

// Delete Lab Result
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