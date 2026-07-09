const prisma = require("../lib/prisma");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await prisma.user.count({
      where: {
        role: "PATIENT",
      },
    });

    const todayAppointments = await prisma.appointment.count({
      where: {
        appointmentDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    const completedToday = await prisma.appointment.count({
      where: {
        status: "COMPLETED",
        appointmentDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};