// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Seller_Product} from "@contracts/Seller_Product.sol";
import {NFT} from "@contracts/Product_NFT.sol";

contract Seller_ProductTest is Test {
    struct User {
        string name;
        address addr;
    }

    Seller_Product public seller_product;

    address public owner;
    User client1 = User("Bob", makeAddr("Bob"));
    User seller1 = User("UMBC", makeAddr("UMBC"));

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

        string[] memory manufacturerName = new string[](3);
        manufacturerName[0] = "Nike";
        manufacturerName[1] = "Grove";

        string[] memory sourceMaterials = new string[](3);
        manufacturerName[0] = "Leather, Rubber";
        manufacturerName[1] = "Plastic";

        uint256[] memory carbonFootprint = new uint256[](3);
        carbonFootprint[0] = 600000000000;
        carbonFootprint[1] = 200000000000;
        string[] memory sourceLocation = new string[](3);
        sourceLocation[0] = "Indonesia";
        sourceLocation[1] = "China";

        string[] memory manufacturerData = new string[](3);
        manufacturerData[0] = "Not outsourced";
        manufacturerData[1] = "Subsidiary of Nike";

        Seller_Product.ManufacturerData
            memory manufacturerDataObj1 = Seller_Product.ManufacturerData(
                manufacturerName[0],
                sourceMaterials[0],
                carbonFootprint[0],
                sourceLocation[0],
                manufacturerData[0]
            );

        Seller_Product.ManufacturerData
            memory manufacturerDataObj2 = Seller_Product.ManufacturerData(
                manufacturerName[1],
                sourceMaterials[1],
                carbonFootprint[1],
                sourceLocation[1],
                manufacturerData[1]
            );

        Seller_Product.ProductData memory productData = Seller_Product
            .ProductData(
                1,
                "Air Jordan",
                30,
                "Shoes",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.s3gF8oGNpPHKs8aEFrB-pAHaFM%26pid%3DApi&f=1&ipt=6a00d0917157c8dbdf2e99297f92f0fbe318da4d165497f0f0193d370fc123b5&ipo=images",
                "Air Jordan is a line of basketball shoes produced by Nike, Inc. Related apparel and accessories are marketed under Jordan Brand. Sizes: 8-12",
                200000000000000000
            );

        bytes memory productDecodeBytes = abi.encode(productData);
        bytes[] memory manufacturerDataBytes = new bytes[](2);

        manufacturerDataBytes[0] = abi.encode(manufacturerDataObj1);
        manufacturerDataBytes[1] = abi.encode(manufacturerDataObj2);

        vm.prank(seller1.addr);
        seller_product.addProduct(
            1,
            "Air Jordan",
            productDecodeBytes,
            manufacturerDataBytes,
            "Nike",
            seller1.name
        );

        assertEq(seller_product.productCount(), 1);

        Seller_Product.Product memory prod = seller_product.getProduct(
            seller1.name,
            0
        );

        assertEq(prod.name, "Air Jordan");
    }

    function test_NFT() public {
        test_AddProduct();
        vm.prank(seller1.addr);
        NFT nftContract = NFT(seller_product.NFTs(seller1.addr, 1));
        uint256 nftMinted = nftContract.TOTAL_SUPPLY();

        assertEq(nftMinted, 30);

        address original_owner = nftContract.ownerOf(0);

        vm.prank(seller1.addr);
        nftContract.transferToClient(client1.addr);

        address new_owner = nftContract.ownerOf(0);

        assertNotEq(original_owner, new_owner);
        assertEq(original_owner, seller1.addr);
    }
}
