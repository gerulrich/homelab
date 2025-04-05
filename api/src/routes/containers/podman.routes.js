
const express = require('express');
const router = express.Router();
const validateJWT = require('@app/middlewares/validate-jwt');
const requestValidator = require('@app/middlewares/request-validator');
const { rolesAllowed } = require('@app/middlewares/roles-allowed');
const { getContainers, startContainer, stopContainer, restartContainer, pauseContainer, unpauseContainer, removeContainer } = require('../../controllers/containers/podman.controller');

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


router.post('/:id/pause', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], pauseContainer);

router.post('/:id/unpause', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], unpauseContainer);

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

router.delete('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], removeContainer);

module.exports = router;