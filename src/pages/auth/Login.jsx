import React from 'react';

import { Card, Button } from 'antd';

import AuthConsumer from 'hooks/useAuth';

import toastHelper from 'config/helpers/toastHelper';

const Login = () => {
  const { googleSignIn } = AuthConsumer();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      toastHelper.error(err.message);
    }
  };

  return (
    <Card
      style={{
        width: 400,
      }}
    >
      <Button type="primary" className="w-full text-text" onClick={handleSignIn}>
        Login With Google
      </Button>
    </Card>
  );
};

export default Login;
