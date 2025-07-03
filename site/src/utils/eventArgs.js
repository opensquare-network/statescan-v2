import AddressOrIdentity from "../components/address";
import { bigNumberToLocaleString } from "./viewFuncs";
import { isAddress } from "@polkadot/util-crypto";

function cleanTemplateArgs(typeName) {
  let result = typeName;
  let next;
  while ((next = result.replace(/<[^<>]*>/g, "")) !== result) {
    result = next;
  }
  return result;
}

export function makeEventArgs(event) {
  const fields = event?.args?.map((item) => {
    const fieldType = cleanTemplateArgs(item.typeName).split("::").pop();
    if (fieldType === "AccountId") {
      try {
        if (isAddress(item.value)) {
          return [
            item.name,
            <AddressOrIdentity key="0" address={item.value} ellipsis={false} />,
          ];
        } else {
          return [item.name, String(item.value)];
        }
      } catch (error) {
        return [item.name, String(item.value)];
      }
    } else if (fieldType === "BalanceOf") {
      return [item.name, bigNumberToLocaleString(item.value)];
    }

    return [item.name, item.value];
  });

  if (event?.docs) {
    fields.unshift(["Docs", event?.docs?.join("").trim() || ""]);
  }

  return {
    object_type: "table_pairs",
    object_data: fields,
  };
}
