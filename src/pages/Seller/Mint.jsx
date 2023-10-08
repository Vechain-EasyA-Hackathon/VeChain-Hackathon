import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addProduct } from '../../etherCalls/addProduct';
import { ethers } from 'ethers';

const MintPage = () => {
  const parameters = [
    'Product ID',
    'Name',
    'Date',
    'Description',
    'Image',
    'Carbon Footprint',
    'Quantity',
    'Data',
    'Seller Name',
    'Manufacturer Footprint',
    'Source Materials',
    'Source Location',
    'Manufacturer Description'
  ];
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});

  const handleInputChange = (param, value) => {
    setProductData({ ...productData, [param]: value });
  };

    const handleMint = () => {
      
      const dataArray = [
        productData['Product ID'],
        productData['Name'],
        productData['Date'],
        productData['Quantity'],
        productData['Quantity'],
        productData['Description'],
        productData['Image'],
        productData['Data'],
        productData['Manufacturer Footprint'],
        productData['Seller Name']
      ];
      console.log(dataArray);
      const types = [
        'uint256',
        'string',
        'string',
        'uint256',
        'uint256',
        'string',
        'string',
        'string',
        'uint256',
        'string'
      ];
      console.log(typeof(types[1]));
      const encodedArray = ethers.defaultAbiCoder.encode(types, dataArray);
      //console.log(ethers.utils.defaultAbiCoder.decode(encodedArray));
      const manData = [
        productData['Seller Name'],
        productData['Source Materials'],
        productData['Manufacturer Footprint'],
        productData['Source Location'],
        productData['Manufacturer Description']];

      const typesManData = [
        'string',
        'string',
        'uint256',
        'string',
        'string',
      ];
      const manEncode = ethers.defaultAbiCoder.encode(typesManData, manData);
    
      addProduct(
        dataArray[0], // Product ID
        dataArray[1], // Name
        encodedArray,
        manEncode,
        dataArray[9] // Seller Name
      );
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
            onChange={(event) => handleInputChange(param, event.target.value)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-3">
        <Button variant="contained" color="primary" onClick={handleMint}>
          Mint
        </Button>
      </div>
    </div>
  );
};

export default MintPage;
