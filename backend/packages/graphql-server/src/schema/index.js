const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  resolvers: vestingResolvers,
  typeDefs: vestingTypeDefs,
} = require("./vesting");
const {
  resolvers: assetsPalletResolvers,
  typeDefs: assetsPalletTypeDefs,
} = require("@statescan/pallet-assets-server");

let resolvers = [vestingResolvers];
let typeDefs = [...vestingTypeDefs];

if (process.env.MONGO_PALLET_ASSET_SCAN_NAME) {
  resolvers = [...resolvers, assetsPalletResolvers];
  typeDefs = [...typeDefs, ...assetsPalletTypeDefs];
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

module.exports = {
  schema,
};
