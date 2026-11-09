import { parseAbi } from "viem";

// PlazaSwapV2Factory
// https://assethub-polkadot.subscan.io/account/0x59bff7157f15feaf4a0f0dc684224b7c3832fe8d?tab=contract
const contract = {
  name: "PlazaSwapV2Factory",
  abi: parseAbi([
    "function acceptFeeToSetter()",
    "function createPair(address tokenA, address tokenB)",
    "function proposeFeeToSetter(address _feeToSetter)",
    "function setFeeTo(address _feeTo)",
  ]),
};

export default contract;
