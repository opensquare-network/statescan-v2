import EvmAddressWithAvatar from "../evm/address";
import { getEtherscanAddressUrl } from "../../utils/viewFuncs/lido";

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
