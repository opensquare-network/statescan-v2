import { parseAbi } from "viem";

// FissionAMM
// https://assethub-polkadot.subscan.io/account/0x242f0f2536cdff40b0cbf802032715272929e474?tab=contract
const contract = {
  name: "FissionAMM",
  abi: parseAbi([
    "function addLiquidity(uint256 ptAmount, uint256 assetAmount, uint256 minLp)",
    "function removeLiquidity(uint256 lpAmount, uint256 minPt, uint256 minAsset)",
    "function swap(address tokenIn, uint256 amountIn, uint256 minOut)",
  ]),
};

export default contract;
