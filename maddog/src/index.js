import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { router } from './router';
import './index.scss';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';


//RouterProvider is router's object, that has params and settings
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
