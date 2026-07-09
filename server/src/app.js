const express = require("express");
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

const app = express();

// =========================
// Middleware
// =========================

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/translator", translatorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctor", doctorRoutes);

app.use("/api/lab", labRoutes);

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