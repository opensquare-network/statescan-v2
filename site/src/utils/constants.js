import litentry from "./consts/chains/litentry";
import litmus from "./consts/chains/litmus";
import westmint from "./consts/chains/westmint";
import statemint from "./consts/chains/statemint";
import statemine from "./consts/chains/statemine";
import polkadot from "./consts/chains/polkadot";

export const LIST_DEFAULT_PAGE_SIZE = 25;

export const CACHE_KEY = {
  themeMode: "theme-mode",
};

export const chains = [
  polkadot,
  statemine,
  statemint,
  westmint,
  litmus,
  litentry,
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

export const menusAssets = [
  {
    name: "Assets",
    value: "assets",
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

export const blockTabs = [Extrinsics, Events, Logs];

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

export const accountExtinsicsHead = blockExtrinsicsHead;

export const assetsHead = [
  { name: "Asset ID", width: 160 },
  { name: "Symbol", width: 232 },
  { name: "Owner", width: 200 },
  { name: "Issuer", width: 200 },
  { name: "Holders", width: 160, align: "right" },
  { name: "Total Supply", width: 200, align: "right" },
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
