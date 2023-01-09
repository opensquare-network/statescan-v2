import React from "react";
import { useSelector } from "react-redux";
import { ColoredInterLink } from "../../components/styled/link";
import { assetListSelector } from "../../store/reducers/assetSlice";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../../components/displayValue";
import AddressOrIdentity from "../../components/address";
import Tooltip from "../../components/tooltip";
import SymbolName from "../../components/symbol/name";
import Symbol from "../../components/symbol";
import { bigNumberToLocaleString } from "../viewFuncs";

export function useAssetsTableData() {
  const list = useSelector(assetListSelector);

  if (!list?.items) {
    return null;
  }

  return list?.items?.map((asset) => {
    const { destroyed, assetId, assetHeight, metadata, detail } = asset;
    const link = destroyed
      ? `/asset/${assetId}_${assetHeight}`
      : `/asset/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals);

    return [
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      metadata?.symbol ? <Symbol asset={asset} /> : "--",
      metadata?.name ? <SymbolName name={metadata.name} /> : "--",
      <Tooltip tip={detail?.owner}>
        <AddressOrIdentity address={detail?.owner} />
      </Tooltip>,
      <Tooltip tip={detail?.issuer}>
        <AddressOrIdentity address={detail?.issuer} />
      </Tooltip>,
      detail?.accounts,
      <Tooltip pullRight={true} tip={bigNumberToLocaleString(supply)}>
        <ValueDisplay value={supply} symbol={asset.symbol} />
      </Tooltip>,
    ];
  });
}
