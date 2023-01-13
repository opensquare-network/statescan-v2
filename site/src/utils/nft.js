export function getNftStatus(nftObject) {
  let status = "Active";
  if (nftObject?.details?.isFrozen) {
    status = "Frozen";
  }
  if (nftObject?.isDestroyed) {
    status = "Destroyed";
  }
  return status;
}

export function getNftClassLink(nftClass) {
  const { isDestroyed, classId, classHeight } = nftClass;
  return isDestroyed
    ? `/nft/class/${classId}_${classHeight}`
    : `/nft/class/${classId}`;
}
