const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MediNexa AI API 🚀",
  });
});

module.exports = app;