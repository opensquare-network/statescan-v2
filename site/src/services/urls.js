// NOTE: all api endpoints here

export const homeSearchHints = "/search/hints";

export const extrinsicListApi = makeApiUrl("extrinsics");
export const extrinsicApi = (id) => makeApiUrl("extrinsics", id);

export const blockListApi = makeApiUrl("blocks");
export const blockApi = (id) => makeApiUrl("blocks", id);
export const eventApi = (id) => makeApiUrl("events", id);
export const callApi = (id) => makeApiUrl("calls", id);

function makeApiUrl(...args) {
  let urlString = args.join("/");

  if (!/^\//.test(urlString)) {
    urlString = "/" + urlString;
  }

  return urlString;
}
