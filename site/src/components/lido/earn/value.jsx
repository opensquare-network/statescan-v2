import isNil from "lodash.isnil";
import ValueDisplay from "../../displayValue";
import LoadableContent from "../../loadings/loadableContent";
import LidoValue from "../value";
import { useLidoEarnAssets } from "../../../context/lidoEarn";
import { toLidoAmount } from "../../../utils/viewFuncs/lido";
import { EARN_SHARES_DECIMALS } from "./common";

function useEarnAssetMetadata(asset) {
  const { getAssetDecimals, getAssetSymbol, loading } = useLidoEarnAssets();

  return {
    decimals: getAssetDecimals(asset),
    loading,
    symbol: getAssetSymbol(asset),
  };
}

export function EarnTableValue({ value, decimals, symbol }) {
  if (isNil(value) || isNil(decimals) || isNil(symbol)) {
    return "--";
  }

  return (
    <ValueDisplay
      value={toLidoAmount(value, decimals)}
      symbol={symbol}
      showNotEqualTooltip
    />
  );
}

export function EarnDetailValue({ value, decimals, symbol }) {
  if (isNil(value) || isNil(decimals) || isNil(symbol)) {
    return "--";
  }

  return <LidoValue value={value} decimals={decimals} symbol={symbol} />;
}

export function EarnTableSharesValue({ value }) {
  return (
    <EarnTableValue value={value} decimals={EARN_SHARES_DECIMALS} symbol="" />
  );
}

export function EarnDetailSharesValue({ value }) {
  return (
    <EarnDetailValue value={value} decimals={EARN_SHARES_DECIMALS} symbol="" />
  );
}

export function EarnTableAssetValue({ value, asset }) {
  const { decimals, loading, symbol } = useEarnAssetMetadata(asset);

  if (loading && (isNil(decimals) || !symbol)) {
    return <LoadableContent loading />;
  }

  return <EarnTableValue value={value} decimals={decimals} symbol={symbol} />;
}

export function EarnDetailAssetValue({ value, asset }) {
  const { decimals, loading, symbol } = useEarnAssetMetadata(asset);

  if (loading && (isNil(decimals) || !symbol)) {
    return <LoadableContent loading />;
  }

  return <EarnDetailValue value={value} decimals={decimals} symbol={symbol} />;
}
