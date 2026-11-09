import { parseAbi } from "viem";

// FissionRouter
// https://assethub-polkadot.subscan.io/account/0xdf6122cf64847e43ecc2efa2f1eefd914a2d5c5d?tab=contract
const contract = {
  name: "FissionRouter",
  abi: parseAbi([
    "function addLiquidityFromAsset(bytes32 marketId, uint256 amount, uint256 minLp)",
    "function setMarketAMM(bytes32 marketId, address amm)",
    "function splitAndSellPT(bytes32 marketId, uint256 amount, uint256 minYtOut)",
    "function splitAndSellYT(bytes32 marketId, uint256 amount, uint256 minPtOut)",
    "function splitFromAsset(bytes32 marketId, uint256 amount)",
    "function zapInDOT(bytes32 marketId, uint256 minPt, uint256 minYt)",
  ]),
};

export default contract;
