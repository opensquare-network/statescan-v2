require("dotenv").config();

const { schema } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const {
  palletAsset: { initPalletAssetScanDb },
} = require("@statescan/mongo");

const port = parseInt(process.env.PORT) || 5100;

function main() {
  initPalletAssetScanDb().then(() => console.log("asset db initialized"));
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
