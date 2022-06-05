import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

// @ts-ignore
import { ethers } from "hardhat"

const deployKobboToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Kobbo Token and waiting for confirmations...")
  const kobboToken = await deploy("KobboToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Kobbo Token at ${kobboToken.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(kobboToken.address, [])
  }
  log(`Delegating to ${deployer}`)
  await delegate(kobboToken.address, deployer)
  log("Delegated!")
}

const delegate = async (kobboTokenAddress: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt("KobboToken", kobboTokenAddress)
  const transactionResponse = await governanceToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

export default deployKobboToken
deployKobboToken.tags = ["all", "governor"]