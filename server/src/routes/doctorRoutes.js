const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getTodayAppointments,
  getPatientDetails,
  savePrescription,
  saveDoctorNotes,
  generatePatientSummary,
} = require("../controllers/doctorController");

// Dashboard
router.get("/dashboard", getDashboardStats);

// Today's appointments
router.get("/appointments/today", getTodayAppointments);

// Patient details
router.get("/patient/:patientId", getPatientDetails);

// Save prescription
router.post(
  "/patient/:patientId/prescription",
  savePrescription
);

// Save doctor notes
router.post(
  "/patient/:patientId/notes",
  saveDoctorNotes
);

// AI patient summary
router.get(
  "/patient/:patientId/summary",
  generatePatientSummary
);

module.exports = router;