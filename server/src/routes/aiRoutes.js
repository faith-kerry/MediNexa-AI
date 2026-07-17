const express = require("express");

const router = express.Router();

const {
  chat,
  explainLabResult,
  explainMedication,
} = require("../controllers/aiController");


router.post("/chat", chat);

// Generate AI explanation for a lab report
router.post("/explain-lab/:id", explainLabResult);

// Generate AI explanation for a medication
router.post("/explain-medication", explainMedication);

module.exports = router;