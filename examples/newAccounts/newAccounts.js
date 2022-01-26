const Web3 = require('web3')
const rpcURL = "https://rpc-mumbai.maticvigil.com"
const web3 = new Web3(rpcURL)
const address = "0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4"

accounts = web3.eth.accounts.create()
console.log(accounts.address)
