import {
  decodeFunctionData,
  toFunctionSelector,
  toFunctionSignature,
} from "viem";
import { CONTRACTS, EVM_CALL_ABI } from "./consts/evmAbi";

function indexFunctionsBySelector(abi) {
  return new Map(
    abi
      .filter((item) => item.type === "function")
      .map((item) => [toFunctionSelector(item), item]),
  );
}

const FUNCTIONS_BY_SELECTOR = indexFunctionsBySelector(EVM_CALL_ABI);

const CONTRACT_FUNCTIONS_BY_SELECTOR = Object.fromEntries(
  Object.entries(CONTRACTS).map(([address, contract]) => [
    address.toLowerCase(),
    indexFunctionsBySelector(contract.abi),
  ]),
);

// The ABI of a known callee wins over the generic one, so its parameter names
// are used; selectors it does not declare still fall back to EVM_CALL_ABI.
function findAbiItem(selector, dest) {
  const known = dest
    ? CONTRACT_FUNCTIONS_BY_SELECTOR[dest.toLowerCase()]
    : undefined;
  return known?.get(selector) ?? FUNCTIONS_BY_SELECTOR.get(selector);
}

export function getContractName(address) {
  if (typeof address !== "string") {
    return null;
  }
  return CONTRACTS[address.toLowerCase()]?.name ?? null;
}

export function isReviveCall(call) {
  return call?.section === "revive" && call?.method === "call";
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
