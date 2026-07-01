const express = require("express");
const router = express.Router();

const {
  translateMedicalText,
} = require("../controllers/translatorController");

router.post("/", translateMedicalText);

module.exports = router;