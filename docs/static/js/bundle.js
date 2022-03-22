import {
    ethers
} from "./ethers-5.5.4.esm.min.js";

import * as configs from "./testnet.js";

async function connectMetaMask() {
    // Set up connection with MetaMask
    let provider;
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    } catch (error) {
        console.error(error);
        console.error("Please install MetaMask.");
        throw error;
    }

    // Require user to add and switch to the correct blockchain
    try {
        await provider.send("wallet_addEthereumChain", configs.chainConfig);
    } catch (error) {
        console.error(error);
        throw error;
    }
    // Assign new provider with new chain
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // Require user to select wallet account
    await provider.send("eth_requestAccounts", []).catch(function(error) {
        if (error.code === 4001) { // EIP-1193 userRejectedRequest error
            console.error("Please connect to MetaMask.");
        } else {
            console.error(error);
        }
        throw error;
    });

    console.log("Connecting wallet is successful.");
    return provider;
}

async function connectWalletConnect() {}

async function approve(count) {
    // Connect wallet and get provider
    let provider;
    try {
        provider = await connectMetaMask();
    } catch (error) {
        console.error(error);
        throw error;
    }
    const signer = provider.getSigner();
    const signerAddr = await signer.getAddress();

    // Call ERC20 WETH contract function
    console.log("ERC20 WETH contract address: " + configs.erc20Addr);
    let response;
    const payment = ethers.utils.parseEther(configs.boxPrice).mul(count)
    const contract = new ethers.Contract(configs.erc20Addr, configs.erc20abi, signer);
    // Check balance
    let balance;
    await contract.balanceOf(signerAddr).then(function(result) {
        balance = ethers.BigNumber.from(result);
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
        response = await contract.approve(configs.contractAddr, ethers.utils.parseEther(configs.boxPrice).mul(count));
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

async function purchase(uid, count) {
    console.log("Purchase");
    console.log("Input argument");
    console.log("uid: " + uid);
    console.log("count: " + count);

    // Get data for http request
    const transactionAt = Math.floor(Date.now() / 1000);

    // Connect wallet and get provider
    let provider;
    try {
        provider = await connectMetaMask();
    } catch (error) {
        console.error(error);
        sendRequest(4001, "Connect wallet fail", contractAddr, 0, uid, transactionAt, 0, 0, 0, error);
        throw error;
    }
    const signer = provider.getSigner();

    // Approve ERC20 token to current contract
    console.log("Approve WETH");
    await approve(count).catch(function(error) {
        console.log("Error message: " + error.message);
        throw error;
    });

    // Call contract function for buying NFTs
    console.log("contract address: " + configs.contractAddr);
    let response;
    const signerAddr = await signer.getAddress();
    const contract = new ethers.Contract(configs.contractAddr, configs.abi, signer);
    response = await contract.purchase(signerAddr, count).catch(function(error) {
        console.error("Contract error: " + error);
        sendRequest(4002, "Buy NFT fail", configs.contractAddr, signerAddr, uid, transactionAt, 0, 0, 0, error);
        throw error;
    });

    // Wait for transaction to be confirmed
    let receipt;
    let price;
    let replacedTx = true;
    let products = new Object();
    while (replacedTx) {
        await response.wait().then(function(result) {
            receipt = result;
            replacedTx = false;
        }).catch(function(error) {
            console.log(error.reason);
            if (error.cancelled)
                throw error;
            response = error.replacement;
        });
    }

    // Grab log for events
    // ERC20 transfer
    if (
        receipt.logs[0].topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") {
        price = parseInt(receipt.logs[0].data, 16) * 0.000000000000000001;
    }
    // ERC721 NFT transfer
    const transactionHash = receipt.transactionHash
    for (let i = 0; i < receipt.logs.length; i++) {
        if (
            receipt.logs[i].topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" &&
            receipt.logs[i].topics[1] == "0x0000000000000000000000000000000000000000000000000000000000000000") {
            const tokenId = parseInt(receipt.logs[i].topics[3], 16);
            products[tokenId] = transactionHash;
        }
    }

    // Call callback API for sending data to backend when it is success
    sendRequest(2000, "Success", configs.contractAddr, signerAddr, uid, transactionAt, price, products, transactionHash, "");

    console.log("purchase transaction hash: " + transactionHash);
    console.log("purchase API finished");
}

async function getLand() {
    const provider = ethers.getDefaultProvider(rpcService);
    const contract = new ethers.Contract(contractAddr, abi, provider);
    // BigNumber objects
    const nextId = await contract.tokenIdCount();
    const maxId = await contract.maxPurchaseId();
    return maxId.toNumber() - (nextId.toNumber() - 1);
}

function list() {
    console.log("Contract address: " + configs.contractAddr);
}

function sendRequest(resultCode, resultMsg, contractAddress, wallet, orderId, transactionAt, price, products, hash, error) {
    let req = new XMLHttpRequest();
    req.onload = function() {
        console.log("Send http request: Success.");
        console.log(req);
        if (req.status != 200) {
            console.error("Status code: " + req.status);
            console.error("Response text: " + req.responseText);
        }
    };
    req.onerror = function() {
        console.log("Send http request: Failed.");
    }
    if (resultCode == 2000) {
        req.open('POST', "http://mcm-api.gamamobi.com" + configs.port + "/purchaseResult");
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            "contractAddress": contractAddress,
            "orderId": orderId,
            "price": price,
            "products": products,
            "hash": hash,
            "resultCode": resultCode,
            "resultMsg": resultMsg,
            "transactionAt": transactionAt,
            "wallet": wallet,
            "error": error
        }));
    } else {
        req.open('POST', "http://mcm-api.gamamobi.com" + configs.port + "/purchaseResult");
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify({
            "contractAddress": contractAddress,
            "orderId": orderId,
            "price": "",
            "products": "",
            "hash": "",
            "resultCode": resultCode,
            "resultMsg": resultMsg,
            "transactionAt": transactionAt,
            "wallet": wallet,
            "error": error.message
        }));
    }
}

document.getElementById("connect").onclick = function() {
    connectMetaMask();
}
document.getElementById("connect2").onclick = function() {
    connectWalletConnect();
}
document.getElementById("approve").onclick = function() {
    approve(1);
}
document.getElementById("purchase").onclick = function() {
    purchase("user1_abc", 1);
}
document.getElementById("list").onclick = function() {
    list();
}
document.getElementById("request").onclick = function() {
    sendRequest(2000,
        "Success",
        configs.contractAddr,
        "0x9A34B540dC3124F4054Fd9D35d99161055090666",
        "user1",
        Math.floor(Date.now() / 1000),
        0.08, {
            "1": "0x9A34B540dC3124F4054Fd9D35d99161055090666"
        }
    );
}
