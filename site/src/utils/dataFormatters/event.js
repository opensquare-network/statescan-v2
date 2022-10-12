export function convertArgsForJsonView(args, section, method, chain) {
  return Object.fromEntries(
    args.map((arg) => [
      arg.name,
      (() => {
        switch (arg.type) {
          case "Call":
          case "CallOf": {
            return convertCallForJsonView(arg.value, chain);
          }
          case "Vec<Call>":
          case "Vec<CallOf>": {
            return arg.value.map((v) => convertCallForJsonView(v, chain));
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
