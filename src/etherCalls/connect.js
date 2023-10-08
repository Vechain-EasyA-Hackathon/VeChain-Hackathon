import dotenv from 'dotenv';
import { Contract } from 'ethers';
import { Seller_Product } from '../../out/Seller_Product.sol/Seller_Product.json';
dotenv.config();

const { SELLER_PRODUCT_ADDRESS } = process.env;

// const [contract, setContract] = useState();
export async function connect(){
    const url = "http://localhost:8545";
    var customHttpProvider = new ethers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
        console.log("Current block number: " + result);
    });
    console.log("Connected to Frontend");
    const seller = new Contract(SELLER_PRODUCT_ADDRESS, Seller_Product.abi, customHttpProvider);
    console.log(seller.address);
}