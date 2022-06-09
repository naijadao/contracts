import {deployer, ADDRESS_ZERO, GOVERNOR_ADDRESS, TIMELOCK_ADDRESS} from "../helper-hardhat-config"
import { ethers } from "hardhat"

/*const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { log } = deployments
  const { deployer } = await getNamedAccounts()
  const governanceToken = await ethers.getContract("KobboToken", deployer)
  const timeLock = await ethers.getContract("TimeLock", deployer)
  const governor = await ethers.getContract("GovernorContract", deployer)

  log("----------------------------------------------------")
  log("Setting up contracts for roles...")
  // would be great to use multicall here...
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
  await proposerTx.wait(1)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)
  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(1)
  // Guess what? Now, anything the timelock wants to do has to go through the governance process!
}

export default setupContracts
setupContracts.tags = ["all", "setup"]*/


async function main() {

  const timeLock = await ethers.getContractAt("TimeLock", TIMELOCK_ADDRESS)

  console.log("----------------------------------------------------")
  console.log("Setting up contracts for roles...")

  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  console.log(`Granting proposer role to ${GOVERNOR_ADDRESS}`)
  const proposerTx = await timeLock.grantRole(proposerRole, GOVERNOR_ADDRESS)
  await proposerTx.wait(1)

  console.log(`Granting executor role to ${ADDRESS_ZERO}`)
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)

  console.log(`Revoking admin role for ${deployer}...`)
  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(1)

  console.log("Roles successfully set up!")

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});