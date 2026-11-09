import { parseAbi } from "viem";

// MockVDOT
// https://assethub-polkadot.subscan.io/account/0x9c1af3d3741542019f3a3c6c33ed3638db07a18b?tab=contract
const contract = {
  name: "MockVDOT",
  abi: parseAbi([
    "function accrueYield(uint256 basisPoints)",
    "function approve(address spender, uint256 value)",
    "function mint(address to, uint256 amount)",
    "function setExchangeRate(uint256 newRate)",
    "function transfer(address to, uint256 value)",
    "function transferFrom(address from, address to, uint256 value)",
  ]),
};

export default contract;
