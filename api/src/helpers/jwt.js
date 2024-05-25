const jwt = require('jsonwebtoken');

const createJWT = (uid, roles = [], expiresIn = 86400) => {
  const payload = { uid, roles };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const decodeJWT = (token = '') => {
  const { uid, roles } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return {
    uid, roles
  };
};

module.exports = { createJWT, decodeJWT };