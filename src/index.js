import './index.css'
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './contexts/Auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { combineProviders } from './helpers/combineProviders';


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
