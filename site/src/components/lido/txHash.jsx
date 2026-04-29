import Tooltip from "../tooltip";
import { getEtherscanTxUrl } from "../../utils/viewFuncs/lido";
import { hashEllipsis } from "../../utils/viewFuncs/text";
import { LidoEtherscanLinkWithCopy } from "./etherscanLink";

export default function LidoTxHash({ txHash }) {
  if (!txHash) {
    return "--";
  }

  return (
    <Tooltip tip={txHash}>
      <LidoEtherscanLinkWithCopy href={getEtherscanTxUrl(txHash)}>
        {hashEllipsis(txHash)}
      </LidoEtherscanLinkWithCopy>
    </Tooltip>
  );
}
