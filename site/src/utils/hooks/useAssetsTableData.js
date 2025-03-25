import { ColoredInterLink } from "../../components/styled/link";
import { toPrecision } from "@osn/common";
import ValueDisplay from "../../components/displayValue";
import AddressOrIdentity from "../../components/address";
import Tooltip from "../../components/tooltip";
import SymbolName from "../../components/symbol/name";
import Symbol from "../../components/symbol";
import { bigNumberToLocaleString } from "../viewFuncs";
import { Flex } from "../../components/styled/flex";
import TimeBody from "../../components/table/body/time";
import { timeTypes } from "../constants";
import styled, { css } from "styled-components";
import { Inter_14_500 } from "../../styles/text";

const AssetNameWrapper = styled.div`
  ${Inter_14_500};
  color: var(--fontSecondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const AssetSymbolWrapper = styled.div`
  width: 120px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const symbolStyle = css`
  width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export function useAssetsTableData(assets = []) {
  return assets?.map?.((asset) => {
    const { destroyed, assetId, assetHeight, metadata, detail } = asset;
    const link = destroyed
      ? `/assets/${assetId}_${assetHeight}`
      : `/assets/${assetId}`;
    const supply = toPrecision(detail?.supply, metadata?.decimals || 0);

    return [
      <Flex>
        <AssetSymbolWrapper>
          {metadata?.symbol ? (
            <Symbol asset={asset} style={symbolStyle} />
          ) : (
            "--"
          )}
        </AssetSymbolWrapper>

        <AssetNameWrapper>
          {metadata?.name ? (
            <SymbolName
              name={metadata.name}
              color="var(--fontSecondary)"
              width="384px"
            />
          ) : (
            "--"
          )}
        </AssetNameWrapper>
      </Flex>,
      <ColoredInterLink to={link}>#{assetId}</ColoredInterLink>,
      <Tooltip tip={detail?.owner}>
        <AddressOrIdentity key={detail?.owner} address={detail?.owner} />
      </Tooltip>,
      <Tooltip tip={detail?.issuer}>
        <AddressOrIdentity key={detail?.issuer} address={detail?.issuer} />
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
        <AddressOrIdentity key={detail?.owner} address={detail?.owner} />
      </Tooltip>,
      <Tooltip pullRight={true} tip={bigNumberToLocaleString(destroy)}>
        <ValueDisplay value={destroy} />
      </Tooltip>,
    ];
  });
}
