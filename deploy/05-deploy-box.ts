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
