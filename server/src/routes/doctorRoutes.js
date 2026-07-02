const express = require("express");
const router = express.Router();

const {
  getDashboard,
} = require("../controllers/doctorController");

router.get("/dashboard", getDashboard);

module.exports = router;