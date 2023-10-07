import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { MetaMaskContext } from './MetaMaskContext';

const MetaMaskProviderWrapper = ({ children }) => {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        logging: {
          developerMode: false,
        },
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Demo React App",
          url: window.location.host,
        }
      }}
    >
      <MetaMaskContext.Provider value={useSDK()}>
        {children}
      </MetaMaskContext.Provider>
    </MetaMaskProvider>
  );
};

export default MetaMaskProviderWrapper;
