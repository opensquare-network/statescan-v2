export const LIST_DEFAULT_PAGE_SIZE = 25;

export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const Transfers = "transfers";
export const Extrinsics = "extrinsics";
export const Holders = "holders";
export const Events = "events";
export const Logs = "logs";
export const Timeline = "timeline";
export const Analytics = "analytics";

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

export const menusAssets = [
  {
    name: "Assets",
    value: "assets",
  },
  {
    name: "NFT",
    value: "nfts",
  },
  {
    type: "divider",
  },
  {
    type: "group",
    name: "Destroyed",
    menus: [
      {
        name: "Assets",
        value: "destroyed/assets",
      },
    ],
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

export const blockExtrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Hash", width: 200 },
  { name: "Result", width: 160, align: "center" },
  { name: "Call", type: "call" },
  {
    name: "Data",
    width: "100%",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const blockEventsHead = [
  { name: "ID", width: 160 },
  { name: "Extrinsic ID", width: 200 },
  { name: "Call", type: "call" },
  {
    name: "Data",
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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

export const accountExtinsicsHead = blockExtrinsicsHead;

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

export const nftsHead = [
  { name: "ID", width: 120 },
  { name: "Class", width: 100 },
  { name: "Name", width: 232 },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120 },
  { name: "Status", width: 160 },
];

export const destroyedAssetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 136 },
  { name: "Name", width: "100%" },
  { name: "Destroyed Time", width: 200 },
  { name: "Owner", width: 200 },
  { name: "Total Destroyed", width: 200, align: "right" },
];

export const timeTypes = {
  age: "age",
  date: "date",
};

export const signedOnlyFilter = {
  value: "true",
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

export const ASSET_ANALYTICS_RANGE = {
  ONE_MONTH: "1m",
  ONE_YEAR: "1y",
  ALL: "all",
};
export const ASSET_ANALYTICS_RANGE_ITEMS = Object.values(ASSET_ANALYTICS_RANGE);
