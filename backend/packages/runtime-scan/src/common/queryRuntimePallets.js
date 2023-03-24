const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { stringLowerFirst } = require("@polkadot/util");

function extractConstants(blockApi, palletName) {
  const constants = blockApi.consts[stringLowerFirst(palletName)];
  return Object.entries(constants).reduce((result, [key, value]) => {
    const meta = value.meta;
    result.push({
      [key]: {},
    });
  }, []);

  console.log(constants);
  return constants;
}

async function getRuntimePallets(blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const metadata = blockApi.registry.metadata.toJSON();

  const palletNames = metadata.pallets.map((p) => p.name);
  const pallets = palletNames.reduce((result, palletName) => {
    const consts = extractConstants(blockApi, palletName);

    result.push({
      name: palletName,
      consts,
    });

    return result;
  }, []);

  // todo 1: get pallet array with names
  // todo 2: populate pallet with events, calls, constants, errors, storage
  return metadata;
}

module.exports = {
  getRuntimePallets,
};
