import { parseAbi } from "viem";

// ProtocolFeeCollector
// https://assethub-polkadot.subscan.io/account/0x35ea07af915f1ae154e4ec01197122eb7063afed?tab=contract
const contract = {
  name: "ProtocolFeeCollector",
  abi: parseAbi([
    "function acceptOwnership()",
    "function collectAndDeposit(address pair, uint256 tokenId, uint256 minWdotOut, uint256 deadline)",
    "function setHarvester(address _harvester)",
    "function transferOwnership(address newOwner)",
  ]),
};

export default contract;
