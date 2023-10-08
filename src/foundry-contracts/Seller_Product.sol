// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

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
        ManufacturerData manufacturerData;
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

    mapping(uint256 => mapping(string => Product)) public products;
    uint256 public productCount;
    address public owner;

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
        products[productCount++][_sellerName] = Product(
            _id,
            _name,
            _productDataBytes,
            _manufacturerDataBytes,
            _sellerName
        );
    }

    function getProductName(
        uint256 _id,
        string memory _sellerName
    ) public view returns (Product memory) {
        return (products[_id][_sellerName]);
    }
}
