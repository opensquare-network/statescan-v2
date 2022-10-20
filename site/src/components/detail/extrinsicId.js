import { withCopy } from "../../HOC/withCopy";
import { currencify } from "../../utils";
import { ColoredInterLink } from "../styled/link";

const ColoredWithCopy = withCopy(ColoredInterLink);

export default function DetailedExtrinsicId({ blockHeight, id }) {
  return (
    <ColoredWithCopy
      to={`/extrinsic/${blockHeight}-${id}`}
      render={() => `${currencify(blockHeight)}-${id}`}
    >
      {`${blockHeight}-${id}`}
    </ColoredWithCopy>
  );
}
