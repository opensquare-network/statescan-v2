import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";

export default function DetailedCallId({ blockHeight, id }) {
  return (
    <ColoredInterLinkWithCopy
      to={`/call/${id}`}
      render={() => `${currencify(blockHeight)}-${id}`}
    >
      {`${blockHeight}-${id}`}
    </ColoredInterLinkWithCopy>
  );
}
