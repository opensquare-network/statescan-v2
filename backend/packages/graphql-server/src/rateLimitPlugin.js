const CONFIG = {
  MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  WINDOW_MS: (parseInt(process.env.RATE_LIMIT_WINDOW) || 1) * 1000,
  WHITELIST_IPS: new Set(
    (process.env.RATE_LIMIT_WHITELIST_IPS || "")
      .split(";")
      .map((ip) => ip.trim())
      .filter(Boolean),
  ),
};

console.log("Rate limit:", CONFIG);

const rateLimitStore = new Map();

function normalizeIP(ip) {
  if (ip === "::1" || ip === "::ffff:127.0.0.1") {
    return "127.0.0.1";
  }
  return ip;
}

function extractClientIP({ request, serverContext }) {
  const ip =
    request?.headers?.get("cf-connecting-ip") ||
    request?.headers?.get("x-real-ip") ||
    request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    serverContext?.req?.socket?.remoteAddress ||
    serverContext?.req?.connection?.remoteAddress ||
    "unknown";

  return normalizeIP(ip);
}

function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

function checkRateLimit(ip) {
  if (CONFIG.WHITELIST_IPS.has(ip)) {
    return { allowed: true };
  }

  const record = rateLimitStore.get(ip);

  const now = Date.now();
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + CONFIG.WINDOW_MS,
    });
    return { allowed: true };
  }

  record.count++;

  if (record.count > CONFIG.MAX_REQUESTS) {
    return {
      allowed: false,
      limit: CONFIG.MAX_REQUESTS,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  return { allowed: true };
}

function createRateLimitResponse(limitResult, fetchAPI) {
  return new fetchAPI.Response(
    JSON.stringify({
      errors: [
        {
          message: "Too Many Requests",
          extensions: {
            code: "RATE_LIMIT_EXCEEDED",
            limit: limitResult.limit,
            retryAfter: limitResult.retryAfter,
          },
        },
      ],
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(limitResult.retryAfter),
        "X-RateLimit-Limit": String(limitResult.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(
          Math.ceil(Date.now() / 1000) + limitResult.retryAfter,
        ),
      },
    },
  );
}

function rateLimitPlugin() {
  return {
    onRequest({ request, serverContext, fetchAPI, endResponse }) {
      const ip = extractClientIP({ request, serverContext });
      const limitResult = checkRateLimit(ip);

      if (!limitResult.allowed) {
        console.warn("Too many requests from IP:", ip);
        endResponse(createRateLimitResponse(limitResult, fetchAPI));
      }
    },
  };
}

setInterval(() => cleanupExpiredRecords(), 30000);

module.exports = { rateLimitPlugin };
