export default function getTransferDecimals(
  transfer = {},
  nativeTokenDecimals,
) {
  const { decimals, isNativeAsset } = transfer;
  if (decimals) {
    return decimals;
  }
  return isNativeAsset ? nativeTokenDecimals : decimals;
}
