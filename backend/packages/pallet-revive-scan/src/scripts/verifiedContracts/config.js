const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

function positiveInt(name, defaultValue) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") {
    return defaultValue;
  }

  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return value;
}

function nonNegativeInt(name, defaultValue) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") {
    return defaultValue;
  }

  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer`);
  }

  return value;
}

function getApiHost() {
  const host = (
    process.env.BLOCKSCOUT_API_HOST || "https://blockscout.polkadot.io"
  ).replace(/\/+$/, "");

  try {
    new URL(host);
  } catch {
    throw new Error(`BLOCKSCOUT_API_HOST is not a valid url: ${host}`);
  }

  return host;
}

const config = {
  apiHost: getApiHost(),
  requestTimeoutMs: positiveInt("BLOCKSCOUT_REQUEST_TIMEOUT_MS", 30000),
  requestRetries: positiveInt("BLOCKSCOUT_REQUEST_RETRIES", 4),
  detailConcurrency: positiveInt("BLOCKSCOUT_DETAIL_CONCURRENCY", 4),
  maxPages: nonNegativeInt("BLOCKSCOUT_MAX_PAGES", 0),
  upsertBatchSize: positiveInt("VERIFIED_CONTRACT_UPSERT_BATCH", 50),
  lockTtlMs: positiveInt("VERIFIED_CONTRACT_SYNC_LOCK_TTL_MS", 30 * 60 * 1000),
};

module.exports = { config };
