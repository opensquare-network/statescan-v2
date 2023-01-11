import {
  ColoredInterLink,
  ColoredLink,
  ColoredMonoLink,
} from "../../components/styled/link";
import React from "react";
import ValueDisplay from "../../components/displayValue";
import { toPrecision } from "@osn/common";
import Tooltip from "../../components/tooltip";
import AddressOrIdentity from "../../components/address";
import { hashEllipsis } from "./text";
import { ReactComponent as CheckIcon } from "../../components/icons/check.svg";
import { ReactComponent as CrossIcon } from "../../components/icons/cross.svg";
import getTransferSymbol from "./transferSymbol";
import EventAttributeDisplay from "../../components/eventAttributeDisplay";
import ExtrinsicParametersDisplay from "../../components/extrinsicParametersDisplay";
import { bigNumberToLocaleString } from "./index";
import Symbol from "../../components/symbol";
import SymbolName from "../../components/symbol/name";
import { fromAssetUnit } from "..";

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
        <EventAttributeDisplay event={event} />,
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
          <AddressOrIdentity address={transfer?.from} />
        </Tooltip>,
        <Tooltip tip={transfer?.to}>
          <AddressOrIdentity address={transfer?.to} />
        </Tooltip>,
        <Tooltip
          tip={`${toPrecision(
            transfer?.balance,
            chainSetting.decimals,
          )} ${getTransferSymbol(transfer, chainSetting.symbol)}`}
          pullRight
        >
          <ValueDisplay
            value={toPrecision(transfer?.balance, chainSetting.decimals)}
            symbol={getTransferSymbol(transfer, chainSetting.symbol)}
          />
        </Tooltip>,
      ];
    }) ?? null
  );
};

export const toExtrinsicsTabTableItem = (extrinsics) => {
  return (
    extrinsics?.map((extrinsic, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/extrinsic/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}-
          {extrinsic?.indexer?.extrinsicIndex}
        </ColoredLink>,
        <Tooltip tip={extrinsic.hash}>
          <ColoredMonoLink to={""}>
            {hashEllipsis(extrinsic.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        `${extrinsic?.call?.section}(${extrinsic?.call?.method})`,
        <ExtrinsicParametersDisplay extrinsic={extrinsic} />,
      ];
    }) ?? null
  );
};

export const toHoldersTabTableItem = (holders, asset) => {
  if (!holders || !asset) {
    return null;
  }

  return holders.map((holder, index) => {
    return [
      index + 1,
      <Tooltip tip={holder?.address}>
        <AddressOrIdentity address={holder?.address} ellipsis={false} />
      </Tooltip>,
      bigNumberToLocaleString(
        toPrecision(holder?.balance, asset?.metadata?.decimals),
      ),
    ];
  });
};

export const toAssetsTabItem = (assets) => {
  return assets?.map((asset) => {
    const {
      destroyed,
      assetId,
      assetHeight,
      balance,
      asset: { metadata, detail },
      isFrozen,
      approved,
    } = asset;

    const link = destroyed
      ? `/asset/${assetId}_${assetHeight}`
      : `/asset/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      metadata?.symbol ? <Symbol asset={asset} /> : "--",
      metadata?.name ? <SymbolName name={metadata.name} /> : "--",
      bigNumberToLocaleString(fromAssetUnit(balance, metadata?.decimals)),
      bigNumberToLocaleString(fromAssetUnit(approved || 0, metadata?.decimals)),
      isFrozen?.toString(),
      <Tooltip pullRight tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} />
      </Tooltip>,
    ];
  });
};
