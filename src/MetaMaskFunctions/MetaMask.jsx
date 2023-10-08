import React, { useState, useEffect, useContext } from 'react';
import { ethers } from "ethers";
import Button from '@mui/material/Button';
import { useSDK } from '@metamask/sdk-react';

const Metamask = () => {
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectToMetamask = async () => {
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(prov);
    const accounts = await prov.send("eth_requestAccounts", []);
    const addrFormatted = shortenAddress(accounts[0]);
    setSelectedAddress(addrFormatted);
    
    // Save to localStorage
    localStorage.setItem('metamaskAddress', addrFormatted);
  }



  useEffect(() => {
    if (provider) {
      window.ethereum.request({
          method: "eth_accounts",
      });
      const signerAccount = provider.getSigner();
      signerAccount.getAddress().then((address) => setAccount(address));
    }

    // Fetch from localStorage on initial render
    const storedAddress = localStorage.getItem('metamaskAddress');
    if (storedAddress) {
      setSelectedAddress(storedAddress);
    }
  }, [provider]);

  function shortenAddress(address, chars = 4) {
    const prefix = address.substring(0, 2 + chars);
    const suffix = address.substring(address.length - chars);
    return `${prefix}...${suffix}`;
  }

  const renderMetamask = () => {
    if (!selectedAddress) {
      return (
        <Button variant='contained' onClick={connectToMetamask}>Connect to Metamask</Button>
      );
    } else {
      return (
        <div>
          <Button variant="contained">{selectedAddress}</Button>
        </div>
      );
    }
  }
  
  return (
    <div>
      {renderMetamask()}
    </div>
  );
}

export default Metamask;
