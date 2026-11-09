import { parseAbi } from "viem";

// SolverAccount
// https://assethub-polkadot.subscan.io/account/0xfcd233b937d7622aac63ced3c9a1a12f4a6b64e3?tab=contract
const contract = {
  name: "SolverAccount",
  abi: parseAbi([
    "function execute(bytes32 mode, bytes executionData)",
    "function validateUserOp((address sender, uint256 nonce, bytes initCode, bytes callData, bytes32 accountGasLimits, uint256 preVerificationGas, bytes32 gasFees, bytes paymasterAndData, bytes signature), bytes32 userOpHash, uint256 missingAccountFunds)",
  ]),
};

export default contract;
