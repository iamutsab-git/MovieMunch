import jwt from "jsonwebtoken";

// Middleware to verify JWT token from cookies
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Not Authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ msg: "Token is invalid or expired" });
    }

    req.userId = payload.id; // attach user ID to request
    next();
  });
};

// Middleware to ensure user is accessing their own data
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId === req.params.id) {
      next();
    } else {
      return res.status(403).json({ msg: "Not Authorized" });
    }
  });
};
