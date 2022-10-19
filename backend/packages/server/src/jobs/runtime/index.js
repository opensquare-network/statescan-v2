const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");

let specVersions = [];

async function queryAndSetSpecVersions() {
  const col = await getRuntimeCollection();
  const versions = await col.find({}, { projection: { height: 0 } }).toArray();
  specVersions = versions.map((version) => version.runtimeVersion.specVersion);
}

async function queryAndSetSpecs() {
  setInterval(queryAndSetSpecVersions, 6 * 1000);
}

module.exports = {
  queryAndSetSpecs,
};
