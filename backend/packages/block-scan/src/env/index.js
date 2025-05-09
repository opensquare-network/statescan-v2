const simpleMode = parseInt(process.env.SIMPLE_MODE) === 1;

function isSimpleMode() {
  return simpleMode;
}

function hasEvmEndPoint() {
  return !!process.env.EVM_HTTP_ENDPOINT;
}

function isInterlay() {
  return ["interlay", "kintsugi"].includes(process.env.CHAIN);
}

module.exports = {
  isSimpleMode,
  hasEvmEndPoint,
  isInterlay,
};
