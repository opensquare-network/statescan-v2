import { parseAbi } from "viem";

// WrappedDOT
// https://assethub-polkadot.subscan.io/account/0xaf905e66038ece89e03d843b35a11d262053b630?tab=contract
const contract = {
  name: "WrappedDOT",
  abi: parseAbi([
    "function approve(address spender, uint256 value)",
    "function deposit()",
    "function transfer(address to, uint256 value)",
    "function transferFrom(address from, address to, uint256 value)",
    "function withdraw(uint256 amount)",
  ]),
};

export default contract;
