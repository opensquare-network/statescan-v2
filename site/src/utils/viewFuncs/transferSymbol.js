export default function getTransferSymbol(transfer = {}, nativeTokenSymbol) {
  const { symbol, isNativeAsset } = transfer;
  if (symbol) {
    return symbol;
  }

  return isNativeAsset ? nativeTokenSymbol : "-";
}
