export function formatForeignAssetsInfo(foreignAssets) {
  if (!foreignAssets) return {};

  const foreignAssetsEntries = Object.values(foreignAssets).map(
    ({ id, data }) => [id, data],
  );

  return Object.fromEntries(foreignAssetsEntries);
}
