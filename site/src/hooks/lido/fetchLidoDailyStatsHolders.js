function toSecondsFromMicroseconds(timestamp) {
  return Math.floor(Number(timestamp) / 1000000);
}

export async function fetchLidoDailyStatsHolders({ client, query, pageSize }) {
  const items = [];
  const cursorHistory = new Set();
  let nextCursor = null;

  while (true) {
    const variables = {
      first: pageSize,
      orderBy: "timestamp",
      orderDirection: "desc",
    };

    if (nextCursor) {
      variables.where = {
        timestamp_lt: nextCursor,
      };
    }

    const result = await client.query({
      query,
      fetchPolicy: "no-cache",
      variables,
    });
    const page = result.data?.dailyStats || [];

    if (!page.length) {
      break;
    }

    items.push(
      ...page.map((item) => ({
        ...item,
        timestamp: toSecondsFromMicroseconds(item.timestamp),
      })),
    );

    if (page.length < pageSize) {
      break;
    }

    nextCursor = page[page.length - 1]?.timestamp;

    if (!nextCursor || cursorHistory.has(nextCursor)) {
      break;
    }

    cursorHistory.add(nextCursor);
  }

  return items;
}
