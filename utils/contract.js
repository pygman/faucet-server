require('dotenv').config()
const ethers = require("ethers");
const erc20Abi = require("../constants/abi/erc20.json")

let provider, wallet
const contracts = {}

const initContract = async (tokens) => {
    provider = await ethers.getDefaultProvider(process.env.RINKEBY_API);
    wallet = new ethers.Wallet(process.env.RINKEBY_DEPLOYER_PRIVATE_KEY, provider)
    tokens.map((token) => {
        contracts[token.address] = ethers.ContractFactory.getContract(token.address, erc20Abi, wallet)
    })
}

const claimTestToken = ({tokenAddress, userAddress}) => {
    if (!(tokenAddress in contracts)) {
        contracts[tokenAddress] = ethers.ContractFactory.getContract(tokenAddress, erc20Abi, wallet)
    }
    const contract = contracts[tokenAddress]
    return contract.claimTestToken(userAddress)
}

module.exports = {
    initContract, claimTestToken
}
