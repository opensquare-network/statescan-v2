import debounce from "lodash.debounce";

const cachedIdentities = new Map();
let pendingQueries = new Map();

const delayQuery = debounce(() => {
  const pending = pendingQueries;
  if (pending.size < 1) {
    return;
  }
  pendingQueries = new Map();

  const chainAddresses = {};
  const idNames = [...pending.keys()];
  const idNameSplits = idNames.map((item) => item.split("/"));
  for (const [chain, address] of idNameSplits) {
    if (!chainAddresses[chain]) {
      chainAddresses[chain] = [];
    }
    chainAddresses[chain].push(address);
  }

  for (const chain in chainAddresses) {
    const addresses = chainAddresses[chain];

    const headers = {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8",
    };

    fetch(
      `${process.env.REACT_APP_PUBLIC_IDENTITY_SERVER_HOST}/${chain}/short-ids`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({ addresses }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        const identities = new Map(data.map((item) => [item.address, item]));

        for (const [idName, [, resolve, reject]] of pending) {
          const [chainOfIdName, addrOfIdName] = idName.split("/");
          if (chainOfIdName !== chain) {
            continue;
          }
          const identity = identities.get(addrOfIdName) || null;
          // always cache(identity or no), to prevent from redundant querying
          cachedIdentities.set(idName, identity ?? null);
          if (resolve) {
            resolve(identity);
          }
        }
      })
      .catch(() => {});
  }
}, 0);

export function fetchIdentity(chain, address) {
  const idName = `${chain}/${address}`;
  if (cachedIdentities.has(idName)) {
    return Promise.resolve(cachedIdentities.get(idName));
  }

  const pending = pendingQueries;

  if (!pending.has(idName)) {
    pending.set(idName, [
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const promise = pending.get(idName);
          promise.push(resolve, reject);
          delayQuery();
        }, 0),
      ),
    ]);
  }

  return pending.get(idName)[0];
}
