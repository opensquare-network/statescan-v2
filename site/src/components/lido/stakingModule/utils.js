import isNil from "lodash.isnil";
import { toLidoBlockNumber } from "../../../utils/viewFuncs/lido";

export function getShareLimit(module) {
  return module.stakeShareLimit ?? module.targetShare;
}

export function isNorModule(module) {
  return module?.type?.toLowerCase() === "nor";
}

export function toOptionalBlockNumber(value) {
  return isNil(value) ? "--" : toLidoBlockNumber(value);
}
