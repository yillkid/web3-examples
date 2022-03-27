// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.4.2/security/Pausable.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
// For ERC20 token transfer
import "@openzeppelin/contracts@4.4.2/token/ERC20/ERC20.sol";

contract CMS is ERC721, ERC721URIStorage, Pausable, Ownable {
    /* Variables */
    // Address for receiving ERC20 tokens
    address public recvWallet;
    // Counter for token ID
    uint256 public tokenIdCount;
    // The mapping of limiting the normal user mintable NFT count
    mapping (address => uint256) normalListCount;
    bool public normalListOff;
    // Control the amount of exact purchase number
    bool public exactCountOff;
    uint256 public exactCount;

    // Control the upper limit of buying NFTs of each address
    uint256 public limitPerAddr;
    // The amount of mintable NFTs
    uint256 public NFTCount;
    // Maximum NFT count
    uint256 public maxNFTCount;
    // ERC20 contract address
    address public erc20Addr;
    // The cost of each NFT
    uint256 public NFTCost;

    /*Events*/
    event Mint(uint256[] tokenIds);

    constructor()
        ERC721("Classic of Mountains and Seas", "CMS")
    {
        recvWallet = 0xE5b3c06873D4C2da2598b67535331A12a0cCc3f4;  // Default: MetaCityM wallet address 0xe9Ce9A78055776Da9618a9FF0Bf3244B7682BdC8
        tokenIdCount = 1;             // Default: Based on the previous selling amount, or 1
        normalListOff = false;        // Default: false
        exactCountOff = true;         // Default: true
        exactCount = 2;               // Default: 2
        limitPerAddr = 2;             // Default: 2
        NFTCount = 13400;             // Default: Based on each selling
        maxNFTCount = 17000;          // Default: 17000
        erc20Addr = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;   // Default: 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
        NFTCost = 0.08 ether;         // Default: 0.08 ether
        pause();                      // Default: activate
    }

    /* CMS */
    function purchase(uint256 count) public payable whenNotPaused returns (uint256[] memory) {
        require(msg.sender == owner() || normalListOff || normalListCount[msg.sender] + count <= limitPerAddr, "You can not buy more NFTs than the limit.");
        require(NFTCount > 0, "No more NFT mintable.");
        require(count <= NFTCount, "The required NFT mint amount is larger than the rest of the mintable NFTs.");
        require(tokenIdCount + count <= maxNFTCount, "The token ID would exceed the limit.");
        // For ERC20 token transfer
        require(msg.sender == owner() || IERC20(erc20Addr).balanceOf(msg.sender) >= NFTCost * count, "User balance is not enough for buying NFTs.");
        require(msg.sender == owner() || IERC20(erc20Addr).allowance(msg.sender, address(this)) >= NFTCost * count, "Transfer allowance is not enough.");
        require(msg.sender == owner() || IERC20(erc20Addr).transferFrom(msg.sender, recvWallet, NFTCost * count), "Transfer is failed.");

        uint256[] memory tokenIds = new uint256[](count);
        for (uint256 i=0; i<count; i++) {
            tokenIds[i] = tokenIdCount;
            _safeMint(msg.sender, tokenIdCount);
            tokenIdCount++;
            NFTCount--;
        }
        if (!normalListOff) {
            normalListCount[msg.sender] += count;
        }

        emit Mint(tokenIds);
        return tokenIds;
    }

    // purchase function for owner only and not pausable
    function purchaseOwner(uint256 count) public payable onlyOwner returns (uint256[] memory) {
        require(NFTCount > 0, "No more NFT mintable.");
        require(count <= NFTCount, "The required NFT mint amount is larger than the rest of the mintable NFTs.");
        require(tokenIdCount + count <= maxNFTCount, "The token ID would exceed the limit.");

        uint256[] memory tokenIds = new uint256[](count);
        for (uint256 i=0; i<count; i++) {
            tokenIds[i] = tokenIdCount;
            _safeMint(msg.sender, tokenIdCount);
            tokenIdCount++;
            NFTCount--;
        }

        emit Mint(tokenIds);
        return tokenIds;
    }

    // Function for setting received wallet address
    function setRecvWallet(address newWallet) public onlyOwner {
        recvWallet = newWallet;
    }

    // Function for enabling normalList
    function setNormalListOff(bool status) public onlyOwner {
        normalListOff = status;
    }

    // Function for enabling exact count
    function setExactCountOff(bool status) public onlyOwner {
        exactCountOff = status;
    }

    // Function for setting exact count
    function setExactCount(uint256 value) public onlyOwner {
        exactCount = value;
    }

    // Function for setting limit of mintable NFT of each address
    function setLimit(uint256 newLimit) public onlyOwner {
        limitPerAddr = newLimit;
    }

    // Function for setting the amount of mintable NFT
    function setNFTCount(uint256 value) public onlyOwner {
        NFTCount = value;
    }

    // Function for setting the maximum of mintable NFT
    function setMaxNFTCount(uint256 value) public onlyOwner {
        maxNFTCount = value;
    }

    // Function for setting the ERC20 contract address
    function setERC20Addr(address addr) public onlyOwner {
        erc20Addr = addr;
    }

    // Function for setting the cost of NFT
    function setNFTCost(uint256 value) public onlyOwner {
        NFTCost = value;
    }

    /* ERC721 */
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "http://140.127.196.91:6001/?id=";
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
