import Web3 from 'web3';

let web3 = undefined;
if (window.web3 !== undefined) {
  web3 = new Web3(window.web3.currentProvider);
  window.addEventListener("load", async () => {
    // Modern dapp browsers...
    if (window.ethereum) {      
      window.web3 = new Web3(window.ethereum);      
      try {
        // Request account access if needed
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
      console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  });
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/ec1cfca7359a45f9bf87247ff10fd9be"));
}

export default web3;