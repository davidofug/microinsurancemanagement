import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './providers/Auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { combineProviders } from './helpers/combineProviders';
import './index.css'

const Providers = combineProviders([AuthProvider]);

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
