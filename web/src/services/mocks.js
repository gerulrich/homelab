
const fakeRequest = (time) => new Promise((res) => setTimeout(res, time));  

let users = [
    {
      id: '8e5f29802-677d-772a-629a-7e5f298024da-0',
      displayName: 'Demo React',
      email: 'demo@demo.com',
      password: 'demo123',
      phoneNumber: '+91 2166555',
      country: 'India',
      address: 'Khao galli',
      state: 'Delhi',
      city: 'Delhi',
      zipCode: '94116',
      about: 'Lorem ipsum hasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
      role: 'admin',
      isPublic: true,
    },
  ];

export const configureMocks = (mock) => {
    // Configura tus mock de endpoints aquí
    mock.onPost("/auth/login", { email: "demo@demo.com" }).reply(200, { user: {}, token: 'mitoken' });
    mock.onPost('/auth/login', { email: "user@demo.com" }).reply(401, { user: {}, token: 'mitoken' });
    mock.onPost('/auth/register').reply(200, { data: 'Mocked Data' });
    mock.onGet('/auth/renew').reply(200, { user: {}, token: 'mitoken_renew' });
};

export default configureMocks;