import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import {networkConfig, developmentChains, MIN_DELAY, proposers, deployer} from "../helper-hardhat-config"
import hre, {ethers} from "hardhat";
const { network } = hre

/*const deployTimeLock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying TimeLock and waiting for confirmations...")
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, proposers, []],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`TimeLock at ${timeLock.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }
}

export default deployTimeLock
deployTimeLock.tags = ["all", "timelock"]*/

async function main() {

  console.log("----------------------------------------------------")

  const Locker = await hre.ethers.getContractFactory("TimeLock");

  console.log("Deploying TimeLock and waiting for confirmations...")
  const TimeLock = await Locker.deploy(MIN_DELAY, proposers, []);
  await TimeLock.deployed();
  console.log("TimeLock successfully deployed:", TimeLock.address);

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
