const axios = require('axios');
const https = require('https');

let podman;

if (process.env.NODE_ENV === 'production') {
  podman = axios.create({
    baseURL: 'http://d/v4.9.5/libpod',
    socketPath: '/run/user/1000/podman/podman.sock',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
} else {
  podman = axios.create({
    baseURL: 'http://192.168.0.10:9080/v4.9.5/libpod'
  });
}

module.exports = { podman };