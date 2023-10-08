import dotenv from 'dotenv';
import { Contract } from 'ethers';
import { ethers } from 'ethers';
import { abi } from '../../out/Seller_Product.sol/Seller_Product.json';
// dotenv.config();

// const { SELLER_PRODUCT_ADDRESS } = process.env;

// const [contract, setContract] = useState();
export async function connect(){
    alert('abi:' + abi);

    const SELLER = 0x5FbDB2315678afecb367f032d93F642f64180aa3


    const url = "http://localhost:8545";
    var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
        window.console.log("Current block number: " + result);
    });
    window.console.log("Connected to Frontend");
    const seller = new Contract(SELLER, abi, customHttpProvider);
    window.console.log('testing');
}