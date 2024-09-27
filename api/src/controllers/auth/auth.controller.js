const bcryptjs = require('bcryptjs');
const { createJWT, decodeJWT } = require('@app/helpers/jwt');
const logger = require('@app/helpers/logger');
const { googleVerify } = require('@app/helpers/google.verify');
const User = require('@app/models/user');
const JWT_EXPIRES_SECONDS = parseInt(process.env.JWT_EXPIRES_SECONDS);

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.enabled || !bcryptjs.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Email or password is incorrect'
      });
    }
    const level = user.plan === 'basic' ? 1 : user.plan === 'pro' ? 2 : 3;
    const access_token = await createJWT(user.id, user.roles, level, JWT_EXPIRES_SECONDS);

    return res.json({
      user,
      token_type: 'Bearer',
      access_token,
      expires_in: JWT_EXPIRES_SECONDS
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const renewToken = async (req, res) => {
  const { access_token } = req.body;
  try {
    const { uid } = decodeJWT(access_token);
    const user = await User.findById(uid);
    if (!user || !user.enabled) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = await createJWT(user.id, user.roles, JWT_EXPIRES_SECONDS);
    return res.json({
      user,
      token_type: 'Bearer',
      access_token: token,
      expiresIn: JWT_EXPIRES_SECONDS,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const googleSignIn = async (req, res) => {
  const { token: googleToken } = req.body;
  try {
    const { email } = await googleVerify(googleToken);

    const user = await User.findOne({ email });
    if (!user || !user.enabled) {
      return res.status(401).json({ message: 'User is blocked' });
    }

    const level = user.plan === 'basic' ? 1 : user.plan === 'pro' ? 2 : 3;
    const access_token = await createJWT(user.id, user.roles, level, JWT_EXPIRES_SECONDS);

    res.json({
      user,
      token_type: 'Bearer',
      access_token,
      expiresIn: JWT_EXPIRES_SECONDS,
    });
  } catch (error) { // eslint-disable-line no-unused-vars
    return res.status(401).json({ message: 'Authorization header is invalid or has been expired' });
  }
};

module.exports = {
  login,
  renewToken,
  googleSignIn
};