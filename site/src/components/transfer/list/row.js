import { ColoredLink } from "../../styled/link";
import Tooltip from "../../tooltip";
import AddressOrIdentity from "../../address";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import React from "react";

const ExtrinsicLink = ({ indexer }) => {
  if (!indexer?.extrinsicIndex) {
    return `--`;
  }
  return (
    <ColoredLink
      to={`/extrinsic/${indexer?.blockHeight}-${indexer?.extrinsicIndex}`}
    >
      {indexer?.blockHeight.toLocaleString()}-{indexer?.extrinsicIndex}
    </ColoredLink>
  );
};

function TransferTableRow(transfer, key, chainSetting) {
  return [
    <ColoredLink
      key={`${key}-1`}
      to={`/event/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
    >
      {transfer?.indexer?.blockHeight.toLocaleString()}-
      {transfer?.indexer?.eventIndex}
    </ColoredLink>,
    <ExtrinsicLink key={`${key}-1`} indexer={transfer.indexer} />,
    <ColoredLink
      key={`${key}-2`}
      to={`/block/${transfer?.indexer?.blockHeight}`}
    >
      {transfer?.indexer?.blockHeight.toLocaleString()}
    </ColoredLink>,
    transfer?.indexer?.blockTime,
    <Tooltip tip={transfer?.from}>
      <AddressOrIdentity address={transfer?.from} />
    </Tooltip>,
    <Tooltip tip={transfer?.to}>
      <AddressOrIdentity address={transfer?.to} />
    </Tooltip>,
    <ValueDisplay
      value={toPrecision(
        transfer?.balance?.$numberDecimal,
        chainSetting.decimals,
      )}
      symbol={chainSetting.symbol}
    />,
  ];
}

export default TransferTableRow;
