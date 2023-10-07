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

    struct Product {
        uint256 id;
        string name;
        string date;
        uint256 purchasedQuantity;
        uint256 quantity;
        string description;
        string image;
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
        string memory _name,
        string memory _date,
        uint256 _quantity,
        string memory _description,
        string memory _image,
        string calldata _sellerName
    ) public onlyValidSeller(msg.sender, _sellerName) {
        products[productCount++][_sellerName] = Product(
            _id,
            _name,
            _date,
            0,
            _quantity,
            _description,
            _image,
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
