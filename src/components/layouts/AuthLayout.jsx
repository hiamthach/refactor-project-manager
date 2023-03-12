import React from 'react';

import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-light-bg flex items-center justify-center h-[100vh] w-full ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
