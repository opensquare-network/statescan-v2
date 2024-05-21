require("dotenv").config();

const { schema } = require("./schema");
const { createYoga } = require("graphql-yoga");
const { createServer } = require("http");
const {
  vesting: { initVestingScanDb },
  palletAsset: { initPalletAssetScanDb },
  multisig: { initMultisigScanDb },
  identity: { initIdentityScanDb },
} = require("@statescan/mongo");
const { hasVesting, hasAssets, hasMultisig, hasIdentity } = require("./env");

const port = parseInt(process.env.PORT) || 7100;

async function initDbs() {
  if (hasVesting()) {
    await initVestingScanDb();
  }
  if (hasAssets()) {
    await initPalletAssetScanDb();
  }
  if (hasMultisig()) {
    await initMultisigScanDb();
  }
  if (hasIdentity()) {
    await initIdentityScanDb();
  }
}

function main() {
  initDbs().then(() => console.log("DB initialized"));
  const yoga = createYoga({ schema });
  const server = createServer(yoga);
  server.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}/graphql`);
  });
}

main();
