import { parseAbi } from "viem";

// HostManager
// https://assethub-polkadot.subscan.io/account/0xc09a8229e2c18dead6a2795154d7d8c7f1ac5dfa?tab=contract
const contract = {
  name: "HostManager",
  abi: parseAbi([
    "function init(address hostAddr)",
    "function onAccept(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function onGetResponse((((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer))",
    "function onGetTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer))",
    "function onPostRequestTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function quote((bytes dest, bytes to, bytes body, uint64 timeout, uint256 fee, address payer))",
    "function quote((bytes dest, uint64 height, bytes[] keys, uint64 timeout, uint256 fee, bytes context, address payer))",
  ]),
};

export default contract;
