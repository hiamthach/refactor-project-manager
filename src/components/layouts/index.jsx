import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Layout className="site-layout">
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
