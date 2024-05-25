const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { createAsset, getAllAssets, getAssetById, updateAssetById, deleteAssetById } = require('../../controllers/investments/asset.controller');
const validateJWT = require('../../middlewares/validate-jwt');
const requestValidator = require('../../middlewares/request-validator');
const { rolesAllowed } = require('../../middlewares/roles-allowed');

// Middleware for validating asset fields
const validateAssetFields = [
  check('name').trim().notEmpty().withMessage('Name is required'),
  check('symbol').trim().notEmpty().withMessage('Symbol is required'),
  check('type').trim().notEmpty().withMessage('Type is required'),
  check('market').trim().notEmpty().withMessage('Market is required')
];

// Middleware for validating asset ID
const validateAssetId = check('id').isMongoId().withMessage('Invalid asset ID');

// create a new asset
router.post('/', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  ...validateAssetFields,
  requestValidator
], createAsset);

// get all assets
router.get('/', [ validateJWT, requestValidator ], getAllAssets);

// get an asset by its ID
router.get('/:id', [
  validateJWT,
  validateAssetId,
  requestValidator
], getAssetById);

// update an asset by its ID
router.put('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  validateAssetId,
  ...validateAssetFields,
  requestValidator
], updateAssetById);

// delete an asset by its ID
router.delete('/:id', [
  validateJWT,
  rolesAllowed('ADMIN_ROLE'),
  validateAssetId,
  requestValidator
], deleteAssetById);

module.exports = router;