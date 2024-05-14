import React from "react";
import { ColoredInterLink } from "../../components/styled/link";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../../components/displayValue";
import AddressOrIdentity from "../../components/address";
import Tooltip from "../../components/tooltip";
import SymbolName from "../../components/symbol/name";
import Symbol from "../../components/symbol";
import { bigNumberToLocaleString } from "../viewFuncs";
import TimeBody from "../../components/table/body/time";
import { timeTypes } from "../constants";
import { Flex } from "../../components/styled/flex";

export function useAssetsTableData(assets = []) {
  return assets?.map?.((asset) => {
    const { destroyed, assetId, assetHeight, metadata, detail } = asset;
    const link = destroyed
      ? `/assets/${assetId}_${assetHeight}`
      : `/assets/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      <Flex>{metadata?.symbol ? <Symbol asset={asset} /> : "--"}</Flex>,
      metadata?.name ? <SymbolName name={metadata.name} /> : "--",
      <Tooltip tip={detail?.owner}>
        <AddressOrIdentity address={detail?.owner} />
      </Tooltip>,
      <Tooltip tip={detail?.issuer}>
        <AddressOrIdentity address={detail?.issuer} />
      </Tooltip>,
      detail?.accounts,
      <Tooltip pullRight={true} tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} />
      </Tooltip>,
    ];
  });
}

export function useDestroyedAssetsTableData(assets = []) {
  if (!assets?.length) {
    return null;
  }

  return assets.map((asset) => {
    const { destroyed, destroyedAt, assetId, assetHeight, metadata, detail } =
      asset;
    const link = destroyed
      ? `/assets/${assetId}_${assetHeight}`
      : `/assets/${assetId}`;
    const destroy = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      <ColoredInterLink to={link}>
        {assetHeight?.toLocaleString?.()}
      </ColoredInterLink>,
      <Flex>
        {metadata?.symbol ? (
          <Symbol asset={asset} destroyed={destroyed} />
        ) : (
          "--"
        )}
      </Flex>,
      metadata?.name ? <SymbolName name={metadata.name} /> : "--",
      <TimeBody timeType={timeTypes.date} ts={destroyedAt?.blockTime} />,
      <Tooltip tip={detail?.owner}>
        <AddressOrIdentity address={detail?.owner} />
      </Tooltip>,
      <Tooltip pullRight={true} tip={bigNumberToLocaleString(destroy)}>
        <ValueDisplay value={destroy} />
      </Tooltip>,
    ];
  });
}
