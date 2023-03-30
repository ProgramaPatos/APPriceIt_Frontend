import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './routes/App';
import Login from './routes/Login';
import Register from './routes/Register';
import Error from './routes/Error';
import { Auth0Provider } from "@auth0/auth0-react";

const router  = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    errorElement: <Error />
  },
  {
    path: '/register',
    element:  <Register />
  },
  {
    path: '/login',
    element: <Login />  
  }


]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || "undefined domain"}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || "undefined client id"}
    redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <RouterProvider router={router}/>
  
  </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
