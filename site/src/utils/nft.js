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
  const { isDestroyed, classId, classHeight } = nftClass || {};
  return isDestroyed
    ? `/nft/class/${classId}_${classHeight}`
    : `/nft/class/${classId}`;
}

export function getNftInstanceLink(nftClass, nftInstance) {
  const isDestroyed = nftClass?.isDestroyed || nftInstance?.isDestroyed;

  const classId = isDestroyed
    ? `${nftClass?.classId}_${nftClass?.indexer.blockHeight}`
    : nftClass?.classId;

  const instanceId = isDestroyed
    ? `${nftInstance?.instanceId}_${nftInstance?.indexer.blockHeight}`
    : nftInstance?.instanceId;

  return `/nft/class/${classId}/instance/${instanceId}`;
}
