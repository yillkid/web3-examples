const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI_PROVIDER));

const address = '0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4';

web3.eth.getAccounts(function(err, addresses){
  
});
