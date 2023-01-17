// shared for explore/index.js and explore/dropdown.js
export function makeExploreDropdownItemRouteLink(type, value) {
  if (type === "assets") {
    const assetId = value.destroyed
      ? `${value.assetId}_${value.assetHeight}`
      : `${value.assetId}`;
    return `/assets/${assetId}`;
  }

  return `/${type}/${value}`;
}
