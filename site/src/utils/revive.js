import {
  decodeFunctionData,
  parseTransaction,
  toFunctionSelector,
  toFunctionSignature,
} from "viem";
import { EVM_CALL_ABI } from "./consts/evmAbi";

function normalizeAddress(address) {
  if (typeof address !== "string") {
    return null;
  }

  const normalized = address.toLowerCase();
  return /^0x[0-9a-f]{40}$/.test(normalized) ? normalized : null;
}

function indexFunctionsBySelector(abi) {
  const index = new Map();
  if (!Array.isArray(abi)) {
    return index;
  }

  for (const item of abi) {
    if (item?.type !== "function") {
      continue;
    }

    try {
      index.set(toFunctionSelector(item), item);
    } catch {
      // One malformed item must not drop the abi of the whole contract.
    }
  }

  return index;
}

function normalizeImplementations(implementations) {
  if (!Array.isArray(implementations)) {
    return [];
  }

  return implementations
    .map((item) => normalizeAddress(item?.address))
    .filter(Boolean);
}

const GENERIC_FUNCTIONS_BY_SELECTOR = indexFunctionsBySelector(EVM_CALL_ABI);

let CONTRACTS = new Map();
let CONTRACT_FUNCTIONS_BY_SELECTOR = new Map();
let FUNCTIONS_BY_SELECTOR = GENERIC_FUNCTIONS_BY_SELECTOR;

// Called when the verified contracts are loaded from the server. A proxy uses
// the name and the abi of its implementation when the implementation is
// verified as well, and every verified function joins the global selector
// index, so the calls of a proxy with an unverified implementation still
// decode.
export function setVerifiedContracts(contracts) {
  const contractsByAddress = new Map();
  const functionsByAddress = new Map();
  const functionsBySelector = new Map(GENERIC_FUNCTIONS_BY_SELECTOR);

  for (const contract of Array.isArray(contracts) ? contracts : []) {
    const address = normalizeAddress(contract?.address);
    if (!address) {
      continue;
    }

    const functions = indexFunctionsBySelector(contract.abi);
    contractsByAddress.set(address, {
      name: contract.name || null,
      implementations: normalizeImplementations(contract.implementations),
    });
    functionsByAddress.set(address, functions);

    for (const [selector, item] of functions) {
      if (!functionsBySelector.has(selector)) {
        functionsBySelector.set(selector, item);
      }
    }
  }

  const resolvedContracts = new Map();
  const resolvedFunctions = new Map();
  for (const [address, contract] of contractsByAddress) {
    const implementation = contract.implementations.find(
      (impl) => functionsByAddress.get(impl)?.size > 0,
    );
    const implementationContract = implementation
      ? contractsByAddress.get(implementation)
      : null;
    const implementationFunctions = implementation
      ? functionsByAddress.get(implementation)
      : null;

    resolvedContracts.set(address, {
      name: implementationContract?.name || contract.name,
    });
    resolvedFunctions.set(
      address,
      implementationFunctions?.size
        ? implementationFunctions
        : functionsByAddress.get(address) || new Map(),
    );
  }

  CONTRACTS = resolvedContracts;
  CONTRACT_FUNCTIONS_BY_SELECTOR = resolvedFunctions;
  FUNCTIONS_BY_SELECTOR = functionsBySelector;
}

setVerifiedContracts([]);

// The ABI of a known callee wins over the global one, so its parameter names
// are used; selectors it does not declare still fall back to the functions of
// every verified contract and then to EVM_CALL_ABI.
function findAbiItem(selector, dest) {
  const address = normalizeAddress(dest);
  const known = address ? CONTRACT_FUNCTIONS_BY_SELECTOR.get(address) : null;
  return known?.get(selector) ?? FUNCTIONS_BY_SELECTOR.get(selector);
}

export function getContractName(address) {
  const normalized = normalizeAddress(address);
  return normalized ? CONTRACTS.get(normalized)?.name ?? null : null;
}

export function isReviveCall(call) {
  return call?.section === "revive" && call?.method === "call";
}

export function isReviveEthTransact(call) {
  return call?.section === "revive" && call?.method === "ethTransact";
}

function getArgValue(args, name, position) {
  const named = args.find((arg) => arg?.name === name);
  return named ? named.value : args[position]?.value;
}

const ARRAY_SUFFIX = /\[.*\]$/;

// Decoded arguments come as bigints, arrays, tuples, booleans and lower case
// addresses, and are printed as they are read in the abi.
export function formatEvmArgValue(value, type, components) {
  if (value === undefined || value === null) {
    return "--";
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (Array.isArray(value)) {
    const itemType = type?.replace(ARRAY_SUFFIX, "");
    return `[${value
      .map((item) => formatEvmArgValue(item, itemType, components))
      .join(", ")}]`;
  }

  if (typeof value === "object") {
    const fields =
      components ?? Object.keys(value).map((name) => ({ name, type: null }));
    return `{ ${fields
      .map((field) => {
        const fieldValue = formatEvmArgValue(
          value[field.name],
          field.type,
          field.components,
        );
        return `${field.name}: ${fieldValue}`;
      })
      .join(", ")} }`;
  }

  if (type?.replace(ARRAY_SUFFIX, "") === "address") {
    return String(value).toLowerCase();
  }

  return String(value);
}

export function decodeEvmCalldata(data, dest) {
  const hex = typeof data === "string" ? data.toLowerCase() : "0x";
  if (!hex.startsWith("0x") || hex.length < 10) {
    return {
      selector: null,
      functionName: null,
      signature: null,
      inputs: [],
      args: [],
      data: hex,
    };
  }

  const selector = hex.slice(0, 10);
  const abiItem = findAbiItem(selector, dest);
  if (!abiItem) {
    return {
      selector,
      functionName: null,
      signature: null,
      inputs: [],
      args: [],
      data: hex,
    };
  }

  try {
    const decoded = decodeFunctionData({ abi: [abiItem], data: hex });
    return {
      selector,
      functionName: decoded.functionName,
      signature: toFunctionSignature(abiItem),
      inputs: abiItem.inputs,
      args: decoded.args ?? [],
      data: hex,
    };
  } catch (e) {
    return {
      selector,
      functionName: null,
      signature: null,
      inputs: [],
      args: [],
      data: hex,
    };
  }
}

// The table expanded under a revive call row: the method signature and, in a
// nested table, the key-value pairs of its parameters. The selector and the raw
// calldata are kept when the abi of the callee is unknown.
export function getEvmCallTableData(calldata) {
  if (!calldata?.functionName) {
    const rows = [["method", calldata?.selector ?? "--"]];
    if (calldata?.data && calldata.data !== "0x") {
      rows.push(["data", calldata.data]);
    }
    return { object_type: "table_pairs", object_data: rows };
  }

  const parameters = calldata.inputs.map((input, index) => [
    input.name || `arg${index}`,
    formatEvmArgValue(calldata.args[index], input.type, input.components),
  ]);

  const rows = [["method", calldata.signature]];
  if (parameters.length > 0) {
    rows.push([
      "parameters",
      { object_type: "table_pairs", object_data: parameters },
    ]);
  }

  return { object_type: "table_pairs", object_data: rows };
}

export function parseReviveCall(call) {
  if (!isReviveCall(call)) {
    return null;
  }

  const args = Array.isArray(call.args) ? call.args : [];
  const dest = getArgValue(args, "dest", 0) ?? null;

  return {
    dest,
    value: getArgValue(args, "value", 1) ?? null,
    calldata: decodeEvmCalldata(getArgValue(args, "data", 4), dest),
  };
}

// The signed ethereum transaction a `revive.ethTransact` payload carries. It is
// not shown as it is, only the call it makes, so the fields the page needs are
// kept.
export function parseEvmTransaction(serializedTransaction) {
  if (
    typeof serializedTransaction !== "string" ||
    !serializedTransaction.startsWith("0x")
  ) {
    return null;
  }

  try {
    const transaction = parseTransaction(serializedTransaction);
    return {
      // A transaction without a recipient deploys a contract.
      to: normalizeAddress(transaction.to),
      value: transaction.value ?? 0n,
      data: transaction.data ?? "0x",
    };
  } catch {
    return null;
  }
}

// `revive.ethTransact(payload)`, the payload is the only argument.
export function parseReviveEthTransact(call) {
  if (!isReviveEthTransact(call)) {
    return null;
  }

  const args = Array.isArray(call.args) ? call.args : [];
  const payload = getArgValue(args, "payload", 0);
  const transaction = parseEvmTransaction(payload);
  if (!transaction) {
    return null;
  }

  return {
    dest: transaction.to,
    value: transaction.value,
    calldata: decodeEvmCalldata(transaction.data, transaction.to),
  };
}
