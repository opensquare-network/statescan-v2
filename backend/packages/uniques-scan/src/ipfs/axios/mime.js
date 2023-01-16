const axios = require("axios");
const { getEndpoints } = require("./endpoints");

async function fetchMime(cid) {
  const endpoints = getEndpoints();
  const promises = [];
  for (const endpoint of endpoints) {
    const promise = axios({
      url: `${endpoint}${cid}`,
      responseType: "arraybuffer",
      timeout: 300 * 1000, // max 5 mins for fetching mime data
    });
    promises.push(promise);
  }

  const res = await Promise.any(promises);
  const data = res.data;
  const type = res.headers["content-type"];
  return {
    type,
    data,
  };
}

module.exports = {
  fetchMime,
};
