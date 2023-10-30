import styled from "styled-components";
import { currencify } from "../../utils";
import { ColoredInterLinkWithCopy } from "../styled/link";
import isNil from "lodash.isnil";

const NilId = styled.span`
  color: ${({ theme }) => theme.fontTertiary};
`;

export default function DetailedExtrinsicId({ blockHeight, id }) {
  if (isNil(id)) {
    return <NilId>--</NilId>;
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
