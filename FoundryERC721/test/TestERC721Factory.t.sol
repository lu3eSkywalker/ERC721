// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {ERC721Factory} from "../src/ERC721Factory.sol";
import {ERC721} from "../src/ERC721.sol";

contract ERC721FactoryTest is Test {
    ERC721Factory n;

    function setUp() public {
         n = new ERC721Factory();
    }

    function test_createERC721() public {
        n.createERC721("Mad Lads", "MLADS");
    }

    function test_getUserContracts() public {
        address owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        n.createERC721("Mad Lads", "MLADS");
        ERC721[] memory erc721array = n.getUserContracts(owner);
        assertEq(address(erc721array[0]), address(n.allERC721Contracts(0)), "OK");
        // assertEq(address(erc721array[0]), address(n.userERC721Contracts), "OK");
    }

    function test_getAllContracts() public {
        n.createERC721("Mad Lads", "MLADS");
        ERC721[] memory erc721array = n.getAllContracts();
        assertEq(address(erc721array[0]), address(n.allERC721Contracts(0)), "OK");
    }
}