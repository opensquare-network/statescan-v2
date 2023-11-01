import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";

export default function DetailedCallId({ blockHeight, extrinsicIndex, id }) {
  return (
    <ColoredInterLinkWithCopy
      to={`/calls/${blockHeight}-${extrinsicIndex}-${id}`}
      render={() => `${currencify(blockHeight)}-${extrinsicIndex}-${id}`}
    >
      {`${blockHeight}-${extrinsicIndex}-${id}`}
    </ColoredInterLinkWithCopy>
  );
}
