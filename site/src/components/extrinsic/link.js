import React from "react";
import { ColoredLink } from "../styled/link";
import isNil from "lodash.isnil";

const ExtrinsicLink = ({ indexer }) => {
  if (isNil(indexer?.extrinsicIndex)) {
    return "--";
  }
  return (
    <ColoredLink
      to={`/extrinsics/${indexer?.blockHeight}-${indexer?.extrinsicIndex}`}
    >
      {indexer?.blockHeight.toLocaleString()}-{indexer?.extrinsicIndex}
    </ColoredLink>
  );
};

export default ExtrinsicLink;
