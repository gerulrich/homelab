/* eslint-disable react-hooks/rules-of-hooks */
import { decodeToken } from 'react-jwt';

import axios from '@app/services/homelab'

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = decodeToken(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export {
  isValidToken,
  setSession
};
