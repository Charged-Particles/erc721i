const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const toEth = ethers.utils.formatEther;

const getEstimatedTxGasCost = ({ deployTransaction }) => {
  const gasCost = toEth(deployTransaction.gasLimit.mul(deployTransaction.gasPrice));
  return `${gasCost} ETH`;
};

const getActualTxGasCost = ({ deployTransaction }) => {
  const gasUsed = ethers.BigNumber.from(deployTransaction.cumulativeGasUsed).mul(deployTransaction.effectiveGasPrice);
  const gasCost = toEth(gasUsed);
  return `${gasCost} ETH`;
};

const chainIdByName = (chainName) => {
  switch (_.toLower(chainName)) {
    case "homestead":
      return 1;
    case "mainnet":
      return 1;
    case "ropsten":
      return 3;
    case "rinkeby":
      return 4;
    case "goerli":
      return 5;
    case "kovan":
      return 42;
    case "polygon":
      return 137;
    case "mumbai":
      return 80001;
    case "hardhat":
      return 31337;
    case "coverage":
      return 31337;
    default:
      return 0;
  }
};

const chainNameById = (chainId) => {
  switch (parseInt(chainId, 10)) {
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 42:
      return "Kovan";
    case 137:
      return "Polygon";
    case 80001:
      return "Mumbai";
    case 31337:
      return "Hardhat";
    default:
      return "Unknown";
  }
};

const chainTypeById = (chainId) => {
  switch (parseInt(chainId, 10)) {
    case 1:
    case 137:
      return { isProd: true, isTestnet: false, isHardhat: false };
    case 3:
    case 4:
    case 5:
    case 42:
    case 80001:
      return { isProd: false, isTestnet: true, isHardhat: false };
    case 31337:
    default:
      return { isProd: false, isTestnet: false, isHardhat: true };
  }
};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const saveDeploymentData = (chainId, deployData, overwrite = false) => {
  const network = chainNameById(chainId).toLowerCase();
  const deployPath = path.join(__dirname, '../..', 'deployments', network);

  _.forEach(_.keys(deployData), (contractName) => {
    const filename = `${deployPath}/${contractName}.json`;

    let existingData = {};
    if (!overwrite && fs.existsSync(filename)) {
      existingData = JSON.parse(fs.readFileSync(filename));
    }

    const newData = _.merge(existingData, deployData[contractName]);
    ensureDirectoryExistence(filename);
    fs.writeFileSync(filename, JSON.stringify(newData, null, "\t"));
  });
};

const getContractAbi = (contractName) => {
  const buildPath = path.join(__dirname, '../..', 'abis');
  const filename = `${buildPath}/${contractName}.json`;
  const contractJson = require(filename);
  return contractJson;
};

const getDeployData = (contractName, chainId = 31337) => {
  const network = chainNameById(chainId).toLowerCase();
  const deployPath = path.join(__dirname, '../..', 'deployments', network);
  const filename = `${deployPath}/${contractName}.json`;
  delete require.cache[require.resolve(filename)]; // Prevent requiring cached deps
  const contractJson = require(filename);
  return contractJson;
}

module.exports = {
  toEth,
  getEstimatedTxGasCost,
  getActualTxGasCost,
  chainTypeById,
  chainNameById,
  chainIdByName,
  ensureDirectoryExistence,
  saveDeploymentData,
  getContractAbi,
  getDeployData,
};
