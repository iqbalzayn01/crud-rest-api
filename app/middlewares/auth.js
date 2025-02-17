const jwt = require('../utils');
const jwtSecret = require('../config');

const authMiddlewares = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid token',
    });
  }
};

module.exports = authMiddlewares;
