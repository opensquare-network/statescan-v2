require("dotenv").config();
const { fetchMime } = require("../../../ipfs/axios/mime");
const { fetchJson } = require("../../../ipfs/axios/json");

async function mime(cid) {
  const { type, data } = await fetchMime(cid);
  console.log("type", type, "data length:", data.length);
}

async function main() {
  const json = await fetchJson(
    "QmeXMHxaaWRAUPAFa9KAuDLmf4w3kSYyWwjw6aDjtKncnW",
  );
  console.log("json", json);

  await mime("QmaTVEBZtj6m579TuxTHc5dFDWkZXMb4rSDNXw4qVDYjYs");
  await mime("QmYK58GeYcGMbjjfPDo69jsUU4A8PpLEyPcxBY1yJCSnD1");

  process.exit(0);
}

main().then(console.log);
