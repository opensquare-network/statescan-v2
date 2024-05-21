const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  resolvers: vestingResolvers,
  typeDefs: vestingTypeDefs,
} = require("./vesting");
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
const { hasAssets, hasMultisig, hasIdentity, hasVesting } = require("../env");

let resolvers = [];
let typeDefs = [];

if (hasVesting()) {
  resolvers = [...resolvers, vestingResolvers];
  typeDefs = [...typeDefs, ...vestingTypeDefs];
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

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

module.exports = {
  schema,
};
