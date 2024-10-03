// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";


// This Contract is used to deploy new ERC721 contracts adn keep track of those contract deployments
// This Contract allows users to create new custom ERC721 token contracts, The factory then keeps track of which user deployed which ERC721 contracts and all deployed ERC721 Contracts.

contract ERC721Factory {
    // Store created contracts
    ERC721[] public allERC721Contracts;

    mapping(address => ERC721[]) public userERC721Contracts; // This mapping associates an address(user) with an array of ERC721 contracts.
    // For e.g., userERC721Contracts[Alice] = [Contract1, Contract2]
    // userERC721Contracts[Bob] = [Contract3]


    event ERC721Created(address indexed owner, address contractAddress, string name, string symbol);

    function createERC721(string memory _name, string memory _symbol) public {
        // Deploy a new ERC721 contract
        ERC721 newERC721 = new ERC721(_name, _symbol, msg.sender);

        // Store the contract reference in factory mappings
        allERC721Contracts.push(newERC721);
        userERC721Contracts[msg.sender].push(newERC721);

        // Emit event
        emit ERC721Created(msg.sender, address(newERC721), _name, _symbol);
    }

    // Function to get all contracts created by a user
    function getUserContracts(address _user) public view returns (ERC721[] memory) {
        return userERC721Contracts[_user];
    }

    // Function to get total contracts created
    function getAllContracts() public view returns (ERC721[] memory) {
        return allERC721Contracts;
    }
}