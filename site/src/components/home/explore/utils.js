// shared for explore/index.js and explore/dropdown.js
export function makeExploreDropdownItemRouteLink(type, value) {
  if (type === "assets") {
    return `/asset/${value.assetId}_${value.assetHeight}`;
  }

  return `/${type}/${value}`;
}
