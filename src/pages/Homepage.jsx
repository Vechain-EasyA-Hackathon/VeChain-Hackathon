import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//METAMASK
import { useSDK } from '@metamask/sdk-react';

//ethers
import { ethers } from 'ethers';

//Component imports
import Metamask from '../MetaMaskFunctions/MetaMask';

import { connect } from '../etherCalls/connect';

//Photos
import AIRJ from '../assets/AIRJ.jpeg';
import FutureShoe from '../assets/FutureShoe.jpg';
import LouisV from '../assets/LouisV.png';
import Featured from '../assets/Featured.jpeg';


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
          <h1 className="text-2xl font-bold ml-2 text-white">SustainaLink</h1>
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


      <div className="flex justify-center space-x-4 p-8 w-full">
        <Button variant="contained">Featured</Button>

        <Button variant="contained">Explore</Button>

        <Button variant="contained">Search</Button>
        <Button variant="contained">My Collection</Button>

      </div>

      <div className="flex flex-col justify-center items-center space-x-4 py-4 px-8 w-full">
        <h1 className="text-2xl font-bold text-center text-black">Featured Collection</h1>

        <div className="flex justify-center py-4 w-full">
          <Card className='flex justify-center space-x-4 py-4 px-8 w-2/3'>
            <CardActionArea>

            <CardMedia
              component="img"
              alt="green iguana"
              image={Featured}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h1 className= 'font-bold'  >Jordan Retro 1s, Limited Edition</h1>
              </Typography>
              
            </CardContent>
            </CardActionArea>

          </Card>

          

        </div>
      </div>


      <div className="flex justify-center space-x-4 py-4 px-8 w-full">
        <Card className="flex justify-center space-x-4 py-4 px-8 w-1/4">
          <CardActionArea>
            <CardMedia
              component="img"
              alt="green iguana"
              height="auto"
              image={AIRJ}
            />
            

          </CardActionArea>
        </Card>

        <Card className="flex justify-center space-x-4 py-4 px-8 w-1/4">
          <CardMedia
            component="img"
            alt="green iguana"
            image={FutureShoe}
          />
        </Card>

        <Card className="flex justify-center space-x-4 py-4 px-8 w-1/4">  
          <CardMedia
            component="img"
            alt="green iguana"
            image={LouisV}
          />
        </Card>

        {/*
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        
         */}


      </div>

   
    </div>
  );
}

export default Home;
