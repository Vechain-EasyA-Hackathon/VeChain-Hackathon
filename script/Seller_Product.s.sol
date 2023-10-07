// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {Seller_Product} from "@contracts/Seller_Product.sol";

contract DeploySeller_ProductScript is Script {
    Seller_Product seller_product;

    uint256 deployerPrivateKey;

    function setUp() public {
        deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    }

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        seller_product = new Seller_Product();
        vm.stopBroadcast();
    }
}
