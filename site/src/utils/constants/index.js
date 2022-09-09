export const DEFAULT_THEME_COLOR = "#F22279";
export const DEFAULT_THEME_COLOR_SECONDARY = "#FEE4EF";
export const DEFAULT_THEME_BUTTON_COLOR = "#F22279";
export const DEFAULT_THEME_LOGO = "logo-img-1.svg";
export const PAGE_OFFSET = 1;

export const nodes = [
  {
    name: "Statemine",
    sub: "Kusama",
    value: "statemine",
    symbol: "KSM",
    icon: "/imgs/icons/kusama.svg",
    color: "#3765DC",
    colorSecondary: "#EAF0FF",
    buttonColor: "#000000",
    logo: "logo-img-2.svg",
  },
  {
    name: "Statemint",
    sub: "Polkadot",
    value: "statemint",
    symbol: "DOT",
    icon: "/imgs/icons/polkadot.svg",
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
    icon: "/imgs/icons/westend.svg",
    color: "#DA68A7",
    colorSecondary: "#FAE6F2",
    buttonColor: "#DA68A7",
  },
];

export const blocksLatestHead = [
  { name: "Height", width: 136 },
  { name: "Time" },
  { name: "Validator" },
  { name: "Extrinsics", align: "right", width: 136 },
  { name: "Events", align: "right", width: 136 },
];

export const transfersLatestHead = [
  { name: "Extrinsic ID", width: 136 },
  { name: "Time" },
  { name: "From", width: 136 },
  { name: "To", width: 136 },
  { name: "Quantity", align: "right" },
];

export const assetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 152 },
  { name: "Name", width: 168 },
  { name: "Owner", width: 152 },
  { name: "Issuer", width: 152 },
  { name: "Price", width: 120, align: "right" },
  { name: "Holders", width: 120, align: "right" },
  { name: "Total Supply", align: "right" },
];

export const destroyedAssetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 152 },
  { name: "Name", width: 200 },
  { name: "Destroyed Time", width: 200 },
  { name: "Owner", width: 200 },
  { name: "Total Destroyed", align: "right" },
];

export const destroyedNftHead = [
  { name: "ID", width: 120 },
  { name: "Class", width: 100 },
  { name: "Name" },
  { name: "Destroyed Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120 },
];

export const nftsHead = [
  { name: "ID", width: 120 },
  { name: "Class", width: 100 },
  { name: "Name" },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Instance", width: 120 },
  { name: "Status", width: 160 },
];

export const addressExtrincsHead = [
  { name: "ID", width: 160 },
  { name: "Hash" },
  { name: "Time", type: "time", width: 200 },
  { name: "Result", width: 160 },
  { name: "Action", width: 320 },
  { name: "Data", type: "data", width: 76, display: "table" },
];

export const addressAssetsHead = [
  { name: "Asset ID", width: 120 },
  { name: "Symbol", width: 152 },
  { name: "Name", width: 200 },
  { name: "Balance", align: "right" },
  { name: "Approved", align: "right" },
  { name: "Frozen", align: "right" },
  { name: "Transfer Count", align: "right" },
];

export const addressTransfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Extrinsic ID", width: 136 },
  { name: "Method", width: 200 },
  { name: "Age", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Quantity", align: "right" },
];

export const extrinsicEventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockExtrinsicsHead = [
  { name: "ID", width: 160 },
  { name: "Hash" },
  { name: "Result", width: 160 },
  { name: "Action", width: 320 },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockEventsHead = [
  { name: "Event ID", width: 160 },
  { name: "Extrinsic ID", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const blockLogsHead = [
  { name: "Log Index", width: 160 },
  { name: "Block", width: 160 },
  { name: "Type" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const assetTransfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Extrinsic ID", width: 136 },
  { name: "Method", width: 200 },
  { name: "Age", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Quantity", align: "right" },
];

export const assetHoldersHead = [
  { name: "Rank", width: 96 },
  { name: "Address" },
  { name: "Quantity", align: "right" },
];

export const blocksHead = [
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Status", width: 160 },
  { name: "Hash", width: 280 },
  { name: "Validator", width: 152 },
  { name: "Extrinsics", align: "right" },
  { name: "Events", align: "right" },
];

export const extrinsicsHead = [
  { name: "Extrinsics ID", width: 136 },
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsics Hash", width: 200 },
  { name: "Result", width: 160 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const eventsHead = [
  { name: "Event ID", width: 136 },
  { name: "Height", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "Extrinsics Hash", width: 200 },
  { name: "Action" },
  { name: "Data", type: "data", align: "right", width: 76, display: "table" },
];

export const transfersHead = [
  { name: "Event ID", width: 136 },
  { name: "Block", width: 136 },
  { name: "Method", width: 200 },
  { name: "Time", type: "time", width: 200 },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
  { name: "Value", align: "right" },
];

export const addressesHead = [
  { name: "Rank", width: 96 },
  { name: "Account" },
  { name: "Balance", width: 240, align: "right" },
];

export const teleportsHeadIn = [
  { name: "Extrinsics ID", width: 136 },
  { name: "Time", type: "time", width: 184 },
  { name: "Receiver", width: 160 },
  { name: "Direction", type: "collapse" },
  { name: "Result", width: 100 },
  { name: "SentAt", width: 138, icon: "icon" },
  { name: "Amount", align: "right" },
  { name: "Fee", align: "right" },
  { name: "Total", align: "right" },
];

export const teleportsHeadOut = [
  { name: "Extrinsics ID", width: 136 },
  { name: "Time", type: "time", width: 200 },
  {
    name: "Receiver",
    type: "switcher",
    children: ["Receiver", "Sender"],
    width: 160,
  },
  { name: "Direction", type: "collapse" },
  { name: "Result", width: 120 },
  { name: "Enter", width: 136, icon: "icon" },
  { name: "Executed", width: 136, icon: "icon" },
  { name: "Amount", align: "right" },
  // { name: "Fee", align: "right" },
  // { name: "Total", align: "right" },
];

export const addressHead = [
  "Address",
  "Total Balance",
  "Free",
  "Reserved",
  "Nonce",
];

export const extrinsicHead = [
  "Timestamp",
  "Block",
  "Life Time",
  "Extrinsic Hash",
  "Module",
  "Call",
  "Signer",
  "Assets Transferred",
  "Nonce",
  "Tip",
  "Result",
];

export const blockHead = [
  "Block Time",
  "Status",
  "Hash",
  "Parent Hash",
  "State Root",
  "Extrinsics Root",
  "Validator",
];

export const assetHead = [
  "Symbol",
  "Name",
  "Asset ID",
  "Owner",
  "Issuer",
  "Price",
  "Admin",
  "Freezer",
  "Total Supply",
  "Decimals",
  "Status",
  "Holders",
  "Transfers",
];

export const nftClassHead = [
  "Class ID",
  "Created Time",
  "Instance",
  "Owner",
  "Issuer",
  "Admin",
  "Freezer",
  "Status",
  "Link",
];

export const nftInstanceHead = [
  "Instance ID",
  "Created Time",
  "Owner",
  "Status",
  "Link",
];

export const nftClassInstanceHead = [
  { name: "ID", width: 120 },
  { name: "NFT", width: 100 },
  { name: "Name", width: 452 },
  { name: "Created Time", width: 200 },
  { name: "Owner", width: 152 },
  { name: "Status" },
];

export const addressNftInstanceHead = [
  { name: "Class ID", width: 136 },
  { name: "Instance ID", width: 136 },
  { name: "NFT", width: 100 },
  { name: "Name", width: 452 },
  { name: "Created Time", width: 200, align: "right" },
  { name: "Status", align: "right" },
];

export const nftTransferHead = [
  { name: "Extrinsic ID", width: 136 },
  { name: "Instance ID", width: 136 },
  { name: "Time", type: "time", width: 200 },
  { name: "NFT", width: 100 },
  { name: "Name" },
  { name: "From", width: 160 },
  { name: "To", width: 160 },
];

export const eventHead = [
  "Timestamp",
  "Block",
  "Extrinsics ID",
  "Event Index",
  "Module",
  "Event Name",
  "Description",
  "Value",
];

export const timeTypes = {
  age: "age",
  date: "date",
};

export const EmptyQuery = {
  total: 0,
  page: 0,
  pageSize: 10,
  items: [],
};

export const teleportDirection = {
  in: 0,
  out: 1,
};

export const assetGovernances = {
  /* Asset ID */ 8: [
    {
      spaceLogo: "/imgs/icons/asset-governance-rmrk.svg",
      spaceName: "RMRK",
      projectName: "RMRK",
      link: "https://opensquare.io/space/rmrk",
    },
    {
      spaceLogo: "/imgs/icons/asset-governance-rmrk-curation.png",
      spaceName: "RMRK Curation",
      projectName: "RMRK",
      link: "https://opensquare.io/space/rmrk-curation",
    },
  ],
  16: [
    {
      spaceLogo: "/imgs/icons/asset-governance-polarisDAO.svg",
      spaceName: "PolarisDAO",
      projectName: "PolarisDAO",
      link: "https://voting.opensquare.io/space/polarisdao",
    },
  ],
  567: [
    {
      spaceLogo: "/imgs/icons/asset/chrawnna.svg",
      spaceName: "Chrawnna",
      projectName: "Chrawnna",
      link: "https://voting.opensquare.io/space/chrwna",
    },
  ],
};
