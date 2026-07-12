const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const translatorRoutes = require("./routes/translatorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const labRoutes = require("./routes/labRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const app = express();
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");


// =========================
// Middleware
// =========================

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/translator", translatorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctor", doctorRoutes);

app.use("/api/lab", labRoutes);

app.use("/api/hospitals", hospitalRoutes);

app.use("/api/medical-records", medicalRecordRoutes);

// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MediNexa AI API 🚀",
  });
});

// =========================
// 404 Handler
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;