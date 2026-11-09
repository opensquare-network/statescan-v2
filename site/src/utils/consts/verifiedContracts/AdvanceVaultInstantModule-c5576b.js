import { parseAbi } from "viem";

// AdvanceVaultInstantModule
// https://assethub-polkadot.subscan.io/account/0xc5576bce6fc5042317d67f91f61b9b0c9379db8f?tab=contract
const contract = {
  name: "AdvanceVaultInstantModule",
  abi: parseAbi([
    "function activateDevnetHarness(bytes32 releaseSetHash, bytes32 localEvidenceHash)",
    "function autoFillInstantPrincipalWithdrawal(uint256 requestId)",
    "function depositLiquidityAndMatch(uint256 minShares, uint256 maxRequests, uint256 minMatchedPayout)",
    "function fillInstantPrincipalWithdrawalFromPool(uint256 requestId, uint256 maxPayout)",
    "function matchInstantWithdrawals(uint256 maxRequests, uint256 minMatchedPayout)",
  ]),
};

export default contract;
