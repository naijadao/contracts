import {deployer, ADDRESS_ZERO, GOVERNOR_ADDRESS, TIMELOCK_ADDRESS} from "../helper-hardhat-config"
import { ethers } from "hardhat"

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