// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import {NFT} from "./Product_NFT_Mint.sol";

contract Seller_Product {
    modifier onlyValidSeller(
        address _sellerAddress,
        string calldata _sellerName
    ) {
        require(
            keccak256(abi.encode(sellerName[_sellerAddress])) ==
                keccak256(abi.encode(_sellerName)),
            "Only seller can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    struct ManufacturerData {
        string[] manufacturerName;
        string[] sourceMaterials;
        uint256[] carbonFootprint;
        string[] sourceLocation;
        string[] miscData;
    }

    struct ProductData {
        uint256 id;
        string name;
        string date;
        uint256 purchasedQuantity;
        uint256 quantity;
        string description;
        string image;
        string data;
        uint256 carbonFootprint;
        string sellerName;
    }

    struct Product {
        uint256 id;
        string name;
        bytes productDecode;
        bytes manufacturerData;
        string sellerName;
    }

    mapping(string => address) public sellerAddress;
    mapping(address => string) public sellerName;

    mapping(string => mapping(uint256 => Product)) public products;
    mapping(address => mapping(uint256 => address)) public NFTs;
    uint256 public productCount;
    address public owner;

    event ProductAdded(
        uint256 id,
        string name,
        bytes productDecode,
        bytes manufacturerData,
        string sellerName
    );

    event NFTCreated(
        address createdBy,
        address nftContractAddress,
        uint256 tokenId,
        string name,
        string id,
        string baseURI,
        uint256 totalSupply
    );

    constructor() {
        owner = msg.sender;
    }

    function addSeller(
        string memory _sellerName,
        address _sellerAddress
    ) public onlyOwner {
        sellerAddress[_sellerName] = _sellerAddress;
        sellerName[_sellerAddress] = _sellerName;
    }

    function addProduct(
        uint256 _id,
        string calldata _name,
        bytes calldata _productDataBytes,
        bytes calldata _manufacturerDataBytes,
        string calldata _sellerName
    ) public onlyValidSeller(msg.sender, _sellerName) {
        products[_sellerName][productCount++] = Product(
            _id,
            _name,
            _productDataBytes,
            _manufacturerDataBytes,
            _sellerName
        );

        createNFTs(_productDataBytes);

        emit ProductAdded(
            _id,
            _name,
            _productDataBytes,
            _manufacturerDataBytes,
            _sellerName
        );
    }

    function createNFTs(bytes calldata _productDataBytes) internal {
        ProductData memory productData = abi.decode(
            _productDataBytes,
            (ProductData)
        );

        NFT nft = new NFT(
            productData.name,
            string(abi.encode(productData.id)),
            productData.image,
            productData.quantity,
            msg.sender
        );

        NFTs[msg.sender][productData.id] = address(nft);

        nft.mintTo();

        emit NFTCreated(
            msg.sender,
            address(nft),
            productData.id,
            productData.name,
            string(abi.encode(productData.id)),
            productData.image,
            productData.quantity
        );
    }

    function getProduct(
        string memory _sellerName,
        uint256 _id
    ) public view returns (Product memory) {
        return (products[_sellerName][_id]);
    }

    function getProductCount() public view returns (uint256) {
        return productCount;
    }
}
