const Web3 = require('web3')
const rpcURL = "https://rpc-mumbai.maticvigil.com"
const web3 = new Web3(rpcURL)
const address = "0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4"

web3.eth.getBalance(address, (err, wei) => {

    // 餘額單位從 wei 轉換為 ether
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance: " + balance)
})
