export const LIST_DEFAULT_PAGE_SIZE = 25;

export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const chains = [
  {
    name: "Polkadot",
    sub: "polkadot",
    value: "polkadot",
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
    sub: "kusama",
    value: "statemine",
    symbol: "KSM",
    decimals: 12,
    chainIcon: "kusama",
    color: "#3765DC",
    colorSecondary: "#EAF0FF",
    buttonColor: "#000000",
    logo: "logo-img-2",
  },
  {
    name: "Statemint",
    sub: "polkadot",
    value: "statemint",
    symbol: "DOT",
    decimals: 10,
    chainIcon: "polkadot",
    color: "#E6007A",
    colorSecondary: "#FDE5F2",
    buttonColor: "#E6007A",
    hidden: false,
  },
  {
    name: "Westmint",
    sub: "westend",
    value: "westmint",
    symbol: "WND",
    decimals: 12,
    chainIcon: "westend",
    color: "#DA68A7",
    colorSecondary: "#FAE6F2",
    buttonColor: "#DA68A7",
  },
  {
    name: "Litmus",
    sub: "litentry",
    value: "litmus",
    symbol: "LIT",
    decimals: 12,
    chainIcon: "litmus",
    color: "#6431EC",
    colorSecondary: "#FAE6F2",
    buttonColor: "#6431EC",
  },
  {
    name: "Litentry",
    sub: "litentry",
    value: "litentry",
    symbol: "LIT",
    decimals: 12,
    chainIcon: "litentry",
    color: "#1CC776",
    colorSecondary: "#FAE6F2",
    buttonColor: "#1CC776",
  },
];

export const chainNames = chains.map((item) => item.value);

export const Extrinsics = "extrinsics";
export const Events = "events";
export const Logs = "logs";

export const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
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
  { name: "Call", width: 200 },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const blockEventsHead = [
  { name: "ID", width: 160 },
  { name: "Extrinsic ID", width: 200 },
  { name: "Call", width: 200 },
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
  { name: "Call", width: 200 },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const eventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const callsHead = [
  { name: "Call ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Block", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Method", width: 200 },
  { name: "Call" },
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
  { name: "Account", width: 200 },
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
