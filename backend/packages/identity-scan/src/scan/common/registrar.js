const { busLogger } = require("@osn/scan-common");

function getRegistrar(rawRegistrars = [], index, indexer) {
  const rawRegistrar = rawRegistrars[index];
  if (!rawRegistrar) {
    busLogger.error(
      `${indexer.blockHeight} can not find registrar index: ${index}`,
    );
  }

  if (!rawRegistrar.isSome) {
    busLogger.error(
      `${indexer.blockHeight} can not find registrar index: ${index}`,
    );
  }

  return rawRegistrar.unwrap().account.toString();
}

function getRegistrarFee(rawRegistrars = [], index, indexer) {
  const rawRegistrar = rawRegistrars[index];
  if (!rawRegistrar) {
    busLogger.error(
      `${indexer.blockHeight} can not find registrar index: ${index}`,
    );
  }

  if (!rawRegistrar.isSome) {
    busLogger.error(
      `${indexer.blockHeight} can not find registrar index: ${index}`,
    );
  }

  return rawRegistrar.unwrap().fee.toJSON();
}

module.exports = {
  getRegistrar,
  getRegistrarFee,
};
