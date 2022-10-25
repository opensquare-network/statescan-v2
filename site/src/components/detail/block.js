import { withCopy } from "../../HOC/withCopy";
import { currencify } from "../../utils";
import { ColoredInterLink } from "../styled/link";

const ColoredWithCopy = withCopy(ColoredInterLink);

export default function DetailedBlock({ blockHeight }) {
  return (
    <ColoredWithCopy to={`/block/${blockHeight}`} render={currencify}>
      {blockHeight}
    </ColoredWithCopy>
  );
}
