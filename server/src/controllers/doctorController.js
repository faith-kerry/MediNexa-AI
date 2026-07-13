const prisma = require("../lib/prisma");

// ==========================
// Dashboard Statistics
// ==========================
exports.getDashboardStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const totalPatients = await prisma.user.count({
      where: {
        role: "PATIENT",
      },
    });

    const todayAppointments = await prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const completedToday = await prisma.appointment.count({
      where: {
        status: "COMPLETED",
        appointmentDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const totalLabReports = await prisma.labResult.count();

    return res.json({
      success: true,
      stats: {
        totalPatients,
        todayAppointments,
        totalLabReports,
        completedToday,
      },
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
// Today's Appointments
// ==========================
exports.getTodayAppointments = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      include: {
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        hospital: true,
      },
      orderBy: {
        appointmentDate: "asc",
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
// Get Patient Details
// ==========================
exports.getPatientDetails = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await prisma.user.findUnique({
      where: {
        id: patientId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,

        appointments: {
          include: {
            hospital: true,
          },
          orderBy: {
            appointmentDate: "desc",
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

        prescriptions: {
          orderBy: {
            createdAt: "desc",
          },
        },

        doctorNotes: {
          orderBy: {
            createdAt: "desc",
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
// Save Prescription
// ==========================
exports.savePrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medicine, dosage, instructions } = req.body;

    if (!medicine || !dosage || !instructions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const prescription = await prisma.prescription.create({
      data: {
        medicine,
        dosage,
        instructions,
        userId: patientId,
      },
    });

    return res.status(201).json({
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

// ==========================
// Save Doctor Notes
// ==========================
exports.saveDoctorNotes = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { notes } = req.body;

    if (!notes || notes.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Doctor notes are required.",
      });
    }

    const doctorNote = await prisma.doctorNote.create({
      data: {
        notes,
        userId: patientId,
      },
    });

    return res.status(201).json({
      success: true,
      doctorNote,
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
// AI Patient Summary
// ==========================
exports.generatePatientSummary = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await prisma.user.findUnique({
      where: {
        id: patientId,
      },
      include: {
        appointments: true,
        prescriptions: true,
        labResults: true,
        doctorNotes: true,
        records: true,
      },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    const summary = `
Patient: ${patient.fullName}

Appointments: ${patient.appointments.length}

Medical Records: ${patient.records.length}

Lab Results: ${patient.labResults.length}

Prescriptions: ${patient.prescriptions.length}

Doctor Notes: ${patient.doctorNotes.length}

Latest Doctor Note:
${patient.doctorNotes.length ? patient.doctorNotes[0].notes : "None"}

This patient should be reviewed together with their uploaded medical records, prescriptions and laboratory results before diagnosis.
`;

    return res.json({
      success: true,
      summary,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};