/*import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Box and waiting for confirmations...")
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Box at ${box.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(box.address, [])
  }
  const boxContract = await ethers.getContractAt("Box", box.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await boxContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deployBox
deployBox.tags = ["all", "box"]*/

import hre from "hardhat";
import { ethers } from "hardhat"
import {TIMELOCK_ADDRESS} from "../helper-hardhat-config";

async function main() {

  console.log("----------------------------------------------------")

  const BoxContract = await hre.ethers.getContractFactory("Box");

  console.log("Deploying Box and waiting for confirmations...")
  const box = await BoxContract.deploy();
  await box.deployed();
  console.log("Box successfully deployed:", box.address);

  const boxContract = await ethers.getContractAt("Box", box.address)
  const timeLock = await ethers.getContractAt("TimeLock", TIMELOCK_ADDRESS)

  console.log("Transfer ownership to TimeLock...");
  const transferTx = await boxContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
