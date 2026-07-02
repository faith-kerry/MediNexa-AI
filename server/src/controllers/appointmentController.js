exports.bookAppointment = async (req, res) => {
  try {
    const {
      patientName,
      doctor,
      specialty,
      date,
      time,
      reason,
    } = req.body;

    if (
      !patientName ||
      !doctor ||
      !specialty ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      appointment: {
        patientName,
        doctor,
        specialty,
        date,
        time,
        reason,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};