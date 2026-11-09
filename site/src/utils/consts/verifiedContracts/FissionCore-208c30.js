import { parseAbi } from "viem";

// FissionCore
// https://assethub-polkadot.subscan.io/account/0x208c305f9d1794461d7069be1003e7e979c38e3f?tab=contract
const contract = {
  name: "FissionCore",
  abi: parseAbi([
    "function claimYield(bytes32 marketId)",
    "function createMarket(address yieldBearingAsset, uint256 maturity, string assetName)",
    "function merge(bytes32 marketId, uint256 amount)",
    "function redeemPT(bytes32 marketId, uint256 amount)",
    "function setFeeCollector(address _feeCollector)",
    "function setFeeRate(uint256 _feeRate)",
    "function split(bytes32 marketId, uint256 amount)",
  ]),
};

export default contract;
