import { parseAbi } from "viem";

// PlazaSwapV2DirectAdapter
// https://assethub-polkadot.subscan.io/account/0xa7a52b6b37c234c2e2c8005e2f61aec9f8c90dbd?tab=contract
const contract = {
  name: "PlazaSwapV2DirectAdapter",
  abi: parseAbi([
    "function acceptOwnership()",
    "function graduate(address token, address quoteToken, uint256 tokenAmount, uint256 quoteAmount, address lpRecipient)",
    "function setAuthorized(address caller, bool status)",
    "function transferOwnership(address newOwner)",
    "function withdrawETH(address _to, uint256 _amount)",
    "function withdrawToken(address _token, address _to, uint256 _amount)",
  ]),
};

export default contract;
