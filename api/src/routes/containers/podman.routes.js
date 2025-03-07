
const express = require('express');
const router = express.Router();
const validateJWT = require('@app/middlewares/validate-jwt');
const requestValidator = require('@app/middlewares/request-validator');
const { rolesAllowed } = require('@app/middlewares/roles-allowed');
const { getContainers, startContainer, stopContainer, restartContainer } = require('../../controllers/containers/podman.controller');

router.get('/', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  requestValidator
], getContainers);


router.post('/:id/start', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], startContainer);

router.post('/:id/stop', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], stopContainer);

router.post('/:id/restart', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], restartContainer);

module.exports = router;