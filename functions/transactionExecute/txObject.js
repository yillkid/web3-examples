// var Tx = require("ethereumjs-tx");
const Tx = require("ethereumjs-tx").Transaction
const Web3 = require('web3')
const rpcURL = "https://rpc-mumbai.maticvigil.com"
const web3 = new Web3(rpcURL)
const address2 = "0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4"

account2 = web3.eth.accounts.create()
console.log(account2.address)

var privateKey = account2.privateKey
console.log(privateKey.slice(2))


// Create txn object
/*
const txObject = {
  nonce:    web3.utils.toHex(txCount),
  to:       account2,
  value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
  gasLimit: web3.utils.toHex(21000),
  gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
}
*/

const txObject = {
  nonce: '0x00',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
}


// Sign txn
const txn = new Tx(txObject, { chain: 'ropsten' });
const privateKey1 = Buffer.from(privateKey.slice(2), 'hex')

txn.sign(privateKey1)

const serializedTx = txn.serialize()
const raw = '0x' + serializedTx.toString('hex')

// Broadcast
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);
/*
web3.eth.sendSignedTransaction(txn, (err, txHash) => {
  console.log('txHash:', txHash)
  console.log(err)
})
*/
