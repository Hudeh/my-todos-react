import React from 'react';
import { Navigate } from 'react-router-dom';
function Protected({ token,isAuthenticatd, children }) {
  if (!token && !isAuthenticatd) {
    return <Navigate to='/' replace />;
  }
  return children;
}
export default Protected;
