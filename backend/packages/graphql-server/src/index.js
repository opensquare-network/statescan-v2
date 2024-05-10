require("dotenv").config();

const { schema } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const {
  vesting: { initVestingScanDb },
} = require("@statescan/mongo");

const port = parseInt(process.env.PORT) || 7100;

function main() {
  initVestingScanDb().then(() => console.log("vesting db initialized"));
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
