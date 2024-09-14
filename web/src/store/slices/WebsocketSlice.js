import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false
};

export const WebsocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    }
  }
});

export const { setConnected } = WebsocketSlice.actions;