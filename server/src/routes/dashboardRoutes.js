const express = require("express");

const router = express.Router();

const {
  getPatientDashboard,
} = require("../controllers/dashboardController");

router.get("/", getPatientDashboard);

module.exports = router;