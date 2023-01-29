const axios = require("axios");
const { getEndpoints } = require("./endpoints");

async function fetchJson(cid) {
  const endpoints = getEndpoints();
  const promises = [];
  for (const endpoint of endpoints) {
    const promise = axios
      .get(`${endpoint}${cid}`, {
        timeout: 60 * 10 * 1000, // max 10 mins for fetching json data
      })
      .then((res) => res.data);
    promises.push(promise);
  }

  return Promise.any(promises);
}

module.exports = {
  fetchJson,
};
