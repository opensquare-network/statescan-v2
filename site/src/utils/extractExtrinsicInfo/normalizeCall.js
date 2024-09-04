import { u8aToHex } from "@polkadot/util";

const balanceTypes = [
  "Balance",
  "BalanceOf",
  "Compact<BalanceOf>",
  "Compact<Balance>",
];
const numTypes = ["Compact<u128>", "u128", "u64", "Compact<u64>"];

function normalizeArgValue(argMeta, name, value) {
  const type = argMeta.type.toString();
  const typeName = argMeta.typeName.toString();

  if ("WrapperKeepOpaque<Call>" === type) {
    try {
      return normalizeCall(value.unwrap());
    } catch (e) {
      return value.toHex();
    }
  }

  if ("LookupSource" === typeName) {
    return value.toString();
  }

  if (
    balanceTypes.includes(type) ||
    numTypes.includes(type) ||
    balanceTypes.includes(typeName) ||
    numTypes.includes(typeName)
  ) {
    return value.toBigInt().toString();
  }

  if ("AccountIndex" === type) {
    return value.toNumber();
  }

  if (value.toBigInt) {
    try {
      return value.toBigInt().toString();
    } catch (e) {
      // ignore this
    }
  }

  if (value.isSome) {
    return value.value.toJSON();
  }

  return value.toJSON();
}

function normalizeCall(call) {
  const { section, method } = call;
  const callIndex = u8aToHex(call.callIndex);

  const args = [];
  for (let index = 0; index < call.args.length; index++) {
    const arg = call.args[index];

    const argMeta = call.meta.args[index];
    const name = argMeta.name.toString();
    const type = argMeta.type.toString();
    const typeName = argMeta.typeName.toString();

    const commonFields = {
      name,
      type: typeName,
    };

    if (type === "Call" || type === "CallOf") {
      args.push({
        ...commonFields,
        value: normalizeCall(arg),
      });
    } else if (type === "Vec<Call>" || type === "Vec<CallOf>") {
      args.push({
        ...commonFields,
        value: arg.map(normalizeCall),
      });
    } else {
      args.push({
        ...commonFields,
        value: normalizeArgValue(argMeta, name, arg),
      });
    }
  }

  return {
    callIndex,
    section,
    method,
    args,
  };
}

export { normalizeCall };
