import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = (req, res, next) => {
  // Try multiple ways to get the token
  const token =
    req.cookies.token ||
    (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')
      ? req.headers['authorization'].split(' ')[1]
      : null);

  console.log('Token received:', token); // Debug: Log the token

  if (!token) {
    return res.status(401).json({ msg: 'Not authenticated: No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Token payload:', payload); // Debug: Log the payload
    req.userId = payload.id;
    next();
  } catch (error) {
    console.error('JWT Verify Error:', error.name, error.message);
    return res.status(403).json({ msg: `Token invalid: ${error.message}` });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.params.id) {
      return res.status(400).json({ msg: 'User ID parameter missing' });
    }
    if (req.userId.toString() === req.params.id.toString()) {
      next();
    } else {
      return res.status(403).json({ msg: 'Not authorized: User ID mismatch' });
    }
  });
};