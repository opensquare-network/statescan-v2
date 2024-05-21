function getTimeDimension(ctx) {
  const { time_dimension } = ctx.query;

  if (time_dimension === "block") {
    const { block_start, block_end } = ctx.query;
    return {
      $and: [
        { "indexer.blockHeight": { $gte: parseInt(block_start) } },
        { "indexer.blockHeight": { $lte: parseInt(block_end) } },
      ],
    };
  }

  if (time_dimension === "date") {
    const { date_start, date_end } = ctx.query;
    return {
      $and: [
        { "indexer.blockTime": { $gte: parseInt(date_start) } },
        { "indexer.blockTime": { $lte: parseInt(date_end) } },
      ],
    };
  }

  return {};
}

module.exports = {
  getTimeDimension,
};
