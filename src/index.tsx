/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/pure-min.css';
import './styles/grids-responsive-min.css';
import './styles/font-awesome.css';
import './styles/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const port = 1337;
export const baseUrl = `http://localhost:${port}`
export const convertApi = "/api/convert/money?"
export const clearApi = "/api/transaction/clear"
export const transactionApi = "/api/transaction"



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
