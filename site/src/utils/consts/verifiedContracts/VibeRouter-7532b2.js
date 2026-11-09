import { parseAbi } from "viem";

// VibeRouter
// https://assethub-polkadot.subscan.io/account/0x7532b23dfb30ac22b2a74e3b81cc288de19379ba?tab=contract
const contract = {
  name: "VibeRouter",
  abi: parseAbi([
    "function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline)",
    "function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)",
    "function multicall(bytes[] data)",
    "function pause()",
    "function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline)",
    "function removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)",
    "function renounceOwnership()",
    "function rescueFunds(address _token)",
    "function swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)",
    "function swapExactETHForTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapExactETHForTokensSupportingFeeOnTransferTokens(uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapExactTokensForETH(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapExactTokensForETHSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapExactTokensForTokensSupportingFeeOnTransferTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline)",
    "function swapTokensForExactETH(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline)",
    "function swapTokensForExactTokens(uint256 amountOut, uint256 amountInMax, address[] path, address to, uint256 deadline)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
  ]),
};

export default contract;
