// NOTE: all api endpoints here

export const homeSearchHints = "/search/hints";

// extrinsics
export const extrinsicListApi = `/extrinsics`;
export const extrinsicApi = (id) => `/extrinsics/${id}`;

// blocks
export const blockListApi = `/blocks`;
export const blockApiUrl = (id) => `/blocks/${id}`;

// events
export const eventListApi = `/events`;
export const eventApi = (id) => `/events/${id}`;

// calls
export const callListApi = `/calls`;
export const callApi = (id) => `/calls/${id}`;

// accounts
export const accountListApi = `/accounts`;
export const accountApi = (id) => `/accounts/${id}`;

// transfers
export const transferListApi = `/transfers`;

// assets
export const assetListApi = `/assets`;
export const assetApi = (id) => `/asset/${id}`;

// nfts
export const nftListApi = `/uniques/classes`;
export const nftClassApi = (id) => `/uniques/class/${id}`;
