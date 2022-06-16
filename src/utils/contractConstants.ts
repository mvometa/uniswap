import {
  factoryABI,
  feeABI,
  registryABI,
  routerABI,
} from './abi';

const contracts = {
  factory: {
    address: '0xDbd8bdedb04a3EAF8F8FA30A86210858b1D4236F',
    ABI: factoryABI,
  },
  router: {
    address: '0xBDb54E3B3e019E37eD741304960F0C68fb09F4E8',
    ABI: routerABI,
  },
  registry: {
    address: '0xb29D81e9c098c5135CF0AFCec0B3ed21B35Ea803',
    ABI: registryABI,
  },
  fee: {
    address: '0xf46DCdfC0A53Ff7816d3Cb4df1dE32b1aE3178b5',
    ABI: feeABI,
  },
};

export default contracts;
