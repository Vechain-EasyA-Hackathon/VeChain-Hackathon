// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

error MintPriceNotPaid();
error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract NFT is ERC721 {
    using Strings for uint256;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlySellerProduct() {
        require(
            msg.sender == sellerProduct,
            "Only seller can call this function"
        );
        _;
    }

    string public baseURI;
    uint256 public currentTokenId;
    uint256 public TOTAL_SUPPLY;
    address public sellerProduct;
    address public owner;

    constructor(
        string memory _name,
        string memory _id,
        string memory _baseURI,
        uint256 _totalSupply,
        address _owner
    ) ERC721(_name, _id) {
        baseURI = _baseURI;
        sellerProduct = msg.sender;
        owner = _owner;
        TOTAL_SUPPLY = _totalSupply;
    }

    function mintTo() public payable onlySellerProduct {
        for (uint256 i = currentTokenId; i < TOTAL_SUPPLY; ++i) {
            _safeMint(owner, i);
        }

        currentTokenId = TOTAL_SUPPLY;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function returnMintCount() public view returns (uint256) {
        return currentTokenId;
    }
}
