const ethers = require("ethers");

const isAddress = (address) => {
    try {
        ethers.utils.getAddress(address);
    } catch (e) {
        return false;
    }
    return true;
}

const validClaimArgs = (params) => {
    return params && isAddress(params.tokenAddress) && isAddress(params.userAddress)
}

module.exports = {isAddress, validClaimArgs}
