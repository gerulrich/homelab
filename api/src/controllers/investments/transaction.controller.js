const Transaction = require('@app/models/investments/transaction.model');

const createTransaction = async (req, res, next) => {
  try {
    const user = req.user.uid;
    const { date, asset, type, price, quantity, details } = req.body;
    const transaction = new Transaction({ date, user, asset, type, price, quantity, details });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ _id: id, user: req.user.uid })
      .populate('user', 'email')
      .populate('asset');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction ${id} not found' });
    }
    return res.json(transaction);
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const { limit = 25, offset = 0 } = req.query;
    const query = { user: req.user.uid };
    const [total, transactions] = await Promise.all([
      Transaction.countDocuments(query),
      Transaction.find(query)
        .populate('asset', 'name symbol type icon')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
    ]);
    res.json({
      items: transactions,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { uid, user, ...data } = req.body; // eslint-disable-line no-unused-vars
    const transaction = await Transaction.findOneAndUpdate({ _id: id, user: req.user.uid }, data, { new: true });
    return res.json(transaction);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deletedCount } = await Transaction.deleteOne({ _id: id, user: req.user.uid });
    if (deletedCount === 0) {
      return res.status(404).json({ msg: `Transaction ${id} not found` });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction
};