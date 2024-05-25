import axios from "axios";

const createAxios = (dev) => {
  const client = axios.create({ baseURL: `${import.meta.env.VITE_BACKEND_URL}/` });
  if (dev) {
    return configureMocks(client).then(() => client);
  } else {
    client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 400) {
          return Promise.resolve(error.response);
        }
        // Para otros errores, tratarlos normalmente
        return Promise.reject(error);
      }
    );
  }
  return client;
}

const configureMocks = async (client) => {
  const { default: MockAdapter } = await import('axios-mock-adapter');
  const { default: configureMocks } = await import('./mocks');
  const mock = new MockAdapter(client);
  configureMocks(mock);
  return client;
}

export const homelab = createAxios(process.env.NODE_ENV === 'development' && import.meta.env.MODE === 'mock');
export default homelab;
