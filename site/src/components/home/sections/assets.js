import { toPrecision } from "@osn/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assetFetchList,
  assetListLoadingSelector,
  assetListSelector,
} from "../../../store/reducers/assetSlice";
import { assetsHead } from "../../../utils/constants";
import AddressOrIdentity from "../../address";
import ValueDisplay from "../../displayValue";
import { Flex } from "../../styled/flex";
import { ColoredInterLink } from "../../styled/link";
import Symbol from "../../symbol";
import SymbolName from "../../symbol/name";
import Table from "../../table";
import Tooltip from "../../tooltip";

const page = 0;
const pageSize = 4;

export default function Assets() {
  const dispatch = useDispatch();

  const assets = useSelector(assetListSelector);
  const loading = useSelector(assetListLoadingSelector);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(
      assetFetchList(page, pageSize, null, {
        signal: controller.signal,
      }),
    );

    return () => controller.abort();
  }, [dispatch]);

  const data =
    assets?.items?.map((asset) => {
      return [
        <ColoredInterLink to={`/asset/${asset.assetId}_${asset.assetHeight}`}>
          #{asset.assetId}
        </ColoredInterLink>,
        asset?.metadata?.symbol ? (
          <Flex gap={8}>
            <Symbol detail={asset?.detail} symbol={asset.metadata.symbol} />
            <SymbolName name={asset.metadata.name} />
          </Flex>
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
        <ValueDisplay
          value={toPrecision(asset?.detail?.supply, asset?.metadata?.decimals)}
          symbol={asset.symbol}
        />,
      ];
    }) ?? null;

  return <Table heads={assetsHead} data={data} loading={loading} />;
}
