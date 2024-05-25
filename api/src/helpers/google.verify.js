const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (token = '') => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    return { name, email, picture };
  } catch (error) { // eslint-disable-line no-unused-vars
    throw new Error('Error verifying Google token');
  }
};

module.exports = {
  googleVerify,
};