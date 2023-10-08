import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import AIRJ from '../assets/AIRJ.jpeg';
import FutureShoe from '../assets/FutureShoe.jpg';
import LouisV from '../assets/LouisV.png';
import Featured from '../assets/Featured.jpeg';

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
  // Add more featured items as needed
];

const Home = () => {
  const [userAddress, setUserAddress] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }

    fetchData();
  }, []);
  const formattedAddress = userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : '';

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
        <div className="flex flex-wrap justify-center">
          {featuredCollection.map((item, index) => (
            <Card key={index} className="max-w-xs m-4">
              <CardActionArea>
                <CardMedia component="img" alt="NFT" height="200" image={item.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="font-bold">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
