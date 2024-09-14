const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['system', 'user'],
    required: true,
  },
  component: {
    type: String,
    enum: ['epg', 'investment', 'chat'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.type === 'user' && this.component === 'chat';
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.type === 'user';
    },
  },
  severity: {
    type: String,
    enum: ['error', 'info', 'warning'],
    required: true,
  },  
  read: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;