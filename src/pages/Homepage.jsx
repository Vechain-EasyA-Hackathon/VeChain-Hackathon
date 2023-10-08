import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import { addSeller } from '../etherCalls/addSeller';


function Home() {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    async function fetchAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await provider.listAccounts();
        setUserAddress(accounts[0]); // Assuming the first account is the user's address
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }

    fetchAddress();
  }, []);

  const handleDisconnect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_disconnect' });
      setUserAddress(null); // Disconnect by setting the address to null
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const formattedAddress = userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : '';

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-2 text-white">Green Clothing Company</h1>
        </div>
        <div className="flex items-center">
          {userAddress ? (
            <div className="flex flex-col items-center ml-4">
              <span className="text-sm mb-2">{formattedAddress}</span>
              <Button variant="contained" onClick={handleDisconnect} className="bg-red-500">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
              Connect
            </Button>
          )}
        </div>
        <Button variant="contained" onClick={()=>addSeller("Nike", userAddress)} className="bg-red-500">
                addSeller
              </Button>
      </div>
    </div>
  );
}

export default Home;
