const prisma = require("../lib/prisma");

exports.getPatientDashboard = async (req, res) => {
  try {
    const totalAppointments = await prisma.appointment.count();

    const totalPrescriptions = await prisma.prescription.count();

    const totalLabResults = await prisma.labResult.count();

    const latestAppointment = await prisma.appointment.findFirst({
      orderBy: {
        appointmentDate: "asc",
      },
      include: {
        hospital: true,
      },
    });

    res.json({
      success: true,
      stats: {
        healthScore: 92,
        appointments: totalAppointments,
        prescriptions: totalPrescriptions,
        labResults: totalLabResults,
        nextAppointment: latestAppointment,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};