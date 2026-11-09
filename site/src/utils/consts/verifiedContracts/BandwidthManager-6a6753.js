import { parseAbi } from "viem";

// BandwidthManager
// https://assethub-polkadot.subscan.io/account/0x6a67533ce73756ffab17c05578a5fbba5d9b2d8d?tab=contract
const contract = {
  name: "BandwidthManager",
  abi: parseAbi([
    "function onAccept(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function onGetResponse((((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), (bytes key, bytes value)[]), address relayer))",
    "function onGetTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, uint64 timeoutTimestamp, bytes[] keys, uint64 height, bytes context), address relayer))",
    "function onPostRequestTimeout(((bytes source, bytes dest, uint64 nonce, bytes from, bytes to, uint64 timeoutTimestamp, bytes body), address relayer))",
    "function purchase(bytes app, uint256 tier, uint256 months, bytes chain)",
    "function renounceOwnership()",
    "function setHost(address hostAddr)",
    "function transferOwnership(address newOwner)",
  ]),
};

export default contract;
