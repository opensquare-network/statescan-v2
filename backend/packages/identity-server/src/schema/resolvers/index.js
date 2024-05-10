const { identity } = require("./identity");
const { identities } = require("./identities");
const { identityTimeline } = require("./identityTimeline");
const { registrars } = require("./registrars");
const { registrarTimeline } = require("./registrarTimeline");
const { requests } = require("./requests");
const { scanHeight } = require("./scanHeight");
const { statistics } = require("./statistics");

const common = {
  identity,
  identities,
  identityTimeline,
};

const resolvers = {
  ...common,
  registrars,
  registrarTimeline,
  requests,
  scanHeight,
  statistics,
};

const commonResolvers = {
  ...common,
  identityRegistrars: registrars,
  identityRegistrarTimeline: registrarTimeline,
  identityRequests: requests,
  identityScanHeight: scanHeight,
  identityStatistics: statistics,
};

module.exports = {
  resolvers,
  commonResolvers,
};
