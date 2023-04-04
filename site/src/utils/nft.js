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
    ? `/uniques/classes/${classId}_${classHeight}`
    : `/uniques/classes/${classId}`;
}

export function getNftInstanceLink(nftClass, nftInstance) {
  const isDestroyed = nftClass?.isDestroyed || nftInstance?.isDestroyed;

  const classId = isDestroyed
    ? `${nftClass?.classId}_${nftClass?.indexer.blockHeight}`
    : nftClass?.classId;

  const instanceId = isDestroyed
    ? `${nftInstance?.instanceId}_${nftInstance?.indexer.blockHeight}`
    : nftInstance?.instanceId;

  return `/uniques/classes/${classId}/instances/${instanceId}`;
}

export function getNftInstanceParsedMetadata(nftClass, nftInstance) {
  if (nftInstance?.metadata || nftInstance?.parsedMetadata) {
    return nftInstance.parsedMetadata;
  }

  return nftClass?.parsedMetadata;
}
