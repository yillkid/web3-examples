const Web3 = require('web3')
const rpcURL = "https://rpc-mumbai.maticvigil.com"
const web3 = new Web3(rpcURL)
const address = "0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4"


const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
