import { parseAbi } from "viem";

// CallDispatcher
// https://assethub-polkadot.subscan.io/account/0xe2c7e576e26e0be7ac97c6fe925bcdabd87c4bed?tab=contract
const contract = {
  name: "CallDispatcher",
  abi: parseAbi(["function dispatch(bytes encoded)"]),
};

export default contract;
