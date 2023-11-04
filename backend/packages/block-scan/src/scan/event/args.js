function getTypeName(meta, index) {
  let typeName = meta.fields[index].typeName.toString();
  typeName = meta.args[0].toString();
  return typeName;
}

function extractEventArgs(event) {
  const args = [];
  let dataIndex = 0;
  for (const item of event.data) {
    const name = event.meta.fields[dataIndex].name.toString();
    let typeName = getTypeName(event.meta, dataIndex);

    args.push({
      name: name || typeName,
      typeName,
      value: item.toJSON(),
    });

    dataIndex++;
  }

  return args;
}

module.exports = {
  extractEventArgs,
};
