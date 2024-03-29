import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { store } from './store';
// Styling imports
import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import './index.scss';
import App from './app';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const app = createRoot(container!);
app.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
