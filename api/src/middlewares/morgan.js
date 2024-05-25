const logging = require('morgan');
const logger = require('@app/helpers/logger');

const stream = { write: (message) => logger.http(message) };
const skip = () => process.env.NODE_ENV === 'production';

logging.token('uid', (req, res) => {  
  return req.uid ? req.uid : '';
});

const morgan = logging(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms | User-Agent: :user-agent | Referer: :referrer | UID: :uid',
  { stream, skip }
);

module.exports = morgan;