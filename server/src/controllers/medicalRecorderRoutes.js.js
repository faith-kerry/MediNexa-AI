

const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

// Get all records for logged-in user
router.get("/", protect, getMedicalRecords);

// Get a single record
router.get("/:id", protect, getMedicalRecord);

// Create a record
router.post("/", protect, createMedicalRecord);

// Delete a record
router.delete("/:id", protect, deleteMedicalRecord);

module.exports = router;