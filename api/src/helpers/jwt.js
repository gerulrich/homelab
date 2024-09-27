const jwt = require('jsonwebtoken');

const createJWT = (uid, roles = [], level = 1, expiresIn = 86400) => {
  const payload = { uid, roles, level };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

const decodeJWT = (token = '') => {
  const { uid, roles, level } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return {
    uid, roles, level
  };
};

module.exports = { createJWT, decodeJWT };