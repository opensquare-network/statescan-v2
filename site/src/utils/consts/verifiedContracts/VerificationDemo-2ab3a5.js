import { parseAbi } from "viem";

// VerificationDemo
// https://assethub-polkadot.subscan.io/account/0x2ab3a5f78ba011fb3d37cc884893a44be57ce26e?tab=contract
const contract = {
  name: "VerificationDemo",
  abi: parseAbi(["function dispose()"]),
};

export default contract;
