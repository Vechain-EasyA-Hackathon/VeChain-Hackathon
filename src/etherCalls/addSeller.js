import { Contract } from 'ethers';
import { ethers } from 'ethers';
import { abi } from '../../out/Seller_Product.sol/Seller_Product.json';

const SELLER_PRODUCT_ADDRESS = import.meta.env.VITE_SELLER_PRODUCT_ADDRESS;

export async function addSeller(sellerName, sellerAddress) {
    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Initialize ethers provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Load the contract
      const sellerProductContract = new ethers.Contract(SELLER_PRODUCT_ADDRESS, abi, provider.getSigner());
      
      // Call the contract function
      const tx = await sellerProductContract.addSeller(sellerName, sellerAddress);
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      console.log('Seller added successfully!');
    } catch (error) {
      console.error('Error connecting to the Ethereum network:', error);
      throw error;
    }
  }