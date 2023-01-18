const util = require("util");
const { getClassCol } = require("@statescan/mongo/src/uniques");
const {
  popularNftClassesKey,
  popularNftClassesRoom,
  feedInterval,
} = require("../consts");
const { setPopularNftClasses, getPopularNftClasses } = require("../store");

async function queryPopularNftClasses() {
  const classCol = await getClassCol();
  return await classCol
    .aggregate([
      {
        $addFields: {
          instances: { $ifNull: ["$details.items", "$details.instances"] },
        },
      },
      { $sort: { definitionValid: -1, instances: -1 } },
      { $limit: 5 },
      {
        $project: { instances: 0 },
      },
    ])
    .toArray();
}

async function feedPopularNftClasses(io) {
  try {
    const oldData = await getPopularNftClasses();
    const nftClasses = await queryPopularNftClasses();

    if (util.isDeepStrictEqual(oldData, nftClasses)) {
      return;
    }

    setPopularNftClasses(nftClasses);
    io.to(popularNftClassesRoom).emit(popularNftClassesKey, nftClasses);
  } catch (e) {
    console.error("feed latest signed nftClasses error:", e);
  } finally {
    setTimeout(feedPopularNftClasses.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedPopularNftClasses,
};
