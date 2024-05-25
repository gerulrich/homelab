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
  maturityDate: {
    type: Date
  }
}, { timestamps: true });

AssetSchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const {__v, _id, ...asset} = this.toObject();
  asset.uid = _id;
  return asset;
};

const Asset = mongoose.model('Asset', AssetSchema);

module.exports = Asset;