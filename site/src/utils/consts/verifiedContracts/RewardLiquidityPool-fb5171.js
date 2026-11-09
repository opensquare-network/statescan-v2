import { parseAbi } from "viem";

// RewardLiquidityPool
// https://assethub-polkadot.subscan.io/account/0xfb5171d0462bee96251008879cfb1af5da742561?tab=contract
const contract = {
  name: "RewardLiquidityPool",
  abi: parseAbi([
    "function bindVault(address newVault)",
    "function claimAdvanceProceeds(address payout)",
    "function claimInstantWithdrawalProceeds(address payout)",
    "function depositFor(address lender)",
    "function fundAdvance(address recipient, uint256 soldRewardAmount, uint256 upfrontAmount, uint256 lenderTarget)",
    "function fundInstantExit(address recipient, uint256 payoutAmount, uint256 poolReceivable, uint256 executionReserve)",
    "function receiveInstantExitRepayment()",
    "function receiveLenderRepayment()",
    "function withdraw(uint256 shareAmount)",
    "function withdrawAssets(uint256 assets, uint256 maxShares)",
  ]),
};

export default contract;
