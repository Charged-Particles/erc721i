require('dotenv').config();

const mnemonic = {
  testnet: `${process.env.TESTNET_MNEMONIC}`.replace(/_/g, ' '),
  mainnet: `${process.env.MAINNET_MNEMONIC}`.replace(/_/g, ' '),
};

module.exports = {
    solidity: {
        compilers: [
          {
            version: '0.8.20',
          },
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: './build/contracts',
        deploy: './deploy',
        deployments: './deployments'
    },
    networks: {
        hardhat: {
            // chainId: 1,
            // blockGasLimit: 200000000,
            allowUnlimitedContractSize: true,
            // gasPrice: 1e9,
            accounts: {
                mnemonic: mnemonic.testnet,
                initialIndex: 0,
                count: 10,
            },
            // forking: {
            //     url: 'https://eth-mainnet.g.alchemy.com/v2/onL35MUKZeTnQ3XZ3K_fbyg4ZcDyAbu5',
            //     blockNumber: 15400000,  // MUST be after Aave V2 was deployed
            //     timeout: 1000000
            // },
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_APIKEY}`,
            gasPrice: 'auto',
            accounts: {
                mnemonic: mnemonic.testnet,
                initialIndex: 0,
                count: 10,
            },
            chainId: 5
        },
    },
    gasReporter: {
        currency: 'USD',
        gasPrice: 1,
        enabled: (process.env.REPORT_GAS) ? true : false
    },
    abiExporter: {
      path: './abis',
      runOnCompile: true,
      // Mindful of https://github.com/ItsNickBarry/hardhat-abi-exporter/pull/29/files
      // and https://github.com/ItsNickBarry/hardhat-abi-exporter/pull/35 as they heavily change behavior around this package
      clear: true,
      flat: true,
      only: [
        'ERC721i',
        'ERC721all',
        'ERC721soul',
        'DemoNFT',
      ],
    },
    watcher: {
      compilation: {
        tasks: ["compile"],
        files: ["./contracts"],
        verbose: true,
      },
      test: {
        tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
        files: ['./test/**/*'],
        verbose: true
      }
    },
};
