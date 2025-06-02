const jwt = require('jsonwebtoken');

const key = Buffer.from(process.env.JWT_SECRET_KEY, 'base64url');

const validateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'Authorization header is required' });
  }
  try {
    const { uid, roles, level } = jwt.verify(token.substring(7), key);
    req.user = { uid, roles, level };
    next();
  } catch (error) { // eslint-disable-line no-unused-vars
    return res.status(401).json({ msg: 'Authorization header is invalid or has been expired' });
  }
};

module.exports = validateJWT;