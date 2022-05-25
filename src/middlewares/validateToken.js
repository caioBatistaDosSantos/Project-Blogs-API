const jwt = require('jsonwebtoken');
const { HTTP_UNAUTHORIZED_STATUS } = require('../utils/status-HTTP');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken; 