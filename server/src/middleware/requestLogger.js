const logger = require('../utils/logger');

export const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
