function hasStatsCount(count) {
  return count !== undefined && count !== null && count !== "";
}

export function getLidoListPageData({
  rawItems = [],
  page,
  pageSize,
  stats,
  statsCountKey,
}) {
  const hasNextPage = rawItems.length > pageSize;
  const items = rawItems.slice(0, pageSize);
  const statsCount = stats?.[statsCountKey];
  const total = hasStatsCount(statsCount)
    ? Number(statsCount)
    : (page - 1) * pageSize + items.length + (hasNextPage ? 1 : 0);

  return {
    items,
    total,
    page,
    pageSize,
    hasNextPage,
  };
}
