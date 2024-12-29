const express = require('express');
const router = express.Router();
const validateJWT = require('@app/middlewares/validate-jwt');
const requestValidator = require('@app/middlewares/request-validator');
const { body, param } = require('express-validator');

const {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById
} = require('@app/controllers/investments/transaction.controller');

// Middleware for validating transaction fields
const validateTransactionFields = [
  body('asset').isMongoId().withMessage('El campo asset es requerido.'),
  body('type').isIn(['buy', 'sell', 'dividend', 'coupon', 'amortization', 'split', 'swap', 'rescue']).withMessage('Tipo de transacción inválido.'),
  body('quantity').isNumeric().withMessage('La cantidad debe ser un número.'),
  body('price.amount').notEmpty().isNumeric().withMessage('El monto debe ser un número.'),
  body('price.currency').notEmpty().isString().withMessage('La moneda debe ser una cadena.'),
  body('date').notEmpty().isISO8601().withMessage('La fecha debe estar en formato ISO8601.'),
];

// Middleware for validating asset ID
const validateTransactionId = param('id').isMongoId().withMessage('Invalid transaction ID');

router.post('/', [
  validateJWT,
  ...validateTransactionFields,
  requestValidator
], createTransaction);

router.get('/', [
  validateJWT,
  requestValidator
], getAllTransactions);

router.get('/:id', [
  validateJWT,
  validateTransactionId,
  requestValidator
], getTransactionById);

router.put('/:id', [
  validateJWT,
  validateTransactionId,
  ...validateTransactionFields,
  requestValidator
], updateTransaction);

router.delete('/:id', [
  validateJWT,
  validateTransactionId,
  requestValidator
], deleteTransaction);

module.exports = router;