# Uniswap

## Description

Clone of [uniswap](https://app.uniswap.org/) for education purpose.

Functional:

- registration of a token pair that does not exist yet;
- replenishment of the pair's liquidity;
- withdrawal of liquidity;
- swap pairs;
- commissions for users-holders of liquidity;
- platform commission.

## Demo

[demo](http://vadimm34.beget.tech/)

Useful links:

- [metamask](https://metamask.io/);
- [rinkeby](https://www.rinkeby.io/);
- [rinkeby scan](https://rinkeby.etherscan.io/);
- [rinkeby faucet](https://rinkebyfaucet.com/);
- [ERC20 docs](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20)
- [contracts](./src/constants/contractConstants.ts);

## Contribution

### Installation

```bash
git clone https://github.com/mvometa/uniswap.git
cd uniswap
npm i
```

### Managing

In package.json you can find useful scripts for managing the project. To run script, use the following command:

```bash
npm run {script-name}
```

Script-names:

- build - build minify bundles and place it into directory build;
- start - just builds bundles and run project on localhost:3000;




