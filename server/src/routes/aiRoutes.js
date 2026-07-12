const express = require("express");

const router = express.Router();

const {
  chat,
  explainLabResult,
} = require("../controllers/aiController");

router.post("/chat", chat);

// Generate AI explanation for a lab report
router.post("/explain-lab/:id", explainLabResult);

module.exports = router;