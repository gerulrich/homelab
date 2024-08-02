import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: {
    isConnected: false,
    notifications: [],
  },
};

export const WebsocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.socket.isConnected = action.payload;
    },
    addNotification: (state, action) => {
      state.socket.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.socket.notifications = [];
    },
    markAllNotificationsAsRead: (state) => {
      state.socket.notifications.forEach(notification => {
        notification.read = true;
      });
    },
  },
});

export const { setConnected, addNotification, clearNotifications, markAllNotificationsAsRead } = WebsocketSlice.actions;