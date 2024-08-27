require("dotenv").config();

const { schema } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const {
  identity: { initIdentityScanDb },
} = require("@statescan/mongo");
const { createChainApis } = require("./chainApi");

const port = parseInt(process.env.PORT) || 5011;

async function main() {
  await initIdentityScanDb();
  console.log("DB initialized");

  await createChainApis();
  console.log("api initialized");

  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
