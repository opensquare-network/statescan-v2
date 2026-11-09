import { parseAbi } from "viem";

// SolverAccount
// https://assethub-polkadot.subscan.io/account/0xb92a51a609e85f8316004a6da9feab4421c01b43?tab=contract
const contract = {
  name: "SolverAccount",
  abi: parseAbi([
    "function execute(bytes32 mode, bytes executionData)",
    "function validateUserOp((address sender, uint256 nonce, bytes initCode, bytes callData, bytes32 accountGasLimits, uint256 preVerificationGas, bytes32 gasFees, bytes paymasterAndData, bytes signature), bytes32 userOpHash, uint256 missingAccountFunds)",
  ]),
};

export default contract;
