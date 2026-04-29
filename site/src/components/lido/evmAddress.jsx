import EvmAddressWithAvatar from "../evm/address";

function getEtherscanAddressUrl(address) {
  return `https://etherscan.io/address/${address}`;
}

export default function EvmAddress({
  address,
  copy = true,
  tooltip = true,
  maxWidth,
}) {
  return (
    <EvmAddressWithAvatar
      address={address}
      href={getEtherscanAddressUrl(address)}
      copy={copy}
      tooltip={tooltip}
      maxWidth={maxWidth}
    />
  );
}
