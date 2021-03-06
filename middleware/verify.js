const jwt = require('jsonwebtoken');
const key = require('../config/keys');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  // console.log('token: ',token)
  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, key.jwtSecret);

    req.user = decoded.user; // Now req.user will be acessed from anywhere

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};