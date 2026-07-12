const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const {
  uploadLabResult,
  getLabResults,
  deleteLabResult,
} = require("../controllers/labController");

// ============================
// Multer Configuration
// ============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

// ============================
// Routes
// ============================

router.get("/", getLabResults);

router.post(
  "/",
  upload.single("file"),
  uploadLabResult
);

router.delete("/:id", deleteLabResult);

module.exports = router;