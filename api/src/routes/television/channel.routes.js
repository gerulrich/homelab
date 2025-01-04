const express = require('express');
const router = express.Router();
const validateJWT = require('../../middlewares/validate-jwt');
const requestValidator = require('../../middlewares/request-validator');
const { rolesAllowed } = require('../../middlewares/roles-allowed');
const { getChannelById, getChannels, createChannel, updateChannel, deleteChannel, getChannelsByPlan } = require('@app/controllers/television/channels.controller');

router.get('/plan', [
  validateJWT,
  //check('id', 'An invalid channel id was supplied').isMongoId(),
  requestValidator
], getChannelsByPlan);


router.get('/:id', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  //check('id', 'An invalid channel id was supplied').isMongoId(),
  requestValidator
], getChannelById);


router.get('/', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  requestValidator
], getChannels);


router.post('/', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], createChannel);


router.put('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  //check('id', 'An invalid channel id was supplied').isMongoId(),
  requestValidator
], updateChannel);

router.delete('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], deleteChannel);


module.exports = router;