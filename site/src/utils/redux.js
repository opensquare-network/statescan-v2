import { noop } from "lodash";

export function makeSetReducer(target, cb = noop) {
  return function (state, value) {
    state[target] = value.payload;
    cb(value);
  };
}

export function makeSelector(reducer, target) {
  return function (state) {
    return state[reducer][target];
  };
}
