export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one is ETH/USD contract on Kovan
  kovan: {
    blockConfirmations: 6,
  },
}

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
// export const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
export const MIN_DELAY = 300 // 5 minutes

// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
export const deployer = "0x26B3bAC0Cf02F619166Bc7457bA25443ccb026a3"
export const proposers = ["0x26B3bAC0Cf02F619166Bc7457bA25443ccb026a3"]

export const NEW_STORE_VALUE = 77
export const FUNC = "store"
export const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"

export const GOVERNANCE_TOKEN_ADDRESS = "0x86D6c32b55FD7E38d8a87b518466F51A749cD960"
export const TIMELOCK_ADDRESS = "0x2020a989d2D55A788CE036aFED2bd639Ec5BC5ab"
export const GOVERNOR_ADDRESS = "0xa9596A8c4e7CB8C621fC806B9551B79d6760056f"
