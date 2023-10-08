import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

  function MyCollection() {
    const [userAddress, setUserAddress] = useState(null);
    const [nfts, setNFTs] = useState([]);
    const formattedAddress = userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : '';
    const navigate = useNavigate();
    const handleDisconnect = async () => {
      // Handle disconnect logic
    };
    
    const fetchUserNFTs = async (address) => {
      // Mock function to fetch user's NFTs, replace with actual implementation
      // This could involve interacting with an Ethereum smart contract
      // and fetching the user's NFTs based on their address
      // For demonstration, we'll return some mock NFT data
      return [
        { image: 'src/assets/benandjerrydunk-v2.webp', name: 'Nike SB Dunk - Ben and Jerrys' },
        { image: 'src/assets/64a86d250c3e07ee19a9bbba_10.jpg', name: 'Adidas NMD - Pharrel Williams ' },
        { image: 'src/assets/Louis-Vuitton-Slender-Wallet-Ink-Watercolor.jpg', name: 'Louis Vuitton - Ink Watercolor Wallet ' }

        // Add more NFTs as needed
      ];
    };
    const back = () => {
        navigate("/");
    }
    useEffect(() => {
      async function fetchData() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
  
          // Fetch the user's NFTs
          const fetchedNFTs = await fetchUserNFTs(address);
          setNFTs(fetchedNFTs);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, []);
  
    return (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-8 bg-emerald-500">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold ml-2 text-white" onClick={back}>SustainaLink</h1>
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
        </div>
  
        {/* My Collection Section */}
        <div className="container mx-auto py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">My Collection</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nfts.map((nft, index) => (
              <Card key={index} className="max-w-xs">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="NFT"
                    height="140"
                    image={nft.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {nft.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default MyCollection;
  