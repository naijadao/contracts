import {
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
  GOVERNANCE_TOKEN_ADDRESS,
  TIMELOCK_ADDRESS,
} from "../helper-hardhat-config"
import hre from "hardhat";


async function main() {

  console.log("----------------------------------------------------")

  const GovernorContract = await hre.ethers.getContractFactory("GovernorContract");

  console.log("Deploying Governor contract and waiting for confirmations...")
  const Governor = await GovernorContract.deploy(
      GOVERNANCE_TOKEN_ADDRESS,
      TIMELOCK_ADDRESS,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY);
  await Governor.deployed();
  console.log("Governor successfully deployed:", Governor.address);

}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});