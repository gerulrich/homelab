const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Holding = mongoose.model('Holding', HoldingSchema);

module.exports = Holding;