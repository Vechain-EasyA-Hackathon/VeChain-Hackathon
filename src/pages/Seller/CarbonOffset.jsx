import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <h1 className="text-3xl font-bold mb-6 text-center text-white">SustainaLink</h1>
  );
};

function CarbonOffset() {
  const handleBurnClick = () => {
    console.log('Burn clicked!');
  };

  const handleConnectWalletClick = () => {
    console.log('Connect wallet clicked!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-emerald-500 p-8">
      <div className="flex justify-between w-full">
        <Header />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleConnectWalletClick}
        >
          Connect Wallet
        </Button>
      </div>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        bgcolor="white"
        boxShadow={2}
        borderRadius={8}
        maxWidth={400}
        width="90%"
        mt={8}
      >
        <h2 className="text-xl font-bold mb-4">Seamless Carbon Offset</h2>

        <TextField
          label="Burn Carbon Credits"
          variant="outlined"
          className="mb-4"
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBurnClick}
          className="mb-2"
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default CarbonOffset;
