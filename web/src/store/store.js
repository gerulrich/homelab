import { configureStore } from '@reduxjs/toolkit'
import {  CustomizerSlice } from '@app/store/slices/CustomizerSlice'
import { WebsocketSlice } from '@app/store/slices/WebsocketSlice';


export const store = configureStore({
    reducer: {
        customizer:  CustomizerSlice.reducer,
        websocket: WebsocketSlice.reducer,
    },
})