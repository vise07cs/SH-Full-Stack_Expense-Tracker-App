const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecretkey"; // use process.env.JWT_SECRET in production

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // decoded contains { userId }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
