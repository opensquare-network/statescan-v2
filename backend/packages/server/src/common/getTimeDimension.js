const { HttpError } = require("../utils");

function convertToNumber(value, valueName) {
  const number = Number(value);
  if (isNaN(number)) {
    throw new HttpError(400, `${valueName} should be a number`);
  }
  return number;
}

function getTimeDimension(ctx) {
  const { time_dimension } = ctx.query;

  if (time_dimension === "block") {
    const { block_start, block_end } = ctx.query;
    if (block_start && !block_end) {
      return {
        "indexer.blockHeight": {
          $gte: convertToNumber(block_start, "Block start"),
        },
      };
    }
    if (!block_start && block_end) {
      return {
        "indexer.blockHeight": {
          $lte: convertToNumber(block_end, "Block end"),
        },
      };
    }
    return {
      $and: [
        {
          "indexer.blockHeight": {
            $gte: convertToNumber(block_start, "Block start"),
          },
        },
        {
          "indexer.blockHeight": {
            $lte: convertToNumber(block_end, "Block end"),
          },
        },
      ],
    };
  }

  if (time_dimension === "date") {
    const { date_start, date_end } = ctx.query;
    if (date_start && !date_end) {
      return {
        "indexer.blockTime": {
          $gte: convertToNumber(date_start, "Date start"),
        },
      };
    }
    if (!date_start && date_end) {
      return {
        "indexer.blockTime": { $lte: convertToNumber(date_end, "Date end") },
      };
    }
    return {
      $and: [
        {
          "indexer.blockTime": {
            $gte: convertToNumber(date_start, "Date start"),
          },
        },
        {
          "indexer.blockTime": { $lte: convertToNumber(date_end, "Date end") },
        },
      ],
    };
  }

  return {};
}

module.exports = {
  getTimeDimension,
};
