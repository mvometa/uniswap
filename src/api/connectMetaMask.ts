import { ethers } from 'ethers';

import chainIDs from '../constants/chainIDs';
import isErrorLike from '../utils/isErrorLike';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MetaMaskErrorType = {
  code: number;
  message: string;
};

const connectMetaMask = async ():Promise< Error | EthersProviders > => {
  if (window?.ethereum === undefined) {
    return new Error('Пожалуйста установите MetaMask');
  }

  if (Number(window.ethereum.networkVersion) !== chainIDs['Rinkeby Test Network']) {
    return new Error('Пожалуйста установите тестовую сеть rinkeby');
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
    if (isErrorLike(error)) {
      return new Error(error.message);
    }
    return new Error('MetaMask error');
  }
};

export default connectMetaMask;
