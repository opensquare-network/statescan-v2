import api from "./api";
import { verifiedContractsApi } from "./urls";
import { setVerifiedContracts } from "../utils/revive";
import { hasRevive } from "../utils/chain";

let loadPromise = null;

export function loadVerifiedContracts() {
  if (!hasRevive()) {
    return Promise.resolve([]);
  }

  if (!loadPromise) {
    loadPromise = api
      .fetch(verifiedContractsApi, { compact: 1 })
      .then(({ result, error }) => {
        if (error) {
          throw new Error(`verified contracts responded ${error.status}`);
        }

        const items = Array.isArray(result?.items) ? result.items : [];
        setVerifiedContracts(items);
        return items;
      })
      .catch((e) => {
        // The generic abi still decodes the standard calls without this data.
        console.error("Failed to load verified contracts", e); // eslint-disable-line no-console
        return [];
      });
  }

  return loadPromise;
}
