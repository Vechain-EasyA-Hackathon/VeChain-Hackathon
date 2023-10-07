// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Seller_Product} from "@contracts/Seller_Product.sol";

contract Seller_ProductTest is Test {
    struct seller {
        string name;
        address addr;
    }

    Seller_Product public seller_product;

    address public owner;
    seller seller1 = seller("UMBC", makeAddr("UMBC"));

    function setUp() public {
        seller_product = new Seller_Product();
        owner = address(this);
    }

    function test_Owner() public {
        assertEq(seller_product.owner(), address(this));
    }

    function test_AddSeller() public {
        seller_product.addSeller(seller1.name, seller1.addr);
        assertEq(seller_product.sellerAddress(seller1.name), seller1.addr);
        assertEq(seller_product.sellerName(seller1.addr), seller1.name);
    }

    function test_AddProduct() public {
        test_AddSeller();
        vm.prank(seller1.addr);
        seller_product.addProduct(
            1,
            "DEEZ NUTS",
            "2021-01-01",
            10,
            "NEED I DESCRIBE THIS",
            "LOL",
            "SOME DATA",
            500,
            seller1.name
        );

        uint256 prodCount = seller_product.productCount();
        assertEq(prodCount, 1);

        Seller_Product.Product memory prod = seller_product.getProductName(
            0,
            seller1.name
        );

        assertEq(prod.name, "DEEZ NUTS");
    }
}
