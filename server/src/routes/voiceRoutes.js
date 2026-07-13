const express = require("express");

const {
  textToSpeech,
} = require("../controllers/voiceController");

const router = express.Router();

// ==========================
// Text To Speech
// ==========================
router.post("/speak", textToSpeech);

module.exports = router;