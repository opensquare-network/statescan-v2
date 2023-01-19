const { queryAccount } = require("./account");
const { queryExtrinsic } = require("./extrinsic");
const { queryBlock } = require("./block");
const { queryAssets } = require("./asset");
const { queryNftClasses } = require("./nftClass");
const { queryNftInstances } = require("./nftInstance");

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

  const assetQueryResult = await queryAssets(term);
  if (assetQueryResult) {
    result = {
      ...result,
      assets: assetQueryResult,
    };
  }

  const nftClassQueryResult = await queryNftClasses(term);
  if (nftClassQueryResult) {
    result = {
      ...result,
      nftClasses: nftClassQueryResult,
    };
  }

  const nftInstanceQueryResult = await queryNftInstances(term);
  if (nftInstanceQueryResult) {
    result = {
      ...result,
      nftInstances: nftInstanceQueryResult,
    };
  }

  ctx.body = result;
}

module.exports = {
  getSearchHints,
};
