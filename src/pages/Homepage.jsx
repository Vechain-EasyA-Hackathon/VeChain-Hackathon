import React from 'react'

//MUI STUFF
import Button from '@mui/material/Button';

//METAMASK
import { useSDK } from '@metamask/sdk-react';

//ethers
import { ethers } from 'ethers';

//Component imports
import Metamask from '../MetaMaskFunctions/MetaMask';



function Home() {

  //MetaMask login stuff
  const [account, setAccount] = React.useState(null);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      console.log(`connecting...`);
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      console.log(`connected:`, accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const disconnect = async () => {
    try {
      console.log(`disconnecting...`);
      await sdk?.disconnect();
      setAccount(null);
      console.log(`disconnected`);
    } catch(err) {
      console.warn(`failed to disconnect..`, err);
    }
  }



  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-2 text-white">Green Clothing Company</h1>
        </div>
        <div className="flex items-center">
          
          <Metamask />
          
        </div>
      </div>

    
    
      <Button variant="contained">Hello world</Button>
    
    </div>

  )
}

export default Home