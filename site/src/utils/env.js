import chains from "./consts/chains";

export function getEnvChain() {
  // check env `REACT_APP_PUBLIC_CHAIN` setting
  const chain = process.env.REACT_APP_PUBLIC_CHAIN;
  if (!Object.keys(chains).includes(chain)) {
    throw new Error(`Invalid REACT_APP_PUBLIC_CHAIN setting: ${chain}`);
  }

  return chain;
}

export function getEnvEndpoint() {
  const endpoint = process.env.REACT_APP_PUBLIC_API_END_POINT;
  if (!endpoint) {
    throw new Error(`No REACT_APP_PUBLIC_API_END_POINT is set`);
  }

  return endpoint;
}
