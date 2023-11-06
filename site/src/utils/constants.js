export const LIST_DEFAULT_PAGE_SIZE = 25;

export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const Assets = "assets";
export const Transfers = "transfers";
export const Extrinsics = "extrinsics";
export const Holders = "holders";
export const Events = "events";
export const Logs = "logs";
export const Timeline = "timeline";
export const Analytics = "analytics";
export const Instances = "instances";
export const Attributes = "attributes";
export const Nft = "NFT";
export const NftTransfer = "NFT Transfer";

export const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
  },
  {
    name: "Extrinsics",
    value: "extrinsics",
  },
  {
    name: "Events",
    value: "events",
  },
  {
    name: "Calls",
    value: "calls",
  },
  {
    type: "divider",
  },
  {
    name: "Transfers",
    value: "transfers",
  },
  {
    name: "Accounts",
    value: "accounts",
  },
];

export const menusAssetsDestroyed = [
  {
    name: "Assets",
    value: "destroyed/assets",
  },
  {
    name: "NFT",
    value: "destroyed/uniques",
  },
];

export const menusAssets = [
  {
    name: "Assets",
    value: "assets",
  },
  {
    name: "NFT",
    value: "uniques",
  },
  {
    type: "divider",
  },
  {
    type: "group",
    title: "Destroyed",
    menus: menusAssetsDestroyed,
  },
];

export const menusIdentity = [
  {
    name: "Identities",
    value: "identities",
  },
  {
    type: "divider",
  },
  {
    name: "Judgements",
    value: "identities/judgements",
  },
  {
    name: "Registrars",
    value: "identities/registrars",
  },
];

export const blocksHead = [
  { name: "Height", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Status", width: 112 },
  { name: "Hash", width: 240 },
  { name: "Validator", width: 200 },
  { name: "Extrinsics", align: "right", width: 152 },
  { name: "Events", align: "right", width: 160 },
];

export const blockEventsHead = [
  { name: "ID", width: 160 },
  { name: "Extrinsic ID", width: 200 },
  { name: "Call", type: "call" },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const extrinsicEventsHead = blockEventsHead;

export const blockLogsHead = [
  { name: "Log Index", width: 160 },
  { name: "Block", width: 200 },
  { name: "Type", width: 200 },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const extrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Height", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Hash", width: 200 },
  { name: "Result", width: 160, align: "center" },
  { name: "Call", type: "call" },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const eventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Action", type: "call" },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const callsHead = [
  { name: "Call ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Method", width: 200 },
  { name: "Call", type: "call" },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const transfersHead = [
  { name: "Event ID", width: 160 },
  { name: "Extrinsic ID", width: 160, align: "center" },
  { name: "Time", type: "time", width: 200 },
  { name: "From", width: 200 },
  { name: "To", width: 200 },
  { name: "Value", width: 390, align: "right" },
];

export const nftTransfersHead = [
  { name: "Extrinsic ID", width: 120 },
  { name: "Instance ID", width: 120 },
  { name: "Time", type: "time", width: 160 },
  { name: "NFT", width: 80 },
  { name: "Name", width: 200 },
  { name: "From", width: 120 },
  { name: "To", width: 120 },
];

export const accountsHead = [
  { name: "Rank", width: 96 },
  { name: "Account", width: 510 },
  { name: "Balance", width: 240, align: "right" },
];

export const holdersHead = [
  { name: "Rank", width: 96 },
  { name: "Address", width: 510 },
  { name: "Quantity", width: 240, align: "right" },
];

export const assetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 136 },
  { name: "Name", width: 232 },
  { name: "Owner", width: 160 },
  { name: "Issuer", width: 160 },
  { name: "Holders", width: 120, align: "right" },
  { name: "Total Supply", width: 160, align: "right" },
];
/**
 * @description for page account
 */
export const accountAssetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 136 },
  { name: "Name", width: 232 },
  { name: "Balance", width: 160, align: "right" },
  { name: "Approved", width: 160, align: "right" },
  { name: "Frozen", width: 160, align: "right" },
  { name: "Total Supply", width: 160, align: "right" },
];
export const accountSubIdentitiesHead = [
  { name: "Identity", width: 320 },
  { name: "Name", width: 240 },
  { name: "Address", minWidth: 300, width: 712 },
];

export const nftsHead = [
  { name: "ID", width: 120 },
  { name: "Class", width: 100 },
  { name: "Name", width: 232 },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120 },
  { name: "Status", width: 160 },
];

export const nftClassInstanceHead = [
  { name: "ID", width: 120 },
  { name: "NFT", width: 100 },
  { name: "Name", width: 452 },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Status" },
];

export const destroyedAssetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Height", width: 160 },
  { name: "Symbol", width: 136 },
  { name: "Name", width: 232 },
  { name: "Destroyed Time", width: 200 },
  { name: "Owner", width: 200 },
  { name: "Total Destroyed", width: 200, align: "right" },
];

export const destroyedNftsHead = [
  { name: "ID", width: 120 },
  { name: "Class", width: 100 },
  { name: "Name", width: 232 },
  { name: "Destroyed Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120, align: "right" },
];

export const identitiesHead = [
  { name: "Identity Name", minWidth: 300, width: 712 },
  { name: "Address", width: 240 },
  { name: "Sub Identity", width: 160, align: "right" },
  { name: "Update at", width: 200 },
];

export const requestsHead = [
  { name: "Requester", width: 240 },
  { name: "Registrar", minWidth: 300, width: 472 },
  {
    name: "Start at",
    width: 200,
    type: "sortable",
    sortAscendingQueryValue: "REQUEST_HEIGHT_ASC",
    sortDescendingQueryValue: "REQUEST_HEIGHT_DESC",
  },
  { name: "End at", width: 200 },
  { name: "Status", width: 200 },
];

export const registrarsHead = [
  {
    name: "Registrar",
    width: 512,
    type: "sortable",
    sortAscendingQueryValue: "REGISTRAR_INDEX_ASC",
    sortDescendingQueryValue: "REGISTRAR_INDEX_DESC",
    sortDefaultQueryValue: "REGISTRAR_INDEX_ASC",
  },
  {
    name: "Received Req.",
    width: 160,
    align: "right",
    type: "sortable",
    sortAscendingQueryValue: "REGISTRAR_RECEIVED_REQ_ASC",
    sortDescendingQueryValue: "REGISTRAR_RECEIVED_REQ_DESC",
  },
  {
    name: "Total Given.",
    width: 160,
    align: "right",
    type: "sortable",
    sortAscendingQueryValue: "REGISTRAR_TOTAL_GIVEN_ASC",
    sortDescendingQueryValue: "REGISTRAR_TOTAL_GIVEN_DESC",
  },
  {
    name: "Fee",
    width: 160,
    align: "right",
    type: "sortable",
    sortAscendingQueryValue: "REGISTRAR_FEE_ASC",
    sortDescendingQueryValue: "REGISTRAR_FEE_DESC",
  },
  {
    name: "Total earn",
    width: 160,
    align: "right",
    type: "sortable",
    sortAscendingQueryValue: "REGISTRAR_TOTAL_EARN_ASC",
    sortDescendingQueryValue: "REGISTRAR_TOTAL_EARN_DESC",
  },
];

export const timeTypes = {
  age: "age",
  date: "date",
};

export const signedOnlyFilter = {
  value: "true",
  defaultValue: "true",
  name: "Sign",
  query: "signed_only",
  options: [
    { text: "All", value: "false" },
    {
      text: "Signed only",
      value: "true",
    },
  ],
};

export const extrinsicOnlyFilter = {
  value: "true",
  name: "Extrinsic",
  query: "is_extrinsic",
  options: [
    { text: "All", value: "false" },
    {
      text: "Extrinsic only",
      value: "true",
    },
  ],
};

export const ASSET_ANALYTICS_RANGE = {
  ONE_MONTH: "1m",
  ONE_YEAR: "1y",
  ALL: "all",
};

export const ASSET_ANALYTICS_RANGE_ITEMS = Object.values(ASSET_ANALYTICS_RANGE);

export const TREASURY_ACCOUNT =
  "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";

export const REQUEST_STATUS = {
  PENDING: "pending",
  CANCELLED: "cancelled",
  GIVEN: "given",
  REMOVED: "removed",
};

export const TABLE_SORT_QUERY_KEY = "sort";

export const IDENTITY_ID_TYPE = {
  NO_ID: "NO_ID",
  NOT_VERIFIED: "NOT_VERIFIED",
  VERIFIED: "VERIFIED",
  ERRONEOUS: "ERRONEOUS",
  VERIFIED_LINKED: "VERIFIED_LINKED",
  NOT_VERIFIED_LINKED: "LINKED",
  ERRONEOUS_LINKED: "ERRONEOUS_LINKED",
};

export const IDENTITY_JUDGEMENT = {
  Reasonable: "Reasonable",
  KnownGood: "KnownGood",
  OutOfDate: "OutOfDate",
  LowQuality: "LowQuality",
  Erroneous: "Erroneous",
};

export const IDENTITY_TYPE = {
  DIRECT: "DIRECT",
  SUB: "SUB",
};

export const ACCOUNT_IDENTITY_TAB_NAME = "identity";
export const ACCOUNT_IDENTITY_TAB_SUBTAB = {
  INFO: "info",
  SUB_IDENTITIES: "sub_identities",
  IDENTITY_TIMELINE: "identity_timeline",
  REGISTRAR_TIMELINE: "registrar_timeline",
};
