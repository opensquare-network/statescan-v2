import { parseAbi } from "viem";

// AdvanceVaultInstantModule
// https://assethub-polkadot.subscan.io/account/0xfc632bef75f2ebfb5a8f1e201895e07cc4689b88?tab=contract
const contract = {
  name: "AdvanceVaultInstantModule",
  abi: parseAbi([
    "function depositLiquidityAndMatch(uint256 manualMatchAmount, uint256 rewardMatchAmount, uint256 maxRequests, uint256 minMatchedPayout)",
    "function fillInstantPrincipalWithdrawalFromPool(uint256 requestId, uint256 maxPayout, uint256 manualAmount, uint256 rewardAmount)",
    "function matchInstantWithdrawals(uint256 manualMatchAmount, uint256 rewardMatchAmount, uint256 maxRequests, uint256 minMatchedPayout)",
  ]),
};

export default contract;
