const axios = require('axios');
const fs = require('fs');

const FLOW_ACCESS_TOKEN = process.env.FLOW_ACCESS_TOKEN;
const FLOW_USER_ACCOUNT = process.env.FLOW_USER_ACCOUNT;
const FLOW_DYNATRACE = process.env.FLOW_DYNATRACE;
const FLOW_REQUEST_ID = process.env.FLOW_REQUEST_ID;
const TOKEN_FILE = `${process.env.FLOW_CONFIG_DIR}/token.txt`;
const SESSION_FILE = `${process.env.FLOW_CONFIG_DIR}/session.json`;
const MAMUSHKA_FILE = `${process.env.FLOW_CONFIG_DIR}/mamushka.json`;

const getJwt = async () => {
  let mamushkaToken = fs.readFileSync(TOKEN_FILE, 'utf8');
  if (mamushkaToken === '' || !(await isMamushkaTokenValid(mamushkaToken))) {
    const sessionToken = await getTokenSession();
    mamushkaToken = await getMamushkaToken(sessionToken);
    fs.writeFileSync(TOKEN_FILE, mamushkaToken);
  }
  return mamushkaToken;
};

const isMamushkaTokenValid = async(token) => {
  console.log('Checking if Mamushka token is valid');
  const config = {
    method: 'get',
    url: 'https://web.flow.com.ar/api/v1/content/channels',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Referer': 'https://web.app.flow.com.ar/',
      'Origin': 'https://web.app.flow.com.ar/inicio'
    }
  };
  const response = await axios.request(config);
  return response.status === 200;
};

const getTokenSession = async () => {
  console.log('Getting session token');
  const data = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://geo.mnedge.cvattv.com.ar:4446/xtv-ws-client/api/v1/session/${FLOW_USER_ACCOUNT}`,
    headers: {
      'User-Agent': 'Ktor client',
      'x-request-id': `${FLOW_REQUEST_ID}`,
      'x-dynatrace': `${FLOW_DYNATRACE}`,
      'Content-Type': 'application/json',
    },
    data
  };
  
  const response = await axios.request(config);
  const token = response.headers['authorization'];
  const jwt = token.split(' ')[1];
  return jwt;
};

const getMamushkaToken = async (sessionToken) => {
  console.log('Getting Mamushka token');
  const mamushkaData = JSON.parse(fs.readFileSync(MAMUSHKA_FILE, 'utf8'));
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://authsdk.app.flow.com.ar/auth-sdk/v1/mamushka',
    headers: {
      'User-Agent': 'Ktor client', 
      'x-request-id': 'Flow|AndroidTV|3.88.3|2797276|70584634|4689721462', 
      'x-dynatrace': 'MT_3_5_1060612777_2-0_effb57ad-3688-40b8-9ac9-f53fe4d83711_25_68_75', 
      'Authorization': `Bearer ${FLOW_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: { token: sessionToken, ...mamushkaData }
  };
  try {
    const response = await axios.request(config);
    const token = response.data.token_mamushka;
    return token;
  } catch (error) {
    console.log(error);
  }
};

const getPrograms = async (jwt, number) => {
  const ts = Math.round((new Date()).getTime() / 1000);
  const epoch_from = ts - (24 * 60 * 60);
  const epoch_to = ts + (24 * 60 * 60);
  const config = {
    method: 'POST',
    url: `https://web.flow.com.ar/api/v1/content/channel?size=10000&dateFrom=${epoch_from}000&dateTo=${epoch_to}999`,
    headers: { 
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
      'Authority': 'web.flow.com.ar',
      'Origin': 'https://web.app.flow.com.ar/inicio',
      'Referer': 'https://web.app.flow.com.ar/',
      'User-Agent': 'okhttp/4.11.0',
      'x-dynatrace': `${FLOW_DYNATRACE}`,
      'x-request-id': `${FLOW_REQUEST_ID}`
    },
    data : [ number ]
  };
  const response = await axios.request(config);
  return response.data[0];
};

module.exports = {
  getJwt,
  getPrograms
};