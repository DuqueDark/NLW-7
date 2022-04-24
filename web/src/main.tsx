import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { OAuthProvider } from './context/oauth_provider';

import "./style/global.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OAuthProvider>
      <App />
    </OAuthProvider>
  </React.StrictMode>
);
