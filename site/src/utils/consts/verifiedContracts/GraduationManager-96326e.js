import { parseAbi } from "viem";

// GraduationManager
// https://assethub-polkadot.subscan.io/account/0x96326ee2fac239f98f2a256e993c223f9d0b3c0b?tab=contract
const contract = {
  name: "GraduationManager",
  abi: parseAbi([
    "function acceptOwnership()",
    "function emergencyWithdrawETH(address to, uint256 amount)",
    "function emergencyWithdrawToken(address token, address to, uint256 amount)",
    "function executeGraduation(uint256 tokenId, address assetPrecompile, address quoteToken, uint256 tokenLiquidity, uint256 accumulatedQuote)",
    "function initialize(address _bondingCurve, address _quoteTokenRegistry, address _creatorFeeVault, address _feeConfig)",
    "function pause()",
    "function safeTransferExternal(address token, address to, uint256 amount)",
    "function setAuthorized(address adapter, bool status)",
    "function setBondingCurve(address _bondingCurve)",
    "function setCreatorFeeVault(address _vault)",
    "function setFeeConfig(address _feeConfig)",
    "function setGuardian(address _guardian)",
    "function setQuoteTokenRegistry(address _registry)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function upgradeToAndCall(address newImplementation, bytes data)",
    "function withdrawPendingMigrationFees(address quoteToken)",
  ]),
};

export default contract;
