const axios = require("axios");
const { getEndpoints } = require("./endpoints");
const { fileTypeFromBuffer } = require("file-type");

async function fetchMime(cid) {
  const endpoints = getEndpoints();
  const promises = [];
  for (const endpoint of endpoints) {
    const promise = axios({
      url: `${endpoint}${cid}`,
      responseType: "arraybuffer",
    }).then((res) => res.data);
    promises.push(promise);
  }

  const data = Promise.any(promises);
  const type = await fileTypeFromBuffer(data);
  return {
    type,
    data,
  };
}

module.exports = {
  fetchMime,
};
