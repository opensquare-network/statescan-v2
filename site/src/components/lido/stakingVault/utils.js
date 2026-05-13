export function sortTimelineEvents(events = []) {
  return [...events].sort((a, b) => {
    const blockOrder = a.blockNumber - b.blockNumber;

    if (blockOrder !== 0) {
      return blockOrder;
    }

    const logOrder = a.logIndex - b.logIndex;

    if (logOrder !== 0) {
      return logOrder;
    }

    return 0;
  });
}
