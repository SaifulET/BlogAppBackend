import jwt from "jsonwebtoken"








export const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get token from Authorization header

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    req.user = decoded; // Store decoded user data in request
    next(); // Move to next middleware
  });
};
