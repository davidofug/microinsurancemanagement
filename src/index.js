import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './contexts/Auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { combineProviders } from './helpers/combineProviders';
import './index.css'

const Providers = combineProviders([AuthProvider]);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
