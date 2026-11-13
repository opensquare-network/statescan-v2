const { setTimeout: delay } = require("timers/promises");

const CONTRACTS_PATH = "/api/v2/smart-contracts";

class RetryableError extends Error {
  constructor(message, retryAfterMs = null) {
    super(message);
    this.name = "RetryableError";
    this.retryAfterMs = retryAfterMs;
  }
}

function buildUrl(host, pathname, params) {
  const url = new URL(`${host}${pathname}`);
  for (const [key, value] of Object.entries(params || {})) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function parseRetryAfter(value) {
  if (!value) {
    return null;
  }

  const seconds = Number(value);
  if (Number.isFinite(seconds)) {
    return Math.max(0, seconds * 1000);
  }

  const date = Date.parse(value);
  if (Number.isNaN(date)) {
    return null;
  }

  return Math.max(0, date - Date.now());
}

function isRetryable(error) {
  if (error instanceof RetryableError) {
    return true;
  }
  if (error.name === "AbortError" || error.name === "TimeoutError") {
    return true;
  }

  return error instanceof TypeError;
}

async function requestJson(url, config) {
  let lastError;

  for (let attempt = 0; attempt <= config.requestRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(config.requestTimeoutMs),
      });

      if (response.status === 429 || response.status >= 500) {
        throw new RetryableError(
          `${url} responded ${response.status}`,
          parseRetryAfter(response.headers.get("retry-after")),
        );
      }
      if (!response.ok) {
        throw new Error(`${url} responded ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt >= config.requestRetries || !isRetryable(error)) {
        break;
      }

      // A server asking for an hour long pause must not hold the cron run.
      const backoff = Math.min(
        5 * 60 * 1000,
        error.retryAfterMs ?? Math.min(30000, 1000 * 2 ** attempt),
      );
      await delay(backoff + Math.floor(Math.random() * 250));
    }
  }

  throw lastError;
}

async function* iterateVerifiedContractPages(config, request = requestJson) {
  let params = { filter: "verified" };
  let page = 0;

  while (true) {
    const url = buildUrl(config.apiHost, CONTRACTS_PATH, params);
    const data = await request(url, config);
    const items = Array.isArray(data.items) ? data.items : [];
    page++;

    const nextPageParams = data.next_page_params;
    const hasNext = Boolean(
      items.length > 0 &&
        nextPageParams &&
        typeof nextPageParams === "object" &&
        Object.keys(nextPageParams).length > 0 &&
        (config.maxPages === 0 || page < config.maxPages),
    );

    yield { page, items, hasNext };

    if (!hasNext) {
      return;
    }

    params = { filter: "verified", ...nextPageParams };
  }
}

async function fetchContractDetail(config, address, request = requestJson) {
  const url = buildUrl(config.apiHost, `${CONTRACTS_PATH}/${address}`, {});
  return await request(url, config);
}

module.exports = {
  buildUrl,
  parseRetryAfter,
  requestJson,
  iterateVerifiedContractPages,
  fetchContractDetail,
};
