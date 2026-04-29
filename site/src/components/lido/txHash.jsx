import Tooltip from "../tooltip";
import ExternalLinkWithCopy from "../externalLinkWithCopy";
import { getEtherscanTxUrl } from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";

export default function LidoTxHash({ txHash }) {
  if (!txHash) {
    return "--";
  }

  return (
    <Tooltip tip={txHash}>
      <ExternalLinkWithCopy href={getEtherscanTxUrl(txHash)}>
        {hashEllipsis(txHash)}
      </ExternalLinkWithCopy>
    </Tooltip>
  );
}
