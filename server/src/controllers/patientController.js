const prisma = require("../lib/prisma");

// ==========================
// Patient Dashboard
// ==========================
exports.getDashboard = async (req, res) => {
  try {
    // Replace this later with authenticated user id
    const patientId = req.query.patientId;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required.",
      });
    }

    const patient = await prisma.user.findUnique({
      where: {
        id: patientId,
      },
      include: {
        appointments: {
          include: {
            hospital: true,
          },
          orderBy: {
            appointmentDate: "asc",
          },
        },

        prescriptions: {
          orderBy: {
            createdAt: "desc",
          },
        },

        records: {
          orderBy: {
            createdAt: "desc",
          },
        },

        labResults: {
          orderBy: {
            uploadedAt: "desc",
          },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    return res.json({
      success: true,
      patient,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Patient Appointments
// ==========================
exports.getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await prisma.appointment.findMany({
      where: {
        patientId,
      },
      include: {
        hospital: true,
      },
      orderBy: {
        appointmentDate: "desc",
      },
    });

    return res.json({
      success: true,
      appointments,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Patient Prescriptions
// ==========================
exports.getPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await prisma.prescription.findMany({
      where: {
        userId: patientId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      prescriptions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Patient Medical Records
// ==========================
exports.getMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await prisma.medicalRecord.findMany({
      where: {
        userId: patientId,
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

// ==========================
// Patient Lab Results
// ==========================
exports.getLabResults = async (req, res) => {
  try {
    const { patientId } = req.params;

    const labResults = await prisma.labResult.findMany({
      where: {
        userId: patientId,
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