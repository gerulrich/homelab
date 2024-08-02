const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
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
    type: {
      type: String,
      enum: ['buy', 'sell', 'dividend', 'coupon', 'amortization', 'split'],
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      amount: {
        type: Number
      },
      currency: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    },
    details: {
      type: String
    }
  },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.uid = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.uid = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;