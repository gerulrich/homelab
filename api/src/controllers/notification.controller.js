const Notification = require('@app/models/notification.model');

const getNotifications = async(req, res) => {
  const { limit = 25, offset = 0} = req.query;
  const isAdmin = req.user.roles.includes('ADMIN_ROLE');
  const query = {
    read: false,
    ...(isAdmin ? { $or: [{ type: 'system' }, { user: req.user._id }] } : { user: req.user._id })
  };
  const [total, notifications] = await Promise.all([
    Notification.countDocuments(query),
    Notification.find(query).sort({ createdAt: -1 }).limit(parseInt(limit)).skip(parseInt(offset))
  ]);
  res.json({
    items: notifications,
    pagination: {
      total,
      limit: parseInt(limit),
      offset: parseInt(offset),
    }
  });
};

const updateNotifications = async(req, res) => {
  const { notificationIds } = req.body;
  const isAdmin = req.user.roles.includes('ADMIN_ROLE');
  const query = {
    _id: { $in: notificationIds },
    ...(isAdmin ? { $or: [{ type: 'system' }, { user: req.user._id }] } : { user: req.user._id })
  };
  const notificationsToUpdate = await Notification.find(query);
  const result = await Notification.updateMany(query, { $set: { read: true } });
  const updatedNotificationIds = notificationsToUpdate.map(notification => notification._id);
  res.json({
    notificationIds: updatedNotificationIds,
    result
  });
};

module.exports = {
  getNotifications,
  updateNotifications
};