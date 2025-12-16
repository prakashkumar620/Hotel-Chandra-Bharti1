const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.adminId) return res.status(403).json({ message: "Forbidden" });
    req.admin = decoded.adminId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = adminAuth;
