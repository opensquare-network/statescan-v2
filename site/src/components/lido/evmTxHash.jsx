import EvmExternalLink from "./evmExternalLink";
import { getEtherscanTxUrl } from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";

export default function EvmTxHash({ txHash, copy = true, tooltip = true }) {
  if (!txHash) {
    return "--";
  }

  return (
    <EvmExternalLink
      href={getEtherscanTxUrl(txHash)}
      copy={copy}
      tooltip={tooltip}
      tooltipContent={txHash}
    >
      {hashEllipsis(txHash)}
    </EvmExternalLink>
  );
}
