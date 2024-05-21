async function getTimeDimension(ctx) {
  const { time_dimension } = ctx.query;

  if (time_dimension === "block") {
    const { block_start, block_end } = ctx.query;
    return {
      $and: [
        { "indexer.blockHeight": parseInt(block_start) },
        { "indexer.blockHeight": parseInt(block_end) },
      ],
    };
  }

  if (time_dimension === "date") {
    const { date_start, date_end } = ctx.query;
    return {
      $and: [
        { "indexer.blockTime": parseInt(date_start) },
        { "indexer.blockTime": parseInt(date_end) },
      ],
    };
  }

  return {};
}

module.exports = {
  getTimeDimension,
};
