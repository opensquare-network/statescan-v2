import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

export const useIdentityQuery = createModuleQuery("identity");

export const useIdentityLazyQuery = createModuleLazyQuery("identity");

export const useMultisigQuery = createModuleQuery("multisig");

export const useMultisigLazyQuery = createModuleLazyQuery("multisig");

export const useVestingsQuery = createModuleQuery("vestings");

export const useRecoveryQuery = createModuleQuery("recovery");

/**
 * @param {string} module
 * @description useLazyQuery
 */
function createModuleLazyQuery(module) {
  /**
   * @type {typeof useLazyQuery}
   */
  return function useModuleLazyQuery(query, options) {
    const [data, setData] = useState(null);
    const { modules = {} } = useChainSettings();
    const [fn, lazyQueryResult] = useLazyQuery(query, {
      ...options,
      onCompleted(d) {
        setData(d);
        options?.onCompleted?.(d);
      },
    });
    const mod = modules?.[module];

    /**
     * @type {typeof fn} options
     */
    const fetcher = useCallback(
      async (fetchOptions) => {
        if (mod) {
          return fn({
            ...fetchOptions,
            onCompleted(d) {
              setData(d);
              fetchOptions?.onCompleted?.(d);
            },
          });
        }
      },
      [fn, mod],
    );

    lazyQueryResult.data = data;

    return [fetcher, lazyQueryResult];
  };
}

/**
 * @param {string} module
 * @description useQuery
 */
function createModuleQuery(module) {
  const useModuleLazyQuery = createModuleLazyQuery(module);

  /**
   * @type {typeof import('@apollo/client').useQuery}
   */
  return function useModuleQuery(...args) {
    const [fetcher, result] = useModuleLazyQuery(...args);
    const { modules } = useChainSettings();

    useEffect(() => {
      fetcher();
    }, [fetcher, modules?.[module]]);

    return result;
  };
}
