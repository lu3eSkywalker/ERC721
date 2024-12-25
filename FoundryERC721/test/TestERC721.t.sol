// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Test, console} from "forge-std/Test.sol";
import {ERC721} from "../src/ERC721.sol";

contract ERC721Test is Test {
    ERC721 erc721;

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    function setUp() public {
        erc721 = new ERC721("GTA Vice City", "GTA VC", 0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    }

    function test_mintTo() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(address(this), "https://api.jsonserve.com/Bk9lY8");
        assertEq(erc721.ownerOf(0), address(this), "OK");
    }

    function test_transfer() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8");

        vm.expectEmit(true, true, false, true);
        emit Transfer(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);

        erc721.transferFunction(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
        assertEq(erc721.ownerOf(0), 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, "OK");
    }

    function test__Approval() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8");

        vm.expectEmit(true, true, false, true);
        emit Approval(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);

        erc721.approve(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);

        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
        assertEq(erc721.ownerOf(0), 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, "OK");
    }

    function test__ApprovalForAll() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 0
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 1
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 2

        vm.expectEmit(true, true, false, true);
        emit ApprovalForAll(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, true);
        
        erc721.setApprovalForAll(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, true);

        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 2);
    }


    // Negative Tests
    function testFail_mintTo() public {
        erc721.mintTo(address(0), "https://api.jsonserve.com/Bk9lY8");
        assertEq(erc721.ownerOf(0), address(0), "OK");
    }

    function testFail_transfer() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8");
        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc721.transferFunction(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
    }

    function testFail_approve() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8");

        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8,0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
    }

    function testFail_approveAll() public {
        vm.startPrank(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 0
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 1
        erc721.mintTo(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "https://api.jsonserve.com/Bk9lY8"); // TokenId 2

        vm.startPrank(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

        erc721.setApprovalForAll(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, true);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 1);
        erc721.transferFrom(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 2);
    }
}