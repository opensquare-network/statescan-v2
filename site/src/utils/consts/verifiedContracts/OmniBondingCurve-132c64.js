import { parseAbi } from "viem";

// OmniBondingCurve
// https://assethub-polkadot.subscan.io/account/0x132c64a7a8c2b85cda7f4ce46587243740b39fba?tab=contract
// An ERC1967 proxy whose implementation is not verified in Blockscout, the abi
// is the one of the verified OmniBondingCurve; every selector found in the
// calls of this contract is declared by it.
const contract = {
  name: "OmniBondingCurve",
  abi: parseAbi([
    "function acceptOwnership()",
    "function bindReclaimedAssetId(uint256 tokenId, uint32 assetId)",
    "function buy(uint256 tokenId, uint256 quoteAmount, uint256 minTokenOut, bytes32 referralCode)",
    "function claimCreatorFees(uint256 tokenId)",
    "function confirmTokenCreation(uint256 tokenId, uint32 assetId)",
    "function createTokenDirect((string name, string symbol, bytes extraData), address quoteToken, bytes32 referralCode, uint256 ignitionAmount, uint256 minTokenOut, uint32 launcherId)",
    "function createTokenWithInitialBuy((string name, string symbol, bytes extraData), address quoteToken, bytes32 referralCode, uint256 ignitionAmount, uint256 initialBuyAmount, uint256 minTokenOut, uint32 launcherId)",
    "function disableLauncherMode()",
    "function emergencyRescueERC20(address token, address to, uint256 amount)",
    "function emergencyRescueETH(address to, uint256 amount)",
    "function executeGraduation(uint256 tokenId)",
    "function failTokenCreation(uint256 tokenId, uint32 assetId, string reason)",
    "function forceGraduate(uint256 tokenId)",
    "function initialize(address _feeConfig, address _quoteTokenRegistry)",
    "function notifyGraduationTokenRefundSink(uint256 tokenId, address asset, uint256 amount)",
    "function pause()",
    "function receiveAdapterRefund()",
    "function reclaimPendingToken(uint256 tokenId)",
    "function resetGraduationPending(uint256 tokenId)",
    "function retryFeeKeyMint(uint256 tokenId)",
    "function sell(uint256 tokenId, uint256 tokenAmount, uint256 minQuoteOut, bytes32 referralCode)",
    "function setAddress(uint8 slot, address v)",
    "function setGuardian(address _guardian)",
    "function setMaxBlockVolumeBps(uint256 _bps)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
    "function updateMetadata(uint256 tokenId, bytes extraData)",
    "function upgradeToAndCall(address newImplementation, bytes data)",
    "function withdrawPendingFees(address quoteToken)",
    "function withdrawPendingFeesTo(address quoteToken, address recipient)",
  ]),
};

export default contract;
