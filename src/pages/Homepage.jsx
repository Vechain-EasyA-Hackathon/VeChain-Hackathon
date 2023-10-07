import React from 'react'
import Button from '@mui/material/Button';

function Home() {
  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-2 text-white">Green Clothing Company</h1>
        </div>
        <div className="flex items-center">
          <Button variant="contained">Connect Wallet</Button>
        </div>
      </div>
    
    
      <Button variant="contained">Hello world</Button>
    
    </div>

  )
}

export default Home