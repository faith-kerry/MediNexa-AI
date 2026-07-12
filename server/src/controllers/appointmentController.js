const prisma = require("../lib/prisma");

// =========================
// BOOK APPOINTMENT
// =========================
exports.bookAppointment = async (req, res) => {
  try {
    const { hospitalId, appointmentDate, reason } = req.body;

    if (!hospitalId || !appointmentDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: req.user.id,
        hospitalId,
        appointmentDate: new Date(appointmentDate),
        reason,
      },
      include: {
        hospital: true,
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment,
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
// GET MY APPOINTMENTS
// =========================
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: req.user.id,
      },
      include: {
        hospital: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });

    return res.status(200).json({
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

// =========================
// CANCEL APPOINTMENT
// =========================
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    if (appointment.patientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: "CANCELLED",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully.",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};