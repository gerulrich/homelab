const requestValidator = require('@app/middlewares/request-validator');
const validateJWT = require('@app/middlewares/validate-jwt');
const rolesAllowed = require('@app/middlewares/roles-allowed');

module.exports = {
  requestValidator,
  validateJWT,
  rolesAllowed
};