import React from 'react';

import { Routes, Route } from 'react-router-dom';

// Import Routes all
import { publicRoutes, authRoutes } from 'config/routes';
import PrivateRoutes from 'config/routes/PrivateRoutes';
import AuthConsumer from 'hooks/useAuth';

// layouts Format
import Layout from 'components/layouts';
import AuthLayout from 'components/layouts/AuthLayout';

const App = () => {
  const { isAuth } = AuthConsumer();

  const renderRoutes = (routes) => {
    return routes.map(({ path, Component, child }) => (
      <Route key={path} path={path} element={<Component />}>
        {child && child.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      </Route>
    ));
  };

  return (
    <React.Fragment>
      <Routes>
        <Route element={<PrivateRoutes redirectLink="auth/login" check={isAuth} />}>
          {/* Route for main layout */}
          <Route path="/" element={<Layout />}>
            {renderRoutes(publicRoutes)}
          </Route>
        </Route>

        <Route element={<PrivateRoutes redirectLink="/" check={!isAuth} />}>
          {/* Route for auth layout */}
          <Route path="/auth" element={<AuthLayout />}>
            {renderRoutes(authRoutes)}
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
