import { withCopy } from "../../HOC/withCopy";
import { currencify } from "../../utils";
import { ColoredInterLink } from "../styled/link";

const ColoredWithCopy = withCopy(ColoredInterLink);

export default function DetailedCallId({ blockHeight, id }) {
  return (
    <ColoredWithCopy
      to={`/call/${id}`}
      render={() => `${currencify(blockHeight)}-${id}`}
    >
      {`${blockHeight}-${id}`}
    </ColoredWithCopy>
  );
}
