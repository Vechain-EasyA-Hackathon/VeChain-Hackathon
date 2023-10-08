import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MintPage = () => {
  const parameters = ['Name', 'Product ID', 'Carbon Footprint', 'Quantity', 'Image', 'Data', 'Seller Name'];
  const navigate = useNavigate();

  const handleMint = () => {
    // Handle minting logic
    console.log('Minting NFT...');
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