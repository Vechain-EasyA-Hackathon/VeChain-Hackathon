import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addProduct } from '../../etherCalls/addProduct';
import { ethers, utils } from 'ethers';

const MintPage = () => {
  const parameters = ['Name', 'Product ID', 'Date', 'Description', 'Image', 'Carbon Footprint', 'Quantity', 'Image', 'Seller Name',
  'Manufacturer Name', 'Manufacturer ID', 'Manufacturer Location', 'Manufacturer Description', 'Manufacturer Image'
  ];
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  

  const handleMint = () => {
    // Replace these with the actual values you want to send
    const id = 10;
    const date = "2021-10-10";
    const purchaseQuantity = 0;
    const Quantity = 11;
    const description = "Product Description";
    const image = "Product Image";
    const data = "Product Data";
    const carbonFootprint = 0;
    // Example product ID
    const name = "Product Name";
    const prodString = "12";
    // const productDataBytes = utils.parseEther(prodString.toString());
    const manuString = "098";
    // const manufacturerDataBytes = utils.parseEther(manuString.toString());;
    const sellerName = "Seller Name";

// Create an array with the provided variables
const dataArray = [id, name, date, purchaseQuantity, Quantity, description, image, data, carbonFootprint, sellerName];

// Define the types for each element in the array
const types = ['uint256', 'string', 'string', 'uint256', 'uint256', 'string', 'string', 'string', 'uint256', 'string'];
const encodedArray = ethers.utils.defaultAbiCoder.encode(types, dataArray);
const manData = [["Joe", "Joe"],
  ["Poop", "Poop"],
  [1, 10],
  ["Canada", "Canada"],
  ["stuff", "stuff"],
  ];
console.log(typeof(["",""]));
const typesManData = 
  ['string[]',
  'string[]',
  'uint256[]',
  'string[]',
  'string[]'];

    console.log("accepted");
    const manEncode = ethers.utils.defaultAbiCoder.encode(typesManData, manData);
    console.log(manEncode);
    // Call the addProduct function with the appropriate arguments
    addProduct(id, name, encodedArray, manEncode, sellerName);
  };

  const handleClick = () => {
    navigate('/seller/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-5">
      <nav className="bg-blue-500 p-4 flex items-center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back to Dashboard
        </Button>
        <div className="flex-grow text-white text-center font-bold text-2xl">
          Add a Product
        </div>
      </nav>

      <div className="max-w-lg mx-auto mt-5 p-5 border border-gray-300 rounded-lg text-center">
        {parameters.map((param, index) => (
          <TextField
            key={index}
            label={param}
            fullWidth
            variant="outlined"
            margin="normal"
            className="mb-3"
            onChange={(event) => {
              setProductData({ ...productData, [param]: event.target.value });
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-3">
        <Button
          variant="contained"
          color="primary"
          onClick={handleMint}
        >
          Mint
        </Button>
      </div>
    </div>
  );
};

export default MintPage;
