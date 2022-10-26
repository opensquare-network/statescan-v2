// NOTE: all api endpoints here

export const homeSearchHints = "/search/hints";

export const extrinsicApi = (id) => makeApiUrl("extrinsics", id);
export const blockApi = (id) => makeApiUrl("blocks", id);

function makeApiUrl(...args) {
  let urlString = args.join("/");

  if (!/^\//.test(urlString)) {
    urlString = "/" + urlString;
  }

  return urlString;
}
