import React from "react";
import BigNumber from "bignumber.js";
import { hexToString } from "@polkadot/util";
import AddressOrIdentity from "../components/address";
import { hexEllipsis } from ".";
import LongText from "../components/dataDisplay/longText";

export function convertCallForTableView(call) {
  return {
    ...call,
    args: convertArgsForTableView(call.args, call.section, call.method),
  };
}

export function convertArgsForTableView(args, section, method) {
  if (Array.isArray(args)) {
    return Object.fromEntries(
      args.map((arg, index) => {
        switch (arg.type) {
          case "Call":
          case "CallOf": {
            return [arg.name, convertCallForTableView(arg.value)];
          }
          case "Vec<Call>":
          case "Vec<CallOf>": {
            return [arg.name, arg.value.map((v) => convertCallForTableView(v))];
          }
          case "Bytes": {
            if (
              (section === "phalaRegistry" && method === "addPruntime") ||
              (section === "system" && method === "setCode") ||
              (section === "parachainSystem" &&
                method === "enactAuthorizedUpgrade")
            ) {
              return [
                arg.name,
                <LongText key={`arg-${index}`} text={arg.value} />,
              ];
            }

            if (
              section === "parachainSystem" &&
              method === "sudoSendUpwardMessage"
            ) {
              return [arg.name, arg.value];
            }

            return [arg.name, hexToString(arg.value)];
          }
          case "Balance":
          case "Compact<Balance>": {
            const value = new BigNumber(arg.value).toString();
            return [arg.name, value];
          }
          case "LookupSource":
          case "MultiAddress":
          case "AccountIdLookupOf": {
            if (arg.value.id) {
              return [
                arg.name,
                <AddressOrIdentity
                  key={`arg-${index}`}
                  address={arg.value.id}
                  ellipsis={false}
                />,
              ];
            } else {
              return [arg.name, arg.value];
            }
          }
          default: {
            return [arg.name, arg.value];
          }
        }
      }),
    );
  }
}

export function convertCallForJsonView(call) {
  return {
    ...call,
    args: convertArgsForJsonView(call.args, call.section, call.method),
  };
}

export function convertArgsForJsonView(args, section, method) {
  return Object.fromEntries(
    args.map((arg) => [
      arg.name,
      (() => {
        switch (arg.type) {
          case "Call":
          case "CallOf": {
            return convertCallForJsonView(arg.value);
          }
          case "Vec<Call>":
          case "Vec<CallOf>": {
            return arg.value.map((v) => convertCallForJsonView(v));
          }
          case "Bytes": {
            if (
              (section === "phalaRegistry" && method === "addPruntime") ||
              (section === "system" && method === "setCode") ||
              (section === "parachainSystem" &&
                method === "enactAuthorizedUpgrade")
            ) {
              return arg.value?.length <= 200
                ? arg.value
                : hexEllipsis(arg.value);
            }

            if (
              section === "parachainSystem" &&
              method === "sudoSendUpwardMessage"
            ) {
              return arg.value;
            }

            return hexToString(arg.value);
          }
          default: {
            return arg.value;
          }
        }
      })(),
    ]),
  );
}
