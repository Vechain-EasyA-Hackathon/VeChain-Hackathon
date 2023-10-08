import React from 'react'

//MUI STUFF
import Button from '@mui/material/Button';

//METAMASK
import { useSDK } from '@metamask/sdk-react';

//ethers
import { ethers } from 'ethers';

//Component imports
import Metamask from '../MetaMaskFunctions/MetaMask';

import { connect } from '../etherCalls/connect';



function Home() {

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-2 text-white">Green Clothing Company</h1>
        </div>
        <div className="flex items-center">
          
          <Button variant="contained" onClick={connect}>Connect</Button>

        </div>
      </div>

      <div className="flex justify-center space-x-4 py-4 px-8 w-full">
        <Button variant="contained" onClick={Metamask}>Featured</Button>

        <Button variant="contained" onClick={Metamask}>Explore</Button>

        <Button variant="contained" onClick={Metamask}>Search</Button>
      </div>

      

      

    
    
    
    </div>

  )
}

export default Home