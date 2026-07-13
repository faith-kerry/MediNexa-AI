const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAppointments,
  getPrescriptions,
  getMedicalRecords,
  getLabResults,
} = require("../controllers/patientController");

// ==========================
// Dashboard
// ==========================
router.get("/dashboard", getDashboard);

// ==========================
// Appointments
// ==========================
router.get("/:patientId/appointments", getAppointments);

// ==========================
// Prescriptions
// ==========================
router.get("/:patientId/prescriptions", getPrescriptions);

// ==========================
// Medical Records
// ==========================
router.get("/:patientId/medical-records", getMedicalRecords);

// ==========================
// Lab Results
// ==========================
router.get("/:patientId/lab-results", getLabResults);

module.exports = router;