const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");
const { stringCamelCase } = require("@polkadot/util");

let specs = [];

function getSectionEvents(eventsType, types) {
  const type = types[eventsType];
  return type.type.def?.variant?.variants?.map((variant) => variant.name);
}

function getSectionCalls(callsType, types) {
  const type = types[callsType];
  return type.type.def?.variant?.variants?.map((call) =>
    stringCamelCase(call.name),
  );
}

function constructOnePallet(pallet, types) {
  const { name, calls, events } = pallet;
  return {
    name,
    calls: calls ? getSectionCalls(calls.type, types) : [],
    events: events ? getSectionEvents(events.type, types) : [],
  };
}

function constructSpecFromMetadata(metadata = {}) {
  const { lookup: { types } = {}, pallets = [] } = metadata;
  return pallets.reduce((result, pallet) => {
    result.push(constructOnePallet(pallet, types));
    return result;
  }, []);
}

async function queryAndSetSpecVersions() {
  const col = await getRuntimeCollection();
  const versions = await col
    .find({}, { projection: { height: 0 } })
    .sort({ height: -1 })
    .toArray();
  specs = versions.map((version) => {
    return {
      specVersion: version.runtimeVersion.specVersion,
      pallets: constructSpecFromMetadata(version.metadata),
    };
  });
}

async function queryAndSetSpecs() {
  try {
    await queryAndSetSpecVersions();
  } finally {
    setTimeout(queryAndSetSpecs, 6000);
  }
}

function getSpecs() {
  return specs;
}

module.exports = {
  queryAndSetSpecs,
  getSpecs,
};
