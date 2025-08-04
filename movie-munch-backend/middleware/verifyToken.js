import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "Not Authenticated" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ msg: "Token invalid" });

    req.userId = payload.id;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userId.toString() === req.params.id.toString()) {
      next();
    } else {
      return res.status(403).json({ msg: "Not Authorized" });
    }
  });
};
