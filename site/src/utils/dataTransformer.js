import React from "react";
import BigNumber from "bignumber.js";
import AddressOrIdentity from "../components/address";
import { hexEllipsis } from ".";
import LongText from "../components/dataDisplay/longText";
import DecodableBytesDisplay from "../components/dataDisplay/decodableBytesDisplay";
import {
  ReviveCallData,
  ReviveDataFieldName,
} from "../components/extrinsic/reviveCallData";
import ContractLabel from "../components/extrinsic/contractLabel";
import { getContractName } from "./revive";
import maybeHexToUft8 from "./hex";

export function convertCallForTableView(call) {
  return {
    ...call,
    args: convertArgsForTableView(call.args, call.section, call.method),
  };
}

export function convertArgsForTableView(args, section, method) {
  if (Array.isArray(args)) {
    return {
      object_type: "table_pairs",
      object_data: args.map((arg, index) => {
        if (section === "revive" && method === "call" && arg.name === "dest") {
          return [
            arg.name,
            <ContractLabel key={`arg-${index}`} address={arg.value} />,
          ];
        }

        switch (arg.type) {
          case "Call":
          case "CallOf":
          case "RuntimeCall": {
            return [arg.name, convertCallForTableView(arg.value)];
          }
          case "Vec<Call>":
          case "Vec<CallOf>":
          case "Vec<RuntimeCall>": {
            return [arg.name, arg.value.map((v) => convertCallForTableView(v))];
          }
          case "Bytes": {
            if (
              section === "revive" &&
              method === "call" &&
              arg.name === "data"
            ) {
              const dest = args.find((item) => item?.name === "dest")?.value;
              return [
                <ReviveDataFieldName
                  key={`arg-${index}-name`}
                  value={arg.value}
                />,
                <ReviveCallData
                  key={`arg-${index}`}
                  value={arg.value}
                  dest={dest}
                />,
              ];
            }

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

            if (
              section === "system" &&
              (method === "remark" || method === "remarkWithEvent")
            ) {
              return [
                arg.name,
                <DecodableBytesDisplay
                  key={`arg-${index}`}
                  value={arg.value}
                />,
              ];
            }

            return [arg.name, maybeHexToUft8(arg.value)];
          }
          case "Balance":
          case "Compact<Balance>": {
            const value = new BigNumber(arg.value).toString();
            return [arg.name, value];
          }
          case "AccountId":
          case "LookupSource":
          case "MultiAddress":
          case "AccountIdLookupOf": {
            return [
              arg.name,
              <AddressOrIdentity
                key={`arg-${index}`}
                address={arg.value.id || arg.value.address32 || arg.value}
                ellipsis={false}
              />,
            ];
          }
          case "Vec<AccountId>":
          case "Vec<LookupSource>":
          case "Vec<MultiAddress>":
          case "Vec<AccountIdLookupOf>": {
            return [
              arg.name,
              arg.value.map((v, i) => (
                <AddressOrIdentity
                  key={`arg-${index}-${i}`}
                  address={typeof v === "string" ? v : v?.id || v?.address32}
                  ellipsis={false}
                />
              )),
            ];
          }
          default: {
            return [arg.name, arg.value];
          }
        }
      }),
    };
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
        if (section === "revive" && method === "call" && arg.name === "dest") {
          return getContractName(arg.value) ?? arg.value;
        }

        switch (arg.type) {
          case "Call":
          case "CallOf":
          case "RuntimeCall": {
            return convertCallForJsonView(arg.value);
          }
          case "Vec<Call>":
          case "Vec<CallOf>":
          case "Vec<RuntimeCall>": {
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

            return maybeHexToUft8(arg.value);
          }
          default: {
            return arg.value;
          }
        }
      })(),
    ]),
  );
}
