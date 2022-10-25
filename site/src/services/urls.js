// NOTE: all api endpoints here

export const homeSearchHints = "/search/hints";

export const extrinsicApi = (id) => makeApiUrl("extrinsics", id);
export const extrinsicEventsApi = (id) =>
  makeApiUrl(extrinsicApi(id), "events");
export const extrinsicCallsApi = (id) => makeApiUrl(extrinsicApi(id), "calls");

function makeApiUrl(...args) {
  let urlString = args.join("/");

  if (!/^\//.test(urlString)) {
    urlString = "/" + urlString;
  }

  return urlString;
}
