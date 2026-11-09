import { parseAbi } from "viem";

// AdvanceVaultFeatureModule
// https://assethub-polkadot.subscan.io/account/0xede43265475f20e48ed5ab924aa115bb76258162?tab=contract
const contract = {
  name: "AdvanceVaultFeatureModule",
  abi: parseAbi([
    "function addStake()",
    "function cancelRewardSaleRequest(uint256 requestId)",
    "function claimAutomationReimbursement(address payout)",
    "function closeExpiredRewardSaleRequest(uint256 requestId)",
    "function deposit(bool autoLendRewards)",
    "function depositToPoolAndFillRewardSaleRequest(uint256 requestId, uint256 soldRewardAmount, uint256 expectedCollateralPrincipal, uint256 expectedCollateralMemberPoints)",
    "function fillRewardSaleRequestFromPool(uint256 requestId, uint256 soldRewardAmount, uint256 manualAmount, uint256 rewardAmount, uint256 expectedCollateralPrincipal, uint256 expectedCollateralMemberPoints)",
    "function harvest(address positionAccount, uint256 expectedHarvestNonce)",
    "function processPositionRewards(address positionAccount, uint256 expectedIdleReward)",
    "function repaySoldRewards()",
    "function repaySoldRewardsUpTo(uint256 expectedDebt)",
    "function requestRewardSale(uint256 soldRewardAmount, uint256 minUpfrontAmount, uint256 expiry, uint256 finalizedMemberPoints)",
    "function setAutoLendRewards(bool enabled)",
    "function setFeeRecipient(address newFeeRecipient)",
    "function setHarvestAutomationConfig(uint256 harvestBounty, uint256 processBounty)",
    "function setInstantExitConfig(uint256 lenderFeeBps, uint256 platformFeeBps)",
    "function setRewardPreference(uint8 mode, address recipient, bool allowLending)",
    "function setRewardSaleConfig(uint256 capBps, uint256 upfrontBps, uint256 lenderTargetBps, uint256 maxRequestTtl, uint256 advanceMaturity)",
  ]),
};

export default contract;
