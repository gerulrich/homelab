const axios = require('axios');
const https = require('https');

const defaultBody = {
  excludeZeroPxAndQty: true,
  T2: false,
  T1: true,
  T0: false,
  'Content-Type': 'application/json'
};

const byma = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: 'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'es-AR,es-419;q=0.9,es;q=0.8',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://open.bymadata.com.ar',
    'Referer': 'https://open.bymadata.com.ar/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'x-client': 'prueba',
  }
});

module.exports = { byma, defaultBody };