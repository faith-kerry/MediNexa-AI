const express = require("express");
const router = express.Router();

const {
  analyzeLab,
} = require("../controllers/labController");

router.post("/analyze", analyzeLab);

module.exports = router;