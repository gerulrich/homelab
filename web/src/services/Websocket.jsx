import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";
import { setConnected } from '@app/store/slices/WebsocketSlice';
import useAuth from '@app/components/guards/UseAuth';
import { handleNotification } from './notification.handler';

export const Websocket = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    let socket;
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken');
      socket = io(import.meta.env.VITE_BACKEND_URL, { extraHeaders: { "x-token": accessToken } });
      socket.on('connect', () => dispatch(setConnected(true)));
      socket.on('disconnect', () => dispatch(setConnected(false)));
      socket.on('notification', (message) => {
        handleNotification(message, dispatch);
      })
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };

  }, [isAuthenticated])

  return (<>{children}</>)
}

export default Websocket;