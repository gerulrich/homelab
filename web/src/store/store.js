import { configureStore } from '@reduxjs/toolkit'
import { CustomizerSlice } from '@app/store/slices/CustomizerSlice'
import { WebsocketSlice } from '@app/store/slices';
import { NotificationSlice } from '@app/store/slices/NotificationSlice';

export const store = configureStore({
    reducer: {
        customizer:  CustomizerSlice.reducer,
        websocket: WebsocketSlice.reducer,
        notification: NotificationSlice.reducer,
    },
})