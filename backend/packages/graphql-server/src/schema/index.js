const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  resolvers: vestingResolvers,
  typeDefs: vestingTypeDefs,
} = require("./vesting");
const {
  resolvers: recoveryResolvers,
  typeDefs: recoveryTypeDefs,
} = require("./recovery");
const {
  resolvers: proxyResolvers,
  typeDefs: proxyTypeDefs,
} = require("./proxy");
const {
  resolvers: assetsPalletResolvers,
  typeDefs: assetsPalletTypeDefs,
} = require("@statescan/pallet-assets-server");
const {
  resolvers: multisigResolvers,
  typeDefs: multisigTypeDefs,
} = require("@statescan/multisig-server");
const {
  commonResolvers: identityResolvers,
  commonTypeDefs: identityTypeDefs,
} = require("@statescan/identity-server");
const {
  hasAssets,
  hasMultisig,
  hasIdentity,
  hasVesting,
  hasRecovery,
  hasProxy,
  hasEndpoints,
} = require("../env");
const {
  graphql: { indexer, json },
} = require("@statescan/common");
const {
  resolvers: chainResolvers,
  typeDefs: chainTypeDefs,
} = require("./chain");

let resolvers = [];
let typeDefs = [indexer, json];

if (hasEndpoints()) {
  resolvers = [...resolvers, chainResolvers];
  typeDefs = [...typeDefs, ...chainTypeDefs];
}
if (hasVesting()) {
  resolvers = [...resolvers, vestingResolvers];
  typeDefs = [...typeDefs, ...vestingTypeDefs];
}
if (hasRecovery()) {
  resolvers = [...resolvers, recoveryResolvers];
  typeDefs = [...typeDefs, ...recoveryTypeDefs];
}
if (hasAssets()) {
  resolvers = [...resolvers, assetsPalletResolvers];
  typeDefs = [...typeDefs, ...assetsPalletTypeDefs];
}
if (hasMultisig()) {
  resolvers = [...resolvers, multisigResolvers];
  typeDefs = [...typeDefs, ...multisigTypeDefs];
}
if (hasIdentity()) {
  resolvers = [...resolvers, identityResolvers];
  typeDefs = [...typeDefs, ...identityTypeDefs];
}
if (hasProxy()) {
  resolvers = [...resolvers, proxyResolvers];
  typeDefs = [...typeDefs, ...proxyTypeDefs];
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

module.exports = {
  schema,
};
