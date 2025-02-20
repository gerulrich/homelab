import React from 'react';
import { useContext } from 'react';
import { AbilityContext } from '@app/components/guards/Can';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ I, a, children }) => {
  const ability = useContext(AbilityContext);
  return ability.can(I, a) 
    ? children 
    : <Navigate to="/" />;
};

export default ProtectedRoute;
