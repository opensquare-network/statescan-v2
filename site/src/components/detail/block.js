import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";

export default function DetailedBlock({ blockHeight }) {
  return (
    <ColoredInterLinkWithCopy to={`/block/${blockHeight}`} render={currencify}>
      {blockHeight}
    </ColoredInterLinkWithCopy>
  );
}
