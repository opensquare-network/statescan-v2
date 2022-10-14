const { queryAccount } = require("./account");
const { queryExtrinsic } = require("./extrinsic");
const { queryBlock } = require("./block");

async function getSearchHints(ctx) {
  const { term = "" } = ctx.query;

  let result = {};
  const blockQueryResult = await queryBlock(term);
  if (blockQueryResult) {
    result = {
      ...result,
      block: blockQueryResult,
    };
  }

  const extrinsicQueryResult = await queryExtrinsic(term);
  if (extrinsicQueryResult) {
    result = {
      ...result,
      extrinsic: extrinsicQueryResult,
    };
  }

  const accountQueryResult = await queryAccount(term);
  if (accountQueryResult) {
    result = {
      ...result,
      account: accountQueryResult,
    };
  }

  ctx.body = result;
}

module.exports = {
  getSearchHints,
};
