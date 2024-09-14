import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@app/services/homelab'

export const markNotificationsAsRead = createAsyncThunk(
  'notification/markNotificationsAsRead',
  async (notificationIds, { rejectWithValue }) => {
    try {
      const response = await axios.post('/notifications/mark-as-read', { notificationIds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);