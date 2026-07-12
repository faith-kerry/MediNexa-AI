const express = require("express");

const router = express.Router();

const {
  uploadLabResult,
  getLabResults,
  deleteLabResult,
} = require("../controllers/labController");

// Temporary (NO AUTH)

router.get("/", getLabResults);

router.post("/", uploadLabResult);

router.delete("/:id", deleteLabResult);

module.exports = router;