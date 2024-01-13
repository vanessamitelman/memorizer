// PrivateRoute.jsx
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserRole, useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
  requiredRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  requiredRoles = []
}) => {
  const { isAuthenticated, userRole } = useAuth();

  // Ensure userRole is a valid UserRole or set a default value
  const currentUserRole: UserRole = userRole || 'user';

  const hasRequiredRole =
    requiredRoles.length === 0 || requiredRoles.includes(currentUserRole);

  return isAuthenticated && hasRequiredRole ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

export default PrivateRoute;
