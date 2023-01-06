const { fetchMime } = require("../axios/mime");
const { getItemQ } = require("./utils");
const {
  uniques: { getResourceCol, getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const { u8aToHex } = require("@polkadot/util");

async function findUnhandled(col) {
  return await col
    .find({
      definitionValid: true,
      $or: [
        { resourceParsed: null },
        {
          "resourceParsed.retries": { $ne: null, $lt: 20 },
          "resourceParsed.resultValid": null,
        },
      ],
    })
    .toArray();
}

async function markItemParseResult(
  col,
  item,
  isClass = true,
  resourceValid = true,
) {
  if (!item.resourceParsed) {
    await col.updateOne(getItemQ(item, isClass), {
      $set: {
        resourceParsed: {
          retries: 1,
          resourceValid,
        },
      },
    });
  } else {
    await col.updateOne(getItemQ(item, isClass), {
      $inc: { "resourceParsed.retries": 1 },
      $set: { "resourceParsed.resourceValid": resourceValid },
    });
  }
}

async function incItemParseRetries(col, item, isClass) {
  await col.updateOne(getItemQ(item, isClass), {
    $inc: { "resourceParsed.retries": 1 },
  });
}

async function handleOneItem(col, item, isClass = true) {
  const {
    definition: { image: cid },
  } = item;
  const resourceCol = await getResourceCol();
  const resource = await resourceCol.findOne({ cid });
  if (resource) {
    await markItemParseResult(col, item, isClass, true);
    return;
  }

  let resourceType, resourceData;
  try {
    const { type, data } = await fetchMime(cid);
    resourceData = data;
    resourceType = type;
  } catch (e) {
    await incItemParseRetries(col, item, isClass);
    return;
  }

  await resourceCol.insertOne({
    cid,
    type: resourceType,
    data: u8aToHex(resourceData),
    // todo: generate and save thumbnail for data
  });
  await markItemParseResult(col, item, isClass, true);
}

async function handleMetadataResourceCommon(col, isClass = true) {
  const unhandled = await findUnhandled(col);
  const promises = [];
  for (const item of unhandled) {
    const promise = handleOneItem(col, item, isClass);
    promises.push(promise);
  }

  await Promise.all(promises);
}

async function handleMetadataResource() {
  await Promise.all([
    handleMetadataResourceCommon(await getClassCol(), true),
    handleMetadataResourceCommon(await getInstanceCol(), false),
  ]);
}

module.exports = {
  handleMetadataResource,
};
