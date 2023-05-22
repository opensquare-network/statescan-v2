async function handleSubIdentityExtrinsics(event, indexer, extrinsic) {
  console.log("handleSubIdentityExtrinsics");
  const extrinsicData = extrinsic.method.args[0];

  extrinsicData.forEach(([accountId, display]) => {
    console.log(`accountId`, accountId.toHuman());
    console.log(`display`, display.toHuman());
  });
}

module.exports = {
  handleSubIdentityExtrinsics,
};
