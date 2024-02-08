import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './providers/AuthProvider/AuthProvider';
import store from './redux/store';
import { router } from './router';

import './index.scss';

//RouterProvider - это объект роутера
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
