import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'content/styles/index.css';
import ThemeProvider from 'theme/ThemeProvider';

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'hooks/useAuth';

import { Toaster } from 'react-hot-toast';
import { toastConfig } from 'config/helpers/toastHelper';

import store from 'redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster {...toastConfig} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);
