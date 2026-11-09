import { parseAbi } from "viem";

// MoksaFeeCollector
// https://assethub-polkadot.subscan.io/account/0xded7941041e6adc44c86cf3331eb2bf867084096?tab=contract
const contract = {
  name: "MoksaFeeCollector",
  abi: parseAbi([
    "function acceptOwnership()",
    "function allowRouter(address router)",
    "function disallowRouter(address router)",
    "function pause()",
    "function renounceOwnership()",
    "function rescue(address token, address to, uint256 amount)",
    "function setFeeBps(uint16 newFeeBps)",
    "function setTreasury(address newTreasury)",
    "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, address dexRouter, bytes routerCalldata, address recipient)",
    "function swapETHForTokens(address tokenOut, uint256 minAmountOut, address dexRouter, bytes routerCalldata, address recipient)",
    "function swapTokensForETH(address tokenIn, uint256 amountIn, uint256 minAmountOut, address dexRouter, bytes routerCalldata, address recipient)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
  ]),
};

export default contract;
