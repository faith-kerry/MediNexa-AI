const { hashPassword } = require("../utils/hash");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await hashPassword(password);

    res.status(201).json({
      success: true,
      message: "Validation successful",
      data: {
        fullName,
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  res.json({
    success: true,
    message: "Login endpoint working",
  });
};

exports.forgotPassword = async (req, res) => {
  res.json({
    success: true,
    message: "Forgot password endpoint working",
  });
};

exports.resetPassword = async (req, res) => {
  res.json({
    success: true,
    message: "Reset password endpoint working",
  });
};