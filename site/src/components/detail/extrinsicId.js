import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";
import isNil from "lodash.isnil";

export default function DetailedExtrinsicId({ blockHeight, id }) {
  if (isNil(id)) {
    return "--";
  }

  return (
    <ColoredInterLinkWithCopy
      to={`/extrinsics/${blockHeight}-${id}`}
      render={() => `${currencify(blockHeight)}-${id}`}
    >
      {`${blockHeight}-${id}`}
    </ColoredInterLinkWithCopy>
  );
}
