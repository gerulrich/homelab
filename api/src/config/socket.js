const { Server: SocketServer } = require('socket.io');
const { decodeJWT } = require('@app/helpers/jwt');

const initializeSocketIO = (server) => {
  const io = new SocketServer(server, { cors: '*' });

  io.on('connection', (socket) => {
    const token = socket.handshake.headers['x-token'];
    
    try {
      const { uid, roles } = decodeJWT(token);
      if (!uid) return socket.disconnect();
      console.log(`Cliente conectado ${  socket.id  } (${  uid  })`);
      socket.uid = uid;
      socket.on('disconnect', () => {
        console.log(`Cliente desconectado ${  socket.id  } (${  uid  })`);
      });
      if (roles.includes('ADMIN_ROLE')) {
        socket.join('admin');
      }
    } catch (error) {
      console.error(error);
      socket.disconnect();
    }
  });

  return io;
};

module.exports = initializeSocketIO;