import { Contract, ethers } from 'ethers';

const SELLER_PRODUCT_ADDRESS = import.meta.env.VITE_SELLER_PRODUCT_ADDRESS;

export async function connect() {
    window.console.log("Connected to Frontend");
    const url = "http://localhost:8545";
    var customHttpProvider = new ethers.JsonRpcProvider(url);
    window.console.log("Connected to Backend");
    customHttpProvider.getBlockNumber().then((result) => {
        window.console.log("Current block number: " + result);
        window.console.log("Connected to Frontend");

    });
    const seller = new Contract(SELLER_PRODUCT_ADDRESS, Seller_Product.abi, customHttpProvider);
    seller.getProductCount().then((result) => {
        window.console.log("count: " + result);
    });
    // await seller.addProduct(uint256(10), "Prod Name", "Today", uint256(100), "desc", "image", "category", uint256(25), "seller_name");
    // const product = await seller.getProduct(uint256(10), "seller_name");
    // console.log(product);
    window.console.log(SELLER_PRODUCT_ADDRESS);
}