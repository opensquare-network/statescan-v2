const account = require("./account");
const block = require("./block");
const runtime = require("./runtime");
const asset = require("./asset");
const uniques = require("./uniques");
const identity = require("./identity");
const vesting = require("./vesting");
const multisig = require("./multisig");
const palletAsset = require("./palletAsset");
const knownHeight = require("./known/db");
const palletRecovery = require("./palletRecovery");
const palletProxy = require("./palletProxy");

module.exports = {
  account,
  block,
  runtime,
  asset,
  uniques,
  identity,
  vesting,
  multisig,
  palletAsset,
  palletRecovery,
  palletProxy,
  knownHeight,
};
