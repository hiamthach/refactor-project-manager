import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { COLORS } from 'config/constants/theme';
import Button from './Button';

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLORS.primary,
          colorSuccess: COLORS.green,
          colorTextBase: COLORS.black,
          colorWarning: COLORS.yellow,
          colorInfo: COLORS.blue,
          colorError: COLORS.red,
          colorTextSecondary: COLORS.gray,
          fontFamily: 'Poppins, sans-serif',
        },
        components: {
          Button,
        },
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
