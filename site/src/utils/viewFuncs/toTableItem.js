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
import { bigNumberToLocaleString } from ".";
import Symbol from "../../components/symbol";
import SymbolName from "../../components/symbol/name";
import { fromAssetUnit } from "..";
import {
  getNftInstanceLink,
  getNftInstanceParsedMetadata,
  getNftStatus,
} from "../nft";
import { time } from "./time";
import { TextSecondary } from "../../components/styled/text";
import NftStatus from "../../components/nft/status";
import NftName from "../../components/nft/name";
import Thumbnail from "../../components/nft/thumbnail";
import getTransferDecimals from "./transferDecimals";
import ExtrinsicLink from "../../components/extrinsic/link";
import CallCell from "../../components/table/callCell";
import AssetSymbolAndName from "../../components/asset/assetSymbolAndName";
import { addressEllipsis } from "@osn/common";
import ForeignAssetsLocation from "../../components/foreignAssetsLocation";

export const toEventTabTableItem = (events = []) => {
  return (
    events?.map((event, index) => {
      return [
        <ColoredLink
          key={`${index}-1`}
          to={`/events/${event?.indexer?.blockHeight}-${event?.indexer?.eventIndex}`}
        >
          {event?.indexer?.blockHeight.toLocaleString()}-
          {event?.indexer?.eventIndex}
        </ColoredLink>,
        <ExtrinsicLink key={`${index}-1`} indexer={event?.indexer} />,
        <CallCell call={event} />,
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
          to={`/events/${transfer?.indexer?.blockHeight}-${transfer?.indexer?.eventIndex}`}
        >
          {transfer?.indexer?.blockHeight.toLocaleString()}-
          {transfer?.indexer?.eventIndex}
        </ColoredLink>,
        <ExtrinsicLink indexer={transfer?.indexer} />,
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
            getTransferDecimals(transfer, chainSetting.decimals),
          )} ${getTransferSymbol(transfer, chainSetting.symbol)}`}
          pullRight
        >
          <ValueDisplay
            value={toPrecision(
              transfer?.balance,
              getTransferDecimals(transfer, chainSetting.decimals),
            )}
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
        <ExtrinsicLink indexer={extrinsic?.indexer} />,
        <ColoredLink
          key={`${index}-2`}
          to={`/blocks/${extrinsic?.indexer?.blockHeight}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        extrinsic?.indexer?.blockTime,
        <Tooltip tip={extrinsic.hash}>
          <ColoredMonoLink
            to={`/extrinsics/${extrinsic?.indexer?.blockHeight}-${extrinsic?.indexer?.extrinsicIndex}`}
          >
            {hashEllipsis(extrinsic.hash)}
          </ColoredMonoLink>
        </Tooltip>,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        <CallCell call={extrinsic?.call} />,
        <ExtrinsicParametersDisplay extrinsic={extrinsic} />,
      ];
    }) ?? null
  );
};

export const toExtrinsicsTabTableItemSimpleMode = (extrinsics) => {
  return (
    extrinsics?.map((extrinsic, index) => {
      return [
        <ExtrinsicLink indexer={extrinsic?.indexer} />,
        <ColoredLink
          key={`${index}-2`}
          to={`/blocks/${extrinsic?.indexer?.blockHeight}`}
        >
          {extrinsic?.indexer?.blockHeight.toLocaleString()}
        </ColoredLink>,
        extrinsic?.indexer?.blockTime,
        extrinsic?.isSuccess ? <CheckIcon /> : <CrossIcon />,
        <CallCell call={extrinsic?.call || extrinsic} />,
        <ExtrinsicParametersDisplay extrinsic={extrinsic} />,
      ];
    }) ?? null
  );
};

export const toAssetsTabItem = (assets) => {
  return assets?.map((asset) => {
    const {
      assetId,
      assetHeight,
      balance,
      asset: { metadata, detail, destroyed },
      isFrozen,
    } = asset;

    const link = destroyed
      ? `/assets/${assetId}_${assetHeight}`
      : `/assets/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      metadata?.symbol ? <Symbol asset={asset} /> : "--",
      metadata?.name ? <SymbolName name={metadata.name} /> : "--",
      bigNumberToLocaleString(fromAssetUnit(balance, metadata?.decimals)),
      // bigNumberToLocaleString(fromAssetUnit(approved || 0, metadata?.decimals)), // https://github.com/opensquare-network/statescan-v2/issues/1036
      isFrozen?.toString(),
      <Tooltip pullRight tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} />
      </Tooltip>,
    ];
  });
};

export const toForeignAssetsTabItem = (foreignAssets) => {
  return foreignAssets?.map((foreignAsset) => {
    const { assetId, balance, asset } = foreignAsset;
    const { metadata, detail, location } = asset;

    const link = `/foreign-assets/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <AssetSymbolAndName asset={asset} foreignAsset={true} />,
      <Tooltip tip={assetId}>
        <ColoredMonoLink to={link}>{addressEllipsis(assetId)}</ColoredMonoLink>
      </Tooltip>,
      <ForeignAssetsLocation location={location} />,
      bigNumberToLocaleString(fromAssetUnit(balance, metadata?.decimals)),
      metadata?.isFrozen?.toString(),
      <Tooltip pullRight tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} />
      </Tooltip>,
    ];
  });
};

export const toInstancesTabTableItem = (
  nftClass,
  nftInstance,
  showPreview,
  showFullInstanceId = false,
) => {
  const { details, indexer } = nftInstance;
  const parsedMetadata = getNftInstanceParsedMetadata(nftClass, nftInstance);
  const resource = parsedMetadata?.resource;
  const link = getNftInstanceLink(nftClass, nftInstance);
  const instanceId = showFullInstanceId
    ? `${nftInstance.classId}-${nftInstance.instanceId}`
    : nftInstance.instanceId;

  return [
    <ColoredInterLink to={link}>{instanceId}</ColoredInterLink>,
    <Thumbnail
      image={resource?.thumbnail}
      background={resource?.metadata?.background}
      onClick={showPreview}
    />,
    <ColoredInterLink to={link}>
      <NftName name={parsedMetadata?.name} />
    </ColoredInterLink>,
    <TextSecondary>{time(indexer.blockTime)}</TextSecondary>,
    <Tooltip tip={details?.owner}>
      <AddressOrIdentity address={details?.owner} />
    </Tooltip>,
    <NftStatus status={getNftStatus(nftInstance)} />,
  ];
};

export const toNftInstanceTransferTabTableItem = (
  transfer,
  nftClass,
  nftInstance,
  showPreview,
) => {
  const link = getNftInstanceLink(nftClass, nftInstance);
  const parsedMetadata = getNftInstanceParsedMetadata(nftClass, nftInstance);
  const resource = parsedMetadata?.resource;

  return [
    <ExtrinsicLink indexer={transfer?.indexer} />,
    <ColoredLink to={link}>
      {nftInstance?.classId}-{nftInstance?.instanceId}
    </ColoredLink>,
    transfer?.indexer?.blockTime,
    <Thumbnail
      image={resource?.thumbnail}
      background={resource?.metadata?.background}
      onClick={showPreview}
    />,
    parsedMetadata?.name,
    <Tooltip tip={transfer?.from}>
      <AddressOrIdentity address={transfer?.from} />
    </Tooltip>,
    <Tooltip tip={transfer?.to}>
      <AddressOrIdentity address={transfer?.to} />
    </Tooltip>,
  ];
};
