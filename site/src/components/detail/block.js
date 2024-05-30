import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy, ColoredInterLink } from "../styled/link";

export default function DetailedBlock({ blockHeight, copy = false }) {
  if (!copy) {
    return (
      <ColoredInterLink to={`/blocks/${blockHeight}`}>
        {currencify(blockHeight)}
      </ColoredInterLink>
    );
  }

  return (
    <ColoredInterLinkWithCopy to={`/blocks/${blockHeight}`} render={currencify}>
      {blockHeight}
    </ColoredInterLinkWithCopy>
  );
}
