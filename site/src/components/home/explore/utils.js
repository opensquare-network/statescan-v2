// shared for explore/index.js and explore/dropdown.js
export function makeExploreDropdownItemRouteLink(type, value) {
  if (type === "assets") {
    const assetId = value.destroyed
      ? `${value.assetId}_${value.assetHeight}`
      : `${value.assetId}`;
    return `/assets/${assetId}`;
  }

  if (type === "nftClasses") {
    return `/uniques/classes/${value.classId}`;
  }

  if (type === "nftInstances") {
    return `/uniques/classes/${value.classId}/instances/${value.instanceId}`;
  }

  if (type === "block") {
    return `/blocks/${value}`;
  }

  if (type === "account") {
    return `/accounts/${value}`;
  }

  if (type === 'extrinsic') {
    return `/extrinsics/${value}`;
  }

  return `/${type}/${value}`;
}
