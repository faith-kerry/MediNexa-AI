const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized - No header",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;