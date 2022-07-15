require('dotenv').config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");
require("solidity-coverage");

const mnemonic = process.env.WALLET_MNEMONIC;
const optimizerEnabled = process.env.OPTIMIZER_ENABLED === 'true';

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 200,
          },
        },
        evmVersion: "istanbul",
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./build/contracts",
    deploy: "./deploy",
    deployments: "./deployments",
  },
  networks: {
    hardhat: {
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true,
      gasPrice: 1e9,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_GOERLI_APIKEY}`,
      gasPrice: 1e9,
      accounts: {
        mnemonic,
        initialIndex: 0,
        count: 10,
      },
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_APIKEY}`,
      gasPrice: 1e9,
      accounts: {
        mnemonic,
        initialIndex: 0,
        count: 10,
      },
    },
    mumbai: {
      url: `https://matic-mumbai.chainstacklabs.com/`,
      gasPrice: 10e9,
      accounts: {
        mnemonic,
        initialIndex: 0,
        count: 10,
      },
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_APIKEY,
      polygonMumbai: process.env.POLYGONSCAN_APIKEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    gasPrice: 1,
    currency: "USD",
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: ["DemoNFT", "ERC721i"],
  },
  namedAccounts: {
    owner: { default: 0 },
    user1: { default: 1 },
    user2: { default: 2 },
    user3: { default: 3 },
  },
};
