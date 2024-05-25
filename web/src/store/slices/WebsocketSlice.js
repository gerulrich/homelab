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
    setConnected(state, action) {
      state.socket.isConnected = action.payload;
    },
    addNotification(state, action) {
      state.socket.notifications.push(action.payload);
    },
    clearNotifications(state) {
      state.socket.notifications = [];
    },
  },
});

export const { setConnected, addNotification, clearNotifications } = WebsocketSlice.actions;