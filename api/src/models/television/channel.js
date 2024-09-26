const { Schema, model } = require('mongoose');

const ChannelSchema = Schema({
  name: {
    type: String,
    required: [true, '\'name\' is a required field.']
  },
  logo: String,
  category: String,
  number: Number,  
  media_url: {
    type: String,
    required: [true, '\'media_url\' is a required field.']
  },
  plan: {
    type: String,
    enum: ['basic', 'pro', 'max'],
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  epg_id: String,
  drm: {
    type: { type: String },
    key_id: String,
    key: String,
    license_url: String,
  },
  enabled: {
    type: Boolean,
    default: true
  },
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
});

module.exports = model('Channel', ChannelSchema);