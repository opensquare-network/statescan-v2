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
import styled from "styled-components";
import { bigNumberToLocaleString } from "../viewFuncs";
import { Inter_12_600 } from "../../styles/text";

const TipTitle = styled.div`
  ${Inter_12_600};
`;

function TotalSupplyTip({ supply }) {
  return (
    <div>
      <TipTitle>Total Supply</TipTitle>
      <div>{bigNumberToLocaleString(supply)}</div>
    </div>
  );
}

export function useAssetsTableData() {
  const list = useSelector(assetListSelector);

  const data =
    list?.items?.map((asset) => {
      const supply = toPrecision(
        asset?.detail?.supply,
        asset?.metadata?.decimals,
      );
      return [
        <ColoredInterLink to={`/asset/${asset.assetId}_${asset.assetHeight}`}>
          #{asset.assetId}
        </ColoredInterLink>,
        asset?.metadata?.symbol ? <Symbol asset={asset} /> : "--",
        asset?.metadata?.name ? (
          <SymbolName name={asset.metadata.name} />
        ) : (
          "--"
        ),
        <Tooltip tip={asset?.detail?.owner}>
          <AddressOrIdentity address={asset?.detail?.owner} />
        </Tooltip>,
        <Tooltip tip={asset?.detail?.issuer}>
          <AddressOrIdentity address={asset?.detail?.issuer} />
        </Tooltip>,
        asset?.detail?.accounts,
        <Tooltip pullRight={true} tip={<TotalSupplyTip supply={supply} />}>
          <ValueDisplay value={supply} symbol={asset.symbol} />
        </Tooltip>,
      ];
    }) ?? null;

  return data;
}
