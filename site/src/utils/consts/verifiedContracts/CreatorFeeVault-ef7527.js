import { parseAbi } from "viem";

// CreatorFeeVault, implementation behind ERC1967Proxy 0xef75274c4fe529b5a9edb73e471aac148e89a251
// https://assethub-polkadot.subscan.io/account/0xef75274c4fe529b5a9edb73e471aac148e89a251?tab=contract
const contract = {
  name: "CreatorFeeVault",
  abi: parseAbi([
    "function acceptOwnership()",
    "function batchSetInitialLPWdotValue(uint256[] tokenIds, uint256[] values)",
    "function claimFees(uint256 tokenId, address quoteToken)",
    "function claimFeesOnTransfer(uint256 tokenId, address holder)",
    "function claimUnclaimedTransferFees(address quoteToken, address recipient)",
    "function depositProtocolFees(uint256 tokenId)",
    "function emergencyWithdrawETH(address to, uint256 amount)",
    "function emergencyWithdrawToken(address token, address to, uint256 amount)",
    "function executeHarvestSwap(address lpToken, address memeToken, uint256 memeAmount, address token0, address _weth)",
    "function harvestLPFees(uint256 tokenId, uint256 maxLPToHarvest, uint256 minWdotOut, uint256 deadline)",
    "function initialize(address _feeKeyNFT, address _bondingCurve, address _harvester)",
    "function initializeTotalOwed(uint256 _totalOwedNative, address[] _tokens, uint256[] _amounts)",
    "function lockLP(uint256 tokenId, address lpToken, uint256 amount, uint256 _initialWdotValue)",
    "function pause()",
    "function retryStrandedSwap(uint256 tokenId, uint256 minWdotOut, uint256 deadline)",
    "function safeTransferExternal(address token, address to, uint256 amount)",
    "function setBondingCurve(address _bondingCurve)",
    "function setFeeKeyNFT(address _feeKeyNFT)",
    "function setGraduationManager(address _graduationManager)",
    "function setGuardian(address _guardian)",
    "function setHarvester(address _harvester)",
    "function setInitialLPWdotValue(uint256 tokenId, uint256 value)",
    "function setProtocolFeeCollector(address _collector)",
    "function setRouter(address _router)",
    "function setWETH(address _weth)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function upgradeToAndCall(address newImplementation, bytes data)",
  ]),
};

export default contract;
