import React from "react";
import { ColoredLink } from "../styled/link";
import isNil from "lodash.isnil";

const MultisigLink = ({ indexer }) => {
  if (isNil(indexer?.extrinsicIndex)) {
    return `--`;
  }
  return (
    <ColoredLink
      to={`/multisigs/${indexer?.blockHeight}-${indexer?.extrinsicIndex}`}
    >
      {indexer?.blockHeight.toLocaleString()}-{indexer?.extrinsicIndex}
    </ColoredLink>
  );
};

export default MultisigLink;
