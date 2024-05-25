import { Suspense } from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'
import { Spinner } from '@app/views/spinner/Spinner';
import { AuthProvider } from '@app/components/guards/jwt/JwtContext';
import { store } from '@app/store'
import App from './App'
import './config/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
    </GoogleOAuthProvider>
  </Provider>
);
