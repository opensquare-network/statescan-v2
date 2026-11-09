import { parseAbi } from "viem";

// QuoteTokenRegistry, implementation behind ERC1967Proxy 0x4cbef06615185da6eba406a6ca6866b73b84fc7e
// https://assethub-polkadot.subscan.io/account/0x4cbef06615185da6eba406a6ca6866b73b84fc7e?tab=contract
const contract = {
  name: "QuoteTokenRegistry",
  abi: parseAbi([
    "function acceptOwnership()",
    "function initialize(address _owner)",
    "function initializeGuardianV19(address _guardian)",
    "function pause()",
    "function pauseQuoteToken(address token)",
    "function setGraduationAdapter(address token, address adapter)",
    "function setGuardian(address _guardian)",
    "function setQuoteTokenConfig(address token, (bool enabled, uint8 decimals, uint256 initialVirtualQuote, uint256 graduationQuoteAmount, uint256 minTrade, uint256 creationFee, address graduationAdapter, uint256 minGraduationLiquidity, uint256 migrationFee, uint256 minIgnitionFee, bool noFeeOnTransfer))",
    "function setQuoteTokenConfigBatch(address[] tokens, (bool enabled, uint8 decimals, uint256 initialVirtualQuote, uint256 graduationQuoteAmount, uint256 minTrade, uint256 creationFee, address graduationAdapter, uint256 minGraduationLiquidity, uint256 migrationFee, uint256 minIgnitionFee, bool noFeeOnTransfer)[])",
    "function setQuoteTokenEnabled(address token, bool enabled)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function unpauseQuoteToken(address token)",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
