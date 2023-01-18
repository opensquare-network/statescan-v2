const { getClassCol } = require("@statescan/mongo/src/uniques");

async function getPopularClasses(ctx) {
  const classCol = await getClassCol();
  ctx.body = await classCol
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

module.exports = {
  getPopularClasses,
};
