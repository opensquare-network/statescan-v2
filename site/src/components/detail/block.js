import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";

export default function DetailedBlock({ blockHeight }) {
  return (
    <ColoredInterLinkWithCopy to={`/blocks/${blockHeight}`} render={currencify}>
      {blockHeight}
    </ColoredInterLinkWithCopy>
  );
}
