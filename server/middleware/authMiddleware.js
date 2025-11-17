// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user data (id, email, etc.)

    next();
  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
