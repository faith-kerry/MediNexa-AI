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
// Get Single Patient Details
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

        labResults: {
          orderBy: {
            uploadedAt: "desc",
          },
        },

         records: {
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