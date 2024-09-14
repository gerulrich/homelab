const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const validateJWT = require('@app/middlewares/validate-jwt');
const requestValidator = require('@app/middlewares/request-validator');
const { rolesAllowed } = require('@app/middlewares/roles-allowed');
const { getNotifications, updateNotifications } = require('@app/controllers/notification.controller');

router.get('/', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  check('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
  check('offset').optional().isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
  requestValidator
], getNotifications);

router.post('/mark-as-read', [
  validateJWT,
  rolesAllowed('USER_ROLE', 'ADMIN_ROLE'),
  check('notificationIds').isArray().withMessage('notificationIds must be an array'),
  check('notificationIds.*').isMongoId().withMessage('Each notificationId must be a valid Mongo ID'),
  requestValidator
], updateNotifications);

module.exports = router;