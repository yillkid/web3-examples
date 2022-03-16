import {
    ethers
} from "./ethers-5.5.4.esm.min.js"

var address = "";
async function connectToMetaMask() {
  let web3Provider;
  if (window.isWalletConnect) {
  try {
    const provider = new WalletConnectProvider.default({
    rpc: {
      1: "https://cloudflare-eth.com/",
      137: "https://polygon-rpc.com/",
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
    address = await signer.getAddress();
    afterConnectWallet(address, isShow);
  }
  return web3Provider;
}

$('#signTypedDataV4Button').click(function () {
  connectToMetaMask();
});
