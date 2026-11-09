import { parseAbi } from "viem";

// MockAUSDT
// https://assethub-polkadot.subscan.io/account/0x9b0a46e35fb743ed366077ce16c497efeed37e2f?tab=contract
const contract = {
  name: "MockAUSDT",
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
