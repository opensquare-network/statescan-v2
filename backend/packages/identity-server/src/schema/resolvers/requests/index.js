const trim = require("lodash.trim");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const { findRequests } = require("./find");
const { getRequestsWithAggregation } = require("./aggregation");

async function requests(_, _args) {
  const { search } = _args;
  const trimmedSearch = trim(search);

  if (!trimmedSearch || isValidAddress(trimmedSearch)) {
    return await findRequests(_args);
  } else {
    return await getRequestsWithAggregation(_args);
  }
}

module.exports = {
  requests,
};
