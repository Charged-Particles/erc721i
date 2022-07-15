const hre = require("hardhat");

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const _ = require('lodash');

const {
  chainTypeById,
  chainIdByName,
  chainNameById,
} = require('./helpers/utils');


const _verifyContract = async ({deployments, name, networkName, contractRef = null, addressOverride = null, argsOverride = null}) => {
  try {
    const deployment = (await deployments.get(name)) || {};
    const address = addressOverride || deployment.address;
    const constructorArgs = argsOverride || deployment.constructorArgs || [];
    console.log(`Verifying ${name} at address "${address}" ${constructorArgs ? `with ${constructorArgs.length} arg(s)` : ''}...`);

    const execArgs = `"${constructorArgs.map(String).join('" "')}"`;
    const execCmd = [];
    execCmd.push('hardhat', 'verify', '--network', networkName);
    if (_.isString(contractRef) && contractRef.length > 0) {
      execCmd.push('--contract', `contracts/${contractRef}`);
    }
    execCmd.push(address, execArgs);

    console.log(`CMD: ${execCmd.join(' ')}`);
    await exec(execCmd.join(' '));
    console.log(`${name} verified!\n`);
  }
  catch (err) {
    if (/Contract source code already verified/.test(err.message || err)) {
      console.log(`${name} already verified\n`);
    } else {
      console.error(err);
    }
  }
}

async function main() {
  const { getNamedAccounts, deployments } = hre;
  const { owner } = await getNamedAccounts();

  const network = await hre.network;
  const chainId = chainIdByName(network.name);

  const {isHardhat} = chainTypeById(chainId);
  if (isHardhat) { return; }

  const networkName = network.name === 'homestead' ? 'mainnet' : network.name;
  console.log(`Verifying contracts on network "${networkName} (${chainId})"...`);

  console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Infinite (ERC721i) Contract Verification');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');

  console.log(`  Using Network: ${chainNameById(chainId)} (${chainId})`);
  console.log('  Using Owner: ', owner);
  console.log(' ');


  await _verifyContract({deployments, name: 'DemoNFT', networkName});


  console.log('\n  Contract Verification Complete.');
  console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
