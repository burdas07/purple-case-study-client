/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/pure-min.css';
import './styles/grids-responsive-min.css';
import './styles/font-awesome.css';
import './styles/style.css';
//import './index.css';
import App from './App';
import QuickStats from './components/QuickStats';
import History from './components/History';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

    <div className="splash-container"><div className="splash">
    <h1 className="splash-head">Currency Converter</h1>
    <App />
    </div></div>

    {/* <!-- history --> */}
    <div className="content-wrapper">
    <div className="content center" style={{width: '85%', margin: 'auto'}}>

    <h3 className="content-subhead is-center">Quick Stats</h3>
    <QuickStats />

    <h3 className="content-subhead is-center">Transaction History</h3>
    <History />

    </div>
    </div>    

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
