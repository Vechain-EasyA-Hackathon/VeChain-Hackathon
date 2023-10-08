import { Contract } from 'ethers';
import { ethers } from 'ethers';
import { abi } from '../../out/Seller_Product.sol/Seller_Product.json';

const SELLER_PRODUCT_ADDRESS = import.meta.env.VITE_SELLER_PRODUCT_ADDRESS;

export async function connect() {
    window.console.log("Connected to Frontend");
    const url = "http://localhost:8545";
    var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
        window.console.log("Current block number: " + result);
    });
    const seller = new Contract(SELLER_PRODUCT_ADDRESS, abi, customHttpProvider);
}