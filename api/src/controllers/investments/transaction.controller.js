const { validationResult } = require('express-validator');
const Transaction = require('../../models/investments/transaction.model');
const Holding = require('../../models/investments/holding.model');

exports.createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const transaction = new Transaction(req.body);
    await transaction.save();

    await updateHoldings(transaction);

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Actualizar una transacción
exports.updateTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Guardar la cantidad anterior antes de la actualización
    const oldQuantity = transaction.quantity;

    // Actualizar la transacción con los nuevos valores
    transaction.set(req.body);
    await transaction.save();

    // Calcular la diferencia entre la cantidad anterior y la nueva cantidad
    const quantityDifference = transaction.quantity - oldQuantity;

    // Actualizar las tenencias solo si la cantidad ha cambiado
    if (quantityDifference !== 0) {
      await updateHoldings(transaction, quantityDifference);
    }

    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Eliminar una transacción
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    // Actualizar las tenencias
    await updateHoldings(transaction, true);

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const updateHoldings = async (transaction, isDelete = false) => {
  const { user, asset, quantity, type } = transaction;
  const quantityChange = isDelete ? -quantity : (type === 'buy' ? quantity : -quantity);
  let holding = await Holding.findOne({ user, asset });
  if (!holding) {
    holding = new Holding({
      user,
      asset,
      quantity: 0
    });
  }

  holding.quantity += quantityChange;
  await holding.save();
};