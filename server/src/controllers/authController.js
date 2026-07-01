const { hashPassword } = require("../utils/hash");
const generateToken = require("../utils/jwt");

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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Temporary user until Prisma is connected
    const user = {
      id: "123456",
      fullName: "Faith Kerubo",
      email: "faith@example.com",
      role: "PATIENT",
    };

    if (
      email !== "faith@example.com" ||
      password !== "Password123"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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