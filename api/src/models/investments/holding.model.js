const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symbol: {
      type: String,
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
    },
    invested: {
      amount: {
        type: Number
      },
      currency: {
        type: String
      }
    },
    dividends: {
      amount: {
        type: Number
      },
      currency: {
        type: String
      }
    },
    coupons: {
      amount: {
        type: Number
      },
      currency: {
        type: String
      }
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

const Holding = mongoose.model('Holding', HoldingSchema);

module.exports = Holding;