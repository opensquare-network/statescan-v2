export function sortTimelineEvents(events = []) {
  return [...events].sort((a, b) => {
    const blockOrder = b.blockNumber - a.blockNumber;

    if (blockOrder !== 0) {
      return blockOrder;
    }

    const logOrder = b.logIndex - a.logIndex;

    if (logOrder !== 0) {
      return logOrder;
    }

    return 0;
  });
}
