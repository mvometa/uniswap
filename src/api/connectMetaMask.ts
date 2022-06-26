import { ethers } from 'ethers';

import chainIDs from '../constants/chainIDs';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export type EthersProviders = {
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
};

const connectMetaMask = async ():Promise< Error | EthersProviders > => {
  if (window?.ethereum === undefined) {
    return new Error('Ethereum is undefined, plaese install MetaMask');
  }

  if (Number(window.ethereum.networkVersion) !== chainIDs['Rinkeby Test Network']) {
    return new Error("Ethereum network isn't rinkeby");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    provider.on('network', (newNetwork, oldNetwork) => {
      const isNetworkChanged = oldNetwork !== null;

      if (isNetworkChanged) {
        window.location.reload();
      }
    });
    return { provider, signer };
  } catch (error) {
    return <globalThis.Error>error;
  }
};

export default connectMetaMask;
