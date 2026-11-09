import { parseAbi } from "viem";

// PolicyManager
// https://assethub-polkadot.subscan.io/account/0x5edaf928c94a249c5ce1eabad0fe799cd294f345?tab=contract
const contract = {
  name: "PolicyManager",
  abi: parseAbi([
    "function batchCharge(bytes32[] policyIds)",
    "function cancelFailedPolicy(bytes32 policyId)",
    "function charge(bytes32 policyId)",
    "function createPolicy(address merchant, uint128 chargeAmount, uint32 interval, uint128 spendingCap, string metadataUrl)",
    "function renounceOwnership()",
    "function revokePolicy(bytes32 policyId)",
    "function setFeeRecipient(address newRecipient)",
    "function transferOwnership(address newOwner)",
    "function withdrawFees()",
  ]),
};

export default contract;
