exports.getDashboard = async (req, res) => {
  res.json({
    success: true,
    doctor: {
      name: "Dr. Mercy Wanjiku",
      specialization: "General Medicine",
      todayAppointments: 12,
      totalPatients: 148,
      pendingReports: 5,
      completedAppointments: 96,
    },
  });
};