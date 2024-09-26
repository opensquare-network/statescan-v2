import AddressOrIdentity from "../components/address";
import { bigNumberToLocaleString } from "./viewFuncs";

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
      return [
        item.name,
        <AddressOrIdentity key="0" address={item.value} ellipsis={false} />,
      ];
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
