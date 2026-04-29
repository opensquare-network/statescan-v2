import EvmExternalLink from "./evmExternalLink";
import { hashEllipsis } from "../../utils/viewFuncs/text";

function getEtherscanAddressUrl(address) {
  return `https://etherscan.io/address/${address}`;
}

export default function EvmAddress({ address, copy = true, tooltip = true }) {
  if (!address) {
    return "--";
  }

  return (
    <EvmExternalLink
      href={getEtherscanAddressUrl(address)}
      copy={copy}
      tooltip={tooltip}
      tooltipContent={address}
    >
      {hashEllipsis(address, 4, 4)}
    </EvmExternalLink>
  );
}
