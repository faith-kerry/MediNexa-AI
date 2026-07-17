const express = require("express");

const router = express.Router();

const {
  getHospitals,
} = require("../controllers/hospitalController");

// =========================================
// GET NEARBY HOSPITALS
// Example:
// /api/hospitals?lat=-1.286389&lng=36.817223
// =========================================
router.get("/", getHospitals);

module.exports = router;