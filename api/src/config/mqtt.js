const mqtt = require('mqtt');

const initializeMQTT = (io) => {
  const clientId = process.env.MQTT_CLIENT_ID;
  const client = mqtt.connect(process.env.MQTT_URL, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
  });

  const topics = ['/homelab/message', '/homelab/device/status'];
  client.on('connect', () => {
    console.log('Connected');
    client.subscribe(topics, () => {
      console.log(`Subscribe to topic '${topics}'`);
    });
  });

  client.on('message', (topic, payload) => {
    switch (topic) {
      case '/homelab/device/status':
      case '/homelab/message': {
        console.log(`Received Message: ${payload}`);
        // payload from mqtt needed to be parsed with json
        const msg = JSON.parse(payload);
        if (msg.user) {
          const sockets = Array.from(io.sockets.sockets.values());
          const socket = sockets.find(socket => socket.uid === msg.user);
          if (socket) {
            socket.emit('notification', msg);
          }
        } else {
          io.emit('notification', msg);
        }
        break;
      }
      default:
        break;
    }
  });

  return client;
};

module.exports = initializeMQTT;