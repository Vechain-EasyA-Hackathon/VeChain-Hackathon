import { createContext, useContext } from 'react';

// Create the context
export const MetaMaskContext = createContext();

// Custom hook to use MetaMask
export const useMetaMask = () => {
  return useContext(MetaMaskContext);
};
