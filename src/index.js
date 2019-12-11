import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';

import './index.css';
import App from './components/App';

ReactDOM.render(
  <Web3Provider
    defaultProvider={(cb) => cb(new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/ec1cfca7359a45f9bf87247ff10fd9be")))}
    loading="Loading..."
    error={(err) => `Connection error: ${err.message}`}
  >
    <App />
  </Web3Provider>, 
  document.getElementById('root')
);


