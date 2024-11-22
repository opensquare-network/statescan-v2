const {
  block: { getEvmTxCol, getExtrinsicCollection },
} = require("@statescan/mongo");
const { HttpError } = require("../../../utils");

async function getTx(ctx) {
  const { hash } = ctx.params;
  const evmCol = await getEvmTxCol();
  const evmTx = await evmCol.findOne({ hash }, { projection: { _id: 0 } });
  if (evmTx) {
    ctx.body = {
      isEvm: true,
      ...evmTx,
    };
    return;
  }

  const exCol = await getExtrinsicCollection();
  const extrinsic = await exCol.findOne({ hash }, { projection: { _id: 0 } });
  if (!extrinsic) {
    throw new HttpError(404, "extrinsic not found");
  }

  ctx.body = {
    isEvm: false,
    ...extrinsic,
  };
}

module.exports = {
  getTx,
};
