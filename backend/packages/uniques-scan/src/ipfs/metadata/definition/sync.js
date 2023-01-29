const isNil = require("lodash.isnil");

async function syncOneMetadataValidity(col, hash, valid) {
  let updates;
  if (isNil(valid)) {
    updates = { $unset: { definitionValid: true } };
  } else {
    updates = { $set: { definitionValid: valid } };
  }

  await col.updateOne({ dataHash: hash }, { $set: updates });
}

module.exports = {
  syncOneMetadataValidity,
};
