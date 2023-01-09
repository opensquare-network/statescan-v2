const axios = require("axios");
const { getEndpoints } = require("./endpoints");

async function fetchMime(cid) {
  const { fileTypeFromBuffer } = await import("file-type");
  const endpoints = getEndpoints();
  const promises = [];
  for (const endpoint of endpoints) {
    const promise = axios({
      url: `${endpoint}${cid}`,
      responseType: "arraybuffer",
      timeout: 300 * 1000, // max 5 mins for fetching mime data
    }).then((res) => res.data);
    promises.push(promise);
  }

  const data = await Promise.any(promises);
  const type = await fileTypeFromBuffer(data);
  return {
    type,
    data,
  };
}

module.exports = {
  fetchMime,
};
