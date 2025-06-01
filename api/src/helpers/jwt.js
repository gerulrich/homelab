const jwt = require('jsonwebtoken');

const key = Buffer.from(process.env.JWT_SECRET_KEY, 'base64url');

const createJWT = (uid, roles = [], level = 1, expiresIn = 86400) => {
  const payload = { uid, roles, level, sub: uid, groups: roles, version: process.env.JWT_VERSION, kid: process.env.JWT_KID };
  return jwt.sign(payload, key, { expiresIn });
};

const decodeJWT = (token = '') => {
  const { uid, roles, level } = jwt.verify(token, key);
  return {
    uid, roles, level
  };
};

module.exports = { createJWT, decodeJWT };