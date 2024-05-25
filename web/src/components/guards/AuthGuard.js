import { useNavigate } from 'react-router-dom';
import useAuth from './UseAuth';
import React, { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, isInitialized, navigate]);
  
  if (isInitialized && isAuthenticated)
    return children;
  return React.createElement(React.Fragment, null);
};

export default AuthGuard;
