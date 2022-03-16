// 引入模組
const Web3 = require('web3');

// HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI_PROVIDER));

console.log(web3.version);

