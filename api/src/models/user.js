const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, '\'name\' is a required field.']
  },
  password: {
    type: String,
    required: [true, '\'password\' is a required field.'],
  },
  email: {
    type: String,
    required: [true, '\'email\' is a required field.'],
    unique: true
  },
  picture: {
    type: String,
  },
  roles: {
    type: [String],
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  plan: {
    type: String,
    enum: ['basic', 'pro', 'max'],
    default: 'basic',
    required: true
  }
});

UserSchema.methods.toJSON = function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model('User', UserSchema);