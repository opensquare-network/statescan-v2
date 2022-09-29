export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const chains = [
  {
    name: "Statemine",
    sub: "Kusama",
    value: "statemine",
    symbol: "KSM",
    chainIcon: "kusama",
    color: "#3765DC",
    colorSecondary: "#EAF0FF",
    buttonColor: "#000000",
    logo: "logo-img-2",
  },
  {
    name: "Statemint",
    sub: "Polkadot",
    value: "statemint",
    symbol: "DOT",
    chainIcon: "polkadot",
    color: "#E6007A",
    colorSecondary: "#FDE5F2",
    buttonColor: "#E6007A",
    hidden: false,
  },
  {
    name: "Westmint",
    sub: "Westend",
    value: "westmint",
    symbol: "WND",
    chainIcon: "westend",
    color: "#DA68A7",
    colorSecondary: "#FAE6F2",
    buttonColor: "#DA68A7",
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
  { name: "Height", width: 136 },
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

export const blockLogsHead = [
  { name: "Log Index", width: 160 },
  { name: "Block", width: 200 },
  { name: "Type", width: 200 },
  { name: "Data", type: "data", align: "right", display: "table" },
];

export const extrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Height", width: 136 },
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

export const timeTypes = {
  age: "age",
  date: "date",
};
