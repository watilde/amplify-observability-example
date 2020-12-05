import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import monitorErrors from './monitorErrors';

Amplify.configure(awsconfig);

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

// To capture errors and report it to CloudWatch through Kinesis Stream
// Learn more: https://docs.amplify.aws/lib/analytics/streaming/q/platform/js#installation-and-configuration
window.onerror = monitorErrors;