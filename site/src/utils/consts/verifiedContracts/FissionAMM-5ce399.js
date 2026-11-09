import { parseAbi } from "viem";

// FissionAMM
// https://assethub-polkadot.subscan.io/account/0x5ce39982b73ba6ba21d5b649ce61a283615f4a4e?tab=contract
const contract = {
  name: "FissionAMM",
  abi: parseAbi([
    "function addLiquidity(uint256 ptAmount, uint256 assetAmount, uint256 minLp)",
    "function removeLiquidity(uint256 lpAmount, uint256 minPt, uint256 minAsset)",
    "function swap(address tokenIn, uint256 amountIn, uint256 minOut)",
  ]),
};

export default contract;
