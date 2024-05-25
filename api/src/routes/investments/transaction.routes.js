const express = require('express');
const router = express.Router();
const { createTransaction, updateTransaction, deleteTransaction } = require('../../controllers/investments/transaction.controller');

router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;