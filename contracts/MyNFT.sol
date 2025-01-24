// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId; // Token counter
    mapping(string => uint8) private existingURIs;

    constructor(address initialOwner)
        ERC721("MyNFT", "MNFT")
        Ownable(initialOwner)
    {}

    // function _baseURI() internal pure override returns (string memory) {
    //     return "ipfs://";
    // }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function isNFTOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function payToMint( address recipient, string memory metadataURI) public payable returns (uint256){
        require(existingURIs[metadataURI] != 1, "NFT already exists");
        require(msg.value >= 0.1 ether, "Insufficient funds");

        uint256 newItemId = _nextTokenId;
        _nextTokenId++;
        existingURIs[metadataURI] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    function count() public view returns (uint256) {
        return _nextTokenId;
    }
}