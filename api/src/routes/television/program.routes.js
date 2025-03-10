const express = require('express');
const router = express.Router();
const validateJWT = require('../../middlewares/validate-jwt');
const requestValidator = require('../../middlewares/request-validator');
const { rolesAllowed } = require('../../middlewares/roles-allowed');
const { getPrograms, getProgramById } = require('@app/controllers/television/program.controller');

router.get('/', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  requestValidator
], getPrograms);

router.get('/:id', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  requestValidator
], getProgramById);

module.exports = router;