const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, getAllUsers, getUserById, updateUserById, deleteUser } = require('@app/controllers/auth/user.controller');
const validateJWT = require('../../middlewares/validate-jwt');
const requestValidator = require('../../middlewares/request-validator');
const { rolesAllowed } = require('../../middlewares/roles-allowed');

// Middleware for validating asset fields
const validateUserFields = [
  check('name').trim().notEmpty().withMessage('Name is required'),
  check('email').trim().isEmail().withMessage('Invalid email'),
  //check('role').trim().notEmpty().withMessage('Role is required'),
  //check('enabled').isBoolean().withMessage('Enabled must be a boolean'),
  //check('password').trim().isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),
];

// Middleware for validating asset ID
const validateUserId = check('id').isMongoId().withMessage('Invalid user ID');

const router = Router();

router.get('/', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  requestValidator
], getAllUsers);

router.get('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  validateUserId,
  requestValidator
], getUserById);

router.post('/', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  ...validateUserFields,
  requestValidator
], createUser);

router.put('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  validateUserId,
  ...validateUserFields,
  requestValidator
], updateUserById);

router.delete('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  validateUserId,
  requestValidator
], deleteUser);

module.exports = router;