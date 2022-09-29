import { ColoredLink } from "../../components/styled/link";
import React from "react";

export const toEventTabTableItem = (events) => {
  return (
    events?.map((event, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/event/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${event?.indexer?.blockHeight}-${event?.indexer?.extrinsicIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.extrinsicIndex}
        </ColoredLink>,
        `${event?.section}(${event?.method})`,
        event?.args,
      ];
    }) ?? null
  );
};
