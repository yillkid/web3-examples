import {
    ethers
} from "./ethers-5.5.4.esm.min.js";

import * as configs from "./testnet.js";

var address = "";
async function connectToMetaMask() {
  let web3Provider;
  if (window.isWalletConnect) {
  try {
    const provider = new WalletConnectProvider.default({
    rpc: {
      // 1: "https://cloudflare-eth.com/",
      // 137: "https://polygon-rpc.com/",

      // PolyGon TestNet RPC
      80001: "https://rpc-mumbai.maticvigil.com/"
    }
  });
    await provider.enable();
      web3Provider = new ethers.providers.Web3Provider(provider);
  } catch (error) {
      console.error(error)
  }
    let address = await web3Provider.listAccounts();
    afterConnectWallet(address[0], isShow);
  } else {
    try {
    web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  } catch (error) {
    console.error(error);
    showMessage("Please install MetaMask.");
    throw error;
  }
  // Require user to add and switch to the correct blockchain
  await web3Provider.send("eth_requestAccounts", []).catch(function (error) {
    if (error.code === 4001) { // EIP-1193 userRejectedRequest error
      showMessage("Please connect to MetaMask.");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      console.error(error);
    }
    throw error;
  });
  const signer = web3Provider.getSigner();
  const signerAddr = await signer.getAddress();
  // afterConnectWallet(address, isShow);
  
  // Call ERC20 WETH contract function
  console.log("ERC20 WETH contract address: " + configs.erc20Addr);
  let response;
  const payment = ethers.utils.parseEther(configs.boxPrice).mul(configs.count)
  const contract = new ethers.Contract(configs.erc20Addr, configs.erc20abi, signer)

  // Check balance
  let balance;
  console.log("hello payment = " + payment.toString());
  await contract.balanceOf(signerAddr).then(function(result) {
    balance = ethers.BigNumber.from(result);
    console.log("hello the balance is " + balance);
  }).catch(function(error) {
    throw error;
  });
  if (balance.lt(payment))
    throw new Error("Not enough balance");
  // Check allowance
  let allowance;
  await contract.allowance(signerAddr, configs.contractAddr).then(function(result) {
      allowance = ethers.BigNumber.from(result);
  }).catch(function(error) {
      throw error;
  });
  if (allowance.gte(payment)) {
      console.log("The contract allows the WETH payment");
      return;
  }

    // Approve
    try {
        response = await contract.approve(configs.contractAddr, ethers.utils.parseEther(configs.boxPrice).mul(configs.count));
    } catch (error) {
        console.error("ERC20 Contract error: " + error);
        throw error;
    }

    // Wait for transaction to be confirmed
    let receipt;
    try {
        receipt = await response.wait();
    } catch (error) {
        console.log(error);
        throw error;
    }
    console.log("approve transaction hash: " + receipt.transactionHash);
    console.log("approve is finished.");


  }
  return web3Provider;
}

$('#signTypedDataV4Button').click(function () {
  connectToMetaMask();
});
