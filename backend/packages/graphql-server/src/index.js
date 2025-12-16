require("dotenv").config();

const { schema } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const { createApis } = require("./chainApi");
const { initDbs } = require("./init");
const { rateLimitPlugin } = require("./rateLimitPlugin");

const port = parseInt(process.env.PORT) || 7100;

async function main() {
  await initDbs();
  console.log("DB initialized");

  await createApis();
  console.log("api initialized");

  const yoga = createYoga({
    schema,
    plugins: [rateLimitPlugin()],
  });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
