import { ethers } from "hardhat"
const hre = require("hardhat");
const { network } = hre
import { networkConfig, developmentChains, deployer } from "../helper-hardhat-config"
import verify from "../helper-functions"

async function main() {

  const Token = await hre.ethers.getContractFactory("KobboToken");
  const kobboToken = await Token.deploy();
  await kobboToken.deployed();
  console.log("Kobbo Token successfully deployed:", kobboToken.address);

  /*if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(kobboToken.address, [])
  }*/

  console.log(`Delegating to ${deployer}`)
  await delegate(kobboToken.address, deployer)
  console.log("Delegated!")

}

const delegate = async (kobboTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("KobboToken", kobboTokenAddress)
  const transactionResponse = await governanceToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});