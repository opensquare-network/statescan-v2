function normalizeDispatchResult(result, indexer) {
  if (result.isOk) {
    return {
      isOk: true,
      ok: result.asOk.toJSON(),
    };
  } else if (result.isErr) {
    return {
      isErr: true,
      err: result.asErr.toString(),
    };
  }

  throw new Error(`Unknown dispatch result at ${indexer.blockHeight}`);
}

module.exports = {
  normalizeDispatchResult,
};
