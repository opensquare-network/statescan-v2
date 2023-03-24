const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const NodeCache = require("node-cache");
const { HttpError } = require("../../../utils/httpError");

const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 60 });

async function getAchainableProfile(ctx) {
  const { address } = ctx.params;

  const achainableApiUrl = process.env.ACHAINABLE_PROFILE_URL;
  if (!achainableApiUrl) {
    throw new HttpError(500, "ACHAINABLE_PROFILE_URL is not configured");
  }

  const achainableApiKey = process.env.ACHAINABLE_AUTHORIZATION_KEY;
  if (!achainableApiKey) {
    throw new HttpError(500, "ACHAINABLE_AUTHORIZATION_KEY is not configured");
  }

  const cacheKey = `achainable-profile-${address}`;
  const cachedProfile = myCache.get(cacheKey);
  if (cachedProfile) {
    ctx.body = cachedProfile;
    return;
  }

  const response = await fetch(achainableApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: achainableApiKey,
    },
    body: JSON.stringify({
      params: {
        address: address,
      },
      includeMetadata: true,
      includeWidgets: true,
    }),
  });

  if (!response.ok) {
    throw new HttpError(
      500,
      "Achainable profile API error: " + response.statusText,
    );
  }

  const profile = await response.json();

  myCache.set(cacheKey, profile, 3600);

  ctx.body = profile;
}

module.exports = {
  getAchainableProfile,
};
