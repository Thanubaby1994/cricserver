// middleware/authMiddleware.js
const admin = require("../firebaseAdmin");

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // can access user info in route
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyFirebaseToken;
