import AddressOrIdentity from "../components/address";

function cleanTemplateArgs(typeName) {
  let result = typeName;
  let next;
  while ((next = result.replace(/<[^<>]*>/g, "")) !== result) {
    result = next;
  }
  return result;
}

export function makeEventArgs(event) {
  const docs = ["Docs", event?.docs?.join("").trim() || ""];
  const fields = event?.args?.map((item) => {
    const fieldType = cleanTemplateArgs(item.typeName).split("::").pop();
    if (fieldType === "AccountId") {
      return [
        item.name,
        <AddressOrIdentity key="0" address={item.value} ellipsis={false} />,
      ];
    }

    return [item.name, item.value];
  });

  return {
    object_type: "table_pairs",
    object_data: [docs, ...fields],
  };
}
