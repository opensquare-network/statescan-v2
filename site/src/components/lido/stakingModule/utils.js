import isNil from "lodash.isnil";
import { toLidoBlockNumber } from "../../../utils/viewFuncs/lido";

const LIDO_STAKING_MODULE_IDS = {
  nor: 1,
  simpleDvt: 2,
  csm: 3,
};

export function getShareLimit(module) {
  return module.stakeShareLimit ?? module.targetShare;
}

export function isNorModule(module) {
  return module?.stakingModuleId === LIDO_STAKING_MODULE_IDS.nor;
}

export function isCsmModule(module) {
  return module?.stakingModuleId === LIDO_STAKING_MODULE_IDS.csm;
}

export function toOptionalBlockNumber(value) {
  return isNil(value) ? "--" : toLidoBlockNumber(value);
}
