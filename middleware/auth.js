const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');
  //if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorization denied' });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecretKey'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
