const { createLogger, format, transports } = require('winston');

const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4};
const level = () => ((process.env.NODE_ENV || 'development') === 'development' ? 'debug' : 'info');

const logger = createLogger({
  level: level(),
  levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;