require('dotenv').config()
const ethers = require("ethers");
const erc20Abi = require("../constants/abi/erc20.json")
const {addresses} = require("../constants/contracts")

let provider, wallet
const contracts = {}

const initContract = async () => {
    provider = await ethers.getDefaultProvider(process.env.ROPSTEN_API);
    wallet = new ethers.Wallet(process.env.ROPSTEN_DEPLOYER_PRIVATE_KEY, provider)
    Object.keys(addresses).map(function(key, index) {
        const address = addresses[key]
        contracts[address] = ethers.ContractFactory.getContract(address, erc20Abi, wallet)
    });
}

const claimTestToken = ({tokenAddress, userAddress}) => {
    const contract = contracts[tokenAddress]
    return contract.claimTestToken(userAddress)
}

module.exports = {
    initContract, claimTestToken
}
