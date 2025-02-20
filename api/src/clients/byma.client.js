const axios = require('axios');
const https = require('https');

const defaultBody = {
  T1:true,
  T0:false,
  "Content-Type": "application/json"
}

const byma = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: 'https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cache-Control': 'no-store',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Pragma': 'no-cache',
    'Origin': 'https://open.bymadata.com.ar',
    'Referer': 'https://open.bymadata.com.ar/',    
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
  }
});

module.exports = { byma, defaultBody };