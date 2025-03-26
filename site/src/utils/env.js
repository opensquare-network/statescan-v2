import chains from "./consts/chains";
import polimec from "./consts/chains/polimec";

export function getEnvChain() {
  // check env `REACT_APP_PUBLIC_CHAIN` setting
  const chain = process.env.REACT_APP_PUBLIC_CHAIN;
  if (!Object.keys(chains).includes(chain)) {
    throw new Error(`Invalid REACT_APP_PUBLIC_CHAIN setting: ${chain}`);
  }

  return chain;
}

export function isPolimec() {
  const chain = getEnvChain();
  return chain === polimec.value;
}

export function getEnvEndpoint() {
  const endpoint = process.env.REACT_APP_PUBLIC_API_END_POINT;
  if (!endpoint) {
    throw new Error("No REACT_APP_PUBLIC_API_END_POINT is set");
  }

  return endpoint;
}

export function getIsSimpleMode() {
  return ["true", "TRUE", "1"].includes(
    process.env.REACT_APP_PUBLIC_SIMPLE_MODE,
  );
}
