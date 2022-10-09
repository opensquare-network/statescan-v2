import { ColoredLink, ColoredMonoLink } from "../../components/styled/link";
import React from "react";
import { addressEllipsis } from "./text";
import ValueDisplay from "../../components/displayValue";
import { toPrecision } from "./index";
import Tooltip from "../../components/tooltip";

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

export const toTransferTabTableItem = (transfers, chainSetting) => {
  return (
    transfers?.map((transfer, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/event/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}-
          {transfer?.indexer?.eventIndex}
        </ColoredLink>,
        <ColoredLink
          key={`${index}-2`}
          to={`/extrinsic/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.extrinsicIndex}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}-
          {transfer?.indexer?.extrinsicIndex}
        </ColoredLink>,
        transfer?.indexer?.blockTime,
        <Tooltip tip={transfer?.from}>
          <ColoredMonoLink key={`${index}-3`} to={`/account/${transfer?.from}`}>
            {addressEllipsis(transfer?.from)}
          </ColoredMonoLink>
        </Tooltip>,
        <Tooltip tip={transfer?.to}>
          <ColoredMonoLink key={`${index}-4`} to={`/account/${transfer?.to}`}>
            {addressEllipsis(transfer?.to)}
          </ColoredMonoLink>
        </Tooltip>,
        <Tooltip
          tip={`${toPrecision(
            transfer?.balance?.$numberDecimal,
            chainSetting.decimals,
          )} ${chainSetting.symbol}`}
        >
          <ValueDisplay
            value={toPrecision(
              transfer?.balance?.$numberDecimal,
              chainSetting.decimals,
            )}
            symbol={chainSetting.symbol}
          />
        </Tooltip>,
      ];
    }) ?? null
  );
};
