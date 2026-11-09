import { parseAbi } from "viem";

// SolverAccount
// https://assethub-polkadot.subscan.io/account/0x7cb55539d1144f62422099c3fa3405092022c88c?tab=contract
const contract = {
  name: "SolverAccount",
  abi: parseAbi([
    "function execute(bytes32 mode, bytes executionData)",
    "function validateUserOp((address sender, uint256 nonce, bytes initCode, bytes callData, bytes32 accountGasLimits, uint256 preVerificationGas, bytes32 gasFees, bytes paymasterAndData, bytes signature), bytes32 userOpHash, uint256 missingAccountFunds)",
  ]),
};

export default contract;
