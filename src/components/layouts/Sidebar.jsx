import React, { useState } from 'react';

import { Layout, Menu, Avatar, Popover, Button } from 'antd';
import { PieChartOutlined, AreaChartOutlined, RightOutlined } from '@ant-design/icons';

import { Link, useLocation } from 'react-router-dom';

import Logo from 'components/shared/Logo';

import AuthConsumer from 'hooks/useAuth';

import menuHelper from 'config/helpers/menuHelper';
import clsx from 'clsx';
import 'content/styles/sidebar.css';

const { Sider } = Layout;
const { getItem } = menuHelper;

const items = [
  getItem(
    <Link to={'/finance'} className="text-[13px]">
      Finance
    </Link>,
    'finance',
    <PieChartOutlined />
  ),
  getItem(
    <Link to={'/performance'} className="text-[13px]">
      Performance
    </Link>,
    'performance',
    <AreaChartOutlined />
  ),
];

const ProfileContent = ({ signOut }) => {
  return (
    <Button
      type="primary"
      danger
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </Button>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();

  const { currentUser, signOut } = AuthConsumer();

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className={clsx(collapsed ? 'px-4' : 'px-10', 'w-full')}>
        <Logo theme={'light'} size={collapsed && 'small'} />
      </div>
      <Menu theme="dark" selectedKeys={pathname.split('/')[1]} mode="inline" items={items} />
      <Popover arrow={false} content={<ProfileContent signOut={signOut} />} placement="right">
        <div className="flex p-4 items-center gap-2 justify-center cursor-pointer">
          <Avatar className="mx-auto" size={36} src={currentUser.photoURL} />
          {!collapsed && (
            <>
              <span className="text-white text-[13px]">{currentUser.displayName}</span>
              <RightOutlined className="text-white text-[13px]" />
            </>
          )}
        </div>
      </Popover>
    </Sider>
  );
};

export default Sidebar;
