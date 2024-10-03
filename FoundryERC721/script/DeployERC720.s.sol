// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {ERC721} from "../src/ERC721.sol";
import {ERC721Factory} from "../src/ERC721Factory.sol";

contract DeployERC720 is Script {
    function run() external returns (ERC721Factory) {

        vm.startBroadcast();

        ERC721Factory erc721Factory = new ERC721Factory();

        vm.stopBroadcast();

        return erc721Factory;

    }
}