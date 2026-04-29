import Tooltip from "../tooltip";
import { LidoEtherscanLinkWithCopy } from "./etherscanLink";
import { hashEllipsis } from "../../utils/viewFuncs/text";

function getEtherscanAddressUrl(address) {
  return `https://etherscan.io/address/${address}`;
}

export default function LidoAddress({ address }) {
  if (!address) {
    return "--";
  }

  return (
    <Tooltip tip={address}>
      <LidoEtherscanLinkWithCopy href={getEtherscanAddressUrl(address)}>
        {hashEllipsis(address, 4, 4)}
      </LidoEtherscanLinkWithCopy>
    </Tooltip>
  );
}
