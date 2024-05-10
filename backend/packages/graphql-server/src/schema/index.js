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
const { hasAssets, hasMultisig } = require("../env");

let resolvers = [vestingResolvers];
let typeDefs = [...vestingTypeDefs];

if (hasAssets()) {
  resolvers = [...resolvers, assetsPalletResolvers];
  typeDefs = [...typeDefs, ...assetsPalletTypeDefs];
}
if (hasMultisig()) {
  resolvers = [...resolvers, multisigResolvers];
  typeDefs = [...typeDefs, ...multisigTypeDefs];
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

module.exports = {
  schema,
};
