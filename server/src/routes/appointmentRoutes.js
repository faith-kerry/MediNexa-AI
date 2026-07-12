const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getAppointments);

router.post("/", protect, bookAppointment);

router.patch("/:id/cancel", protect, cancelAppointment);

module.exports = router;