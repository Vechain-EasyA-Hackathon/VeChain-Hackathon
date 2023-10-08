import { ethers } from 'ethers';
import { abi } from '../../out/Seller_Product.sol/Seller_Product.json';


const SELLER_PRODUCT_ADDRESS = import.meta.env.VITE_SELLER_PRODUCT_ADDRESS;

export async function connect() {
    try {
        console.log("Connecting to Frontend");

        const url = "http://localhost:8545";
        const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

        // Get the current block number
        const currentBlockNumber = await customHttpProvider.getBlockNumber();
        console.log("Current block number: " + currentBlockNumber);

        const seller = new ethers.Contract(SELLER_PRODUCT_ADDRESS, abi, customHttpProvider);
        const sellerAdd = await seller.addSeller("Darsh" ,"0x90F79bf6EB2c4f870365E785982E1f101E93b906");
        console.log(seller.sellerName("Darsh"), "0x90F79bf6EB2c4f870365E785982E1f101E93b906");

        const count = await seller.getProductCount();
        console.log("Product Count: " + count.toString());
        console.log("Connected to Frontend");
        return seller;
    } catch (error) {
        console.error("Error connecting to the Ethereum network:", error);
        throw error;
    }
}