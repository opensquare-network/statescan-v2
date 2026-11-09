import { parseAbi } from "viem";

// VibePair
// https://assethub-polkadot.subscan.io/account/0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2?tab=contract
const contract = {
  name: "VibePair",
  abi: parseAbi([
    "function approve(address spender, uint256 value)",
    "function burn(address to)",
    "function emergencyDrain(address token, address to)",
    "function initialize(address _token0, address _token1)",
    "function mint(address to)",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
    "function skim(address to)",
    "function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data)",
    "function sync()",
    "function transfer(address to, uint256 value)",
    "function transferFrom(address from, address to, uint256 value)",
  ]),
};

export default contract;
