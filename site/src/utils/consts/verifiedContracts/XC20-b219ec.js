import { parseAbi } from "viem";

// XC20
// https://assethub-polkadot.subscan.io/account/0xb219ec1c08ae8987018ecc2fbf8669d11c047a20?tab=contract
const contract = {
  name: "XC20",
  abi: parseAbi([
    "function approve(address spender, uint256 value)",
    "function burnAllFrom(address account)",
    "function burnFrom(address from, uint256 amount)",
    "function mintInto(address to, uint256 amount)",
    "function pause()",
    "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
    "function renounceOwnership()",
    "function transfer(address to, uint256 value)",
    "function transferFrom(address from, address to, uint256 value)",
    "function transferOwnership(address newOwner)",
    "function unpause()",
  ]),
};

export default contract;
