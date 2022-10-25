export const LIST_DEFAULT_PAGE_SIZE = 25;

export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const chains = [
  {
    name: "Polkadot",
    identity: "polkadot",
    sub: "polkadot",
    value: "polkadot",
    chain: "polkadot",
    symbol: "DOT",
    decimals: 10,
    chainIcon: "originalPolkadot",
    color: "#E6007A",
    colorSecondary: "#FDE5F2",
    buttonColor: "#E6007A",
    logo: "logo-img-2",
  },
  {
    name: "Statemine",
    identity: "kusama",
    sub: "kusama",
    value: "statemine",
    chain: "kusama",
    symbol: "KSM",
    decimals: 12,
    chainIcon: "kusama",
    color: "#3765DC",
    colorSecondary: "rgba(55, 101, 220, 0.1)",
    buttonColor: "#000000",
    logo: "logo-img-2",
  },
  {
    name: "Statemint",
    identity: "polkadot",
    sub: "polkadot",
    value: "statemint",
    chain: "polkadot",
    symbol: "DOT",
    decimals: 10,
    chainIcon: "polkadot",
    color: "#E6007A",
    colorSecondary: "rgba(230, 0, 122, 0.1)",
    buttonColor: "#E6007A",
    hidden: false,
  },
  {
    name: "Westmint",
    identity: "westend",
    sub: "westend",
    value: "westmint",
    chain: "westend",
    symbol: "WND",
    decimals: 12,
    chainIcon: "westend",
    color: "#DA68A7",
    colorSecondary: "rgba(218, 104, 167, 0.1)",
    buttonColor: "#DA68A7",
  },
  {
    name: "Litmus",
    identity: "kusama",
    sub: "litentry",
    value: "litmus",
    chain: "kusama",
    symbol: "LIT",
    decimals: 12,
    chainIcon: "litmus",
    color: "#6431EC",
    colorSecondary: "rgba(100, 49, 236, 0.1)",
    buttonColor: "#6431EC",
  },
  {
    name: "Litentry",
    identity: "polkadot",
    sub: "litentry",
    value: "litentry",
    chain: "polkadot",
    symbol: "LIT",
    decimals: 12,
    chainIcon: "litentry",
    color: "#1CC776",
    colorSecondary: "rgba(28, 199, 118, 0.1)",
    buttonColor: "#1CC776",
  },
];

export const chainNames = chains.map((item) => item.value);

export const Transfers = "transfers";
export const Extrinsics = "extrinsics";
export const Events = "events";
export const Logs = "logs";

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
    name: "Transfers",
    value: "transfers",
  },
  {
    name: "Accounts",
    value: "accounts",
  },
];

export const blocksHead = [
  { name: "Height", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Status", align: "center", width: 160 },
  { name: "Hash", width: 240 },
  { name: "Validator", width: 200 },
  { name: "Extrinsics", align: "right", width: 152 },
  { name: "Events", align: "right", width: 160 },
];

export const blockTabs = [Extrinsics, Events, Logs];

export const blockExtrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Hash", width: 200 },
  { name: "Result", width: 160, align: "center" },
  { name: "Call", width: 200, type: "call" },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const blockEventsHead = [
  { name: "ID", width: 160 },
  { name: "Extrinsic ID", width: 200 },
  { name: "Call", width: 200, type: "call" },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const extrinsicEventsHead = blockEventsHead;

export const blockLogsHead = [
  { name: "Log Index", width: 160 },
  { name: "Block", width: 200 },
  { name: "Type", width: 200 },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const extrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Height", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Hash", width: 200 },
  { name: "Result", width: 160, align: "center" },
  { name: "Call", width: 200, type: "call" },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const eventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Action", type: "call" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const callsHead = [
  { name: "Call ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Method", width: 200 },
  { name: "Call", width: 200, type: "call" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const transfersHead = [
  { name: "Event ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "From", width: 200 },
  { name: "To", width: 200 },
  { name: "Value", align: "right" },
];

export const accountsHead = [
  { name: "Rank", width: 96 },
  { name: "Account", width: 500 },
  { name: "Balance", width: 240, align: "right" },
];

export const accountTransfersHead = [
  { name: "Event ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "From", width: 200 },
  { name: "To", width: 200 },
  { name: "Balance", align: "right" },
];

export const accountExtinsicsHead = blockExtrinsicsHead;

export const timeTypes = {
  age: "age",
  date: "date",
};

export const basicFilters = [
  {
    value: "true",
    name: "Sign",
    query: "signed_only",
    options: [
      {
        text: "Signed only",
        value: "true",
      },
      { text: "All", value: "false" },
    ],
  },
];
