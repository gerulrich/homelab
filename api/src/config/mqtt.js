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
    if (topic === '/homelab/device/status') {
      const { entity_id, state } = JSON.parse(payload.toString());
      console.log(`Received Message: ${  entity_id  } ${  state}`);
      io.emit('notification', `${entity_id  } ${  state}`);
    }

    // TODO aqui va la lógica para recibir los eventos y procearlos

  });
  return client;
};

module.exports = initializeMQTT;