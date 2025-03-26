import { isPolimec, isStatemint } from "./env";

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

export const menusBlockchainSimpleMode = [
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

export const menusBlockchain = [
  {
    name: "Blocks",
    value: "blocks",
  },
  ...menusBlockchainSimpleMode,
];

export const menuAssetsDestroyed = [
  {
    name: "Assets",
    value: "destroyed/assets",
  },
];

export const destroyedAssetsMenuItem = {
  name: "Assets",
  value: "destroyed/assets",
};

export const destroyedUniquesMenuItem = {
  name: "NFT",
  value: "destroyed/uniques",
};

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

export const assetsMenuItem = {
  name: "Assets",
  value: "destroyed/assets",
};

export const dividerMenuItem = {
  type: "divider",
};

export const uniquesMenuItem = {
  name: "NFT",
  value: "uniques",
};

export const menuAssets = [
  {
    name: "Assets",
    value: "assets",
  },
];

if (isPolimec() || isStatemint()) {
  menuAssets.push({
    name: "Foreign Assets",
    value: "foreign-assets",
  });
}

if (!isPolimec()) {
  menuAssets.push(
    {
      type: "divider",
    },
    {
      type: "group",
      title: "Destroyed",
      menus: menuAssetsDestroyed,
    },
  );
}

export const menusAssetsAndUniques = [
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

export const extrinsicsHeadSimpleMode = [
  { name: "ID", width: 160 },
  { name: "Height", width: 160 },
  { name: "Time", type: "time", width: 200 },
  { name: "Result", width: 160, align: "center" },
  { name: "Call", type: "call" },
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
  { name: "Value", align: "right" },
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
  { name: "Asset ID", width: 160 },
  { name: "Asset", minWidth: 352 },
  { name: "Owner", width: 160 },
  { name: "Issuer", width: 160 },
  { name: "Holders", width: 120, align: "right" },
  { name: "Total Supply", width: 160, align: "right" },
];

export const foreignAssetsHead = [
  { name: "Asset", minWidth: 352 },
  { name: "Asset ID", width: 160 },
  { name: "Location", width: 120 },
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
  // { name: "Approved", width: 160, align: "right" }, // https://github.com/opensquare-network/statescan-v2/issues/1036
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

export const multisigsHead = [
  {
    name: "Multisig ID",
    width: 160,
  },
  {
    name: "Address",
    minWidth: 176,
  },
  {
    name: "Approving",
    width: 160,
  },
  {
    name: "Call",
    minWidth: 320,
  },
  {
    name: "Start Time",
    width: 200,
  },
  {
    name: "Status",
    minWidth: 160,
  },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const vestingsHead = [
  {
    name: "Address",
    minWidth: 300,
    width: 704,
  },
  {
    name: "Starting Block",
    width: 160,
  },
  {
    name: "Per Block",
    width: 200,
    align: "right",
  },
  {
    name: "Locked",
    width: 200,
    align: "right",
  },
];

export const proxyHead = [
  {
    name: "Delegator",
    width: 240,
  },
  {
    name: "Delegatee",
    minWidth: 240,
  },
  {
    name: "Type",
    width: 160,
  },
  {
    name: ["Delay Blocks", "Delay Time"],
    width: 160,
    type: "switch",
  },
  {
    name: "Crated At",
    width: 160,
  },
  {
    name: "Status",
    width: 160,
  },
  {
    name: "",
    width: 76,
  },
];

export const proxyCallsHead = [
  {
    name: "Hash",
    width: 240,
  },
  {
    name: ["Block", "Time"],
    width: 200,
    type: "switch",
  },
  {
    name: "Result",
    width: 112,
  },
  {
    name: "Call",
  },
  {
    name: "",
    width: 76,
    type: "data",
    align: "right",
    display: "table",
  },
];

export const proxyAnnouncementsHead = [
  {
    name: "Hash",
    width: 240,
  },
  {
    name: ["Block", "Time"],
    width: 200,
    type: "switch",
  },
  {
    name: "Call",
  },
  {
    name: "Status",
    width: 160,
  },
  {
    name: ["Final Block", "Final Time"],
    width: 200,
    type: "switch",
  },
  {
    name: "",
    width: 76,
  },
];

export const MULTISIG_ACCOUNT_SORT = {
  DEBUT_AT_HEIGHT_DESC: "DEBUT_AT_HEIGHT_DESC",
  DEBUT_AT_HEIGHT_ASC: "DEBUT_AT_HEIGHT_ASC",
  LATEST_MULTISIG_AT_HEIGHT_DESC: "LATEST_MULTISIG_AT_HEIGHT_DESC",
  LATEST_MULTISIG_AT_HEIGHT_ASC: "LATEST_MULTISIG_AT_HEIGHT_ASC",
};

export const multisigAccountsHead = [
  {
    name: "Multisig Address",
    minWidth: 300,
    width: 592,
  },
  {
    name: "Threshold",
    width: 160,
  },
  {
    name: "Signatories",
    width: 160,
  },
  {
    name: "Debut At",
    width: 200,
    type: "sortable",
    sortAscendingQueryValue: MULTISIG_ACCOUNT_SORT.DEBUT_AT_HEIGHT_ASC,
    sortDescendingQueryValue: MULTISIG_ACCOUNT_SORT.DEBUT_AT_HEIGHT_DESC,
    sortDefaultQueryValue: MULTISIG_ACCOUNT_SORT.DEBUT_AT_HEIGHT_DESC,
  },
  {
    name: "Latest Multisig At",
    width: 200,
    type: "sortable",
    sortAscendingQueryValue:
      MULTISIG_ACCOUNT_SORT.LATEST_MULTISIG_AT_HEIGHT_ASC,
    sortDescendingQueryValue:
      MULTISIG_ACCOUNT_SORT.LATEST_MULTISIG_AT_HEIGHT_DESC,
  },
];

export const recoverablesHead = [
  {
    name: "Account",
    width: 240,
  },
  {
    name: "Created At",
    width: 160,
  },
  {
    name: "Friends",
    width: 160,
  },
  {
    name: "Delay Period",
    width: 160,
  },
  {
    name: "Deposit",
    width: 160,
  },
  {
    name: "Rescuer",
    minWidth: 190,
  },
  {
    name: "Status",
    width: 160,
  },
  {
    name: "",
    width: 76,
  },
];

export const recoverableCallsHead = [
  {
    name: "Block",
    width: 160,
  },
  {
    name: "Rescuer",
    width: 240,
  },
  {
    name: "Time",
    type: "time",
    width: 200,
  },
  {
    name: "Call",
  },
  {
    name: "Data",
    type: "data",
    align: "right",
    display: "table",
  },
];

export const recoveriesHead = [
  {
    name: "Lost Account",
    width: 240,
  },
  {
    name: "Created At",
    width: 160,
  },
  {
    name: "Rescuer",
    minWidth: 196,
    width: 292,
  },
  {
    name: "Friends",
    width: 160,
  },
  {
    name: "Deposit",
    width: 160,
  },
  {
    name: "Status",
    width: 160,
  },
  {
    name: "",
    width: 76,
  },
];

export const recoveryProxiesHead = [
  {
    name: "Lost Account",
    width: 240,
  },
  {
    name: "Rescuer",
    minWidth: 240,
  },
];

export const recoveryCallsHead = [
  {
    name: "Lost Account",
    width: 240,
  },
  {
    name: "Created At",
    width: 160,
  },
  {
    name: "Rescuer",
    width: 240,
  },
  {
    name: "Call",
    minWidth: 196,
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

export const MULTISIG_STATUS = {
  APPROVING: "APPROVING",
  EXECUTED: "EXECUTED",
  CANCELLED: "CANCELLED",
};

export const MULTISIG_NAME = {
  NewMultisig: "NewMultisig",
  MultisigApproval: "MultisigApproval",
  MultisigExecuted: "MultisigExecuted",
  MultisigCancelled: "MultisigCancelled",
  asMultiThreshold1: "asMultiThreshold1",
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

export const ASSETS_SORT = {
  HOLDERS_DESC: "HOLDERS_DESC",
  ASSET_ID_ASC: "ASSET_ID_ASC",
};

export const RECOVERABLE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const RECOVERY_STATUS = {
  ACTIVE: "active",
  CLOSED: "closed",
};

export const PROXY_STATUS = {
  ACTIVE: "active",
  REMOVED: "removed",
};

export const PROXY_ANNOUNCEMENT_STATUS = {
  ANNOUNCED: "Announced",
  EXECUTED: "Executed",
  KILLED: "Killed",
  REJECTED: "Rejected",
  REMOVED: "Removed",
};
