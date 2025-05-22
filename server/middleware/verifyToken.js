const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config();
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: false, message: 'Access token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ status: false, message: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
