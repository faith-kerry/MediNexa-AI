const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getAppointments);
router.post("/", protect, bookAppointment);

module.exports = router;