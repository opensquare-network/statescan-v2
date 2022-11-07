// NOTE: all api endpoints here

export const homeSearchHints = "/search/hints";

export const extrinsicListApi = makeApiUrl("extrinsics");
export const extrinsicApi = (id) => makeApiUrl("extrinsics", id);

export const blockListApi = makeApiUrl("blocks");
export const blockApiUrl = (id) => makeApiUrl("blocks", id);

export const eventListApi = makeApiUrl("events");
export const eventApi = (id) => makeApiUrl("events", id);

export const callListApi = makeApiUrl("calls");
export const callApi = (id) => makeApiUrl("calls", id);

export const accountListApi = makeApiUrl("accounts");
export const accountApi = (id) => makeApiUrl("accounts", id);

export const transferListApi = makeApiUrl("transfers");

export const assetListApi = makeApiUrl("assets");
export const assetApi = (id) => makeApiUrl("asset", id);

function makeApiUrl(...args) {
  let urlString = args.join("/");

  if (!/^\//.test(urlString)) {
    urlString = "/" + urlString;
  }

  return urlString;
}
