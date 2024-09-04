function checkIsExtrinsicResult(section, method) {
  return (
    "system" === section &&
    ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method)
  );
}

export default function extractEvent(event, indexer) {
  const {
    phase,
    event: { data, method, section, meta },
  } = event;

  let extrinsicIndex;
  const isExtrinsic = phase.isApplyExtrinsic;
  if (isExtrinsic) {
    extrinsicIndex = phase.asApplyExtrinsic.toNumber();
  }
  const isExtrinsicResult = checkIsExtrinsicResult(section, method);
  const docs = meta.docs.map((d) => d.toString());

  const args = [];
  let dataIndex = 0;
  for (const item of data) {
    const name = meta.fields[dataIndex].name.toString();
    const typeName = meta.fields[dataIndex].typeName.toString();

    args.push({
      name,
      typeName,
      value: item.toJSON(),
    });

    dataIndex++;
  }

  return {
    indexer: {
      ...indexer,
      extrinsicIndex,
    },
    method: method,
    section: section,
    isExtrinsic,
    isExtrinsicResult,
    args,
    docs,
  };
}
