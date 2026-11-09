import { parseAbi } from "viem";

// RewardLiquidityPool
// https://assethub-polkadot.subscan.io/account/0xb77f65fdabe4689236a13335acac634641826bf5?tab=contract
const contract = {
  name: "RewardLiquidityPool",
  abi: parseAbi([
    "function bindVault(address newVault, bytes32 expectedVaultCodeHash)",
    "function claimAdvanceProceeds(address payout)",
    "function claimInstantWithdrawalProceeds(address payout)",
    "function depositManual()",
    "function depositManualFor(address lender)",
    "function depositRewardFor(address lender)",
    "function fundAdvance(uint256 requestId, address lender, address borrower, uint256 manualAmount, uint256 rewardAmount, uint256 soldRewardAmount, uint256 upfrontAmount, uint256 lenderTarget)",
    "function fundInstantExit(uint256 requestId, address lender, address borrower, uint256 manualAmount, uint256 rewardAmount, uint256 payoutAmount, uint256 lenderTarget)",
    "function repayAdvance(uint256 requestId, address borrower)",
    "function repayInstantExit(uint256 requestId, address borrower)",
    "function sealAdvanceRequest(uint256 requestId, address borrower)",
    "function sealInstantRequest(uint256 requestId, address borrower)",
    "function settleAdvance(uint256 requestId, address borrower)",
    "function settleInstantExit(uint256 requestId, address borrower)",
    "function withdrawIdle(uint256 manualAmount, uint256 rewardAmount, address payout)",
  ]),
};

export default contract;
