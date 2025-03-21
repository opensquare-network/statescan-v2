require("dotenv").config();
const {
  chain: { getApi, findBlockApi, getBlockIndexer },
} = require("@osn/scan-common");

(async () => {
  const api = await getApi();
  const raw = await api.query.foreignAssets.asset({
    parents: 1,
    interior: {
      x1: {
        parachain: 3369,
      },
    },
  });
  console.log(raw);
})();
