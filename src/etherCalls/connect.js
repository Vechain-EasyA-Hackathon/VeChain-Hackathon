import { Contract } from 'ethers';
import { Seller_Product } from '../contracts/Seller_Product.json';
// const [contract, setContract] = useState();
export async function connect(){
    var customHttpProvider = new ethers.JsonRpcProvider(url);
    customHttpProvider.getBlockNumber().then((result) => {
        console.log("Current block number: " + result);
    });
    
    const seller = new Contract(tokenAddress, Seller_Product.abi, customHttpProvider);
    console.log(seller);
}