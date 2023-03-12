import React, { useState, useContext, useLayoutEffect } from 'react';

import { Spin } from 'antd';

import authApi from 'config/firebase/api/authApi';
import { auth } from 'config/firebase/index';
//Helper
import emailHelper from 'config/helpers/emailHelper';
import toastHelper from 'config/helpers/toastHelper';

const authContext = React.createContext();

function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuth(true);
        setLoading(false);
      } else {
        setIsAuth(false);
        setCurrentUser();
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return {
    isAuth,
    loading,
    async googleSignIn() {
      try {
        const res = await authApi.signInByGoogle();
        if (res?.user.email) {
          if (!emailHelper.checkTopeboxEmail(res?.user.email)) {
            toastHelper.error('Chỉ email Topebox mới có quyền truy cập trang này');
            setIsAuth(false);
            authApi.signOut();
          } else {
            toastHelper.success('Sign in');
          }
        }
      } catch (err) {
        return err;
      }
    },
    async signOut() {
      setIsAuth(false);
      try {
        await authApi.signOut();
        toastHelper.success('Sign out');
      } catch (error) {}
    },
    currentUser,
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {!auth.loading ? (
        children
      ) : (
        <div className="auth-loading">
          <Spin />
        </div>
      )}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return useContext(authContext);
}
