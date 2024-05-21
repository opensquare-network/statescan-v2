function getSimpleModeParams(ctx) {
  const { section, method } = ctx.query;
  const q = {};
  if (section) {
    q.section = section;
  }
  if (method) {
    q.method = method;
  }

  return q;
}

function getNormalParams(ctx) {
  const { section, method } = ctx.query;
  const q = {};
  if (section) {
    q["call.section"] = section;
  }
  if (method) {
    q["call.method"] = method;
  }

  return q;
}

function getCallQueryParams(ctx) {
  if (process.env.SIMPLE_MODE === "1") {
    return getSimpleModeParams(ctx);
  }

  return getNormalParams(ctx);
}

module.exports = {
  getCallQueryParams,
};
