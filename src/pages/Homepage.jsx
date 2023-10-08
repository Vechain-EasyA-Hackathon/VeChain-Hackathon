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

      

    
    
      <Button variant="contained">Hello world</Button>
    
    </div>

  )
}

export default Home