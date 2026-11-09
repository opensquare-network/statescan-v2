import { parseAbi } from "viem";

// VibeFactory
// https://assethub-polkadot.subscan.io/account/0xce4a761e8673928e40f9c573777590b7d7e2212d?tab=contract
const contract = {
  name: "VibeFactory",
  abi: parseAbi([
    "function createPair(address tokenA, address tokenB)",
    "function pause()",
    "function renounceOwnership()",
    "function rescueFundsFromPair(address _pair, address _token, address _to)",
    "function setFeeTo(address _feeTo)",
    "function setFeeToSetter(address _feeToSetter)",
    "function setPairCreationStatus(bool _isOpen)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
  ]),
};

export default contract;
