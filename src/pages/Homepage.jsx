import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIRJ from '../assets/AIRJ.jpeg';
import Featured from '../assets/Featured.jpeg';
import FutureShoe from '../assets/FutureShoe.jpg';
import LouisV from '../assets/LouisV.png';

import Rolex from '../assets/Rolex.jpeg';
import Balenciaga from '../assets/Balenciaga.webp';


const featuredCollection = [
  {
    image: Featured,
    name: 'Jordan 1 Retro - Limited Edition',
  },
  {
    image: AIRJ,
    name: 'Nike Air Force One - Louis Vuitton',
  },
  {
    image: FutureShoe,
    name: 'Nike Air Mag - Back to the Future',
  },
  {
    image: LouisV,
    name: 'Louis Vuitton - Bag',
  },
  {
    image: Rolex,
    name: 'Rolex - Watch',
  },
  {
    image: Balenciaga,
    name: 'Balenciaga - Shirt',
  },
];

const Home = () => {
  let [userAddress, setUserAddress] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("signer", signer);
        const address = signer.address;
        setUserAddress(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }

    fetchData();
  }, []);
  const formattedAddress = userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : null;

  const handleDisconnect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_disconnect' });
      setUserAddress(null);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const myCollection = () => {
    navigator('/my-collection');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-2 text-white">SustainaLink</h1>
        </div>

        <div className="flex space-x-4 p-2">
          <Button variant="contained" className="text-white">
            Featured
          </Button>
          <Button variant="contained" className="text-white">
            Explore
          </Button>
          <Button variant="contained" className="text-white">
            Search
          </Button>
          <Button variant="contained" onClick={myCollection} className="text-white">
            My Collection
          </Button>
          <div className="flex items-center space-x-4">
            {userAddress ? (
              <div className="flex flex-col items-center ml-4">
                <span className="text-sm mb-2">{formattedAddress}</span>
                <Button variant="contained" onClick={handleDisconnect} className="bg-red-500">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button variant="contained" onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-x-4 py-8 px-8 w-full">
        <h1 className="text-2xl font-bold text-center text-black mb-8">Featured Collection</h1>
        <div className="flex flex-wrap justify-center items-center">
          {featuredCollection.map((item, index) => (
        <Card key={index} className="flex flex-col max-w-xs m-4">
          <CardActionArea className="flex flex-col flex-grow justify-center">
            <CardMedia component="img" alt="NFT" className="flex-grow" image={item.image} />
            
          </CardActionArea>
          <div className='py-5 text-center'>
            <Typography gutterBottom variant="h5" component="div" className="font-bold">
                {item.name}
            </Typography>
        </div>
      </Card>


          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
