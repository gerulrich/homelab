import Button from '@mui/material/Button';
import useAuth from '@app/components/guards/UseAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotifications } from '../store/slices/WebsocketSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { logout, user, } = useAuth();
  const isConnected = useSelector((state) => state.websocket.socket.isConnected);
  const notifications = useSelector((state) => state.websocket.socket.notifications);

    const handleClearNotifications = () => {
    dispatch(clearNotifications());
  };

  return (
    <>
      <h1>Hola {user?.name}!</h1>

      <Button variant="contained" onClick={logout}>Logout</Button>

      <div>
      <p>Estado del WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}</p>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
      <Button onClick={handleClearNotifications}>Limpiar notificaciones</Button>
    </div>
    </>
  )
}

export default Home
