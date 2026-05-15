import BigNumber from "bignumber.js";
import isNil from "lodash.isnil";
import { currencify } from "..";

const ETHERSCAN_BASE_URL = "https://etherscan.io";

export function toLidoTimestamp(blockTime) {
  if (!blockTime) {
    return null;
  }

  return Number(blockTime) * 1000;
}

export function getEtherscanBlockUrl(blockNumber) {
  return `${ETHERSCAN_BASE_URL}/block/${blockNumber}`;
}

export function getEtherscanTxUrl(txHash) {
  return `${ETHERSCAN_BASE_URL}/tx/${txHash}`;
}

export function getEtherscanAddressUrl(address) {
  return `${ETHERSCAN_BASE_URL}/address/${address}`;
}

export function toLidoBlockNumber(blockNumber) {
  return currencify(Number(blockNumber));
}

export function toLidoAmount(value, decimals) {
  return new BigNumber(value || 0).shiftedBy(-decimals).toFixed();
}

export function formatLidoBp(value, empty = "--") {
  if (isNil(value)) {
    return empty;
  }

  return `${new BigNumber(value).div(100).toString()}%`;
}
