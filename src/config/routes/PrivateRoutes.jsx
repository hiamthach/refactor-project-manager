import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * If the check is true, then render the Outlet component, otherwise redirect to the redirectLink.
 * @returns A component that is either the Outlet component or the Navigate component.
 */
const PrivateRoutes = ({ redirectLink, check }) => {
  return check ? <Outlet /> : <Navigate to={redirectLink} replace />;
};

export default PrivateRoutes;
