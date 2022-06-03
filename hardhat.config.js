require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config()
const privateKey = process.env.privateKey;
const infuraKey = process.env.infuraKey;
const polygonScanApiKey = process.env.polygonscan_api_key;
const etherscan_api_key = process.env.etherscan_api_key;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraKey}`, //Infura url with projectId
      accounts: [privateKey] // add the account that will deploy the contract (private key)
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey]
    },
  },
  etherscan: {
    apiKey: etherscan_api_key
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
