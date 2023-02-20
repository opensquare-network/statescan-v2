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
export const accountSummaryApi = (id) => `/accounts/${id}/summary`;

// transfers
export const transferListApi = `/transfers`;

// assets
export const assetListApi = `/assets`;
export const assetApi = (id) => `/assets/${id}`;

// nfts
export const nftListApi = `/uniques/classes`;
export const nftClassApi = (id) => `/uniques/classes/${id}`;
export const nftPopularListApi = `/uniques/classes/popular`;
export const nftInstanceApi = (classId, instanceId) =>
  `/uniques/classes/${classId}/instances/${instanceId}`;
