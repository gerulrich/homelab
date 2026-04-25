const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['cedear', 'bono', 'on', 'foreign'],
    required: true
  },
  market: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  description: {
    type: String
  },  
  price: {
    value: {
      type: Number
    },
    currency: {
      type: String
    }
  },
  ratio: {
    type: Number
  },
  maturity_date: {
    type: Date
  }
}, 
{
    toObject: {
      transform: function (doc, ret) {
        ret.uid = ret._id;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.uid = ret._id;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
      }
    },
    timestamps: true
  });


const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;