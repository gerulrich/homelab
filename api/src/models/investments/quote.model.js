const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    set: (date) => new Date(date.setHours(0, 0, 0, 0))
  },
  source: {
    type: String,
    default: 'unknown'
  }
});

const Quote = mongoose.model('Quote', QuoteSchema);
module.exports = Quote;