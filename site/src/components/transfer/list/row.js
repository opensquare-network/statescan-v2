import React from "react";
import { ColoredLink } from "../../styled/link";
import Tooltip from "../../tooltip";
import AddressOrIdentity from "../../address";
import ValueDisplay from "../../displayValue";
import { toPrecision } from "@osn/common";
import getTransferSymbol from "../../../utils/viewFuncs/transferSymbol";
import SymbolLink from "../../symbol/symbolLink";
import getTransferDecimals from "../../../utils/viewFuncs/transferDecimals";
import ExtrinsicLink from "../../extrinsic/link";

function TransferTableRow(transfer, key, chainSetting) {
  return [
    <ColoredLink
      key={`${key}-1`}
      to={`/events/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
    >
      {transfer?.indexer?.blockHeight.toLocaleString()}-
      {transfer?.indexer?.eventIndex}
    </ColoredLink>,
    <ExtrinsicLink key={`${key}-1`} indexer={transfer.indexer} />,
    transfer?.indexer?.blockTime,
    <Tooltip tip={transfer?.from}>
      <AddressOrIdentity address={transfer?.from} />
    </Tooltip>,
    <Tooltip tip={transfer?.to}>
      <AddressOrIdentity address={transfer?.to} />
    </Tooltip>,
    <ValueDisplay
      value={toPrecision(
        transfer?.balance,
        getTransferDecimals(transfer, chainSetting.decimals),
      )}
      symbol={
        <SymbolLink assetId={transfer.assetId}>
          {getTransferSymbol(transfer, chainSetting.symbol)}
        </SymbolLink>
      }
      showNotEqualTooltip
    />,
  ];
}

export default TransferTableRow;
