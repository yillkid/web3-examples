export const contractAddr = "0x7c730c9421a42c226a890ddfe5f4d562312b9806"
export const erc20Addr    = "0x1e219609a856ff127c407cfa5c4cbcec4d56df1b"
export const boxPrice     = "0.08";
export const count        = 1;
export const port         = ":3001";
export const rpcService   = "https://matic-mumbai.chainstacklabs.com";
export const chainConfig = [{
    chainId: "0x13881", // chainId must be hexadecimal numbers
    chainName: "Polygon Testnet",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    nativeCurrency: {
        symbol: "MATIC",
        decimals: 18
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
}];
export const abi = `
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "IdList",
				"type": "uint256[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "IdList",
				"type": "uint256[]"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchaseOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "IdList",
				"type": "uint256[]"
			}
		],
		"name": "purchaseOwnerId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "purchaseOwnerId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "walletList",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "setAirdropWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "setERC20Addr",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setMaxAirdropId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setMaxNFTInBlock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setMaxPurchaseId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setMinAirdropId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setMinPurchaseId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setNFTCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "walletList",
				"type": "address[]"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "setPurchaseWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newWallet",
				"type": "address"
			}
		],
		"name": "setRecvWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "setTokenIdCount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "airdropWhitelist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc20Addr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "getAirdropWhitelist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "getPurchseWhitelist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxAirdropId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxNFTInBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxPurchaseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minAirdropId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minPurchaseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NFTCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "purchaseWhitelist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recvWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenIdCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`
export const erc20abi = `
[
	{
		"anonymous": false,
  		"inputs": [
		  			{
					  				"indexed": true,
					  				"internalType": "address",
					  				"name": "owner",
					  				"type": "address"
					  			},
		  			{
					  				"indexed": true,
					  				"internalType": "address",
					  				"name": "spender",
					  				"type": "address"
					  			},
		  			{
					  				"indexed": false,
					  				"internalType": "uint256",
					  				"name": "value",
					  				"type": "uint256"
					  			}
		  		],
	  		"name": "Approval",
	  		"type": "event"
	  	},
  	{
	  		"anonymous": false,
	  		"inputs": [
			  			{
						  				"indexed": true,
						  				"internalType": "address",
						  				"name": "previousOwner",
						  				"type": "address"
						  			},
			  			{
						  				"indexed": true,
						  				"internalType": "address",
						  				"name": "newOwner",
						  				"type": "address"
						  			}
			  		],
	  		"name": "OwnershipTransferred",
	  		"type": "event"
	  	},
  	{
	  		"anonymous": false,
	  		"inputs": [
			  			{
						  				"indexed": true,
						  				"internalType": "address",
						  				"name": "from",
						  				"type": "address"
						  			},
			  			{
						  				"indexed": true,
						  				"internalType": "address",
						  				"name": "to",
						  				"type": "address"
						  			},
			  			{
						  				"indexed": false,
						  				"internalType": "uint256",
						  				"name": "value",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "Transfer",
	  		"type": "event"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "spender",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "amount",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "approve",
	  		"outputs": [
			  			{
						  				"internalType": "bool",
						  				"name": "",
						  				"type": "bool"
						  			}
			  		],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "spender",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "subtractedValue",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "decreaseAllowance",
	  		"outputs": [
			  			{
						  				"internalType": "bool",
						  				"name": "",
						  				"type": "bool"
						  			}
			  		],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "spender",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "addedValue",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "increaseAllowance",
	  		"outputs": [
			  			{
						  				"internalType": "bool",
						  				"name": "",
						  				"type": "bool"
						  			}
			  		],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "to",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "amount",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "mint",
	  		"outputs": [],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "renounceOwnership",
	  		"outputs": [],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "recipient",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "amount",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "transfer",
	  		"outputs": [
			  			{
						  				"internalType": "bool",
						  				"name": "",
						  				"type": "bool"
						  			}
			  		],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "sender",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "address",
						  				"name": "recipient",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "uint256",
						  				"name": "amount",
						  				"type": "uint256"
						  			}
			  		],
	  		"name": "transferFrom",
	  		"outputs": [
			  			{
						  				"internalType": "bool",
						  				"name": "",
						  				"type": "bool"
						  			}
			  		],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "newOwner",
						  				"type": "address"
						  			}
			  		],
	  		"name": "transferOwnership",
	  		"outputs": [],
	  		"stateMutability": "nonpayable",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"stateMutability": "nonpayable",
	  		"type": "constructor"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "owner",
						  				"type": "address"
						  			},
			  			{
						  				"internalType": "address",
						  				"name": "spender",
						  				"type": "address"
						  			}
			  		],
	  		"name": "allowance",
	  		"outputs": [
			  			{
						  				"internalType": "uint256",
						  				"name": "",
						  				"type": "uint256"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [
			  			{
						  				"internalType": "address",
						  				"name": "account",
						  				"type": "address"
						  			}
			  		],
	  		"name": "balanceOf",
	  		"outputs": [
			  			{
						  				"internalType": "uint256",
						  				"name": "",
						  				"type": "uint256"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "decimals",
	  		"outputs": [
			  			{
						  				"internalType": "uint8",
						  				"name": "",
						  				"type": "uint8"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "name",
	  		"outputs": [
			  			{
						  				"internalType": "string",
						  				"name": "",
						  				"type": "string"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "owner",
	  		"outputs": [
			  			{
						  				"internalType": "address",
						  				"name": "",
						  				"type": "address"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "symbol",
	  		"outputs": [
			  			{
						  				"internalType": "string",
						  				"name": "",
						  				"type": "string"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	},
  	{
	  		"inputs": [],
	  		"name": "totalSupply",
	  		"outputs": [
			  			{
						  				"internalType": "uint256",
						  				"name": "",
						  				"type": "uint256"
						  			}
			  		],
	  		"stateMutability": "view",
	  		"type": "function"
	  	}
]
`
