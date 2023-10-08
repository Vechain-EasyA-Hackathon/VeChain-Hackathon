// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Seller_Product} from "@contracts/Seller_Product.sol";
import {NFT} from "@contracts/Product_NFT_Mint.sol";

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

        string[] memory manufacturerName = new string[](3);
        manufacturerName[0] = "A";
        manufacturerName[1] = "B";

        string[] memory sourceMaterials = new string[](3);
        manufacturerName[0] = "Leather";
        manufacturerName[1] = "Cotton";

        uint256[] memory carbonFootprint = new uint256[](3);
        carbonFootprint[0] = 10;
        carbonFootprint[1] = 11;
        string[] memory sourceLocation = new string[](3);
        sourceLocation[0] = "China";
        sourceLocation[1] = "Taiwan";

        string[] memory manufacturerData = new string[](3);
        manufacturerData[0] = "great";
        manufacturerData[1] = "nice";

        Seller_Product.ProductData memory productData = Seller_Product
            .ProductData(
                1,
                "DEEZ NUTS",
                "2021-01-01",
                10,
                500,
                "NEED I DESCRIBE THIS",
                "LOL",
                "SOME DATA",
                10,
                seller1.name
            );

        Seller_Product.ManufacturerData
            memory manufacturerDataObj = Seller_Product.ManufacturerData(
                manufacturerName,
                sourceMaterials,
                carbonFootprint,
                sourceLocation,
                manufacturerData
            );

        bytes memory productDecodeBytes = abi.encode(productData);
        bytes memory manufacturerDataBytes = abi.encode(manufacturerDataObj);

        vm.prank(seller1.addr);
        seller_product.addProduct(
            1,
            "DEEZ NUTS",
            productDecodeBytes,
            manufacturerDataBytes,
            seller1.name
        );

        assertEq(seller_product.productCount(), 1);

        Seller_Product.Product memory prod = seller_product.getProduct(
            seller1.name,
            0
        );

        assertEq(prod.name, "DEEZ NUTS");
    }

    function test_NFT() public {
        test_AddProduct();
        vm.prank(seller1.addr);
        NFT nftContract = NFT(seller_product.NFTs(seller1.addr, 1));

        uint256 nftMinted = nftContract.returnMintCount();

        assertEq(nftMinted, 500);
    }
}
