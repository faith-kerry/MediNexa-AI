const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getTodayAppointments,
  getPatientDetails,
} = require("../controllers/doctorController");

// Dashboard
router.get("/dashboard", getDashboardStats);

// Today's appointments
router.get("/appointments/today", getTodayAppointments);

// Single patient details
router.get("/patient/:patientId", getPatientDetails);

module.exports = router;