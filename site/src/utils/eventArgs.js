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
  const eventData = {
    object_type: "table_pairs",
    object_data: event?.args?.map((item) => [
      cleanTemplateArgs(item.typeName).split("::").pop(),
      item.value,
    ]),
  };

  return {
    object_type: eventData.object_type,
    object_data: eventData.object_data.map(([type, val]) => {
      if (type === "AccountId") {
        return [
          type,
          <AddressOrIdentity key="0" address={val} ellipsis={false} />,
        ];
      }
      return [type, val];
    }),
  };
}
