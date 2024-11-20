const { hasEvmEndPoint } = require("../env");
const { Web3 } = require("web3");

let web3;

function initEvmWeb3InstanceConditionally() {
  if (!hasEvmEndPoint()) {
    return;
  }

  web3 = new Web3(process.env.EVM_HTTP_ENDPOINT);
}

function getEvmWeb3Instance() {
  if (!web3) {
    throw new Error("Web3 instance is not initialized");
  }

  return web3;
}

module.exports = {
  initEvmWeb3InstanceConditionally,
  getEvmWeb3Instance,
};
