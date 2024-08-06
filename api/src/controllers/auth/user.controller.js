const bcryptjs = require('bcryptjs');
const User = require('@app/models/user');

const createUser = async (req, res, next) => {
  const { password = 'P:)', ...userData } = req.body;
  try {
    const user = new User({ ...userData });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { _id, password, ...data } = req.body; // eslint-disable-line no-unused-vars
  const user = await User.findOneAndUpdate({ _id: id }, data, { new: true });
  return res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { enabled: false });
  if (!user) {
    return res.code(404).json({ msg: 'User not found' });
  }
  res.json(user);
};

const getAllUsers = async (req, res) => {
  const { limit = 25, offset = 0, q = '' } = req.query;
  const query = q ? { name: { $regex: q, $options: 'i' } } : {};
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).sort({ name: 1 }).limit(parseInt(limit)).skip(parseInt(offset))
  ]);
  res.json({
    items: users,
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    }
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser
};
