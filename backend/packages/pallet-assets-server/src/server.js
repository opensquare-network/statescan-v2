require("dotenv").config();

const { resolvers } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const {
  palletAsset: { initPalletAssetScanDb },
} = require("@statescan/mongo");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs } = require("./schema/types");

const port = parseInt(process.env.PORT) || 5100;

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs,
});

function main() {
  initPalletAssetScanDb().then(() => console.log("asset db initialized"));
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
