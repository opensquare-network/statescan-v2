import { toPrecision } from "@osn/common";
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

export function toLidoBlockNumber(blockNumber) {
  return currencify(Number(blockNumber));
}

export function toLidoAmount(value, decimals) {
  return toPrecision(value || 0, decimals);
}
