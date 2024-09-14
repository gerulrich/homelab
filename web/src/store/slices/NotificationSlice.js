import { createSlice } from '@reduxjs/toolkit';
import { markNotificationsAsRead } from '../thunks/markNotificationsAsRead';


const initialState = {
  notifications: [],
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markNotificationsAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.notificationIds.forEach(id => {
          const notification = state.notifications.find(n => n._id === id);
          if (notification) {
            notification.read = true;
          }
        });
      })
      .addCase(markNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addNotification, clearNotifications, markAllNotificationsAsRead, setNotifications } = NotificationSlice.actions;