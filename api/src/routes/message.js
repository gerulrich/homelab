const { Router } = require('express');

const router = Router();

router.post('/emit', (req, res) => {
  const { uid, message } = req.body;
  const io = req.app.get('socketio');
  const sockets = Array.from(io.sockets.sockets.values());
  const socket = sockets.find(socket => socket.uid === uid);
  if (socket) {
    socket.emit('notification', message);
  }
  res.json({ success: true, message: 'Mensaje emitido exitosamente' });
});


module.exports = router;